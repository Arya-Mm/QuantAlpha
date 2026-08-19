"""
QuantAlpha Signal Factory
Generates quantitative trading signals from real NSE price data.

Integrity rules:
  - Each signal computes on real data fetched by data_loader.
  - Labels are real triple-barrier exit times (not a shifted index).
  - Validation runs through the canonical validation_engine pipeline.
  - There is NO second, independent validation implementation here.
  - Signal failure is the expected and correct outcome.
"""

from __future__ import annotations

import numpy as np
import pandas as pd
import logging
from typing import Dict, Any, Tuple, Generator, Optional

from data_loader import fetch_historical_ohlcv
from triple_barrier import TripleBarrierLabeler
from validation_engine import (
    validate_strategy_pipeline,
    information_coefficient_timeseries,
)
from research_mode import is_demo_mode, label_as_demo, label_as_research

logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# Shared utilities
# ---------------------------------------------------------------------------

def _build_t1_from_barrier_labels(labels_df: pd.DataFrame) -> pd.Series:
    """
    Convert triple-barrier label DataFrame to t1 Series.

    t1 is the Series required by PurgedKFold / CPCV:
      index  = observation entry time
      values = observation exit time  (label expiry)

    Parameters
    ----------
    labels_df : pd.DataFrame
        Output of TripleBarrierLabeler.generate_labels() — must contain 'exit_time'.
    """
    if labels_df.empty or "exit_time" not in labels_df.columns:
        raise ValueError("labels_df must contain 'exit_time' column from TripleBarrierLabeler")
    t1 = labels_df["exit_time"]
    t1 = t1.dropna()
    t1 = t1[t1 > t1.index]  # exit must be after entry
    return t1.sort_index()


# ---------------------------------------------------------------------------
# Signal classes
# ---------------------------------------------------------------------------

class MomentumCrossoverSignal:
    """
    EMA 20/50 crossover with ATR volatility expansion gate.
    Signal_t = sign(EMA_20(P_t) - EMA_50(P_t)) * I(ATR_14 > Median(ATR_14, 60))
    """

    name = "MOM_CROSS_V4"
    category = "Technical"
    formula = "Signal_t = sign(EMA_20(P_t) - EMA_50(P_t)) * I(ATR_14 > Median(ATR_14, 60))"
    description = (
        "Multi-timeframe EMA crossover with ATR volatility expansion gate. "
        "Long when fast EMA leads slow EMA during expanding volatility regimes."
    )

    def __init__(
        self,
        ticker: str = "^NSEI",
        start_date: str = "2021-01-01",
        end_date: str = "2024-12-31",
    ):
        self.ticker = ticker
        self.start_date = start_date
        self.end_date = end_date

    def compute(self) -> Tuple[pd.Series, pd.Series, pd.Series, Dict[str, Any]]:
        """
        Returns: (signal_series, strategy_returns, t1, diagnostics)

        t1 : pd.Series (entry → exit_time) for use with CPCV / PurgedKFold.
        """
        data = fetch_historical_ohlcv(self.ticker, self.start_date, self.end_date)
        prices = data["Close"]
        high = data["High"]
        low = data["Low"]

        # EMA crossover
        ema20 = prices.ewm(span=20, adjust=False).mean()
        ema50 = prices.ewm(span=50, adjust=False).mean()
        raw_signal = np.where(ema20 > ema50, 1.0, -0.5)

        # ATR volatility gate
        tr = pd.concat(
            [high - low, (high - prices.shift(1)).abs(), (low - prices.shift(1)).abs()],
            axis=1,
        ).max(axis=1)
        atr14 = tr.rolling(14).mean()
        atr_median = atr14.rolling(60).median()
        vol_gate = (atr14 > atr_median).astype(float)

        # Gated signal (next-bar execution)
        signal = pd.Series(raw_signal * vol_gate.values, index=prices.index)
        signal = signal.shift(1).fillna(0.0)

        # Strategy returns
        asset_rets = prices.pct_change().fillna(0.0)
        strategy_returns = (signal * asset_rets).dropna()

        # Triple-barrier labels for CPCV
        is_synthetic = data.attrs.get("_synthetic", False)
        labeler = TripleBarrierLabeler(
            prices=prices,
            profit_target_pct=0.015,
            stop_loss_pct=0.01,
            max_holding_periods=5,
            volatility_adjusted=True,
        )
        labels_df = labeler.generate_labels()
        t1 = _build_t1_from_barrier_labels(labels_df)

        diagnostics = {
            "ticker": self.ticker,
            "n_samples": int(len(prices)),
            "long_pct": float((signal > 0).mean() * 100),
            "short_pct": float((signal < 0).mean() * 100),
            "crossovers": int((np.diff(np.sign(ema20.values - ema50.values)) != 0).sum()),
            "data_synthetic": is_synthetic,
        }

        return signal, strategy_returns, t1, diagnostics


class PairCointegrationSignal:
    """
    Engle-Granger cointegrated pairs mean-reversion.
    Spread = log(P_A) - beta * log(P_B)
    z_t = (Spread_t - mu_60) / sigma_60
    """

    name = "PAIR_COINT_ARB"
    category = "Statistical Arbitrage"
    formula = "z_t = (Spread_t - mu_60) / sigma_60,  Spread_t = log(P_A) - beta * log(P_B)"
    description = (
        "Engle-Granger cointegrated pairs mean-reversion on NIFTY Bank liquid "
        "constituents (HDFCBANK vs ICICIBANK)."
    )

    def __init__(self, start_date: str = "2021-01-01", end_date: str = "2024-12-31"):
        self.ticker_a = "HDFCBANK.NS"
        self.ticker_b = "ICICIBANK.NS"
        self.start_date = start_date
        self.end_date = end_date

    def compute(self) -> Tuple[pd.Series, pd.Series, pd.Series, Dict[str, Any]]:
        data_a = fetch_historical_ohlcv(self.ticker_a, self.start_date, self.end_date)
        data_b = fetch_historical_ohlcv(self.ticker_b, self.start_date, self.end_date)

        common_idx = data_a.index.intersection(data_b.index)
        p_a = data_a["Close"].reindex(common_idx)
        p_b = data_b["Close"].reindex(common_idx)

        # OLS hedge ratio in log-price space
        log_a = np.log(p_a)
        log_b = np.log(p_b)
        beta = float(np.cov(log_a, log_b)[0, 1] / np.var(log_b))

        spread = log_a - beta * log_b
        mu = spread.rolling(60).mean()
        sigma = spread.rolling(60).std() + 1e-8
        zscore = (spread - mu) / sigma

        signal = pd.Series(0.0, index=common_idx)
        signal[zscore < -1.5] = 1.0
        signal[zscore > 1.5] = -1.0
        signal = signal.shift(1).fillna(0.0)

        spread_returns = spread.diff().fillna(0.0)
        strategy_returns = (signal * spread_returns).dropna()
        # Winsorize at 1%/99% — legitimate outlier trimming
        lo, hi = strategy_returns.quantile(0.01), strategy_returns.quantile(0.99)
        strategy_returns = strategy_returns.clip(lower=lo, upper=hi)

        # Triple-barrier labels on spread (as price series proxy)
        spread_as_price = spread - spread.min() + 1.0  # shift to positive
        is_synthetic = data_a.attrs.get("_synthetic", False)
        labeler = TripleBarrierLabeler(
            prices=spread_as_price,
            profit_target_pct=0.01,
            stop_loss_pct=0.01,
            max_holding_periods=5,
            volatility_adjusted=False,
        )
        labels_df = labeler.generate_labels()
        t1 = _build_t1_from_barrier_labels(labels_df)

        diagnostics = {
            "ticker_a": self.ticker_a,
            "ticker_b": self.ticker_b,
            "n_samples": int(len(p_a)),
            "hedge_ratio_beta": round(beta, 4),
            "spread_half_life": _estimate_half_life(spread),
            "n_entries": int((signal != 0).sum()),
            "data_synthetic": is_synthetic,
        }

        return signal, strategy_returns, t1, diagnostics


class MacroYieldCurveSignal:
    """
    MA(50) vs MA(200) slope proxy for yield curve regime.
    """

    name = "MACRO_YIELD_CURVE"
    category = "Macro"
    formula = "Slope_t = (MA_50 - MA_200) / MA_200,  Signal = I(Delta(Slope_t, 20) > 0)"
    description = (
        "MA(50)/MA(200) slope proxy for yield curve steepening regime. "
        "Steepening → long, flattening → mild short."
    )

    def __init__(self, start_date: str = "2021-01-01", end_date: str = "2024-12-31"):
        self.start_date = start_date
        self.end_date = end_date

    def compute(self) -> Tuple[pd.Series, pd.Series, pd.Series, Dict[str, Any]]:
        nifty = fetch_historical_ohlcv("^NSEI", self.start_date, self.end_date)
        prices = nifty["Close"]
        is_synthetic = nifty.attrs.get("_synthetic", False)

        ma_fast = prices.rolling(50).mean()
        ma_slow = prices.rolling(200).mean()
        slope_proxy = (ma_fast - ma_slow) / (ma_slow + 1e-6)
        slope_mom = slope_proxy.diff(20)

        signal = pd.Series(0.0, index=prices.index)
        signal[slope_mom > 0] = 1.0
        signal[slope_mom < -0.005] = -0.3
        signal = signal.shift(1).fillna(0.0)

        asset_rets = prices.pct_change().fillna(0.0)
        strategy_returns = (signal * asset_rets).dropna()

        labeler = TripleBarrierLabeler(
            prices=prices,
            profit_target_pct=0.02,
            stop_loss_pct=0.015,
            max_holding_periods=10,
            volatility_adjusted=True,
        )
        labels_df = labeler.generate_labels()
        t1 = _build_t1_from_barrier_labels(labels_df)

        diagnostics = {
            "ticker": "^NSEI",
            "n_samples": int(len(prices)),
            "regime_bullish_pct": float((signal > 0).mean() * 100),
            "regime_bearish_pct": float((signal < 0).mean() * 100),
            "slope_std": float(slope_proxy.std()),
            "data_synthetic": is_synthetic,
        }

        return signal, strategy_returns, t1, diagnostics


# ---------------------------------------------------------------------------
# Half-life utility
# ---------------------------------------------------------------------------

def _estimate_half_life(spread: pd.Series) -> float:
    """AR(1) mean-reversion half-life in days."""
    try:
        delta = spread.diff().dropna()
        lag = spread.shift(1).dropna()
        common = delta.index.intersection(lag.index)
        rho = float(np.cov(delta[common].values, lag[common].values)[0, 1] / np.var(lag[common].values))
        if rho >= 0 or rho <= -1:
            return 20.0
        return round(-np.log(2) / np.log(1 + rho), 1)
    except Exception:
        return 20.0


# ---------------------------------------------------------------------------
# Signal registry
# ---------------------------------------------------------------------------

SIGNAL_CLASSES = [
    MomentumCrossoverSignal,
    PairCointegrationSignal,
    MacroYieldCurveSignal,
]


# ---------------------------------------------------------------------------
# Discovery pipeline (connected to canonical validation)
# ---------------------------------------------------------------------------

def run_signal_discovery_pipeline(
    start_date: str = "2021-01-01",
    end_date: str = "2024-12-31",
) -> Generator[Dict[str, Any], None, None]:
    """
    Generator that runs all signals through the canonical validation pipeline.

    Uses validate_strategy_pipeline() from validation_engine.py — no second
    independent validation implementation.

    Yields dicts with keys: stage, type, message, data
    """
    discovered_signals = []

    yield {
        "stage": "init",
        "type": "info",
        "message": f"Signal Discovery Pipeline | Period: {start_date} → {end_date} | {len(SIGNAL_CLASSES)} signals",
        "data": {"n_signals": len(SIGNAL_CLASSES)},
    }

    for idx, SignalClass in enumerate(SIGNAL_CLASSES):
        # Instantiate with date range
        if SignalClass == MomentumCrossoverSignal:
            sig_instance = SignalClass(start_date=start_date, end_date=end_date)
        else:
            sig_instance = SignalClass(start_date=start_date, end_date=end_date)

        sig_name = SignalClass.name
        sig_num = idx + 1

        yield {
            "stage": f"signal_{sig_num}_fetch",
            "type": "info",
            "message": f"[{sig_num}/{len(SIGNAL_CLASSES)}] Fetching data for {sig_name}...",
            "data": {"signal": sig_name, "category": SignalClass.category},
        }

        try:
            signal_series, returns, t1, diagnostics = sig_instance.compute()
            is_synthetic = diagnostics.get("data_synthetic", True)
            mode_tag = "[DEMO]" if is_synthetic else "[RESEARCH]"

            yield {
                "stage": f"signal_{sig_num}_computed",
                "type": "info",
                "message": (
                    f"[{sig_num}/{len(SIGNAL_CLASSES)}] {mode_tag} {sig_name}: "
                    f"{diagnostics['n_samples']} bars | "
                    f"{len(t1)} triple-barrier labels | Running CPCV..."
                ),
                "data": {"signal": sig_name, "diagnostics": diagnostics},
            }

            # Canonical validation: single pipeline, no duplicates
            if len(t1) < 20 or len(returns) < 20:
                yield {
                    "stage": f"signal_{sig_num}_rejected",
                    "type": "rejected",
                    "message": (
                        f"[{sig_num}/{len(SIGNAL_CLASSES)}] ✗ REJECTED: {sig_name} | "
                        f"Insufficient observations (t1={len(t1)}, returns={len(returns)})"
                    ),
                    "data": {"signal": sig_name, "status": "REJECTED", "reason": "INSUFFICIENT_DATA"},
                }
                continue

            validation = validate_strategy_pipeline(
                returns=returns,
                t1=t1,
                n_trials=30,
                alpha=0.05,
                pct_embargo=0.01,
            )

            sharpe = validation.get("sharpe_ratio")
            pbo_res = validation.get("pbo", {})
            dsr_res = validation.get("dsr", {})
            pbo = pbo_res.get("pbo")
            dsr = dsr_res.get("dsr")
            val_status = validation.get("validation_status", "REJECTED")
            passed = val_status == "PASSED"

            # Time-series IC for display
            ic_val, ic_pval = information_coefficient_timeseries(signal_series, returns.shift(-1))

            cpcv_paths = validation.get("cpcv_paths", [])
            n_paths = len(cpcv_paths)
            paths_profitable = sum(1 for p in cpcv_paths if (p.get("oos_sharpe") or 0) > 0)

            # Max drawdown
            cum = (1 + returns).cumprod()
            mdd = float(((cum - cum.cummax()) / cum.cummax()).min() * 100) if len(cum) > 1 else None

            result_data = {
                "signal": sig_name,
                "status": val_status,
                "sharpe": round(sharpe, 3) if sharpe is not None else None,
                "ic": round(ic_val, 4) if (ic_val is not None and not np.isnan(ic_val)) else None,
                "ic_pvalue": round(ic_pval, 4) if (ic_pval is not None and not np.isnan(ic_pval)) else None,
                "dsr": round(dsr, 4) if dsr is not None else None,
                "pbo": round(pbo, 4) if pbo is not None else None,
                "cpcv_n_paths": n_paths,
                "cpcv_paths_profitable": paths_profitable,
                "max_drawdown": round(mdd, 2) if mdd is not None else None,
                "category": SignalClass.category,
                "formula": SignalClass.formula,
                "description": SignalClass.description,
                "diagnostics": diagnostics,
                "mode": "DEMO" if is_synthetic else "RESEARCH",
            }

            if is_synthetic:
                label_as_demo(result_data)
            else:
                label_as_research(result_data)

            if passed:
                yield {
                    "stage": f"signal_{sig_num}_approved",
                    "type": "success",
                    "message": (
                        f"[{sig_num}/{len(SIGNAL_CLASSES)}] ✓ APPROVED {mode_tag}: {sig_name} | "
                        f"Sharpe={sharpe:.2f} | DSR={dsr:.3f} | PBO={pbo:.3f} | "
                        f"CPCV: {paths_profitable}/{n_paths} paths profitable"
                    ),
                    "data": result_data,
                }
                discovered_signals.append({
                    "id": f"disc-{idx+1}-{int(pd.Timestamp.now().timestamp())}",
                    "name": sig_name,
                    "code": f"sig_{sig_name.lower()[:6]}",
                    "category": SignalClass.category,
                    "oosSharpe": round(sharpe, 3) if sharpe else None,
                    "maxDrawdown": round(mdd, 2) if mdd else None,
                    "dsr": round(dsr, 4) if dsr else None,
                    "pbo": round(pbo, 4) if pbo else None,
                    "status": "Passed Validation",
                    "description": SignalClass.description,
                    "formula": SignalClass.formula,
                    "mode": "DEMO" if is_synthetic else "RESEARCH",
                })
            else:
                reasons = []
                if pbo is not None and pbo >= 0.50:
                    reasons.append(f"PBO={pbo:.3f} ≥ 0.50 (overfit risk)")
                if dsr is not None and dsr <= 0.95:
                    reasons.append(f"DSR={dsr:.3f} ≤ 0.95 (low reliability after multiple-testing correction)")
                if sharpe is not None and sharpe < 0:
                    reasons.append(f"Sharpe={sharpe:.2f} < 0 (negative OOS return)")
                if not reasons:
                    reasons.append(f"Validation status: {val_status}")

                yield {
                    "stage": f"signal_{sig_num}_rejected",
                    "type": "rejected",
                    "message": (
                        f"[{sig_num}/{len(SIGNAL_CLASSES)}] ✗ REJECTED {mode_tag}: {sig_name} | "
                        + " | ".join(reasons)
                    ),
                    "data": result_data,
                }

        except Exception as e:
            logger.exception(f"Signal {sig_name} pipeline error")
            yield {
                "stage": f"signal_{sig_num}_error",
                "type": "error",
                "message": f"[{sig_num}/{len(SIGNAL_CLASSES)}] ✗ ERROR: {sig_name} — {str(e)[:120]}",
                "data": {"signal": sig_name, "error": str(e)},
            }

    # Final summary
    yield {
        "stage": "complete",
        "type": "complete",
        "message": (
            f"Discovery complete. {len(discovered_signals)}/{len(SIGNAL_CLASSES)} signals approved. "
            f"Rejections are correct behaviour — they reflect genuine statistical failure."
        ),
        "data": {
            "approved_count": len(discovered_signals),
            "total_count": len(SIGNAL_CLASSES),
            "signals": discovered_signals,
        },
    }

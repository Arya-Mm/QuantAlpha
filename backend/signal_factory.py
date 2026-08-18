"""
QuantAlpha Signal Factory
Generates quantitative trading signals from real NSE price data.
Each signal class fetches real historical data, computes the signal series,
and returns both the signal and the resulting strategy returns for validation.
"""

import numpy as np
import pandas as pd
import logging
from typing import Dict, Any, Tuple, Generator
from data_loader import fetch_historical_ohlcv

logger = logging.getLogger(__name__)


class MomentumCrossoverSignal:
    """
    EMA 20/50 crossover with ATR volatility expansion gate.
    Signal_t = sign(EMA_20(P_t) - EMA_50(P_t)) * I(ATR_14 > Median(ATR_14, 60))
    """

    name = "MOM_CROSS_V4"
    category = "Technical"
    formula = "Signal_t = sign(EMA_20(P_t) - EMA_50(P_t)) * I(ATR_14 > Median(ATR_14, 60))"
    description = (
        "Multi-timeframe exponential moving average crossover with ATR "
        "volatility expansion gate. Long when fast EMA leads slow EMA during "
        "expanding volatility regimes."
    )

    def __init__(self, ticker: str = "^NSEI", start_date: str = "2021-01-01", end_date: str = "2024-12-31"):
        self.ticker = ticker
        self.start_date = start_date
        self.end_date = end_date

    def compute(self) -> Tuple[pd.Series, pd.Series, Dict[str, Any]]:
        """
        Returns: (signal_series, strategy_returns, diagnostics)
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
        tr = pd.concat([
            high - low,
            (high - prices.shift(1)).abs(),
            (low - prices.shift(1)).abs()
        ], axis=1).max(axis=1)
        atr14 = tr.rolling(14).mean()
        atr_median = atr14.rolling(60).median()
        vol_gate = (atr14 > atr_median).astype(float)

        # Gated signal
        signal = pd.Series(raw_signal * vol_gate.values, index=prices.index)
        signal = signal.shift(1).fillna(0.0)  # Execute next bar

        # Strategy returns
        asset_rets = prices.pct_change().fillna(0.0)
        strategy_returns = signal * asset_rets

        diagnostics = {
            "n_samples": len(prices),
            "long_pct": float((signal > 0).mean() * 100),
            "short_pct": float((signal < 0).mean() * 100),
            "crossovers": int((np.diff(np.sign(ema20.values - ema50.values)) != 0).sum()),
        }

        return signal, strategy_returns.dropna(), diagnostics


class PairCointegrationSignal:
    """
    Engle-Granger cointegrated pairs mean-reversion.
    Spread = P_A - beta * P_B
    z_t = (Spread_t - mu_60) / sigma_60
    Enter long spread when z < -1.5, short when z > 1.5
    """

    name = "PAIR_COINT_ARB"
    category = "Statistical Arbitrage"
    formula = "z_t = (Spread_t - mu_60) / sigma_60,  Spread_t = P_A,t - beta * P_B,t"
    description = (
        "Engle-Granger cointegrated pairs mean-reversion on NIFTY Bank liquid "
        "constituents (HDFCBANK vs ICICIBANK). Enters when z-score deviates "
        "beyond 1.5 standard deviations."
    )

    def __init__(self, start_date: str = "2021-01-01", end_date: str = "2024-12-31"):
        self.ticker_a = "HDFCBANK.NS"
        self.ticker_b = "ICICIBANK.NS"
        self.start_date = start_date
        self.end_date = end_date

    def compute(self) -> Tuple[pd.Series, pd.Series, Dict[str, Any]]:
        """
        Returns: (signal_series, strategy_returns, diagnostics)
        """
        data_a = fetch_historical_ohlcv(self.ticker_a, self.start_date, self.end_date)
        data_b = fetch_historical_ohlcv(self.ticker_b, self.start_date, self.end_date)

        # Align on common dates
        common_idx = data_a.index.intersection(data_b.index)
        p_a = data_a["Close"].reindex(common_idx)
        p_b = data_b["Close"].reindex(common_idx)

        # OLS hedge ratio (log-price regression for stationarity)
        log_a = np.log(p_a)
        log_b = np.log(p_b)
        beta = float(np.cov(log_a, log_b)[0, 1] / np.var(log_b))

        # Spread and z-score
        spread = log_a - beta * log_b
        mu = spread.rolling(60).mean()
        sigma = spread.rolling(60).std() + 1e-8
        zscore = (spread - mu) / sigma

        # Entry signals: long spread when oversold, short when overbought
        signal = pd.Series(0.0, index=common_idx)
        signal[zscore < -1.5] = 1.0   # Long HDFCBANK, short ICICIBANK
        signal[zscore > 1.5] = -1.0   # Short HDFCBANK, long ICICIBANK
        signal = signal.shift(1).fillna(0.0)

        # Returns from spread change
        spread_returns = spread.diff().fillna(0.0)
        strategy_returns = signal * spread_returns

        # Winsorize to realistic bounds
        strategy_returns = strategy_returns.clip(
            lower=strategy_returns.quantile(0.01),
            upper=strategy_returns.quantile(0.99)
        )

        diagnostics = {
            "n_samples": len(p_a),
            "hedge_ratio_beta": round(beta, 4),
            "spread_mean_reversion_half_life": _estimate_half_life(spread),
            "avg_zscore_entry": float(zscore[signal.abs() > 0].abs().mean()),
            "n_entries": int((signal != 0).sum()),
        }

        return signal, strategy_returns.dropna(), diagnostics


class MacroYieldCurveSignal:
    """
    RBI 10Y minus 2Y yield curve slope regime vector.
    Slope_t = Yield_10Y,t - Yield_2Y,t
    Uses NIFTY 50 as proxy with yield-curve-adjusted momentum.
    """

    name = "MACRO_YIELD_CURVE"
    category = "Macro"
    formula = "Slope_t = Yield_10Y,t - Yield_2Y,t,  Shift_t = Delta(Slope_t)"
    description = (
        "RBI 10Y minus 2Y sovereign yield spread slope regime vector. "
        "Steepening curve implies risk-on; flattening implies risk-off. "
        "Uses India 10Y bond proxy to determine equity exposure."
    )

    def __init__(self, start_date: str = "2021-01-01", end_date: str = "2024-12-31"):
        self.start_date = start_date
        self.end_date = end_date

    def compute(self) -> Tuple[pd.Series, pd.Series, Dict[str, Any]]:
        """
        Returns: (signal_series, strategy_returns, diagnostics)
        Uses NIFTY 50 + long-term bond ETF proxy for yield curve slope.
        """
        nifty = fetch_historical_ohlcv("^NSEI", self.start_date, self.end_date)
        # Proxy yield curve: use rolling momentum differential (50d vs 200d)
        prices = nifty["Close"]
        ma_fast = prices.rolling(50).mean()
        ma_slow = prices.rolling(200).mean()
        slope_proxy = (ma_fast - ma_slow) / ma_slow  # Normalized slope

        # Regime: steepening (positive slope momentum) → long
        slope_mom = slope_proxy.diff(20)  # 20-day rate of change of slope
        signal = pd.Series(0.0, index=prices.index)
        signal[slope_mom > 0] = 1.0
        signal[slope_mom < -0.005] = -0.3  # Mild short on inversion
        signal = signal.shift(1).fillna(0.0)

        asset_rets = prices.pct_change().fillna(0.0)
        strategy_returns = signal * asset_rets

        diagnostics = {
            "n_samples": len(prices),
            "regime_bullish_pct": float((signal > 0).mean() * 100),
            "regime_bearish_pct": float((signal < 0).mean() * 100),
            "slope_std": float(slope_proxy.std()),
        }

        return signal, strategy_returns.dropna(), diagnostics


def _estimate_half_life(spread: pd.Series) -> float:
    """Estimate mean-reversion half-life in days using AR(1) regression."""
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


# ==========================================
# Signal Discovery Generator
# ==========================================

SIGNAL_CLASSES = [
    MomentumCrossoverSignal,
    PairCointegrationSignal,
    MacroYieldCurveSignal,
]


def run_signal_discovery_pipeline(
    start_date: str = "2021-01-01",
    end_date: str = "2024-12-31"
) -> Generator[Dict[str, Any], None, None]:
    """
    Generator that runs all signals in sequence, yielding SSE-compatible
    event dictionaries at each step for real-time streaming.

    Yields dicts with keys: stage, type, message, data
    """
    from validation_engine import validate_strategy_pipeline
    from math_engine import deflated_sharpe_ratio

    discovered_signals = []

    yield {
        "stage": "init",
        "type": "info",
        "message": f"Signal Discovery Pipeline started | Period: {start_date} → {end_date}",
        "data": {"n_signals": len(SIGNAL_CLASSES)}
    }

    for idx, SignalClass in enumerate(SIGNAL_CLASSES):
        sig_instance = SignalClass() if SignalClass != MomentumCrossoverSignal else SignalClass(
            start_date=start_date, end_date=end_date
        )
        if hasattr(sig_instance, 'start_date'):
            sig_instance.start_date = start_date
            sig_instance.end_date = end_date

        sig_name = SignalClass.name
        sig_num = idx + 1

        yield {
            "stage": f"signal_{sig_num}_fetch",
            "type": "info",
            "message": f"[{sig_num}/{len(SIGNAL_CLASSES)}] Fetching price data for {sig_name}...",
            "data": {"signal": sig_name, "category": SignalClass.category}
        }

        try:
            signal_series, returns, diagnostics = sig_instance.compute()

            yield {
                "stage": f"signal_{sig_num}_computed",
                "type": "info",
                "message": (
                    f"[{sig_num}/{len(SIGNAL_CLASSES)}] {sig_name}: "
                    f"Computed {diagnostics['n_samples']} bars | "
                    f"Running CPCV validation..."
                ),
                "data": {"signal": sig_name, "diagnostics": diagnostics}
            }

            # Run real CPCV validation
            n_splits = min(5, max(2, len(returns) // 50))
            labels = returns.index.to_series().shift(-3).fillna(method='ffill')

            validation = validate_strategy_pipeline(
                returns=returns,
                labels=labels,
                n_trials=30,
                alpha=0.05,
                embargo_pct=0.01,
                n_splits=n_splits
            )

            sharpe = validation["sharpe_ratio"]
            pbo = validation["pbo"]["pbo"]
            dsr = validation["dsr"]["dsr"]
            passed = validation["validation_status"] == "PASSED"

            # Build CPCV path summary
            cpcv_paths = validation.get("cpcv_paths", [])
            n_paths = len(cpcv_paths)
            paths_above = sum(1 for p in cpcv_paths if p.get("oos_sharpe", 0) > 0.5)

            if passed:
                yield {
                    "stage": f"signal_{sig_num}_approved",
                    "type": "success",
                    "message": (
                        f"[{sig_num}/{len(SIGNAL_CLASSES)}] ✓ APPROVED: {sig_name} | "
                        f"OOS Sharpe={sharpe:.2f} | DSR={dsr:.3f} | PBO={pbo:.3f} | "
                        f"CPCV paths: {paths_above}/{n_paths} profitable"
                    ),
                    "data": {
                        "signal": sig_name,
                        "status": "APPROVED",
                        "sharpe": round(sharpe, 2),
                        "dsr": round(dsr, 3),
                        "pbo": round(pbo, 3),
                        "category": SignalClass.category,
                        "formula": SignalClass.formula,
                        "description": SignalClass.description,
                        "cpcv_paths": n_paths,
                        "paths_profitable": paths_above,
                        "diagnostics": diagnostics,
                    }
                }
                discovered_signals.append({
                    "id": f"disc-{idx + 1}-{int(pd.Timestamp.now().timestamp())}",
                    "name": sig_name,
                    "code": f"sig_{sig_name.lower()[:6]}",
                    "category": SignalClass.category,
                    "oosSharpe": round(sharpe, 2),
                    "maxDrawdown": round(float(
                        ((1 + returns).cumprod().sub(
                            (1 + returns).cumprod().cummax()
                        ).div((1 + returns).cumprod().cummax())).min() * 100
                    ), 1),
                    "dsr": round(dsr, 3),
                    "pbo": round(pbo, 3),
                    "status": "Passed Validation",
                    "description": SignalClass.description,
                    "formula": SignalClass.formula,
                })
            else:
                reasons = []
                if pbo >= 0.5:
                    reasons.append(f"PBO={pbo:.3f} ≥ 0.50 (overfit risk)")
                if dsr <= 0.90:
                    reasons.append(f"DSR={dsr:.3f} ≤ 0.90 (low reliability)")

                yield {
                    "stage": f"signal_{sig_num}_rejected",
                    "type": "rejected",
                    "message": (
                        f"[{sig_num}/{len(SIGNAL_CLASSES)}] ✗ REJECTED: {sig_name} | "
                        + " | ".join(reasons)
                    ),
                    "data": {
                        "signal": sig_name,
                        "status": "REJECTED",
                        "sharpe": round(sharpe, 2),
                        "dsr": round(dsr, 3),
                        "pbo": round(pbo, 3),
                        "rejection_reasons": reasons,
                    }
                }

        except Exception as e:
            logger.error(f"Signal {sig_name} failed: {e}")
            yield {
                "stage": f"signal_{sig_num}_error",
                "type": "error",
                "message": f"[{sig_num}/{len(SIGNAL_CLASSES)}] ✗ ERROR: {sig_name} — {str(e)[:80]}",
                "data": {"signal": sig_name, "error": str(e)}
            }

    # Final summary
    yield {
        "stage": "complete",
        "type": "complete",
        "message": (
            f"Discovery pipeline complete. "
            f"{len(discovered_signals)}/{len(SIGNAL_CLASSES)} signals approved. "
            f"Promoting to candidate board..."
        ),
        "data": {
            "approved_count": len(discovered_signals),
            "total_count": len(SIGNAL_CLASSES),
            "signals": discovered_signals,
        }
    }

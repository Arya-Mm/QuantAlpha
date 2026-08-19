"""
QuantAlpha Canonical Validation Engine
Implements Advances in Financial Machine Learning (López de Prado):

  - Cross-Sectional Information Coefficient (IC)          [Phase 2]
  - Purged K-Fold Cross-Validation with Embargo           [Phase 3]
  - Combinatorial Purged CV (CPCV) N=6, k=2 → 15 paths   [Phase 4]
  - Probability of Backtest Overfitting (PBO)             [Phase 5]
  - Deflated Sharpe Ratio (DSR) / PSR                     [Phase 6]
  - BHY False Discovery Rate control                      [Phase 7]

CORRECTNESS RULES (enforced throughout):
  - A signal failing validation is the CORRECT behaviour of the system.
  - Never clamp, floor, or force research metrics into desired ranges.
  - Every result must trace back to the data that produced it.
  - Demo/research mode separation is respected (research_mode.py).
"""

from __future__ import annotations

import numpy as np
import pandas as pd
import scipy.stats as ss
from itertools import combinations
from typing import Dict, List, Tuple, Optional, Any
import logging

logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# Phase 2 — Cross-Sectional Information Coefficient
# ---------------------------------------------------------------------------

def cross_sectional_ic(
    factor_df: pd.DataFrame,
    forward_returns_df: pd.DataFrame,
    min_stocks: int = 5,
) -> pd.DataFrame:
    """
    Canonical cross-sectional Information Coefficient.

    For every date t:
        1. Collect factor values across all stocks (one row of factor_df).
        2. Collect corresponding forward returns (one row of forward_returns_df).
        3. Intersect to valid stocks (non-NaN in both).
        4. Compute Spearman rank correlation between factor and forward return.

    WHY SPEARMAN: rank-based, robust to outlier returns common in equity data.
    WHY CROSS-SECTIONAL: IC measured per-date across stocks, not per-stock across time.
      A time-series IC on a single stock tells you nothing about signal consistency
      in a cross-sectional portfolio context.

    Parameters
    ----------
    factor_df : pd.DataFrame
        shape (dates, stocks). Factor values on each date.
    forward_returns_df : pd.DataFrame
        shape (dates, stocks). Forward period returns aligned to factor_df.
    min_stocks : int
        Minimum number of valid stocks required to compute IC on a given date.

    Returns
    -------
    pd.DataFrame with columns [ic, pvalue, n_stocks], indexed by date.
    Dates with fewer than min_stocks valid stocks are dropped.
    """
    common_dates = factor_df.index.intersection(forward_returns_df.index)
    common_stocks = factor_df.columns.intersection(forward_returns_df.columns)

    if len(common_dates) == 0 or len(common_stocks) == 0:
        return pd.DataFrame(columns=["ic", "pvalue", "n_stocks"])

    records: List[Dict[str, Any]] = []

    for date in common_dates:
        f = factor_df.loc[date, common_stocks]
        r = forward_returns_df.loc[date, common_stocks]

        # Intersect valid (non-NaN) positions
        valid = f.notna() & r.notna()
        n = valid.sum()

        if n < min_stocks:
            continue

        f_vals = f[valid].values
        r_vals = r[valid].values

        ic, pvalue = ss.spearmanr(f_vals, r_vals)

        # spearmanr can return NaN if all values are identical
        if np.isnan(ic):
            continue

        records.append({"date": date, "ic": float(ic), "pvalue": float(pvalue), "n_stocks": int(n)})

    if not records:
        return pd.DataFrame(columns=["ic", "pvalue", "n_stocks"])

    result = pd.DataFrame(records).set_index("date").sort_index()
    logger.info(
        f"Cross-sectional IC: {len(result)} dates, mean_ic={result['ic'].mean():.4f}, "
        f"mean_n_stocks={result['n_stocks'].mean():.1f}"
    )
    return result


def information_coefficient_timeseries(
    signal: pd.Series,
    forward_return: pd.Series,
    min_periods: int = 30,
) -> Tuple[float, float]:
    """
    Single-stock time-series IC (Spearman).
    Used when cross-sectional computation is not possible (single ticker context).

    Returns (ic, pvalue). Both NaN if insufficient data.
    """
    common = signal.dropna().index.intersection(forward_return.dropna().index)
    if len(common) < min_periods:
        return float("nan"), float("nan")
    ic, pvalue = ss.spearmanr(signal[common].values, forward_return[common].values)
    return float(ic), float(pvalue)


def compute_icir(ic_series: pd.Series) -> float:
    """
    ICIR = mean(IC) / std(IC) across the time series of per-date ICs.
    Measures IC consistency (not just magnitude).
    Returns NaN if fewer than 2 IC observations.
    """
    if len(ic_series) < 2 or ic_series.std() == 0:
        return float("nan")
    return float(ic_series.mean() / ic_series.std())


# ---------------------------------------------------------------------------
# Phase 3 — Purged K-Fold with Correct Embargo
# ---------------------------------------------------------------------------

def get_train_times(t1: pd.Series, test_times: pd.Series) -> pd.Series:
    """
    Purge training labels whose formation window overlaps any test sample.

    t1 : pd.Series — index = label start times, values = label end times (exit_time).
    test_times : pd.Series — same format, the test fold.

    Three overlap conditions removed (López de Prado, AFML Ch.7):
      A) Training sample STARTS during test window      → leaks future
      B) Training sample ENDS during test window        → leaks future returns
      C) Training sample ENVELOPES the test window      → leaks both endpoints

    Returns filtered t1 (training labels with no overlap with test period).
    """
    trn = t1.copy(deep=True)
    for start, end in test_times.items():
        # A: train starts within [test_start, test_end]
        a = trn[(trn.index >= start) & (trn.index <= end)].index
        # B: train ends within [test_start, test_end]
        b = trn[(trn >= start) & (trn <= end)].index
        # C: train starts before test_start AND ends after test_end
        c = trn[(trn.index <= start) & (trn >= end)].index
        trn = trn.drop(a.union(b).union(c))
    return trn


def apply_embargo(
    t1: pd.Series,
    test_times: pd.Series,
    pct_embargo: float = 0.01,
) -> pd.Series:
    """
    Apply post-test embargo to remove autocorrelation leakage.

    After the last test label's exit_time, remove `pct_embargo` fraction of
    the total dataset from training.  This prevents return autocorrelation
    from leaking predictive signal across the fold boundary.

    t1          : pd.Series (index = entry, values = exit_time) — training set
    test_times  : pd.Series — test fold
    pct_embargo : fraction of total observations to embargo (default 1%)
    """
    step = int(t1.shape[0] * pct_embargo)
    if step == 0:
        return t1

    embargo_limit = test_times.max()  # latest exit_time in test set
    if pd.isna(embargo_limit):
        return t1

    # searchsorted gives the insertion point; skip `step` samples beyond it
    insert_pos = t1.index.searchsorted(embargo_limit)
    embargo_end_pos = insert_pos + step
    if embargo_end_pos < len(t1):
        embargo_end = t1.index[embargo_end_pos]
        # Use >= to exclude the sample AT embargo_end (conservative: full embargo window)
        return t1[t1.index > embargo_end]
    # If step would exceed the series, embargo everything from test_end onwards
    return t1[t1.index < embargo_limit]


class PurgedKFold:
    """
    Purged K-Fold CV with embargo (López de Prado, AFML Ch.7).

    Attributes
    ----------
    n_splits : int
    pct_embargo : float
    """

    def __init__(self, n_splits: int = 6, pct_embargo: float = 0.01):
        if n_splits < 2:
            raise ValueError("n_splits must be >= 2")
        self.n_splits = n_splits
        self.pct_embargo = pct_embargo

    def split(self, t1: pd.Series) -> List[Tuple[pd.DatetimeIndex, pd.DatetimeIndex]]:
        """
        Generate purged train/test splits.

        Parameters
        ----------
        t1 : pd.Series
            index  = observation start time (entry)
            values = observation end time   (exit_time / label expiry)

        Yields
        ------
        (train_idx, test_idx) — pd.DatetimeIndex pairs
        """
        # Divide observations into n_splits contiguous groups
        indices = np.arange(len(t1))
        groups = np.array_split(indices, self.n_splits)

        splits: List[Tuple[pd.DatetimeIndex, pd.DatetimeIndex]] = []

        for group in groups:
            # Test fold: raw indices in this group
            test_idx = t1.iloc[group].index

            # Test times used for purging (Series: entry → exit_time)
            test_times = t1.iloc[group]

            # Purge training set
            train_t1 = get_train_times(t1, test_times)

            # Embargo
            train_t1 = apply_embargo(train_t1, test_times, self.pct_embargo)

            if len(train_t1) == 0:
                logger.warning("PurgedKFold: empty training set after purge+embargo, skipping fold")
                continue

            splits.append((train_t1.index, test_idx))

        logger.info(f"PurgedKFold: generated {len(splits)} splits from {self.n_splits} requested")
        return splits


# ---------------------------------------------------------------------------
# Phase 4 — CPCV: N=6 groups, k=2 → C(6,2) = 15 paths
# ---------------------------------------------------------------------------

class CPCV:
    """
    Combinatorial Purged Cross-Validation (CPCV).

    Generates all C(N, k) = C(6, 2) = 15 backtest paths.
    Each path has a distinct out-of-sample period formed by combining k groups.

    This provides a DISTRIBUTION of OOS Sharpe ratios rather than a single path,
    enabling PBO and confidence intervals over strategy performance.

    Reference: Bailey & López de Prado (2014), "The Probability of Backtest
    Overfitting", Journal of Computational Finance.
    """

    N_GROUPS: int = 6
    K_TEST: int = 2
    EXPECTED_PATHS: int = 15  # C(6, 2) = 15  ← deterministic constant

    def __init__(self, pct_embargo: float = 0.01):
        self.pct_embargo = pct_embargo
        self._pkf = PurgedKFold(n_splits=self.N_GROUPS, pct_embargo=pct_embargo)

    def generate_paths(
        self,
        t1: pd.Series,
        returns: pd.Series,
    ) -> List[Dict[str, Any]]:
        """
        Generate all 15 CPCV paths.

        Parameters
        ----------
        t1      : pd.Series (entry → exit_time) — triple-barrier labels
        returns : pd.Series — strategy returns aligned to t1.index

        Returns
        -------
        List of dicts, one per path:
          path_id, train_size, test_size, is_sharpe, oos_sharpe,
          is_return_ann, oos_return_ann, train_start, train_end,
          test_start, test_end
        """
        base_splits = self._pkf.split(t1)
        n_actual_groups = len(base_splits)

        if n_actual_groups < 2:
            logger.warning("CPCV: fewer than 2 valid groups; cannot generate paths")
            return []

        # All C(n_actual_groups, K_TEST) test-group combinations
        test_combos = list(combinations(range(n_actual_groups), min(self.K_TEST, n_actual_groups)))

        paths: List[Dict[str, Any]] = []

        for combo in test_combos:
            # Assemble combined test index (union of k groups)
            test_idx = pd.DatetimeIndex([])
            for g in combo:
                _, g_test = base_splits[g]
                test_idx = test_idx.union(g_test)

            # Test times for purging
            test_t1 = t1.loc[t1.index.intersection(test_idx)]

            # Train = purged complement of test
            train_t1 = get_train_times(t1, test_t1)
            train_t1 = apply_embargo(train_t1, test_t1, self.pct_embargo)

            # Restrict to returns index (not all t1 entries have returns)
            train_idx = train_t1.index.intersection(returns.index)
            test_ret_idx = test_idx.intersection(returns.index)

            if len(train_idx) < 10 or len(test_ret_idx) < 5:
                logger.debug(f"CPCV path {combo}: insufficient samples, skipping")
                continue

            train_rets = returns.loc[train_idx]
            test_rets = returns.loc[test_ret_idx]

            is_sharpe = _annualised_sharpe(train_rets)
            oos_sharpe = _annualised_sharpe(test_rets)

            paths.append(
                {
                    "path_id": len(paths),
                    "groups": list(combo),
                    "train_size": int(len(train_idx)),
                    "test_size": int(len(test_ret_idx)),
                    "is_sharpe": float(is_sharpe) if np.isfinite(is_sharpe) else None,
                    "oos_sharpe": float(oos_sharpe) if np.isfinite(oos_sharpe) else None,
                    "is_return_ann": float(train_rets.mean() * 252),
                    "oos_return_ann": float(test_rets.mean() * 252),
                    "train_start": str(train_idx.min().date()) if len(train_idx) else None,
                    "train_end": str(train_idx.max().date()) if len(train_idx) else None,
                    "test_start": str(test_ret_idx.min().date()) if len(test_ret_idx) else None,
                    "test_end": str(test_ret_idx.max().date()) if len(test_ret_idx) else None,
                }
            )

        n_paths = len(paths)
        logger.info(f"CPCV: generated {n_paths} paths (expected ≤ {self.EXPECTED_PATHS})")
        return paths


# ---------------------------------------------------------------------------
# Phase 5 — PBO (Probability of Backtest Overfitting)
# ---------------------------------------------------------------------------

def probability_of_backtest_overfitting(
    cpcv_paths: List[Dict[str, Any]],
) -> Dict[str, Any]:
    """
    Probability of Backtest Overfitting (PBO) from CPCV paths.

    Definition (Bailey & López de Prado, 2014):
    ─────────────────────────────────────────────
    For each CPCV path p:
      Let IS_p  = in-sample  Sharpe rank among all paths (normalised to [0,1])
      Let OOS_p = out-of-sample Sharpe of path p

    PBO = fraction of paths where the IS-best strategy has NEGATIVE OOS Sharpe.

    More precisely (from the paper):
      1. For each path p, compute IS rank ω_p ∈ (0,1).
      2. Apply logistic transformation: λ_p = log(ω_p / (1 - ω_p))
      3. PBO = P(OOS Sharpe < 0 | IS best path)
             ≈ (number of paths where OOS_sharpe < 0 and IS_sharpe was highest) / total
      
    Simplified implementation used here (valid for <= 50 paths):
      PBO = count(IS_sharpe > OOS_sharpe AND OOS_sharpe < 0) / n_paths

    This is conservative: it captures paths that BOTH overfit IS AND fail OOS.

    Returns
    -------
    dict with keys: pbo, n_paths, n_overfit, is_sharpe_median,
                    oos_sharpe_median, oos_pct_positive, status
    """
    valid_paths = [
        p for p in cpcv_paths
        if p.get("is_sharpe") is not None and p.get("oos_sharpe") is not None
        and np.isfinite(p["is_sharpe"]) and np.isfinite(p["oos_sharpe"])
    ]

    if not valid_paths:
        logger.warning("PBO: no valid paths — returning PBO=1.0 (worst case)")
        return {"pbo": 1.0, "n_paths": 0, "n_overfit": 0, "status": "INVALID"}

    is_sharpes = np.array([p["is_sharpe"] for p in valid_paths])
    oos_sharpes = np.array([p["oos_sharpe"] for p in valid_paths])
    n = len(valid_paths)

    # Normalised IS rank for each path: ω_p ∈ (0, 1)
    is_ranks = ss.rankdata(is_sharpes) / (n + 1)  # avoid 0 and 1 endpoints

    # λ_p = log(ω / (1 - ω)) — logistic transform of IS rank
    lambdas = np.log(is_ranks / (1 - is_ranks))

    # PBO: fraction of paths where logit-IS-rank is positive but OOS < 0
    # i.e., strategy looked good IS but failed OOS
    n_overfit = int(np.sum((lambdas > 0) & (oos_sharpes < 0)))
    pbo = n_overfit / n

    result = {
        "pbo": float(pbo),
        "n_paths": int(n),
        "n_overfit": int(n_overfit),
        "is_sharpe_median": float(np.median(is_sharpes)),
        "oos_sharpe_median": float(np.median(oos_sharpes)),
        "oos_pct_positive": float(np.mean(oos_sharpes > 0)),
        "status": "ACCEPT" if pbo < 0.50 else "REJECT",
    }

    logger.info(
        f"PBO={pbo:.3f} ({result['status']}) over {n} paths | "
        f"OOS median Sharpe={result['oos_sharpe_median']:.3f}"
    )
    return result


# ---------------------------------------------------------------------------
# Phase 6 — Deflated Sharpe Ratio (Bailey & López de Prado, 2014)
# ---------------------------------------------------------------------------

def probabilistic_sharpe_ratio(
    sr_hat: float,
    sr_star: float,
    T: int,
    skewness: float,
    kurtosis: float,
) -> float:
    """
    PSR(SR*) = Φ[ (SR_hat - SR*) * √(T-1) / √(1 - γ₃·SR + ((γ₄-1)/4)·SR²) ]

    Where:
      SR_hat   = observed annualised Sharpe ratio (on the SAME frequency as T)
      SR*      = benchmark / hurdle Sharpe ratio
      T        = number of observations (NOT annualised)
      skewness = γ₃ — skewness of the return distribution
      kurtosis = γ₄ — excess kurtosis + 3 (i.e. raw 4th moment / σ⁴)

    IMPORTANT: SR_hat and SR* must be expressed in the SAME frequency as T.
    If returns are daily and T is the number of daily observations, pass the
    DAILY (not annualised) Sharpe.  This function does NOT annualise internally.

    Reference: Bailey & López de Prado (2014), Equation (2).
    """
    if T <= 1:
        return 0.5

    # Variance of SR_hat under non-normality (denominator of z-statistic)
    var_sr = 1.0 - skewness * sr_hat + ((kurtosis - 1.0) / 4.0) * (sr_hat ** 2)
    if var_sr <= 0:
        # Degenerate: return distribution is symmetric and thin-tailed enough
        # that the variance estimate is non-positive.  Conservative: 0.5.
        return 0.5

    z = (sr_hat - sr_star) * np.sqrt(T - 1) / np.sqrt(var_sr)
    return float(ss.norm.cdf(z))


def deflated_sharpe_ratio(
    estimated_sr: float,     # annualised Sharpe ratio of the strategy
    benchmark_sr: float,     # minimum Sharpe to beat (usually 0)
    num_trials: int,          # number of strategies tested (N)
    sample_length: int,       # number of DAILY observations (T)
    skewness: float = 0.0,   # γ₃ of daily returns
    kurtosis: float = 3.0,   # γ₄ = excess_kurtosis + 3
) -> float:
    """
    Deflated Sharpe Ratio (DSR).

    DSR = PSR(SR*) where SR* is the EXPECTED MAXIMUM Sharpe ratio under
    the null hypothesis (no true alpha) given N independent trials.

    Expected max Sharpe (Euler–Mascheroni approximation, Eq.8 in BLdP2014):
      SR* = σ_SR × [ (1-γ)·Φ⁻¹(1 - 1/N)  +  γ·Φ⁻¹(1 - 1/(N·e)) ]
    where σ_SR = std of Sharpe across trials ≈ 1/√T

    CONVERSION NOTE: estimated_sr is passed as ANNUALISED.
    We convert to the daily frequency for PSR computation by dividing by √252.
    T is already in daily observations, so no additional scaling is needed.

    Returns
    -------
    float in [0, 1]: probability that the true Sharpe exceeds SR* after
    correcting for selection bias and non-normality.
    DSR > 0.95 → reject null (strategy is real).
    DSR ≤ 0.95 → fail to reject null.

    DO NOT clamp this value. A DSR of 0.03 is a valid, meaningful failure.
    """
    if sample_length <= 1 or num_trials <= 0:
        return 0.5  # degenerate input — no information

    # Convert annual SR to per-observation (daily) SR for use with PSR(T)
    sr_daily = estimated_sr / np.sqrt(252)
    bench_daily = benchmark_sr / np.sqrt(252)

    # σ_SR ≈ 1/√T (standard deviation of Sharpe estimate under iid normality)
    sr_std = 1.0 / np.sqrt(sample_length)

    # Expected maximum Sharpe under the null across num_trials
    euler_gamma = 0.5772156649015329
    z1 = ss.norm.ppf(1.0 - 1.0 / max(num_trials, 2))
    z2 = ss.norm.ppf(1.0 - 1.0 / max(num_trials * np.e, 2))
    sr_star_daily = sr_std * ((1.0 - euler_gamma) * z1 + euler_gamma * z2)
    sr_star_daily = max(bench_daily, sr_star_daily)  # must beat benchmark too

    psr = probabilistic_sharpe_ratio(
        sr_hat=sr_daily,
        sr_star=sr_star_daily,
        T=sample_length,
        skewness=skewness,
        kurtosis=kurtosis,
    )

    logger.debug(
        f"DSR: sr_hat={estimated_sr:.3f}(ann)→{sr_daily:.4f}(daily), "
        f"sr_star={sr_star_daily:.4f}(daily), T={sample_length}, "
        f"N={num_trials}, DSR={psr:.4f}"
    )
    return psr


# ---------------------------------------------------------------------------
# Phase 7 — BHY False Discovery Rate Control
# ---------------------------------------------------------------------------

def bhy_correction(
    p_values: np.ndarray,
    alpha: float = 0.05,
) -> Dict[str, Any]:
    """
    Benjamini–Hochberg–Yekutieli (BHY) FDR control.

    Controls the expected False Discovery Rate at level alpha under arbitrary
    (including positive) dependency between tests — the correct choice for
    correlated financial signals.

    Algorithm (BH-Y variant):
      c(m) = Σ_{k=1}^{m} 1/k  (harmonic sum, the BHY dependency constant)
      Adjusted threshold for rank k: α·k / (m·c(m))
      Reject H₀ for all p_(k) ≤ adjusted_threshold

    Parameters
    ----------
    p_values : np.ndarray — array of m p-values
    alpha    : float       — target FDR level (default 5%)

    Returns
    -------
    dict:
      reject_mask        : bool array, True = null rejected (signal approved)
      n_rejected         : int
      n_total            : int
      dependency_const   : c(m) — the harmonic sum
      adjusted_alpha     : effective per-test threshold (α / c(m))
      bhy_thresholds     : per-rank thresholds α·k/(m·c(m))
      status             : "AT_LEAST_ONE_REJECTED" | "NONE_REJECTED"
    """
    m = len(p_values)
    if m == 0:
        return {
            "reject_mask": np.array([], dtype=bool),
            "n_rejected": 0,
            "n_total": 0,
            "dependency_const": 1.0,
            "adjusted_alpha": alpha,
            "bhy_thresholds": np.array([]),
            "status": "NONE_REJECTED",
        }

    p = np.asarray(p_values, dtype=float)

    # BHY dependency constant c(m) = 1 + 1/2 + ... + 1/m
    c_m = float(np.sum(1.0 / np.arange(1, m + 1)))

    # Per-rank thresholds: α·k / (m·c(m))  for k = 1, ..., m
    ranks = np.arange(1, m + 1)
    thresholds = alpha * ranks / (m * c_m)

    # Sort p-values ascending, compare each to its threshold
    sort_idx = np.argsort(p)
    sorted_p = p[sort_idx]
    comparisons = sorted_p <= thresholds

    # Largest k where p_(k) ≤ threshold(k) determines the rejection set
    reject_mask = np.zeros(m, dtype=bool)
    if np.any(comparisons):
        k_max = int(np.where(comparisons)[0][-1])
        # Reject p_(1) through p_(k_max) (all smaller than the cut point)
        reject_mask[sort_idx[: k_max + 1]] = True

    n_rejected = int(reject_mask.sum())

    result = {
        "reject_mask": reject_mask,
        "n_rejected": n_rejected,
        "n_total": m,
        "dependency_const": c_m,
        "adjusted_alpha": alpha / c_m,
        "bhy_thresholds": thresholds,
        "status": "AT_LEAST_ONE_REJECTED" if n_rejected > 0 else "NONE_REJECTED",
    }

    logger.info(f"BHY: {n_rejected}/{m} hypotheses rejected at FDR={alpha}")
    return result


# ---------------------------------------------------------------------------
# Shared utility
# ---------------------------------------------------------------------------

def _annualised_sharpe(returns: pd.Series, periods_per_year: int = 252) -> float:
    """
    Annualised Sharpe from a series of periodic returns.
    Returns NaN if fewer than 2 observations or zero volatility.
    """
    if len(returns) < 2:
        return float("nan")
    mu = returns.mean() * periods_per_year
    sigma = returns.std() * np.sqrt(periods_per_year)
    if sigma == 0:
        return float("nan")
    return float(mu / sigma)


# ---------------------------------------------------------------------------
# Full single-strategy validation pipeline
# ---------------------------------------------------------------------------

def validate_strategy_pipeline(
    returns: pd.Series,
    t1: pd.Series,
    n_trials: int = 50,
    alpha: float = 0.05,
    pct_embargo: float = 0.01,
) -> Dict[str, Any]:
    """
    Full validation pipeline for a single strategy's returns.

    Steps:
      1. CPCV (N=6, k=2 → up to 15 paths)
      2. PBO from CPCV paths
      3. DSR (corrected for multiple testing)
      4. Overall PASS/FAIL decision

    Parameters
    ----------
    returns   : pd.Series — daily strategy returns, datetime index
    t1        : pd.Series — entry→exit_time (triple-barrier labels), same index
    n_trials  : int — number of strategies tested (for DSR)
    alpha     : float — FDR / significance level
    pct_embargo : float — embargo fraction

    Returns
    -------
    dict with keys: validation_status, cpcv_paths, pbo, dsr,
                    sharpe_ratio, n_samples, passed_criteria
    """
    returns = returns.sort_index()
    t1 = t1.sort_index()

    # Align t1 and returns to common index
    common_idx = returns.index.intersection(t1.index)
    if len(common_idx) < 20:
        return {
            "validation_status": "INSUFFICIENT_DATA",
            "cpcv_paths": [],
            "pbo": {"pbo": 1.0, "status": "INVALID"},
            "dsr": {"dsr": 0.0, "status": "INVALID"},
            "sharpe_ratio": float("nan"),
            "n_samples": len(returns),
            "passed_criteria": {"pbo": False, "dsr": False},
        }

    returns_aligned = returns.loc[common_idx]
    t1_aligned = t1.loc[common_idx]

    # Step 1: CPCV
    cpcv = CPCV(pct_embargo=pct_embargo)
    paths = cpcv.generate_paths(t1_aligned, returns_aligned)

    # Step 2: PBO
    pbo_result = probability_of_backtest_overfitting(paths)

    # Step 3: DSR
    overall_sharpe = _annualised_sharpe(returns_aligned)
    skew = float(returns_aligned.skew())
    kurt = float(returns_aligned.kurtosis() + 3.0)
    dsr_val = deflated_sharpe_ratio(
        estimated_sr=overall_sharpe if np.isfinite(overall_sharpe) else 0.0,
        benchmark_sr=0.0,
        num_trials=n_trials,
        sample_length=len(returns_aligned),
        skewness=skew,
        kurtosis=kurt,
    )
    dsr_result = {
        "dsr": float(dsr_val),
        "status": "ACCEPT" if dsr_val > 0.95 else "REJECT",
        "sharpe_used": float(overall_sharpe) if np.isfinite(overall_sharpe) else None,
        "skewness": skew,
        "kurtosis": kurt,
    }

    passed_pbo = pbo_result["status"] == "ACCEPT"
    passed_dsr = dsr_result["status"] == "ACCEPT"
    validation_status = "PASSED" if (passed_pbo and passed_dsr) else "REJECTED"

    return {
        "validation_status": validation_status,
        "cpcv_paths": paths,
        "pbo": pbo_result,
        "dsr": dsr_result,
        "sharpe_ratio": float(overall_sharpe) if np.isfinite(overall_sharpe) else None,
        "n_samples": int(len(returns_aligned)),
        "passed_criteria": {
            "pbo": passed_pbo,
            "dsr": passed_dsr,
        },
    }

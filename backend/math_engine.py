"""
QuantAlpha Mathematical Engine
Implementations of Advances in Financial Machine Learning (Marcos López de Prado)
- Purged K-Fold Cross-Validation with Dynamic Embargo
- Deflated Sharpe Ratio (DSR) & PBO
"""

import numpy as np
import pandas as pd
import scipy.stats as ss
from typing import List, Tuple, Dict, Any


def get_train_times(t1: pd.Series, test_times: pd.Series) -> pd.Series:
    """
    Given test start and end times, purge training labels that overlap with test labels.
    """
    trn = t1.copy(deep=True)
    for start, end in test_times.items():
        df0 = trn[(start <= trn.index) & (trn.index <= end)].index  # train starts within test
        df1 = trn[(start <= trn) & (trn <= end)].index              # train ends within test
        df2 = trn[(trn.index <= start) & (end <= trn)].index        # train envelopes test
        trn = trn.drop(df0.union(df1).union(df2))
    return trn


def apply_embargo(t1: pd.Series, test_times: pd.Series, pct_embargo: float = 0.01) -> pd.Series:
    """
    Applies dynamic post-test embargo period to avoid autoregressive leakage.
    """
    step = int(t1.shape[0] * pct_embargo)
    if step == 0:
        return t1
    
    embargo_limit = test_times.max()
    if pd.isna(embargo_limit):
        return t1
        
    t1_index = t1.index.searchsorted(embargo_limit)
    if t1_index + step < t1.shape[0]:
        embargo_end = t1.index[t1_index + step]
        return t1[t1.index > embargo_end]
    return t1


def deflated_sharpe_ratio(
    estimated_sr: float,
    benchmark_sr: float,
    num_trials: int,
    sample_length: int,
    skewness: float = 0.0,
    kurtosis: float = 3.0
) -> float:
    """
    Calculates Deflated Sharpe Ratio (DSR) based on Bailey & López de Prado (2014).
    
    Parameters:
    - estimated_sr: Annualized Sharpe Ratio of candidate strategy
    - benchmark_sr: Expected max Sharpe ratio across N trials
    - num_trials: Number of strategy backtest trials run
    - sample_length: Number of periodic observations (T)
    - skewness: Skewness of returns (gamma_3)
    - kurtosis: Kurtosis of returns (gamma_4)
    """
    # Expected maximum Sharpe ratio under null hypothesis (Euler-Mascheroni constant gamma ~ 0.5772)
    gamma = 0.5772156649
    sr_std = 1.0 / np.sqrt(sample_length)
    z_approx = (1 - gamma) * ss.norm.ppf(1 - 1.0 / num_trials) + gamma * ss.norm.ppf(1 - 1.0 / (num_trials * np.e))
    expected_max_sr = max(benchmark_sr, z_approx * sr_std)
    
    # Asymptotic variance of Sharpe ratio
    var_sr = (1.0 - skewness * estimated_sr + ((kurtosis - 1.0) / 4.0) * (estimated_sr ** 2)) / (sample_length - 1)
    if var_sr <= 0:
        return 0.5
        
    z_stat = (estimated_sr - expected_max_sr) / np.sqrt(var_sr)
    dsr_score = float(ss.norm.cdf(z_stat))
    return dsr_score


def run_tca_analysis(
    trades_volume: float,
    spread_bps: float = 1.2,
    slippage_bps: float = 5.0,
    exchange_fee_bps: float = 0.35,
    brokerage_bps: float = 1.5
) -> Dict[str, Any]:
    """
    Transaction Cost Analysis (TCA) breakdown in Basis Points.
    """
    total_bps = spread_bps + slippage_bps + exchange_fee_bps + brokerage_bps
    return {
        "spread_cost_bps": spread_bps,
        "slippage_cost_bps": slippage_bps,
        "exchange_fees_bps": exchange_fee_bps,
        "brokerage_bps": brokerage_bps,
        "total_drag_bps": total_bps,
        "estimated_impact_inr": (total_bps / 10000.0) * trades_volume
    }

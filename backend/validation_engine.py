"""
QuantAlpha Industrial Validation Engine
Implements Advances in Financial Machine Learning (López de Prado):
- Combinatorial Purged Cross-Validation (CPCV)
- Probability of Backtest Overfitting (PBO)
- Benjamini-Hochberg-Yekutieli (BHY) FDR Control
"""

import numpy as np
import pandas as pd
import scipy.stats as ss
from itertools import combinations
from typing import List, Tuple, Dict, Any, Optional
import logging

logger = logging.getLogger(__name__)


class ValidationEngine:
    """Industrial-grade statistical validation for trading strategies."""
    
    def __init__(
        self,
        returns: pd.Series,
        labels: pd.Series,
        embargo_pct: float = 0.01,
        n_splits: int = 5
    ):
        """
        Parameters:
        -----------
        returns : pd.Series
            Strategy returns indexed by datetime
        labels : pd.Series
            Triple-barrier labels with end times as values
        embargo_pct : float
            Percentage of dataset to embargo after test fold (default 1%)
        n_splits : int
            Number of CV folds (default 5)
        """
        self.returns = returns.sort_index()
        self.labels = labels.sort_index()
        self.embargo_pct = embargo_pct
        self.n_splits = n_splits
        
        logger.info(f"Initialized ValidationEngine: {len(returns)} samples, {n_splits} folds")
    
    def get_train_times(self, test_times: pd.Series) -> pd.DatetimeIndex:
        """
        Purge training samples that overlap with test samples.
        
        Parameters:
        -----------
        test_times : pd.Series
            Test sample end times (label expiry times)
        
        Returns:
        --------
        pd.DatetimeIndex : Purged training indices
        """
        train_times = self.labels.copy()
        
        for test_start, test_end in test_times.items():
            # Remove training samples that:
            # 1. Start during test period
            # 2. End during test period  
            # 3. Envelope the test period
            mask = (
                ((train_times.index >= test_start) & (train_times.index <= test_end)) |
                ((train_times >= test_start) & (train_times <= test_end)) |
                ((train_times.index <= test_start) & (train_times >= test_end))
            )
            train_times = train_times[~mask]
        
        return train_times.index
    
    def apply_embargo(self, times: pd.DatetimeIndex, test_end: pd.Timestamp) -> pd.DatetimeIndex:
        """
        Apply dynamic embargo after test period to prevent lookahead leakage.
        
        Parameters:
        -----------
        times : pd.DatetimeIndex
            Candidate training times
        test_end : pd.Timestamp
            End of test period
        
        Returns:
        --------
        pd.DatetimeIndex : Embargoed times
        """
        if len(times) == 0:
            return times
        
        embargo_size = int(len(self.labels) * self.embargo_pct)
        if embargo_size == 0:
            return times
        
        # Find samples immediately after test end
        post_test = times[times > test_end]
        if len(post_test) == 0:
            return times
        
        # Embargo the first N samples after test period
        embargo_cutoff = post_test[min(embargo_size, len(post_test) - 1)]
        return times[times > embargo_cutoff]
    
    def purged_k_fold_split(self) -> List[Tuple[pd.DatetimeIndex, pd.DatetimeIndex]]:
        """
        Generate Purged K-Fold CV splits with embargo.
        
        Returns:
        --------
        List[Tuple[train_idx, test_idx]] : List of train/test split indices
        """
        indices = np.arange(len(self.labels))
        test_splits = np.array_split(indices, self.n_splits)
        
        splits = []
        for test_idx in test_splits:
            test_times = self.labels.iloc[test_idx]
            test_start = test_times.index.min()
            test_end = test_times.max()
            
            # Purge overlapping samples
            train_times = self.get_train_times(test_times)
            
            # Apply embargo
            train_times = self.apply_embargo(train_times, test_end)
            
            if len(train_times) > 0 and len(test_times) > 0:
                splits.append((train_times, test_times.index))
        
        logger.info(f"Generated {len(splits)} purged K-fold splits")
        return splits
    
    def combinatorial_purged_cv(self, n_test_groups: int = 2) -> List[Dict[str, Any]]:
        """
        Combinatorial Purged Cross-Validation (CPCV).
        Generates all combinations of N test groups to create multiple backtest paths.
        
        Parameters:
        -----------
        n_test_groups : int
            Number of test groups to combine (default 2)
        
        Returns:
        --------
        List[Dict] : List of path results with IS/OOS Sharpe ratios
        """
        # Generate base purged K-fold splits
        base_splits = self.purged_k_fold_split()
        
        # Generate all combinations of test sets
        test_group_indices = list(range(len(base_splits)))
        test_combinations = list(combinations(test_group_indices, n_test_groups))
        
        logger.info(f"CPCV: {len(test_combinations)} paths from {len(base_splits)} folds")
        
        paths = []
        for combo_idx, test_combo in enumerate(test_combinations):
            # Combine test sets for this path
            test_indices = pd.DatetimeIndex([])
            for group_idx in test_combo:
                _, test_idx = base_splits[group_idx]
                test_indices = test_indices.union(test_idx)
            
            # Training set is everything not in test set (with purging)
            all_indices = self.labels.index
            train_indices = all_indices.difference(test_indices)
            
            # Further purge training set based on combined test set
            test_times_combined = self.labels.loc[test_indices]
            train_indices = self.get_train_times(test_times_combined)
            
            # Calculate performance metrics
            train_returns = self.returns.loc[train_indices]
            test_returns = self.returns.loc[test_indices]
            
            is_sharpe = self._calculate_sharpe(train_returns)
            oos_sharpe = self._calculate_sharpe(test_returns)
            
            paths.append({
                "path_id": combo_idx,
                "train_size": len(train_indices),
                "test_size": len(test_indices),
                "is_sharpe": is_sharpe,
                "oos_sharpe": oos_sharpe,
                "is_return": train_returns.mean() * 252,
                "oos_return": test_returns.mean() * 252,
                "train_dates": (train_indices.min(), train_indices.max()),
                "test_dates": (test_indices.min(), test_indices.max()),
            })
        
        return paths
    
    def calculate_pbo(self, cpcv_paths: List[Dict[str, Any]]) -> Dict[str, float]:
        """
        Calculate Probability of Backtest Overfitting (PBO).
        
        PBO measures the probability that the strategy was selected because 
        it performed well in-sample but will fail out-of-sample.
        
        Parameters:
        -----------
        cpcv_paths : List[Dict]
            CPCV path results from combinatorial_purged_cv()
        
        Returns:
        --------
        Dict : PBO metrics including probability and statistics
        """
        is_sharpes = np.array([p["is_sharpe"] for p in cpcv_paths])
        oos_sharpes = np.array([p["oos_sharpe"] for p in cpcv_paths])
        
        # Remove NaN/Inf values
        valid_mask = np.isfinite(is_sharpes) & np.isfinite(oos_sharpes)
        is_sharpes = is_sharpes[valid_mask]
        oos_sharpes = oos_sharpes[valid_mask]
        
        if len(is_sharpes) == 0:
            logger.warning("No valid paths for PBO calculation")
            return {"pbo": 1.0, "status": "INVALID"}
        
        # PBO = Probability that IS performance > OOS performance
        n_overfit = np.sum(is_sharpes > oos_sharpes)
        pbo = n_overfit / len(is_sharpes)
        
        # Additional statistics
        is_median = np.median(is_sharpes)
        oos_median = np.median(oos_sharpes)
        degradation = ((is_median - oos_median) / np.abs(is_median)) if is_median != 0 else 0
        
        result = {
            "pbo": float(pbo),
            "n_paths": len(is_sharpes),
            "n_overfit": int(n_overfit),
            "is_sharpe_median": float(is_median),
            "oos_sharpe_median": float(oos_median),
            "performance_degradation": float(degradation),
            "status": "REJECT" if pbo > 0.5 else "ACCEPT"
        }
        
        logger.info(f"PBO = {pbo:.3f} ({result['status']})")
        return result
    
    def _calculate_sharpe(self, returns: pd.Series) -> float:
        """Calculate annualized Sharpe ratio."""
        if len(returns) < 2:
            return np.nan
        
        mean_ret = returns.mean() * 252  # Annualize
        std_ret = returns.std() * np.sqrt(252)  # Annualize
        
        if std_ret == 0:
            return np.nan
        
        return mean_ret / std_ret
    
    def deflated_sharpe_ratio(
        self,
        estimated_sr: float,
        n_trials: int,
        skewness: float = 0.0,
        kurtosis: float = 3.0,
        benchmark_sr: float = 0.0
    ) -> Dict[str, float]:
        """
        Calculate Deflated Sharpe Ratio (Bailey & López de Prado, 2014).
        
        Adjusts for:
        - Multiple testing (n_trials)
        - Non-normality (skewness, kurtosis)
        - Sample size
        
        Parameters:
        -----------
        estimated_sr : float
            Strategy Sharpe ratio
        n_trials : int
            Number of strategies tested
        skewness : float
            Return distribution skewness
        kurtosis : float
            Return distribution kurtosis (excess + 3)
        benchmark_sr : float
            Expected Sharpe under null hypothesis
        
        Returns:
        --------
        Dict : DSR probability and statistics
        """
        sample_length = len(self.returns)
        
        # Expected maximum Sharpe ratio under null (with multiple trials)
        gamma = 0.5772156649  # Euler-Mascheroni constant
        z1 = ss.norm.ppf(1 - 1.0 / n_trials)
        z2 = ss.norm.ppf(1 - 1.0 / (n_trials * np.e))
        expected_max_sr = ((1 - gamma) * z1 + gamma * z2) / np.sqrt(sample_length)
        expected_max_sr = max(benchmark_sr, expected_max_sr)
        
        # Variance of Sharpe ratio (adjusted for non-normality)
        sr_variance = (
            1.0 - skewness * estimated_sr + 
            ((kurtosis - 1.0) / 4.0) * (estimated_sr ** 2)
        ) / (sample_length - 1)
        
        if sr_variance <= 0:
            return {"dsr": 0.0, "status": "INVALID"}
        
        # Z-statistic and deflated probability
        z_stat = (estimated_sr - expected_max_sr) / np.sqrt(sr_variance)
        dsr_prob = ss.norm.cdf(z_stat)
        
        result = {
            "dsr": float(dsr_prob),
            "z_statistic": float(z_stat),
            "expected_max_sr": float(expected_max_sr),
            "sr_variance": float(sr_variance),
            "status": "ACCEPT" if dsr_prob > 0.95 else "REJECT"
        }
        
        logger.info(f"DSR = {dsr_prob:.3f} ({result['status']})")
        return result


class MultipleTestingCorrection:
    """Benjamini-Hochberg-Yekutieli (BHY) False Discovery Rate control."""
    
    @staticmethod
    def bhy_procedure(
        p_values: np.ndarray,
        alpha: float = 0.05,
        dependency_constant: Optional[float] = None
    ) -> Dict[str, Any]:
        """
        Apply BHY FDR control procedure with dependency adjustment.
        
        Parameters:
        -----------
        p_values : np.ndarray
            Array of p-values from multiple hypothesis tests
        alpha : float
            Target false discovery rate (default 0.05)
        dependency_constant : float, optional
            Dependency adjustment constant. If None, uses log-sum for BHY.
        
        Returns:
        --------
        Dict : Rejection decisions and adjusted alpha
        """
        n_tests = len(p_values)
        
        # Calculate dependency constant for BHY
        if dependency_constant is None:
            dependency_constant = np.sum(1.0 / np.arange(1, n_tests + 1))
        
        # Sort p-values
        sorted_indices = np.argsort(p_values)
        sorted_p_values = p_values[sorted_indices]
        
        # BHY threshold
        thresholds = (np.arange(1, n_tests + 1) * alpha) / (n_tests * dependency_constant)
        
        # Find largest k where p(k) <= threshold(k)
        comparison = sorted_p_values <= thresholds
        if np.any(comparison):
            k_max = np.where(comparison)[0][-1]
            reject_indices = sorted_indices[:k_max + 1].astype(int)
        else:
            reject_indices = np.array([], dtype=int)
        
        # Create rejection mask
        reject_mask = np.zeros(n_tests, dtype=bool)
        if len(reject_indices) > 0:
            reject_mask[reject_indices] = True
        
        result = {
            "reject_mask": reject_mask,
            "n_rejected": int(np.sum(reject_mask)),
            "n_accepted": int(n_tests - np.sum(reject_mask)),
            "adjusted_alpha": float(alpha / dependency_constant),
            "dependency_constant": float(dependency_constant),
            "fdr": float(np.mean(p_values[reject_mask])) if np.any(reject_mask) else 0.0
        }
        
        logger.info(f"BHY: {result['n_rejected']}/{n_tests} hypotheses rejected (FDR={result['fdr']:.3f})")
        return result


def validate_strategy_pipeline(
    returns: pd.Series,
    labels: pd.Series,
    n_trials: int = 50,
    alpha: float = 0.05,
    embargo_pct: float = 0.01,
    n_splits: int = 5
) -> Dict[str, Any]:
    """
    Complete validation pipeline for a single strategy.
    
    Parameters:
    -----------
    returns : pd.Series
        Strategy returns
    labels : pd.Series  
        Triple-barrier labels
    n_trials : int
        Number of strategies tested (for DSR)
    alpha : float
        FDR significance level
    embargo_pct : float
        Embargo percentage
    n_splits : int
        Number of CV folds
    
    Returns:
    --------
    Dict : Complete validation results
    """
    engine = ValidationEngine(returns, labels, embargo_pct, n_splits)
    
    # Step 1: CPCV
    cpcv_paths = engine.combinatorial_purged_cv(n_test_groups=2)
    
    # Step 2: PBO
    pbo_result = engine.calculate_pbo(cpcv_paths)
    
    # Step 3: DSR
    overall_sharpe = engine._calculate_sharpe(returns)
    skew = returns.skew()
    kurt = returns.kurtosis() + 3.0  # Convert to non-excess kurtosis
    dsr_result = engine.deflated_sharpe_ratio(overall_sharpe, n_trials, skew, kurt)
    
    # Combined decision
    passed_pbo = pbo_result["status"] == "ACCEPT"
    passed_dsr = dsr_result["status"] == "ACCEPT"
    
    validation_status = "PASSED" if (passed_pbo and passed_dsr) else "REJECTED"
    
    return {
        "validation_status": validation_status,
        "pbo": pbo_result,
        "dsr": dsr_result,
        "cpcv_paths": cpcv_paths,
        "sharpe_ratio": float(overall_sharpe),
        "n_samples": len(returns),
        "passed_criteria": {
            "pbo": passed_pbo,
            "dsr": passed_dsr
        }
    }

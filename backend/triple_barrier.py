"""
Triple-Barrier Labeling Method
More realistic labels than fixed-horizon returns by considering:
1. Profit Target (upper barrier)
2. Stop Loss (lower barrier)  
3. Maximum Holding Period (time barrier)
"""

import numpy as np
import pandas as pd
from typing import Optional, Tuple
import logging

logger = logging.getLogger(__name__)


class TripleBarrierLabeler:
    """Generate realistic financial labels using triple-barrier method."""
    
    def __init__(
        self,
        prices: pd.Series,
        profit_target_pct: float = 0.02,  # 2% profit target
        stop_loss_pct: float = 0.01,      # 1% stop loss
        max_holding_periods: int = 5,      # 5 days max holding
        volatility_adjusted: bool = True
    ):
        """
        Parameters:
        -----------
        prices : pd.Series
            Price series indexed by datetime
        profit_target_pct : float
            Upper barrier as percentage move (e.g., 0.02 = 2%)
        stop_loss_pct : float
            Lower barrier as percentage move (e.g., 0.01 = 1%)
        max_holding_periods : int
            Maximum holding period in bars
        volatility_adjusted : bool
            If True, adjust barriers by realized volatility
        """
        self.prices = prices.sort_index()
        self.profit_target_pct = profit_target_pct
        self.stop_loss_pct = stop_loss_pct
        self.max_holding_periods = max_holding_periods
        self.volatility_adjusted = volatility_adjusted
        
        # Calculate returns for volatility estimation
        self.returns = self.prices.pct_change().fillna(0)
        
        logger.info(
            f"TripleBarrierLabeler: {len(prices)} bars, "
            f"profit={profit_target_pct*100:.1f}%, stop={stop_loss_pct*100:.1f}%, "
            f"max_holding={max_holding_periods}"
        )
    
    def get_volatility_scalar(self, window: int = 20) -> pd.Series:
        """
        Calculate rolling volatility scalar for dynamic barrier adjustment.
        
        Parameters:
        -----------
        window : int
            Rolling window for volatility calculation
        
        Returns:
        --------
        pd.Series : Volatility scalar (normalized)
        """
        rolling_vol = self.returns.rolling(window).std()
        median_vol = rolling_vol.median()
        
        # Normalize: scalar = current_vol / median_vol
        scalar = rolling_vol / median_vol
        scalar = scalar.fillna(1.0).clip(0.5, 2.0)  # Bound between 0.5x and 2x
        
        return scalar
    
    def apply_barriers(
        self,
        entry_idx: int,
        entry_price: float,
        volatility_scalar: float = 1.0
    ) -> Tuple[int, float, str]:
        """
        Apply triple barriers for a single entry point.
        
        Parameters:
        -----------
        entry_idx : int
            Integer index in prices series
        entry_price : float
            Entry price
        volatility_scalar : float
            Volatility adjustment factor
        
        Returns:
        --------
        Tuple[exit_idx, return, barrier_type] : Exit information
        """
        # Adjust barriers by volatility
        upper_barrier = entry_price * (1 + self.profit_target_pct * volatility_scalar)
        lower_barrier = entry_price * (1 - self.stop_loss_pct * volatility_scalar)
        
        # Look ahead for barrier touches
        max_idx = min(entry_idx + self.max_holding_periods, len(self.prices) - 1)
        future_prices = self.prices.iloc[entry_idx + 1:max_idx + 1]
        
        if len(future_prices) == 0:
            # Not enough future data
            return entry_idx, 0.0, "insufficient_data"
        
        # Check each future bar
        for i, (timestamp, price) in enumerate(future_prices.items()):
            # Upper barrier hit (profit target)
            if price >= upper_barrier:
                exit_idx = entry_idx + i + 1
                ret = (price - entry_price) / entry_price
                return exit_idx, ret, "profit_target"
            
            # Lower barrier hit (stop loss)
            if price <= lower_barrier:
                exit_idx = entry_idx + i + 1
                ret = (price - entry_price) / entry_price
                return exit_idx, ret, "stop_loss"
        
        # Time barrier hit (max holding period expired)
        exit_idx = max_idx
        exit_price = self.prices.iloc[exit_idx]
        ret = (exit_price - entry_price) / entry_price
        return exit_idx, ret, "time_limit"
    
    def generate_labels(
        self,
        entry_signals: Optional[pd.Series] = None,
        min_return_threshold: float = 0.0
    ) -> pd.DataFrame:
        """
        Generate triple-barrier labels for all entry points.
        
        Parameters:
        -----------
        entry_signals : pd.Series, optional
            Binary series indicating entry points. If None, use all timestamps.
        min_return_threshold : float
            Minimum absolute return to generate label (filter noise)
        
        Returns:
        --------
        pd.DataFrame : Labels with columns [label, return, exit_time, barrier_type]
        """
        # Default: generate labels for all bars
        if entry_signals is None:
            entry_signals = pd.Series(1, index=self.prices.index)
        
        # Get volatility scalars if enabled
        if self.volatility_adjusted:
            vol_scalars = self.get_volatility_scalar()
        else:
            vol_scalars = pd.Series(1.0, index=self.prices.index)
        
        labels_data = []
        
        # Process each entry signal
        for entry_ts in entry_signals[entry_signals > 0].index:
            if entry_ts not in self.prices.index:
                continue
            
            entry_idx = self.prices.index.get_loc(entry_ts)
            entry_price = self.prices.iloc[entry_idx]
            vol_scalar = vol_scalars.loc[entry_ts]
            
            # Apply triple barriers
            exit_idx, ret, barrier_type = self.apply_barriers(
                entry_idx, entry_price, vol_scalar
            )
            
            # Filter by minimum return threshold
            if abs(ret) < min_return_threshold:
                continue
            
            # Generate label: +1 (long), -1 (short), 0 (neutral)
            if barrier_type == "profit_target":
                label = 1
            elif barrier_type == "stop_loss":
                label = -1
            elif abs(ret) > min_return_threshold:
                label = 1 if ret > 0 else -1
            else:
                label = 0
            
            exit_ts = self.prices.index[exit_idx]
            
            labels_data.append({
                "entry_time": entry_ts,
                "exit_time": exit_ts,
                "label": label,
                "return": ret,
                "barrier_type": barrier_type,
                "holding_periods": exit_idx - entry_idx,
                "vol_scalar": vol_scalar
            })
        
        df = pd.DataFrame(labels_data)
        df = df.set_index("entry_time")
        
        logger.info(
            f"Generated {len(df)} triple-barrier labels: "
            f"{(df['label']==1).sum()} long, "
            f"{(df['label']==-1).sum()} short, "
            f"{(df['label']==0).sum()} neutral"
        )
        
        return df
    
    def get_label_statistics(self, labels: pd.DataFrame) -> dict:
        """
        Calculate statistics about generated labels.
        
        Parameters:
        -----------
        labels : pd.DataFrame
            Output from generate_labels()
        
        Returns:
        --------
        dict : Label statistics
        """
        stats = {
            "total_labels": len(labels),
            "long_signals": int((labels["label"] == 1).sum()),
            "short_signals": int((labels["label"] == -1).sum()),
            "neutral_signals": int((labels["label"] == 0).sum()),
            "avg_return": float(labels["return"].mean()),
            "avg_holding_periods": float(labels["holding_periods"].mean()),
            "barrier_breakdown": labels["barrier_type"].value_counts().to_dict(),
            "win_rate": float((labels["return"] > 0).mean()),
            "avg_win": float(labels[labels["return"] > 0]["return"].mean()) if (labels["return"] > 0).any() else 0.0,
            "avg_loss": float(labels[labels["return"] < 0]["return"].mean()) if (labels["return"] < 0).any() else 0.0,
        }
        
        # Calculate profit factor
        total_wins = labels[labels["return"] > 0]["return"].sum()
        total_losses = abs(labels[labels["return"] < 0]["return"].sum())
        stats["profit_factor"] = float(total_wins / total_losses) if total_losses > 0 else float("inf")
        
        return stats


def create_meta_labels(
    prices: pd.Series,
    primary_model_predictions: pd.Series,
    profit_target_pct: float = 0.02,
    stop_loss_pct: float = 0.01,
    max_holding_periods: int = 5
) -> pd.DataFrame:
    """
    Generate meta-labels for a primary model's predictions.
    
    Meta-labeling determines WHEN to trade (sizing), not WHAT to trade (direction).
    The primary model provides direction; meta-labels predict success probability.
    
    Parameters:
    -----------
    prices : pd.Series
        Price series
    primary_model_predictions : pd.Series
        Primary model's directional predictions (-1, 0, +1)
    profit_target_pct : float
        Profit target percentage
    stop_loss_pct : float
        Stop loss percentage
    max_holding_periods : int
        Maximum holding period
    
    Returns:
    --------
    pd.DataFrame : Meta-labels (1 = trade will succeed, 0 = will fail)
    """
    labeler = TripleBarrierLabeler(
        prices,
        profit_target_pct,
        stop_loss_pct,
        max_holding_periods,
        volatility_adjusted=True
    )
    
    # Only label timestamps where primary model has signal
    entry_signals = primary_model_predictions.abs()
    
    # Generate barriers
    labels = labeler.generate_labels(entry_signals)
    
    # Meta-label: Did the trade reach profit target?
    # 1 = success (profit target hit), 0 = failure (stop loss or weak time exit)
    labels["meta_label"] = (labels["barrier_type"] == "profit_target").astype(int)
    
    # Align with primary model predictions
    labels["primary_direction"] = primary_model_predictions.loc[labels.index]
    
    # Calculate actual outcome sign
    labels["outcome_sign"] = np.sign(labels["return"])
    
    # Meta-label quality: correct direction AND reasonable return
    labels["correct_direction"] = (
        labels["outcome_sign"] == labels["primary_direction"]
    ).astype(int)
    
    logger.info(
        f"Meta-labels: {(labels['meta_label']==1).sum()} successes, "
        f"{(labels['meta_label']==0).sum()} failures"
    )
    
    return labels


def generate_sample_weights(
    labels: pd.DataFrame,
    decay_factor: float = 0.95
) -> pd.Series:
    """
    Generate sample weights for machine learning with time decay.
    
    Recent samples receive higher weight. Additionally, samples that
    overlap in time receive adjusted weights to prevent overweighting.
    
    Parameters:
    -----------
    labels : pd.DataFrame
        Labels with 'entry_time' and 'exit_time'
    decay_factor : float
        Exponential decay factor (closer to 1 = less decay)
    
    Returns:
    --------
    pd.Series : Sample weights
    """
    # Time-based decay weights (recent samples weighted higher)
    n_samples = len(labels)
    time_decay = np.power(decay_factor, np.arange(n_samples)[::-1])
    
    # Adjust for overlapping labels (uniqueness weight)
    # Count how many labels are active at each point in time
    weights = pd.Series(time_decay, index=labels.index)
    
    # For each label, count concurrent labels
    for idx, row in labels.iterrows():
        entry = row.name if isinstance(row.name, pd.Timestamp) else row.get("entry_time")
        exit_time = row.get("exit_time")
        
        # Count overlapping labels
        overlap_mask = (
            (labels.index <= entry) & (labels["exit_time"] >= entry) |
            (labels.index >= entry) & (labels.index <= exit_time)
        )
        n_concurrent = overlap_mask.sum()
        
        # Downweight based on concurrency
        if n_concurrent > 1:
            weights.loc[idx] /= n_concurrent
    
    # Normalize
    weights = weights / weights.sum()
    
    logger.info(f"Generated sample weights: mean={weights.mean():.4f}, std={weights.std():.4f}")
    return weights

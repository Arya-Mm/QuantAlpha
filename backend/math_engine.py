"""
QuantAlpha Mathematical Engine
Re-exports canonical implementations from validation_engine to avoid duplication.

Historical note: this file used to contain independent (diverging) implementations
of DSR and purging. All canonical implementations now live in validation_engine.py.
This module provides backwards-compatible wrappers and TCA utilities.
"""

from __future__ import annotations

from typing import Dict, Any
import numpy as np
import pandas as pd

# Re-export from canonical source — single source of truth
from validation_engine import (
    deflated_sharpe_ratio,
    get_train_times,
    apply_embargo,
    _annualised_sharpe,
)

__all__ = [
    "deflated_sharpe_ratio",
    "get_train_times",
    "apply_embargo",
    "run_tca_analysis",
]


def run_tca_analysis(
    trades_volume: float,
    spread_bps: float = 1.2,
    slippage_bps: float = 5.0,
    exchange_fee_bps: float = 0.35,
    brokerage_bps: float = 1.5,
) -> Dict[str, Any]:
    """
    Transaction Cost Analysis (TCA) breakdown in Basis Points.
    These are market-structure constants, not research metrics.
    """
    total_bps = spread_bps + slippage_bps + exchange_fee_bps + brokerage_bps
    return {
        "spread_cost_bps": spread_bps,
        "slippage_cost_bps": slippage_bps,
        "exchange_fees_bps": exchange_fee_bps,
        "brokerage_bps": brokerage_bps,
        "total_drag_bps": total_bps,
        "estimated_impact_inr": (total_bps / 10_000.0) * trades_volume,
    }

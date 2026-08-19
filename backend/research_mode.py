"""
QuantAlpha Research Mode Guard

DEMO MODE: Uses synthetic GBM price data. Metrics are illustrative.
RESEARCH MODE: Requires real data. Fails loudly if data unavailable.

Every research metric must trace back to actual market data.
Signals failing validation is the CORRECT behaviour of the system.
"""

import os
from enum import Enum


class RunMode(Enum):
    DEMO = "DEMO"
    RESEARCH = "RESEARCH"


# Set QUANTALPHA_MODE=RESEARCH in environment for research mode.
# Defaults to DEMO so the dashboard works out-of-the-box.
_env = os.environ.get("QUANTALPHA_MODE", "DEMO").upper()
CURRENT_MODE = RunMode.RESEARCH if _env == "RESEARCH" else RunMode.DEMO


def is_research_mode() -> bool:
    return CURRENT_MODE == RunMode.RESEARCH


def is_demo_mode() -> bool:
    return CURRENT_MODE == RunMode.DEMO


class ResearchDataUnavailable(RuntimeError):
    """
    Raised in RESEARCH mode when real data cannot be fetched.
    Research metrics must NOT be fabricated on failure.
    """
    pass


def require_real_data(ticker: str, df_or_none) -> None:
    """
    In RESEARCH mode: raise if data is None or empty.
    In DEMO mode: silently allow synthetic fallback.
    """
    if is_research_mode():
        if df_or_none is None or (hasattr(df_or_none, "empty") and df_or_none.empty):
            raise ResearchDataUnavailable(
                f"RESEARCH MODE: Real data unavailable for '{ticker}'. "
                "Cannot compute research metrics on synthetic data. "
                "Check network connectivity or reduce date range."
            )


def label_as_demo(result: dict) -> dict:
    """Tag any result produced in DEMO mode so the frontend can display a disclaimer."""
    result["_mode"] = "DEMO"
    result["_disclaimer"] = (
        "These metrics were computed on synthetic GBM price data. "
        "Set QUANTALPHA_MODE=RESEARCH and ensure internet access for real NSE metrics."
    )
    return result


def label_as_research(result: dict) -> dict:
    """Tag results produced in RESEARCH mode — data traces back to real market data."""
    result["_mode"] = "RESEARCH"
    return result

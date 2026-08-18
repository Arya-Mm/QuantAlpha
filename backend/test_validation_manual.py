"""
Manual test script for ValidationEngine and TripleBarrier
Run with: python backend/test_validation_manual.py
"""

import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

import pandas as pd
import numpy as np
from validation_engine import validate_strategy_pipeline, ValidationEngine
from triple_barrier import TripleBarrierLabeler

print("="*80)
print("QUANTALPHA VALIDATION ENGINE TEST")
print("="*80)

# ====================
# Test 1: Triple-Barrier Labeling
# ====================
print("\n[TEST 1] Triple-Barrier Labeling")
print("-"*80)

# Generate synthetic price series
np.random.seed(42)
dates = pd.date_range('2020-01-01', '2023-12-31', freq='B')
returns = np.random.normal(0.0005, 0.015, len(dates))
prices = pd.Series(1000 * np.exp(np.cumsum(returns)), index=dates)

print(f"✓ Generated {len(prices)} price bars")
print(f"  Price range: ₹{prices.min():.2f} - ₹{prices.max():.2f}")

# Create labeler
labeler = TripleBarrierLabeler(
    prices=prices,
    profit_target_pct=0.02,  # 2% profit target
    stop_loss_pct=0.01,      # 1% stop loss
    max_holding_periods=5,    # 5 days max
    volatility_adjusted=True
)

# Generate labels
labels = labeler.generate_labels()

print(f"\n✓ Generated {len(labels)} triple-barrier labels")
print(f"  Long signals:    {(labels['label']==1).sum()}")
print(f"  Short signals:   {(labels['label']==-1).sum()}")
print(f"  Neutral signals: {(labels['label']==0).sum()}")

# Label statistics
stats = labeler.get_label_statistics(labels)
print(f"\n✓ Label Statistics:")
print(f"  Win rate:        {stats['win_rate']*100:.1f}%")
print(f"  Avg return:      {stats['avg_return']*100:.2f}%")
print(f"  Avg holding:     {stats['avg_holding_periods']:.1f} days")
print(f"  Profit factor:   {stats['profit_factor']:.2f}")

barrier_breakdown = stats['barrier_breakdown']
print(f"\n✓ Barrier Breakdown:")
for barrier_type, count in barrier_breakdown.items():
    pct = (count / stats['total_labels']) * 100
    print(f"  {barrier_type:15s}: {count:4d} ({pct:5.1f}%)")

# ====================
# Test 2: Purged K-Fold CV
# ====================
print("\n\n[TEST 2] Purged K-Fold Cross-Validation")
print("-"*80)

# Generate strategy returns aligned with labels
strategy_returns = pd.Series(
    np.where(labels['label'] == 1, 
             np.abs(np.random.normal(0.001, 0.01, len(labels))),
             -np.abs(np.random.normal(0.0005, 0.01, len(labels)))),
    index=labels.index
)

print(f"✓ Generated {len(strategy_returns)} strategy returns")
print(f"  Mean return: {strategy_returns.mean()*252*100:.2f}% annualized")
print(f"  Volatility:  {strategy_returns.std()*np.sqrt(252)*100:.2f}% annualized")

# Create validation engine
engine = ValidationEngine(
    returns=strategy_returns,
    labels=labels['exit_time'],  # Use exit times for purging
    embargo_pct=0.01,
    n_splits=5
)

print(f"\n✓ ValidationEngine initialized")

# Generate purged K-fold splits
splits = engine.purged_k_fold_split()
print(f"  Generated {len(splits)} purged CV folds")

for i, (train_idx, test_idx) in enumerate(splits):
    print(f"  Fold {i+1}: {len(train_idx):4d} train, {len(test_idx):4d} test")

# ====================
# Test 3: CPCV + PBO
# ====================
print("\n\n[TEST 3] Combinatorial Purged CV + PBO")
print("-"*80)

# Run CPCV
cpcv_paths = engine.combinatorial_purged_cv(n_test_groups=2)
print(f"✓ Generated {len(cpcv_paths)} CPCV paths")

# Show first 5 paths
print(f"\n  Sample CPCV Paths:")
print(f"  {'Path':>4s} | {'IS Sharpe':>10s} | {'OOS Sharpe':>10s} | {'IS > OOS':>10s}")
print(f"  {'-'*4:4s} | {'-'*10:10s} | {'-'*10:10s} | {'-'*10:10s}")
for path in cpcv_paths[:5]:
    is_sr = path['is_sharpe']
    oos_sr = path['oos_sharpe']
    overfit = "YES" if is_sr > oos_sr else "NO"
    print(f"  {path['path_id']:4d} | {is_sr:10.3f} | {oos_sr:10.3f} | {overfit:>10s}")

# Calculate PBO
pbo_result = engine.calculate_pbo(cpcv_paths)
print(f"\n✓ Probability of Backtest Overfitting (PBO):")
print(f"  PBO:              {pbo_result['pbo']:.3f}")
print(f"  Status:           {pbo_result['status']}")
print(f"  Paths overfit:    {pbo_result['n_overfit']}/{pbo_result['n_paths']}")
print(f"  IS Sharpe (med):  {pbo_result['is_sharpe_median']:.3f}")
print(f"  OOS Sharpe (med): {pbo_result['oos_sharpe_median']:.3f}")
print(f"  Degradation:      {pbo_result['performance_degradation']*100:.1f}%")

# ====================
# Test 4: Deflated Sharpe Ratio
# ====================
print("\n\n[TEST 4] Deflated Sharpe Ratio (DSR)")
print("-"*80)

overall_sharpe = engine._calculate_sharpe(strategy_returns)
skew = strategy_returns.skew()
kurt = strategy_returns.kurtosis() + 3.0

dsr_result = engine.deflated_sharpe_ratio(
    estimated_sr=overall_sharpe,
    n_trials=50,  # Assume we tested 50 strategies
    skewness=skew,
    kurtosis=kurt,
    benchmark_sr=0.0
)

print(f"✓ Deflated Sharpe Ratio Analysis:")
print(f"  Estimated Sharpe:   {overall_sharpe:.3f}")
print(f"  Deflated Sharpe:    {dsr_result['dsr']:.3f}")
print(f"  Status:             {dsr_result['status']}")
print(f"  Z-statistic:        {dsr_result['z_statistic']:.3f}")
print(f"  Expected max SR:    {dsr_result['expected_max_sr']:.3f}")
print(f"  SR variance:        {dsr_result['sr_variance']:.6f}")

# ====================
# Test 5: Full Validation Pipeline
# ====================
print("\n\n[TEST 5] Complete Validation Pipeline")
print("-"*80)

result = validate_strategy_pipeline(
    returns=strategy_returns,
    labels=labels['exit_time'],
    n_trials=50,
    alpha=0.05,
    embargo_pct=0.01,
    n_splits=5
)

print(f"✓ Full Validation Results:")
print(f"  Overall Status:     {result['validation_status']}")
print(f"  Sharpe Ratio:       {result['sharpe_ratio']:.3f}")
print(f"  PBO:                {result['pbo']['pbo']:.3f} ({result['pbo']['status']})")
print(f"  DSR:                {result['dsr']['dsr']:.3f} ({result['dsr']['status']})")
print(f"  CPCV Paths:         {len(result['cpcv_paths'])}")
print(f"  Sample Size:        {result['n_samples']}")

print(f"\n✓ Passed Criteria:")
print(f"  PBO Criterion:      {'✓ PASS' if result['passed_criteria']['pbo'] else '✗ FAIL'}")
print(f"  DSR Criterion:      {'✓ PASS' if result['passed_criteria']['dsr'] else '✗ FAIL'}")

# ====================
# Test 6: BHY Multiple Testing
# ====================
print("\n\n[TEST 6] Benjamini-Hochberg-Yekutieli FDR Control")
print("-"*80)

from validation_engine import MultipleTestingCorrection

# Simulate testing 12 signals with various p-values
np.random.seed(123)
signal_names = [
    "MOM_CROSS", "RSI_DIV", "BOLLINGER_MR", "MACD_CROSS",
    "SENTIMENT_NLP", "YIELD_CURVE", "VOL_TARGET", "PAIR_COINT",
    "EARNINGS_SURP", "PE_MOMENTUM", "ROE_TREND", "DEBT_RATIO"
]
p_values = np.random.uniform(0.001, 0.15, 12)

bhy_result = MultipleTestingCorrection.bhy_procedure(p_values, alpha=0.05)

print(f"✓ BHY FDR Control (α = 0.05):")
print(f"  Signals tested:     {len(p_values)}")
print(f"  Signals rejected:   {bhy_result['n_rejected']}")
print(f"  Signals accepted:   {bhy_result['n_accepted']}")
print(f"  Adjusted α:         {bhy_result['adjusted_alpha']:.4f}")
print(f"  Dependency const:   {bhy_result['dependency_constant']:.3f}")
print(f"  Estimated FDR:      {bhy_result['fdr']:.3f}")

print(f"\n  Signal-by-Signal Results:")
print(f"  {'Signal':15s} | {'P-value':>8s} | {'Decision':>10s}")
print(f"  {'-'*15:15s} | {'-'*8:8s} | {'-'*10:10s}")
for i, (name, pval) in enumerate(zip(signal_names, p_values)):
    decision = "REJECT H0" if bhy_result['reject_mask'][i] else "ACCEPT H0"
    print(f"  {name:15s} | {pval:8.4f} | {decision:>10s}")

# ====================
# Summary
# ====================
print("\n" + "="*80)
print("TEST SUMMARY")
print("="*80)
print("✓ All components operational!")
print("\n✓ You now have industrial-grade validation:")
print("  1. Triple-Barrier Labeling")
print("  2. Purged K-Fold Cross-Validation")
print("  3. Combinatorial Purged CV (CPCV)")
print("  4. Probability of Backtest Overfitting (PBO)")
print("  5. Deflated Sharpe Ratio (DSR)")
print("  6. Benjamini-Hochberg-Yekutieli (BHY) FDR Control")
print("\n✓ Next steps:")
print("  - Integrate with FastAPI (backend/main.py)")
print("  - Connect to frontend Research UI")
print("  - Build signal factory")
print("  - Add alternative data sources")
print("="*80)

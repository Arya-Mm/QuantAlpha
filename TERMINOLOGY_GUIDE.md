# QuantAlpha - Plain-English Strategy & Terminology Guide
> **The simple, no-jargon handbook for designing, testing, and picking winning trading strategies.**

---

## 🎯 1. The 4 Questions That Actually Matter

When creating or picking a trading strategy, don't get lost in complex math. You only need to ask 4 simple questions:

```
1. Will it make money?               → Look at Yearly Profit & Profit Score (Sharpe)
2. How scary is the ride?             → Look at Worst Drop (Max Drawdown) & Risk Level (Volatility)
3. Is it genuinely smart or lucky?   → Look at Reliability Score (DSR) & Overfit Risk (PBO)
4. Will fees eat my profits?         → Look at Trading Fees (Slippage & Commission in BPS)
```

---

## 📖 2. Plain-English Translation Table

Here is every technical term translated into normal human language:

| Technical Term | Simple Name | What It Really Means | What Number is GOOD? |
|---|---|---|---|
| **Deflated Sharpe Ratio (DSR)** | **Reliability Score** | Lie detector test. Calculates how confident we are the strategy actually works after trying many variations. | **> 0.95 (95%+)** ✅ |
| **Probability of Backtest Overfitting (PBO)** | **Overfitting / Luck Risk** | Chance the strategy just memorized past exam answers instead of learning how to trade. | **< 0.50 (< 50%)** ✅ (Lower is better) |
| **Out-of-Sample Sharpe Ratio** | **Profit Score (Consistency)** | How much reward you get for every unit of risk taken. | **> 1.5** (Good), **> 2.0** (Top tier) |
| **Sortino Ratio** | **Downside Safety Score** | Same as profit score, but only penalizes you for drops (doesn't punish you for sudden big gains). | **> 2.0** |
| **Maximum Drawdown (Max DD)** | **Worst Loss / Deepest Ditch** | The worst peak-to-bottom drop your account would have suffered in the past. | **< 15%** (Manageable) |
| **Annualized Return** | **Yearly Profit** | Average percentage gain your strategy generates per year. | **> 15% - 20%** |
| **Annualized Volatility** | **Bumpy Ride / Risk Level** | How much your account value swings up and down day-to-day. | **< 15%** (Smoother ride) |
| **Win Rate** | **Winning Trade %** | Percentage of trades that ended in a profit. | **> 55%** |
| **Profit Factor** | **Gross Win / Loss Ratio** | Total money won divided by total money lost. | **> 1.5** ($1.50 won for every $1 lost) |
| **Purged K-Fold Cross-Validation** | **Zero-Cheating Testing** | Testing the strategy across different time chunks while erasing overlapping days so it can't peek ahead. | Strategy passes all test folds |
| **Embargo Period** | **Safety Cool-Down Buffer** | A 5-day mandatory pause between test periods so old market momentum doesn't leak into the test. | $\tau = 5$ days |
| **Basis Points (BPS)** | **Hundredths of a Percent** | 1 BPS = 0.01% (or ₹1 per ₹10,000 traded). Used to measure small fees. | 1 BPS = 0.01% |
| **Slippage** | **Price Slip** | The tiny price increase between when you click buy and when your order gets filled. | < 5 bps (0.05%) |
| **TCA (Transaction Cost Analysis)** | **Real-World Trading Fees** | Breakdown of all hidden costs: broker commissions + exchange charges + slippage. | Keep fees under 15-20% of profits |
| **TWAP / VWAP Execution** | **Smart Order Slicing** | Chopping a large trade into small bites over time so you don't spike the market price. | Smooth execution |
| **Kelly Criterion** | **Optimal Bet Sizing** | Mathematical rule that tells you exactly how much money to risk on a trade based on your win odds. | Fractional Kelly (0.5x) |
| **Beta** | **Market Sensitivity** | If the market moves 1%, how much does this strategy move? (0 = totally independent). | Close to 0.0 (Market Neutral) |
| **Emergency Kill Switch** | **Big Red Panic Button** | An instant failsafe that cancels all pending orders and converts everything into safe cash in under 50ms. | Triggered if unexpected crash occurs |

---

## 🕹️ 3. The 4 Strategy Types (The Strategy Menu)

When creating or choosing a strategy in QuantAlpha, here is what each style actually does:

### 1. 🌊 Momentum / Trend Following (`MOM_CROSS`)
- **How it works:** *"The trend is your friend."* If a stock is climbing strongly with high volume, buy it. If it starts breaking down, exit or short it.
- **Best for:** Strong bull or bear markets (e.g. NIFTY rallies).
- **Watch out for:** Choppy sideways markets where it gets whipped back and forth.

### 2. 🪢 Price Relationship / Statistical Arbitrage (`PAIR_COINT_ARB`)
- **How it works:** *"Two dogs on an elastic leash."* Finds two twin stocks that usually move together (like HDFC Bank and ICICI Bank). If one suddenly surges ahead while the other lags, it bets they will snap back together.
- **Best for:** Sideways, choppy markets where overall index isn't moving.
- **Watch out for:** Fundamental structural breaks where one company has real news and the pair never reconnects.

### 3. 📰 News & Mood Analysis (`FinBERT Sentiment`)
- **How it works:** *"Trade the news before the crowd."* AI reads financial headlines, earnings reports, and tweets, grading the sentiment from -1 (Extremely Negative) to +1 (Extremely Positive).
- **Best for:** Earnings season and breaking macro announcements.
- **Watch out for:** Fake news or market already reacting before news is published.

### 4. 🛡️ Volatility Targeting (`VOL_TARGET`)
- **How it works:** *"The speed governor."* When market volatility is calm, it invests normally. When the market goes crazy and wild swings begin, it automatically cuts position sizes to protect capital.
- **Best for:** Sleep-well-at-night portfolios with smooth equity curves.

---

## 🚦 4. The 30-Second Strategy Decision Rule

When you are looking at any strategy dashboard, use this 4-step checklist:

```
┌────────────────────────────────────────────────────────────────────────┐
│                      30-SECOND STRATEGY CHECKLIST                      │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Reliability Score (DSR)  → Is it > 95% (0.95)?                      │
│    ❌ NO: Reject. It's likely a fluke.                                 │
│    ✅ YES: Move to Step 2.                                             │
│                                                                        │
│ 2. Overfit Risk (PBO)       → Is it < 50% (0.50)?                      │
│    ❌ NO: Reject. It memorized the past and won't work live.           │
│    ✅ YES: Move to Step 3.                                             │
│                                                                        │
│ 3. Deepest Ditch (Max DD)   → Is it < 15%?                             │
│    ❌ NO: High risk of blowing up during a panic.                     │
│    ✅ YES: Move to Step 4.                                             │
│                                                                        │
│ 4. Profit Score (Sharpe)    → Is it > 1.50?                            │
│    ❌ NO: Too much risk for too little return.                         │
│    ✅ YES: Approved! Ready for Paper Trading.                          │
└────────────────────────────────────────────────────────────────────────┘
```

---

## ⚙️ 5. Strategy Settings & Inputs in Plain English

When setting up backtests or live runs, here is what each input controls:

- **Universe**: Which stock basket to trade (`NIFTY 50` = top 50 blue chips, `NIFTY BANK` = top banking stocks).
- **Start / End Date**: The time window used for testing (e.g. 2015 to 2024 covers bull markets, COVID crash, and recoveries).
- **Commission (bps)**: Brokerage and exchange fee estimate (Default: 1.5 bps = 0.015%).
- **Slippage (bps)**: Expected price penalty on execution (Default: 5.0 bps = 0.05%).
- **Execution Model**:
  - *TWAP*: Spreads buying evenly over minutes.
  - *Instant*: Assumes perfect fantasy fills with zero price impact (use only for initial quick checks).
- **Profit Target % (Triple Barrier)**: Sell when profit reaches this target (e.g., +2.0%).
- **Stop Loss % (Triple Barrier)**: Cut loss immediately if price drops by this amount (e.g., -1.0%).
- **Max Holding Periods**: If neither target nor stop is hit after X days, exit anyway.

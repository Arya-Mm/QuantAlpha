# QuantAlpha - Major Project Review 1 Presentation & Viva Guide
**Project Title:** QuantAlpha: Systematic Quantitative Research Pipeline & Autonomous Agent Gateway for NSE Equities  
**Milestone:** Review 1 (60% Progress)

---

## 🎯 1. 5-Minute Pitch & Presentation Flow

| Time | Phase | Key Talking Points & Demo Action |
| :--- | :--- | :--- |
| **0:00 - 1:00** | **The Research Problem** | Explain why 95% of retail and academic trading strategies fail in production: **Backtest Overfitting**, **Lookahead Bias**, and **Selection Bias** (ignoring the number of trial iterations). |
| **1:00 - 2:00** | **Our Mathematical Solution** | Open the **Statistical Methodology** modal on the Research page (`/research`). Explain: <br>1. *Purged K-Fold Cross-Validation & Dynamic Embargo* ($\tau = 5$ days). <br>2. *Deflated Sharpe Ratio (DSR)* correcting for skewness, kurtosis, and $N$ trials. <br>3. *FinBERT Sentiment NLP* for Indian financial disclosures. |
| **2:00 - 3:15** | **Live Interactive Demo** | 1. Navigate to **Research (`/research`)**: Click **"Run Purged K-Fold Validation"** to show live signal graduation. <br>2. Navigate to **Backtests (`/backtests`)**: Adjust slippage/commission in basis points, click **"Run Backtest"** to see net returns recomputed, and click **"Export CSV"** to demonstrate tearsheet generation. <br>3. Navigate to **Command Center (`/command-center`)**: Switch to *Auto Paper*, show live audit stream, and demonstrate the **Emergency Kill Switch**. |
| **3:15 - 4:15** | **Architecture & 60% Progress** | Walk through the 5-tier architecture: **Signal Engine $\rightarrow$ Kelly Position Sizing $\rightarrow$ Pre-Trade Risk Gate $\rightarrow$ Execution Router $\rightarrow$ Broker API Gateway (Zerodha Kite / Dhan)**. Highlight that TypeScript contracts in `src/types/` match the FastAPI backend in `backend/`. |
| **4:15 - 5:00** | **Next Steps (Review 2 / 100%)** | Broker API live credential testing, multi-asset cointegration pairs, and final latency profiling. |

---

## 🧠 2. Expected Professor Viva Questions & Exact Answers

### Q1: "Why can't we use standard Scikit-Learn K-Fold Cross-Validation for stock market data?"
> **Answer:**  
> "Standard K-Fold assumes observations are **Independent and Identically Distributed (i.i.d.)**. In financial time series:  
> 1. Labels span multiple bars into the future (holding periods), causing **lookahead leakage** between training and test sets.  
> 2. Auto-regressive features exhibit serial correlation.  
>  
> To solve this, QuantAlpha implements **Marcos López de Prado's Purged K-Fold Cross-Validation with Dynamic Embargo**:  
> - **Purging:** Deletes training observations whose label spans overlap with test sets.  
> - **Embargo:** Discards training observations immediately following a test fold for $\tau = 5$ trading days to eliminate auto-correlation spillover."

---

### Q2: "What is Deflated Sharpe Ratio (DSR) and why is standard Sharpe Ratio misleading?"
> **Answer:**  
> "If a researcher tests 100 random variations of a moving average strategy, by pure chance the best one might achieve an annualized Sharpe ratio of 2.0. Standard Sharpe ratio fails to account for **multiple testing selection bias**.  
>  
> **Deflated Sharpe Ratio (DSR)** computes the probability that the observed Sharpe exceeds the expected maximum Sharpe under the null hypothesis of no skill ($SR_0$), while explicitly penalizing non-normality (negative skewness $\gamma_3$ and excess kurtosis $\gamma_4$) and short sample length ($T$):  
> $$DSR = \Phi \left[ \frac{(\widehat{SR} - SR_0) \sqrt{T - 1}}{\sqrt{1 - \widehat{\gamma}_3 \widehat{SR} + \frac{\widehat{\gamma}_4 - 1}{4} \widehat{SR}^2}} \right]$$  
> In QuantAlpha, strategies must achieve **DSR > 0.95** and **PBO $\le$ 0.50** to be approved for live paper execution."

---

### Q3: "How does the autonomous bot handle orders and money without risking catastrophic losses?"
> **Answer:**  
> "QuantAlpha implements an **Institutional 5-Tier Defensive Architecture**:  
> 1. **Alpha Signal:** Generates raw directional predictions.  
> 2. **Kelly Volatility Sizing:** Dynamically adjusts leverage based on realized variance.  
> 3. **Pre-Trade Risk Gate (Hardware/Software Circuit Breaker):** Enforces hard deterministic limits (*Max 5% per stock, Net Portfolio Beta $\in [-0.1, +0.1]$, Max 15% sector exposure, Max 8% expected drawdown*).  
> 4. **Execution Router:** Slices large orders using **TWAP/VWAP** algorithms to minimize market impact slippage.  
> 5. **Emergency Kill Switch:** A hardware-level software latch that instantly cancels all open broker orders and liquidates exposure to 100% Cash within 50ms if volatility exceeds limits."

---

### Q4: "How do you connect to Indian stock exchanges (NSE)?"
> **Answer:**  
> "In India, retail and proprietary algorithmic trading must route through SEBI-registered brokers. We use broker REST/WebSocket APIs (such as **Zerodha KiteConnect** or **DhanHQ API**). The backend handles TOTP multi-factor authentication, receives tick-by-tick WebSocket data, and routes signed LIMIT/MARKET orders with transaction cost logging."

---

## 💻 3. System Tech Stack Summary

- **Frontend:** Next.js 16 (Turbopack, App Router), TypeScript, Vanilla CSS Design System with Institutional Warm Off-White (`#f5f5f2`) & Quant Orange (`#ea580c`) palette.
- **Data Contracts & Simulation:** `src/types/quant.ts`, `src/services/quantApi.ts` with browser-native CSV tearsheet export.
- **Backend (Python):** FastAPI, Uvicorn, NumPy, Pandas, SciPy, yfinance.
- **Statistical Framework:** Marcos López de Prado's *Advances in Financial Machine Learning* (CPCV, DSR, PBO, CUSUM drift detection).

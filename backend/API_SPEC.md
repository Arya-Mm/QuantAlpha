# QuantAlpha Backend Architecture & API Specification

This document provides the exact technical specification, math formulations, and endpoint contracts for the **QuantAlpha FastAPI Backend Engine**.

---

## 🏛️ System Architecture

```
                                  +-----------------------------+
                                  |   QuantAlpha Next.js UI     |
                                  |   (TypeScript / Tailwind)   |
                                  +--------------+--------------+
                                                 | HTTP / JSON
                                                 v
+-----------------------------------------------------------------------------------------+
|                               FastAPI Application Server                                |
|                                                                                         |
|  +---------------------+   +---------------------+   +-------------------------------+  |
|  |  /api/v1/research   |   |  /api/v1/backtest   |   |  /api/v1/bot & /risk          |  |
|  |  (Signal Generator) |   |  (CPCV & DSR Engine)|   |  (Autonomous Kill Switch)     |  |
|  +----------+----------+   +----------+----------+   +---------------+---------------+  |
|             |                         |                              |                  |
+-------------|-------------------------|------------------------------|------------------+
              |                         |                              |
              v                         v                              v
+------------------------+  +------------------------+  +-------------------------------+
| Market Data & Features |  | Mathematical Engine    |  | Broker Gateway (Paper / Live) |
| (yfinance / NSE Bhav)  |  | - Purged K-Fold CV     |  | - Pre-Trade Risk Gate         |
| (FinBERT NLP Sentiment)|  | - Deflated Sharpe (DSR)|  | - Execution Router            |
|                        |  | - TCA Cost Matrix      |  | - Emergency Circuit Breaker   |
+------------------------+  +------------------------+  +-------------------------------+
```

---

## 📐 Mathematical Formulations to Implement

### 1. Purged K-Fold Cross-Validation with Dynamic Embargo
Avoids label overlap contamination in non-i.i.d. financial series:
- **Purge:** Delete training observations whose label span $[t_{i, 0}, t_{i, 1}]$ intersects with any test prediction span.
- **Dynamic Embargo:** Remove training samples immediately following a test fold for $\tau = 5$ trading days:
$$t_{train} > \max(t_{test}) + \tau$$

### 2. Deflated Sharpe Ratio (DSR) (Bailey & López de Prado)
Adjusts standard annualized Sharpe Ratio for selection bias (number of candidate trials $N$), sample length $T$, skewness $\gamma_3$, and kurtosis $\gamma_4$:
$$DSR = \Phi \left[ \frac{(\widehat{SR} - SR_0) \sqrt{T - 1}}{\sqrt{1 - \widehat{\gamma}_3 \widehat{SR} + \frac{\widehat{\gamma}_4 - 1}{4} \widehat{SR}^2}} \right]$$
*Where $SR_0 = \sqrt{\frac{V[\{SR_n\}]}{T}} \left( (1 - \gamma) Z^{-1}[1 - \frac{1}{N}] + \gamma Z^{-1}[1 - \frac{1}{N e}] \right)$*

---

## 🌐 Endpoints Specification

### 1. Run Backtest
- **Endpoint:** `POST /api/v1/backtest/run`
- **Request Body:**
```json
{
  "strategy": "Momentum Reversion (MR)",
  "universe": ["NIFTY 50", "NIFTY BANK"],
  "startDate": "2015-01-01",
  "endDate": "2024-12-31",
  "executionModel": "TWAP (Volume Weighted)",
  "commBps": 1.5,
  "slippageBps": 5.0
}
```
- **Response Body:** Matches `BacktestResult` in `src/types/quant.ts`.

---

### 2. Candidate & Validated Signals
- **Endpoint:** `GET /api/v1/signals`
- **Response Body:**
```json
{
  "candidates": [
    {
      "id": "sig-1",
      "name": "MOM_CROSS_V4",
      "code": "sig_8f92a_b",
      "category": "Technical",
      "oosSharpe": 1.84,
      "maxDrawdown": -12.4,
      "dsr": 0.96,
      "pbo": 0.12,
      "status": "Backtest Running"
    }
  ],
  "validated": [
    {
      "id": "val-1",
      "name": "MACRO_YIELD_CURVE",
      "code": "val_9a22f_x",
      "category": "Macro",
      "oosSharpe": 1.42,
      "maxDrawdown": -5.1,
      "dsr": 0.97,
      "pbo": 0.06,
      "status": "Passed Validation"
    }
  ]
}
```

---

### 3. Run Purged K-Fold Validation
- **Endpoint:** `POST /api/v1/signals/validate`
- **Request Body:** `{ "signalId": "sig-1", "cvFolds": 5, "embargoDays": 5 }`
- **Response Body:** `{ "status": "APPROVED", "dsr": 0.96, "pbo": 0.12, "fdrAdjusted": true }`

---

### 4. Emergency Kill Switch
- **Endpoint:** `POST /api/v1/bot/kill`
- **Request Body:** `{ "reason": "Admin Kill Switch Engaged" }`
- **Response Body:**
```json
{
  "status": "HALTED",
  "ordersCanceled": 14,
  "cashAllocatedPct": 100.0,
  "timestamp": "2026-08-18T10:45:00Z"
}
```

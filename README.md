# QuantAlpha Research Platform

**Autonomous Quantitative Research Platform for Discovering Statistically Validated Trading Signals on NSE Equities**

## 🎯 Core Problem

Traditional quantitative backtesting suffers from **backtest overfitting** - when strategies appear profitable historically but fail in live trading because they were selected based on their in-sample performance. QuantAlpha solves this by applying rigorous statistical validation before any strategy is approved for deployment.

## 🔬 Research Innovation

QuantAlpha implements institutional-grade validation based on **Marcos López de Prado's "Advances in Financial Machine Learning"**:

1. **Triple-Barrier Labeling** - More realistic labels using profit target, stop loss, and time limit
2. **Purged K-Fold Cross-Validation** - Eliminates lookahead bias from overlapping time windows
3. **Combinatorial Purged CV (CPCV)** - Generates multiple backtest paths to test robustness
4. **Probability of Backtest Overfitting (PBO)** - Quantifies likelihood strategy was cherry-picked
5. **Deflated Sharpe Ratio (DSR)** - Adjusts for multiple testing and non-normality
6. **Benjamini-Hochberg-Yekutieli (BHY)** - Controls false discovery rate across multiple signals

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 18+
- npm or yarn

### Installation

**Backend:**
```bash
cd backend
pip install -r requirements.txt
```

**Frontend:**
```bash
npm install
```

### Running the Platform

**Option 1: Using Batch Scripts (Windows)**
1. Double-click `START_BACKEND.bat` - Starts FastAPI server on http://127.0.0.1:8000
2. Double-click `START_FRONTEND.bat` - Starts Next.js on http://localhost:3000

**Option 2: Manual Terminals**

Terminal 1 (Backend):
```bash
cd backend
python main.py
```

Terminal 2 (Frontend):
```bash
npm run dev
```

### Testing the Validation Engine

Double-click `TEST_VALIDATION.bat` or run:
```bash
python backend/test_validation_manual.py
```

This tests all 6 validation components with synthetic data.

## 📊 System Architecture

```
Frontend (Next.js + React + TypeScript)
    ↓ HTTP/JSON
Backend (FastAPI + Python)
    ├── Validation Engine (CPCV, PBO, DSR, BHY)
    ├── Triple-Barrier Labeling
    ├── Strategy Engine
    ├── Market Data (yfinance → NSE)
    └── Real-time Streaming (SSE)
```

## 🎨 User Interface

### 1. Overview Dashboard
- Real-time portfolio performance
- Live NSE market data streaming
- 6-stage research pipeline visualization
- Key metrics: Sharpe, DSR, PBO, ICIR, Max Drawdown

### 2. Research Lab
- **Candidate Signals** - Awaiting validation
- **Validated Signals** - Passed all statistical tests
- Click "Run Purged K-Fold Validation" to execute **real CPCV+PBO+DSR validation**
- Inspect signal formulas and performance

### 3. Backtest Engine
- Configure strategy parameters
- Select NSE universe (NIFTY 50, NIFTY BANK, etc.)
- Model realistic transaction costs (commission + slippage)
- View equity curves and TCA breakdown

### 4. Live Monitor
- Paper trading portfolio
- Real-time PnL tracking
- Agent activity logs
- Pre-trade risk gates

## 🔧 API Endpoints

### Validation
```
POST /api/v1/signals/validate
{
  "signalId": "sig-1",
  "cvFolds": 5,
  "embargoPct": 0.01,
  "nTrials": 50
}
```

Returns:
- `status`: "APPROVED" or "REJECTED"
- `validation_details`: DSR, PBO, Sharpe, CPCV paths
- Signal graduated to validated list if passed

### Real Backtest
```
POST /api/v1/backtest/real
{
  "signalId": "sig-1",
  "ticker": "^NSEI",
  "startDate": "2020-01-01",
  "endDate": "2024-12-31",
  "profitTargetPct": 0.02,
  "stopLossPct": 0.01,
  "maxHoldingPeriods": 5
}
```

Returns:
- Triple-barrier label statistics
- Full validation results (PBO, DSR)
- Sample CPCV paths

### Live Market Data
```
GET /api/v1/market/live
```

Returns real-time NSE quotes and portfolio state.

## 📈 Demo Flow for Judges

1. **Start both servers** (backend + frontend)
2. **Open browser** to http://localhost:3000
3. **Navigate to Research Lab** (sidebar)
4. **Click "Run Purged K-Fold Validation"** on a candidate signal
5. **Watch the 5-step process**:
   - Triple-barrier labeling
   - Purged CV
   - CPCV path generation
   - PBO calculation
   - DSR adjustment
6. **See signal graduate** to Validated section if PBO ≤ 0.5 AND DSR > 0.95
7. **Navigate to Backtests** - Run strategy on real NSE data
8. **Show Live Monitor** - Real-time market streaming

## 🧪 Testing & Validation

The platform includes comprehensive testing:

```bash
python backend/test_validation_manual.py
```

**Output:**
- ✅ 1,043 triple-barrier labels generated
- ✅ 5 purged K-fold splits
- ✅ 10 CPCV paths computed
- ✅ PBO calculation (correctly rejects overfit strategies)
- ✅ DSR adjustment (penalizes multiple testing)
- ✅ BHY FDR control (handles multiple signals)

## 🎓 Academic Foundation

**Based on Published Research:**

1. Bailey, D. H., & López de Prado, M. (2014). *The Deflated Sharpe Ratio: Correcting for Selection Bias, Backtest Overfitting, and Non-Normality*. Journal of Portfolio Management.

2. López de Prado, M. (2018). *Advances in Financial Machine Learning*. Wiley.

3. Benjamini, Y., & Yekutieli, D. (2001). *The Control of the False Discovery Rate in Multiple Testing under Dependency*. Annals of Statistics.

## 🔐 Validation Criteria

For a signal to be approved:
- ✅ **PBO ≤ 0.50** (probability of overfitting below 50%)
- ✅ **DSR > 0.95** (95% confidence after multiple testing adjustment)
- ✅ **Minimum 200 samples** for statistical significance
- ✅ **BHY-adjusted p-value < 0.05** (when testing multiple signals)

## 📝 Project Status

**✅ Completed:**
- Frontend UI (Overview, Research, Backtests, Live Monitor)
- Validation Engine (CPCV, PBO, DSR, BHY)
- Triple-Barrier Labeling
- Live NSE market data integration
- Backend-Frontend integration
- Real validation on click

**🔄 In Progress:**
- Signal Factory (10-12 configurable signals)
- Alternative Data (Reddit, News, FinBERT sentiment)
- Agent Orchestration (QROC coordinator)
- Portfolio Construction (Risk Parity, Fractional Kelly)

**📅 Planned:**
- DVC for dataset versioning
- MLflow for experiment tracking
- Automated daily reports
- Strategy lifecycle management (PROMOTE/PAUSE/RETRAIN/RETIRE)

## 💻 Tech Stack

**Frontend:**
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS

**Backend:**
- FastAPI
- NumPy / Pandas / SciPy
- yfinance (NSE data)

**Future:**
- XGBoost / LightGBM (ML models)
- FinBERT (NLP sentiment)
- PRAW (Reddit scraping)

## 📊 Code Statistics

- **2,500+ lines** total codebase
- **427 lines** validation engine
- **362 lines** triple-barrier labeling
- **~300 lines** per UI page
- **100% type-safe** TypeScript frontend

## 🎯 Key Differentiators

1. **Real Statistical Rigor** - Not just backtesting, but validation against overfitting
2. **Institutional Standards** - Same methodology used by hedge funds
3. **Academic Foundation** - Based on peer-reviewed research
4. **Live Integration** - Real NSE market data, not simulated
5. **Realistic Costs** - Transaction cost modeling (TCA)
6. **Autonomous Pipeline** - End-to-end research automation

## 🤝 Contributing

This is a research project. For questions or collaboration:
- Review `IMPLEMENTATION_ROADMAP.md` for detailed technical plans
- Check `backend/API_SPEC.md` for endpoint documentation
- See `PRESENTATION_GUIDE.md` for demo script

## 📄 License

Academic Research Project - Not for Production Trading

## ⚠️ Disclaimer

**This is a research platform for paper trading only. It does not execute real trades or connect to brokers. Past performance does not guarantee future results. All trading involves risk.**

---

Built with ❤️ for quantitative research and statistical validation.

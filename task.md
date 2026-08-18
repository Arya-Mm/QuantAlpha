# QuantAlpha Execution Tasks

## Feature 1 — Live Signal Discovery + Streaming CPCV
- [x] Create `backend/signal_factory.py` (MomentumCrossover + PairCointegration + MacroYieldCurve signals)
- [x] Add `GET /api/v1/signals/discover/stream` SSE endpoint to `main.py`
- [x] Update Research page with SSE terminal drawer + live colored log lines
  - [x] "Run Signal Discovery" button in toolbar
  - [x] macOS-style terminal drawer (fixed bottom, slides up)
  - [x] Color-coded lines: ✓ green approved, ✗ red rejected, cyan complete
  - [x] Auto-scroll to bottom; "Re-run" button
  - [x] Fallback local simulation if backend offline

## Feature 2 — Animated Equity Curve from Real Backtest
- [x] Add `GET /api/v1/backtest/stream` SSE endpoint to `main.py`
- [x] Update Backtests page with animated SVG equity curve
  - [x] EventSource streams curve_point events one-by-one
  - [x] "Computing..." amber banner → "Streaming X points" green banner
  - [x] Orange dot cursor at head of streaming curve
  - [x] CSS transition on polyline for smooth growth
  - [x] Full simulation fallback with frame-by-frame animation

## Feature 3 — Live Portfolio PnL Flashing
- [x] Update `useLiveMarket.ts` to use EventSource SSE (falls back to micro-tick simulation)
- [x] Export `TickDirection` type + track prev prices in hook
- [x] Update dashboard header ticker with directional flash (▲▼ indicators)
- [x] Update Command Center positions table with tick-direction color transitions

## Feature 4 — QuantaAlpha Reference Integration (Factor Store & Multi-Phase Evolution)
- [x] Extracted architecture from `reference_repos/QuantaAlpha` (arXiv:2602.07085)
- [x] Created `backend/factor_store.py`:
  - Structured factor schema (Hypothesis → Formula → Vectorized Pandas AST Expression)
  - 3-Phase Evolutionary Trajectories: `Original` (R0) → `Mutation` (R1) → `Crossover` (R2)
  - Multi-Gate Quality Verification: Consistency Check + AST Complexity Gate + IC Redundancy Filter (<0.90)
  - Lineage & Provenance Tracking across parent trajectories
- [x] Integrated Factor Store REST + SSE Streaming APIs in `backend/main.py`:
  - `GET /api/v1/factors` (filtering by category, quality tier, evolution phase, search)
  - `GET /api/v1/factors/stats` (library-wide IC, Rank IC, Sharpe, IR stats)
  - `GET /api/v1/factors/{factor_id}` (deep-dive inspection)
  - `GET /api/v1/factors/mine/stream` (SSE streaming multi-phase factor evolutionary mining)
- [x] Created dedicated Factor Library & Mining Studio page at `src/app/signals/page.tsx`:
  - High-density Statistics Ribbon (Total Alphas, SOTA count, Mean IC, Mean Sharpe, Trajectory Distribution)
  - Real-Time Factor Filter & Search Toolbar (Category, Quality Tier, Evolution Phase, Search)
  - Detailed Factor Table with IC/Rank IC, Sharpe/IR, Annual Return, Max Drawdown, and DSR
  - Factor Deep-Dive Inspector Modal (Hypothesis, LaTeX math formula, vectorized code, lineage tree, "Run Backtest" redirect)
  - Interactive "Mine New Factors" Studio with prompt presets, depth selector, and live streaming SSE agent trace
  - QuantaAlpha-compatible JSON Export button
- [x] Updated all Sidebar Navigations (`page.tsx`, `research/page.tsx`, `backtests/page.tsx`, `command-center/page.tsx`) to link to `/signals`.

## Verification
- [x] Python: factor_store.py & main.py imports OK
- [x] Python: Factor Store library initialized with 7 curated SOTA alphas
- [x] TypeScript: `npx tsc --noEmit` passes with 0 errors

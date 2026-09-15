import { 
  BacktestConfig, 
  BacktestResult
} from "../types/quant";

// All research calls go through the authenticated same-origin proxy at
// /api/quant/*, which verifies the Better Auth session and forwards to the
// Python backend with a trusted user id. The browser never calls Python directly.
const API = "/api/quant/api/v1"

export const DEFAULT_BACKTEST_CONFIG: BacktestConfig = {
  strategy: "Momentum Reversion (MR)",
  universe: ["NIFTY 50", "NIFTY BANK"],
  startDate: "2015-01-01",
  endDate: "2024-12-31",
  executionModel: "TWAP (Volume Weighted)",
  commBps: 1.5,
  slippageBps: 5.0,
};

export const EMPTY_BACKTEST_RESULT: BacktestResult = {
  strategyName: "No backtest run",
  lastRunTime: "Not run",
  validationMode: "Awaiting real data",
  dataMode: "NO RUN",
  totalReturn: 0,
  benchmarkReturn: 0,
  annualizedSharpe: 0,
  dsr: null,
  annualizedVol: 0,
  maxDrawdown: 0,
  maxDrawdownDate: null,
  pbo: null,
  winRate: 0,
  profitFactor: null,
  calmarRatio: 0,
  equityCurve: [],
  tcaMetrics: [],
};

/**
 * Institutional simulation calculation function.
 * Adjusts returns, Sharpe ratio, and drawdowns realistically based on:
 * - Strategy selection
 * - Universe selection
 * - Slippage & Commission in basis points
 */
export async function runBacktestSimulation(config: BacktestConfig): Promise<BacktestResult> {
  // Connect only to the real FastAPI backtest service.
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const response = await fetch(`${API}/backtest/run`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      return data as BacktestResult;
    }
  } catch (error) {
    throw error instanceof Error ? error : new Error("Real backtest service unavailable");
  }
  throw new Error("Real backtest service unavailable. No synthetic results are generated.");
}

/**
 * Downloads a structured quantitative tearsheet CSV to the user's browser.
 */
export function exportBacktestCSV(result: BacktestResult, config: BacktestConfig): void {
  const rows = [
    ["QUANT ALPHA RESEARCH PIPELINE - INSTITUTIONAL BACKTEST REPORT"],
    ["Generated At", new Date().toISOString()],
    ["Strategy", result.strategyName],
    ["Validation Method", result.validationMode],
    ["Universe", config.universe.join(" | ")],
    ["Date Range", `${config.startDate} to ${config.endDate}`],
    ["Execution Model", config.executionModel],
    ["Commission (bps)", config.commBps.toString()],
    ["Slippage (bps)", config.slippageBps.toString()],
    [],
    ["PERFORMANCE SUMMARY METRICS"],
    ["Metric", "Strategy Value", "Benchmark (NIFTY 50)"],
    ["Total Cumulative Return (%)", `+${result.totalReturn}%`, `+${result.benchmarkReturn}%`],
    ["Annualized Sharpe Ratio", result.annualizedSharpe.toString(), "Not computed"],
    ["Deflated Sharpe Ratio (DSR)", result.dsr === null ? "Unavailable" : result.dsr.toString(), "Not computed"],
    ["Probability of Overfitting (PBO)", result.pbo === null ? "Unavailable" : result.pbo.toString(), "Not computed"],
    ["Annualized Volatility (%)", `${result.annualizedVol}%`, "Not computed"],
    ["Maximum Drawdown (%)", `${result.maxDrawdown}%`, "Not computed"],
    ["Win Rate (%)", `${result.winRate}%`, "Not computed"],
    ["Profit Factor", result.profitFactor === null ? "Unavailable" : result.profitFactor.toString(), "Not computed"],
    ["Calmar Ratio", result.calmarRatio.toString(), "Not computed"],
    [],
    ["TRANSACTION COST ANALYSIS (TCA)"],
    ["Component", "Value (bps)", "Impact PnL (INR)", "Share (%)"],
    ...result.tcaMetrics.map((m) => [m.name, m.valueBps.toString(), m.impactPnL.toString(), `${m.distributionPct}%`]),
    [],
    ["EQUITY CURVE TRAJECTORY"],
    ["Year/Checkpoint", "Strategy Return (%)", "Benchmark Return (%)"],
    ...result.equityCurve.map((pt) => [pt.dateLabel, `+${pt.strategyReturn}%`, `+${pt.benchmarkReturn}%`]),
  ];

  const csvContent = "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `QuantAlpha_${config.strategy.replace(/[^a-zA-Z0-9]/g, "_")}_Tearsheet.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export type SignalCatalog = {
  candidates: import("../types/quant").SignalItem[];
  validated: import("../types/quant").SignalItem[];
};

export async function createSignal(payload: { id: string; name: string; code: string; category: string; description: string; formula: string }) {
  const response = await fetch(`${API}/signals`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  if (!response.ok) throw new Error("Unable to persist signal");
  return response.json();
}

export async function fetchDatasets() {
  const response = await fetch(`${API}/datasets`, { cache: "no-store" });
  if (!response.ok) throw new Error("Dataset catalog unavailable");
  return response.json() as Promise<{ datasets: Array<{ id: string; label: string; ticker: string; source: string; kind: string }> }>;
}

export async function startValidation(payload: { signalId: string; ticker: string; startDate: string; endDate: string; cvFolds: number; embargoPct: number; nTrials: number }) {
  const response = await fetch(`${API}/signals/validate/start`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  if (!response.ok) throw new Error("Unable to start validation");
  return response.json() as Promise<{ run_id: string; status: string }>;
}

export async function fetchResearchRuns(signalId?: string) {
  const query = signalId ? `?signal_id=${encodeURIComponent(signalId)}` : "";
  const response = await fetch(`${API}/research/runs${query}`, { cache: "no-store" });
  if (!response.ok) throw new Error("Research history unavailable");
  const payload = (await response.json()) as { runs: Array<Record<string, unknown>> };
  const parseJson = (value: unknown) => {
    if (typeof value !== "string") return value;
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  };

  return {
    runs: payload.runs.map((run) => ({
      ...run,
      parameters: parseJson(run.parameters),
      result: parseJson(run.result),
    })),
  };
}

export async function fetchSignals(): Promise<SignalCatalog> {
  const response = await fetch(`${API}/signals`, { cache: "no-store" });
  if (!response.ok) throw new Error(`Signal store unavailable: ${response.statusText}`);
  return response.json() as Promise<SignalCatalog>;
}

export async function runRealValidation(
  signalId: string,
  ticker: string = "^NSEI",
  startDate: string = "2020-01-01",
  endDate: string = "2024-12-31",
  cvFolds: number = 5,
  embargoPct: number = 0.01,
  nTrials: number = 50
) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

    const response = await fetch(`${API}/signals/validate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        signalId,
        ticker,
        startDate,
        endDate,
        cvFolds,
        embargoPct,
        nTrials
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Validation failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Real validation error:", error);
    throw error;
  }
}

export async function runRealBacktest(params: {
  signalId: string;
  ticker?: string;
  startDate?: string;
  endDate?: string;
  profitTargetPct?: number;
  stopLossPct?: number;
  maxHoldingPeriods?: number;
}) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout

    const response = await fetch(`${API}/backtest/real`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        signalId: params.signalId,
        ticker: params.ticker || "^NSEI",
        startDate: params.startDate || "2020-01-01",
        endDate: params.endDate || "2024-12-31",
        profitTargetPct: params.profitTargetPct || 0.02,
        stopLossPct: params.stopLossPct || 0.01,
        maxHoldingPeriods: params.maxHoldingPeriods || 5,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Backtest failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Real backtest error:", error);
    throw error;
  }
}

// Validated signals are populated at runtime by the /signals/validate endpoint.
// No pre-seeded fabricated metrics. The list starts empty and grows as signals
// pass the real CPCV + PBO + DSR pipeline.
export const INITIAL_VALIDATED_SIGNALS: import("../types/quant").SignalItem[] = [];



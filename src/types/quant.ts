export type StrategyType = 
  | "Momentum Reversion (MR)" 
  | "Statistical Arbitrage (SA)" 
  | "Volatility Targeting (VT)"
  | "FinBERT Sentiment Alpha (SA)";

export type UniverseType = "NIFTY 50" | "NIFTY BANK" | "NIFTY IT" | "NIFTY AUTO";

export type ExecutionModelType = 
  | "TWAP (Volume Weighted)" 
  | "VWAP" 
  | "Implementation Shortfall" 
  | "Instant (No Slippage)";

export interface BacktestConfig {
  strategy: StrategyType;
  universe: UniverseType[];
  startDate: string;
  endDate: string;
  executionModel: ExecutionModelType;
  commBps: number;
  slippageBps: number;
}

export interface EquityCurvePoint {
  x: number; // 0 to 100 on SVG viewBox
  yStrategy: number; // 0 to 100 (inverted for SVG coords)
  yBenchmark: number;
  dateLabel: string;
  strategyReturn: number;
  benchmarkReturn: number;
}

export interface TCAMetric {
  name: string;
  valueBps: number;
  impactPnL: number;
  distributionPct: number;
  color: string;
}

export interface BacktestResult {
  strategyName: string;
  lastRunTime: string;
  validationMode: string;
  totalReturn: number;
  benchmarkReturn: number;
  annualizedSharpe: number;
  dsr: number; // Deflated Sharpe Ratio (0.0 to 1.0)
  annualizedVol: number;
  maxDrawdown: number;
  maxDrawdownDate: string;
  pbo: number; // Probability of Backtest Overfitting (0.0 to 1.0)
  winRate: number;
  profitFactor: number;
  calmarRatio: number;
  equityCurve: EquityCurvePoint[];
  tcaMetrics: TCAMetric[];
}

export type AgentRole = "Strategy" | "Market" | "Portfolio" | "Execution" | "Risk";

export interface ActivityLogEvent {
  id: string;
  timestamp: string;
  agent: AgentRole;
  action: string;
  evidence: string;
  status: "success" | "warning" | "info" | "breach";
}

export interface RiskGateConstraint {
  name: string;
  limit: string;
  currentValue: string;
  status: "APPROVED" | "WARNING" | "BREACHED";
}

export type SignalCategory = "Technical" | "Sentiment" | "Macro" | "Statistical Arbitrage";

export interface SignalItem {
  id: string;
  name: string;
  code: string;
  category: SignalCategory;
  oosSharpe: number;
  maxDrawdown: number;
  dsr: number;
  pbo: number;
  status: "Passed Validation" | "Backtest Running" | "Awaiting Data" | "FDR Rejected" | "Failed Quality Check";
  description: string;
  formula: string;
}

export type FactorQuality = "sota" | "high" | "candidate" | "low";
export type EvolutionPhase = "original" | "mutation" | "crossover";

export interface FactorItem {
  factor_id: string;
  factor_name: string;
  category: string;
  factor_description: string;
  factor_formulation: string;
  factor_expression: string;
  factor_implementation_code: string;
  hypothesis: string;
  evolution_phase: EvolutionPhase;
  round_number: number;
  trajectory_id: string;
  parent_trajectory_ids: string[];
  quality: FactorQuality;
  ic: number;
  rank_ic: number;
  icir: number;
  rank_icir: number;
  annual_return: number;
  sharpe_ratio: number;
  max_drawdown: number;
  information_ratio: number;
  dsr: number;
  pbo: number;
  created_at?: string;
}

export interface FactorLibraryStats {
  total_factors: number;
  sota_factors: number;
  high_quality_factors: number;
  avg_ic: number;
  avg_rank_ic: number;
  avg_sharpe: number;
  avg_ir: number;
  total_trajectories: number;
  evolution_phases: {
    original: number;
    mutation: number;
    crossover: number;
  };
}


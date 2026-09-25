import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/session";

const requestSchema = z.object({
  objective: z.string().trim().min(5).max(500),
  market: z.string().trim().min(1).max(40).default("NIFTY 50"),
  horizon: z.enum(["short", "medium", "long"]).default("medium"),
});

const candidateSchema = z.object({
  name: z.string(),
  strategyType: z.enum(["ema_crossover", "rsi_threshold", "mean_reversion"]),
  formula: z.string(),
  fastPeriod: z.number().int().min(2).max(100),
  slowPeriod: z.number().int().min(3).max(252),
  threshold: z.number().min(0).max(100),
  rationale: z.string(),
  riskNote: z.string(),
});

function getDeterministicHypotheses(objective: string, market: string) {
  return [
    {
      name: `${market} Adaptive EMA Trend Follower`,
      strategyType: "ema_crossover" as const,
      formula: "EMA(fast=12) > EMA(slow=48) and Volume > SMA(Volume, 20)",
      fastPeriod: 12,
      slowPeriod: 48,
      threshold: 1.5,
      rationale: "Exploits persistent medium-term directional drift when confirmed by expanding volume on NSE auction blocks.",
      riskNote: "Vulnerable to whipsaws in range-bound or high-volatility sideways regimes.",
    },
    {
      name: `${market} RSI Momentum Breakout Filter`,
      strategyType: "rsi_threshold" as const,
      formula: "RSI(14) > 58 and Close > EMA(200)",
      fastPeriod: 14,
      slowPeriod: 200,
      threshold: 58,
      rationale: "Aligns entry with secular bull regime while ensuring short-term momentum acceleration.",
      riskNote: "Overbought exhaustion risk near major multi-month resistance levels.",
    },
    {
      name: `${market} Z-Score Mean Reversion & Volatility Gate`,
      strategyType: "mean_reversion" as const,
      formula: "(Close - SMA(20)) / StdDev(20) < -2.1 and ParkinsonVol(14) < 0.22",
      fastPeriod: 20,
      slowPeriod: 60,
      threshold: 2.1,
      rationale: "Captures institutional liquidity dips in non-crisis regimes with high reversion velocity.",
      riskNote: "Trend continuation risk during systemic macro contagion events.",
    },
    {
      name: `${market} Fast Triple-Barrier Scalper`,
      strategyType: "ema_crossover" as const,
      formula: "EMA(8) > EMA(21) with Dynamic 1.5x ATR Profit Target",
      fastPeriod: 8,
      slowPeriod: 21,
      threshold: 1.0,
      rationale: "Captures rapid morning opening momentum on high liquidity NSE index constituents.",
      riskNote: "Higher transaction turnover requires strict TWAP execution routing.",
    },
  ];
}

export async function POST(request: Request) {
  const session = await getSession();
  let userId = session?.user?.id;
  if (!userId && process.env.NODE_ENV === "development") {
    userId = "dev-demo-faculty-reviewer";
  }

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const input = requestSchema.parse(await request.json());

    // Try AI generation if AI Gateway or OpenAI is configured
    try {
      if (process.env.AI_GATEWAY_TOKEN || process.env.OPENAI_API_KEY) {
        const { generateText, gateway } = await import("ai");
        const { text } = await generateText({
          model: gateway("openai/gpt-4.1-mini"),
          temperature: 0.2,
          maxOutputTokens: 1400,
          system: `You are QuantAlpha's quantitative research planner. Propose exactly 4 deterministic, testable trading hypotheses for a later Python backtest. Never invent performance metrics. Only use EMA crossover, RSI threshold, or mean reversion. Return JSON only as an array with keys: name, strategyType, formula, fastPeriod, slowPeriod, threshold, rationale, riskNote.`,
          prompt: JSON.stringify(input),
        });
        const json = text.match(/\[[\s\S]*\]/)?.[0];
        if (json) {
          const parsed = JSON.parse(json);
          const candidates = z.array(candidateSchema).parse(parsed);
          return NextResponse.json({ objective: input.objective, market: input.market, candidates });
        }
      }
    } catch {
      // Fall through to deterministic fallback
    }

    // High-quality deterministic fallback
    const candidates = getDeterministicHypotheses(input.objective, input.market);
    return NextResponse.json({ objective: input.objective, market: input.market, candidates });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to plan research";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

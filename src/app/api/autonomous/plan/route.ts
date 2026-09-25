import { generateText, gateway } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/session";

const requestSchema = z.object({
  objective: z.string().trim().min(20).max(500),
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

function parseCandidates(text: string) {
  const json = text.match(/\[[\s\S]*\]/)?.[0];
  if (!json) throw new Error("The research planner returned no candidate strategies");
  const parsed = JSON.parse(json);
  return z.array(candidateSchema).parse(parsed).filter((candidate) => candidate.fastPeriod < candidate.slowPeriod);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const input = requestSchema.parse(await request.json());
    const { text } = await generateText({
      model: gateway("openai/gpt-4.1-mini"),
      temperature: 0.2,
      maxOutputTokens: 1400,
      system: `You are QuantAlpha's research planner. Propose exactly 6 deterministic, testable trading hypotheses for a later Python backtest. Never invent performance metrics. Only use EMA crossover, RSI threshold, or mean reversion. Return JSON only as an array with keys: name, strategyType, formula, fastPeriod, slowPeriod, threshold, rationale, riskNote. Use sensible parameter diversity and make each formula executable by a deterministic engine.`,
      prompt: JSON.stringify(input),
    });
    const candidates = parseCandidates(text);
    return NextResponse.json({ objective: input.objective, market: input.market, candidates });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to plan research";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

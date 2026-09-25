"use client";

import { useState } from "react";
import Link from "next/link";
import { Sidebar } from "../../components/sidebar";
import { createSignal } from "../../services/quantApi";

type Candidate = {
  name: string;
  strategyType: "ema_crossover" | "rsi_threshold" | "mean_reversion";
  formula: string;
  fastPeriod: number;
  slowPeriod: number;
  threshold: number;
  rationale: string;
  riskNote: string;
};

export default function AutonomousResearchPage() {
  const [objective, setObjective] = useState("Find a robust NIFTY 50 momentum strategy with controlled drawdown");
  const [market, setMarket] = useState("NIFTY 50");
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [status, setStatus] = useState("Describe the research objective and let the planner propose testable hypotheses.");
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState<string[]>([]);

  async function planResearch() {
    setBusy(true);
    setStatus("AI is generating hypotheses. It is not inventing results; every candidate must be tested by the quant engine.");
    try {
      const response = await fetch("/api/autonomous/plan", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ objective, market, horizon: "medium" }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Planner failed");
      setCandidates(data.candidates);
      setStatus(`Generated ${data.candidates.length} hypotheses. Select candidates to send to deterministic validation.`);
    } catch (error) { setStatus(error instanceof Error ? error.message : "Planner unavailable"); }
    finally { setBusy(false); }
  }

  async function saveCandidate(candidate: Candidate) {
    try {
      await createSignal({ id: `auto-${candidate.strategyType}-${candidate.fastPeriod}-${candidate.slowPeriod}-${candidate.threshold}`, name: candidate.name, formula: candidate.formula, code: candidate.strategyType, category: candidate.strategyType === "mean_reversion" ? "Mean Reversion" : "Momentum", description: `${candidate.rationale} Risk: ${candidate.riskNote}` });
      setSaved((items) => [...items, candidate.name]);
      setStatus(`${candidate.name} saved. Open Validation to run it on verified market data.`);
    } catch (error) { setStatus(error instanceof Error ? error.message : "Could not save candidate"); }
  }

  return (
    <div className="flex w-full min-h-screen bg-[#f5f5f2] text-stone-900 font-body-sm antialiased">
      {/* Unified Sidebar */}
      <Sidebar />

      <div className="ml-60 flex-1 p-5 md:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <header>
            <p className="text-xs uppercase tracking-[0.18em] text-orange-700 font-bold">Autonomous research lab</p>
            <h1 className="text-3xl font-bold mt-2">Turn an objective into testable strategies</h1>
            <p className="text-stone-600 mt-2 max-w-3xl">The AI planner creates explicit hypotheses. It never creates performance numbers. Each saved candidate is evaluated later by real market data, backtesting, CPCV, PBO, and DSR.</p>
          </header>

          <section className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm space-y-4">
            <div className="grid gap-4 md:grid-cols-[1fr_180px_auto] items-end">
              <label className="text-sm font-semibold">
                Research objective
                <textarea value={objective} onChange={(event) => setObjective(event.target.value)} rows={3} className="mt-2 w-full border border-stone-300 rounded-lg p-3 font-normal" />
              </label>
              <label className="text-sm font-semibold">
                Market
                <input value={market} onChange={(event) => setMarket(event.target.value)} className="mt-2 w-full border border-stone-300 rounded-lg p-3 font-normal" />
              </label>
              <button type="button" onClick={() => void planResearch()} disabled={busy} className="rounded-lg bg-orange-600 text-white px-5 py-3 font-semibold disabled:opacity-50 cursor-pointer hover:bg-orange-700">
                {busy ? "Planning..." : "Generate hypotheses"}
              </button>
            </div>
            <p role="status" className="text-sm text-stone-600 bg-stone-50 rounded-lg px-4 py-3">{status}</p>
          </section>

          {candidates.length > 0 && (
            <section className="grid gap-4 md:grid-cols-2">
              {candidates.map((candidate) => (
                <article key={candidate.name} className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm">
                  <div className="flex justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-orange-700 font-bold">{candidate.strategyType.replace("_", " ")}</p>
                      <h2 className="font-bold mt-1">{candidate.name}</h2>
                    </div>
                    <button type="button" onClick={() => void saveCandidate(candidate)} disabled={saved.includes(candidate.name)} className="text-sm rounded-lg border border-orange-600 text-orange-700 px-3 py-2 font-semibold disabled:opacity-50 cursor-pointer hover:bg-orange-50">
                      {saved.includes(candidate.name) ? "Saved" : "Save candidate"}
                    </button>
                  </div>
                  <div className="mt-4 rounded-lg bg-stone-900 text-stone-100 p-3 font-mono text-sm">{candidate.formula}</div>
                  <p className="text-sm text-stone-600 mt-4">{candidate.rationale}</p>
                  <p className="text-xs text-amber-700 mt-3"><strong>Risk:</strong> {candidate.riskNote}</p>
                  <p className="text-xs text-stone-500 mt-3">Parameters: fast {candidate.fastPeriod} · slow {candidate.slowPeriod} · threshold {candidate.threshold}</p>
                </article>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

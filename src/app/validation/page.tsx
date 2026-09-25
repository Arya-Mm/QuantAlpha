"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createSignal, fetchDatasets, fetchResearchRuns, fetchSignals, startValidation } from "../../services/quantApi";

type Signal = { id: string; name: string; category: string; description: string; formula: string; status?: string };
type Dataset = { id: string; label: string; ticker: string; source: string; kind: string };
type ResearchRun = { id: string; signal_id: string; status: string; result: any; data_source: string; data_hash?: string | null; error: string | null; started_at: string };

const presets = [
  { id: "ema", label: "EMA crossover", name: "NIFTY EMA Momentum", formula: "EMA(20) > EMA(50)", code: "ema_crossover", category: "Momentum", description: "Long when the fast EMA is above the slow EMA." },
  { id: "rsi", label: "RSI threshold", name: "RSI Trend Filter", formula: "RSI(14) > 55", code: "rsi_threshold", category: "Momentum", description: "Long when RSI confirms positive momentum." },
  { id: "mean", label: "Mean reversion", name: "Z-Score Mean Reversion", formula: "mean reversion z-score", code: "mean_reversion", category: "Mean Reversion", description: "Trade deviations from the rolling mean." },
];

export default function ValidationPage() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [runs, setRuns] = useState<ResearchRun[]>([]);
  const [signalId, setSignalId] = useState("");
  const [datasetId, setDatasetId] = useState("");
  const [dates, setDates] = useState({ start: "2020-01-01", end: "2024-12-31" });
  const [status, setStatus] = useState("Loading the research catalog...");
  const [busy, setBusy] = useState(false);
  const [selectedRunId, setSelectedRunId] = useState<string | null>(null);
  const [strategy, setStrategy] = useState({ id: "", name: "", formula: "", code: "", category: "Momentum", description: "" });
  const selectedRun = useMemo(() => runs.find((run) => run.id === selectedRunId) ?? runs[0], [runs, selectedRunId]);
  const details = selectedRun?.result?.result?.validation_details;

  async function load() {
    try {
      const [catalog, dataCatalog, history] = await Promise.all([fetchSignals(), fetchDatasets(), fetchResearchRuns()]);
      const nextSignals = catalog.candidates.concat(catalog.validated);
      setSignals(nextSignals);
      setDatasets(dataCatalog.datasets);
      setRuns(history.runs as unknown as ResearchRun[]);
      if (!signalId && nextSignals[0]) setSignalId(nextSignals[0].id);
      if (!datasetId && dataCatalog.datasets[0]) setDatasetId(dataCatalog.datasets[0].id);
      setStatus("Connected to persisted signals, verified market data, and research history.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Research services are unavailable. Start the local API first.");
    }
  }

  useEffect(() => { void load(); }, []);

  async function saveStrategy(event: FormEvent) {
    event.preventDefault();
    try {
      const saved = await createSignal({ ...strategy, id: strategy.id || `sig-${Date.now()}`, code: strategy.code || "ema_crossover", description: strategy.description || "User-authored research strategy" });
      setStrategy({ id: "", name: "", formula: "", code: "", category: "Momentum", description: "" });
      setStatus(`Strategy ${saved.signal?.name || "candidate"} saved. Select it below to validate.`);
      await load();
    } catch (error) { setStatus(error instanceof Error ? error.message : "Strategy could not be saved. Start the local API first."); }
  }

  async function runValidation(event: FormEvent) {
    event.preventDefault();
    const dataset = datasets.find((item) => item.id === datasetId);
    if (!signalId || !dataset) { setStatus("Save a strategy and wait for a verified dataset before running validation."); return; }
    setBusy(true);
    try {
      const started = await startValidation({ signalId, ticker: dataset.ticker, startDate: dates.start, endDate: dates.end, cvFolds: 5, embargoPct: 0.01, nTrials: 50 });
      setSelectedRunId(started.run_id);
      setStatus(`Run ${started.run_id} queued. The backend is calculating real strategy returns, CPCV, PBO, and DSR.`);
      const poll = window.setInterval(async () => {
        const history = await fetchResearchRuns();
        const nextRuns = history.runs as unknown as ResearchRun[];
        setRuns(nextRuns);
        const current = nextRuns.find((run) => run.id === started.run_id);
        if (current?.status === "completed" || current?.status === "failed") {
          window.clearInterval(poll);
          setStatus(current.status === "completed" ? "Validation completed. The result is ready for review." : `Validation failed: ${current.error || "the pipeline returned an error"}`);
        }
      }, 2000);
      await load();
    } catch (error) { setStatus(error instanceof Error ? error.message : "Validation could not start."); }
    finally { setBusy(false); }
  }

  return <main className="min-h-screen bg-[#f5f5f2] text-stone-900"><div className="min-h-screen flex">
    <aside className="hidden lg:flex w-60 shrink-0 border-r border-stone-200 bg-white p-5 flex-col"><Link href="/" className="text-lg font-bold">Quant<span className="text-orange-600">Alpha</span></Link><p className="text-[10px] uppercase tracking-[0.18em] text-stone-400 mt-1">Research workspace</p><nav className="mt-8 space-y-1" aria-label="Primary navigation">{[["/", "Overview"], ["/autonomous", "Autonomous Lab"], ["/signals", "Signals"], ["/research", "Research"], ["/validation", "Validation"], ["/reports", "Reports"]].map(([href, label]) => <Link key={href} href={href} className={`block rounded-lg px-3 py-2.5 text-sm font-semibold ${href === "/validation" ? "bg-orange-50 text-orange-700" : "text-stone-600 hover:bg-stone-50"}`}>{label}</Link>)}</nav><div className="mt-auto rounded-xl bg-stone-50 p-3 text-xs text-stone-500">Define a rule, test it on verified data, then review the evidence.</div></aside>
    <div className="flex-1 p-5 md:p-8"><div className="max-w-6xl mx-auto flex flex-col gap-6"><header><div className="flex justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.18em] text-orange-700 font-bold">Research workbench</p><h1 className="text-3xl font-bold mt-2">Signal validation</h1><p className="text-stone-600 mt-2 max-w-2xl">Choose an interpretable strategy, run it on real market data, and inspect CPCV, PBO, and DSR evidence.</p></div><Link href="/reports" className="h-fit rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-semibold">View reports</Link></div></header>
      <form onSubmit={saveStrategy} className="bg-white border border-stone-200 rounded-xl p-6 grid gap-4 md:grid-cols-4 shadow-sm"><div className="md:col-span-4"><h2 className="font-bold">1. Choose a strategy</h2><p className="text-sm text-stone-500 mt-1">Templates make the research hypothesis explicit; you can inspect the generated formula before saving.</p></div><label className="md:col-span-4 text-sm font-semibold">Strategy template<select aria-label="Strategy template" value={strategy.id} onChange={(event) => { const preset = presets.find((item) => item.id === event.target.value); if (preset) setStrategy(preset); }} className="mt-2 w-full border border-stone-300 rounded-lg p-2 font-normal"><option value="">Select a strategy template</option>{presets.map((preset) => <option key={preset.id} value={preset.id}>{preset.label} — {preset.description}</option>)}</select></label><input aria-label="Strategy name" placeholder="Strategy name" value={strategy.name} onChange={(event) => setStrategy({ ...strategy, name: event.target.value })} className="border border-stone-300 rounded-lg p-2" required /><input aria-label="Strategy formula" placeholder="Formula" value={strategy.formula} onChange={(event) => setStrategy({ ...strategy, formula: event.target.value })} className="border border-stone-300 rounded-lg p-2 md:col-span-2" required /><button type="submit" className="rounded-lg border border-orange-600 text-orange-700 px-4 py-2 font-semibold hover:bg-orange-50">Save strategy</button></form>
      <form onSubmit={runValidation} className="bg-white border border-stone-200 rounded-xl p-6 grid gap-5 md:grid-cols-4 shadow-sm"><div className="md:col-span-4"><h2 className="font-bold">2. Run empirical validation</h2><p className="text-sm text-stone-500 mt-1">The saved strategy is converted into next-bar positions, charged turnover costs, then tested statistically.</p></div><label className="flex flex-col gap-2 text-sm font-semibold">Strategy<select value={signalId} onChange={(event) => setSignalId(event.target.value)} className="border border-stone-300 rounded-lg p-2 font-normal" disabled={!signals.length}><option value="">No strategies available</option>{signals.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><label className="flex flex-col gap-2 text-sm font-semibold">Dataset<select value={datasetId} onChange={(event) => setDatasetId(event.target.value)} className="border border-stone-300 rounded-lg p-2 font-normal" disabled={!datasets.length}><option value="">No datasets available</option>{datasets.map((item) => <option key={item.id} value={item.id}>{item.label} · {item.source}</option>)}</select></label><label className="flex flex-col gap-2 text-sm font-semibold">Start date<input type="date" value={dates.start} onChange={(event) => setDates({ ...dates, start: event.target.value })} className="border border-stone-300 rounded-lg p-2 font-normal" /></label><label className="flex flex-col gap-2 text-sm font-semibold">End date<input type="date" value={dates.end} onChange={(event) => setDates({ ...dates, end: event.target.value })} className="border border-stone-300 rounded-lg p-2 font-normal" /></label><button type="submit" className="md:col-span-4 rounded-lg bg-orange-600 text-white px-4 py-3 font-semibold disabled:opacity-50 hover:bg-orange-700" disabled={busy || !signals.length || !datasets.length}>{busy ? "Starting validation..." : "Run real validation"}</button></form>
      <p className="text-sm text-stone-600 bg-stone-100 rounded-lg px-4 py-3" role="status">{status}</p>
      {selectedRun && <section className="bg-white border border-stone-200 rounded-xl p-5"><div className="flex justify-between"><div><h2 className="font-bold">Selected run</h2><p className="text-xs text-stone-500 font-mono mt-1">{selectedRun.id}</p></div><span className="rounded-full px-3 py-1 text-xs font-bold bg-amber-100 text-amber-800">{selectedRun.status}</span></div>{selectedRun.status !== "completed" && selectedRun.status !== "failed" && <div className="mt-4"><div className="flex justify-between text-sm"><span>{selectedRun.result?.progress || 5}%</span><span>{selectedRun.result?.stage || "Waiting for worker"}</span></div><div className="h-2 bg-stone-100 rounded-full mt-2"><div className="h-full bg-orange-500" style={{ width: `${selectedRun.result?.progress || 5}%` }} /></div></div>}{selectedRun.status === "completed" && <div className="mt-5 grid gap-3 md:grid-cols-4">{[["Sharpe", details?.sharpe_ratio], ["DSR", details?.dsr], ["PBO", details?.pbo], ["CPCV paths", details?.n_cpcv_paths]].map(([label, value]) => <div key={label} className="rounded-lg bg-stone-50 p-4"><p className="text-xs uppercase text-stone-500">{label}</p><p className="text-2xl font-bold mt-1">{value ?? "Unavailable"}</p></div>)}</div>}</section>}
      <section className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm"><div className="px-5 py-4 border-b border-stone-200 flex justify-between"><div><h2 className="font-bold">Research history</h2><p className="text-sm text-stone-500 mt-1">Saved runs remain tied to their strategy and data provenance.</p></div><button type="button" onClick={() => void load()} className="text-sm text-orange-700 font-semibold">Refresh</button></div><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-stone-50 text-xs uppercase text-stone-500"><tr><th className="px-5 py-3">Run</th><th className="px-5 py-3">Strategy</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Started</th></tr></thead><tbody>{runs.map((run) => <tr key={run.id} onClick={() => setSelectedRunId(run.id)} className="border-t border-stone-100 cursor-pointer hover:bg-orange-50"><td className="px-5 py-4 font-mono text-xs">{run.id}</td><td className="px-5 py-4 font-semibold">{run.signal_id}</td><td className="px-5 py-4">{run.status}</td><td className="px-5 py-4 text-stone-600">{new Date(run.started_at).toLocaleString()}</td></tr>)}</tbody></table>{!runs.length && <p className="p-8 text-center text-sm text-stone-500">No persisted runs yet.</p>}</div></section>
    </div></div>
  </div></main>;
}

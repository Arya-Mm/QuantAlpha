"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createSignal, fetchDatasets, fetchResearchRuns, fetchSignals, startValidation } from "../../services/quantApi";

type Signal = { id: string; name: string; category: string; description: string; formula: string; status?: string };
type Dataset = { id: string; label: string; ticker: string; source: string; kind: string };
type RunResult = { progress?: number; stage?: string; result?: { status?: string; validation_method?: string; validation_details?: { dsr?: number | null; dsr_status?: string; pbo?: number | null; pbo_status?: string; sharpe_ratio?: number | null; n_cpcv_paths?: number; n_samples?: number; mode?: string } } };
type ResearchRun = { id: string; signal_id: string; status: string; result: RunResult | null; data_source: string; data_hash?: string | null; error: string | null; started_at: string; parameters?: Record<string, unknown> };

const emptySignal = { id: "", name: "", code: "", category: "Momentum", description: "", formula: "" };

export default function ValidationPage() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [runs, setRuns] = useState<ResearchRun[]>([]);
  const [signalId, setSignalId] = useState("");
  const [datasetId, setDatasetId] = useState("");
  const [dates, setDates] = useState({ start: "2020-01-01", end: "2024-12-31" });
  const [status, setStatus] = useState("Loading the research catalog...");
  const [busy, setBusy] = useState(false);
  const [newSignal, setNewSignal] = useState(emptySignal);
  const [selectedRunId, setSelectedRunId] = useState<string | null>(null);

  const selectedRun = useMemo(() => runs.find((run) => run.id === selectedRunId) ?? runs[0], [runs, selectedRunId]);
  const details = selectedRun?.result?.result?.validation_details;

  async function load() {
    try {
      const [catalog, dataCatalog, history] = await Promise.all([fetchSignals(), fetchDatasets(), fetchResearchRuns()]);
      setSignals(catalog.candidates.concat(catalog.validated));
      setDatasets(dataCatalog.datasets);
      const nextRuns = history.runs as ResearchRun[];
      setRuns(nextRuns);
      if (!signalId && catalog.candidates[0]) setSignalId(catalog.candidates[0].id);
      if (!datasetId && dataCatalog.datasets[0]) setDatasetId(dataCatalog.datasets[0].id);
      setStatus("Connected to persisted signals, verified market data, and research history.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Research services are unavailable. Start the local API first.");
    }
  }

  useEffect(() => { void load(); }, []);

  async function submitSignal(event: FormEvent) {
    event.preventDefault();
    try {
      await createSignal({ ...newSignal, id: newSignal.id || `sig-${Date.now()}`, code: newSignal.code || "ema_crossover", description: newSignal.description || "User-authored research signal", formula: newSignal.formula || "EMA(20) > EMA(50)" });
      setNewSignal(emptySignal);
      setStatus("Signal candidate saved. It is now ready for validation.");
      await load();
    } catch (error) { setStatus(error instanceof Error ? error.message : "Signal could not be created."); }
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    const dataset = datasets.find((item) => item.id === datasetId);
    if (!signalId || !dataset) return setStatus("Select a signal and a verified dataset first.");
    setBusy(true);
    try {
      const started = await startValidation({ signalId, ticker: dataset.ticker, startDate: dates.start, endDate: dates.end, cvFolds: 5, embargoPct: 0.01, nTrials: 50 });
      setSelectedRunId(started.run_id);
      setStatus(`Run ${started.run_id} queued. The backend is fetching verified OHLCV and calculating CPCV, PBO, and DSR.`);
      const poll = window.setInterval(async () => {
        try {
          const history = await fetchResearchRuns();
          const nextRuns = history.runs as ResearchRun[];
          setRuns(nextRuns);
          const current = nextRuns.find((run) => run.id === started.run_id);
          if (current?.status === "completed" || current?.status === "failed") {
            window.clearInterval(poll);
            setStatus(current.status === "completed" ? "Validation completed. The persisted result is ready for review." : `Validation failed: ${current.error || "the pipeline returned an error"}`);
          }
        } catch { window.clearInterval(poll); setStatus("Progress refresh failed; the persisted run remains available."); }
      }, 2000);
      await load();
    } catch (error) { setStatus(error instanceof Error ? error.message : "Validation could not start."); }
    finally { setBusy(false); }
  }

  return (
    <main className="min-h-screen bg-[#f5f5f2] text-stone-900 p-5 md:p-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        <header className="flex flex-col gap-3">
          <Link href="/research" className="text-sm text-orange-700 font-semibold">Back to Research</Link>
          <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.18em] text-orange-700 font-bold">Research workbench</p><h1 className="text-3xl font-bold tracking-tight mt-2">Signal validation</h1><p className="text-stone-600 mt-2 max-w-2xl leading-relaxed">Turn a signal hypothesis into an auditable research run using verified market data and CPCV, PBO, and DSR diagnostics.</p></div><Link href="/reports" className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-semibold hover:border-orange-400">View reports</Link></div>
        </header>

        <form onSubmit={submitSignal} className="bg-white border border-stone-200 rounded-xl p-6 grid gap-4 md:grid-cols-4 shadow-sm"><div className="md:col-span-4"><h2 className="font-bold">1. Define a signal candidate</h2><p className="text-sm text-stone-500 mt-1">This is persisted to your research workspace and becomes selectable below.</p></div><input aria-label="Signal name" placeholder="Signal name" value={newSignal.name} onChange={(e) => setNewSignal({ ...newSignal, name: e.target.value })} className="border border-stone-300 rounded-lg p-2" required /><input aria-label="Signal formula" placeholder="Formula, e.g. EMA(20) > EMA(50)" value={newSignal.formula} onChange={(e) => setNewSignal({ ...newSignal, formula: e.target.value })} className="border border-stone-300 rounded-lg p-2 md:col-span-2" required /><button className="rounded-lg border border-orange-600 text-orange-700 px-4 py-2 font-semibold hover:bg-orange-50">Save candidate</button></form>

        <form onSubmit={submit} className="bg-white border border-stone-200 rounded-xl p-6 grid gap-5 md:grid-cols-4 shadow-sm"><div className="md:col-span-4"><h2 className="font-bold">2. Run empirical validation</h2><p className="text-sm text-stone-500 mt-1">The run fetches real OHLCV, applies triple-barrier labels, and persists all output for reproducibility.</p></div><label className="flex flex-col gap-2 text-sm font-semibold">Signal<select value={signalId} onChange={(e) => setSignalId(e.target.value)} className="border border-stone-300 rounded-lg p-2 font-normal" disabled={!signals.length}><option value="">No signals available</option>{signals.map((item) => <option key={item.id} value={item.id}>{item.name} · {item.status || "Candidate"}</option>)}</select></label><label className="flex flex-col gap-2 text-sm font-semibold">Dataset<select value={datasetId} onChange={(e) => setDatasetId(e.target.value)} className="border border-stone-300 rounded-lg p-2 font-normal" disabled={!datasets.length}><option value="">No datasets available</option>{datasets.map((item) => <option key={item.id} value={item.id}>{item.label} · {item.source}</option>)}</select></label><label className="flex flex-col gap-2 text-sm font-semibold">Start date<input type="date" value={dates.start} onChange={(e) => setDates({ ...dates, start: e.target.value })} className="border border-stone-300 rounded-lg p-2 font-normal" /></label><label className="flex flex-col gap-2 text-sm font-semibold">End date<input type="date" value={dates.end} onChange={(e) => setDates({ ...dates, end: e.target.value })} className="border border-stone-300 rounded-lg p-2 font-normal" /></label><button className="md:col-span-4 rounded-lg bg-orange-600 text-white px-4 py-3 font-semibold disabled:opacity-50 hover:bg-orange-700" disabled={busy || !signals.length || !datasets.length}>{busy ? "Starting validation..." : "Run real validation"}</button></form>

        <p className="text-sm text-stone-600 bg-stone-100 rounded-lg px-4 py-3" role="status">{status}</p>

        {selectedRun && <section className="grid gap-4 md:grid-cols-4"><div className="md:col-span-4 flex items-center justify-between"><div><h2 className="font-bold">Selected run</h2><p className="text-xs text-stone-500 font-mono mt-1">{selectedRun.id}</p></div><span className={`rounded-full px-3 py-1 text-xs font-bold ${selectedRun.status === "completed" ? "bg-emerald-100 text-emerald-800" : selectedRun.status === "failed" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"}`}>{selectedRun.status}</span></div>{selectedRun.status !== "completed" && selectedRun.status !== "failed" && <div className="md:col-span-4 bg-white border border-stone-200 rounded-xl p-4"><div className="flex justify-between text-sm"><span>{selectedRun.result?.progress ? selectedRun.result.progress + "%" : "Queued"}</span><span>{selectedRun.result?.stage || "Waiting for worker"}</span></div><div className="h-2 bg-stone-100 rounded-full mt-3 overflow-hidden"><div className="h-full bg-orange-500 transition-all" style={{ width: `${selectedRun.result?.progress || 5}%` }} /></div></div>}{selectedRun.status === "completed" && <>{[["Sharpe ratio", details?.sharpe_ratio?.toFixed(3) ?? "Unavailable"], ["DSR", details?.dsr?.toFixed(3) ?? "Unavailable"], ["PBO", details?.pbo?.toFixed(3) ?? "Unavailable"], ["CPCV paths", details?.n_cpcv_paths ?? "Unavailable"]].map(([label, value]) => <div key={label} className="bg-white border border-stone-200 rounded-xl p-5"><p className="text-xs uppercase tracking-wide text-stone-500">{label}</p><p className="text-2xl font-bold mt-2">{value}</p></div>)}<div className="md:col-span-4 bg-white border border-stone-200 rounded-xl p-5"><p className="text-sm font-semibold">{selectedRun.result?.result?.validation_method}</p><p className="text-sm text-stone-600 mt-2">{details?.mode} · {details?.n_samples} samples · DSR {details?.dsr_status} · PBO {details?.pbo_status}</p><p className="text-xs text-stone-500 mt-3">Data source: {selectedRun.data_source}{selectedRun.data_hash ? ` · reproducibility hash: ${selectedRun.data_hash}` : ""}</p></div></>}</section>}

        <section className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm"><div className="px-5 py-4 border-b border-stone-200 flex justify-between items-center"><div><h2 className="font-bold">Research history</h2><p className="text-sm text-stone-500 mt-1">Every run remains tied to its signal, parameters, status, and data provenance.</p></div><button type="button" onClick={() => void load()} className="text-sm text-orange-700 font-semibold">Refresh</button></div><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-stone-50 text-xs uppercase tracking-wide text-stone-500"><tr><th className="px-5 py-3">Run</th><th className="px-5 py-3">Signal</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Started</th></tr></thead><tbody>{runs.map((run) => <tr key={run.id} onClick={() => setSelectedRunId(run.id)} className={`border-t border-stone-100 cursor-pointer hover:bg-orange-50 ${selectedRun?.id === run.id ? "bg-orange-50" : ""}`}><td className="px-5 py-4 font-mono text-xs">{run.id}</td><td className="px-5 py-4 font-semibold">{run.signal_id}</td><td className="px-5 py-4">{run.status}</td><td className="px-5 py-4 text-stone-600">{new Date(run.started_at).toLocaleString()}</td></tr>)}</tbody></table>{!runs.length && <p className="p-8 text-center text-sm text-stone-500">No persisted runs yet. Save a signal and start your first validation.</p>}</div></section>
      </div>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchResearchRuns } from "../../services/quantApi";

type Run = { id: string; signal_id: string; status: string; data_source?: string; data_hash?: string | null; started_at: string; result?: { result?: { validation_method?: string; validation_details?: { mode?: string; n_samples?: number; n_cpcv_paths?: number; dsr?: number | null; pbo?: number | null } } } | null; error?: string | null };

export default function ReportsPage() {
  const [runs, setRuns] = useState<Run[]>([]);
  const [status, setStatus] = useState("Loading persisted research runs...");

  useEffect(() => {
    void fetchResearchRuns().then((data) => { setRuns(data.runs as unknown as Run[]); setStatus("Reports are generated from persisted validation runs."); }).catch((error) => setStatus(error instanceof Error ? error.message : "Research history unavailable."));
  }, []);

  return (
    <main className="min-h-screen bg-[#f5f5f2] text-stone-900 p-5 md:p-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        <header><Link href="/research" className="text-sm text-orange-700 font-semibold">Back to Research</Link><p className="text-xs uppercase tracking-[0.18em] text-orange-700 font-bold mt-6">Audit & reproducibility</p><h1 className="text-3xl font-bold tracking-tight mt-2">Research reports</h1><p className="text-stone-600 mt-2 max-w-2xl leading-relaxed">A report is only shown when it comes from a persisted run. Review the method, sample size, data source, and reproducibility hash before presenting a result.</p></header>
        <p className="text-sm text-stone-600 bg-stone-100 rounded-lg px-4 py-3" role="status">{status}</p>
        {!runs.length ? <section className="bg-white border border-stone-200 rounded-xl p-8 shadow-sm"><h2 className="font-bold">No reports available</h2><p className="text-sm text-stone-500 mt-2 leading-relaxed">Run a real validation with verified market data to generate the first auditable report. No placeholder report is shown.</p><Link href="/validation" className="inline-block mt-5 rounded-lg bg-orange-600 text-white px-4 py-2 text-sm font-semibold">Open validation workbench</Link></section> : <section className="grid gap-4">{runs.map((run) => { const detail = run.result?.result?.validation_details; return <article key={run.id} className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm"><div className="flex flex-wrap justify-between gap-3"><div><p className="font-mono text-xs text-stone-500">{run.id}</p><h2 className="font-bold mt-1">{run.signal_id}</h2></div><span className={`rounded-full px-3 py-1 text-xs font-bold ${run.status === "completed" ? "bg-emerald-100 text-emerald-800" : run.status === "failed" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"}`}>{run.status}</span></div>{run.status === "completed" && <><p className="text-sm text-stone-600 mt-4">{run.result?.result?.validation_method || "Validation method recorded"}</p><div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">{[["DSR", detail?.dsr], ["PBO", detail?.pbo], ["Samples", detail?.n_samples], ["CPCV paths", detail?.n_cpcv_paths]].map(([label, value]) => <div key={label} className="rounded-lg bg-stone-50 p-3"><p className="text-[10px] uppercase tracking-wide text-stone-500">{label}</p><p className="font-bold mt-1">{value ?? "Unavailable"}</p></div>)}</div></>}<div className="border-t border-stone-100 mt-5 pt-4 text-xs text-stone-500 flex flex-wrap gap-x-5 gap-y-2"><span>Started {new Date(run.started_at).toLocaleString()}</span><span>{run.data_source || "Data source unavailable"}</span><span className="font-mono">Hash: {run.data_hash || "Pending"}</span></div>{run.error && <p className="mt-3 text-sm text-red-700">{run.error}</p>}</article>; })}</section>}
      </div>
    </main>
  );
}

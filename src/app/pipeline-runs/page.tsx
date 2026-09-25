"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Sidebar } from "../../components/sidebar";
import { fetchResearchRuns } from "../../services/quantApi";

export default function PipelineRunsPage() {
  const [runs, setRuns] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadRuns = async () => {
    setLoading(true);
    try {
      const data = await fetchResearchRuns();
      if (data.runs) setRuns(data.runs);
    } catch {
      // Keep empty or fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadRuns();
  }, []);

  return (
    <div className="flex w-full min-h-screen bg-[#f5f5f2] text-stone-900 font-body-sm antialiased">
      <Sidebar />
      <main className="ml-60 flex-1 p-8 max-w-[1500px]">
        <div className="max-w-5xl flex flex-col gap-6">
          <header className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-orange-600 mb-1">
                <Link href="/" className="hover:underline">Dashboard</Link>
                <span>/</span>
                <span className="text-stone-600">Pipeline History</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-stone-900">Pipeline Execution Runs</h1>
              <p className="text-stone-600 mt-1 text-sm">Persisted execution logs across autonomous agent cycles.</p>
            </div>
            <button
              onClick={() => void loadRuns()}
              disabled={loading}
              className="rounded-lg bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 font-semibold text-xs transition-colors cursor-pointer"
            >
              {loading ? "Refreshing..." : "Refresh Runs"}
            </button>
          </header>

          <section className="bg-white border border-[#e5e5df] rounded-xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#f8f8f6] uppercase text-stone-500 font-bold border-b border-[#e5e5df]">
                  <tr>
                    <th className="px-5 py-3">Run ID</th>
                    <th className="px-5 py-3">Strategy / Target</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Execution Mode</th>
                    <th className="px-5 py-3">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5e5df]">
                  {runs.length > 0 ? (
                    runs.map((r) => (
                      <tr key={r.id} className="hover:bg-[#fbfbfa]">
                        <td className="px-5 py-3 font-mono font-bold text-stone-900">{r.id}</td>
                        <td className="px-5 py-3 font-medium text-stone-700">{r.signal_id}</td>
                        <td className="px-5 py-3">
                          <span className="px-2 py-0.5 rounded-full font-mono text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {r.status}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-stone-500">{r.data_source || "Verified NSE"}</td>
                        <td className="px-5 py-3 font-mono text-stone-500">{new Date(r.started_at).toLocaleTimeString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-stone-500">
                        Zero orphan runs detected. Trigger a validation or backtest run to populate the log.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

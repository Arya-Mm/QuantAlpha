"use client";

import Link from "next/link";
import { Sidebar } from "../../components/sidebar";

export default function SettingsPage() {
  return (
    <div className="flex w-full min-h-screen bg-[#f5f5f2] text-stone-900 font-body-sm antialiased">
      <Sidebar />
      <main className="ml-60 flex-1 p-8 max-w-[1500px]">
        <div className="max-w-5xl flex flex-col gap-6">
          <header>
            <div className="flex items-center gap-2 text-xs font-semibold text-orange-600 mb-1">
              <Link href="/" className="hover:underline">Dashboard</Link>
              <span>/</span>
              <span className="text-stone-600">Configuration</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-stone-900">Platform Settings</h1>
            <p className="text-stone-600 mt-1 text-sm">Configure verified data providers, research defaults, and execution safety controls.</p>
          </header>

          <section className="bg-white border border-[#e5e5df] rounded-xl p-6 shadow-xs space-y-4">
            <h2 className="font-bold text-stone-900">Exchange & Kernel Configuration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-[#f8f8f6] rounded-lg border border-[#e5e5df]">
                <div className="font-bold text-stone-800 mb-1">Primary Feed</div>
                <div className="text-stone-600">National Stock Exchange of India (NSE) via Real-Time Ticker Daemon</div>
              </div>
              <div className="p-4 bg-[#f8f8f6] rounded-lg border border-[#e5e5df]">
                <div className="font-bold text-stone-800 mb-1">Validation Engine</div>
                <div className="text-stone-600">FastAPI C++ Quant Engine / Combinatorial Purged Cross-Validation (CPCV)</div>
              </div>
              <div className="p-4 bg-[#f8f8f6] rounded-lg border border-[#e5e5df]">
                <div className="font-bold text-stone-800 mb-1">Turnover Slippage Model</div>
                <div className="text-stone-600">5 bps institutional spread + 0.1% STT & SEBI transaction costs</div>
              </div>
              <div className="p-4 bg-[#f8f8f6] rounded-lg border border-[#e5e5df]">
                <div className="font-bold text-stone-800 mb-1">Statistical Guardrails</div>
                <div className="text-stone-600">Deflated Sharpe Ratio (DSR &ge; 0.95), PBO (&le; 0.15), 5-Day Embargo</div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

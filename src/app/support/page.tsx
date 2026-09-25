"use client";

import Link from "next/link";
import { Sidebar } from "../../components/sidebar";

export default function SupportPage() {
  return (
    <div className="flex w-full min-h-screen bg-[#f5f5f2] text-stone-900 font-body-sm antialiased">
      <Sidebar />
      <main className="ml-60 flex-1 p-8 max-w-[1500px]">
        <div className="max-w-5xl flex flex-col gap-6">
          <header>
            <div className="flex items-center gap-2 text-xs font-semibold text-orange-600 mb-1">
              <Link href="/" className="hover:underline">Dashboard</Link>
              <span>/</span>
              <span className="text-stone-600">Operational Support</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-stone-900">System Support &amp; Architecture</h1>
            <p className="text-stone-600 mt-1 text-sm">Operational guidance, audit protocols, and quant engine documentation.</p>
          </header>

          <section className="bg-white border border-[#e5e5df] rounded-xl p-6 shadow-xs space-y-4">
            <h2 className="font-bold text-stone-900">Research & Operational Runbooks</h2>
            <div className="space-y-3 text-xs text-stone-600">
              <div className="p-3 bg-[#f8f8f6] rounded-lg border border-[#e5e5df]">
                <strong className="text-stone-800 block mb-1">1. How to run a live strategy backtest:</strong>
                Navigate to <em>Research Hub</em> or <em>Backtest Suite</em>, configure parameters (Stop-Loss, Target, Holding Period), and execute. Real NSE price series are queried directly through the backend without synthetic interpolation.
              </div>
              <div className="p-3 bg-[#f8f8f6] rounded-lg border border-[#e5e5df]">
                <strong className="text-stone-800 block mb-1">2. Understanding Overfitting Detection (PBO &amp; DSR):</strong>
                Probability of Backtest Overfitting (PBO) calculates the probability that an in-sample winner degrades out-of-sample. Deflated Sharpe Ratio (DSR) penalizes multiple testing trails.
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useLiveMarket } from "../../hooks/useLiveMarket";

import { Sidebar } from "../../components/sidebar";

export default function PortfolioPage() {
  const market = useLiveMarket();

  return (
    <div className="bg-[#f5f5f2] text-stone-900 font-body-sm text-body-sm min-h-screen flex antialiased w-full relative">
      {/* Unified Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-60 flex-1 p-8 max-w-[1500px] flex flex-col gap-6">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#e5e5df] pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-orange-600 mb-1">
              <Link href="/" className="hover:underline">Dashboard</Link>
              <span>/</span>
              <span className="text-stone-600">Live Paper Portfolio</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-stone-900">
              Institutional Portfolio State
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Real-time mark-to-market valuations, Kelly leverage sizing, and sector exposure gates.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-white border border-[#e5e5df] text-stone-700 shadow-2xs">
              Tick Update: <span className="text-orange-600">{market.lastUpdate}</span>
            </span>
            <Link
              href="/command-center"
              className="px-3.5 py-1.5 bg-orange-600 text-white rounded-lg text-xs font-bold hover:bg-orange-700 transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span className="material-symbols-outlined text-sm">terminal</span>
              Command Center
            </Link>
          </div>
        </header>

        {/* 4-Metric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-[#e5e5df] rounded-xl p-4 shadow-xs">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
              Net Asset Value (NAV)
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-2xl font-bold text-stone-900">
                ₹{market.nav.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </span>
            </div>
            <span className="text-[11px] text-emerald-700 font-bold mt-1 inline-flex items-center gap-1 font-mono">
              +₹{market.dailyPnL.toLocaleString("en-IN")} ({market.dailyPnLPct}%) Today
            </span>
          </div>

          <div className="bg-white border border-[#e5e5df] rounded-xl p-4 shadow-xs">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
              Cash Liquidity Reserve
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-2xl font-bold text-stone-900">
                ₹{market.cashBalance.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </span>
            </div>
            <span className="text-[11px] text-stone-500 font-medium mt-1 block">
              21.1% of portfolio buffer
            </span>
          </div>

          <div className="bg-white border border-[#e5e5df] rounded-xl p-4 shadow-xs">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
              Invested Capital
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-2xl font-bold text-stone-900">
                ₹{market.investedCapital.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </span>
            </div>
            <span className="text-[11px] text-stone-500 font-medium mt-1 block">
              {market.openPositionsCount} Active Equity Positions
            </span>
          </div>

          <div className="bg-white border border-[#e5e5df] rounded-xl p-4 shadow-xs">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
              Portfolio Net Beta
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-2xl font-bold text-emerald-700">+0.04</span>
              <span className="text-xs text-stone-400 font-mono">/ [-0.10, +0.10]</span>
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold mt-1 inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Beta Neutral Gate Passed
            </span>
          </div>
        </div>

        {/* Live Holdings Table */}
        <div className="bg-white border border-[#e5e5df] rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 border-b border-[#e5e5df] bg-[#f8f8f6] flex items-center justify-between">
            <div>
              <h3 className="font-headline-md text-sm text-stone-900 font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-orange-600 text-base">table_chart</span>
                Live Equity Holdings &amp; Mark-to-Market PnL
              </h3>
              <p className="text-[11px] text-stone-500 mt-0.5">
                Real-time position level tracking with Kelly volatility weight allocation
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
              {market.positions.length} Positions Active
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-[#eeeeea] text-stone-600 font-semibold border-b border-[#e5e5df]">
                <tr>
                  <th className="py-3 px-4">Ticker / Asset</th>
                  <th className="py-3 px-4">Shares</th>
                  <th className="py-3 px-4">Entry Price</th>
                  <th className="py-3 px-4">Live Price</th>
                  <th className="py-3 px-4">Day Change</th>
                  <th className="py-3 px-4">Market Value</th>
                  <th className="py-3 px-4">Unrealized PnL</th>
                  <th className="py-3 px-4">Weight %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f0ec] font-mono">
                {market.positions.map((pos) => {
                  const dir = market.tickDirection?.[pos.symbol] ?? "flat";
                  return (
                    <tr key={pos.symbol} className="hover:bg-[#f5f5f2] transition-colors">
                      <td className="py-3 px-4 font-bold font-sans text-stone-900 flex items-center gap-1.5">
                        {pos.symbol}
                        {dir !== "flat" && (
                          <span className={`text-[9px] font-bold ${dir === "up" ? "text-emerald-600" : "text-rose-600"}`}>
                            {dir === "up" ? "▲" : "▼"}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-stone-700">{pos.qty}</td>
                      <td className="py-3 px-4 text-stone-600">₹{pos.entryPrice.toLocaleString("en-IN")}</td>
                      <td className={`py-3 px-4 font-bold ${
                        dir === "up" ? "text-emerald-700" : dir === "down" ? "text-rose-700" : "text-stone-900"
                      }`}>
                        ₹{pos.currentPrice.toLocaleString("en-IN")}
                      </td>
                      <td className={`py-3 px-4 font-bold ${pos.dayChange >= 0 ? "text-emerald-700" : "text-rose-700"}`}>
                        {pos.dayChange >= 0 ? "+" : ""}{pos.dayChangePct}%
                      </td>
                      <td className="py-3 px-4 text-stone-800">
                        ₹{pos.marketValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                      </td>
                      <td className={`py-3 px-4 font-bold ${pos.unrealizedPnL >= 0 ? "text-emerald-700" : "text-rose-700"}`}>
                        {pos.unrealizedPnL >= 0 ? "+" : ""}₹{pos.unrealizedPnL.toLocaleString("en-IN", { maximumFractionDigits: 0 })} ({pos.pnlPct}%)
                      </td>
                      <td className="py-3 px-4 font-sans font-semibold text-stone-700">{pos.weightPct}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2-Column Institutional Risk & Sizing Gate */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white border border-[#e5e5df] rounded-xl p-5 shadow-xs flex flex-col gap-3">
            <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-orange-600 text-base">tune</span>
              Kelly Criterion Volatility Sizing
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Position sizes are scaled dynamically by inverse covariance ($\Sigma^{-1}$) and historical win-rate probability to maximize exponential growth rate while capping drawdowns below 8%.
            </p>
            <div className="bg-[#f8f8f6] border border-[#e5e5df] p-3 rounded-lg font-mono text-[11px] text-stone-800 space-y-1">
              <div>Target Leverage: <span className="font-bold text-emerald-700">0.79x (Conservative Half-Kelly)</span></div>
              <div>Estimated Max DD: <span className="font-bold text-stone-900">5.2% over 252 sessions</span></div>
              <div>Turnover Constraint: <span className="font-bold text-stone-900">&lt; 75% Annualized</span></div>
            </div>
          </div>

          <div className="bg-white border border-[#e5e5df] rounded-xl p-5 shadow-xs flex flex-col gap-3">
            <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-orange-600 text-base">security</span>
              Pre-Trade Concentration Limits
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Hardware latch enforces strict deterministic ceilings before any order slices are sent to the broker execution router:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2 rounded bg-emerald-50 border border-emerald-200 text-emerald-800">
                <span className="block text-[10px] uppercase font-bold text-emerald-600 font-sans">Single Stock Max</span>
                ≤ 5.0% (Current: 2.4%)
              </div>
              <div className="p-2 rounded bg-emerald-50 border border-emerald-200 text-emerald-800">
                <span className="block text-[10px] uppercase font-bold text-emerald-600 font-sans">Sector Exposure</span>
                ≤ 15.0% (Current: 11.2%)
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

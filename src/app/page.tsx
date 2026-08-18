"use client";

import { useState } from "react";
import Link from "next/link";
import { useLiveMarket } from "../hooks/useLiveMarket";

type TimeFrame = "1Y" | "3Y" | "5Y" | "ALL";

export default function OverviewDashboard() {
  const liveMarket = useLiveMarket();
  const [timeframe, setTimeframe] = useState<TimeFrame>("ALL");
  const [isRunningPipeline, setIsRunningPipeline] = useState(false);
  const [pipelineProgress, setPipelineProgress] = useState<string | null>(null);
  const [lastRunTime, setLastRunTime] = useState("8m ago");
  const [pipelineActiveIndex, setPipelineActiveIndex] = useState<number | null>(null);

  // Dynamic metrics per timeframe
  const metricsData = {
    "1Y": {
      annReturn: "+22.4%",
      annVol: "11.8%",
      sharpe: "1.90",
      sortino: "2.84",
      mdd: "-5.2%",
      turnover: "74.2%",
      points: "0,85 15,75 30,68 45,50 60,42 75,30 90,20 100,8",
      benchPoints: "0,85 15,80 30,76 45,70 60,65 75,62 90,58 100,54",
      benchReturn: "+14.2%",
      dsr: "0.98",
    },
    "3Y": {
      annReturn: "+20.1%",
      annVol: "12.4%",
      sharpe: "1.62",
      sortino: "2.40",
      mdd: "-7.1%",
      turnover: "71.0%",
      points: "0,80 15,72 30,60 45,52 60,38 75,32 90,18 100,10",
      benchPoints: "0,80 15,75 30,72 45,65 60,60 75,56 90,52 100,48",
      benchReturn: "+13.1%",
      dsr: "0.97",
    },
    "5Y": {
      annReturn: "+19.2%",
      annVol: "12.9%",
      sharpe: "1.49",
      sortino: "2.22",
      mdd: "-8.0%",
      turnover: "69.5%",
      points: "0,82 15,70 30,64 45,55 60,40 75,28 90,16 100,6",
      benchPoints: "0,82 15,77 30,74 45,68 60,62 75,58 90,54 100,50",
      benchReturn: "+12.8%",
      dsr: "0.96",
    },
    "ALL": {
      annReturn: "+18.7%",
      annVol: "13.2%",
      sharpe: "1.42",
      sortino: "2.11",
      mdd: "-8.3%",
      turnover: "68.4%",
      points: "0,80 10,70 20,65 30,55 40,60 50,45 60,35 70,40 80,25 90,15 100,5",
      benchPoints: "0,80 10,75 20,78 30,70 40,75 50,60 60,65 70,55 80,60 90,50 100,55",
      benchReturn: "+12.4%",
      dsr: "0.97",
    },
  };

  const currentMetrics = metricsData[timeframe];

  const handleRunPipeline = async () => {
    if (isRunningPipeline) return;
    setIsRunningPipeline(true);

    const stages = [
      "1/6: Ingesting NSE Tick & Orderbook Data...",
      "2/6: Extracting Technical & FinBERT Alpha Features...",
      "3/6: Executing Purged K-Fold Cross Validation...",
      "4/6: Running Combinatorial Backtest & TCA Simulation...",
      "5/6: Optimizing Mean-Variance & Kelly Portfolio Weights...",
      "6/6: Compiling Executive Tearsheet Report...",
    ];

    for (let i = 0; i < stages.length; i++) {
      setPipelineActiveIndex(i);
      setPipelineProgress(stages[i]);
      await new Promise((r) => setTimeout(r, 450));
    }

    setPipelineProgress(null);
    setPipelineActiveIndex(null);
    setIsRunningPipeline(false);
    setLastRunTime("Just now");
  };

  return (
    <div className="flex w-full min-h-screen bg-[#f5f5f2] text-stone-900 font-body-sm antialiased">
      {/* SideNavBar */}
      <nav className="w-60 h-full fixed left-0 top-0 border-r border-[#e5e5df] bg-white flex flex-col z-20 shadow-xs">
        <div className="p-6 border-b border-[#e5e5df] flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-orange-500 text-white flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-xl font-bold">
              show_chart
            </span>
          </div>
          <div>
            <h1 className="font-headline-md text-headline-md font-bold tracking-tight text-stone-900">
              QUANT ALPHA
            </h1>
            <p className="font-label-caps text-[10px] text-stone-500 uppercase tracking-wider font-semibold">
              Research Pipeline
            </p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-1">
          <div className="px-6 mb-2 mt-3 font-label-caps text-[11px] font-bold text-stone-400 uppercase tracking-wider">
            RESEARCH
          </div>
          <Link
            className="bg-orange-50 text-orange-600 font-semibold rounded-lg mx-2 px-3 py-2 flex items-center gap-3 border border-orange-200/70 transition-all"
            href="/"
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              dashboard
            </span>
            <span className="font-body-sm text-body-sm font-medium">Overview</span>
          </Link>
          <Link
            className="text-stone-600 hover:text-stone-900 hover:bg-[#eeeeea] transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3"
            href="/research"
          >
            <span className="material-symbols-outlined text-[20px]">science</span>
            <span className="font-body-sm text-body-sm font-medium">Research</span>
          </Link>
          <Link
            className="text-stone-600 hover:text-stone-900 hover:bg-[#eeeeea] transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">database</span>
            <span className="font-body-sm text-body-sm font-medium">Data</span>
          </Link>
          <Link
            className="text-stone-600 hover:text-stone-900 hover:bg-[#eeeeea] transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">analytics</span>
            <span className="font-body-sm text-body-sm font-medium">Signals</span>
          </Link>
          <Link
            className="text-stone-600 hover:text-stone-900 hover:bg-[#eeeeea] transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">rule</span>
            <span className="font-body-sm text-body-sm font-medium">Validation</span>
          </Link>
          <Link
            className="text-stone-600 hover:text-stone-900 hover:bg-[#eeeeea] transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3"
            href="/backtests"
          >
            <span className="material-symbols-outlined text-[20px]">history</span>
            <span className="font-body-sm text-body-sm font-medium">Backtests</span>
          </Link>
          <Link
            className="text-stone-600 hover:text-stone-900 hover:bg-[#eeeeea] transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">account_balance</span>
            <span className="font-body-sm text-body-sm font-medium">Portfolio</span>
          </Link>
          <Link
            className="text-stone-600 hover:text-stone-900 hover:bg-[#eeeeea] transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">description</span>
            <span className="font-body-sm text-body-sm font-medium">Reports</span>
          </Link>
          <Link
            className="text-stone-600 hover:text-stone-900 hover:bg-[#eeeeea] transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3"
            href="/command-center"
          >
            <span className="material-symbols-outlined text-[20px]">monitoring</span>
            <span className="font-body-sm text-body-sm font-medium">Live Monitor</span>
          </Link>
          <div className="px-6 mb-2 mt-5 font-label-caps text-[11px] font-bold text-stone-400 uppercase tracking-wider">
            SYSTEM
          </div>
          <Link
            className="text-stone-600 hover:text-stone-900 hover:bg-[#eeeeea] transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">storage</span>
            <span className="font-body-sm text-body-sm font-medium">Data Sources</span>
          </Link>
          <Link
            className="text-stone-600 hover:text-stone-900 hover:bg-[#eeeeea] transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">precision_manufacturing</span>
            <span className="font-body-sm text-body-sm font-medium">Pipeline Runs</span>
          </Link>
          <Link
            className="text-stone-600 hover:text-stone-900 hover:bg-[#eeeeea] transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
            <span className="font-body-sm text-body-sm font-medium">Settings</span>
          </Link>
        </div>
        <div className="p-4 border-t border-[#e5e5df] bg-[#f8f8f6] mt-auto">
          <div className="bg-white p-3 rounded-lg border border-[#e5e5df] mb-3 shadow-2xs">
            <div className="font-label-caps text-[10px] text-stone-500 uppercase tracking-wider font-semibold mb-1">
              Research Environment
            </div>
            <div className="flex items-center justify-between font-body-sm text-body-sm text-stone-800 font-medium">
              <span>NSE Equities</span>
              <span className="material-symbols-outlined text-sm text-stone-400">
                expand_more
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between font-body-sm text-xs">
              <span className="text-stone-500 font-medium">Status</span>
              <div className="flex items-center gap-1.5 text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Operational
              </div>
            </div>
            <div className="flex items-center justify-between font-body-sm text-xs">
              <span className="text-stone-500 font-medium">Last Run</span>
              <div className="flex items-center gap-1 text-stone-700 font-medium">
                <span>{lastRunTime}</span>
                <span className="material-symbols-outlined text-emerald-600 text-sm">
                  check_circle
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Wrapper */}
      <div className="ml-60 flex-1 flex flex-col min-h-screen relative">
        {/* TopAppBar */}
        <header className="h-16 w-full sticky top-0 z-10 border-b border-[#e5e5df] bg-white/95 backdrop-blur-md flex items-center justify-between px-6 shadow-xs">
          <div className="flex items-center gap-8">
            <div>
              <h2 className="font-headline-md text-headline-md text-stone-900 font-bold tracking-tight">
                Overview
              </h2>
              <p className="font-body-sm text-[12px] text-stone-500">
                Research Dashboard
              </p>
            </div>
            <div className="h-8 w-px bg-[#e5e5df] mx-2"></div>
            <div className="flex gap-6">
              <div>
                <span className="font-label-caps text-[10px] text-stone-500 uppercase tracking-wider font-semibold block mb-0.5">
                  Environment
                </span>
                <div className="flex items-center gap-1 font-body-sm text-body-sm text-stone-800 font-medium cursor-pointer hover:text-orange-600 transition-colors">
                  Research{" "}
                  <span className="material-symbols-outlined text-sm text-stone-400">
                    expand_more
                  </span>
                </div>
              </div>
              <div>
                <span className="font-label-caps text-[10px] text-stone-500 uppercase tracking-wider font-semibold block mb-0.5">
                  Dataset
                </span>
                <div className="flex items-center gap-1 font-body-sm text-body-sm text-stone-800 font-medium cursor-pointer hover:text-orange-600 transition-colors">
                  NSE Equities (India){" "}
                  <span className="material-symbols-outlined text-sm text-stone-400">
                    expand_more
                  </span>
                </div>
              </div>
              <div>
                <span className="font-label-caps text-[10px] text-stone-500 uppercase tracking-wider font-semibold block mb-0.5">
                  Date Range
                </span>
                <div className="flex items-center gap-2 font-body-sm text-body-sm text-stone-800 font-medium cursor-pointer hover:text-orange-600 transition-colors">
                  2015-01-01{" "}
                  <span className="material-symbols-outlined text-xs text-stone-400">
                    arrow_forward
                  </span>{" "}
                  2026-08-18{" "}
                  <span className="material-symbols-outlined text-sm text-orange-600">
                    calendar_today
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Live Market Quick Ticker Header */}
          <div className="hidden xl:flex items-center gap-4 bg-[#f8f8f6] px-3 py-1.5 rounded-lg border border-[#e5e5df]">
            {Object.values(liveMarket.quotes).slice(0, 4).map((q) => (
              <div key={q.symbol} className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-stone-700">{q.symbol}</span>
                <span className="font-mono font-bold text-stone-900">₹{q.price.toLocaleString("en-IN")}</span>
                <span className={`font-mono text-[10px] font-bold px-1 py-0.2 rounded ${q.change >= 0 ? "text-emerald-700 bg-emerald-50" : "text-rose-700 bg-rose-50"}`}>
                  {q.change >= 0 ? "+" : ""}{q.changePct}%
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="font-label-caps text-[10px] text-stone-500 uppercase tracking-wider font-semibold block mb-0.5">
                  {liveMarket.isLiveFeed ? "FastAPI Live Feed" : "System Status"}
                </span>
                <div className="flex items-center justify-end gap-1.5 font-body-sm text-body-sm text-emerald-800 font-semibold text-xs">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  {liveMarket.isLiveFeed ? "LIVE (NSE)" : "Online"}
                </div>
              </div>
              <div className="text-right">
                <span className="font-label-caps text-[10px] text-stone-500 uppercase tracking-wider font-semibold block mb-0.5">
                  Last Tick
                </span>
                <div className="flex items-center justify-end gap-1 font-body-sm text-body-sm text-stone-700 font-medium font-mono text-xs">
                  {liveMarket.lastUpdate}
                </div>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-orange-100 border border-orange-300 flex items-center justify-center font-headline-md text-xs font-bold text-orange-700 shadow-2xs">
              QA
            </div>
          </div>
        </header>

        {/* Main Canvas */}
        <main className="p-6 flex-1 max-w-[1600px] w-full mx-auto flex flex-col gap-6">
          {/* Page Header & Actions */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-headline-xl text-headline-xl text-stone-900 mb-1 tracking-tight font-bold">
                Quant Alpha Research
              </h1>
              <p className="font-body-lg text-body-lg text-stone-600">
                Validated research pipeline for systematic alpha discovery on NSE equities
              </p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleRunPipeline}
                disabled={isRunningPipeline}
                className={`bg-orange-600 hover:bg-orange-700 text-white font-body-sm text-body-sm font-semibold px-4 py-2 hover:shadow-sm transition-all rounded-lg active:scale-98 cursor-pointer flex items-center gap-1.5 shadow-2xs ${isRunningPipeline ? "opacity-75 cursor-not-allowed" : ""}`}
              >
                <span className={`material-symbols-outlined text-sm ${isRunningPipeline ? "animate-spin" : ""}`}>
                  {isRunningPipeline ? "refresh" : "play_arrow"}
                </span>
                {isRunningPipeline ? "Executing..." : "Run Pipeline"}
              </button>
              <Link
                href="/research"
                className="bg-white border border-[#d6d3d1] text-stone-700 font-body-sm text-body-sm font-semibold px-4 py-2 hover:bg-[#eeeeea] hover:text-stone-900 transition-all rounded-lg active:scale-98 cursor-pointer flex items-center gap-1.5 shadow-2xs"
              >
                <span className="material-symbols-outlined text-sm">science</span>
                Research Lab
              </Link>
            </div>
          </div>

          {/* Pipeline Progress Notification Banner */}
          {pipelineProgress && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-center gap-3 shadow-2xs">
              <span className="material-symbols-outlined text-orange-600 animate-spin">refresh</span>
              <div className="flex-1">
                <p className="text-xs font-semibold text-orange-900">{pipelineProgress}</p>
                <div className="w-full bg-orange-200/60 rounded-full h-1 mt-1.5 overflow-hidden">
                  <div className="bg-orange-600 h-1 rounded-full animate-pulse" style={{ width: `${((pipelineActiveIndex ?? 0) + 1) * 16.6}%` }}></div>
                </div>
              </div>
            </div>
          )}

          {/* Pipeline Status Panels */}
          <div className="flex gap-2 items-center overflow-x-auto pb-1">
            {[
              { name: "DATA", detail: "12 datasets", icon: "check_circle", color: "text-emerald-600" },
              { name: "FEATURES", detail: "48 features", icon: "check_circle", color: "text-emerald-600" },
              { name: "VALIDATION", detail: "3 signals pending", icon: "warning", color: "text-amber-600", isWarn: true },
              { name: "BACKTEST", detail: "12 strategies", icon: "check_circle", color: "text-emerald-600" },
              { name: "PORTFOLIO", detail: "6 signals", icon: "check_circle", color: "text-emerald-600" },
              { name: "REPORT", detail: "4 reports", icon: "check_circle", color: "text-emerald-600" },
            ].map((p, idx) => (
              <div key={p.name} className="flex items-center gap-2 flex-1 min-w-[180px]">
                <div className={`card-panel p-4 w-full transition-all border ${
                  pipelineActiveIndex === idx 
                    ? "border-orange-500 bg-orange-50 shadow-xs" 
                    : p.isWarn 
                    ? "border-amber-300 bg-amber-50/40" 
                    : "border-[#e5e5df] bg-white hover:border-orange-300"
                }`}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`material-symbols-outlined text-base ${pipelineActiveIndex === idx ? "text-orange-600 animate-spin" : p.color}`}>
                      {pipelineActiveIndex === idx ? "refresh" : p.icon}
                    </span>
                    <span className="font-label-caps text-xs font-bold text-stone-900 uppercase">
                      {p.name}
                    </span>
                  </div>
                  <div className="font-body-sm text-body-sm text-stone-700 font-medium">
                    {p.detail}
                  </div>
                  <div className="font-label-caps text-[10px] text-stone-400 font-medium mt-0.5">
                    {pipelineActiveIndex === idx ? "Processing..." : "Updated recently"}
                  </div>
                </div>
                {idx < 5 && (
                  <span className="material-symbols-outlined text-stone-300 text-base">
                    arrow_right_alt
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Key Metrics Row */}
          <div className="card-panel p-5 flex justify-between items-center bg-white divide-x divide-[#f0f0ec] tracking-tight shadow-xs">
            <div className="px-4 first:pl-0">
              <div className="metric-label">Validated Signals</div>
              <div className="metric-value text-stone-900">7 / 18</div>
            </div>
            <div className="px-4">
              <div className="metric-label">Best OOS Sharpe</div>
              <div className="metric-value text-emerald-600">{currentMetrics.sharpe}</div>
            </div>
            <div className="px-4">
              <div className="metric-label">Deflated Sharpe</div>
              <div className="metric-value text-emerald-600">{currentMetrics.dsr}</div>
            </div>
            <div className="px-4">
              <div className="metric-label">PBO</div>
              <div className="metric-value text-emerald-600">0.12</div>
            </div>
            <div className="px-4">
              <div className="metric-label">ICIR</div>
              <div className="metric-value text-emerald-600">0.61</div>
            </div>
            <div className="px-4">
              <div className="metric-label">Max Drawdown</div>
              <div className="metric-value text-rose-600">{currentMetrics.mdd}</div>
            </div>
            <div className="px-4">
              <div className="metric-label">Annualized Return</div>
              <div className="metric-value text-orange-600">{currentMetrics.annReturn}</div>
            </div>
            <div className="px-4 last:pr-0">
              <div className="metric-label">Annualized Vol</div>
              <div className="metric-value text-stone-900">{currentMetrics.annVol}</div>
            </div>
          </div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column (Charts) */}
            <div className="col-span-12 xl:col-span-7 flex flex-col gap-6">
              <div className="card-panel flex flex-col h-[400px] bg-white">
                <div className="p-4 border-b border-[#e5e5df] flex items-center justify-between bg-[#f8f8f6]/70">
                  <h3 className="font-headline-md text-headline-md text-stone-900 font-semibold">
                    Cumulative Strategy Return (Net of Costs)
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="flex bg-[#eeeeea] rounded-lg p-0.5 border border-[#e5e5df]">
                      {(["1Y", "3Y", "5Y", "ALL"] as const).map((tf) => (
                        <button
                          key={tf}
                          onClick={() => setTimeframe(tf)}
                          className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer ${
                            timeframe === tf
                              ? "bg-white text-orange-600 shadow-2xs font-bold"
                              : "text-stone-600 hover:text-stone-900"
                          }`}
                        >
                          {tf}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex-1 p-4 relative bg-[#fbfbfa]">
                  <div className="absolute top-4 left-4 flex gap-4 font-body-sm text-body-sm z-10">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-1 bg-orange-600 rounded-full"></span>{" "}
                      <span className="font-semibold text-stone-900">Validated Strategy ({currentMetrics.annReturn})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-1 bg-stone-400 rounded-full"></span>{" "}
                      <span className="text-stone-500 font-medium">Benchmark ({currentMetrics.benchReturn})</span>
                    </div>
                  </div>
                  <div className="w-full h-full border-b border-l border-[#d6d3d1] relative mt-8">
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute inset-0 grid grid-cols-6 divide-x divide-[#e5e5df]/60">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                      <div className="absolute inset-0 flex flex-col justify-between">
                        <div className="w-full h-px bg-[#e5e5df]"></div>
                        <div className="w-full h-px bg-[#e5e5df]"></div>
                        <div className="w-full h-px bg-[#e5e5df]"></div>
                        <div className="w-full h-px bg-[#e5e5df]"></div>
                      </div>
                    </div>
                    <div className="absolute -left-10 top-0 text-[10px] text-stone-400 font-mono">
                      +150%
                    </div>
                    <div className="absolute -left-10 top-[33%] text-[10px] text-stone-400 font-mono">
                      +100%
                    </div>
                    <div className="absolute -left-10 top-[66%] text-[10px] text-stone-400 font-mono">
                      +50%
                    </div>
                    <div className="absolute -left-10 bottom-0 text-[10px] text-stone-400 font-mono">
                      0%
                    </div>
                    <div className="absolute -bottom-6 left-0 text-[10px] text-stone-400 font-mono w-full flex justify-between px-2">
                      <span>{timeframe === "1Y" ? "Q1 2025" : timeframe === "3Y" ? "2023" : "2015"}</span>
                      <span>{timeframe === "1Y" ? "Q2 2025" : timeframe === "3Y" ? "2024" : "2018"}</span>
                      <span>{timeframe === "1Y" ? "Q3 2025" : timeframe === "3Y" ? "2025" : "2021"}</span>
                      <span>{timeframe === "1Y" ? "Q4 2025" : timeframe === "3Y" ? "2026" : "2024"}</span>
                      <span>2026 (Live)</span>
                    </div>
                    <svg
                      className="w-full h-full overflow-visible transition-all duration-300"
                      preserveAspectRatio="none"
                      viewBox="0 0 100 100"
                    >
                      <defs>
                        <linearGradient id="overviewGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#ea580c" stopOpacity="0.18" />
                          <stop offset="70%" stopColor="#f97316" stopOpacity="0.04" />
                          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <polygon
                        points={`${currentMetrics.points} 100,100 0,100`}
                        fill="url(#overviewGrad)"
                      />
                      <polyline
                        fill="none"
                        points={currentMetrics.benchPoints}
                        stroke="#a8a29e"
                        strokeWidth="1.5"
                        strokeDasharray="3,3"
                        vectorEffect="non-scaling-stroke"
                      ></polyline>
                      <polyline
                        fill="none"
                        points={currentMetrics.points}
                        stroke="#ea580c"
                        strokeWidth="2.5"
                        vectorEffect="non-scaling-stroke"
                      ></polyline>
                    </svg>
                  </div>
                </div>
                <div className="p-4 bg-[#f8f8f6] flex justify-between border-t border-[#e5e5df]">
                  <div>
                    <div className="metric-label text-[10px]">Ann. Return</div>
                    <div className="metric-value-sm text-emerald-800 font-bold">{currentMetrics.annReturn}</div>
                  </div>
                  <div>
                    <div className="metric-label text-[10px]">Ann. Volatility</div>
                    <div className="metric-value-sm text-stone-800">{currentMetrics.annVol}</div>
                  </div>
                  <div>
                    <div className="metric-label text-[10px]">Sharpe</div>
                    <div className="metric-value-sm text-orange-600 font-bold">{currentMetrics.sharpe}</div>
                  </div>
                  <div>
                    <div className="metric-label text-[10px]">Sortino</div>
                    <div className="metric-value-sm text-stone-800 font-bold">{currentMetrics.sortino}</div>
                  </div>
                  <div>
                    <div className="metric-label text-[10px]">MDD</div>
                    <div className="metric-value-sm text-rose-800 font-bold">{currentMetrics.mdd}</div>
                  </div>
                  <div>
                    <div className="metric-label text-[10px]">Turnover</div>
                    <div className="metric-value-sm text-stone-800">{currentMetrics.turnover}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (Validation Table) */}
            <div className="col-span-12 xl:col-span-5 flex flex-col gap-6">
              <div className="card-panel flex-1 flex flex-col overflow-hidden bg-white">
                <div className="p-4 border-b border-[#e5e5df] flex justify-between items-center bg-[#f8f8f6]/70">
                  <h3 className="font-headline-md text-headline-md text-stone-900 font-semibold">
                    Validation Status
                  </h3>
                  <Link
                    href="/research"
                    className="text-xs font-semibold text-stone-600 hover:text-orange-600 px-2.5 py-1 rounded-md border border-[#d6d3d1] bg-white shadow-2xs transition-colors"
                  >
                    View All
                  </Link>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <table className="w-full text-left whitespace-nowrap">
                    <thead>
                      <tr className="bg-[#eeeeea] border-b border-[#e5e5df]">
                        <th className="table-header pl-4 py-3">Signal</th>
                        <th className="table-header py-3">Category</th>
                        <th className="table-header py-3">IC</th>
                        <th className="table-header py-3">ICIR</th>
                        <th className="table-header pr-4 py-3">Verdict</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0f0ec] text-xs">
                      <tr className="hover:bg-[#f5f5f2] transition-colors group">
                        <td className="table-cell pl-4 font-semibold text-stone-900">MOM_CROSS_V4</td>
                        <td className="table-cell text-stone-600">Technical</td>
                        <td className="table-cell font-mono text-emerald-700 font-bold">+0.048</td>
                        <td className="table-cell font-mono text-stone-800 font-bold">1.84</td>
                        <td className="table-cell pr-4">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-[10px]">
                            Approved
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-[#f5f5f2] transition-colors group">
                        <td className="table-cell pl-4 font-semibold text-stone-900">SENT_NLP_AGG</td>
                        <td className="table-cell text-stone-600">Sentiment</td>
                        <td className="table-cell font-mono text-emerald-700 font-bold">+0.062</td>
                        <td className="table-cell font-mono text-stone-800 font-bold">2.15</td>
                        <td className="table-cell pr-4">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-[10px]">
                            Approved
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-[#f5f5f2] transition-colors group">
                        <td className="table-cell pl-4 font-semibold text-stone-900">PAIR_COINT_ARB</td>
                        <td className="table-cell text-stone-600">StatArb</td>
                        <td className="table-cell font-mono text-emerald-700 font-bold">+0.051</td>
                        <td className="table-cell font-mono text-stone-800 font-bold">1.92</td>
                        <td className="table-cell pr-4">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-[10px]">
                            Approved
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-[#f5f5f2] transition-colors group">
                        <td className="table-cell pl-4 font-semibold text-stone-900">MACRO_YIELD_CURVE</td>
                        <td className="table-cell text-stone-600">Macro</td>
                        <td className="table-cell font-mono text-stone-600">+0.031</td>
                        <td className="table-cell font-mono text-stone-800 font-bold">1.42</td>
                        <td className="table-cell pr-4">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-[10px]">
                            Approved
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-[#f5f5f2] transition-colors group">
                        <td className="table-cell pl-4 font-semibold text-stone-900">ORDER_BOOK_IMBALANCE</td>
                        <td className="table-cell text-stone-600">Microstructure</td>
                        <td className="table-cell font-mono text-stone-400 font-bold">+0.012</td>
                        <td className="table-cell font-mono text-stone-400">0.45</td>
                        <td className="table-cell pr-4">
                          <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200 font-semibold text-[10px]">
                            FDR Rejected
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Grid Row */}
          <div className="grid grid-cols-12 gap-6 mt-2">
            <div className="col-span-12 card-panel bg-white">
              <div className="p-4 border-b border-[#e5e5df] flex justify-between items-center bg-[#f8f8f6]/70">
                <h3 className="font-headline-md text-headline-md text-stone-900 font-semibold">
                  Recent Pipeline Runs
                </h3>
                <button className="text-xs font-semibold text-stone-600 hover:text-orange-600 px-2.5 py-1 rounded-md border border-[#d6d3d1] bg-white shadow-2xs transition-colors">
                  View All Runs
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left whitespace-nowrap">
                  <thead>
                    <tr>
                      <th className="table-header pl-4 py-3">Run ID</th>
                      <th className="table-header py-3">Type</th>
                      <th className="table-header py-3">Status</th>
                      <th className="table-header py-3">Started At</th>
                      <th className="table-header py-3">Duration</th>
                      <th className="table-header py-3">Signals</th>
                      <th className="table-header pr-4 text-right py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-[#f5f5f2] transition-colors">
                      <td className="table-cell pl-4 font-data-metric-sm text-orange-600 font-mono font-semibold">
                        RUN-2026-08-18-001
                      </td>
                      <td className="table-cell text-stone-600 font-medium">
                        Full Pipeline
                      </td>
                      <td className="table-cell">
                        <div className="flex items-center gap-1 text-emerald-800 font-semibold text-xs">
                          <span className="material-symbols-outlined text-sm">
                            check_circle
                          </span>{" "}
                          Success
                        </div>
                      </td>
                      <td className="table-cell font-data-metric-sm text-stone-500 font-mono">
                        2026-08-18 10:24
                      </td>
                      <td className="table-cell font-data-metric-sm text-stone-500 font-mono">
                        00:14:32
                      </td>
                      <td className="table-cell font-data-metric-sm text-stone-900 font-mono font-semibold">7 / 18</td>
                      <td className="table-cell pr-4 text-right">
                        <button className="text-stone-400 hover:text-orange-600 mr-2 transition-colors">
                          <span className="material-symbols-outlined text-base">
                            bar_chart
                          </span>
                        </button>
                        <button className="text-stone-400 hover:text-orange-600 transition-colors">
                          <span className="material-symbols-outlined text-base">
                            description
                          </span>
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-[#f5f5f2] transition-colors">
                      <td className="table-cell pl-4 font-data-metric-sm text-orange-600 font-mono font-semibold">
                        RUN-2026-08-18-000
                      </td>
                      <td className="table-cell text-stone-600 font-medium">
                        Validation
                      </td>
                      <td className="table-cell">
                        <div className="flex items-center gap-1 text-emerald-800 font-semibold text-xs">
                          <span className="material-symbols-outlined text-sm">
                            check_circle
                          </span>{" "}
                          Success
                        </div>
                      </td>
                      <td className="table-cell font-data-metric-sm text-stone-500 font-mono">
                        2026-08-18 09:58
                      </td>
                      <td className="table-cell font-data-metric-sm text-stone-500 font-mono">
                        00:07:21
                      </td>
                      <td className="table-cell font-data-metric-sm text-stone-900 font-mono font-semibold">18 / 18</td>
                      <td className="table-cell pr-4 text-right">
                        <button className="text-stone-400 hover:text-orange-600 mr-2 transition-colors">
                          <span className="material-symbols-outlined text-base">
                            bar_chart
                          </span>
                        </button>
                        <button className="text-stone-400 hover:text-orange-600 transition-colors">
                          <span className="material-symbols-outlined text-base">
                            description
                          </span>
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-[#f5f5f2] transition-colors bg-amber-50/20">
                      <td className="table-cell pl-4 font-data-metric-sm text-orange-600 font-mono font-semibold">
                        RUN-2026-08-17-002
                      </td>
                      <td className="table-cell text-stone-600 font-medium">
                        Full Pipeline
                      </td>
                      <td className="table-cell">
                        <div className="flex items-center gap-1 text-amber-800 font-semibold text-xs">
                          <span className="material-symbols-outlined text-sm">
                            warning
                          </span>{" "}
                          Warning
                        </div>
                      </td>
                      <td className="table-cell font-data-metric-sm text-stone-500 font-mono">
                        2026-08-17 12:31
                      </td>
                      <td className="table-cell font-data-metric-sm text-stone-500 font-mono">
                        00:16:48
                      </td>
                      <td className="table-cell font-data-metric-sm text-stone-900 font-mono font-semibold">6 / 18</td>
                      <td className="table-cell pr-4 text-right">
                        <button className="text-stone-400 hover:text-orange-600 mr-2 transition-colors">
                          <span className="material-symbols-outlined text-base">
                            bar_chart
                          </span>
                        </button>
                        <button className="text-stone-400 hover:text-orange-600 transition-colors">
                          <span className="material-symbols-outlined text-base">
                            description
                          </span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

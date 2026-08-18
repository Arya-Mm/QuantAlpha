import Link from "next/link";

export default function OverviewDashboard() {
  return (
    <div className="flex w-full min-h-screen bg-slate-50 text-slate-900 font-body-sm antialiased">
      {/* SideNavBar */}
      <nav className="w-60 h-full fixed left-0 top-0 border-r border-slate-200 bg-white flex flex-col z-20 shadow-xs">
        <div className="p-6 border-b border-slate-200 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-orange-500 text-white flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-xl font-bold">
              show_chart
            </span>
          </div>
          <div>
            <h1 className="font-headline-md text-headline-md font-bold tracking-tight text-slate-900">
              QUANT ALPHA
            </h1>
            <p className="font-label-caps text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
              Research Pipeline
            </p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-1">
          <div className="px-6 mb-2 mt-3 font-label-caps text-[11px] font-bold text-slate-400 uppercase tracking-wider">
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
            className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3"
            href="/research"
          >
            <span className="material-symbols-outlined text-[20px]">science</span>
            <span className="font-body-sm text-body-sm font-medium">Research</span>
          </Link>
          <Link
            className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">database</span>
            <span className="font-body-sm text-body-sm font-medium">Data</span>
          </Link>
          <Link
            className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">analytics</span>
            <span className="font-body-sm text-body-sm font-medium">Signals</span>
          </Link>
          <Link
            className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">rule</span>
            <span className="font-body-sm text-body-sm font-medium">Validation</span>
          </Link>
          <Link
            className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3"
            href="/backtests"
          >
            <span className="material-symbols-outlined text-[20px]">history</span>
            <span className="font-body-sm text-body-sm font-medium">Backtests</span>
          </Link>
          <Link
            className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">account_balance</span>
            <span className="font-body-sm text-body-sm font-medium">Portfolio</span>
          </Link>
          <Link
            className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">description</span>
            <span className="font-body-sm text-body-sm font-medium">Reports</span>
          </Link>
          <Link
            className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3"
            href="/command-center"
          >
            <span className="material-symbols-outlined text-[20px]">monitoring</span>
            <span className="font-body-sm text-body-sm font-medium">Live Monitor</span>
          </Link>
          <div className="px-6 mb-2 mt-5 font-label-caps text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            SYSTEM
          </div>
          <Link
            className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">storage</span>
            <span className="font-body-sm text-body-sm font-medium">Data Sources</span>
          </Link>
          <Link
            className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">precision_manufacturing</span>
            <span className="font-body-sm text-body-sm font-medium">Pipeline Runs</span>
          </Link>
          <Link
            className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
            <span className="font-body-sm text-body-sm font-medium">Settings</span>
          </Link>
        </div>
        <div className="p-4 border-t border-slate-200 bg-slate-50 mt-auto">
          <div className="bg-white p-3 rounded-lg border border-slate-200 mb-3 shadow-2xs">
            <div className="font-label-caps text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-1">
              Research Environment
            </div>
            <div className="flex items-center justify-between font-body-sm text-body-sm text-slate-800 font-medium">
              <span>NSE Equities</span>
              <span className="material-symbols-outlined text-sm text-slate-400">
                expand_more
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between font-body-sm text-xs">
              <span className="text-slate-500 font-medium">Status</span>
              <div className="flex items-center gap-1.5 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Operational
              </div>
            </div>
            <div className="flex items-center justify-between font-body-sm text-xs">
              <span className="text-slate-500 font-medium">Last Run</span>
              <div className="flex items-center gap-1 text-slate-700 font-medium">
                <span>8m ago</span>
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
        <header className="h-16 w-full sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur-md flex items-center justify-between px-6 shadow-xs">
          <div className="flex items-center gap-8">
            <div>
              <h2 className="font-headline-md text-headline-md text-slate-900 font-bold tracking-tight">
                Overview
              </h2>
              <p className="font-body-sm text-[12px] text-slate-500">
                Research Dashboard
              </p>
            </div>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <div className="flex gap-6">
              <div>
                <span className="font-label-caps text-[10px] text-slate-500 uppercase tracking-wider font-semibold block mb-0.5">
                  Environment
                </span>
                <div className="flex items-center gap-1 font-body-sm text-body-sm text-slate-800 font-medium cursor-pointer hover:text-orange-600 transition-colors">
                  Research{" "}
                  <span className="material-symbols-outlined text-sm text-slate-400">
                    expand_more
                  </span>
                </div>
              </div>
              <div>
                <span className="font-label-caps text-[10px] text-slate-500 uppercase tracking-wider font-semibold block mb-0.5">
                  Dataset
                </span>
                <div className="flex items-center gap-1 font-body-sm text-body-sm text-slate-800 font-medium cursor-pointer hover:text-orange-600 transition-colors">
                  NSE Equities (India){" "}
                  <span className="material-symbols-outlined text-sm text-slate-400">
                    expand_more
                  </span>
                </div>
              </div>
              <div>
                <span className="font-label-caps text-[10px] text-slate-500 uppercase tracking-wider font-semibold block mb-0.5">
                  Date Range
                </span>
                <div className="flex items-center gap-2 font-body-sm text-body-sm text-slate-800 font-medium cursor-pointer hover:text-orange-600 transition-colors">
                  2015-01-01{" "}
                  <span className="material-symbols-outlined text-xs text-slate-400">
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
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="font-label-caps text-[10px] text-slate-500 uppercase tracking-wider font-semibold block mb-0.5">
                  System Status
                </span>
                <div className="flex items-center justify-end gap-1.5 font-body-sm text-body-sm text-emerald-700 font-semibold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Healthy
                </div>
              </div>
              <div className="text-right">
                <span className="font-label-caps text-[10px] text-slate-500 uppercase tracking-wider font-semibold block mb-0.5">
                  Last Run
                </span>
                <div className="flex items-center justify-end gap-1 font-body-sm text-body-sm text-slate-700 font-medium">
                  8m ago{" "}
                  <span className="material-symbols-outlined text-sm text-emerald-600">
                    check_circle
                  </span>
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
          <div className="flex items-end justify-between">
            <div>
              <h1 className="font-headline-xl text-headline-xl text-slate-900 mb-1 tracking-tight font-bold">
                Quant Alpha Research
              </h1>
              <p className="font-body-lg text-body-lg text-slate-600">
                Validated research pipeline for systematic alpha discovery on NSE equities
              </p>
            </div>
            <div className="flex gap-3">
              <button className="bg-orange-600 hover:bg-orange-700 text-white font-body-sm text-body-sm font-semibold px-4 py-2 hover:shadow-sm transition-all rounded-lg active:scale-98 cursor-pointer flex items-center gap-1.5 shadow-2xs">
                <span className="material-symbols-outlined text-sm">play_arrow</span>
                Run Pipeline
              </button>
              <button className="bg-white border border-slate-300 text-slate-700 font-body-sm text-body-sm font-semibold px-4 py-2 hover:bg-slate-50 hover:text-slate-900 transition-all rounded-lg active:scale-98 cursor-pointer flex items-center gap-1.5 shadow-2xs">
                <span className="material-symbols-outlined text-sm">add</span>
                New Research Run
              </button>
            </div>
          </div>

          {/* Pipeline Status Panels */}
          <div className="flex gap-2 items-center overflow-x-auto pb-1">
            <div className="card-panel p-4 flex-1 min-w-[200px] hover:border-orange-300 transition-colors cursor-pointer bg-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-emerald-600 text-base">
                  check_circle
                </span>
                <span className="font-label-caps text-xs font-bold text-slate-900 uppercase">
                  DATA
                </span>
              </div>
              <div className="font-body-sm text-body-sm text-slate-600 mb-0.5 font-medium">
                12 datasets
              </div>
              <div className="font-label-caps text-[10px] text-slate-400 font-medium">
                Updated 8m ago
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-300 text-base">
              arrow_right_alt
            </span>
            <div className="card-panel p-4 flex-1 min-w-[200px] hover:border-orange-300 transition-colors cursor-pointer bg-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-emerald-600 text-base">
                  check_circle
                </span>
                <span className="font-label-caps text-xs font-bold text-slate-900 uppercase">
                  FEATURES
                </span>
              </div>
              <div className="font-body-sm text-body-sm text-slate-600 mb-0.5 font-medium">
                48 features
              </div>
              <div className="font-label-caps text-[10px] text-slate-400 font-medium">
                Updated 5m ago
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-300 text-base">
              arrow_right_alt
            </span>
            <div className="card-panel p-4 flex-1 min-w-[200px] border-amber-300 bg-amber-50/40 relative overflow-hidden hover:border-amber-400 transition-colors cursor-pointer">
              <div className="relative z-10 flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-amber-600 text-base">
                  warning
                </span>
                <span className="font-label-caps text-xs font-bold text-amber-800 uppercase">
                  VALIDATION
                </span>
              </div>
              <div className="relative z-10 font-body-sm text-body-sm text-amber-900 font-medium mb-0.5">
                3 signals pending
              </div>
              <div className="relative z-10 font-label-caps text-[10px] text-amber-700/70 font-medium">
                Updated 2m ago
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-300 text-base">
              arrow_right_alt
            </span>
            <div className="card-panel p-4 flex-1 min-w-[200px] hover:border-orange-300 transition-colors cursor-pointer bg-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-emerald-600 text-base">
                  check_circle
                </span>
                <span className="font-label-caps text-xs font-bold text-slate-900 uppercase">
                  BACKTEST
                </span>
              </div>
              <div className="font-body-sm text-body-sm text-slate-600 mb-0.5 font-medium">
                12 strategies
              </div>
              <div className="font-label-caps text-[10px] text-slate-400 font-medium">
                Updated 1m ago
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-300 text-base">
              arrow_right_alt
            </span>
            <div className="card-panel p-4 flex-1 min-w-[200px] hover:border-orange-300 transition-colors cursor-pointer bg-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-emerald-600 text-base">
                  check_circle
                </span>
                <span className="font-label-caps text-xs font-bold text-slate-900 uppercase">
                  PORTFOLIO
                </span>
              </div>
              <div className="font-body-sm text-body-sm text-slate-600 mb-0.5 font-medium">
                6 signals
              </div>
              <div className="font-label-caps text-[10px] text-slate-400 font-medium">
                Updated 1m ago
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-300 text-base">
              arrow_right_alt
            </span>
            <div className="card-panel p-4 flex-1 min-w-[200px] hover:border-orange-300 transition-colors cursor-pointer bg-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-emerald-600 text-base">
                  check_circle
                </span>
                <span className="font-label-caps text-xs font-bold text-slate-900 uppercase">
                  REPORT
                </span>
              </div>
              <div className="font-body-sm text-body-sm text-slate-600 mb-0.5 font-medium">
                4 reports
              </div>
              <div className="font-label-caps text-[10px] text-slate-400 font-medium">
                Updated 1m ago
              </div>
            </div>
          </div>

          {/* Key Metrics Row */}
          <div className="card-panel p-5 flex justify-between items-center bg-white divide-x divide-slate-100 tracking-tight shadow-xs">
            <div className="px-4 first:pl-0">
              <div className="metric-label">Validated Signals</div>
              <div className="metric-value text-slate-900">7 / 18</div>
            </div>
            <div className="px-4">
              <div className="metric-label">Best OOS Sharpe</div>
              <div className="metric-value text-emerald-600">1.42</div>
            </div>
            <div className="px-4">
              <div className="metric-label">Deflated Sharpe</div>
              <div className="metric-value text-emerald-600">0.97</div>
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
              <div className="metric-value text-rose-600">-8.3%</div>
            </div>
            <div className="px-4">
              <div className="metric-label">Annualized Return</div>
              <div className="metric-value text-orange-600">18.7%</div>
            </div>
            <div className="px-4 last:pr-0">
              <div className="metric-label">Annualized Vol</div>
              <div className="metric-value text-slate-900">13.2%</div>
            </div>
          </div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column (Charts) */}
            <div className="col-span-12 xl:col-span-7 flex flex-col gap-6">
              <div className="card-panel flex flex-col h-[400px] bg-white">
                <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
                  <h3 className="font-headline-md text-headline-md text-slate-900 font-semibold">
                    Cumulative Strategy Return (Net of Costs)
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="flex bg-slate-200/70 rounded-lg p-0.5">
                      <button className="px-2.5 py-1 text-[11px] font-semibold rounded-md text-slate-600 hover:text-slate-900">
                        1Y
                      </button>
                      <button className="px-2.5 py-1 text-[11px] font-semibold rounded-md text-slate-600 hover:text-slate-900">
                        3Y
                      </button>
                      <button className="px-2.5 py-1 text-[11px] font-semibold rounded-md text-slate-600 hover:text-slate-900">
                        5Y
                      </button>
                      <button className="px-2.5 py-1 text-[11px] font-semibold rounded-md bg-white text-orange-600 shadow-2xs">
                        ALL
                      </button>
                    </div>
                    <button className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                      <span className="material-symbols-outlined text-sm">
                        fullscreen
                      </span>
                    </button>
                  </div>
                </div>
                <div className="flex-1 p-4 relative bg-slate-50/30">
                  <div className="absolute top-4 left-4 flex gap-4 font-body-sm text-body-sm z-10">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-1 bg-orange-600 rounded-full"></span>{" "}
                      <span className="font-semibold text-slate-900">Validated Strategy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-1 bg-slate-400 rounded-full"></span>{" "}
                      <span className="text-slate-500 font-medium">Benchmark (NIFTY 50)</span>
                    </div>
                  </div>
                  <div className="w-full h-full border-b border-l border-slate-300 relative mt-8">
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute inset-0 grid grid-cols-12 divide-x divide-slate-200/60">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                      <div className="absolute inset-0 flex flex-col justify-between">
                        <div className="w-full h-px bg-slate-200"></div>
                        <div className="w-full h-px bg-slate-200"></div>
                        <div className="w-full h-px bg-slate-200"></div>
                        <div className="w-full h-px bg-slate-200"></div>
                        <div className="w-full h-px bg-slate-200"></div>
                      </div>
                    </div>
                    <div className="absolute -left-10 top-0 text-[10px] text-slate-400 font-mono">
                      150%
                    </div>
                    <div className="absolute -left-10 top-[25%] text-[10px] text-slate-400 font-mono">
                      100%
                    </div>
                    <div className="absolute -left-10 top-[50%] text-[10px] text-slate-400 font-mono">
                      50%
                    </div>
                    <div className="absolute -left-10 top-[75%] text-[10px] text-slate-400 font-mono">
                      0%
                    </div>
                    <div className="absolute -left-10 bottom-0 text-[10px] text-slate-400 font-mono">
                      -50%
                    </div>
                    <div className="absolute -bottom-6 left-0 text-[10px] text-slate-400 font-mono w-full flex justify-between px-2">
                      <span>2015</span>
                      <span>2016</span>
                      <span>2017</span>
                      <span>2018</span>
                      <span>2019</span>
                      <span>2020</span>
                      <span>2021</span>
                      <span>2022</span>
                      <span>2023</span>
                      <span>2024</span>
                      <span>2025</span>
                      <span>2026</span>
                    </div>
                    <svg
                      className="w-full h-full overflow-visible"
                      preserveAspectRatio="none"
                      viewBox="0 0 100 100"
                    >
                      <defs>
                        <linearGradient id="strategyGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#ea580c" stopOpacity="0.18" />
                          <stop offset="70%" stopColor="#f97316" stopOpacity="0.04" />
                          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      {/* Area Fill */}
                      <polygon
                        points="0,80 10,70 20,65 30,55 40,60 50,45 60,35 70,40 80,25 90,15 100,5 100,100 0,100"
                        fill="url(#strategyGrad)"
                      />
                      {/* Benchmark Line */}
                      <polyline
                        fill="none"
                        points="0,80 10,75 20,78 30,70 40,75 50,60 60,65 70,55 80,60 90,50 100,55"
                        stroke="#94a3b8"
                        strokeWidth="1.5"
                        strokeDasharray="3,3"
                        vectorEffect="non-scaling-stroke"
                      ></polyline>
                      {/* Strategy Line */}
                      <polyline
                        fill="none"
                        points="0,80 10,70 20,65 30,55 40,60 50,45 60,35 70,40 80,25 90,15 100,5"
                        stroke="#ea580c"
                        strokeWidth="2.5"
                        vectorEffect="non-scaling-stroke"
                      ></polyline>
                    </svg>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 flex justify-between border-t border-slate-200">
                  <div>
                    <div className="metric-label text-[10px]">Ann. Return</div>
                    <div className="metric-value-sm text-emerald-700 font-bold">18.7%</div>
                  </div>
                  <div>
                    <div className="metric-label text-[10px]">
                      Ann. Volatility
                    </div>
                    <div className="metric-value-sm text-slate-800">13.2%</div>
                  </div>
                  <div>
                    <div className="metric-label text-[10px]">Sharpe</div>
                    <div className="metric-value-sm text-orange-600 font-bold">1.42</div>
                  </div>
                  <div>
                    <div className="metric-label text-[10px]">Sortino</div>
                    <div className="metric-value-sm text-slate-800 font-bold">2.11</div>
                  </div>
                  <div>
                    <div className="metric-label text-[10px]">MDD</div>
                    <div className="metric-value-sm text-rose-600 font-bold">-8.3%</div>
                  </div>
                  <div>
                    <div className="metric-label text-[10px]">Turnover</div>
                    <div className="metric-value-sm text-slate-800">68.4%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (Tables) */}
            <div className="col-span-12 xl:col-span-5 flex flex-col gap-6">
              <div className="card-panel flex-1 flex flex-col overflow-hidden bg-white">
                <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
                  <h3 className="font-headline-md text-headline-md text-slate-900 font-semibold">
                    Validation Status
                  </h3>
                  <button className="text-xs font-semibold text-slate-600 hover:text-orange-600 px-2.5 py-1 rounded-md border border-slate-300 bg-white shadow-2xs transition-colors">
                    View All
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <table className="w-full text-left whitespace-nowrap">
                    <thead>
                      <tr>
                        <th className="table-header pl-4 py-3">Signal</th>
                        <th className="table-header py-3">Category</th>
                        <th className="table-header py-3">IC</th>
                        <th className="table-header py-3">ICIR</th>
                        <th className="table-header pr-4 py-3">Verdict</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-slate-50 transition-colors group">
                        <td className="table-cell pl-4 font-semibold text-slate-900">
                          Momentum 21D
                        </td>
                        <td className="table-cell text-slate-500 font-medium">
                          Technical
                        </td>
                        <td className="table-cell font-data-metric-sm font-mono text-slate-800">0.067</td>
                        <td className="table-cell font-data-metric-sm font-mono text-slate-800">0.61</td>
                        <td className="table-cell pr-4">
                          <span className="status-badge-pass">PASS</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="table-cell pl-4 font-semibold text-slate-900">
                          News Sentiment
                        </td>
                        <td className="table-cell text-slate-500 font-medium">
                          Sentiment
                        </td>
                        <td className="table-cell font-data-metric-sm font-mono text-slate-800">0.041</td>
                        <td className="table-cell font-data-metric-sm font-mono text-slate-800">0.38</td>
                        <td className="table-cell pr-4">
                          <span className="status-badge-warn">CONDITIONAL</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="table-cell pl-4 font-semibold text-slate-900">
                          Value Factor
                        </td>
                        <td className="table-cell text-slate-500 font-medium">
                          Fundamental
                        </td>
                        <td className="table-cell font-data-metric-sm font-mono text-slate-800">0.018</td>
                        <td className="table-cell font-data-metric-sm font-mono text-slate-800">0.21</td>
                        <td className="table-cell pr-4">
                          <span className="status-badge-fail">FAIL</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors group">
                        <td className="table-cell pl-4 font-semibold text-slate-900">
                          Earnings Surprise
                        </td>
                        <td className="table-cell text-slate-500 font-medium">
                          Fundamental
                        </td>
                        <td className="table-cell font-data-metric-sm font-mono text-slate-800">0.032</td>
                        <td className="table-cell font-data-metric-sm font-mono text-slate-800">0.31</td>
                        <td className="table-cell pr-4">
                          <span className="status-badge-warn">CONDITIONAL</span>
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
              <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
                <h3 className="font-headline-md text-headline-md text-slate-900 font-semibold">
                  Recent Pipeline Runs
                </h3>
                <button className="text-xs font-semibold text-slate-600 hover:text-orange-600 px-2.5 py-1 rounded-md border border-slate-300 bg-white shadow-2xs transition-colors">
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
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="table-cell pl-4 font-data-metric-sm text-orange-600 font-mono font-semibold">
                        RUN-2026-08-18-001
                      </td>
                      <td className="table-cell text-slate-600 font-medium">
                        Full Pipeline
                      </td>
                      <td className="table-cell">
                        <div className="flex items-center gap-1 text-emerald-700 font-semibold text-xs">
                          <span className="material-symbols-outlined text-sm">
                            check_circle
                          </span>{" "}
                          Success
                        </div>
                      </td>
                      <td className="table-cell font-data-metric-sm text-slate-500 font-mono">
                        2026-08-18 10:24
                      </td>
                      <td className="table-cell font-data-metric-sm text-slate-500 font-mono">
                        00:14:32
                      </td>
                      <td className="table-cell font-data-metric-sm text-slate-900 font-mono font-semibold">7 / 18</td>
                      <td className="table-cell pr-4 text-right">
                        <button className="text-slate-400 hover:text-orange-600 mr-2 transition-colors">
                          <span className="material-symbols-outlined text-base">
                            bar_chart
                          </span>
                        </button>
                        <button className="text-slate-400 hover:text-orange-600 transition-colors">
                          <span className="material-symbols-outlined text-base">
                            description
                          </span>
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="table-cell pl-4 font-data-metric-sm text-orange-600 font-mono font-semibold">
                        RUN-2026-08-18-000
                      </td>
                      <td className="table-cell text-slate-600 font-medium">
                        Validation
                      </td>
                      <td className="table-cell">
                        <div className="flex items-center gap-1 text-emerald-700 font-semibold text-xs">
                          <span className="material-symbols-outlined text-sm">
                            check_circle
                          </span>{" "}
                          Success
                        </div>
                      </td>
                      <td className="table-cell font-data-metric-sm text-slate-500 font-mono">
                        2026-08-18 09:58
                      </td>
                      <td className="table-cell font-data-metric-sm text-slate-500 font-mono">
                        00:07:21
                      </td>
                      <td className="table-cell font-data-metric-sm text-slate-900 font-mono font-semibold">18 / 18</td>
                      <td className="table-cell pr-4 text-right">
                        <button className="text-slate-400 hover:text-orange-600 mr-2 transition-colors">
                          <span className="material-symbols-outlined text-base">
                            bar_chart
                          </span>
                        </button>
                        <button className="text-slate-400 hover:text-orange-600 transition-colors">
                          <span className="material-symbols-outlined text-base">
                            description
                          </span>
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors bg-amber-50/20">
                      <td className="table-cell pl-4 font-data-metric-sm text-orange-600 font-mono font-semibold">
                        RUN-2026-08-17-002
                      </td>
                      <td className="table-cell text-slate-600 font-medium">
                        Full Pipeline
                      </td>
                      <td className="table-cell">
                        <div className="flex items-center gap-1 text-amber-700 font-semibold text-xs">
                          <span className="material-symbols-outlined text-sm">
                            warning
                          </span>{" "}
                          Warning
                        </div>
                      </td>
                      <td className="table-cell font-data-metric-sm text-slate-500 font-mono">
                        2026-08-17 12:31
                      </td>
                      <td className="table-cell font-data-metric-sm text-slate-500 font-mono">
                        00:16:48
                      </td>
                      <td className="table-cell font-data-metric-sm text-slate-900 font-mono font-semibold">6 / 18</td>
                      <td className="table-cell pr-4 text-right">
                        <button className="text-slate-400 hover:text-orange-600 mr-2 transition-colors">
                          <span className="material-symbols-outlined text-base">
                            bar_chart
                          </span>
                        </button>
                        <button className="text-slate-400 hover:text-orange-600 transition-colors">
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

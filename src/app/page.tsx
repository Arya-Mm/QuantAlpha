import Link from "next/link";

export default function OverviewDashboard() {
  return (
    <div className="flex w-full min-h-screen bg-background text-on-surface font-body-sm">
      {/* SideNavBar */}
      <nav className="w-60 h-full fixed left-0 top-0 border-r border-outline-variant bg-surface-container flex flex-col z-20">
        <div className="p-6 border-b border-outline-variant flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-3xl">
            drive_file_rename_outline
          </span>
          <div>
            <h1 className="font-headline-md text-headline-md font-bold tracking-tight text-on-surface">
              QUANT ALPHA
            </h1>
            <p className="font-label-caps text-label-caps text-on-surface-variant">
              Research Pipeline
            </p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-1">
          <div className="px-6 mb-2 mt-4 font-label-caps text-label-caps text-on-surface-variant">
            RESEARCH
          </div>
          <Link
            className="bg-primary-container text-on-primary-container font-semibold rounded-lg mx-2 px-3 py-2 flex items-center gap-3 scale-98 transition-transform"
            href="#"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              dashboard
            </span>
            <span className="font-body-sm text-body-sm">Overview</span>
          </Link>
          <Link
            className="text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3"
            href="/research"
          >
            <span className="material-symbols-outlined">science</span>
            <span className="font-body-sm text-body-sm">Research</span>
          </Link>
          <Link
            className="text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3"
            href="#"
          >
            <span className="material-symbols-outlined">database</span>
            <span className="font-body-sm text-body-sm">Data</span>
          </Link>
          <Link
            className="text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3"
            href="#"
          >
            <span className="material-symbols-outlined">analytics</span>
            <span className="font-body-sm text-body-sm">Signals</span>
          </Link>
          <Link
            className="text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3"
            href="#"
          >
            <span className="material-symbols-outlined">rule</span>
            <span className="font-body-sm text-body-sm">Validation</span>
          </Link>
          <Link
            className="text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3"
            href="/backtests"
          >
            <span className="material-symbols-outlined">history</span>
            <span className="font-body-sm text-body-sm">Backtests</span>
          </Link>
          <Link
            className="text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3"
            href="#"
          >
            <span className="material-symbols-outlined">account_balance</span>
            <span className="font-body-sm text-body-sm">Portfolio</span>
          </Link>
          <Link
            className="text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3"
            href="#"
          >
            <span className="material-symbols-outlined">description</span>
            <span className="font-body-sm text-body-sm">Reports</span>
          </Link>
          <Link
            className="text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3"
            href="/command-center"
          >
            <span className="material-symbols-outlined">monitoring</span>
            <span className="font-body-sm text-body-sm">Live Monitor</span>
          </Link>
          <div className="px-6 mb-2 mt-6 font-label-caps text-label-caps text-on-surface-variant">
            SYSTEM
          </div>
          <Link
            className="text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3"
            href="#"
          >
            <span className="material-symbols-outlined">storage</span>
            <span className="font-body-sm text-body-sm">Data Sources</span>
          </Link>
          <Link
            className="text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3"
            href="#"
          >
            <span className="material-symbols-outlined">precision_manufacturing</span>
            <span className="font-body-sm text-body-sm">Pipeline Runs</span>
          </Link>
          <Link
            className="text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3"
            href="#"
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="font-body-sm text-body-sm">Settings</span>
          </Link>
        </div>
        <div className="p-4 border-t border-outline-variant bg-surface-container-low mt-auto">
          <div className="bg-surface p-3 rounded border border-outline-variant mb-4">
            <div className="font-label-caps text-label-caps text-on-surface-variant mb-2">
              Research Environment
            </div>
            <div className="flex items-center justify-between font-body-sm text-body-sm">
              <span className="">Research</span>
              <span className="material-symbols-outlined text-sm">
                expand_more
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <div className="font-label-caps text-label-caps text-on-surface-variant mb-1">
                System Status
              </div>
              <div className="flex items-center gap-2 text-green-400 font-body-sm text-body-sm">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                All Systems Operational
              </div>
            </div>
            <div>
              <div className="font-label-caps text-label-caps text-on-surface-variant mb-1">
                Last Pipeline Run
              </div>
              <div className="flex items-center justify-between font-body-sm text-body-sm">
                <span className="">8m ago</span>
                <span className="material-symbols-outlined text-green-400 text-sm">
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
        <header className="h-16 w-full sticky top-0 z-10 border-b border-outline-variant bg-[#0a0f12]/90 backdrop-blur-md flex items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface">
                Overview
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Research Dashboard
              </p>
            </div>
            <div className="h-8 w-px bg-outline-variant mx-2"></div>
            <div className="flex gap-6">
              <div>
                <span className="font-label-caps text-label-caps text-on-surface-variant block mb-0.5">
                  Environment
                </span>
                <div className="flex items-center gap-1 font-body-sm text-body-sm cursor-pointer hover:text-primary transition-colors">
                  Research{" "}
                  <span className="material-symbols-outlined text-sm">
                    expand_more
                  </span>
                </div>
              </div>
              <div>
                <span className="font-label-caps text-label-caps text-on-surface-variant block mb-0.5">
                  Dataset
                </span>
                <div className="flex items-center gap-1 font-body-sm text-body-sm cursor-pointer hover:text-primary transition-colors">
                  US Equities{" "}
                  <span className="material-symbols-outlined text-sm">
                    expand_more
                  </span>
                </div>
              </div>
              <div>
                <span className="font-label-caps text-label-caps text-on-surface-variant block mb-0.5">
                  Date Range
                </span>
                <div className="flex items-center gap-2 font-body-sm text-body-sm cursor-pointer hover:text-primary transition-colors">
                  2015-01-01{" "}
                  <span className="material-symbols-outlined text-sm text-on-surface-variant">
                    arrow_forward
                  </span>{" "}
                  2026-08-18{" "}
                  <span className="material-symbols-outlined text-sm">
                    calendar_today
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="font-label-caps text-label-caps text-on-surface-variant block mb-0.5">
                  System Status
                </span>
                <div className="flex items-center justify-end gap-1 font-body-sm text-body-sm text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>{" "}
                  Healthy
                </div>
              </div>
              <div className="text-right">
                <span className="font-label-caps text-label-caps text-on-surface-variant block mb-0.5">
                  Last Run
                </span>
                <div className="flex items-center justify-end gap-1 font-body-sm text-body-sm">
                  8m ago{" "}
                  <span className="material-symbols-outlined text-sm text-green-400">
                    check_circle
                  </span>
                </div>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center font-headline-md text-headline-md text-on-surface">
              AK
            </div>
          </div>
        </header>

        {/* Main Canvas */}
        <main className="p-6 flex-1 max-w-[1600px] w-full mx-auto flex flex-col gap-6">
          {/* Page Header & Actions */}
          <div className="flex items-end justify-between">
            <div>
              <h1 className="font-headline-xl text-headline-xl text-on-surface mb-2">
                Quant Alpha Research
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Validated research pipeline for systematic alpha discovery
              </p>
            </div>
            <div className="flex gap-3">
              <button className="bg-primary text-on-primary font-body-sm text-body-sm font-semibold px-4 py-2 hover:opacity-90 transition-opacity rounded-lg">
                Run Pipeline
              </button>
              <button className="bg-transparent border border-outline-variant text-on-surface font-body-sm text-body-sm font-semibold px-4 py-2 hover:bg-surface-variant transition-colors rounded-lg">
                New Research Run
              </button>
            </div>
          </div>

          {/* Pipeline Status Panels */}
          <div className="flex gap-2 items-center overflow-x-auto pb-2">
            <div className="card-panel p-4 flex-1 min-w-[200px] hover:border-primary/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-green-400 text-sm">
                  check_circle
                </span>
                <span className="font-label-caps text-label-caps text-on-surface">
                  DATA
                </span>
              </div>
              <div className="font-body-sm text-body-sm text-on-surface-variant mb-1">
                12 datasets
              </div>
              <div className="font-label-caps text-label-caps text-on-surface-variant opacity-70">
                Updated 8m ago
              </div>
            </div>
            <span className="material-symbols-outlined text-outline-variant">
              arrow_right_alt
            </span>
            <div className="card-panel p-4 flex-1 min-w-[200px] hover:border-primary/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-green-400 text-sm">
                  check_circle
                </span>
                <span className="font-label-caps text-label-caps text-on-surface">
                  FEATURES
                </span>
              </div>
              <div className="font-body-sm text-body-sm text-on-surface-variant mb-1">
                48 features
              </div>
              <div className="font-label-caps text-label-caps text-on-surface-variant opacity-70">
                Updated 5m ago
              </div>
            </div>
            <span className="material-symbols-outlined text-outline-variant">
              arrow_right_alt
            </span>
            <div className="card-panel p-4 flex-1 min-w-[200px] border-yellow-500/30 bg-[#1B2735]/80 relative overflow-hidden hover:border-primary/50 transition-colors cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-transparent"></div>
              <div className="relative z-10 flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-yellow-500 text-sm">
                  warning
                </span>
                <span className="font-label-caps text-label-caps text-yellow-500">
                  VALIDATION
                </span>
              </div>
              <div className="relative z-10 font-body-sm text-body-sm text-on-surface-variant mb-1">
                3 signals pending
              </div>
              <div className="relative z-10 font-label-caps text-label-caps text-on-surface-variant opacity-70">
                Updated 2m ago
              </div>
            </div>
            <span className="material-symbols-outlined text-outline-variant">
              arrow_right_alt
            </span>
            <div className="card-panel p-4 flex-1 min-w-[200px] hover:border-primary/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-green-400 text-sm">
                  check_circle
                </span>
                <span className="font-label-caps text-label-caps text-on-surface">
                  BACKTEST
                </span>
              </div>
              <div className="font-body-sm text-body-sm text-on-surface-variant mb-1">
                12 strategies
              </div>
              <div className="font-label-caps text-label-caps text-on-surface-variant opacity-70">
                Updated 1m ago
              </div>
            </div>
            <span className="material-symbols-outlined text-outline-variant">
              arrow_right_alt
            </span>
            <div className="card-panel p-4 flex-1 min-w-[200px] hover:border-primary/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-green-400 text-sm">
                  check_circle
                </span>
                <span className="font-label-caps text-label-caps text-on-surface">
                  PORTFOLIO
                </span>
              </div>
              <div className="font-body-sm text-body-sm text-on-surface-variant mb-1">
                6 signals
              </div>
              <div className="font-label-caps text-label-caps text-on-surface-variant opacity-70">
                Updated 1m ago
              </div>
            </div>
            <span className="material-symbols-outlined text-outline-variant">
              arrow_right_alt
            </span>
            <div className="card-panel p-4 flex-1 min-w-[200px] hover:border-primary/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-green-400 text-sm">
                  check_circle
                </span>
                <span className="font-label-caps text-label-caps text-on-surface">
                  REPORT
                </span>
              </div>
              <div className="font-body-sm text-body-sm text-on-surface-variant mb-1">
                4 reports
              </div>
              <div className="font-label-caps text-label-caps text-on-surface-variant opacity-70">
                Updated 1m ago
              </div>
            </div>
          </div>

          {/* Key Metrics Row */}
          <div className="card-panel p-6 flex justify-between items-center bg-surface-container-low divide-x divide-outline-variant tracking-tight shadow-lg shadow-black/20">
            <div className="px-4 first:pl-0">
              <div className="metric-label">Validated Signals</div>
              <div className="metric-value">7 / 18</div>
            </div>
            <div className="px-4">
              <div className="metric-label">Best OOS Sharpe</div>
              <div className="metric-value text-green-400">1.42</div>
            </div>
            <div className="px-4">
              <div className="metric-label">Deflated Sharpe</div>
              <div className="metric-value text-green-400">0.97</div>
            </div>
            <div className="px-4">
              <div className="metric-label">PBO</div>
              <div className="metric-value text-green-400">0.12</div>
            </div>
            <div className="px-4">
              <div className="metric-label">ICIR</div>
              <div className="metric-value text-green-400">0.61</div>
            </div>
            <div className="px-4">
              <div className="metric-label">Max Drawdown</div>
              <div className="metric-value text-red-400">-8.3%</div>
            </div>
            <div className="px-4">
              <div className="metric-label">Annualized Return</div>
              <div className="metric-value text-green-400">18.7%</div>
            </div>
            <div className="px-4 last:pr-0">
              <div className="metric-label">Annualized Vol</div>
              <div className="metric-value">13.2%</div>
            </div>
          </div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column (Charts) */}
            <div className="col-span-12 xl:col-span-7 flex flex-col gap-6">
              <div className="card-panel flex flex-col h-[400px]">
                <div className="p-4 border-b border-outline-variant flex items-center justify-between">
                  <h3 className="font-headline-md text-headline-md">
                    Cumulative Strategy Return (Net of Costs)
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="flex bg-surface-variant rounded p-0.5">
                      <button className="px-2 py-1 text-[11px] font-bold rounded text-on-surface-variant hover:text-on-surface">
                        1Y
                      </button>
                      <button className="px-2 py-1 text-[11px] font-bold rounded text-on-surface-variant hover:text-on-surface">
                        3Y
                      </button>
                      <button className="px-2 py-1 text-[11px] font-bold rounded text-on-surface-variant hover:text-on-surface">
                        5Y
                      </button>
                      <button className="px-2 py-1 text-[11px] font-bold rounded bg-primary/20 text-primary">
                        ALL
                      </button>
                    </div>
                    <button className="p-1 rounded text-on-surface-variant hover:bg-surface-variant">
                      <span className="material-symbols-outlined text-sm">
                        fullscreen
                      </span>
                    </button>
                  </div>
                </div>
                <div className="flex-1 p-4 relative bg-surface-container-lowest">
                  <div className="absolute top-4 left-4 flex gap-4 font-body-sm text-body-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-1 bg-primary rounded"></span>{" "}
                      Strategy
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-1 bg-outline-variant rounded"></span>{" "}
                      Benchmark (SPY)
                    </div>
                  </div>
                  <div className="w-full h-full border-b border-l border-outline-variant relative mt-8">
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute inset-0 grid grid-cols-12 divide-x divide-outline-variant/10">
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
                        <div className="w-full h-px bg-outline-variant/10"></div>
                        <div className="w-full h-px bg-outline-variant/10"></div>
                        <div className="w-full h-px bg-outline-variant/10"></div>
                        <div className="w-full h-px bg-outline-variant/10"></div>
                        <div className="w-full h-px bg-outline-variant/10"></div>
                      </div>
                    </div>
                    <div className="absolute -left-10 top-0 text-[10px] text-on-surface-variant">
                      150%
                    </div>
                    <div className="absolute -left-10 top-[25%] text-[10px] text-on-surface-variant">
                      100%
                    </div>
                    <div className="absolute -left-10 top-[50%] text-[10px] text-on-surface-variant">
                      50%
                    </div>
                    <div className="absolute -left-10 top-[75%] text-[10px] text-on-surface-variant">
                      0%
                    </div>
                    <div className="absolute -left-10 bottom-0 text-[10px] text-on-surface-variant">
                      -50%
                    </div>
                    <div className="absolute -bottom-6 left-0 text-[10px] text-on-surface-variant w-full flex justify-between px-2">
                      <span className="">2015</span>
                      <span className="">2016</span>
                      <span className="">2017</span>
                      <span className="">2018</span>
                      <span className="">2019</span>
                      <span className="">2020</span>
                      <span className="">2021</span>
                      <span className="">2022</span>
                      <span className="">2023</span>
                      <span className="">2024</span>
                      <span className="">2025</span>
                      <span className="">2026</span>
                    </div>
                    <svg
                      className="w-full h-full"
                      preserveAspectRatio="none"
                      viewBox="0 0 100 100"
                    >
                      <polyline
                        fill="none"
                        points="0,80 10,75 20,78 30,70 40,75 50,60 60,65 70,55 80,60 90,50 100,55"
                        stroke="#3e484f"
                        strokeWidth="1"
                        vectorEffect="non-scaling-stroke"
                      ></polyline>
                      <polyline
                        fill="none"
                        points="0,80 10,70 20,65 30,55 40,60 50,45 60,35 70,40 80,25 90,15 100,5"
                        stroke="#8ed5ff"
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                      ></polyline>
                    </svg>
                  </div>
                </div>
                <div className="p-4 bg-surface-container flex justify-between border-t border-outline-variant">
                  <div>
                    <div className="metric-label text-[10px]">Ann. Return</div>
                    <div className="metric-value-sm text-green-400">18.7%</div>
                  </div>
                  <div>
                    <div className="metric-label text-[10px]">
                      Ann. Volatility
                    </div>
                    <div className="metric-value-sm">13.2%</div>
                  </div>
                  <div>
                    <div className="metric-label text-[10px]">Sharpe</div>
                    <div className="metric-value-sm">1.42</div>
                  </div>
                  <div>
                    <div className="metric-label text-[10px]">Sortino</div>
                    <div className="metric-value-sm">2.11</div>
                  </div>
                  <div>
                    <div className="metric-label text-[10px]">MDD</div>
                    <div className="metric-value-sm text-red-400">-8.3%</div>
                  </div>
                  <div>
                    <div className="metric-label text-[10px]">Turnover</div>
                    <div className="metric-value-sm">68.4%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (Tables) */}
            <div className="col-span-12 xl:col-span-5 flex flex-col gap-6">
              <div className="card-panel flex-1 flex flex-col overflow-hidden">
                <div className="p-4 border-b border-outline-variant flex justify-between items-center">
                  <h3 className="font-headline-md text-headline-md">
                    Validation Status
                  </h3>
                  <button className="text-xs font-bold text-on-surface-variant hover:text-primary px-2 py-1 rounded border border-outline-variant">
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
                      <tr className="hover:bg-surface-variant transition-colors group">
                        <td className="table-cell pl-4 font-medium text-on-surface">
                          Momentum 21D
                        </td>
                        <td className="table-cell text-on-surface-variant">
                          Technical
                        </td>
                        <td className="table-cell font-data-metric-sm">0.067</td>
                        <td className="table-cell font-data-metric-sm">0.61</td>
                        <td className="table-cell pr-4">
                          <span className="status-badge-pass">PASS</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-surface-variant transition-colors">
                        <td className="table-cell pl-4 font-medium text-on-surface">
                          News Sentiment
                        </td>
                        <td className="table-cell text-on-surface-variant">
                          Sentiment
                        </td>
                        <td className="table-cell font-data-metric-sm">0.041</td>
                        <td className="table-cell font-data-metric-sm">0.38</td>
                        <td className="table-cell pr-4">
                          <span className="status-badge-warn">CONDITIONAL</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-surface-variant transition-colors">
                        <td className="table-cell pl-4 font-medium text-on-surface">
                          Value Factor
                        </td>
                        <td className="table-cell text-on-surface-variant">
                          Fundamental
                        </td>
                        <td className="table-cell font-data-metric-sm">0.018</td>
                        <td className="table-cell font-data-metric-sm">0.21</td>
                        <td className="table-cell pr-4">
                          <span className="status-badge-fail">FAIL</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-surface-variant transition-colors group">
                        <td className="table-cell pl-4 font-medium text-on-surface">
                          Earnings Surprise
                        </td>
                        <td className="table-cell text-on-surface-variant">
                          Fundamental
                        </td>
                        <td className="table-cell font-data-metric-sm">0.032</td>
                        <td className="table-cell font-data-metric-sm">0.31</td>
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
          <div className="grid grid-cols-12 gap-6 mt-6">
            <div className="col-span-12 card-panel">
              <div className="p-4 border-b border-outline-variant flex justify-between items-center">
                <h3 className="font-headline-md text-headline-md">
                  Recent Pipeline Runs
                </h3>
                <button className="text-xs font-bold text-on-surface-variant hover:text-primary px-2 py-1 rounded border border-outline-variant">
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
                    <tr className="hover:bg-surface-variant transition-colors">
                      <td className="table-cell pl-4 font-data-metric-sm text-primary">
                        RUN-2026-08-18-001
                      </td>
                      <td className="table-cell text-on-surface-variant">
                        Full Pipeline
                      </td>
                      <td className="table-cell">
                        <div className="flex items-center gap-1 text-green-400 text-xs">
                          <span className="material-symbols-outlined text-sm">
                            check_circle
                          </span>{" "}
                          Success
                        </div>
                      </td>
                      <td className="table-cell font-data-metric-sm text-on-surface-variant">
                        2026-08-18 10:24
                      </td>
                      <td className="table-cell font-data-metric-sm text-on-surface-variant">
                        00:14:32
                      </td>
                      <td className="table-cell font-data-metric-sm">7 / 18</td>
                      <td className="table-cell pr-4 text-right">
                        <button className="text-on-surface-variant hover:text-primary mr-2">
                          <span className="material-symbols-outlined text-sm">
                            bar_chart
                          </span>
                        </button>
                        <button className="text-on-surface-variant hover:text-primary">
                          <span className="material-symbols-outlined text-sm">
                            description
                          </span>
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-variant transition-colors">
                      <td className="table-cell pl-4 font-data-metric-sm text-primary">
                        RUN-2026-08-18-000
                      </td>
                      <td className="table-cell text-on-surface-variant">
                        Validation
                      </td>
                      <td className="table-cell">
                        <div className="flex items-center gap-1 text-green-400 text-xs">
                          <span className="material-symbols-outlined text-sm">
                            check_circle
                          </span>{" "}
                          Success
                        </div>
                      </td>
                      <td className="table-cell font-data-metric-sm text-on-surface-variant">
                        2026-08-18 09:58
                      </td>
                      <td className="table-cell font-data-metric-sm text-on-surface-variant">
                        00:07:21
                      </td>
                      <td className="table-cell font-data-metric-sm">18 / 18</td>
                      <td className="table-cell pr-4 text-right">
                        <button className="text-on-surface-variant hover:text-primary mr-2">
                          <span className="material-symbols-outlined text-sm">
                            bar_chart
                          </span>
                        </button>
                        <button className="text-on-surface-variant hover:text-primary">
                          <span className="material-symbols-outlined text-sm">
                            description
                          </span>
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-variant transition-colors bg-yellow-500/5">
                      <td className="table-cell pl-4 font-data-metric-sm text-primary">
                        RUN-2026-08-17-002
                      </td>
                      <td className="table-cell text-on-surface-variant">
                        Full Pipeline
                      </td>
                      <td className="table-cell">
                        <div className="flex items-center gap-1 text-yellow-500 text-xs">
                          <span className="material-symbols-outlined text-sm">
                            warning
                          </span>{" "}
                          Warning
                        </div>
                      </td>
                      <td className="table-cell font-data-metric-sm text-on-surface-variant">
                        2026-08-17 12:31
                      </td>
                      <td className="table-cell font-data-metric-sm text-on-surface-variant">
                        00:16:48
                      </td>
                      <td className="table-cell font-data-metric-sm">6 / 18</td>
                      <td className="table-cell pr-4 text-right">
                        <button className="text-on-surface-variant hover:text-primary mr-2">
                          <span className="material-symbols-outlined text-sm">
                            bar_chart
                          </span>
                        </button>
                        <button className="text-on-surface-variant hover:text-primary">
                          <span className="material-symbols-outlined text-sm">
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

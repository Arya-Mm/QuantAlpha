import Link from "next/link";

export default function CommandCenter() {
  return (
    <div className="flex w-full min-h-screen bg-slate-50 text-slate-900 font-body-sm h-screen overflow-hidden antialiased">
      {/* SideNavBar */}
      <aside className="w-60 h-full fixed left-0 top-0 border-r border-slate-200 bg-white flex flex-col z-20 shadow-xs">
        <div className="px-6 py-6 border-b border-slate-200 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center text-white shadow-2xs">
            <span className="material-symbols-outlined text-[20px]">
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
        
        <div className="flex flex-col gap-1 py-4 flex-1 overflow-y-auto px-2">
          <div className="px-4 pb-2 pt-1 font-label-caps text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Research
          </div>
          <Link
            className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors rounded-lg px-3 py-2 flex items-center gap-3"
            href="/"
          >
            <span className="material-symbols-outlined text-[20px]">
              dashboard
            </span>
            <span className="font-body-sm text-body-sm font-medium">Overview</span>
          </Link>
          <Link
            className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors rounded-lg px-3 py-2 flex items-center gap-3"
            href="/research"
          >
            <span className="material-symbols-outlined text-[20px]">
              science
            </span>
            <span className="font-body-sm text-body-sm font-medium">Research</span>
          </Link>
          <Link
            className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors rounded-lg px-3 py-2 flex items-center gap-3"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">
              database
            </span>
            <span className="font-body-sm text-body-sm font-medium">Data</span>
          </Link>
          <Link
            className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors rounded-lg px-3 py-2 flex items-center gap-3"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">
              analytics
            </span>
            <span className="font-body-sm text-body-sm font-medium">Signals</span>
          </Link>
          <Link
            className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors rounded-lg px-3 py-2 flex items-center gap-3"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">
              rule
            </span>
            <span className="font-body-sm text-body-sm font-medium">Validation</span>
          </Link>
          <Link
            className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors rounded-lg px-3 py-2 flex items-center gap-3"
            href="/backtests"
          >
            <span className="material-symbols-outlined text-[20px]">
              history
            </span>
            <span className="font-body-sm text-body-sm font-medium">Backtests</span>
          </Link>
          <Link
            className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors rounded-lg px-3 py-2 flex items-center gap-3"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">
              account_balance
            </span>
            <span className="font-body-sm text-body-sm font-medium">Portfolio</span>
          </Link>
          <Link
            className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors rounded-lg px-3 py-2 flex items-center gap-3"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">
              description
            </span>
            <span className="font-body-sm text-body-sm font-medium">Reports</span>
          </Link>

          <Link
            className="bg-orange-50 text-orange-600 font-semibold rounded-lg px-3 py-2 flex items-center gap-3 border border-orange-200/70 transition-all"
            href="/command-center"
          >
            <span className="material-symbols-outlined text-[20px]">
              monitoring
            </span>
            <span className="font-body-sm text-body-sm font-semibold">Live Monitor</span>
          </Link>

          <div className="px-4 pb-2 pt-5 font-label-caps text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            System
          </div>
          <Link
            className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors rounded-lg px-3 py-2 flex items-center gap-3"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">
              storage
            </span>
            <span className="font-body-sm text-body-sm font-medium">Data Sources</span>
          </Link>
          <Link
            className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors rounded-lg px-3 py-2 flex items-center gap-3"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">
              precision_manufacturing
            </span>
            <span className="font-body-sm text-body-sm font-medium">Pipeline Runs</span>
          </Link>
          <Link
            className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors rounded-lg px-3 py-2 flex items-center gap-3"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">
              settings
            </span>
            <span className="font-body-sm text-body-sm font-medium">Settings</span>
          </Link>
        </div>

        <div className="px-4 py-4 border-t border-slate-200 bg-slate-50 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="font-body-sm text-xs font-semibold text-slate-800">
                System Status
              </span>
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              Autonomy Active
            </span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Last Heartbeat</span>
            <span className="font-mono text-slate-700">
              2s ago
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-60 flex-1 flex flex-col h-full bg-slate-50">
        {/* TopAppBar */}
        <header className="h-16 w-full sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur-md flex items-center justify-between px-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="font-headline-md text-headline-md font-bold text-slate-900">
                Research Dashboard
              </span>
              <span className="font-label-caps text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                Autonomous Command Center
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <div className="flex flex-col">
              <span className="font-label-caps text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                Environment
              </span>
              <button className="flex items-center gap-1 font-body-sm text-body-sm text-slate-800 font-medium hover:text-orange-600 transition-colors">
                Research{" "}
                <span className="material-symbols-outlined text-[16px] text-slate-400">
                  expand_more
                </span>
              </button>
            </div>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex flex-col">
              <span className="font-label-caps text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                Dataset
              </span>
              <button className="flex items-center gap-1 font-body-sm text-body-sm text-slate-800 font-medium hover:text-orange-600 transition-colors">
                NSE Equities{" "}
                <span className="material-symbols-outlined text-[16px] text-slate-400">
                  expand_more
                </span>
              </button>
            </div>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex flex-col">
              <span className="font-label-caps text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                Date Range
              </span>
              <button className="flex items-center gap-2 font-data-metric-sm text-data-metric-sm font-mono text-slate-800 font-medium hover:text-orange-600 transition-colors">
                2015-01-01{" "}
                <span className="material-symbols-outlined text-[14px] text-slate-400">
                  arrow_forward
                </span>{" "}
                2026-08-18{" "}
                <span className="material-symbols-outlined text-[16px] text-orange-600">
                  calendar_today
                </span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-6 mr-2 border-r border-slate-200 pr-6">
              <div className="flex flex-col items-end">
                <span className="font-label-caps text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                  System Status
                </span>
                <div className="flex items-center gap-1.5 text-emerald-700 font-semibold text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Healthy</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-label-caps text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                  Last Run
                </span>
                <div className="flex items-center gap-1 font-mono text-xs text-slate-700 font-medium">
                  <span>8m ago</span>
                  <span className="material-symbols-outlined text-[14px] text-emerald-600">
                    check_circle
                  </span>
                </div>
              </div>
            </div>
            <button className="text-slate-400 hover:text-slate-700 transition-colors flex items-center justify-center w-8 h-8 rounded-lg hover:bg-slate-100">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-orange-100 border border-orange-300 flex items-center justify-center font-bold text-xs text-orange-700 shadow-2xs">
              QA
            </div>
          </div>
        </header>

        {/* Scrollable Content Canvas */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
          <div className="max-w-[1600px] mx-auto flex flex-col gap-5">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-1">
              <div>
                <h2 className="font-headline-xl text-headline-xl text-slate-900 font-bold tracking-tight">
                  Autonomous Command Center
                </h2>
                <p className="font-body-lg text-body-lg text-slate-600">
                  Autonomous research, statistical validation, and execution monitoring.
                </p>
              </div>

              <div className="flex bg-slate-200/80 rounded-lg p-1 border border-slate-200 shadow-2xs">
                <button className="px-3.5 py-1.5 font-body-sm text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors rounded-md">
                  Manual
                </button>
                <button className="px-3.5 py-1.5 font-body-sm text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors rounded-md">
                  Assisted
                </button>
                <button className="px-3.5 py-1.5 font-body-sm text-xs bg-orange-600 text-white font-semibold flex items-center gap-1.5 rounded-md shadow-2xs">
                  <span className="material-symbols-outlined text-[16px]">
                    smart_toy
                  </span>
                  Auto Paper
                </button>
                <button className="px-3.5 py-1.5 font-body-sm text-xs text-slate-400 opacity-60 cursor-not-allowed flex items-center gap-1 rounded-md">
                  Live{" "}
                  <span className="material-symbols-outlined text-[14px]">
                    lock
                  </span>
                </button>
              </div>
            </div>

            {/* Workflow Stepper Panel */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-headline-md text-headline-md text-slate-900 font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-orange-600">
                    account_tree
                  </span>
                  Agent Workflow Status
                </h3>
                <span className="px-3 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200 font-label-caps text-xs font-semibold uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>{" "}
                  Processing Epoch 42
                </span>
              </div>
              <div className="flex items-center justify-between w-full overflow-x-auto pb-1">
                {/* Node 1 */}
                <div className="flex flex-col w-48 shrink-0 bg-slate-50 border border-slate-200 rounded-lg p-3 relative shadow-2xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-label-caps text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Market Data
                    </span>
                    <span className="material-symbols-outlined text-[16px] text-emerald-600">
                      check_circle
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-slate-900 font-semibold">
                    Ingestion Complete
                  </span>
                  <span className="font-data-metric-sm text-slate-500 mt-0.5 text-xs font-mono">
                    Parsed 14.2M ticks
                  </span>
                </div>
                <div className="flex-1 h-px bg-slate-200 mx-2 relative min-w-[20px]">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-slate-400 rotate-45"></div>
                </div>

                {/* Node 2 */}
                <div className="flex flex-col w-48 shrink-0 bg-white border border-orange-300 rounded-lg p-3 relative shadow-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-label-caps text-[10px] font-bold text-orange-600 uppercase tracking-wider">
                      Strategy Agent
                    </span>
                    <span className="material-symbols-outlined text-[16px] text-orange-600 animate-spin">
                      refresh
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-orange-700 font-semibold">
                    Scanning Signals
                  </span>
                  <span className="font-data-metric-sm text-slate-500 mt-0.5 text-xs font-mono">
                    Momentum in RELIANCE
                  </span>
                </div>
                <div className="flex-1 h-px bg-slate-200 mx-2 relative min-w-[20px]">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-slate-400 rotate-45"></div>
                </div>

                {/* Node 3 */}
                <div className="flex flex-col w-48 shrink-0 bg-slate-50 border border-slate-200 rounded-lg p-3 relative opacity-80 shadow-2xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-label-caps text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Risk Gate
                    </span>
                    <span className="material-symbols-outlined text-[16px] text-slate-400">
                      hourglass_empty
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-slate-700 font-medium">
                    Pending Review
                  </span>
                  <span className="font-data-metric-sm text-slate-400 mt-0.5 text-xs font-mono">
                    Awaiting Signal Batch
                  </span>
                </div>
                <div className="flex-1 h-px bg-slate-200 mx-2 relative min-w-[20px]">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-slate-400 rotate-45"></div>
                </div>

                {/* Node 4 */}
                <div className="flex flex-col w-48 shrink-0 bg-slate-50 border border-slate-200 rounded-lg p-3 relative opacity-70 shadow-2xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-label-caps text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Portfolio
                    </span>
                    <span className="material-symbols-outlined text-[16px] text-slate-400">
                      hourglass_empty
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-slate-600 font-medium">
                    Idle
                  </span>
                  <span className="font-data-metric-sm text-slate-400 mt-0.5 text-xs font-mono">
                    Standing By
                  </span>
                </div>
              </div>
            </div>

            {/* Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Pre-Trade Risk Gate */}
              <div className="lg:col-span-1 bg-white border border-slate-200 rounded-lg flex flex-col h-[480px] shadow-xs">
                <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
                  <h3 className="font-headline-md text-headline-md text-slate-900 font-semibold flex items-center gap-2">
                    <span className="material-symbols-outlined text-orange-600">security</span>
                    Pre-Trade Risk Gate
                  </h3>
                  <span className="font-label-caps text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    2m ago
                  </span>
                </div>
                <div className="p-5 flex-1 overflow-y-auto flex flex-col gap-4">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex flex-col items-center justify-center text-center shadow-2xs">
                    <span className="material-symbols-outlined text-3xl text-emerald-600 mb-1">
                      verified_user
                    </span>
                    <span className="font-headline-xl text-headline-xl text-emerald-800 font-bold tracking-tight">
                      APPROVED
                    </span>
                    <span className="font-body-sm text-body-sm text-emerald-700 mt-0.5 text-xs font-medium">
                      All 6 risk constraints satisfied for target portfolio
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5 mt-1">
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors">
                      <span className="font-body-sm text-body-sm text-slate-800 font-medium">
                        Position Limits
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-slate-500">
                          Max 5%
                        </span>
                        <span className="material-symbols-outlined text-[18px] text-emerald-600 font-bold">
                          check
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors">
                      <span className="font-body-sm text-body-sm text-slate-800 font-medium">
                        Beta Constraint
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-slate-500">
                          [-0.1, 0.1]
                        </span>
                        <span className="material-symbols-outlined text-[18px] text-emerald-600 font-bold">
                          check
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors">
                      <span className="font-body-sm text-body-sm text-slate-800 font-medium">
                        Sector Exposure
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-slate-500">
                          &lt; 15%
                        </span>
                        <span className="material-symbols-outlined text-[18px] text-emerald-600 font-bold">
                          check
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors">
                      <span className="font-body-sm text-body-sm text-slate-800 font-medium">
                        Expected Drawdown
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-slate-500">
                          &lt; 8%
                        </span>
                        <span className="material-symbols-outlined text-[18px] text-emerald-600 font-bold">
                          check
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors">
                      <span className="font-body-sm text-body-sm text-slate-800 font-medium">
                        Signal Freshness
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-slate-500">
                          &lt; 50ms
                        </span>
                        <span className="material-symbols-outlined text-[18px] text-emerald-600 font-bold">
                          check
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors">
                      <span className="font-body-sm text-body-sm text-slate-800 font-medium">
                        Est. Tx Cost
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-slate-500">
                          &lt; 2 bps
                        </span>
                        <span className="material-symbols-outlined text-[18px] text-emerald-600 font-bold">
                          check
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity Log */}
              <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg flex flex-col h-[480px] shadow-xs">
                <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
                  <h3 className="font-headline-md text-headline-md text-slate-900 font-semibold flex items-center gap-2">
                    <span className="material-symbols-outlined text-orange-600">list_alt</span>
                    Autonomous Activity Log
                  </h3>
                  <button className="text-xs font-semibold text-slate-600 hover:text-orange-600 uppercase flex items-center gap-1 px-2.5 py-1 rounded-md border border-slate-300 bg-white shadow-2xs">
                    Filter{" "}
                    <span className="material-symbols-outlined text-[14px]">
                      filter_list
                    </span>
                  </button>
                </div>
                <div className="p-0 flex-1 overflow-y-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 bg-slate-50 z-10 border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4 font-label-caps text-slate-500 uppercase tracking-wider text-[11px] font-semibold w-24">
                          Time
                        </th>
                        <th className="py-3 px-4 font-label-caps text-slate-500 uppercase tracking-wider text-[11px] font-semibold w-32">
                          Agent
                        </th>
                        <th className="py-3 px-4 font-label-caps text-slate-500 uppercase tracking-wider text-[11px] font-semibold">
                          Action / Decision
                        </th>
                        <th className="py-3 px-4 font-label-caps text-slate-500 uppercase tracking-wider text-[11px] font-semibold w-48">
                          Evidence / Meta
                        </th>
                      </tr>
                    </thead>
                    <tbody className="font-data-metric-sm font-mono text-xs text-slate-800 divide-y divide-slate-100">
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 text-slate-500">
                          10:42:05
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 font-sans font-semibold">
                            Strategy
                          </span>
                        </td>
                        <td className="py-3 px-4 font-sans font-medium text-slate-900">
                          Initiated long vector synthesis
                        </td>
                        <td className="py-3 px-4 text-slate-500">
                          Regime: Momentum breakout
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 text-slate-500">
                          10:41:12
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-sans font-semibold">
                            Market
                          </span>
                        </td>
                        <td className="py-3 px-4 font-sans font-medium text-slate-900">
                          Detected anomaly in India VIX curve
                        </td>
                        <td className="py-3 px-4 text-slate-500">
                          z-score: +2.8σ
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 text-slate-500">
                          10:38:50
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-sans font-semibold">
                            Portfolio
                          </span>
                        </td>
                        <td className="py-3 px-4 font-sans font-medium text-slate-900">
                          Rebalanced sector weights (Bank +2%, IT -1%)
                        </td>
                        <td className="py-3 px-4 text-slate-500">
                          Tracking error opt.
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 text-slate-500">
                          10:35:01
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-sans font-semibold">
                            Execution
                          </span>
                        </td>
                        <td className="py-3 px-4 font-sans font-medium text-slate-900">
                          Filled order basket #8829 (NSE Paper)
                        </td>
                        <td className="py-3 px-4 text-slate-500">
                          Slippage: +0.01 bps
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors opacity-70">
                        <td className="py-3 px-4 text-slate-500">
                          10:30:00
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-sans font-semibold">
                            Risk
                          </span>
                        </td>
                        <td className="py-3 px-4 font-sans font-medium text-slate-900">
                          Routine CUSUM drift check passed
                        </td>
                        <td className="py-3 px-4 text-slate-500">
                          No drift detected
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

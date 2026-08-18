import Link from "next/link";

export default function CommandCenter() {
  return (
    <div className="flex w-full min-h-screen bg-background text-on-surface font-body-sm h-screen overflow-hidden selection:bg-primary-container selection:text-on-primary-container">
      {/* SideNavBar */}
      <aside className="w-60 h-full fixed left-0 top-0 border-r border-outline-variant bg-surface-container flex flex-col z-20">
        <div className="px-6 py-6 border-b border-outline-variant flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-3xl">
            token
          </span>
          <div>
            <h1 className="font-headline-md text-headline-md font-bold tracking-tight text-on-surface">
              QUANT ALPHA
            </h1>
            <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">
              Research Pipeline
            </p>
          </div>
        </div>
        
        <div className="flex flex-col gap-1 py-4 flex-1 overflow-y-auto custom-scrollbar">
          <div className="px-6 pb-2 pt-1 font-label-caps text-label-caps text-on-surface-variant uppercase">
            Research
          </div>
          <Link
            className="text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3 scale-98 active:scale-95 transition-transform"
            href="/"
          >
            <span className="material-symbols-outlined text-[20px]">
              dashboard
            </span>
            <span className="font-body-sm text-body-sm">Overview</span>
          </Link>
          <Link
            className="text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3 scale-98 active:scale-95 transition-transform"
            href="/research"
          >
            <span className="material-symbols-outlined text-[20px]">
              science
            </span>
            <span className="font-body-sm text-body-sm">Research</span>
          </Link>
          <Link
            className="text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3 scale-98 active:scale-95 transition-transform"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">
              database
            </span>
            <span className="font-body-sm text-body-sm">Data</span>
          </Link>
          <Link
            className="text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3 scale-98 active:scale-95 transition-transform"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">
              analytics
            </span>
            <span className="font-body-sm text-body-sm">Signals</span>
          </Link>
          <Link
            className="text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3 scale-98 active:scale-95 transition-transform"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">
              rule
            </span>
            <span className="font-body-sm text-body-sm">Validation</span>
          </Link>
          <Link
            className="text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3 scale-98 active:scale-95 transition-transform"
            href="/backtests"
          >
            <span className="material-symbols-outlined text-[20px]">
              history
            </span>
            <span className="font-body-sm text-body-sm">Backtests</span>
          </Link>
          <Link
            className="text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3 scale-98 active:scale-95 transition-transform"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">
              account_balance
            </span>
            <span className="font-body-sm text-body-sm">Portfolio</span>
          </Link>
          <Link
            className="text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3 scale-98 active:scale-95 transition-transform"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">
              description
            </span>
            <span className="font-body-sm text-body-sm">Reports</span>
          </Link>

          <Link
            className="bg-primary-container text-on-primary-container font-semibold rounded-lg mx-2 px-3 py-2 flex items-center gap-3 scale-98 active:scale-95 transition-transform"
            href="/command-center"
          >
            <span className="material-symbols-outlined text-[20px]">
              monitoring
            </span>
            <span className="font-body-sm text-body-sm">Live Monitor</span>
          </Link>

          <div className="px-6 pb-2 pt-6 font-label-caps text-label-caps text-on-surface-variant uppercase">
            System
          </div>
          <Link
            className="text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3 scale-98 active:scale-95 transition-transform"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">
              storage
            </span>
            <span className="font-body-sm text-body-sm">Data Sources</span>
          </Link>
          <Link
            className="text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3 scale-98 active:scale-95 transition-transform"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">
              precision_manufacturing
            </span>
            <span className="font-body-sm text-body-sm">Pipeline Runs</span>
          </Link>
          <Link
            className="text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors rounded-lg mx-2 px-3 py-2 flex items-center gap-3 scale-98 active:scale-95 transition-transform"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">
              settings
            </span>
            <span className="font-body-sm text-body-sm">Settings</span>
          </Link>
        </div>

        <div className="px-4 py-4 border-t border-outline-variant bg-surface-container-low flex flex-col gap-3">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(142,213,255,0.6)]"></div>
              <span className="font-body-sm text-body-sm text-on-surface">
                System Status
              </span>
            </div>
            <span className="font-data-metric-sm text-data-metric-sm text-primary tracking-tighter">
              Autonomy Active
            </span>
          </div>
          <div className="flex items-center justify-between px-2 text-on-surface-variant">
            <span className="font-body-sm text-body-sm">Last Update</span>
            <span className="font-data-metric-sm text-data-metric-sm tracking-tighter">
              2s ago
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-60 flex-1 flex flex-col h-full bg-surface">
        {/* TopAppBar */}
        <header className="h-16 w-full sticky top-0 z-10 border-b border-outline-variant bg-surface flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="font-headline-md text-headline-md text-on-surface">
                Research Dashboard
              </span>
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                Autonomous Command Center
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <div className="flex flex-col">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                Environment
              </span>
              <button className="flex items-center gap-1 font-body-sm text-body-sm text-on-surface hover:text-primary transition-colors">
                Research{" "}
                <span className="material-symbols-outlined text-[16px]">
                  expand_more
                </span>
              </button>
            </div>
            <div className="h-8 w-px bg-outline-variant"></div>
            <div className="flex flex-col">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                Dataset
              </span>
              <button className="flex items-center gap-1 font-body-sm text-body-sm text-on-surface hover:text-primary transition-colors">
                US Equities{" "}
                <span className="material-symbols-outlined text-[16px]">
                  expand_more
                </span>
              </button>
            </div>
            <div className="h-8 w-px bg-outline-variant"></div>
            <div className="flex flex-col">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                Date Range
              </span>
              <button className="flex items-center gap-2 font-data-metric-sm text-data-metric-sm text-on-surface hover:text-primary transition-colors">
                2015-01-01{" "}
                <span className="material-symbols-outlined text-[14px]">
                  arrow_forward
                </span>{" "}
                2026-08-18{" "}
                <span className="material-symbols-outlined text-[16px]">
                  calendar_today
                </span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-6 mr-4 border-r border-outline-variant pr-6">
              <div className="flex flex-col items-end">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                  System Status
                </span>
                <div className="flex items-center gap-1.5 text-primary">
                  <span className="material-symbols-outlined text-[14px]">
                    check_circle
                  </span>
                  <span className="font-body-sm text-body-sm">Healthy</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                  Last Run
                </span>
                <div className="flex items-center gap-1.5 text-on-surface">
                  <span className="font-data-metric-sm text-data-metric-sm tracking-tighter">
                    8m ago
                  </span>
                  <span className="material-symbols-outlined text-[14px] text-primary">
                    check_circle
                  </span>
                </div>
              </div>
            </div>
            <button className="text-on-surface-variant hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-surface-variant border border-outline-variant flex items-center justify-center font-label-caps text-label-caps text-on-surface">
              AK
            </div>
          </div>
        </header>

        {/* Scrollable Content Canvas */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-surface-dim">
          <div className="max-w-[1600px] mx-auto flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
              <div>
                <h2 className="font-headline-xl text-headline-xl text-on-surface mb-1 tracking-tight">
                  Autonomous Command Center
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant">
                  Autonomous research and operations monitoring.
                </p>
              </div>

              <div className="flex bg-surface-container-high rounded-lg p-1 border border-outline-variant">
                <button className="px-4 py-1.5 rounded font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors rounded-lg">
                  Manual
                </button>
                <button className="px-4 py-1.5 rounded font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors rounded-lg">
                  Assisted
                </button>
                <button className="px-4 py-1.5 rounded font-body-sm text-body-sm bg-primary-container text-on-primary-container font-medium flex items-center gap-2 rounded-lg">
                  <span className="material-symbols-outlined text-[16px]">
                    smart_toy
                  </span>
                  Auto Paper
                </button>
                <button className="px-4 py-1.5 rounded font-body-sm text-body-sm text-on-surface-variant opacity-50 cursor-not-allowed flex items-center gap-1.5 rounded-lg">
                  Live{" "}
                  <span className="material-symbols-outlined text-[14px]">
                    lock
                  </span>
                </button>
              </div>
            </div>

            <div className="bg-surface-container border border-outline-variant rounded-lg p-5 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.3)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    account_tree
                  </span>
                  Agent Workflow Status
                </h3>
                <span className="px-2.5 py-1 rounded-full bg-primary-container/20 text-primary border border-primary/30 font-label-caps text-label-caps uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>{" "}
                  Processing Epoch 42
                </span>
              </div>
              <div className="flex items-center justify-between w-full overflow-x-auto pb-2 custom-scrollbar">
                {/* Node 1 */}
                <div className="flex flex-col w-48 shrink-0 bg-surface border border-outline-variant rounded-lg p-3 relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                      Market Data
                    </span>
                    <span className="material-symbols-outlined text-[16px] text-primary">
                      check_circle
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface font-medium">
                    Ingestion Complete
                  </span>
                  <span className="font-data-metric-sm text-data-metric-sm text-on-surface-variant mt-1 text-xs truncate tracking-tighter">
                    Parsed 14.2M ticks
                  </span>
                </div>
                <div className="flex-1 h-px bg-outline-variant mx-2 relative min-w-[20px] opacity-40">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-outline-variant rotate-45"></div>
                </div>

                {/* Node 2 */}
                <div className="flex flex-col w-48 shrink-0 bg-surface border border-outline-variant rounded-lg p-3 relative border-primary shadow-[0_0_10px_rgba(56,189,248,0.1)]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                      Strategy Agent
                    </span>
                    <span className="material-symbols-outlined text-[16px] text-primary animate-spin">
                      refresh
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface font-medium text-primary">
                    Scanning Signals
                  </span>
                  <span className="font-data-metric-sm text-data-metric-sm text-on-surface-variant mt-1 text-xs truncate tracking-tighter">
                    Detected momentum in AAPL
                  </span>
                </div>
                <div className="flex-1 h-px bg-outline-variant mx-2 relative min-w-[20px] opacity-40">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-outline-variant rotate-45"></div>
                </div>

                {/* Node 3 */}
                <div className="flex flex-col w-48 shrink-0 bg-surface border border-outline-variant rounded-lg p-3 relative opacity-60">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                      Risk Gate
                    </span>
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                      hourglass_empty
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface font-medium">
                    Pending Review
                  </span>
                  <span className="font-data-metric-sm text-data-metric-sm text-on-surface-variant mt-1 text-xs truncate tracking-tighter">
                    Awaiting Strategy Output
                  </span>
                </div>
                <div className="flex-1 h-px bg-outline-variant mx-2 relative min-w-[20px] opacity-40">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-outline-variant rotate-45"></div>
                </div>

                {/* Node 4 */}
                <div className="flex flex-col w-48 shrink-0 bg-surface border border-outline-variant rounded-lg p-3 relative opacity-60">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                      Portfolio
                    </span>
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                      hourglass_empty
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface font-medium">
                    Idle
                  </span>
                  <span className="font-data-metric-sm text-data-metric-sm text-on-surface-variant mt-1 text-xs truncate tracking-tighter">
                    -
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-1 bg-surface-container border border-outline-variant rounded-lg flex flex-col h-[500px] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.3)]">
                <div className="p-4 border-b border-outline-variant flex items-center justify-between">
                  <h3 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined">security</span>
                    Pre-Trade Risk Gate
                  </h3>
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                    Last Run: 2m ago
                  </span>
                </div>
                <div className="p-5 flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-4">
                  <div className="bg-surface border border-primary/30 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                    <span className="material-symbols-outlined text-4xl text-primary mb-2">
                      verified_user
                    </span>
                    <span className="font-headline-xl text-headline-xl text-primary tracking-tight">
                      APPROVED
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      All 6 constraints satisfied for proposed vector
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 mt-2">
                    <div className="flex items-center justify-between p-2 rounded hover:bg-surface-variant transition-colors">
                      <span className="font-body-sm text-body-sm text-on-surface">
                        Position Limits
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-data-metric-sm text-data-metric-sm text-on-surface-variant tracking-tighter">
                          Max 5%
                        </span>
                        <span className="material-symbols-outlined text-[18px] text-primary">
                          check
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded hover:bg-surface-variant transition-colors">
                      <span className="font-body-sm text-body-sm text-on-surface">
                        Beta Constraint
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-data-metric-sm text-data-metric-sm text-on-surface-variant tracking-tighter">
                          [-0.1, 0.1]
                        </span>
                        <span className="material-symbols-outlined text-[18px] text-primary">
                          check
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded hover:bg-surface-variant transition-colors">
                      <span className="font-body-sm text-body-sm text-on-surface">
                        Sector Exposure
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-data-metric-sm text-data-metric-sm text-on-surface-variant tracking-tighter">
                          &lt; 15%
                        </span>
                        <span className="material-symbols-outlined text-[18px] text-primary">
                          check
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded hover:bg-surface-variant transition-colors">
                      <span className="font-body-sm text-body-sm text-on-surface">
                        Expected Drawdown
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-data-metric-sm text-data-metric-sm text-on-surface-variant tracking-tighter">
                          &lt; 8%
                        </span>
                        <span className="material-symbols-outlined text-[18px] text-primary">
                          check
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded hover:bg-surface-variant transition-colors">
                      <span className="font-body-sm text-body-sm text-on-surface">
                        Signal Freshness
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-data-metric-sm text-data-metric-sm text-on-surface-variant tracking-tighter">
                          &lt; 50ms
                        </span>
                        <span className="material-symbols-outlined text-[18px] text-primary">
                          check
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded hover:bg-surface-variant transition-colors">
                      <span className="font-body-sm text-body-sm text-on-surface">
                        Est. Tx Cost
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-data-metric-sm text-data-metric-sm text-on-surface-variant tracking-tighter">
                          &lt; 2 bps
                        </span>
                        <span className="material-symbols-outlined text-[18px] text-primary">
                          check
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 bg-surface-container border border-outline-variant rounded-lg flex flex-col h-[500px] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.3)]">
                <div className="p-4 border-b border-outline-variant flex items-center justify-between">
                  <h3 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined">list_alt</span>
                    Autonomous Activity Log
                  </h3>
                  <button className="font-label-caps text-label-caps text-on-surface-variant hover:text-on-surface uppercase flex items-center gap-1">
                    Filter{" "}
                    <span className="material-symbols-outlined text-[14px]">
                      filter_list
                    </span>
                  </button>
                </div>
                <div className="p-0 flex-1 overflow-y-auto custom-scrollbar">
                  <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 bg-surface-container z-10 border-b border-outline-variant">
                      <tr>
                        <th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant uppercase w-24">
                          Time
                        </th>
                        <th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant uppercase w-32">
                          Agent
                        </th>
                        <th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant uppercase">
                          Action / Decision
                        </th>
                        <th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant uppercase w-48">
                          Evidence / Meta
                        </th>
                      </tr>
                    </thead>
                    <tbody className="font-data-metric-sm text-data-metric-sm text-on-surface">
                      <tr className="border-b border-outline-variant hover:bg-surface-variant/50 transition-colors">
                        <td className="py-3 px-4 text-on-surface-variant">
                          10:42:05
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded bg-surface border border-outline-variant text-primary">
                            Strategy
                          </span>
                        </td>
                        <td className="py-3 px-4 text-on-surface">
                          Initiated long vector synthesis
                        </td>
                        <td className="py-3 px-4 text-on-surface-variant text-xs">
                          Trigger: Volatility regime shift
                        </td>
                      </tr>
                      <tr className="border-b border-outline-variant hover:bg-surface-variant/50 transition-colors">
                        <td className="py-3 px-4 text-on-surface-variant">
                          10:41:12
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded bg-surface border border-outline-variant text-tertiary">
                            Market
                          </span>
                        </td>
                        <td className="py-3 px-4 text-on-surface">
                          Detected anomaly in VIX futures curve
                        </td>
                        <td className="py-3 px-4 text-on-surface-variant text-xs">
                          z-score: +3.2σ
                        </td>
                      </tr>
                      <tr className="border-b border-outline-variant hover:bg-surface-variant/50 transition-colors">
                        <td className="py-3 px-4 text-on-surface-variant">
                          10:38:50
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded bg-surface border border-outline-variant text-primary-container">
                            Portfolio
                          </span>
                        </td>
                        <td className="py-3 px-4 text-on-surface">
                          Rebalanced sector weights (Tech -2%, Util +2%)
                        </td>
                        <td className="py-3 px-4 text-on-surface-variant text-xs">
                          Tracking error optimization
                        </td>
                      </tr>
                      <tr className="border-b border-outline-variant hover:bg-surface-variant/50 transition-colors">
                        <td className="py-3 px-4 text-on-surface-variant">
                          10:35:01
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded bg-surface border border-outline-variant text-on-surface">
                            Execution
                          </span>
                        </td>
                        <td className="py-3 px-4 text-on-surface">
                          Filled order basket #8829
                        </td>
                        <td className="py-3 px-4 text-on-surface-variant text-xs">
                          Slippage: +0.01 bps
                        </td>
                      </tr>
                      <tr className="border-b border-outline-variant hover:bg-surface-variant/50 transition-colors opacity-70">
                        <td className="py-3 px-4 text-on-surface-variant">
                          10:30:00
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded bg-surface border border-outline-variant text-outline">
                            Risk
                          </span>
                        </td>
                        <td className="py-3 px-4 text-on-surface">
                          Routine margin check passed
                        </td>
                        <td className="py-3 px-4 text-on-surface-variant text-xs">
                          Utilization: 42%
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

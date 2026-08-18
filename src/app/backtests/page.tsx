import Link from "next/link";

export default function Backtests() {
  return (
    <div className="bg-slate-50 text-slate-900 font-body-sm text-body-sm antialiased h-screen overflow-hidden flex w-full">
      {/* SideNavBar */}
      <nav className="bg-white text-slate-900 w-60 h-full fixed left-0 top-0 border-r border-slate-200 flex flex-col py-4 z-20 shadow-xs">
        {/* Brand Area */}
        <div className="px-6 mb-6 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center text-white shadow-2xs">
            <span className="material-symbols-outlined text-[20px]" data-icon="terminal">
              show_chart
            </span>
          </div>
          <div>
            <h1 className="text-headline-md font-headline-md font-bold text-slate-900 tracking-tight">
              QUANT ALPHA
            </h1>
            <p className="text-label-caps text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
              Research Pipeline
            </p>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 overflow-y-auto">
          <ul className="space-y-1 px-2">
            <li>
              <Link
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                href="/"
              >
                <span className="material-symbols-outlined text-[20px]">
                  dashboard
                </span>
                <span className="text-body-sm font-body-sm font-medium">Overview</span>
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                href="/research"
              >
                <span className="material-symbols-outlined text-[20px]">
                  science
                </span>
                <span className="text-body-sm font-body-sm font-medium">Research</span>
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-[20px]">
                  analytics
                </span>
                <span className="text-body-sm font-body-sm font-medium">Signals</span>
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-[20px]">
                  rule
                </span>
                <span className="text-body-sm font-body-sm font-medium">Validation</span>
              </Link>
            </li>
            {/* ACTIVE TAB */}
            <li>
              <Link
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-orange-600 bg-orange-50 font-semibold border border-orange-200/70 transition-all"
                href="/backtests"
              >
                <span className="material-symbols-outlined text-[20px]">
                  history
                </span>
                <span className="text-body-sm font-body-sm font-semibold">Backtests</span>
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-[20px]">
                  account_balance
                </span>
                <span className="text-body-sm font-body-sm font-medium">Portfolio</span>
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-[20px]">
                  description
                </span>
                <span className="text-body-sm font-body-sm font-medium">Reports</span>
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                href="/command-center"
              >
                <span className="material-symbols-outlined text-[20px]">
                  monitoring
                </span>
                <span className="text-body-sm font-body-sm font-medium">Live Monitor</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Footer Navigation */}
        <div className="mt-auto px-2 pt-4 border-t border-slate-200">
          <ul className="space-y-1">
            <li>
              <Link
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-[20px]">
                  settings
                </span>
                <span className="text-body-sm font-body-sm font-medium">Settings</span>
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-[20px]">
                  help
                </span>
                <span className="text-body-sm font-body-sm font-medium">Support</span>
              </Link>
            </li>
          </ul>
          <div className="mt-4 p-2 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-3 shadow-2xs">
            <div className="w-8 h-8 rounded-full bg-orange-100 border border-orange-300 text-orange-700 font-bold text-xs flex items-center justify-center">
              QA
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-900 truncate">
                Admin User
              </p>
              <p className="text-[10px] text-slate-500 truncate">
                admin@quant.local
              </p>
            </div>
          </div>
        </div>
      </nav>

      {/* TopAppBar */}
      <header className="bg-white/95 text-slate-900 fixed top-0 right-0 h-16 w-[calc(100%-240px)] border-b border-slate-200 flex justify-between items-center px-6 z-10 shadow-xs backdrop-blur-md">
        {/* Search & Context */}
        <div className="flex items-center flex-1 gap-6">
          <div className="relative w-80 hidden md:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
              search
            </span>
            <input
              className="w-full bg-slate-50 text-slate-900 text-body-sm rounded-lg border border-slate-200 pl-9 pr-3 py-1.5 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 placeholder:text-slate-400"
              placeholder="Search parameters, models, symbols..."
              type="text"
            />
          </div>
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-xs font-medium">
            <Link className="text-slate-500 hover:text-slate-900" href="/">
              Research
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-orange-600 font-semibold">Backtest Engine</span>
          </nav>
        </div>

        {/* Trailing Actions */}
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              System Active
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 font-mono">
              NSE Equities
            </span>
          </div>
          <div className="w-px h-6 bg-slate-200 mx-1"></div>
          <button className="text-slate-400 hover:text-slate-700 transition-colors flex items-center justify-center w-8 h-8 rounded-lg hover:bg-slate-100">
            <span className="material-symbols-outlined text-[20px]">
              notifications
            </span>
          </button>
          <button className="text-slate-400 hover:text-slate-700 transition-colors flex items-center justify-center w-8 h-8 rounded-lg hover:bg-slate-100">
            <span className="material-symbols-outlined text-[20px]">
              settings_input_component
            </span>
          </button>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-1 ml-[240px] mt-16 p-6 h-[calc(100vh-64px)] overflow-y-auto bg-slate-50">
        {/* Header */}
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-headline-xl font-headline-xl text-slate-900 font-bold tracking-tight">
              Momentum Reversion v2.4
            </h2>
            <p className="text-body-sm font-body-sm text-slate-500 mt-0.5">
              Last run: 14:32 IST | Validation Mode:{" "}
              <span className="text-orange-600 font-semibold">Purged K-Fold (CPCV)</span>
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors text-body-sm font-semibold flex items-center gap-1.5 shadow-2xs">
              <span className="material-symbols-outlined text-sm">
                download
              </span>
              Export CSV
            </button>
            <button className="px-4 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition-colors text-body-sm font-semibold flex items-center gap-1.5 shadow-2xs">
              <span className="material-symbols-outlined text-sm">
                play_arrow
              </span>
              Run Backtest
            </button>
          </div>
        </div>

        <div 
          className="h-[calc(100%-80px)] grid gap-6" 
          style={{ gridTemplateColumns: "repeat(12, minmax(0, 1fr))" }}
        >
          {/* Left Column: Controls (3/12) */}
          <div className="col-span-3 flex flex-col gap-4">
            {/* Parameters Panel */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 flex-1 shadow-xs">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-4">
                <span className="material-symbols-outlined text-orange-600 text-base">
                  tune
                </span>
                <h3 className="text-body-lg font-headline-md text-slate-900 font-semibold">
                  Configuration
                </h3>
              </div>
              <form className="space-y-4">
                {/* Strategy */}
                <div>
                  <label className="block text-label-caps text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Base Strategy
                  </label>
                  <select className="w-full bg-slate-50 text-slate-900 text-body-sm rounded-lg border border-slate-200 py-1.5 px-2.5 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 font-medium">
                    <option>Momentum Reversion (MR)</option>
                    <option>Statistical Arbitrage (SA)</option>
                    <option>Volatility Targeting (VT)</option>
                  </select>
                </div>
                {/* Universe */}
                <div>
                  <label className="block text-label-caps text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Universe Selection
                  </label>
                  <div className="flex gap-2">
                    <input
                      className="flex-1 bg-slate-50 text-slate-900 text-body-sm rounded-lg border border-slate-200 py-1.5 px-2.5 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 font-medium"
                      type="text"
                      defaultValue="NIFTY 50"
                    />
                    <button
                      className="px-2.5 py-1.5 bg-slate-100 border border-slate-200 rounded-lg hover:bg-slate-200 transition-colors text-slate-700"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-sm">
                        add
                      </span>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-xs text-slate-800 border border-slate-200 font-medium">
                      NIFTY 50{" "}
                      <button className="text-slate-400 hover:text-rose-600">
                        <span className="material-symbols-outlined text-[10px]">
                          close
                        </span>
                      </button>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-xs text-slate-800 border border-slate-200 font-medium">
                      NIFTY BANK{" "}
                      <button className="text-slate-400 hover:text-rose-600">
                        <span className="material-symbols-outlined text-[10px]">
                          close
                        </span>
                      </button>
                    </span>
                  </div>
                </div>
                <div className="w-full h-px bg-slate-200"></div>
                {/* Date Range */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-label-caps text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Start Date
                    </label>
                    <input
                      className="w-full bg-slate-50 text-slate-900 text-body-sm rounded-lg border border-slate-200 py-1 px-2 text-xs focus:ring-1 focus:ring-orange-500 focus:border-orange-500 font-mono"
                      type="date"
                      defaultValue="2015-01-01"
                    />
                  </div>
                  <div>
                    <label className="block text-label-caps text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      End Date
                    </label>
                    <input
                      className="w-full bg-slate-50 text-slate-900 text-body-sm rounded-lg border border-slate-200 py-1 px-2 text-xs focus:ring-1 focus:ring-orange-500 focus:border-orange-500 font-mono"
                      type="date"
                      defaultValue="2024-12-31"
                    />
                  </div>
                </div>
                {/* Execution Model */}
                <div>
                  <label className="block text-label-caps text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Execution Model
                  </label>
                  <select className="w-full bg-slate-50 text-slate-900 text-body-sm rounded-lg border border-slate-200 py-1.5 px-2.5 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 font-medium">
                    <option>TWAP (Volume Weighted)</option>
                    <option>VWAP</option>
                    <option>Implementation Shortfall</option>
                    <option>Instant (No Slippage)</option>
                  </select>
                </div>
                {/* Slippage / Fees */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-label-caps text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Comm (bps)
                    </label>
                    <input
                      className="w-full bg-slate-50 text-slate-900 font-mono text-right rounded-lg border border-slate-200 py-1 px-2 text-xs focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                      step="0.1"
                      type="number"
                      defaultValue="1.5"
                    />
                  </div>
                  <div>
                    <label className="block text-label-caps text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Slippage (bps)
                    </label>
                    <input
                      className="w-full bg-slate-50 text-slate-900 font-mono text-right rounded-lg border border-slate-200 py-1 px-2 text-xs focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                      step="0.5"
                      type="number"
                      defaultValue="5.0"
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* System Status Mini-Panel */}
            <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
              <div className="flex justify-between items-center">
                <span className="text-body-sm font-semibold text-slate-800">
                  Data Cache
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  Synced (NSE 2015-2024)
                </span>
              </div>
              <div className="mt-2 w-full bg-slate-100 rounded-full h-1.5">
                <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: "100%" }}></div>
              </div>
            </div>
          </div>

          {/* Right Column: Visualization & Results (9/12) */}
          <div className="col-span-9 flex flex-col gap-4 h-full">
            {/* Performance Summary */}
            <div className="grid grid-cols-4 gap-4">
              {/* Metric Card 1 */}
              <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
                <p className="text-label-caps text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Total Return
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-headline-xl font-headline-xl text-orange-600 font-bold">
                    +142.8%
                  </span>
                  <span className="text-xs text-slate-400 font-medium">vs 98.4% BM</span>
                </div>
              </div>
              {/* Metric Card 2 */}
              <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
                <p className="text-label-caps text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Sharpe Ratio (Ann)
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-headline-xl font-headline-xl text-emerald-600 font-bold">
                    1.84
                  </span>
                  <span className="text-xs text-slate-400 font-medium">DSR: 0.96</span>
                </div>
              </div>
              {/* Metric Card 3 */}
              <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
                <p className="text-label-caps text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Volatility (Ann)
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-headline-xl font-headline-xl text-slate-900 font-bold">
                    12.5%
                  </span>
                </div>
              </div>
              {/* Metric Card 4 */}
              <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
                <p className="text-label-caps text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Max Drawdown
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-headline-xl font-headline-xl text-rose-600 font-bold">
                    -14.2%
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Mar 2020</span>
                </div>
              </div>
            </div>

            {/* Main Chart Area */}
            <div className="bg-white border border-slate-200 rounded-lg flex-1 flex flex-col relative overflow-hidden shadow-xs">
              <div className="px-4 py-3 border-b border-slate-200 flex justify-between items-center bg-slate-50/50 z-10">
                <h3 className="text-body-sm font-semibold text-slate-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-orange-600">
                    show_chart
                  </span>
                  Cumulative Equity Curve vs NIFTY 50
                </h3>
                <div className="flex gap-2">
                  <button className="px-2.5 py-1 text-xs bg-slate-100 border border-slate-200 rounded-md text-slate-600 font-medium hover:bg-slate-200">
                    Log
                  </button>
                  <button className="px-2.5 py-1 text-xs bg-orange-600 text-white rounded-md font-semibold shadow-2xs">
                    Linear
                  </button>
                </div>
              </div>
              {/* Clean High-Density SVG Chart Canvas */}
              <div className="flex-1 relative p-6 bg-slate-50/40">
                <div className="absolute right-6 top-4 bg-white/95 border border-slate-200 rounded-lg p-3 text-xs font-mono space-y-1.5 shadow-xs z-10">
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-500 font-medium">Strategy</span>
                    <span className="text-orange-600 font-bold">+142.8%</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-500 font-medium">Benchmark</span>
                    <span className="text-slate-700 font-semibold">+98.4%</span>
                  </div>
                </div>
                <div className="w-full h-full border-b border-l border-slate-300 relative">
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 grid grid-cols-8 divide-x divide-slate-200">
                      <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-between">
                      <div className="w-full h-px bg-slate-200"></div>
                      <div className="w-full h-px bg-slate-200"></div>
                      <div className="w-full h-px bg-slate-200"></div>
                      <div className="w-full h-px bg-slate-200"></div>
                    </div>
                  </div>
                  <svg
                    className="w-full h-full overflow-visible"
                    preserveAspectRatio="none"
                    viewBox="0 0 100 100"
                  >
                    <defs>
                      <linearGradient id="backtestGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ea580c" stopOpacity="0.18" />
                        <stop offset="80%" stopColor="#f97316" stopOpacity="0.03" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <polygon
                      points="0,85 12,78 25,68 37,58 50,62 62,45 75,32 87,22 100,8 100,100 0,100"
                      fill="url(#backtestGrad)"
                    />
                    <polyline
                      fill="none"
                      points="0,85 12,82 25,76 37,70 50,75 62,60 75,52 87,46 100,40"
                      stroke="#94a3b8"
                      strokeWidth="1.5"
                      strokeDasharray="3,3"
                      vectorEffect="non-scaling-stroke"
                    />
                    <polyline
                      fill="none"
                      points="0,85 12,78 25,68 37,58 50,62 62,45 75,32 87,22 100,8"
                      stroke="#ea580c"
                      strokeWidth="2.5"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Transaction Cost Analysis (Bottom Row) */}
            <div className="bg-white border border-slate-200 rounded-lg h-48 flex flex-col shadow-xs overflow-hidden">
              <div className="px-4 py-2 border-b border-slate-200 bg-slate-50/50">
                <h3 className="text-body-sm font-semibold text-slate-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-slate-500">
                    receipt_long
                  </span>
                  Transaction Cost Analysis (TCA)
                </h3>
              </div>
              <div className="flex-1 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-label-caps font-label-caps uppercase border-b border-slate-200 text-[11px] font-semibold">
                      <th className="px-4 py-2">Metric</th>
                      <th className="px-4 py-2 text-right">
                        Value (bps)
                      </th>
                      <th className="px-4 py-2 text-right">
                        Impact PnL
                      </th>
                      <th className="px-4 py-2">Distribution</th>
                    </tr>
                  </thead>
                  <tbody className="text-data-metric-sm font-data-metric-sm font-mono text-slate-800 divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-2 flex items-center gap-2 font-sans font-medium text-slate-900">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>{" "}
                        Market Impact
                      </td>
                      <td className="px-4 py-2 text-right">4.2</td>
                      <td className="px-4 py-2 text-right text-rose-600 font-semibold">
                        -₹14,250
                      </td>
                      <td className="px-4 py-2 w-1/3">
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden flex">
                          <div
                            className="bg-blue-500 h-full"
                            style={{ width: "45%" }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-2 flex items-center gap-2 font-sans font-medium text-slate-900">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>{" "}
                        Slippage vs Arrival
                      </td>
                      <td className="px-4 py-2 text-right">1.8</td>
                      <td className="px-4 py-2 text-right text-rose-600 font-semibold">
                        -₹6,120
                      </td>
                      <td className="px-4 py-2 w-1/3">
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden flex">
                          <div
                            className="bg-purple-500 h-full"
                            style={{ width: "20%" }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-2 flex items-center gap-2 font-sans font-medium text-slate-900">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>{" "}
                        Alpha Capture
                      </td>
                      <td className="px-4 py-2 text-right text-emerald-600 font-semibold">
                        +2.1
                      </td>
                      <td className="px-4 py-2 text-right text-emerald-600 font-semibold">
                        +₹7,400
                      </td>
                      <td className="px-4 py-2 w-1/3">
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden flex">
                          <div
                            className="bg-emerald-500 h-full"
                            style={{ width: "25%" }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

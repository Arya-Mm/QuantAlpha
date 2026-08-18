import Link from "next/link";

export default function Backtests() {
  return (
    <div className="bg-background text-on-surface font-body-sm text-body-sm antialiased h-screen overflow-hidden flex w-full">
      {/* SideNavBar (Shared Component) */}
      <nav className="bg-surface-container-low dark:bg-surface-container-lowest text-primary dark:text-primary w-60 h-full fixed left-0 top-0 border-r border-outline-variant dark:border-outline-variant flex flex-col py-lg z-20">
        {/* Brand Area */}
        <div className="px-md mb-8 flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-on-primary">
            <span className="material-symbols-outlined text-lg" data-icon="terminal">
              terminal
            </span>
          </div>
          <div>
            <h1 className="text-headline-md font-headline-md font-bold text-primary dark:text-primary tracking-tight">
              QuantTerminal
            </h1>
            <p className="text-label-caps font-label-caps text-on-surface-variant">
              Institutional Research
            </p>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 overflow-y-auto">
          <ul className="space-y-1 px-sm">
            <li>
              <Link
                className="flex items-center gap-3 px-3 py-2 rounded text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-variant dark:hover:bg-surface-variant hover:text-on-surface dark:hover:text-on-surface transition-colors group"
                href="/"
              >
                <span
                  className="material-symbols-outlined text-xl opacity-80 group-hover:opacity-100 transition-opacity"
                  data-icon="dashboard"
                >
                  dashboard
                </span>
                <span className="text-body-sm font-body-sm font-medium">Overview</span>
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-3 px-3 py-2 rounded text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-variant dark:hover:bg-surface-variant hover:text-on-surface dark:hover:text-on-surface transition-colors group"
                href="/research"
              >
                <span
                  className="material-symbols-outlined text-xl opacity-80 group-hover:opacity-100 transition-opacity"
                  data-icon="science"
                >
                  science
                </span>
                <span className="text-body-sm font-body-sm font-medium">Research</span>
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-3 px-3 py-2 rounded text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-variant dark:hover:bg-surface-variant hover:text-on-surface dark:hover:text-on-surface transition-colors group"
                href="#"
              >
                <span
                  className="material-symbols-outlined text-xl opacity-80 group-hover:opacity-100 transition-opacity"
                  data-icon="analytics"
                >
                  analytics
                </span>
                <span className="text-body-sm font-body-sm font-medium">Signals</span>
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-3 px-3 py-2 rounded text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-variant dark:hover:bg-surface-variant hover:text-on-surface dark:hover:text-on-surface transition-colors group"
                href="#"
              >
                <span
                  className="material-symbols-outlined text-xl opacity-80 group-hover:opacity-100 transition-opacity"
                  data-icon="rule"
                >
                  rule
                </span>
                <span className="text-body-sm font-body-sm font-medium">Validation</span>
              </Link>
            </li>
            {/* ACTIVE TAB */}
            <li>
              <Link
                className="flex items-center gap-3 px-3 py-2 rounded text-primary dark:text-primary bg-primary-container/10 border-r-2 border-primary opacity-90 transition-all duration-150"
                href="/backtests"
              >
                <span
                  className="material-symbols-outlined text-xl"
                  data-icon="history_edu"
                  data-weight="fill"
                >
                  history_edu
                </span>
                <span className="text-body-sm font-body-sm font-medium">Backtests</span>
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-3 px-3 py-2 rounded text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-variant dark:hover:bg-surface-variant hover:text-on-surface dark:hover:text-on-surface transition-colors group"
                href="#"
              >
                <span
                  className="material-symbols-outlined text-xl opacity-80 group-hover:opacity-100 transition-opacity"
                  data-icon="account_balance_wallet"
                >
                  account_balance_wallet
                </span>
                <span className="text-body-sm font-body-sm font-medium">Portfolio</span>
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-3 px-3 py-2 rounded text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-variant dark:hover:bg-surface-variant hover:text-on-surface dark:hover:text-on-surface transition-colors group"
                href="#"
              >
                <span
                  className="material-symbols-outlined text-xl opacity-80 group-hover:opacity-100 transition-opacity"
                  data-icon="description"
                >
                  description
                </span>
                <span className="text-body-sm font-body-sm font-medium">Reports</span>
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-3 px-3 py-2 rounded text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-variant dark:hover:bg-surface-variant hover:text-on-surface dark:hover:text-on-surface transition-colors group"
                href="/command-center"
              >
                <span
                  className="material-symbols-outlined text-xl opacity-80 group-hover:opacity-100 transition-opacity"
                  data-icon="monitoring"
                >
                  monitoring
                </span>
                <span className="text-body-sm font-body-sm font-medium">Live Monitor</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Footer Navigation */}
        <div className="mt-auto px-sm pt-4 border-t border-outline-variant">
          <ul className="space-y-1">
            <li>
              <Link
                className="flex items-center gap-3 px-3 py-2 rounded text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-variant dark:hover:bg-surface-variant hover:text-on-surface dark:hover:text-on-surface transition-colors group"
                href="#"
              >
                <span
                  className="material-symbols-outlined text-xl opacity-80 group-hover:opacity-100 transition-opacity"
                  data-icon="settings"
                >
                  settings
                </span>
                <span className="text-body-sm font-body-sm font-medium">Settings</span>
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-3 px-3 py-2 rounded text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-variant dark:hover:bg-surface-variant hover:text-on-surface dark:hover:text-on-surface transition-colors group"
                href="#"
              >
                <span
                  className="material-symbols-outlined text-xl opacity-80 group-hover:opacity-100 transition-opacity"
                  data-icon="help"
                >
                  help
                </span>
                <span className="text-body-sm font-body-sm font-medium">Support</span>
              </Link>
            </li>
          </ul>
          <div className="mt-4 px-3 flex items-center gap-3">
            {/* Using a regular img tag for now; would use next/image in a full implementation */}
            <img
              alt="User Profile"
              className="w-8 h-8 rounded-full border border-outline-variant object-cover"
              data-alt="A small, professional corporate headshot of a financial analyst or quantitative developer. Neutral grey background, formal attire, subtle lighting. Used as an avatar thumbnail in a dark UI dashboard."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWU-1k5t9aC4E-41iIvU6Uqvl6B-CC6OgpBvsrJUFvlNhox_vy0WBl5NkIF8rnqflS5o4V9nF8yyFUA-Qh4sl8kKU1_PU5Lv0jD9TTTQTR41IEUNtg2DK0eCuMzCn07vnoY8Kkl9usQZSv0qLdkWJsnUQQL6_yMRz3M0YUcJmvDEJmneZUX5wpmS-5jJ5VlsPTi_IeYMGVRh5wb9TPr07ucpQUO2YCRfYf5gRbqhkWSuSMITmDJMhFYg"
            />
            <div className="flex-1 min-w-0">
              <p className="text-body-sm font-body-sm font-medium text-on-surface truncate">
                Admin User
              </p>
              <p className="text-[10px] text-on-surface-variant truncate">
                admin@quant.local
              </p>
            </div>
          </div>
        </div>
      </nav>

      {/* TopAppBar (Shared Component) */}
      <header className="bg-surface-container-low dark:bg-surface-container-low text-primary dark:text-primary fixed top-0 right-0 h-16 w-[calc(100%-240px)] border-b border-outline-variant dark:border-outline-variant flex justify-between items-center px-lg z-10">
        {/* Search & Context */}
        <div className="flex items-center flex-1 gap-6">
          <div className="relative w-96 hidden md:block">
            <span
              className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm"
              data-icon="search"
            >
              search
            </span>
            <input
              className="w-full bg-surface text-on-surface text-body-sm font-body-sm rounded border border-outline-variant pl-9 pr-3 py-1.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant"
              placeholder="Search parameters, models, symbols..."
              type="text"
            />
          </div>
          {/* Breadcrumb Navigation */}
          <nav className="flex space-x-4">
            <Link
              className="text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-primary transition-opacity text-body-sm font-body-sm font-medium"
              href="#"
            >
              Research
            </Link>
            <span className="text-on-surface-variant">/</span>
            <Link
              className="text-primary dark:text-primary font-bold border-b-2 border-primary pb-1 text-body-sm font-body-sm"
              href="#"
            >
              Production
            </Link>
          </nav>
        </div>

        {/* Trailing Actions */}
        <div className="flex items-center gap-4">
          {/* Badges */}
          <div className="flex gap-2">
            <span className="px-2 py-1 rounded bg-secondary-container/20 text-on-surface text-[11px] font-label-caps border border-outline-variant flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              System Active
            </span>
            <span className="px-2 py-1 rounded bg-surface text-on-surface-variant text-[11px] font-label-caps border border-outline-variant">
              US Equities
            </span>
          </div>
          <div className="w-px h-6 bg-outline-variant mx-2"></div>
          {/* Icons */}
          <button className="text-on-surface-variant hover:text-primary transition-colors relative">
            <span
              className="material-symbols-outlined text-lg"
              data-icon="notifications"
            >
              notifications
            </span>
            <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
          </button>
          <button className="text-on-surface-variant hover:text-primary transition-colors">
            <span
              className="material-symbols-outlined text-lg"
              data-icon="settings_input_component"
            >
              settings_input_component
            </span>
          </button>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-1 ml-[240px] mt-16 p-lg h-[calc(100vh-64px)] overflow-y-auto bg-background">
        {/* Header */}
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-headline-xl font-headline-xl text-on-surface">
              Momentum Reversion v2.4
            </h2>
            <p className="text-body-sm font-body-sm text-on-surface-variant mt-1">
              Last run: 14:32 UTC | Mode:{" "}
              <span className="text-primary font-medium">Walk-Forward</span>
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-1.5 rounded border border-outline-variant text-on-surface hover:bg-surface-variant transition-colors text-body-sm font-medium flex items-center gap-2">
              <span
                className="material-symbols-outlined text-sm"
                data-icon="download"
              >
                download
              </span>
              Export CSV
            </button>
            <button className="px-4 py-1.5 rounded bg-primary text-on-primary hover:bg-primary-container transition-colors text-body-sm font-medium flex items-center gap-2 shadow-[0_0_15px_rgba(142,213,255,0.15)]">
              <span
                className="material-symbols-outlined text-sm"
                data-icon="play_arrow"
              >
                play_arrow
              </span>
              Run Backtest
            </button>
          </div>
        </div>

        {/* Note: I'll use inline style to mimic the dense-grid class since globals.css is already populated */}
        <div 
          className="h-[calc(100%-80px)] grid gap-4" 
          style={{ gridTemplateColumns: "repeat(12, minmax(0, 1fr))" }}
        >
          {/* Left Column: Controls (3/12) */}
          <div className="col-span-3 flex flex-col gap-4">
            {/* Parameters Panel */}
            <div className="bg-surface-container border border-outline-variant rounded-lg p-md flex-1">
              <div className="flex items-center gap-2 border-b border-outline-variant pb-3 mb-4">
                <span
                  className="material-symbols-outlined text-on-surface-variant text-sm"
                  data-icon="tune"
                >
                  tune
                </span>
                <h3 className="text-body-lg font-headline-md text-on-surface">
                  Configuration
                </h3>
              </div>
              <form className="space-y-5">
                {/* Strategy */}
                <div>
                  <label className="block text-label-caps font-label-caps text-on-surface-variant mb-1.5 uppercase">
                    Base Strategy
                  </label>
                  <select className="w-full bg-surface text-on-surface text-body-sm rounded border border-outline-variant py-1.5 px-2 focus:ring-1 focus:ring-primary focus:border-primary">
                    <option>Momentum Reversion (MR)</option>
                    <option>Statistical Arbitrage (SA)</option>
                    <option>Volatility Targeting (VT)</option>
                  </select>
                </div>
                {/* Universe */}
                <div>
                  <label className="block text-label-caps font-label-caps text-on-surface-variant mb-1.5 uppercase">
                    Universe Selection
                  </label>
                  <div className="flex gap-2">
                    <input
                      className="flex-1 bg-surface text-on-surface text-body-sm rounded border border-outline-variant py-1.5 px-2 focus:ring-1 focus:ring-primary focus:border-primary"
                      type="text"
                      defaultValue="S&P 500"
                    />
                    <button
                      className="px-2 py-1.5 bg-surface-variant border border-outline-variant rounded hover:bg-outline-variant transition-colors text-on-surface"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-sm" data-icon="add">
                        add
                      </span>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-variant text-[10px] text-on-surface border border-outline-variant">
                      SPY{" "}
                      <button className="text-on-surface-variant hover:text-error">
                        <span
                          className="material-symbols-outlined text-[10px]"
                          data-icon="close"
                        >
                          close
                        </span>
                      </button>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-variant text-[10px] text-on-surface border border-outline-variant">
                      QQQ{" "}
                      <button className="text-on-surface-variant hover:text-error">
                        <span
                          className="material-symbols-outlined text-[10px]"
                          data-icon="close"
                        >
                          close
                        </span>
                      </button>
                    </span>
                  </div>
                </div>
                <div className="w-full h-px bg-outline-variant"></div>
                {/* Date Range */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-label-caps font-label-caps text-on-surface-variant mb-1.5 uppercase">
                      Start Date
                    </label>
                    <input
                      className="w-full bg-surface text-on-surface text-body-sm rounded border border-outline-variant py-1 px-2 text-xs focus:ring-1 focus:ring-primary focus:border-primary"
                      type="date"
                      defaultValue="2015-01-01"
                    />
                  </div>
                  <div>
                    <label className="block text-label-caps font-label-caps text-on-surface-variant mb-1.5 uppercase">
                      End Date
                    </label>
                    <input
                      className="w-full bg-surface text-on-surface text-body-sm rounded border border-outline-variant py-1 px-2 text-xs focus:ring-1 focus:ring-primary focus:border-primary"
                      type="date"
                      defaultValue="2023-12-31"
                    />
                  </div>
                </div>
                {/* Execution Model */}
                <div>
                  <label className="block text-label-caps font-label-caps text-on-surface-variant mb-1.5 uppercase">
                    Execution Model
                  </label>
                  <select className="w-full bg-surface text-on-surface text-body-sm rounded border border-outline-variant py-1.5 px-2 focus:ring-1 focus:ring-primary focus:border-primary">
                    <option>TWAP (Volume Weighted)</option>
                    <option>VWAP</option>
                    <option>Implementation Shortfall</option>
                    <option>Instant (No Slippage)</option>
                  </select>
                </div>
                {/* Slippage / Fees */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-label-caps font-label-caps text-on-surface-variant mb-1.5 uppercase">
                      Comm (bps)
                    </label>
                    <input
                      className="w-full bg-surface text-data-metric-sm font-data-metric-sm text-right rounded border border-outline-variant py-1 px-2 focus:ring-1 focus:ring-primary focus:border-primary"
                      step="0.1"
                      type="number"
                      defaultValue="1.5"
                    />
                  </div>
                  <div>
                    <label className="block text-label-caps font-label-caps text-on-surface-variant mb-1.5 uppercase">
                      Slippage (bps)
                    </label>
                    <input
                      className="w-full bg-surface text-data-metric-sm font-data-metric-sm text-right rounded border border-outline-variant py-1 px-2 focus:ring-1 focus:ring-primary focus:border-primary"
                      step="0.5"
                      type="number"
                      defaultValue="5.0"
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* System Status Mini-Panel */}
            <div className="bg-surface-container border border-outline-variant rounded-lg p-md">
              <div className="flex justify-between items-center">
                <span className="text-body-sm font-medium text-on-surface">
                  Data Cache
                </span>
                <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded">
                  Synced
                </span>
              </div>
              <div className="mt-2 w-full bg-surface rounded-full h-1">
                <div className="bg-primary h-1 rounded-full" style={{ width: "100%" }}></div>
              </div>
            </div>
          </div>

          {/* Right Column: Visualization & Results (9/12) */}
          <div className="col-span-9 flex flex-col gap-4 h-full">
            {/* Performance Summary (Top Row) */}
            <div className="grid grid-cols-4 gap-4">
              {/* Metric Card 1 */}
              <div className="bg-surface-container border border-outline-variant rounded-lg p-md relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <p className="text-label-caps font-label-caps text-on-surface-variant uppercase mb-1">
                  Total Return
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-headline-xl font-headline-xl text-primary font-bold">
                    +142.8%
                  </span>
                  <span className="text-xs text-on-surface-variant">vs 98.4% BM</span>
                </div>
              </div>
              {/* Metric Card 2 */}
              <div className="bg-surface-container border border-outline-variant rounded-lg p-md">
                <p className="text-label-caps font-label-caps text-on-surface-variant uppercase mb-1">
                  Sharpe Ratio (Ann)
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-headline-xl font-headline-xl text-on-surface font-bold">
                    1.84
                  </span>
                </div>
              </div>
              {/* Metric Card 3 */}
              <div className="bg-surface-container border border-outline-variant rounded-lg p-md">
                <p className="text-label-caps font-label-caps text-on-surface-variant uppercase mb-1">
                  Volatility (Ann)
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-headline-xl font-headline-xl text-on-surface font-bold">
                    12.5%
                  </span>
                </div>
              </div>
              {/* Metric Card 4 */}
              <div className="bg-surface-container border border-outline-variant rounded-lg p-md">
                <p className="text-label-caps font-label-caps text-on-surface-variant uppercase mb-1">
                  Max Drawdown
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-headline-xl font-headline-xl text-error font-bold">
                    -14.2%
                  </span>
                  <span className="text-xs text-on-surface-variant">Mar 2020</span>
                </div>
              </div>
            </div>

            {/* Main Chart Area */}
            <div className="bg-surface-container border border-outline-variant rounded-lg flex-1 flex flex-col relative overflow-hidden">
              <div className="px-md py-3 border-b border-outline-variant flex justify-between items-center bg-surface-container-high z-10">
                <h3 className="text-body-sm font-medium text-on-surface flex items-center gap-2">
                  <span
                    className="material-symbols-outlined text-sm text-primary"
                    data-icon="show_chart"
                  >
                    show_chart
                  </span>
                  Cumulative Equity Curve
                </h3>
                <div className="flex gap-2">
                  <button className="px-2 py-1 text-[10px] bg-surface border border-outline-variant rounded text-on-surface hover:bg-surface-variant">
                    Log
                  </button>
                  <button className="px-2 py-1 text-[10px] bg-primary text-on-primary border border-primary rounded font-medium">
                    Linear
                  </button>
                </div>
              </div>
              {/* Chart Canvas / Graphic */}
              <div
                className="flex-1 relative p-4 bg-cover bg-center"
                data-alt="A highly detailed, professional UI dashboard chart showing a financial equity curve."
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA6lFhEHl9rETWTLRrsybX1RpdvDk1cSTr3mLlklnUzieaF2eV_bkkTEcxyVGHX-fPapva57VMGPh0w-dHtyykgu5Pn6aWNXa1t15YYGLSsAW37CIVzg31RfCNMyvfXZDqANGegbCLiIcgEUOeARcAiSZ6WG_fixJeN0_PE2FzWROX1mf_GT57U_jgj6rG8Mc_KmBFXu03pqY5ZHNSXRIK1bAkkqfgCLn8KBxNayAXX3OnJpIg4u_0EOw')",
                }}
              >
                {/* Fallback/Overlay styling for the chart area to ensure it looks like a terminal if image fails */}
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container to-transparent opacity-80 pointer-events-none"></div>
                {/* Mock Chart Elements (CSS representation of data density) */}
                <div className="absolute right-4 top-4 bg-surface-container-high/90 border border-outline-variant rounded p-2 text-[10px] font-data-metric-sm space-y-1 backdrop-blur-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-on-surface-variant">Strategy</span>
                    <span className="text-primary font-bold">142.8%</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-on-surface-variant">Benchmark</span>
                    <span className="text-on-surface">98.4%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction Cost Analysis (Bottom Row) */}
            <div className="bg-surface-container border border-outline-variant rounded-lg h-48 flex flex-col">
              <div className="px-md py-2 border-b border-outline-variant bg-surface-container-high">
                <h3 className="text-body-sm font-medium text-on-surface flex items-center gap-2">
                  <span
                    className="material-symbols-outlined text-sm text-on-surface-variant"
                    data-icon="receipt_long"
                  >
                    receipt_long
                  </span>
                  Transaction Cost Analysis (TCA)
                </h3>
              </div>
              <div className="flex-1 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface text-label-caps font-label-caps text-on-surface-variant uppercase border-b border-outline-variant">
                      <th className="px-4 py-2 font-medium">Metric</th>
                      <th className="px-4 py-2 font-medium text-right">
                        Value (bps)
                      </th>
                      <th className="px-4 py-2 font-medium text-right">
                        Impact PnL
                      </th>
                      <th className="px-4 py-2 font-medium">Distribution</th>
                    </tr>
                  </thead>
                  <tbody className="text-data-metric-sm font-data-metric-sm text-on-surface divide-y divide-outline-variant/50">
                    <tr className="hover:bg-surface-variant/50 transition-colors">
                      <td className="px-4 py-2 flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>{" "}
                        Market Impact
                      </td>
                      <td className="px-4 py-2 text-right">4.2</td>
                      <td className="px-4 py-2 text-right text-error">
                        -$14,250
                      </td>
                      <td className="px-4 py-2 w-1/3">
                        <div className="w-full bg-surface h-1.5 rounded-full overflow-hidden flex">
                          <div
                            className="bg-blue-500 h-full"
                            style={{ width: "45%" }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-variant/50 transition-colors">
                      <td className="px-4 py-2 flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>{" "}
                        Slippage vs Arrival
                      </td>
                      <td className="px-4 py-2 text-right">1.8</td>
                      <td className="px-4 py-2 text-right text-error">
                        -$6,120
                      </td>
                      <td className="px-4 py-2 w-1/3">
                        <div className="w-full bg-surface h-1.5 rounded-full overflow-hidden flex">
                          <div
                            className="bg-purple-500 h-full"
                            style={{ width: "20%" }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-variant/50 transition-colors">
                      <td className="px-4 py-2 flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>{" "}
                        Alpha Capture
                      </td>
                      <td className="px-4 py-2 text-right text-green-400">
                        +2.1
                      </td>
                      <td className="px-4 py-2 text-right text-green-400">
                        +$7,400
                      </td>
                      <td className="px-4 py-2 w-1/3">
                        <div className="w-full bg-surface h-1.5 rounded-full overflow-hidden flex">
                          <div
                            className="bg-green-500 h-full"
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

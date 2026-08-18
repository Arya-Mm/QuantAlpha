import Link from "next/link";

export default function Research() {
  return (
    <div className="bg-[#f5f5f2] text-stone-900 font-body-sm text-body-sm min-h-screen flex antialiased w-full">
      {/* SideNavBar */}
      <nav className="w-60 h-full fixed left-0 top-0 bg-white border-r border-[#e5e5df] flex flex-col py-4 z-20 shadow-xs">
        {/* Brand / Header */}
        <div className="px-6 mb-6 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center text-white shadow-2xs">
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              show_chart
            </span>
          </div>
          <div>
            <h1 className="text-headline-md font-headline-md font-bold text-stone-900 tracking-tight">
              QUANT ALPHA
            </h1>
            <p className="text-label-caps text-[10px] text-stone-500 uppercase tracking-wider font-semibold">
              Research Pipeline
            </p>
          </div>
        </div>

        {/* Main Navigation Tabs */}
        <div className="flex-1 flex flex-col gap-1 px-2">
          {/* Overview */}
          <Link
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-stone-600 hover:bg-[#eeeeea] hover:text-stone-900 transition-colors"
            href="/"
          >
            <span className="material-symbols-outlined text-[20px]">
              dashboard
            </span>
            <span className="font-body-sm text-body-sm font-medium">Overview</span>
          </Link>

          {/* Research (ACTIVE) */}
          <Link
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-orange-600 bg-orange-50 font-semibold border border-orange-200/70 transition-all"
            href="/research"
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              science
            </span>
            <span className="font-body-sm text-body-sm font-semibold">
              Research
            </span>
          </Link>

          {/* Signals */}
          <Link
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-stone-600 hover:bg-[#eeeeea] hover:text-stone-900 transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">
              analytics
            </span>
            <span className="font-body-sm text-body-sm font-medium">Signals</span>
          </Link>

          {/* Validation */}
          <Link
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-stone-600 hover:bg-[#eeeeea] hover:text-stone-900 transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">
              rule
            </span>
            <span className="font-body-sm text-body-sm font-medium">Validation</span>
          </Link>

          {/* Backtests */}
          <Link
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-stone-600 hover:bg-[#eeeeea] hover:text-stone-900 transition-colors"
            href="/backtests"
          >
            <span className="material-symbols-outlined text-[20px]">
              history
            </span>
            <span className="font-body-sm text-body-sm font-medium">Backtests</span>
          </Link>

          {/* Portfolio */}
          <Link
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-stone-600 hover:bg-[#eeeeea] hover:text-stone-900 transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">
              account_balance
            </span>
            <span className="font-body-sm text-body-sm font-medium">Portfolio</span>
          </Link>

          {/* Reports */}
          <Link
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-stone-600 hover:bg-[#eeeeea] hover:text-stone-900 transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">
              description
            </span>
            <span className="font-body-sm text-body-sm font-medium">Reports</span>
          </Link>

          {/* Command Center */}
          <Link
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-stone-600 hover:bg-[#eeeeea] hover:text-stone-900 transition-colors"
            href="/command-center"
          >
            <span className="material-symbols-outlined text-[20px]">
              monitoring
            </span>
            <span className="font-body-sm text-body-sm font-medium">Live Monitor</span>
          </Link>
        </div>

        {/* Footer Tabs */}
        <div className="flex flex-col gap-1 px-2 mt-auto pt-4 border-t border-[#e5e5df]">
          <Link
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-stone-600 hover:bg-[#eeeeea] hover:text-stone-900 transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">
              settings
            </span>
            <span className="font-body-sm text-body-sm font-medium">Settings</span>
          </Link>
          <Link
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-stone-600 hover:bg-[#eeeeea] hover:text-stone-900 transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">
              help
            </span>
            <span className="font-body-sm text-body-sm font-medium">Support</span>
          </Link>
        </div>
      </nav>

      {/* TopAppBar */}
      <header className="fixed top-0 right-0 h-16 w-[calc(100%-240px)] bg-white/95 border-b border-[#e5e5df] flex justify-between items-center px-6 z-10 backdrop-blur-md shadow-xs">
        {/* Navigation Links (Left Side) */}
        <div className="flex items-center gap-6 h-full">
          <Link
            className="flex items-center h-full text-orange-600 font-bold border-b-2 border-orange-500 pb-0.5"
            href="/research"
          >
            <span className="font-body-sm text-body-sm">Research</span>
          </Link>
          <Link
            className="flex items-center h-full text-stone-500 hover:text-stone-900 transition-colors"
            href="#"
          >
            <span className="font-body-sm text-body-sm font-medium">Production</span>
          </Link>
        </div>

        {/* Actions & Profile (Right Side) */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 border border-[#e5e5df] rounded-lg bg-[#f8f8f6]">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            <span className="text-xs font-semibold text-stone-700 font-mono">
              NSE Equities
            </span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 border border-emerald-200 rounded-lg bg-emerald-50 text-emerald-800 font-semibold text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>System Active</span>
          </div>
          <div className="w-px h-6 bg-[#e5e5df] mx-1"></div>
          <button className="text-stone-400 hover:text-stone-700 transition-colors flex items-center justify-center w-8 h-8 rounded-lg hover:bg-[#eeeeea]">
            <span className="material-symbols-outlined text-[20px]">
              notifications
            </span>
          </button>
          <button className="text-stone-400 hover:text-stone-700 transition-colors flex items-center justify-center w-8 h-8 rounded-lg hover:bg-[#eeeeea]">
            <span className="material-symbols-outlined text-[20px]">
              settings_input_component
            </span>
          </button>
          <div className="w-8 h-8 rounded-full bg-orange-100 border border-orange-300 overflow-hidden cursor-pointer flex items-center justify-center text-orange-700 font-bold text-xs shadow-2xs">
            QA
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="ml-60 mt-16 p-6 w-full max-w-[1600px] flex flex-col gap-6">
        {/* Page Header & Global Actions */}
        <div className="flex justify-between items-end border-b border-[#e5e5df] pb-4">
          <div>
            <h2 className="text-headline-xl font-headline-xl text-stone-900 mb-1 font-bold tracking-tight">
              Alpha Generation Pipeline
            </h2>
            <p className="text-body-sm font-body-sm text-stone-500 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-stone-400">
                folder_open
              </span>
              Workspace: <code className="text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-200/50 font-mono text-xs">/research/active_candidate_pool/</code>
            </p>
          </div>
          <button className="bg-orange-600 text-white hover:bg-orange-700 transition-colors px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-2xs font-body-sm text-body-sm font-semibold">
            <span className="material-symbols-outlined text-[18px]">add_box</span>
            New Research Run
          </button>
        </div>

        {/* Candidate Signals Section */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <h3 className="text-headline-md font-headline-md text-stone-900 font-semibold">
              Candidate Signals
            </h3>
            <span className="px-2.5 py-0.5 bg-[#eeeeea] border border-[#e5e5df] text-stone-600 text-[11px] font-semibold rounded-full">
              Queued for review
            </span>
          </div>

          {/* Data Table Container */}
          <div className="bg-white border border-[#e5e5df] rounded-lg overflow-x-auto shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#eeeeea] border-b border-[#e5e5df]">
                <tr>
                  <th className="px-4 py-3 text-stone-600 font-label-caps uppercase tracking-wider font-semibold text-[11px]">
                    Signal Name / ID
                  </th>
                  <th className="px-4 py-3 text-stone-600 font-label-caps uppercase tracking-wider font-semibold text-[11px]">
                    Category
                  </th>
                  <th className="px-4 py-3 text-stone-600 font-label-caps uppercase tracking-wider font-semibold text-[11px] text-right">
                    OOS Sharpe (Ann.)
                  </th>
                  <th className="px-4 py-3 text-stone-600 font-label-caps uppercase tracking-wider font-semibold text-[11px] text-right">
                    Max Drawdown
                  </th>
                  <th className="px-4 py-3 text-stone-600 font-label-caps uppercase tracking-wider font-semibold text-[11px]">
                    Validation Status
                  </th>
                  <th className="px-4 py-3 text-stone-600 font-label-caps uppercase tracking-wider font-semibold text-[11px] text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f0ec]">
                {/* Row 1 */}
                <tr className="hover:bg-[#f5f5f2] transition-colors group">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-orange-600 text-[18px]">
                        timeline
                      </span>
                      <div>
                        <div className="text-body-sm font-body-sm text-stone-900 font-semibold">
                          MOM_CROSS_V4
                        </div>
                        <div className="text-data-metric-sm font-data-metric-sm text-stone-400 font-mono text-xs">
                          sig_8f92a_b
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium">
                      <span className="material-symbols-outlined text-[14px]">
                        show_chart
                      </span>{" "}
                      Technical
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-data-metric-sm font-data-metric-sm font-mono text-orange-600 font-bold">
                    1.84
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-data-metric-sm font-data-metric-sm font-mono text-rose-800 font-semibold">
                    -12.4%
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full text-xs font-semibold w-fit">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                      <span>Backtest Running</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <button className="h-7 px-3 bg-white border border-[#d6d3d1] text-stone-700 hover:text-orange-600 hover:border-orange-300 rounded-md transition-colors text-xs font-semibold shadow-2xs">
                      Review
                    </button>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="hover:bg-[#f5f5f2] transition-colors group">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-orange-600 text-[18px]">
                        forum
                      </span>
                      <div>
                        <div className="text-body-sm font-body-sm text-stone-900 font-semibold">
                          SENT_NLP_AGG
                        </div>
                        <div className="text-data-metric-sm font-data-metric-sm text-stone-400 font-mono text-xs">
                          sig_3c11d_a
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-medium">
                      <span className="material-symbols-outlined text-[14px]">
                        psychology
                      </span>{" "}
                      Sentiment
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-data-metric-sm font-data-metric-sm font-mono text-orange-600 font-bold">
                    2.15
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-data-metric-sm font-data-metric-sm font-mono text-stone-700 font-semibold">
                    -8.2%
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-stone-600 bg-[#eeeeea] border border-[#e5e5df] px-2.5 py-0.5 rounded-full text-xs font-medium w-fit">
                      <span className="material-symbols-outlined text-[14px] text-stone-400">
                        pending
                      </span>
                      <span>Awaiting Data</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <button className="h-7 px-3 bg-white border border-[#d6d3d1] text-stone-700 hover:text-orange-600 hover:border-orange-300 rounded-md transition-colors text-xs font-semibold shadow-2xs">
                      Review
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Validated Signals Section */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <h3 className="text-headline-md font-headline-md text-stone-900 font-semibold">
              Validated Signals
            </h3>
            <span className="px-2.5 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold rounded-full">
              Ready for ensemble
            </span>
          </div>

          {/* Data Table Container */}
          <div className="bg-white border border-[#e5e5df] rounded-lg overflow-x-auto shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#eeeeea] border-b border-[#e5e5df]">
                <tr>
                  <th className="px-4 py-3 text-stone-600 font-label-caps uppercase tracking-wider font-semibold text-[11px]">
                    Signal Name / ID
                  </th>
                  <th className="px-4 py-3 text-stone-600 font-label-caps uppercase tracking-wider font-semibold text-[11px]">
                    Category
                  </th>
                  <th className="px-4 py-3 text-stone-600 font-label-caps uppercase tracking-wider font-semibold text-[11px] text-right">
                    OOS Sharpe (Ann.)
                  </th>
                  <th className="px-4 py-3 text-stone-600 font-label-caps uppercase tracking-wider font-semibold text-[11px] text-right">
                    Max Drawdown
                  </th>
                  <th className="px-4 py-3 text-stone-600 font-label-caps uppercase tracking-wider font-semibold text-[11px]">
                    Validation Status
                  </th>
                  <th className="px-4 py-3 text-stone-600 font-label-caps uppercase tracking-wider font-semibold text-[11px] text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f0ec]">
                {/* Row 1 */}
                <tr className="hover:bg-[#f5f5f2] transition-colors group">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-orange-600 text-[18px]">
                        account_balance
                      </span>
                      <div>
                        <div className="text-body-sm font-body-sm text-stone-900 font-semibold">
                          MACRO_YIELD_CURVE
                        </div>
                        <div className="text-data-metric-sm font-data-metric-sm text-stone-400 font-mono text-xs">
                          val_9a22f_x
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#eeeeea] border border-[#e5e5df] text-stone-700 text-xs font-medium">
                      <span className="material-symbols-outlined text-[14px]">
                        public
                      </span>{" "}
                      Macro
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-data-metric-sm font-data-metric-sm font-mono text-orange-600 font-bold">
                    1.42
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-data-metric-sm font-data-metric-sm font-mono text-stone-700 font-semibold">
                    -5.1%
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full text-xs font-semibold w-fit">
                      <span className="material-symbols-outlined text-[14px] text-emerald-600">
                        check_circle
                      </span>
                      <span>Passed Validation</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <button
                      className="h-7 px-2.5 bg-white border border-[#d6d3d1] text-stone-600 hover:text-orange-600 hover:border-orange-300 rounded-md transition-colors text-xs font-semibold shadow-2xs flex items-center justify-center ml-auto"
                      title="View details"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        chevron_right
                      </span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

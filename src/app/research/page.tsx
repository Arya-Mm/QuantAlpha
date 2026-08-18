import Link from "next/link";

export default function Research() {
  return (
    <div className="bg-surface text-on-surface font-body-sm text-body-sm min-h-screen flex antialiased w-full">
      {/* SideNavBar (Shared Component) */}
      <nav className="w-60 h-full fixed left-0 top-0 bg-surface-container-low dark:bg-surface-container-lowest border-r border-outline-variant dark:border-outline-variant flex flex-col py-lg z-20">
        {/* Brand / Header */}
        <div className="px-md mb-xl flex items-center gap-sm">
          <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              terminal
            </span>
          </div>
          <div>
            <h1 className="text-headline-md font-headline-md font-bold text-primary dark:text-primary tracking-tight">
              QuantTerminal
            </h1>
            <p className="text-label-caps font-label-caps text-on-surface-variant uppercase">
              Institutional Research
            </p>
          </div>
        </div>

        {/* Main Navigation Tabs */}
        <div className="flex-1 flex flex-col gap-base px-sm">
          {/* Overview (Inactive) */}
          <Link
            className="flex items-center gap-md px-md py-sm rounded-DEFAULT text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-variant dark:hover:bg-surface-variant hover:text-on-surface dark:hover:text-on-surface transition-colors group"
            href="/"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:text-on-surface transition-colors">
              dashboard
            </span>
            <span className="font-body-sm text-body-sm">Overview</span>
          </Link>

          {/* Research (ACTIVE) */}
          <Link
            className="flex items-center gap-md px-md py-sm rounded-DEFAULT text-primary dark:text-primary bg-primary-container/10 border-r-2 border-primary opacity-90 transition-all duration-150"
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

          {/* Signals (Inactive) */}
          <Link
            className="flex items-center gap-md px-md py-sm rounded-DEFAULT text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-variant dark:hover:bg-surface-variant hover:text-on-surface dark:hover:text-on-surface transition-colors group"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:text-on-surface transition-colors">
              analytics
            </span>
            <span className="font-body-sm text-body-sm">Signals</span>
          </Link>

          {/* Validation (Inactive) */}
          <Link
            className="flex items-center gap-md px-md py-sm rounded-DEFAULT text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-variant dark:hover:bg-surface-variant hover:text-on-surface dark:hover:text-on-surface transition-colors group"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:text-on-surface transition-colors">
              rule
            </span>
            <span className="font-body-sm text-body-sm">Validation</span>
          </Link>

          {/* Backtests (Inactive) */}
          <Link
            className="flex items-center gap-md px-md py-sm rounded-DEFAULT text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-variant dark:hover:bg-surface-variant hover:text-on-surface dark:hover:text-on-surface transition-colors group"
            href="/backtests"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:text-on-surface transition-colors">
              history_edu
            </span>
            <span className="font-body-sm text-body-sm">Backtests</span>
          </Link>

          {/* Portfolio (Inactive) */}
          <Link
            className="flex items-center gap-md px-md py-sm rounded-DEFAULT text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-variant dark:hover:bg-surface-variant hover:text-on-surface dark:hover:text-on-surface transition-colors group"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:text-on-surface transition-colors">
              account_balance_wallet
            </span>
            <span className="font-body-sm text-body-sm">Portfolio</span>
          </Link>

          {/* Reports (Inactive) */}
          <Link
            className="flex items-center gap-md px-md py-sm rounded-DEFAULT text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-variant dark:hover:bg-surface-variant hover:text-on-surface dark:hover:text-on-surface transition-colors group"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:text-on-surface transition-colors">
              description
            </span>
            <span className="font-body-sm text-body-sm">Reports</span>
          </Link>

          {/* Command Center (Inactive) */}
          <Link
            className="flex items-center gap-md px-md py-sm rounded-DEFAULT text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-variant dark:hover:bg-surface-variant hover:text-on-surface dark:hover:text-on-surface transition-colors group"
            href="/command-center"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:text-on-surface transition-colors">
              monitoring
            </span>
            <span className="font-body-sm text-body-sm">Live Monitor</span>
          </Link>
        </div>

        {/* Footer Tabs */}
        <div className="flex flex-col gap-base px-sm mt-auto pt-lg border-t border-outline-variant/30">
          {/* Settings */}
          <Link
            className="flex items-center gap-md px-md py-sm rounded-DEFAULT text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-variant dark:hover:bg-surface-variant hover:text-on-surface dark:hover:text-on-surface transition-colors group"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:text-on-surface transition-colors">
              settings
            </span>
            <span className="font-body-sm text-body-sm">Settings</span>
          </Link>
          {/* Support */}
          <Link
            className="flex items-center gap-md px-md py-sm rounded-DEFAULT text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-variant dark:hover:bg-surface-variant hover:text-on-surface dark:hover:text-on-surface transition-colors group"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:text-on-surface transition-colors">
              help
            </span>
            <span className="font-body-sm text-body-sm">Support</span>
          </Link>
        </div>
      </nav>

      {/* TopAppBar (Shared Component) */}
      <header className="fixed top-0 right-0 h-16 w-[calc(100%-240px)] bg-surface-container-low dark:bg-surface-container-low border-b border-outline-variant dark:border-outline-variant flex justify-between items-center px-lg z-10 backdrop-blur-sm bg-opacity-95">
        {/* Navigation Links (Left Side) */}
        <div className="flex items-center gap-lg h-full">
          {/* Research (ACTIVE) */}
          <Link
            className="flex items-center h-full text-primary dark:text-primary font-bold border-b-2 border-primary pb-1 scale-95 transition-transform"
            href="/research"
          >
            <span className="font-body-sm text-body-sm">Research</span>
          </Link>
          {/* Production (Inactive) */}
          <Link
            className="flex items-center h-full text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-primary transition-opacity"
            href="#"
          >
            <span className="font-body-sm text-body-sm">Production</span>
          </Link>
        </div>

        {/* Actions & Profile (Right Side) */}
        <div className="flex items-center gap-md">
          {/* Secondary Action */}
          <div className="hidden md:flex items-center gap-xs px-sm py-1 border border-outline-variant rounded-DEFAULT bg-surface">
            <span className="w-2 h-2 rounded-full bg-secondary-fixed"></span>
            <span className="text-data-metric-sm font-data-metric-sm text-on-surface-variant">
              US Equities
            </span>
          </div>
          {/* Primary Action */}
          <div className="hidden md:flex items-center gap-xs px-sm py-1 border border-primary/30 rounded-DEFAULT bg-primary/10 text-primary">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-data-metric-sm font-data-metric-sm">
              System Active
            </span>
          </div>
          <div className="w-px h-6 bg-outline-variant mx-sm"></div>
          {/* Icon Actions */}
          <button className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center w-8 h-8 rounded hover:bg-surface-variant">
            <span className="material-symbols-outlined text-[20px]">
              notifications
            </span>
          </button>
          <button className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center w-8 h-8 rounded hover:bg-surface-variant">
            <span className="material-symbols-outlined text-[20px]">
              settings_input_component
            </span>
          </button>
          {/* Profile Avatar */}
          <div className="w-8 h-8 rounded-full bg-surface-variant border border-outline-variant overflow-hidden ml-sm cursor-pointer hover:border-primary transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
              person
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="ml-60 mt-16 p-lg w-full max-w-[1600px] flex flex-col gap-xl">
        {/* Page Header & Global Actions */}
        <div className="flex justify-between items-end border-b border-outline-variant/50 pb-sm">
          <div>
            <h2 className="text-headline-xl font-headline-xl text-on-surface mb-xs">
              Alpha Generation pipeline
            </h2>
            <p className="text-body-sm font-body-sm text-on-surface-variant flex items-center gap-sm">
              <span className="material-symbols-outlined text-[16px]">
                folder_open
              </span>
              Workspace: /research/active_candidate_pool/
            </p>
          </div>
          <button className="bg-primary text-on-primary hover:bg-primary-fixed transition-colors px-md py-sm rounded-DEFAULT flex items-center gap-xs shadow-sm font-body-sm text-body-sm font-medium">
            <span className="material-symbols-outlined text-[18px]">add_box</span>
            New Research Run
          </button>
        </div>

        {/* Candidate Signals Section */}
        <section className="flex flex-col gap-md">
          <div className="flex items-center gap-sm">
            <h3 className="text-headline-md font-headline-md text-on-surface">
              Candidate Signals
            </h3>
            <span className="px-2 py-0.5 bg-surface-variant text-on-surface-variant text-label-caps font-label-caps rounded">
              Queued for review
            </span>
          </div>

          {/* Data Table Container (Level 2) */}
          <div className="bg-surface-container border border-outline-variant rounded-lg overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#111827] border-b border-outline-variant">
                <tr>
                  <th className="px-md py-sm text-label-caps font-label-caps text-on-surface-variant uppercase tracking-wider font-semibold">
                    Signal Name / ID
                  </th>
                  <th className="px-md py-sm text-label-caps font-label-caps text-on-surface-variant uppercase tracking-wider font-semibold">
                    Category
                  </th>
                  <th className="px-md py-sm text-label-caps font-label-caps text-on-surface-variant uppercase tracking-wider font-semibold text-right">
                    OOS Sharpe (Ann.)
                  </th>
                  <th className="px-md py-sm text-label-caps font-label-caps text-on-surface-variant uppercase tracking-wider font-semibold text-right">
                    Max Drawdown
                  </th>
                  <th className="px-md py-sm text-label-caps font-label-caps text-on-surface-variant uppercase tracking-wider font-semibold">
                    Validation Status
                  </th>
                  <th className="px-md py-sm text-label-caps font-label-caps text-on-surface-variant uppercase tracking-wider font-semibold text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/50">
                {/* Row 1 */}
                <tr className="hover:bg-surface-variant/30 transition-colors group">
                  <td className="px-md py-sm whitespace-nowrap">
                    <div className="flex items-center gap-sm">
                      <span className="material-symbols-outlined text-primary text-[18px]">
                        timeline
                      </span>
                      <div>
                        <div className="text-body-sm font-body-sm text-on-surface font-medium">
                          MOM_CROSS_V4
                        </div>
                        <div className="text-data-metric-sm font-data-metric-sm text-on-surface-variant opacity-70">
                          sig_8f92a_b
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-md py-sm whitespace-nowrap">
                    <span className="inline-flex items-center gap-xs px-2 py-1 rounded bg-secondary-container/20 border border-secondary-container/30 text-secondary text-xs">
                      <span className="material-symbols-outlined text-[14px]">
                        show_chart
                      </span>{" "}
                      Technical
                    </span>
                  </td>
                  <td className="px-md py-sm whitespace-nowrap text-right text-data-metric-sm font-data-metric-sm text-primary">
                    1.84
                  </td>
                  <td className="px-md py-sm whitespace-nowrap text-right text-data-metric-sm font-data-metric-sm text-error">
                    -12.4%
                  </td>
                  <td className="px-md py-sm whitespace-nowrap">
                    <div className="flex items-center gap-xs text-tertiary">
                      <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
                      <span className="text-body-sm font-body-sm text-xs">
                        Backtest Running
                      </span>
                    </div>
                  </td>
                  <td className="px-md py-sm whitespace-nowrap text-right">
                    <button className="h-7 px-3 bg-transparent border border-outline-variant text-on-surface-variant hover:text-on-surface hover:border-primary hover:bg-primary/5 rounded transition-colors text-xs font-medium">
                      Review
                    </button>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="hover:bg-surface-variant/30 transition-colors group">
                  <td className="px-md py-sm whitespace-nowrap">
                    <div className="flex items-center gap-sm">
                      <span className="material-symbols-outlined text-primary text-[18px]">
                        forum
                      </span>
                      <div>
                        <div className="text-body-sm font-body-sm text-on-surface font-medium">
                          SENT_NLP_AGG
                        </div>
                        <div className="text-data-metric-sm font-data-metric-sm text-on-surface-variant opacity-70">
                          sig_3c11d_a
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-md py-sm whitespace-nowrap">
                    <span className="inline-flex items-center gap-xs px-2 py-1 rounded bg-tertiary-container/10 border border-tertiary-container/30 text-tertiary text-xs">
                      <span className="material-symbols-outlined text-[14px]">
                        psychology
                      </span>{" "}
                      Sentiment
                    </span>
                  </td>
                  <td className="px-md py-sm whitespace-nowrap text-right text-data-metric-sm font-data-metric-sm text-primary">
                    2.15
                  </td>
                  <td className="px-md py-sm whitespace-nowrap text-right text-data-metric-sm font-data-metric-sm text-on-surface">
                    -8.2%
                  </td>
                  <td className="px-md py-sm whitespace-nowrap">
                    <div className="flex items-center gap-xs text-on-surface-variant">
                      <span className="material-symbols-outlined text-[14px]">
                        pending
                      </span>
                      <span className="text-body-sm font-body-sm text-xs">
                        Awaiting Data
                      </span>
                    </div>
                  </td>
                  <td className="px-md py-sm whitespace-nowrap text-right">
                    <button className="h-7 px-3 bg-transparent border border-outline-variant text-on-surface-variant hover:text-on-surface hover:border-primary hover:bg-primary/5 rounded transition-colors text-xs font-medium">
                      Review
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Validated Signals Section */}
        <section className="flex flex-col gap-md">
          <div className="flex items-center gap-sm">
            <h3 className="text-headline-md font-headline-md text-on-surface">
              Validated Signals
            </h3>
            <span className="px-2 py-0.5 bg-primary/10 border border-primary/20 text-primary text-label-caps font-label-caps rounded">
              Ready for ensemble
            </span>
          </div>

          {/* Data Table Container (Level 2) */}
          <div className="bg-surface-container border border-outline-variant rounded-lg overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#111827] border-b border-outline-variant">
                <tr>
                  <th className="px-md py-sm text-label-caps font-label-caps text-on-surface-variant uppercase tracking-wider font-semibold">
                    Signal Name / ID
                  </th>
                  <th className="px-md py-sm text-label-caps font-label-caps text-on-surface-variant uppercase tracking-wider font-semibold">
                    Category
                  </th>
                  <th className="px-md py-sm text-label-caps font-label-caps text-on-surface-variant uppercase tracking-wider font-semibold text-right">
                    OOS Sharpe (Ann.)
                  </th>
                  <th className="px-md py-sm text-label-caps font-label-caps text-on-surface-variant uppercase tracking-wider font-semibold text-right">
                    Max Drawdown
                  </th>
                  <th className="px-md py-sm text-label-caps font-label-caps text-on-surface-variant uppercase tracking-wider font-semibold">
                    Validation Status
                  </th>
                  <th className="px-md py-sm text-label-caps font-label-caps text-on-surface-variant uppercase tracking-wider font-semibold text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/50">
                {/* Row 1 */}
                <tr className="hover:bg-surface-variant/30 transition-colors group">
                  <td className="px-md py-sm whitespace-nowrap">
                    <div className="flex items-center gap-sm">
                      <span className="material-symbols-outlined text-primary text-[18px]">
                        account_balance
                      </span>
                      <div>
                        <div className="text-body-sm font-body-sm text-on-surface font-medium">
                          MACRO_YIELD_CURVE
                        </div>
                        <div className="text-data-metric-sm font-data-metric-sm text-on-surface-variant opacity-70">
                          val_9a22f_x
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-md py-sm whitespace-nowrap">
                    <span className="inline-flex items-center gap-xs px-2 py-1 rounded bg-surface-variant border border-outline-variant text-on-surface-variant text-xs">
                      <span className="material-symbols-outlined text-[14px]">
                        public
                      </span>{" "}
                      Macro
                    </span>
                  </td>
                  <td className="px-md py-sm whitespace-nowrap text-right text-data-metric-sm font-data-metric-sm text-primary">
                    1.42
                  </td>
                  <td className="px-md py-sm whitespace-nowrap text-right text-data-metric-sm font-data-metric-sm text-on-surface">
                    -5.1%
                  </td>
                  <td className="px-md py-sm whitespace-nowrap">
                    <div className="flex items-center gap-xs text-[#4ade80]">
                      <span className="material-symbols-outlined text-[16px]">
                        check_circle
                      </span>
                      <span className="text-body-sm font-body-sm text-xs text-on-surface">
                        Passed Validation
                      </span>
                    </div>
                  </td>
                  <td className="px-md py-sm whitespace-nowrap text-right">
                    <button
                      className="h-7 px-3 bg-transparent border border-outline-variant text-on-surface-variant hover:text-on-surface hover:border-primary hover:bg-primary/5 rounded transition-colors text-xs font-medium"
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

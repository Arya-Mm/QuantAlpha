"use client";

import { useState } from "react";
import Link from "next/link";
import { SignalItem, SignalCategory } from "../../types/quant";
import { INITIAL_CANDIDATE_SIGNALS, INITIAL_VALIDATED_SIGNALS } from "../../services/quantApi";

export default function Research() {
  const [candidates, setCandidates] = useState<SignalItem[]>(INITIAL_CANDIDATE_SIGNALS);
  const [validated, setValidated] = useState<SignalItem[]>(INITIAL_VALIDATED_SIGNALS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<SignalCategory | "All">("All");
  const [isValidating, setIsValidating] = useState(false);
  const [validationStep, setValidationStep] = useState<string | null>(null);
  const [showMethodologyModal, setShowMethodologyModal] = useState(false);
  const [inspectingSignal, setInspectingSignal] = useState<SignalItem | null>(null);

  const handleRunValidation = async () => {
    if (isValidating || candidates.length === 0) return;
    setIsValidating(true);

    const steps = [
      "1/5: Generating triple-barrier labels from price history...",
      "2/5: Purging overlapping label windows (eliminating lookahead bias)...",
      "3/5: Applying dynamic embargo (τ = 1% of dataset)...",
      "4/5: Generating Combinatorial Purged K-Fold paths (CPCV)...",
      "5/5: Computing Deflated Sharpe Ratio (DSR) & PBO validation...",
    ];

    for (let i = 0; i < steps.length; i++) {
      setValidationStep(steps[i]);
      await new Promise((res) => setTimeout(res, 800));
    }

    // Call REAL validation API
    try {
      const topCandidate = candidates[0];
      if (!topCandidate) {
        setIsValidating(false);
        setValidationStep(null);
        return;
      }

      setValidationStep("Running real validation engine...");
      
      const { runRealValidation } = await import("../../services/quantApi");
      const result = await runRealValidation(topCandidate.id, 5, 0.01, 50);

      if (result.status === "APPROVED") {
        // Graduate to validated
        const graduatedSignal: SignalItem = result.signal;
        setValidated((prev) => [graduatedSignal, ...prev]);
        setCandidates((prev) => prev.filter(s => s.id !== topCandidate.id));
        
        setValidationStep(`✓ APPROVED: DSR=${result.validation_details.dsr.toFixed(2)}, PBO=${result.validation_details.pbo.toFixed(2)}`);
      } else {
        // Validation failed
        setValidationStep(`✗ REJECTED: ${result.rejection_reasons.pbo_failed ? 'PBO failed' : ''} ${result.rejection_reasons.dsr_failed ? 'DSR failed' : ''}`);
        setCandidates((prev) => prev.map(s => 
          s.id === topCandidate.id ? { ...s, status: "FDR Rejected" as const } : s
        ));
      }

      await new Promise((res) => setTimeout(res, 3000));
    } catch (error) {
      console.error("Validation failed:", error);
      setValidationStep("✗ Validation engine error - check backend connection");
      await new Promise((res) => setTimeout(res, 3000));
    }

    setValidationStep(null);
    setIsValidating(false);
  };

  const filterSignals = (list: SignalItem[]) => {
    return list.filter((sig) => {
      const matchesSearch = 
        sig.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sig.code.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = selectedCategory === "All" || sig.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  };

  const filteredCandidates = filterSignals(candidates);
  const filteredValidated = filterSignals(validated);

  return (
    <div className="bg-[#f5f5f2] text-stone-900 font-body-sm text-body-sm min-h-screen flex antialiased w-full relative">
      {/* Methodology Modal */}
      {showMethodologyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white border border-[#e5e5df] rounded-xl max-w-2xl w-full p-6 shadow-xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#e5e5df] pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-orange-600 text-2xl">menu_book</span>
                <h3 className="font-headline-md text-lg font-bold text-stone-900">
                  Statistical Validation Methodology
                </h3>
              </div>
              <button 
                onClick={() => setShowMethodologyModal(false)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="space-y-4 text-xs text-stone-700 leading-relaxed">
              {/* Section 1 */}
              <div className="bg-[#f8f8f6] border border-[#e5e5df] p-3.5 rounded-lg space-y-1.5">
                <h4 className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  1. Purged K-Fold Cross-Validation &amp; Dynamic Embargo
                </h4>
                <p className="text-stone-600">
                  Standard cross-validation leaks lookahead information because financial labels span multiple bars. We purge training labels that overlap with test evaluation windows and apply a dynamic embargo period:
                </p>
                <code className="block font-mono bg-white p-2 border border-[#e5e5df] rounded text-[11px] text-stone-800">
                  Embargo Window: t_train &gt; max(t_test_end) + tau_embargo (where tau = 5 trading days)
                </code>
              </div>

              {/* Section 2 */}
              <div className="bg-[#f8f8f6] border border-[#e5e5df] p-3.5 rounded-lg space-y-1.5">
                <h4 className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  2. Deflated Sharpe Ratio (DSR) &amp; PBO
                </h4>
                <p className="text-stone-600">
                  Corrects standard Sharpe Ratio for multiple testing selection bias, non-normality (skewness &amp; kurtosis), and track record length (Bailey &amp; López de Prado):
                </p>
                <code className="block font-mono bg-white p-2 border border-[#e5e5df] rounded text-[11px] text-stone-800">
                  DSR = Phi[ (SR - SR_0) * sqrt(T - 1) / sqrt(1 - gamma_3 * SR + ((gamma_4 - 1)/4) * SR^2) ]
                </code>
                <p className="text-stone-500 text-[11px]">
                  Criteria: Signals require <strong>DSR &gt; 0.95</strong> and <strong>PBO &le; 0.50</strong> to graduate to production.
                </p>
              </div>

              {/* Section 3 */}
              <div className="bg-[#f8f8f6] border border-[#e5e5df] p-3.5 rounded-lg space-y-1.5">
                <h4 className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  3. FinBERT NLP Sentiment Pipeline
                </h4>
                <p className="text-stone-600">
                  Domain-specific FinBERT model trained on financial corpora parses news headlines and regulatory corporate disclosures from Indian exchanges (NSE/BSE), extracting continuous polarity vectors with decay weighting.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-[#e5e5df]">
              <button
                onClick={() => setShowMethodologyModal(false)}
                className="px-4 py-1.5 bg-orange-600 text-white font-semibold text-xs rounded-lg hover:bg-orange-700 transition-colors cursor-pointer shadow-2xs"
              >
                Close Reference
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Signal Details Modal */}
      {inspectingSignal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white border border-[#e5e5df] rounded-xl max-w-lg w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#e5e5df] pb-3">
              <div>
                <h3 className="font-headline-md text-lg font-bold text-stone-900">
                  {inspectingSignal.name}
                </h3>
                <span className="text-xs font-mono text-stone-500">{inspectingSignal.code}</span>
              </div>
              <button 
                onClick={() => setInspectingSignal(null)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-stone-500 font-bold uppercase tracking-wider text-[10px] block mb-1">
                  Description
                </span>
                <p className="text-stone-700 bg-[#f8f8f6] p-2.5 rounded-lg border border-[#e5e5df]">
                  {inspectingSignal.description}
                </p>
              </div>

              <div>
                <span className="text-stone-500 font-bold uppercase tracking-wider text-[10px] block mb-1">
                  Signal Specification Formula
                </span>
                <code className="block font-mono bg-[#eeeeea] p-2.5 rounded-lg border border-[#e5e5df] text-stone-900 text-[11px] overflow-x-auto">
                  {inspectingSignal.formula}
                </code>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1">
                <div className="bg-[#f8f8f6] border border-[#e5e5df] p-2 rounded-lg text-center">
                  <span className="text-[10px] text-stone-500 font-bold uppercase block">OOS Sharpe</span>
                  <span className="font-mono text-base font-bold text-orange-600">+{inspectingSignal.oosSharpe}</span>
                </div>
                <div className="bg-[#f8f8f6] border border-[#e5e5df] p-2 rounded-lg text-center">
                  <span className="text-[10px] text-stone-500 font-bold uppercase block">DSR Confidence</span>
                  <span className="font-mono text-base font-bold text-emerald-700">{inspectingSignal.dsr}</span>
                </div>
                <div className="bg-[#f8f8f6] border border-[#e5e5df] p-2 rounded-lg text-center">
                  <span className="text-[10px] text-stone-500 font-bold uppercase block">Max DD</span>
                  <span className="font-mono text-base font-bold text-rose-800">{inspectingSignal.maxDrawdown}%</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-[#e5e5df]">
              <button
                onClick={() => setInspectingSignal(null)}
                className="px-4 py-1.5 bg-[#eeeeea] hover:bg-[#e4e4dd] text-stone-700 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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
          <Link
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-stone-600 hover:bg-[#eeeeea] hover:text-stone-900 transition-colors"
            href="/"
          >
            <span className="material-symbols-outlined text-[20px]">
              dashboard
            </span>
            <span className="font-body-sm text-body-sm font-medium">Overview</span>
          </Link>

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

          <Link
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-stone-600 hover:bg-[#eeeeea] hover:text-stone-900 transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">
              analytics
            </span>
            <span className="font-body-sm text-body-sm font-medium">Signals</span>
          </Link>

          <Link
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-stone-600 hover:bg-[#eeeeea] hover:text-stone-900 transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">
              rule
            </span>
            <span className="font-body-sm text-body-sm font-medium">Validation</span>
          </Link>

          <Link
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-stone-600 hover:bg-[#eeeeea] hover:text-stone-900 transition-colors"
            href="/backtests"
          >
            <span className="material-symbols-outlined text-[20px]">
              history
            </span>
            <span className="font-body-sm text-body-sm font-medium">Backtests</span>
          </Link>

          <Link
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-stone-600 hover:bg-[#eeeeea] hover:text-stone-900 transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">
              account_balance
            </span>
            <span className="font-body-sm text-body-sm font-medium">Portfolio</span>
          </Link>

          <Link
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-stone-600 hover:bg-[#eeeeea] hover:text-stone-900 transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">
              description
            </span>
            <span className="font-body-sm text-body-sm font-medium">Reports</span>
          </Link>

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
        <div className="flex items-center gap-6 h-full">
          <Link
            className="flex items-center h-full text-orange-600 font-bold border-b-2 border-orange-500 pb-0.5"
            href="/research"
          >
            <span className="font-body-sm text-body-sm">Research</span>
          </Link>
          <button 
            onClick={() => setShowMethodologyModal(true)}
            className="flex items-center gap-1.5 h-full text-stone-500 hover:text-orange-600 transition-colors font-medium cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">menu_book</span>
            <span className="font-body-sm text-body-sm">Statistical Methodology</span>
          </button>
        </div>

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
          <div className="w-8 h-8 rounded-full bg-orange-100 border border-orange-300 flex items-center justify-center text-orange-700 font-bold text-xs shadow-2xs">
            QA
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="ml-60 mt-16 p-6 w-full max-w-[1600px] flex flex-col gap-6">
        {/* Header & Global Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#e5e5df] pb-4">
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

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowMethodologyModal(true)}
              className="border border-[#d6d3d1] bg-white text-stone-700 hover:bg-[#eeeeea] transition-colors px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-2xs font-body-sm text-xs font-semibold cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">menu_book</span>
              Methodology
            </button>
            <button 
              onClick={handleRunValidation}
              disabled={isValidating || candidates.length === 0}
              className={`bg-orange-600 text-white hover:bg-orange-700 transition-colors px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-2xs font-body-sm text-xs font-semibold cursor-pointer active:scale-95 ${isValidating ? "opacity-75 cursor-not-allowed" : ""}`}
            >
              <span className={`material-symbols-outlined text-[16px] ${isValidating ? "animate-spin" : ""}`}>
                {isValidating ? "refresh" : "verified"}
              </span>
              {isValidating ? "Validating CPCV..." : "Run Purged K-Fold Validation"}
            </button>
          </div>
        </div>

        {/* Validation Progress Banner */}
        {validationStep && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-center gap-3 shadow-2xs">
            <span className="material-symbols-outlined text-orange-600 animate-spin">refresh</span>
            <div className="flex-1">
              <p className="text-xs font-semibold text-orange-900">{validationStep}</p>
              <div className="w-full bg-orange-200/60 rounded-full h-1 mt-1.5 overflow-hidden">
                <div className="bg-orange-600 h-1 rounded-full animate-pulse" style={{ width: "80%" }}></div>
              </div>
            </div>
          </div>
        )}

        {/* Filter & Search Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-lg border border-[#e5e5df] shadow-xs">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-stone-500 font-bold uppercase tracking-wider">Filter:</span>
            {(["All", "Technical", "Sentiment", "Macro", "Statistical Arbitrage"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-orange-600 text-white font-semibold shadow-2xs"
                    : "bg-[#eeeeea] text-stone-600 hover:bg-[#e4e4dd]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400 text-sm">
              search
            </span>
            <input
              type="text"
              placeholder="Search signals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#f8f8f6] text-stone-900 text-xs rounded-lg border border-[#e5e5df] pl-8 pr-3 py-1.5 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Candidate Signals Section */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <h3 className="text-headline-md font-headline-md text-stone-900 font-semibold">
              Candidate Signals
            </h3>
            <span className="px-2.5 py-0.5 bg-[#eeeeea] border border-[#e5e5df] text-stone-600 text-[11px] font-semibold rounded-full">
              {filteredCandidates.length} Queued for review
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
                {filteredCandidates.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-xs text-stone-400">
                      No candidate signals match the filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredCandidates.map((sig) => (
                    <tr key={sig.id} className="hover:bg-[#f5f5f2] transition-colors group">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-orange-600 text-[18px]">
                            {sig.category === "Sentiment" ? "forum" : sig.category === "Statistical Arbitrage" ? "tune" : "timeline"}
                          </span>
                          <div>
                            <div className="text-body-sm font-body-sm text-stone-900 font-semibold">
                              {sig.name}
                            </div>
                            <div className="text-data-metric-sm font-data-metric-sm text-stone-400 font-mono text-xs">
                              {sig.code}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          sig.category === "Sentiment" ? "bg-purple-50 border-purple-200 text-purple-700" :
                          sig.category === "Statistical Arbitrage" ? "bg-amber-50 border-amber-200 text-amber-800" :
                          "bg-blue-50 border-blue-200 text-blue-700"
                        }`}>
                          {sig.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-data-metric-sm font-data-metric-sm font-mono text-orange-600 font-bold">
                        +{sig.oosSharpe}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-data-metric-sm font-data-metric-sm font-mono text-rose-800 font-semibold">
                        {sig.maxDrawdown}%
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold w-fit border ${
                          sig.status === "Backtest Running" ? "text-amber-800 bg-amber-50 border-amber-200" : "text-stone-600 bg-[#eeeeea] border-[#e5e5df]"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${sig.status === "Backtest Running" ? "bg-amber-500 animate-pulse" : "bg-stone-400"}`}></span>
                          <span>{sig.status}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right">
                        <button 
                          onClick={() => setInspectingSignal(sig)}
                          className="h-7 px-3 bg-white border border-[#d6d3d1] text-stone-700 hover:text-orange-600 hover:border-orange-300 rounded-md transition-colors text-xs font-semibold shadow-2xs cursor-pointer"
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  ))
                )}
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
              {filteredValidated.length} Passed Purged K-Fold &amp; DSR
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
                    DSR Score
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
                {filteredValidated.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-xs text-stone-400">
                      No validated signals match the filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredValidated.map((sig) => (
                    <tr key={sig.id} className="hover:bg-[#f5f5f2] transition-colors group">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-orange-600 text-[18px]">
                            {sig.category === "Macro" ? "account_balance" : "auto_graph"}
                          </span>
                          <div>
                            <div className="text-body-sm font-body-sm text-stone-900 font-semibold">
                              {sig.name}
                            </div>
                            <div className="text-data-metric-sm font-data-metric-sm text-stone-400 font-mono text-xs">
                              {sig.code}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#eeeeea] border border-[#e5e5df] text-stone-700 text-xs font-medium">
                          {sig.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-data-metric-sm font-data-metric-sm font-mono text-orange-600 font-bold">
                        +{sig.oosSharpe}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-data-metric-sm font-data-metric-sm font-mono text-emerald-800 font-bold">
                        {sig.dsr}
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
                          onClick={() => setInspectingSignal(sig)}
                          className="h-7 px-3 bg-white border border-[#d6d3d1] text-stone-600 hover:text-orange-600 hover:border-orange-300 rounded-md transition-colors text-xs font-semibold shadow-2xs cursor-pointer ml-auto"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

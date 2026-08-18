"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ActivityLogEvent, RiskGateConstraint, AgentRole } from "../../types/quant";
import { INITIAL_ACTIVITY_LOG, INITIAL_RISK_CONSTRAINTS } from "../../services/quantApi";

export default function CommandCenter() {
  const [mode, setMode] = useState<"Manual" | "Assisted" | "Auto Paper">("Auto Paper");
  const [isHalted, setIsHalted] = useState(false);
  const [showKillModal, setShowKillModal] = useState(false);
  const [filterAgent, setFilterAgent] = useState<AgentRole | "All">("All");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [activityLogs, setActivityLogs] = useState<ActivityLogEvent[]>(INITIAL_ACTIVITY_LOG);
  const [riskConstraints] = useState<RiskGateConstraint[]>(INITIAL_RISK_CONSTRAINTS);
  const [epochCount, setEpochCount] = useState(42);

  // Simulated live event ticker for Auto Paper mode
  useEffect(() => {
    if (mode !== "Auto Paper" || isHalted) return;

    const interval = setInterval(() => {
      setEpochCount((prev) => prev + 1);
      const sampleEvents: ActivityLogEvent[] = [
        {
          id: `evt-${Date.now()}-1`,
          timestamp: new Date().toLocaleTimeString("en-IN", { hour12: false }),
          agent: "Execution",
          action: "TWAP Slice #4 filled (NSE Paper)",
          evidence: "12 RELIANCE @ ₹2,845.20 (Arrival Slip: +0.02 bps)",
          status: "success",
        },
        {
          id: `evt-${Date.now()}-2`,
          timestamp: new Date().toLocaleTimeString("en-IN", { hour12: false }),
          agent: "Risk",
          action: "Pre-Trade Beta check passed",
          evidence: "Portfolio Net Beta = +0.038 (Target: [-0.1, +0.1])",
          status: "success",
        },
        {
          id: `evt-${Date.now()}-3`,
          timestamp: new Date().toLocaleTimeString("en-IN", { hour12: false }),
          agent: "Strategy",
          action: "Scanned Momentum Breakout on NIFTY IT",
          evidence: "INFY z-score: +2.34σ | FinBERT Score: +0.82",
          status: "info",
        },
      ];

      const newEvent = sampleEvents[Math.floor(Math.random() * sampleEvents.length)];
      setActivityLogs((prev) => [newEvent, ...prev.slice(0, 19)]);
    }, 15000);

    return () => clearInterval(interval);
  }, [mode, isHalted]);

  const handleTriggerKillSwitch = () => {
    setIsHalted(true);
    setShowKillModal(false);
    const haltEvent: ActivityLogEvent = {
      id: `evt-kill-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString("en-IN", { hour12: false }),
      agent: "Risk",
      action: "EMERGENCY KILL SWITCH ENGAGED - TRADING HALTED",
      evidence: "All 14 active paper orders canceled. Open exposure liquidated to Cash.",
      status: "breach",
    };
    setActivityLogs((prev) => [haltEvent, ...prev]);
  };

  const handleResumeSystem = () => {
    setIsHalted(false);
    const resumeEvent: ActivityLogEvent = {
      id: `evt-resume-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString("en-IN", { hour12: false }),
      agent: "Risk",
      action: "System Resumed: Autonomy checks initialized",
      evidence: "Pre-Trade risk constraints re-verified. Resuming Paper mode.",
      status: "success",
    };
    setActivityLogs((prev) => [resumeEvent, ...prev]);
  };

  const filteredLogs = filterAgent === "All" 
    ? activityLogs 
    : activityLogs.filter((log) => log.agent === filterAgent);

  return (
    <div className="flex w-full min-h-screen bg-[#f5f5f2] text-stone-900 font-body-sm h-screen overflow-hidden antialiased relative">
      {/* Kill Switch Modal */}
      {showKillModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white border border-[#e5e5df] rounded-xl max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-3 text-rose-800">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">warning</span>
              </div>
              <div>
                <h3 className="font-headline-md text-lg font-bold text-stone-900">
                  Emergency Kill Switch
                </h3>
                <p className="text-xs text-stone-500 font-medium">
                  Immediate Risk Mitigation Protocol
                </p>
              </div>
            </div>
            <p className="text-body-sm text-stone-600 text-xs leading-relaxed">
              Engaging the Kill Switch will immediately <strong>cancel all pending orders</strong> on the broker router and <strong>liquidate all open equity positions</strong> to 100% Cash. The autonomous daemon will be locked until manually resumed.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowKillModal(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg border border-[#d6d3d1] text-stone-700 hover:bg-[#eeeeea] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleTriggerKillSwitch}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-rose-700 text-white hover:bg-rose-800 transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">power_settings_new</span>
                Confirm &amp; Halt System
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SideNavBar */}
      <aside className="w-60 h-full fixed left-0 top-0 border-r border-[#e5e5df] bg-white flex flex-col z-20 shadow-xs">
        <div className="px-6 py-6 border-b border-[#e5e5df] flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center text-white shadow-2xs">
            <span className="material-symbols-outlined text-[20px]">
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
        
        <div className="flex flex-col gap-1 py-4 flex-1 overflow-y-auto px-2">
          <div className="px-4 pb-2 pt-1 font-label-caps text-[11px] font-bold text-stone-400 uppercase tracking-wider">
            Research
          </div>
          <Link
            className="text-stone-600 hover:text-stone-900 hover:bg-[#eeeeea] transition-colors rounded-lg px-3 py-2 flex items-center gap-3"
            href="/"
          >
            <span className="material-symbols-outlined text-[20px]">
              dashboard
            </span>
            <span className="font-body-sm text-body-sm font-medium">Overview</span>
          </Link>
          <Link
            className="text-stone-600 hover:text-stone-900 hover:bg-[#eeeeea] transition-colors rounded-lg px-3 py-2 flex items-center gap-3"
            href="/research"
          >
            <span className="material-symbols-outlined text-[20px]">
              science
            </span>
            <span className="font-body-sm text-body-sm font-medium">Research</span>
          </Link>
          <Link
            className="text-stone-600 hover:text-stone-900 hover:bg-[#eeeeea] transition-colors rounded-lg px-3 py-2 flex items-center gap-3"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">
              database
            </span>
            <span className="font-body-sm text-body-sm font-medium">Data</span>
          </Link>
          <Link
            className="text-stone-600 hover:text-stone-900 hover:bg-[#eeeeea] transition-colors rounded-lg px-3 py-2 flex items-center gap-3"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">
              analytics
            </span>
            <span className="font-body-sm text-body-sm font-medium">Signals</span>
          </Link>
          <Link
            className="text-stone-600 hover:text-stone-900 hover:bg-[#eeeeea] transition-colors rounded-lg px-3 py-2 flex items-center gap-3"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">
              rule
            </span>
            <span className="font-body-sm text-body-sm font-medium">Validation</span>
          </Link>
          <Link
            className="text-stone-600 hover:text-stone-900 hover:bg-[#eeeeea] transition-colors rounded-lg px-3 py-2 flex items-center gap-3"
            href="/backtests"
          >
            <span className="material-symbols-outlined text-[20px]">
              history
            </span>
            <span className="font-body-sm text-body-sm font-medium">Backtests</span>
          </Link>
          <Link
            className="text-stone-600 hover:text-stone-900 hover:bg-[#eeeeea] transition-colors rounded-lg px-3 py-2 flex items-center gap-3"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">
              account_balance
            </span>
            <span className="font-body-sm text-body-sm font-medium">Portfolio</span>
          </Link>
          <Link
            className="text-stone-600 hover:text-stone-900 hover:bg-[#eeeeea] transition-colors rounded-lg px-3 py-2 flex items-center gap-3"
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

          <div className="px-4 pb-2 pt-5 font-label-caps text-[11px] font-bold text-stone-400 uppercase tracking-wider">
            System
          </div>
          <Link
            className="text-stone-600 hover:text-stone-900 hover:bg-[#eeeeea] transition-colors rounded-lg px-3 py-2 flex items-center gap-3"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">
              storage
            </span>
            <span className="font-body-sm text-body-sm font-medium">Data Sources</span>
          </Link>
          <Link
            className="text-stone-600 hover:text-stone-900 hover:bg-[#eeeeea] transition-colors rounded-lg px-3 py-2 flex items-center gap-3"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">
              precision_manufacturing
            </span>
            <span className="font-body-sm text-body-sm font-medium">Pipeline Runs</span>
          </Link>
          <Link
            className="text-stone-600 hover:text-stone-900 hover:bg-[#eeeeea] transition-colors rounded-lg px-3 py-2 flex items-center gap-3"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">
              settings
            </span>
            <span className="font-body-sm text-body-sm font-medium">Settings</span>
          </Link>
        </div>

        <div className="px-4 py-4 border-t border-[#e5e5df] bg-[#f8f8f6] flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${isHalted ? "bg-rose-500" : "bg-emerald-500"}`}></div>
              <span className="font-body-sm text-xs font-semibold text-stone-800">
                System Status
              </span>
            </div>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${isHalted ? "text-rose-800 bg-rose-50 border-rose-200" : "text-emerald-800 bg-emerald-50 border-emerald-200"}`}>
              {isHalted ? "HALTED" : "Autonomy Active"}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
            <span>Last Heartbeat</span>
            <span className="font-mono text-stone-700">
              1s ago
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-60 flex-1 flex flex-col h-full bg-[#f5f5f2]">
        {/* TopAppBar */}
        <header className="h-16 w-full sticky top-0 z-10 border-b border-[#e5e5df] bg-white/95 backdrop-blur-md flex items-center justify-between px-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="font-headline-md text-headline-md font-bold text-stone-900">
                Research Dashboard
              </span>
              <span className="font-label-caps text-[10px] text-stone-500 uppercase tracking-wider font-semibold">
                Autonomous Command Center
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <div className="flex flex-col">
              <span className="font-label-caps text-[10px] text-stone-500 uppercase tracking-wider font-semibold">
                Environment
              </span>
              <button className="flex items-center gap-1 font-body-sm text-body-sm text-stone-800 font-medium hover:text-orange-600 transition-colors">
                Research{" "}
                <span className="material-symbols-outlined text-[16px] text-stone-400">
                  expand_more
                </span>
              </button>
            </div>
            <div className="h-8 w-px bg-[#e5e5df]"></div>
            <div className="flex flex-col">
              <span className="font-label-caps text-[10px] text-stone-500 uppercase tracking-wider font-semibold">
                Dataset
              </span>
              <button className="flex items-center gap-1 font-body-sm text-body-sm text-stone-800 font-medium hover:text-orange-600 transition-colors">
                NSE Equities{" "}
                <span className="material-symbols-outlined text-[16px] text-stone-400">
                  expand_more
                </span>
              </button>
            </div>
            <div className="h-8 w-px bg-[#e5e5df]"></div>
            <div className="flex flex-col">
              <span className="font-label-caps text-[10px] text-stone-500 uppercase tracking-wider font-semibold">
                Date Range
              </span>
              <button className="flex items-center gap-2 font-data-metric-sm text-data-metric-sm font-mono text-stone-800 font-medium hover:text-orange-600 transition-colors">
                2015-01-01{" "}
                <span className="material-symbols-outlined text-[14px] text-stone-400">
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
            {isHalted ? (
              <button
                onClick={handleResumeSystem}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold text-xs flex items-center gap-1.5 shadow-2xs hover:bg-emerald-700 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">play_arrow</span>
                Resume Autonomy
              </button>
            ) : (
              <button
                onClick={() => setShowKillModal(true)}
                className="px-3 py-1.5 rounded-lg border border-rose-300 bg-rose-50 text-rose-800 font-semibold text-xs flex items-center gap-1.5 shadow-2xs hover:bg-rose-100 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">power_settings_new</span>
                Kill Switch
              </button>
            )}

            <div className="flex items-center gap-6 mr-2 border-r border-[#e5e5df] pr-6">
              <div className="flex flex-col items-end">
                <span className="font-label-caps text-[10px] text-stone-500 uppercase tracking-wider font-semibold">
                  System Status
                </span>
                <div className={`flex items-center gap-1.5 font-semibold text-xs ${isHalted ? "text-rose-700" : "text-emerald-800"}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isHalted ? "bg-rose-500 animate-pulse" : "bg-emerald-500"}`}></span>
                  <span>{isHalted ? "Halted" : "Healthy"}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-label-caps text-[10px] text-stone-500 uppercase tracking-wider font-semibold">
                  Last Tick
                </span>
                <div className="flex items-center gap-1 font-mono text-xs text-stone-700 font-medium">
                  <span>Just now</span>
                  <span className="material-symbols-outlined text-[14px] text-emerald-600">
                    check_circle
                  </span>
                </div>
              </div>
            </div>
            <button className="text-stone-400 hover:text-stone-700 transition-colors flex items-center justify-center w-8 h-8 rounded-lg hover:bg-[#eeeeea]">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-orange-100 border border-orange-300 flex items-center justify-center font-bold text-xs text-orange-700 shadow-2xs">
              QA
            </div>
          </div>
        </header>

        {/* Scrollable Content Canvas */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#f5f5f2]">
          <div className="max-w-[1600px] mx-auto flex flex-col gap-5">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-1">
              <div>
                <h2 className="font-headline-xl text-headline-xl text-stone-900 font-bold tracking-tight">
                  Autonomous Command Center
                </h2>
                <p className="font-body-lg text-body-lg text-stone-600">
                  Autonomous research, statistical validation, and execution monitoring.
                </p>
              </div>

              {/* Mode Switcher */}
              <div className="flex bg-[#eeeeea] rounded-lg p-1 border border-[#e5e5df] shadow-2xs">
                <button 
                  onClick={() => setMode("Manual")}
                  className={`px-3.5 py-1.5 font-body-sm text-xs rounded-md transition-colors cursor-pointer ${mode === "Manual" ? "bg-orange-600 text-white font-semibold shadow-2xs" : "text-stone-600 hover:text-stone-900 font-semibold"}`}
                >
                  Manual
                </button>
                <button 
                  onClick={() => setMode("Assisted")}
                  className={`px-3.5 py-1.5 font-body-sm text-xs rounded-md transition-colors cursor-pointer ${mode === "Assisted" ? "bg-orange-600 text-white font-semibold shadow-2xs" : "text-stone-600 hover:text-stone-900 font-semibold"}`}
                >
                  Assisted
                </button>
                <button 
                  onClick={() => setMode("Auto Paper")}
                  className={`px-3.5 py-1.5 font-body-sm text-xs rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${mode === "Auto Paper" ? "bg-orange-600 text-white font-semibold shadow-2xs" : "text-stone-600 hover:text-stone-900 font-semibold"}`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    smart_toy
                  </span>
                  Auto Paper
                </button>
                <button 
                  disabled
                  title="Live Broker API requires production keys"
                  className="px-3.5 py-1.5 font-body-sm text-xs text-stone-400 opacity-60 cursor-not-allowed flex items-center gap-1 rounded-md"
                >
                  Live{" "}
                  <span className="material-symbols-outlined text-[14px]">
                    lock
                  </span>
                </button>
              </div>
            </div>

            {/* Workflow Stepper Panel */}
            <div className="bg-white border border-[#e5e5df] rounded-lg p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-headline-md text-headline-md text-stone-900 font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-orange-600">
                    account_tree
                  </span>
                  Agent Workflow Status
                </h3>
                <span className={`px-3 py-1 rounded-full font-label-caps text-xs font-semibold uppercase flex items-center gap-1.5 border ${isHalted ? "bg-rose-50 text-rose-800 border-rose-200" : "bg-orange-50 text-orange-700 border-orange-200"}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isHalted ? "bg-rose-500" : "bg-orange-500 animate-pulse"}`}></span>{" "}
                  {isHalted ? "System Halted" : `Processing Epoch ${epochCount}`}
                </span>
              </div>
              <div className="flex items-center justify-between w-full overflow-x-auto pb-1">
                {/* Node 1 */}
                <div className="flex flex-col w-48 shrink-0 bg-[#f8f8f6] border border-[#e5e5df] rounded-lg p-3 relative shadow-2xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-label-caps text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                      Market Data
                    </span>
                    <span className="material-symbols-outlined text-[16px] text-emerald-600">
                      check_circle
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-stone-900 font-semibold">
                    Ingestion Complete
                  </span>
                  <span className="font-data-metric-sm text-stone-500 mt-0.5 text-xs font-mono">
                    Parsed 14.2M ticks
                  </span>
                </div>
                <div className="flex-1 h-px bg-[#e5e5df] mx-2 relative min-w-[20px]">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-stone-400 rotate-45"></div>
                </div>

                {/* Node 2 */}
                <div className="flex flex-col w-48 shrink-0 bg-white border border-orange-300 rounded-lg p-3 relative shadow-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-label-caps text-[10px] font-bold text-orange-600 uppercase tracking-wider">
                      Strategy Agent
                    </span>
                    <span className={`material-symbols-outlined text-[16px] text-orange-600 ${isHalted ? "" : "animate-spin"}`}>
                      refresh
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-orange-700 font-semibold">
                    {isHalted ? "Standby" : "Scanning Signals"}
                  </span>
                  <span className="font-data-metric-sm text-stone-500 mt-0.5 text-xs font-mono">
                    Momentum in RELIANCE
                  </span>
                </div>
                <div className="flex-1 h-px bg-[#e5e5df] mx-2 relative min-w-[20px]">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-stone-400 rotate-45"></div>
                </div>

                {/* Node 3 */}
                <div className="flex flex-col w-48 shrink-0 bg-[#f8f8f6] border border-[#e5e5df] rounded-lg p-3 relative opacity-80 shadow-2xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-label-caps text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                      Risk Gate
                    </span>
                    <span className="material-symbols-outlined text-[16px] text-stone-400">
                      hourglass_empty
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-stone-700 font-medium">
                    Pending Review
                  </span>
                  <span className="font-data-metric-sm text-stone-400 mt-0.5 text-xs font-mono">
                    Awaiting Signal Batch
                  </span>
                </div>
                <div className="flex-1 h-px bg-[#e5e5df] mx-2 relative min-w-[20px]">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-stone-400 rotate-45"></div>
                </div>

                {/* Node 4 */}
                <div className="flex flex-col w-48 shrink-0 bg-[#f8f8f6] border border-[#e5e5df] rounded-lg p-3 relative opacity-70 shadow-2xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-label-caps text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                      Portfolio
                    </span>
                    <span className="material-symbols-outlined text-[16px] text-stone-400">
                      hourglass_empty
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-stone-600 font-medium">
                    {isHalted ? "Liquidated" : "Idle"}
                  </span>
                  <span className="font-data-metric-sm text-stone-400 mt-0.5 text-xs font-mono">
                    {isHalted ? "100% Cash" : "Standing By"}
                  </span>
                </div>
              </div>
            </div>

            {/* Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Pre-Trade Risk Gate */}
              <div className="lg:col-span-1 bg-white border border-[#e5e5df] rounded-lg flex flex-col h-[480px] shadow-xs">
                <div className="p-4 border-b border-[#e5e5df] flex items-center justify-between bg-[#f8f8f6]/70">
                  <h3 className="font-headline-md text-headline-md text-stone-900 font-semibold flex items-center gap-2">
                    <span className="material-symbols-outlined text-orange-600">security</span>
                    Pre-Trade Risk Gate
                  </h3>
                  <span className="font-label-caps text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                    2m ago
                  </span>
                </div>
                <div className="p-5 flex-1 overflow-y-auto flex flex-col gap-4">
                  <div className={`border rounded-lg p-4 flex flex-col items-center justify-center text-center shadow-2xs ${isHalted ? "bg-rose-50 border-rose-200" : "bg-emerald-50 border-emerald-200"}`}>
                    <span className={`material-symbols-outlined text-3xl mb-1 ${isHalted ? "text-rose-600" : "text-emerald-600"}`}>
                      {isHalted ? "gpp_bad" : "verified_user"}
                    </span>
                    <span className={`font-headline-xl text-headline-xl font-bold tracking-tight ${isHalted ? "text-rose-800" : "text-emerald-800"}`}>
                      {isHalted ? "HALTED" : "APPROVED"}
                    </span>
                    <span className={`font-body-sm text-body-sm mt-0.5 text-xs font-medium ${isHalted ? "text-rose-700" : "text-emerald-800"}`}>
                      {isHalted ? "Trading halted by Kill Switch" : "All 6 risk constraints satisfied for target portfolio"}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5 mt-1">
                    {riskConstraints.map((rc) => (
                      <div key={rc.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-[#f5f5f2] transition-colors">
                        <span className="font-body-sm text-body-sm text-stone-800 font-medium">
                          {rc.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-stone-500">
                            {rc.limit}
                          </span>
                          <span className={`material-symbols-outlined text-[18px] font-bold ${rc.status === "APPROVED" ? "text-emerald-600" : "text-rose-600"}`}>
                            {rc.status === "APPROVED" ? "check" : "close"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Activity Log */}
              <div className="lg:col-span-2 bg-white border border-[#e5e5df] rounded-lg flex flex-col h-[480px] shadow-xs">
                <div className="p-4 border-b border-[#e5e5df] flex items-center justify-between bg-[#f8f8f6]/70 relative">
                  <h3 className="font-headline-md text-headline-md text-stone-900 font-semibold flex items-center gap-2">
                    <span className="material-symbols-outlined text-orange-600">list_alt</span>
                    Autonomous Activity Log
                  </h3>
                  
                  <div className="relative">
                    <button 
                      onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                      className="text-xs font-semibold text-stone-600 hover:text-orange-600 uppercase flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#d6d3d1] bg-white shadow-2xs cursor-pointer"
                    >
                      {filterAgent === "All" ? "Filter" : filterAgent}{" "}
                      <span className="material-symbols-outlined text-[14px]">
                        filter_list
                      </span>
                    </button>

                    {showFilterDropdown && (
                      <div className="absolute right-0 mt-1 w-36 bg-white border border-[#e5e5df] rounded-lg shadow-lg py-1 z-30">
                        {(["All", "Strategy", "Market", "Portfolio", "Execution", "Risk"] as const).map((agent) => (
                          <button
                            key={agent}
                            onClick={() => {
                              setFilterAgent(agent);
                              setShowFilterDropdown(false);
                            }}
                            className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-[#eeeeea] transition-colors ${filterAgent === agent ? "text-orange-600 font-bold bg-orange-50/50" : "text-stone-700"}`}
                          >
                            {agent}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-0 flex-1 overflow-y-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 bg-[#eeeeea] z-10 border-b border-[#e5e5df]">
                      <tr>
                        <th className="py-3 px-4 font-label-caps text-stone-500 uppercase tracking-wider text-[11px] font-semibold w-24">
                          Time
                        </th>
                        <th className="py-3 px-4 font-label-caps text-stone-500 uppercase tracking-wider text-[11px] font-semibold w-32">
                          Agent
                        </th>
                        <th className="py-3 px-4 font-label-caps text-stone-500 uppercase tracking-wider text-[11px] font-semibold">
                          Action / Decision
                        </th>
                        <th className="py-3 px-4 font-label-caps text-stone-500 uppercase tracking-wider text-[11px] font-semibold w-52">
                          Evidence / Meta
                        </th>
                      </tr>
                    </thead>
                    <tbody className="font-data-metric-sm font-mono text-xs text-stone-800 divide-y divide-[#f0f0ec]">
                      {filteredLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-[#f5f5f2] transition-colors">
                          <td className="py-3 px-4 text-stone-500">
                            {log.timestamp}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 rounded-full font-sans font-semibold border ${
                              log.agent === "Strategy" ? "bg-orange-50 border-orange-200 text-orange-700" :
                              log.agent === "Market" ? "bg-amber-50 border-amber-200 text-amber-800" :
                              log.agent === "Portfolio" ? "bg-blue-50 border-blue-200 text-blue-700" :
                              log.agent === "Execution" ? "bg-emerald-50 border-emerald-200 text-emerald-800" :
                              log.status === "breach" ? "bg-rose-50 border-rose-200 text-rose-800" :
                              "bg-[#eeeeea] border-[#e5e5df] text-stone-700"
                            }`}>
                              {log.agent}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-sans font-medium text-stone-900">
                            {log.action}
                          </td>
                          <td className="py-3 px-4 text-stone-500 truncate max-w-[200px]" title={log.evidence}>
                            {log.evidence}
                          </td>
                        </tr>
                      ))}
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


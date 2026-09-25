"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLiveMarket } from "../hooks/useLiveMarket";
import { signOut, useSession } from "../lib/auth-client";

interface NavItem {
  href: string;
  label: string;
  icon: string;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Overview", icon: "dashboard" },
  { href: "/research", label: "Research Hub", icon: "science" },
  { href: "/signals", label: "Factor Library", icon: "analytics" },
  { href: "/backtests", label: "Backtest Suite", icon: "history" },
  { href: "/portfolio", label: "Live Portfolio", icon: "account_balance_wallet" },
  { href: "/agent-trading", label: "WhatsApp Bot", icon: "chat", badge: "AI BOT" },
  { href: "/data", label: "Data Sources", icon: "database" },
  { href: "/reports", label: "Audit Reports", icon: "description" },
  { href: "/command-center", label: "Live Monitor", icon: "terminal", badge: "LIVE" },
];

export function Sidebar() {
  const pathname = usePathname();
  const market = useLiveMarket();
  const { data: session } = useSession();

  return (
    <aside className="w-60 h-screen fixed left-0 top-0 bg-white border-r border-[#e5e5df] flex flex-col py-4 z-30 shadow-xs select-none">
      {/* Brand Header */}
      <div className="px-5 mb-5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow-xs">
          <span className="material-symbols-outlined text-[20px]">show_chart</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[15px] font-bold text-stone-900 tracking-tight leading-tight">
            QUANT ALPHA
          </span>
          <span className="text-[10px] text-stone-400 uppercase tracking-widest font-semibold">
            Institutional Core
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 flex flex-col gap-1 px-3 overflow-y-auto">
        <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 px-3 py-1">
          Navigation
        </div>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? "bg-orange-50 text-orange-600 font-bold border border-orange-200/80 shadow-2xs"
                  : "text-stone-600 hover:bg-[#eeeeea] hover:text-stone-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`material-symbols-outlined text-[19px] ${
                    isActive ? "text-orange-600" : "text-stone-400"
                  }`}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 font-mono">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Footer System Status & User Profile */}
      <div className="mt-auto pt-3 px-3 flex flex-col gap-2 border-t border-[#e5e5df] bg-[#fbfbfa]">
        {/* Backend Connectivity Badge */}
        <div className="p-2.5 bg-white rounded-lg border border-[#e5e5df] text-xs flex flex-col gap-1.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div
                className={`w-2 h-2 rounded-full ${
                  market.isConnected ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                }`}
              />
              <span className="text-[11px] font-semibold text-stone-800">
                NSE Daemon
              </span>
            </div>
            <span
              className={`text-[9px] font-bold px-1.5 py-0.2 rounded font-mono ${
                market.isConnected
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-amber-50 text-amber-700 border border-amber-200"
              }`}
            >
              {market.isConnected ? "ONLINE" : "STANDBY"}
            </span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-stone-500">
            <span>Last Tick</span>
            <span className="font-mono text-stone-700 font-semibold">{market.lastUpdate}</span>
          </div>
        </div>

        {/* User / Sign Out Row */}
        {session?.user && (
          <div className="flex items-center justify-between px-1 py-1 text-xs">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-[10px] shrink-0">
                {session.user.name?.[0] || session.user.email?.[0] || "U"}
              </div>
              <span className="text-[11px] text-stone-700 font-medium truncate max-w-[110px]">
                {session.user.name || session.user.email}
              </span>
            </div>
            <button
              onClick={() => signOut()}
              title="Sign Out"
              className="text-stone-400 hover:text-rose-600 transition-colors cursor-pointer p-1"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

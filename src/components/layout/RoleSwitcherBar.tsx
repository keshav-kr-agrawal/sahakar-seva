"use client";

import React from "react";
import { useApp, UserRole } from "@/context/AppContext";
import { User, HardHat, ShieldCheck, Sparkles, ArrowRight, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function RoleSwitcherBar() {
  const { role, setRole, isCrisisMode, toggleCrisisMode } = useApp();

  const roles: { id: UserRole; label: string; icon: React.ReactNode; desc: string; mainHref: string }[] = [
    {
      id: "customer",
      label: "Customer View",
      icon: <User className="w-3.5 h-3.5" />,
      desc: "Book Services & Track Worker",
      mainHref: "/",
    },
    {
      id: "worker",
      label: "Worker View",
      icon: <HardHat className="w-3.5 h-3.5" />,
      desc: "Earnings, Collective Bargaining & Safety",
      mainHref: "/worker",
    },
    {
      id: "admin",
      label: "Federation Admin",
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
      desc: "AI Demand Forecasts & Crisis Redistribution",
      mainHref: "/admin",
    },
  ];

  return (
    <aside aria-label="Demo Role Selector" className="w-full bg-[#11261a] text-[#edebe4] border-b border-[#234230] px-4 py-2 text-xs z-50 sticky top-0">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Judge Demo Badge */}
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 bg-[#224c34] text-[#dce8e1] border border-[#35674a] px-2.5 py-0.5 rounded-full font-semibold tracking-wide text-[10px] uppercase">
            <Sparkles className="w-3 h-3 text-[#a84422]" /> Prototype Switcher
          </span>
          <span className="hidden sm:inline text-[#a3b8ac] text-[11px] font-medium">
            SIH PS 26089 • Ministry of Cooperation / NCCT
          </span>
        </div>

        {/* Center: Role Selector Pills */}
        <div className="flex items-center bg-[#0b1a12] p-0.5 rounded-lg border border-[#1f3b2b]">
          {roles.map((r) => {
            const isActive = role === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all text-xs ${
                  isActive
                    ? "bg-[#224c34] text-[#f9f7f2] font-semibold shadow-sm"
                    : "text-[#8caea0] hover:text-[#f9f7f2] hover:bg-[#163022]"
                }`}
                title={r.desc}
              >
                {r.icon}
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Quick Action Shortcuts depending on active role */}
        <div className="flex items-center gap-2">
          {role === "customer" && (
            <Link
              href="/booking"
              className="flex items-center gap-1.5 bg-[#224c34] hover:bg-[#2d6243] text-[#f9f7f2] border border-[#35674a] px-3 py-1 rounded-md text-xs font-medium transition"
            >
              <span>Demo Booking Flow</span>
              <ArrowRight className="w-3 h-3 text-[#dce8e1]" />
            </Link>
          )}

          {role === "worker" && (
            <Link
              href="/worker/collective-bargaining"
              className="flex items-center gap-1.5 bg-[#a84422] hover:bg-[#8c381c] text-[#ffffff] px-3 py-1 rounded-md text-xs font-medium transition shadow-sm"
            >
              <span>Rate Bargaining</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}

          {role === "admin" && (
            <button
              onClick={toggleCrisisMode}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition border ${
                isCrisisMode
                  ? "bg-[#8c381c] text-[#ffffff] border-[#be522d]"
                  : "bg-[#163022] text-[#dce8e1] border-[#294e37] hover:bg-[#224c34]"
              }`}
            >
              <AlertTriangle className="w-3 h-3" />
              <span>{isCrisisMode ? "Crisis Mode: Active" : "Simulate Crisis Mode"}</span>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}

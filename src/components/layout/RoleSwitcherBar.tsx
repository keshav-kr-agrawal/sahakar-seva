"use client";

import React from "react";
import { useApp, UserRole } from "@/context/AppContext";
import { User, HardHat, ShieldCheck, Zap, ArrowRight, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function RoleSwitcherBar() {
  const { role, setRole, isCrisisMode, toggleCrisisMode } = useApp();

  const roles: { id: UserRole; label: string; icon: React.ReactNode; desc: string; mainHref: string }[] = [
    {
      id: "customer",
      label: "Customer View",
      icon: <User className="w-4 h-4" />,
      desc: "Book Services & Track Worker",
      mainHref: "/",
    },
    {
      id: "worker",
      label: "Worker View",
      icon: <HardHat className="w-4 h-4" />,
      desc: "Earnings, Collective Bargaining & Safety",
      mainHref: "/worker",
    },
    {
      id: "admin",
      label: "Federation Admin",
      icon: <ShieldCheck className="w-4 h-4" />,
      desc: "AI Demand Forecasts & Crisis Redistribution",
      mainHref: "/admin",
    },
  ];

  return (
    <div className="w-full bg-[#0d2c1e] text-white border-b border-[#1e5338] px-3 py-2 text-xs z-50 sticky top-0 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Judge Demo Badge */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 bg-[#c85a32] text-white px-2 py-0.5 rounded font-semibold tracking-wide uppercase text-[10px]">
            <Zap className="w-3 h-3 fill-current animate-pulse" /> Judge Demo Mode
          </span>
          <span className="hidden sm:inline text-emerald-200/80">
            SIH PS 26089 • Ministry of Cooperation / NCCT
          </span>
        </div>

        {/* Center: Role Selector Pills */}
        <div className="flex items-center bg-[#15422d] p-0.5 rounded-lg border border-[#236343]">
          {roles.map((r) => {
            const isActive = role === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all font-medium ${
                  isActive
                    ? "bg-[#2d7a52] text-white shadow-sm font-semibold"
                    : "text-emerald-100/70 hover:text-white hover:bg-[#1e5338]"
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
              className="flex items-center gap-1 bg-[#2d7a52] hover:bg-[#399464] text-white px-2.5 py-1 rounded text-xs font-medium transition"
            >
              <span>Demo Booking Ledger</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}

          {role === "worker" && (
            <Link
              href="/worker/collective-bargaining"
              className="flex items-center gap-1 bg-[#c85a32] hover:bg-[#b24a24] text-white px-2.5 py-1 rounded text-xs font-medium transition"
            >
              <span>Rate Bargaining</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}

          {role === "admin" && (
            <div className="flex items-center gap-2">
              <button
                onClick={toggleCrisisMode}
                className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition ${
                  isCrisisMode
                    ? "bg-amber-500 text-black font-bold animate-pulse"
                    : "bg-[#1e5338] text-emerald-200 hover:bg-[#2d7a52]"
                }`}
              >
                <AlertTriangle className="w-3 h-3" />
                <span>{isCrisisMode ? "Crisis Mode: ACTIVE" : "Toggle Crisis Mode"}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

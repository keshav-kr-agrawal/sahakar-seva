"use client";

import React from "react";
import { useApp, UserRole } from "@/context/AppContext";
import { User, HardHat, ShieldCheck, Sparkles, ArrowRight, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function RoleSwitcherBar() {
  const { role, setRole, isCrisisMode, toggleCrisisMode } = useApp();

  const roles: { id: UserRole; label: string; shortLabel: string; icon: React.ReactNode; desc: string; mainHref: string }[] = [
    {
      id: "customer",
      label: "Customer View",
      shortLabel: "Customer",
      icon: <User className="w-3.5 h-3.5 shrink-0" />,
      desc: "Book Services & Track Worker",
      mainHref: "/",
    },
    {
      id: "worker",
      label: "Worker View",
      shortLabel: "Worker",
      icon: <HardHat className="w-3.5 h-3.5 shrink-0" />,
      desc: "Earnings, Collective Bargaining & Safety",
      mainHref: "/worker",
    },
    {
      id: "admin",
      label: "Federation Admin",
      shortLabel: "Admin",
      icon: <ShieldCheck className="w-3.5 h-3.5 shrink-0" />,
      desc: "AI Demand Forecasts & Crisis Redistribution",
      mainHref: "/admin",
    },
  ];

  return (
    <aside aria-label="Demo Role Selector" className="w-full bg-[#0d1e14] text-[#edebe4] border-b border-[#213f2d] px-3 sm:px-6 py-1.5 text-xs select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
        
        {/* Left: Judge Demo Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 bg-[#193927] text-[#dce8e1] border border-[#2d583d] px-2.5 py-0.5 rounded-full font-bold tracking-wide text-[10px] uppercase">
            <Sparkles className="w-3 h-3 text-[#a84422]" />
            <span className="hidden sm:inline">Prototype Mode:</span>
            <span className="text-[#ffffff] font-extrabold capitalize">{role}</span>
          </span>
          <span className="hidden md:inline text-[#9bc2ad] text-[11px] font-medium border-l border-[#244532] pl-2">
            SIH PS 26089 • Ministry of Cooperation
          </span>
        </div>

        {/* Center: Role Selector Segmented Control */}
        <div className="flex items-center bg-[#07130c] p-0.5 rounded-lg border border-[#1b3424] shrink-0">
          {roles.map((r) => {
            const isActive = role === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-md transition-all text-xs font-semibold cursor-pointer ${
                  isActive
                    ? "bg-[#224c34] text-[#ffffff] shadow-xs border border-[#37694a]"
                    : "text-[#dce8e1] hover:text-[#ffffff] hover:bg-[#14291c]"
                }`}
                title={r.desc}
              >
                {r.icon}
                <span className="hidden sm:inline">{r.label}</span>
                <span className="sm:hidden text-[11px]">{r.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Quick Action Demo Shortcut */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          {role === "customer" && (
            <Link
              href="/booking"
              className="flex items-center gap-1.5 bg-[#193927] hover:bg-[#224c34] text-[#ffffff] border border-[#2d583d] px-2.5 py-1 rounded-md text-xs font-semibold transition"
            >
              <span>Booking Wizard</span>
              <ArrowRight className="w-3 h-3 text-[#9bc2ad]" />
            </Link>
          )}

          {role === "worker" && (
            <Link
              href="/worker/collective-bargaining"
              className="flex items-center gap-1.5 bg-[#a84422] hover:bg-[#8c381c] text-[#ffffff] px-2.5 py-1 rounded-md text-xs font-semibold transition shadow-xs"
            >
              <span>Rate Bargaining</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}

          {role === "admin" && (
            <button
              onClick={toggleCrisisMode}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition border cursor-pointer ${
                isCrisisMode
                  ? "bg-[#8c381c] text-[#ffffff] border-[#be522d]"
                  : "bg-[#14291c] text-[#dce8e1] border-[#244532] hover:bg-[#193927]"
              }`}
            >
              <AlertTriangle className="w-3 h-3 text-[#dce8e1]" />
              <span>{isCrisisMode ? "Crisis Active" : "Simulate Crisis"}</span>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}

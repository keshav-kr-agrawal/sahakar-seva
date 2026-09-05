"use client";

import React from "react";
import { useApp, UserRole } from "@/context/AppContext";
import { User, HardHat, ShieldCheck, Sparkles, ArrowRight, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function RoleSwitcherBar() {
  const { role, setRole, isCrisisMode, toggleCrisisMode } = useApp();

  const roles: { id: UserRole; label: string; shortLabel: string; icon: React.ReactNode }[] = [
    {
      id: "customer",
      label: "Customer View",
      shortLabel: "Customer",
      icon: <User className="w-3 h-3 shrink-0" />,
    },
    {
      id: "worker",
      label: "Worker Hub",
      shortLabel: "Worker",
      icon: <HardHat className="w-3 h-3 shrink-0" />,
    },
    {
      id: "admin",
      label: "Federation Admin",
      shortLabel: "Admin",
      icon: <ShieldCheck className="w-3 h-3 shrink-0" />,
    },
  ];

  return (
    <aside aria-label="Prototype Role Switcher" className="w-full bg-[#0f172a] text-[#f8fafc] border-b border-[#1e293b] px-3 sm:px-6 py-1 text-[11px] select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        
        {/* Left: Hackathon Judge Emblem */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 bg-[#1e293b] text-[#38bdf8] border border-[#334155] px-2 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
            SIH PS 26089
          </span>
          <span className="hidden md:inline text-[#94a3b8] text-[11px] font-medium">
            Ministry of Cooperation • Co-op Gig Services Platform
          </span>
        </div>

        {/* Center: Role Switcher Control */}
        <div className="flex items-center bg-[#020617] p-0.5 rounded-md border border-[#1e293b] shrink-0">
          {roles.map((r) => {
            const isActive = role === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#2563eb] text-[#ffffff] shadow-xs"
                    : "text-[#94a3b8] hover:text-[#ffffff] hover:bg-[#1e293b]"
                }`}
              >
                {r.icon}
                <span className="hidden sm:inline">{r.label}</span>
                <span className="sm:hidden">{r.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Quick Action Demo Shortcut */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          {role === "customer" && (
            <Link
              href="/booking"
              className="flex items-center gap-1 bg-[#1e293b] hover:bg-[#334155] text-[#38bdf8] border border-[#334155] px-2.5 py-0.5 rounded text-[11px] font-semibold transition"
            >
              <span>Instant Booking Flow</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}

          {role === "worker" && (
            <Link
              href="/worker/collective-bargaining"
              className="flex items-center gap-1 bg-[#ea580c] hover:bg-[#c2410c] text-[#ffffff] px-2.5 py-0.5 rounded text-[11px] font-semibold transition shadow-xs"
            >
              <span>Rate Bargaining</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}

          {role === "admin" && (
            <button
              onClick={toggleCrisisMode}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-semibold transition border cursor-pointer ${
                isCrisisMode
                  ? "bg-[#dc2626] text-[#ffffff] border-[#ef4444]"
                  : "bg-[#1e293b] text-[#cbd5e1] border-[#334155] hover:bg-[#334155]"
              }`}
            >
              <AlertTriangle className="w-3 h-3 text-[#f59e0b]" />
              <span>{isCrisisMode ? "Crisis Active" : "Simulate Crisis"}</span>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}

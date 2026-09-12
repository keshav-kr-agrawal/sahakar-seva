"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { WORKERS } from "@/lib/mockData";
import {
  Flame,
  AlertTriangle,
  Users,
  ShieldCheck,
  CheckCircle2,
  Scale,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CrisisRedistributionPage() {
  const { isCrisisMode, toggleCrisisMode } = useApp();

  const standardWorkers = [...WORKERS].sort((a, b) => b.rating - a.rating);
  const crisisEquityWorkers = [...WORKERS].sort((a, b) => b.vulnerabilityScore - a.vulnerabilityScore);

  const displayList = isCrisisMode ? crisisEquityWorkers : standardWorkers;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-white text-slate-900">
      
      {/* Back Link */}
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Federation Admin</span>
      </Link>

      {/* Header Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl shadow-elevated transition-all border space-y-4 ${
        isCrisisMode
          ? "bg-slate-950 text-white border-rose-900/50"
          : "bg-slate-950 text-white border-slate-800"
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider ${
                isCrisisMode ? "bg-rose-600 text-white" : "bg-slate-800 text-slate-300 border border-slate-700"
              }`}>
                <Flame className="w-3.5 h-3.5" />
                {isCrisisMode ? "CRISIS MODE: ACTIVE (Vulnerability-Weighted)" : "NORMAL MODE (Proximity & Merit)"}
              </span>
              <span className="text-xs text-slate-400">Cooperative Welfare Equity Engine</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Smart Income Redistribution (Crisis Mode)
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              During severe monsoon floods or public disruptions, SahakarSeva algorithmically prioritizes gig work allocation to workers with higher family dependents and lower emergency savings buffers.
            </p>
          </div>

          {/* Interactive Crisis Mode Toggle */}
          <button
            onClick={toggleCrisisMode}
            className={`px-6 py-3 rounded-2xl font-black text-xs shadow-soft transition flex items-center gap-2 cursor-pointer ${
              isCrisisMode
                ? "bg-rose-600 text-white hover:bg-rose-700"
                : "bg-white text-slate-900 hover:bg-slate-100"
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isCrisisMode ? "animate-spin" : ""}`} />
            <span>{isCrisisMode ? "Deactivate Crisis Mode" : "Activate Monsoon Crisis Mode"}</span>
          </button>
        </div>
      </div>

      {/* Comparison Explanation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`p-6 sm:p-7 rounded-3xl border transition shadow-soft ${!isCrisisMode ? "bg-white border-slate-900 ring-1 ring-slate-900" : "bg-slate-50 border-slate-200"}`}>
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-xs font-black text-slate-900">Standard Mode (Proximity & Rating)</span>
            <span className="text-[10px] font-bold bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full">Default</span>
          </div>
          <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
            Workers are dispatched based purely on customer proximity distance (15-min radius) and verified rating scores.
          </p>
        </div>

        <div className={`p-6 sm:p-7 rounded-3xl border transition shadow-soft ${isCrisisMode ? "bg-amber-50/50 border-amber-600 ring-1 ring-amber-600" : "bg-slate-50 border-slate-200"}`}>
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-xs font-black text-slate-900">Crisis Mode (Social Vulnerability Index)</span>
            <span className="text-[10px] font-bold bg-amber-600 text-white px-2.5 py-0.5 rounded-full">Social Equity</span>
          </div>
          <p className="text-xs text-slate-700 mt-2.5 leading-relaxed">
            Prioritizes dispatches to craftsmen supporting 4+ dependents with under 1 month savings buffer first, stabilizing livelihood shocks during climate events.
          </p>
        </div>
      </div>

      {/* Worker Allocation Queue List with Smooth Spring Reorder */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-900">
            Live Worker Dispatch Priority Queue ({displayList.length} Workers)
          </h2>
          <span className="text-xs text-slate-500">
            {isCrisisMode ? "Sorted by Vulnerability Index (100 → 0)" : "Sorted by Merit Rating (5.0 → 0)"}
          </span>
        </div>

        <div className="space-y-3">
          <AnimatePresence>
            {displayList.map((w, index) => (
              <motion.div
                key={w.id}
                layout
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition shadow-soft ${
                  isCrisisMode && w.vulnerabilityScore > 80
                    ? "bg-amber-50/60 border-amber-200"
                    : "bg-white border-slate-200"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    #{index + 1}
                  </div>
                  <img src={w.avatar} alt={w.name} className="w-12 h-12 rounded-2xl object-cover border border-slate-200" />
                  <div>
                    <div className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <span>{w.name}</span>
                      <span className="text-xs text-slate-500 font-normal">({w.category})</span>
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                      <span>★ {w.rating} Rating</span>
                      <span>•</span>
                      <span>{w.dependentsCount} Dependents</span>
                      <span>•</span>
                      <span>{w.savingsBufferMonths} Mo Savings Buffer</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-slate-900">
                    Equity Vulnerability: {w.vulnerabilityScore}/100
                  </div>
                  <span className="text-[10px] bg-slate-100 text-slate-800 border border-slate-200 font-bold px-2.5 py-0.5 rounded-full inline-block mt-1">
                    Priority Dispatch Verified
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

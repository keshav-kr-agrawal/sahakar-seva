"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { WORKERS } from "@/lib/mockData";
import {
  Flame,
  AlertTriangle,
  Users,
  ShieldCheck,
  CheckCircle2,
  Scale,
  ArrowRight,
  RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CrisisRedistributionPage() {
  const { isCrisisMode, toggleCrisisMode } = useApp();

  // Sort workers by standard distance/merit vs vulnerability score
  const standardWorkers = [...WORKERS].sort((a, b) => b.rating - a.rating);
  const crisisEquityWorkers = [...WORKERS].sort((a, b) => b.vulnerabilityScore - a.vulnerabilityScore);

  const displayList = isCrisisMode ? crisisEquityWorkers : standardWorkers;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className={`p-8 rounded-3xl shadow-2xl transition-all border space-y-4 ${
        isCrisisMode
          ? "bg-gradient-to-r from-amber-950 via-rose-950 to-amber-950 text-amber-100 border-amber-500/50"
          : "bg-gradient-to-r from-[#133e2b] via-[#1e5338] to-[#2d7a52] text-white border-emerald-700/40"
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 ${
                isCrisisMode ? "bg-amber-500 text-black animate-pulse" : "bg-emerald-900 text-emerald-200"
              }`}>
                <Flame className="w-3.5 h-3.5" />
                {isCrisisMode ? "CRISIS MODE: ACTIVE (Vulnerability Equity Sorting)" : "NORMAL MODE (Merit & Distance Sorting)"}
              </span>
              <span className="text-xs opacity-80">Ministry PS 26089 Equity Engine</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-serif">
              Smart Income Redistribution (Crisis Mode Panel)
            </h1>
            <p className="text-xs sm:text-sm opacity-90 max-w-2xl">
              During severe monsoon floods or public emergencies, SahakarSeva algorithmically prioritizes gig work allocation to workers with higher family dependents and lower emergency savings buffers.
            </p>
          </div>

          {/* Interactive Crisis Mode Toggle */}
          <button
            onClick={toggleCrisisMode}
            className={`px-6 py-3.5 rounded-2xl font-extrabold text-sm shadow-2xl transition flex items-center gap-2 ${
              isCrisisMode
                ? "bg-amber-500 text-black hover:bg-amber-400"
                : "bg-[#c85a32] text-white hover:bg-[#b24a24]"
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isCrisisMode ? "animate-spin" : ""}`} />
            <span>{isCrisisMode ? "Deactivate Crisis Mode" : "Activate Monsoon Crisis Mode"}</span>
          </button>
        </div>
      </div>

      {/* Comparison Explanation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`p-6 rounded-3xl border transition ${!isCrisisMode ? "bg-white dark:bg-[#15241d] border-[#2d7a52] ring-2 ring-[#2d7a52]" : "bg-white/60 dark:bg-[#15241d]/60 border-gray-200"}`}>
          <div className="flex items-center justify-between pb-2 border-b">
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Standard Mode (Merit & Rating)</span>
            <span className="text-[10px] font-bold bg-gray-100 text-gray-700 px-2 py-0.5 rounded">Default</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Workers are dispatched based purely on customer proximity distance and average rating scores.
          </p>
        </div>

        <div className={`p-6 rounded-3xl border transition ${isCrisisMode ? "bg-amber-50 dark:bg-amber-950/60 border-amber-500 ring-2 ring-amber-500" : "bg-white/60 dark:bg-[#15241d]/60 border-gray-200"}`}>
          <div className="flex items-center justify-between pb-2 border-b border-amber-300">
            <span className="text-xs font-bold text-amber-900 dark:text-amber-200">Crisis Mode (Social Vulnerability Index)</span>
            <span className="text-[10px] font-bold bg-amber-500 text-black px-2 py-0.5 rounded">Social Equity</span>
          </div>
          <p className="text-xs text-amber-900/80 dark:text-amber-200 mt-2">
            Dispatches jobs to workers supporting 4+ dependents with under 1 month savings buffer first, preventing poverty traps.
          </p>
        </div>
      </div>

      {/* Worker Allocation Queue List with Smooth Reorder Animation */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#133e2b] dark:text-emerald-300 font-serif">
            Live Worker Dispatch Priority Queue ({displayList.length} Workers)
          </h2>
          <span className="text-xs text-muted-foreground">
            {isCrisisMode ? "Sorted by Vulnerability Score (100 → 0)" : "Sorted by Rating (5.0 → 0)"}
          </span>
        </div>

        <div className="space-y-3">
          <AnimatePresence>
            {displayList.map((w, index) => (
              <motion.div
                key={w.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition shadow-md ${
                  isCrisisMode && w.vulnerabilityScore > 80
                    ? "bg-amber-50 dark:bg-amber-950/80 border-amber-400"
                    : "bg-white dark:bg-[#15241d] border-[#133e2b]/15"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#133e2b] text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                    #{index + 1}
                  </div>
                  <img src={w.avatar} alt={w.name} className="w-12 h-12 rounded-xl object-cover border-2 border-[#2d7a52]" />
                  <div>
                    <div className="text-sm font-bold text-[#133e2b] dark:text-emerald-300 flex items-center gap-2">
                      <span>{w.name}</span>
                      <span className="text-xs text-muted-foreground">({w.category})</span>
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <span>★ {w.rating} Rating</span>
                      <span>•</span>
                      <span>{w.dependentsCount} Dependents</span>
                      <span>•</span>
                      <span>{w.savingsBufferMonths} Mo Savings Buffer</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-amber-700 dark:text-amber-300">
                    Equity Vulnerability Score: {w.vulnerabilityScore}/100
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full inline-block mt-1">
                    Priority Dispatch Approved
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

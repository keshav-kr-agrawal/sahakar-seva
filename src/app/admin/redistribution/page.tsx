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
  RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CrisisRedistributionPage() {
  const { isCrisisMode, toggleCrisisMode } = useApp();

  const standardWorkers = [...WORKERS].sort((a, b) => b.rating - a.rating);
  const crisisEquityWorkers = [...WORKERS].sort((a, b) => b.vulnerabilityScore - a.vulnerabilityScore);

  const displayList = isCrisisMode ? crisisEquityWorkers : standardWorkers;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className={`p-8 rounded-3xl shadow-elevated transition-all border space-y-4 ${
        isCrisisMode
          ? "bg-[#1f1412] text-[#f6e8e2] border-[#522c20]"
          : "bg-[#193927] text-[#f9f7f2] border-[#2d6243]"
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider ${
                isCrisisMode ? "bg-[#8c381c] text-[#ffffff] border border-[#be522d]" : "bg-[#224c34] text-[#dce8e1] border border-[#35674a]"
              }`}>
                <Flame className="w-3.5 h-3.5" />
                {isCrisisMode ? "CRISIS MODE: ACTIVE (Social Vulnerability Index)" : "NORMAL MODE (Distance & Merit Ranking)"}
              </span>
              <span className="text-xs opacity-75">Ministry PS 26089 Equity Engine</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-serif">
              Smart Income Redistribution (Crisis Mode Panel)
            </h1>
            <p className="text-xs sm:text-sm opacity-85 max-w-2xl leading-relaxed">
              During severe monsoon floods or public emergencies, SahakarSeva algorithmically prioritizes gig work allocation to workers with higher family dependents and lower emergency savings buffers.
            </p>
          </div>

          {/* Interactive Crisis Mode Toggle */}
          <button
            onClick={toggleCrisisMode}
            className={`px-6 py-3 rounded-2xl font-bold text-xs shadow-soft transition flex items-center gap-2 ${
              isCrisisMode
                ? "bg-[#a84422] text-white hover:bg-[#8c381c]"
                : "bg-[#224c34] text-[#f9f7f2] hover:bg-[#2d6243] border border-[#35674a]"
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isCrisisMode ? "animate-spin" : ""}`} />
            <span>{isCrisisMode ? "Deactivate Crisis Mode" : "Activate Monsoon Crisis Mode"}</span>
          </button>
        </div>
      </div>

      {/* Comparison Explanation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`p-6 sm:p-7 rounded-3xl border transition shadow-soft ${!isCrisisMode ? "bg-[#ffffff] dark:bg-[#13221b] border-[#193927] ring-1 ring-[#193927]" : "bg-[#ffffff]/60 dark:bg-[#13221b]/60 border-[#e2ded4]"}`}>
          <div className="flex items-center justify-between pb-2 border-b border-[#ede9e1] dark:border-[#233b2e]">
            <span className="text-xs font-bold text-[#14221b] dark:text-[#edebe4]">Standard Mode (Proximity & Rating)</span>
            <span className="text-[10px] font-bold bg-[#f4f0e8] text-[#506155] px-2.5 py-0.5 rounded-full">Default</span>
          </div>
          <p className="text-xs text-[#7c8d82] mt-2.5 leading-relaxed">
            Workers are dispatched based purely on customer proximity distance and average rating scores.
          </p>
        </div>

        <div className={`p-6 sm:p-7 rounded-3xl border transition shadow-soft ${isCrisisMode ? "bg-[#fdf4e8] dark:bg-[#2d2214] border-[#855b16] ring-1 ring-[#855b16]" : "bg-[#ffffff]/60 dark:bg-[#13221b]/60 border-[#e2ded4]"}`}>
          <div className="flex items-center justify-between pb-2 border-b border-[#eedbc2] dark:border-[#523d24]">
            <span className="text-xs font-bold text-[#855b16] dark:text-[#dec08a]">Crisis Mode (Social Vulnerability Index)</span>
            <span className="text-[10px] font-bold bg-[#855b16] text-white px-2.5 py-0.5 rounded-full">Social Equity</span>
          </div>
          <p className="text-xs text-[#855b16] dark:text-[#dec08a] mt-2.5 leading-relaxed">
            Dispatches jobs to workers supporting 4+ dependents with under 1 month savings buffer first, preventing emergency poverty traps.
          </p>
        </div>
      </div>

      {/* Worker Allocation Queue List with Smooth Spring Reorder */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#14221b] dark:text-[#edebe4] font-serif">
            Live Worker Dispatch Priority Queue ({displayList.length} Workers)
          </h2>
          <span className="text-xs text-[#7c8d82]">
            {isCrisisMode ? "Sorted by Vulnerability Index (100 → 0)" : "Sorted by Merit Rating (5.0 → 0)"}
          </span>
        </div>

        <div className="space-y-3">
          <AnimatePresence>
            {displayList.map((w, index) => (
              <motion.div
                key={w.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className={`p-4 sm:p-5 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition shadow-soft ${
                  isCrisisMode && w.vulnerabilityScore > 80
                    ? "bg-[#fdf4e8] dark:bg-[#2d2214] border-[#eedbc2] dark:border-[#523d24]"
                    : "bg-[#ffffff] dark:bg-[#13221b] border-[#e2ded4] dark:border-[#233b2e]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#193927] text-[#f9f7f2] font-bold text-xs flex items-center justify-center shrink-0">
                    #{index + 1}
                  </div>
                  <img src={w.avatar} alt={w.name} className="w-12 h-12 rounded-2xl object-cover border-2 border-[#224c34]" />
                  <div>
                    <div className="text-sm font-bold text-[#14221b] dark:text-[#edebe4] flex items-center gap-2">
                      <span>{w.name}</span>
                      <span className="text-xs text-[#7c8d82]">({w.category})</span>
                    </div>
                    <div className="text-xs text-[#7c8d82] flex items-center gap-2 mt-0.5">
                      <span>★ {w.rating} Rating</span>
                      <span>•</span>
                      <span>{w.dependentsCount} Dependents</span>
                      <span>•</span>
                      <span>{w.savingsBufferMonths} Mo Savings Buffer</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-[#855b16] dark:text-[#dec08a]">
                    Equity Vulnerability: {w.vulnerabilityScore}/100
                  </div>
                  <span className="text-[10px] bg-[#f0f5f2] dark:bg-[#193225] text-[#224c34] dark:text-[#8caea0] border border-[#c5d7cc] dark:border-[#244230] font-bold px-2.5 py-0.5 rounded-full inline-block mt-1">
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

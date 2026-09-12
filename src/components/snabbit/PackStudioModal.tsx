"use client";

import React, { useState } from "react";
import { OutcomePack, PackTaskItem } from "@/lib/mockData";
import { useApp } from "@/context/AppContext";
import { formatINR } from "@/lib/utils";
import { X, Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function PackStudioModal() {
  const { activePackStudio, setActivePackStudio, addToCart } = useApp();

  if (!activePackStudio) return null;

  const pack: OutcomePack = activePackStudio;

  // Selected tasks state inside Pack Studio
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>(
    pack.tasks.filter((t) => t.defaultIncluded).map((t) => t.id)
  );

  const toggleTask = (id: string) => {
    if (selectedTaskIds.includes(id)) {
      if (selectedTaskIds.length === 1) return; // keep at least 1
      setSelectedTaskIds((prev) => prev.filter((i) => i !== id));
    } else {
      setSelectedTaskIds((prev) => [...prev, id]);
    }
  };

  // Compute customized total
  const customizedPrice = pack.tasks
    .filter((t) => selectedTaskIds.includes(t.id))
    .reduce((acc, t) => acc + t.priceDeltaINR, 0);

  const workerTakeHome = Math.round(customizedPrice * 0.83);
  const totalDurationMin = pack.tasks
    .filter((t) => selectedTaskIds.includes(t.id))
    .reduce((acc, t) => acc + t.durationMinutes, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm animate-in fade-in duration-150">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        className="bg-white rounded-2xl shadow-elevated border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-start justify-between bg-slate-50">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider bg-slate-200 text-slate-800 px-2.5 py-0.5 rounded-md">
                Pack Studio
              </span>
              <span className="text-xs text-slate-500">• Approx {Math.round(totalDurationMin / 60 * 10) / 10} hrs</span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">{pack.title}</h2>
            <p className="text-xs text-slate-600 mt-0.5">{pack.outcomeHeadline}</p>
          </div>

          <button
            onClick={() => setActivePackStudio(null)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Task Selection Area */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Toggle Inclusions & Scope:</span>
            <span className="text-[11px] text-slate-600 font-medium">Real-Time Price Sync</span>
          </div>

          <div className="space-y-2">
            {pack.tasks.map((task) => {
              const isChecked = selectedTaskIds.includes(task.id);
              return (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isChecked
                      ? "border-slate-800 bg-slate-50/80 shadow-2xs"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                        isChecked
                          ? "bg-slate-900 border-slate-900 text-white"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{task.name}</div>
                      <div className="text-[10px] text-slate-500">
                        {task.craft} Craft • ~{task.durationMinutes} mins
                      </div>
                    </div>
                  </div>

                  <div className="text-right font-mono font-bold text-xs text-slate-900">
                    +{formatINR(task.priceDeltaINR)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Real-time Itemized Ledger Breakdown */}
          <div className="bg-slate-900 text-white p-4 rounded-xl space-y-2 mt-4">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Co-op Wage Transparency Ledger</span>
              <span className="text-white">83% Direct to Worker</span>
            </div>
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-slate-300">Direct Worker Take-Home:</span>
              <span className="font-mono font-bold text-white">{formatINR(workerTakeHome)}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Welfare & Equipment Pool (12%):</span>
              <span className="font-mono text-slate-400">{formatINR(Math.round(customizedPrice * 0.12))}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Co-op Cloud & Dispatch (5%):</span>
              <span className="font-mono text-slate-400">{formatINR(Math.round(customizedPrice * 0.05))}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Customized Total</div>
            <div className="text-xl font-black text-slate-900 font-mono">
              {formatINR(customizedPrice)}
            </div>
          </div>

          <button
            onClick={() => {
              addToCart({
                id: `${pack.id}-custom`,
                title: `${pack.title} (Customized)`,
                price: customizedPrice,
                category: "Outcome Pack",
                etaMinutes: 45,
                unitType: "pack",
                workerPayout: workerTakeHome,
              });
              setActivePackStudio(null);
            }}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <span>Add Custom Pack to Cart</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

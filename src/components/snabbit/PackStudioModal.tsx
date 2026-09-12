"use client";

import React, { useState } from "react";
import { OutcomePack, PackTaskItem } from "@/lib/mockData";
import { useApp } from "@/context/AppContext";
import { formatINR } from "@/lib/utils";
import { X, Check, Sliders, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-150">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-white rounded-3xl shadow-elevated border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                Pack Studio Customizer
              </span>
              <span className="text-xs text-slate-400">• Approx {Math.round(totalDurationMin / 60 * 10) / 10} hrs</span>
            </div>
            <h2 className="text-xl font-black text-slate-900">{pack.title}</h2>
            <p className="text-xs text-slate-600 mt-0.5">{pack.outcomeHeadline}</p>
          </div>

          <button
            onClick={() => setActivePackStudio(null)}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Task Selection Area */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Toggle Inclusions & Extras:</span>
            <span className="text-[11px] text-emerald-600 font-semibold">Live Price Sync</span>
          </div>

          <div className="space-y-2.5">
            {pack.tasks.map((task) => {
              const isChecked = selectedTaskIds.includes(task.id);
              return (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isChecked
                      ? "border-emerald-500 bg-emerald-50/30 shadow-xs"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                        isChecked
                          ? "bg-emerald-600 border-emerald-600 text-white"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{task.name}</div>
                      <div className="text-[10px] text-slate-400">
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
          <div className="bg-slate-900 text-white p-4 rounded-2xl space-y-2 mt-4">
            <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center justify-between">
              <span>Co-op Wage Transparency Ledger</span>
              <span>83% to Worker</span>
            </div>
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-slate-300">Direct Worker Take-Home:</span>
              <span className="font-mono font-bold text-emerald-400">{formatINR(workerTakeHome)}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300">Welfare & Equipment Pool (12%):</span>
              <span className="font-mono text-slate-400">{formatINR(Math.round(customizedPrice * 0.12))}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300">Co-op Cloud & Protocol (5%):</span>
              <span className="font-mono text-slate-400">{formatINR(Math.round(customizedPrice * 0.05))}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Customized Total</div>
            <div className="text-2xl font-black text-slate-900 font-mono">
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
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3 rounded-2xl transition shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <span>Add Custom Pack to Cart</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

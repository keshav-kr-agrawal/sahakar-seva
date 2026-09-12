"use client";

import React from "react";
import { SAMPLE_XAI_EXPLANATION } from "@/lib/mockData";
import { useApp } from "@/context/AppContext";
import { X, ShieldCheck, Cpu, Award, ArrowUpRight, Scale, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function XAIExplanationDrawer() {
  const { activeXAIModal, setActiveXAIModal, showToast } = useApp();

  if (!activeXAIModal) return null;

  const data = SAMPLE_XAI_EXPLANATION;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-150">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-white rounded-3xl shadow-elevated border border-slate-200 w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
          <div>
            <div className="flex items-center gap-1.5 mb-1 text-emerald-700 font-bold text-xs">
              <Cpu className="w-4 h-4 text-emerald-600" />
              <span>Explainable AI (XAI) Matching Engine</span>
            </div>
            <h2 className="text-xl font-black text-slate-900">
              Why was {data.workerName} assigned?
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              SHAP (SHapley Additive exPlanations) & LIME Algorithmic Transparency Console
            </p>
          </div>

          <button
            onClick={() => setActiveXAIModal(false)}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Match Confidence Score */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80">
            <div>
              <div className="text-xs font-bold text-emerald-900">Total Match Affinity</div>
              <div className="text-[11px] text-emerald-700">Welfare-constrained multi-objective score</div>
            </div>
            <div className="text-2xl font-black text-emerald-700 font-mono">
              {(data.confidenceScore * 100).toFixed(0)}%
            </div>
          </div>

          {/* SHAP Feature Contribution List */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              SHAP Value Factor Weights:
            </div>

            {data.shapFeatures.map((feat, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">{feat.feature}</span>
                  <span className="text-xs font-mono font-black text-emerald-600 bg-emerald-100/60 px-2 py-0.5 rounded-md">
                    +{feat.shapValue.toFixed(2)} SHAP
                  </span>
                </div>
                <p className="text-[11px] text-slate-600">{feat.description}</p>
                {/* Visual SHAP Contribution Bar */}
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${feat.shapValue * 250}%` }}
                    className="h-full bg-emerald-500 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Cooperative Fairness Console Metrics */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase">
              <span className="flex items-center gap-1.5 text-white">
                <Scale className="w-3.5 h-3.5 text-emerald-400" />
                <span>Fairness Console Metrics</span>
              </span>
              <span className="text-emerald-400 font-mono">Gini: {data.giniFairnessIndex}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                <span className="text-slate-400 block text-[10px]">Worker Weekly Load:</span>
                <span className="font-bold text-white font-mono">{data.hoursWorkedThisWeek} hrs (Cap: 36h)</span>
              </div>
              <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                <span className="text-slate-400 block text-[10px]">Overwork Protection:</span>
                <span className="font-bold text-emerald-400">Strictly Enforced</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with Arbitration Appeal Option */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
          <span className="text-slate-500">Dispute this assignment?</span>
          <button
            onClick={() => {
              setActiveXAIModal(false);
              showToast("Appeal Logged", "Case submitted to Worker Arbitration Panel (3 senior peers + 1 admin).");
            }}
            className="text-xs font-bold text-slate-700 hover:text-slate-900 bg-white px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 transition cursor-pointer"
          >
            Appeal to Arbitration Panel
          </button>
        </div>
      </motion.div>
    </div>
  );
}

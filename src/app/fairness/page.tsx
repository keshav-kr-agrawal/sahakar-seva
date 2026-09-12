"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { SAMPLE_XAI_EXPLANATION, WORKERS } from "@/lib/mockData";
import {
  Scale,
  ShieldCheck,
  TrendingUp,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  Heart,
  Users,
  Award,
  ArrowRight,
  Info,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

export default function FairnessConsolePage() {
  const { isCrisisMode, toggleCrisisMode, showToast } = useApp();

  // Interactive SHAP factor simulator state
  const [skillCertWeight, setSkillCertWeight] = useState(0.32);
  const [proximityDistanceKm, setProximityDistanceKm] = useState(1.8);
  const [weeklyHoursCompleted, setWeeklyHoursCompleted] = useState(26);
  const [hasSafetyBadge, setHasSafetyBadge] = useState(true);

  // Computed affinity score based on SHAP mathematical formulation
  const proximityFactor = Math.max(0.05, +(0.35 - (proximityDistanceKm / 10) * 0.25).toFixed(2));
  const workloadFairnessFactor = +(Math.max(0.02, 0.25 - (weeklyHoursCompleted / 40) * 0.2).toFixed(2));
  const safetyFactor = hasSafetyBadge ? 0.15 : 0.0;
  const rawSum = skillCertWeight + proximityFactor + workloadFairnessFactor + safetyFactor;
  const finalAffinityPct = Math.min(99, Math.round((rawSum / 0.95) * 100));

  const sampleAppeals = [
    {
      id: "APP-892",
      workerName: "Manoj Kumar (Plumber)",
      issue: "Deprioritized due to rain-induced 20-min delay",
      panelVote: "3 Yes / 0 No",
      verdict: "Algorithm Override Approved • Fairness Rating Restored",
      date: "Yesterday",
    },
    {
      id: "APP-884",
      workerName: "Sunita Devi (Domestic Pro)",
      issue: "Customer flagged late cancellation due to illness",
      panelVote: "2 Yes / 1 Abstain",
      verdict: "Excused Under Cooperative Health Shield",
      date: "3 days ago",
    },
    {
      id: "APP-871",
      workerName: "Arun Swamy (Electrician)",
      issue: "High-value commercial wiring job allocation dispute",
      panelVote: "Unanimous Override",
      verdict: "Job Re-assigned via Equitable Queue",
      date: "Last week",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-20">
      
      {/* 1. Page Header */}
      <div className="bg-slate-50 border-b border-slate-200 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-200 text-slate-800 px-2.5 py-1 rounded-full">
              abc.md Innovation 2
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
              Welfare-Constrained Fair Matching (XAI)
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Algorithmic Fairness Console
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 max-w-2xl font-normal leading-relaxed mt-1">
                Real-time mathematical explainability powered by SHAP (SHapley Additive exPlanations) & LIME. Every dispatch decision is transparent, anti-monopoly, and auditable.
              </p>
            </div>

            {/* Crisis Allocation Toggle */}
            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3 shrink-0">
              <div className="space-y-0.5">
                <div className="text-xs font-black text-slate-900">Vulnerability Equity Mode</div>
                <div className="text-[10px] text-slate-500">Crisis & monsoon prioritization</div>
              </div>
              <button
                onClick={toggleCrisisMode}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                  isCrisisMode
                    ? "bg-amber-600 text-white shadow-2xs"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {isCrisisMode ? "Active (Equity)" : "Standard"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        
        {/* 2. Key Fairness Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-1.5">
            <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
              Assignment Fairness Gini
            </span>
            <div className="text-2xl font-black text-slate-900 font-mono">0.24</div>
            <div className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Target &lt; 0.30 Met</span>
            </div>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-1.5">
            <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
              Avg Active Day Earnings
            </span>
            <div className="text-2xl font-black text-slate-900 font-mono">₹1,180</div>
            <div className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+26% vs Extractive Apps</span>
            </div>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-1.5">
            <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
              Travel Time Reduction
            </span>
            <div className="text-2xl font-black text-slate-900 font-mono">18.4%</div>
            <div className="text-[11px] text-slate-600 font-medium">
              Optimized via Locality Clusters
            </div>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-1.5">
            <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
              High-Value Job Equity
            </span>
            <div className="text-2xl font-black text-slate-900 font-mono">92.8%</div>
            <div className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Rotated Across Full Guild</span>
            </div>
          </div>
        </div>

        {/* 3. Live SHAP Mathematical Simulator */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-soft p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-slate-900" />
                <h2 className="text-lg font-black text-slate-900">
                  Interactive SHAP Match Factor Simulator
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Adjust dispatch variables to observe how our explainable OR-Tools & SHAP model computes pro match affinity.
              </p>
            </div>

            <div className="bg-slate-900 text-white px-4 py-2 rounded-xl flex items-center gap-3 shrink-0">
              <span className="text-xs font-semibold text-slate-300">Affinity Score:</span>
              <span className="text-lg font-black font-mono text-emerald-400">{finalAffinityPct}%</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left: Interactive Sliders */}
            <div className="space-y-5">
              {/* Slider 1: Skill Certification */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">Skill Certification & Micro-Test:</span>
                  <span className="font-mono text-slate-900">+{skillCertWeight.toFixed(2)} SHAP</span>
                </div>
                <input
                  type="range"
                  min="0.10"
                  max="0.45"
                  step="0.01"
                  value={skillCertWeight}
                  onChange={(e) => setSkillCertWeight(parseFloat(e.target.value))}
                  className="w-full accent-slate-900 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>Basic Tier 1</span>
                  <span>NSDC Certified Master</span>
                </div>
              </div>

              {/* Slider 2: Proximity Distance */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">Proximity Distance:</span>
                  <span className="font-mono text-slate-900">{proximityDistanceKm} km (+{proximityFactor.toFixed(2)} SHAP)</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="8.0"
                  step="0.1"
                  value={proximityDistanceKm}
                  onChange={(e) => setProximityDistanceKm(parseFloat(e.target.value))}
                  className="w-full accent-slate-900 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>0.5 km (Immediate Ward)</span>
                  <span>8.0 km (Max Radius)</span>
                </div>
              </div>

              {/* Slider 3: Weekly Workload */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">Weekly Workload Completed:</span>
                  <span className="font-mono text-slate-900">{weeklyHoursCompleted} hrs (+{workloadFairnessFactor.toFixed(2)} SHAP)</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="48"
                  step="1"
                  value={weeklyHoursCompleted}
                  onChange={(e) => setWeeklyHoursCompleted(parseInt(e.target.value))}
                  className="w-full accent-slate-900 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>Under-allocated (High Priority)</span>
                  <span>48 hrs (Burnout Cap)</span>
                </div>
              </div>

              {/* Checkbox: Safety Badge */}
              <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={hasSafetyBadge}
                  onChange={(e) => setHasSafetyBadge(e.target.checked)}
                  className="w-4 h-4 accent-slate-900 rounded cursor-pointer"
                />
                <div className="text-xs">
                  <span className="font-bold text-slate-900">Women-Safety Verified Certification</span>
                  <span className="text-slate-500 block text-[10px]">+0.15 SHAP for daytime household jobs</span>
                </div>
              </label>
            </div>

            {/* Right: SHAP Contribution Breakdown Visualization */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
                Mathematical Assignment Explanation
              </h3>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-700">1. Skill Verification Weight</span>
                    <span className="font-mono font-bold text-slate-900">+{skillCertWeight.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-slate-900 h-full rounded-full transition-all duration-300"
                      style={{ width: `${(skillCertWeight / 0.45) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-700">2. Proximity Bonus (Koramangala Ward)</span>
                    <span className="font-mono font-bold text-slate-900">+{proximityFactor.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-slate-900 h-full rounded-full transition-all duration-300"
                      style={{ width: `${(proximityFactor / 0.35) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-700">3. Anti-Burnout Workload Equity</span>
                    <span className="font-mono font-bold text-slate-900">+{workloadFairnessFactor.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-slate-900 h-full rounded-full transition-all duration-300"
                      style={{ width: `${(workloadFairnessFactor / 0.25) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-700">4. Women-First Safety Verification</span>
                    <span className="font-mono font-bold text-slate-900">+{safetyFactor.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-slate-900 h-full rounded-full transition-all duration-300"
                      style={{ width: `${(safetyFactor / 0.15) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 text-xs text-slate-600 leading-relaxed">
                <strong>SHAP Principle:</strong> In contrast to private platforms where rate of acceptance is penalized secretly, SahakarSeva guarantees every worker full visibility into match parameters.
              </div>
            </div>
          </div>
        </div>

        {/* 4. Worker Appeal & Democratic Override History */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-soft p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Democratic Arbitration Panel (Appeals Log)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Workers deprioritized or flagged by automated safety signals appeal to a jury of 3 peer craftsmen & 1 cooperative administrator.
              </p>
            </div>

            <Link
              href="/worker/appeal"
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold px-4 py-2 rounded-xl transition flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>Submit Worker Appeal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">Appeal ID</th>
                  <th className="py-3 px-3">Worker Pro</th>
                  <th className="py-3 px-3">Subject / Trigger</th>
                  <th className="py-3 px-3">Peer Jury Vote</th>
                  <th className="py-3 px-3">Final Decision</th>
                  <th className="py-3 px-3">Timeline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {sampleAppeals.map((appeal) => (
                  <tr key={appeal.id} className="hover:bg-slate-50 transition">
                    <td className="py-3.5 px-3 font-mono font-bold text-slate-900">{appeal.id}</td>
                    <td className="py-3.5 px-3 font-bold text-slate-900">{appeal.workerName}</td>
                    <td className="py-3.5 px-3 text-slate-600">{appeal.issue}</td>
                    <td className="py-3.5 px-3 font-mono font-semibold text-slate-800">{appeal.panelVote}</td>
                    <td className="py-3.5 px-3 text-emerald-700 font-bold">{appeal.verdict}</td>
                    <td className="py-3.5 px-3 text-slate-400">{appeal.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

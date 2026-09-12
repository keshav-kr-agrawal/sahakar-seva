"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import {
  ShieldCheck,
  Building2,
  Users,
  DollarSign,
  CheckCircle2,
  ChevronRight,
  Zap,
  Flame,
  Navigation,
  ArrowRight,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { isCrisisMode, showToast } = useApp();

  const [selectedFederation, setSelectedFederation] = useState("Bengaluru Urban Services Cooperative Federation");

  const federations = [
    "Bengaluru Urban Services Cooperative Federation",
    "Delhi NCR Craftsmen Labour Cooperative Union",
    "Mumbai Domestic & Caregivers Cooperative Federation",
  ];

  const [onboardingQueue, setOnboardingQueue] = useState([
    { id: "app-201", name: "Mukesh Yadav", skill: "Electrician", status: "Tier 1 Self", city: "HSR Layout" },
    { id: "app-202", name: "Pooja Hegde", skill: "Domestic Help", status: "Tier 2 Skill Test", city: "Koramangala" },
    { id: "app-203", name: "Kiran R", skill: "Plumber", status: "Tier 3 RWA Review", city: "Whitefield" },
  ]);

  const handleAdvanceTier = (id: string, name: string) => {
    setOnboardingQueue(onboardingQueue.filter((q) => q.id !== id));
    showToast("Worker Verified", `${name} approved as Tier 3 Active Guild Craftsman.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-white text-slate-900">
      
      {/* 1. Top Banner with Multi-Tenant Switcher */}
      <div className="bg-slate-950 text-white p-6 sm:p-8 rounded-3xl shadow-elevated flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              Federation Governance Console
            </span>
            {isCrisisMode && (
              <span className="text-[10px] font-bold bg-rose-600 text-white px-2.5 py-0.5 rounded-full">
                CRISIS MODE ACTIVE
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Cooperative Federation Control Panel
          </h1>
          <p className="text-xs text-slate-400">
            Monitoring 4,820 craftsmen, dynamic allocation fairness (Gini: 0.24), and parametric disruption reserves.
          </p>
        </div>

        {/* Multi-Tenant Switcher */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Active Labour Cooperative
          </label>
          <select
            value={selectedFederation}
            onChange={(e) => setSelectedFederation(e.target.value)}
            className="w-full bg-slate-900 text-white px-4 py-2.5 rounded-xl text-xs font-bold border border-slate-800 focus:outline-none cursor-pointer"
          >
            {federations.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2. Admin KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Guild Craftsmen", value: "4,820", sub: "+120 this week", icon: <Users className="w-5 h-5 text-slate-900" /> },
          { label: "Daily Completed Jobs", value: "1,340", sub: "98.4% on-time arrival", icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" /> },
          { label: "Worker Earnings Today", value: "₹18.4 Lakhs", sub: "83% direct take-home", icon: <DollarSign className="w-5 h-5 text-slate-900" /> },
          { label: "Commissions Saved", value: "₹4.2 Lakhs", sub: "vs private aggregators", icon: <ShieldCheck className="w-5 h-5 text-emerald-600" /> },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft space-y-2">
            <div className="p-2.5 bg-slate-50 w-fit rounded-xl border border-slate-100">
              {kpi.icon}
            </div>
            <div className="text-2xl font-black text-slate-900 font-mono tracking-tight">{kpi.value}</div>
            <div className="text-xs font-bold text-slate-700">{kpi.label}</div>
            <div className="text-[10px] text-slate-400">{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* 3. Admin Quick Action Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/admin/forecasting"
          className="p-5 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 transition flex items-center justify-between group cursor-pointer"
        >
          <div className="space-y-1">
            <div className="text-xs font-black text-slate-900 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-slate-700" />
              <span>GNN Demand Forecasting</span>
            </div>
            <p className="text-[11px] text-slate-500">7-day predicted neighborhood spikes</p>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </Link>

        <Link
          href="/admin/redistribution"
          className="p-5 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 transition flex items-center justify-between group cursor-pointer"
        >
          <div className="space-y-1">
            <div className="text-xs font-black text-slate-900 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-slate-700" />
              <span>Income Redistribution Engine</span>
            </div>
            <p className="text-[11px] text-slate-500">Monsoon crisis vulnerability ranking</p>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </Link>

        <Link
          href="/admin/batch-pooling"
          className="p-5 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 transition flex items-center justify-between group cursor-pointer"
        >
          <div className="space-y-1">
            <div className="text-xs font-black text-slate-900 flex items-center gap-1.5">
              <Navigation className="w-4 h-4 text-slate-700" />
              <span>Transit Route Batch Pooling</span>
            </div>
            <p className="text-[11px] text-slate-500">Cluster travel optimization & CO2 cuts</p>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* 4. Tiered Verification Pipeline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-900">
            Worker Onboarding Tiered Verification Pipeline
          </h2>
          <span className="text-xs font-semibold text-slate-500">3-Tier e-Shram & Aadhaar Accreditation</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stage 1 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-slate-700">Tier 1: Self-Declared</span>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">1 Applicant</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl space-y-1 border border-slate-100">
              <div className="text-xs font-bold text-slate-900">Mukesh Yadav (Electrician)</div>
              <div className="text-[11px] text-slate-500">Aadhaar verified • Pending practical test</div>
            </div>
          </div>

          {/* Stage 2 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-slate-700">Tier 2: Skill Test</span>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">1 Applicant</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl space-y-1 border border-slate-100">
              <div className="text-xs font-bold text-slate-900">Pooja Hegde (Domestic Help)</div>
              <div className="text-[11px] text-slate-500">Food Safety & Hygiene Practical Passed</div>
            </div>
          </div>

          {/* Stage 3 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-slate-700">Tier 3: Community Attestations</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">Ready to Approve</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl space-y-2.5 border border-slate-100">
              <div className="text-xs font-bold text-slate-900">Kiran R (Plumber)</div>
              <div className="text-[11px] text-slate-500">Whitefield RWA Peer Vouched (38 attestations)</div>
              <button
                onClick={() => handleAdvanceTier("app-203", "Kiran R")}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
              >
                Approve Active Tier 3
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

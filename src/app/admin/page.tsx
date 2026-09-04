"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { WORKERS } from "@/lib/mockData";
import TrustBadge from "@/components/ui/TrustBadge";
import {
  ShieldCheck,
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  UserCheck,
  Zap,
  Flame,
  Navigation
} from "lucide-react";

export default function AdminDashboardPage() {
  const { isCrisisMode, toggleCrisisMode, showToast } = useApp();

  const [selectedFederation, setSelectedFederation] = useState("Bengaluru Urban Services Cooperative");

  const federations = [
    "Bengaluru Urban Services Cooperative",
    "Delhi NCR Craftsmen Union",
    "Mumbai Domestic Workers Guild",
  ];

  const [onboardingQueue, setOnboardingQueue] = useState([
    { id: "app-201", name: "Mukesh Yadav", skill: "Electrician", status: "Tier 1 Self", city: "HSR Layout" },
    { id: "app-202", name: "Pooja Hegde", skill: "Domestic Help", status: "Tier 2 Skill Test", city: "Koramangala" },
    { id: "app-203", name: "Kiran R", skill: "Plumber", status: "Tier 3 RWA Review", city: "Whitefield" },
  ]);

  const handleAdvanceTier = (id: string, name: string) => {
    setOnboardingQueue(onboardingQueue.filter((q) => q.id !== id));
    showToast("Worker Verified!", `${name} promoted to Tier 3 Active Cooperative Guild Member.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Banner with Multi-Tenant Switcher */}
      <div className="bg-gradient-to-r from-[#0d2c1e] via-[#133e2b] to-[#1e5338] text-white p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/30">
              NCCT Federation Governance Portal
            </span>
            {isCrisisMode && (
              <span className="text-xs font-bold bg-amber-500 text-black px-2.5 py-0.5 rounded-full animate-pulse">
                CRISIS MODE ACTIVE
              </span>
            )}
          </div>

          <h1 className="text-3xl font-extrabold font-serif text-emerald-100">
            Federation Admin Control Panel
          </h1>
        </div>

        {/* Multi-Tenant Switcher */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-emerald-200 uppercase tracking-wider">
            Select Active Regional Federation
          </label>
          <select
            value={selectedFederation}
            onChange={(e) => setSelectedFederation(e.target.value)}
            className="w-full bg-[#0d2c1e] text-emerald-100 px-4 py-2 rounded-xl text-xs font-bold border border-emerald-600/50 focus:outline-none"
          >
            {federations.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Admin KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Guild Workers", value: "4,820", sub: "+120 this week", icon: <Users className="w-5 h-5 text-[#2d7a52]" /> },
          { label: "Daily Completed Jobs", value: "1,340", sub: "98.4% on-time", icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" /> },
          { label: "Worker Earnings Today", value: "₹18.4 Lakhs", sub: "82% direct take-home", icon: <DollarSign className="w-5 h-5 text-amber-600" /> },
          { label: "Commission Saved for Workers", value: "₹4.2 Lakhs", sub: "vs private apps", icon: <ShieldCheck className="w-5 h-5 text-rose-500" /> },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white dark:bg-[#15241d] p-5 rounded-2xl border border-[#133e2b]/15 shadow-md space-y-2">
            <div className="p-2.5 bg-[#e8f4ed] dark:bg-emerald-950 w-fit rounded-xl">{kpi.icon}</div>
            <div className="text-2xl font-extrabold text-[#133e2b] dark:text-emerald-300">{kpi.value}</div>
            <div className="text-xs font-bold text-gray-700 dark:text-gray-300">{kpi.label}</div>
            <div className="text-[10px] text-muted-foreground">{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Admin Quick Action Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/admin/forecasting"
          className="p-5 bg-white dark:bg-[#15241d] rounded-2xl border border-[#133e2b]/15 shadow-sm hover:shadow-md transition flex items-center justify-between group"
        >
          <div className="space-y-1">
            <div className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>AI Demand Forecasting</span>
            </div>
            <p className="text-[11px] text-muted-foreground">7-day predicted neighborhood spikes</p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          href="/admin/redistribution"
          className="p-5 bg-white dark:bg-[#15241d] rounded-2xl border border-[#133e2b]/15 shadow-sm hover:shadow-md transition flex items-center justify-between group"
        >
          <div className="space-y-1">
            <div className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-rose-500" />
              <span>Smart Income Redistribution</span>
            </div>
            <p className="text-[11px] text-muted-foreground">Monsoon Crisis Mode vulnerability sorting</p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          href="/admin/batch-pooling"
          className="p-5 bg-white dark:bg-[#15241d] rounded-2xl border border-[#133e2b]/15 shadow-sm hover:shadow-md transition flex items-center justify-between group"
        >
          <div className="space-y-1">
            <div className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
              <Navigation className="w-4 h-4 text-[#2d7a52]" />
              <span>Neighborhood Batch Pooling</span>
            </div>
            <p className="text-[11px] text-muted-foreground">Route optimization & CO2 reduction</p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Tiered Verification Kanban Stepper Queue */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#133e2b] dark:text-emerald-300 font-serif">
            Worker Onboarding Tiered Verification Pipeline
          </h2>
          <span className="text-xs text-muted-foreground">3 Verification Stages</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stage 1 */}
          <div className="bg-white dark:bg-[#15241d] p-5 rounded-2xl border border-[#133e2b]/15 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Tier 1: Self-Declared</span>
              <span className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-bold">1 Applications</span>
            </div>
            <div className="p-3 bg-[#f4efe8]/50 rounded-xl space-y-1">
              <div className="text-xs font-bold">Mukesh Yadav (Electrician)</div>
              <div className="text-[10px] text-muted-foreground">Aadhaar verified • Pending ITI check</div>
            </div>
          </div>

          {/* Stage 2 */}
          <div className="bg-white dark:bg-[#15241d] p-5 rounded-2xl border border-[#133e2b]/15 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-xs font-bold text-[#2d7a52]">Tier 2: Skill Assessment</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">1 Applications</span>
            </div>
            <div className="p-3 bg-[#e8f4ed]/50 rounded-xl space-y-1">
              <div className="text-xs font-bold">Pooja Hegde (Domestic Help)</div>
              <div className="text-[10px] text-muted-foreground">NCCT Food Safety Practical Passed</div>
            </div>
          </div>

          {/* Stage 3 */}
          <div className="bg-white dark:bg-[#15241d] p-5 rounded-2xl border border-[#133e2b]/15 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-xs font-bold text-amber-600">Tier 3: RWA Household Review</span>
              <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">Ready to Approve</span>
            </div>
            <div className="p-3 bg-[#fceee9] rounded-xl space-y-2">
              <div className="text-xs font-bold">Kiran R (Plumber)</div>
              <div className="text-[10px] text-muted-foreground">Whitefield RWA Peer Vouched</div>
              <button
                onClick={() => handleAdvanceTier("app-203", "Kiran R")}
                className="w-full bg-[#133e2b] hover:bg-[#1e5338] text-white py-1.5 rounded-lg text-xs font-bold transition shadow-sm"
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

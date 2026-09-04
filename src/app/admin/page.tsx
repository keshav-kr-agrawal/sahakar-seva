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
  Navigation
} from "lucide-react";

export default function AdminDashboardPage() {
  const { isCrisisMode, showToast } = useApp();

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
    showToast("Worker Verified", `${name} promoted to Tier 3 Active Guild Craftsman.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Banner with Multi-Tenant Switcher */}
      <div className="bg-[#193927] text-[#f9f7f2] p-8 rounded-3xl shadow-elevated flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-[#2d6243]">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-[#dce8e1] uppercase tracking-wider bg-[#224c34] px-3 py-1 rounded-full border border-[#35674a]">
              NCCT Federation Governance Portal
            </span>
            {isCrisisMode && (
              <span className="text-[10px] font-bold bg-[#8c381c] text-white px-2.5 py-0.5 rounded-full border border-[#be522d]">
                CRISIS MODE ACTIVE
              </span>
            )}
          </div>

          <h1 className="text-3xl font-extrabold font-serif text-[#f9f7f2]">
            Federation Admin Control Panel
          </h1>
        </div>

        {/* Multi-Tenant Switcher */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-[#c5d7cc] uppercase tracking-wider">
            Active Regional Federation
          </label>
          <select
            value={selectedFederation}
            onChange={(e) => setSelectedFederation(e.target.value)}
            className="w-full bg-[#0b1a12] text-[#dce8e1] px-4 py-2.5 rounded-xl text-xs font-bold border border-[#244230] focus:outline-none"
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
          { label: "Active Guild Craftsmen", value: "4,820", sub: "+120 this week", icon: <Users className="w-5 h-5 text-[#224c34]" /> },
          { label: "Daily Completed Jobs", value: "1,340", sub: "98.4% on-time arrival", icon: <CheckCircle2 className="w-5 h-5 text-[#2d6243]" /> },
          { label: "Worker Earnings Today", value: "₹18.4 Lakhs", sub: "82% direct take-home", icon: <DollarSign className="w-5 h-5 text-[#855b16]" /> },
          { label: "Commissions Saved", value: "₹4.2 Lakhs", sub: "vs private apps", icon: <ShieldCheck className="w-5 h-5 text-[#a84422]" /> },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-[#ffffff] dark:bg-[#13221b] p-5 rounded-3xl border border-[#e2ded4] dark:border-[#233b2e] shadow-xs space-y-2">
            <div className="p-2.5 bg-[#f0f5f2] dark:bg-[#152a1e] w-fit rounded-xl border border-[#c5d7cc] dark:border-[#2a4e39]">
              {kpi.icon}
            </div>
            <div className="text-2xl font-extrabold text-[#14221b] dark:text-[#edebe4] tracking-tight">{kpi.value}</div>
            <div className="text-xs font-bold text-[#506155] dark:text-[#a3b8ac]">{kpi.label}</div>
            <div className="text-[10px] text-[#7c8d82]">{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Admin Quick Action Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/admin/forecasting"
          className="p-5 bg-[#ffffff] dark:bg-[#13221b] rounded-3xl border border-[#e2ded4] dark:border-[#233b2e] shadow-xs hover:border-[#193927] transition flex items-center justify-between group"
        >
          <div className="space-y-1">
            <div className="text-xs font-bold text-[#14221b] dark:text-[#edebe4] flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#855b16]" />
              <span>AI Demand Forecasting</span>
            </div>
            <p className="text-[11px] text-[#7c8d82]">7-day predicted neighborhood spikes</p>
          </div>
          <ChevronRight className="w-4 h-4 text-[#7c8d82] group-hover:translate-x-0.5 transition-transform" />
        </Link>

        <Link
          href="/admin/redistribution"
          className="p-5 bg-[#ffffff] dark:bg-[#13221b] rounded-3xl border border-[#e2ded4] dark:border-[#233b2e] shadow-xs hover:border-[#193927] transition flex items-center justify-between group"
        >
          <div className="space-y-1">
            <div className="text-xs font-bold text-[#14221b] dark:text-[#edebe4] flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-[#a84422]" />
              <span>Smart Income Redistribution</span>
            </div>
            <p className="text-[11px] text-[#7c8d82]">Monsoon Crisis Mode vulnerability sorting</p>
          </div>
          <ChevronRight className="w-4 h-4 text-[#7c8d82] group-hover:translate-x-0.5 transition-transform" />
        </Link>

        <Link
          href="/admin/batch-pooling"
          className="p-5 bg-[#ffffff] dark:bg-[#13221b] rounded-3xl border border-[#e2ded4] dark:border-[#233b2e] shadow-xs hover:border-[#193927] transition flex items-center justify-between group"
        >
          <div className="space-y-1">
            <div className="text-xs font-bold text-[#14221b] dark:text-[#edebe4] flex items-center gap-1.5">
              <Navigation className="w-4 h-4 text-[#224c34]" />
              <span>Neighborhood Batch Pooling</span>
            </div>
            <p className="text-[11px] text-[#7c8d82]">RWA Route optimization & CO2 reduction</p>
          </div>
          <ChevronRight className="w-4 h-4 text-[#7c8d82] group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Tiered Verification Kanban Pipeline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#14221b] dark:text-[#edebe4] font-serif">
            Worker Onboarding Tiered Verification Pipeline
          </h2>
          <span className="text-xs text-[#7c8d82]">3-Tier Quality Accreditation</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stage 1 */}
          <div className="bg-[#ffffff] dark:bg-[#13221b] p-5 rounded-3xl border border-[#e2ded4] dark:border-[#233b2e] shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-[#ede9e1] dark:border-[#233b2e] pb-2">
              <span className="text-xs font-bold text-[#506155] dark:text-[#a3b8ac]">Tier 1: Self-Declared</span>
              <span className="text-[10px] bg-[#f4f0e8] text-[#506155] px-2 py-0.5 rounded-full font-bold">1 Applicant</span>
            </div>
            <div className="p-3.5 bg-[#f9f7f2] dark:bg-[#182c22] rounded-2xl space-y-1 border border-[#ede9e1] dark:border-[#244230]">
              <div className="text-xs font-bold text-[#14221b] dark:text-[#edebe4]">Mukesh Yadav (Electrician)</div>
              <div className="text-[11px] text-[#7c8d82]">Aadhaar verified • Pending ITI skill test</div>
            </div>
          </div>

          {/* Stage 2 */}
          <div className="bg-[#ffffff] dark:bg-[#13221b] p-5 rounded-3xl border border-[#e2ded4] dark:border-[#233b2e] shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-[#ede9e1] dark:border-[#233b2e] pb-2">
              <span className="text-xs font-bold text-[#224c34] dark:text-[#a3c9b4]">Tier 2: Practical Skill Test</span>
              <span className="text-[10px] bg-[#f0f5f2] text-[#224c34] px-2 py-0.5 rounded-full font-bold">1 Applicant</span>
            </div>
            <div className="p-3.5 bg-[#f0f5f2] dark:bg-[#152a1e] rounded-2xl space-y-1 border border-[#c5d7cc] dark:border-[#2a4e39]">
              <div className="text-xs font-bold text-[#193927] dark:text-[#dce8e1]">Pooja Hegde (Domestic Help)</div>
              <div className="text-[11px] text-[#506155] dark:text-[#a3b8ac]">NCCT Food Safety Practical Passed</div>
            </div>
          </div>

          {/* Stage 3 */}
          <div className="bg-[#ffffff] dark:bg-[#13221b] p-5 rounded-3xl border border-[#e2ded4] dark:border-[#233b2e] shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-[#ede9e1] dark:border-[#233b2e] pb-2">
              <span className="text-xs font-bold text-[#855b16] dark:text-[#dec08a]">Tier 3: RWA Household Review</span>
              <span className="text-[10px] bg-[#fdf4e8] text-[#855b16] px-2 py-0.5 rounded-full font-bold">Ready to Approve</span>
            </div>
            <div className="p-3.5 bg-[#fdf4e8] dark:bg-[#2d2214] rounded-2xl space-y-2.5 border border-[#eedbc2] dark:border-[#523d24]">
              <div className="text-xs font-bold text-[#855b16] dark:text-[#dec08a]">Kiran R (Plumber)</div>
              <div className="text-[11px] text-[#7c8d82]">Whitefield RWA Peer Vouched</div>
              <button
                onClick={() => handleAdvanceTier("app-203", "Kiran R")}
                className="w-full bg-[#193927] hover:bg-[#224c34] text-white py-2 rounded-xl text-xs font-bold transition shadow-xs"
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

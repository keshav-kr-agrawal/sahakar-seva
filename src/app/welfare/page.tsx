"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ACTIVE_PARAMETRIC_ALERT, WORKERS } from "@/lib/mockData";
import { formatINR } from "@/lib/utils";
import {
  Umbrella,
  ShieldCheck,
  TrendingUp,
  HeartPulse,
  Clock,
  Zap,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  ArrowRight,
  Sparkles,
  DollarSign,
  CloudRain,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";

export default function WelfareProtectionPage() {
  const [activeTab, setActiveTab] = useState<"parametric" | "meg" | "insurance">("parametric");
  const [simulatedRainMm, setSimulatedRainMm] = useState(54);
  const [workerCompletedJobs, setWorkerCompletedJobs] = useState(24);
  const isRainTriggerActive = simulatedRainMm >= 45;

  const sampleRecentPayouts = [
    {
      id: "UPI-RAIN-9812",
      workerName: "Manoj Kumar (Plumber)",
      locality: "Indiranagar Ward 112",
      disruptionType: "Heavy Monsoon Rain (58mm/hr)",
      amount: "₹850",
      status: "Instant UPI Credited",
      timestamp: "Today, 08:14 AM",
    },
    {
      id: "UPI-RAIN-9813",
      workerName: "Sunita Devi (Domestic Pro)",
      locality: "Koramangala 4th Block",
      disruptionType: "Severe Downpour & Flooding (62mm/hr)",
      amount: "₹850",
      status: "Instant UPI Credited",
      timestamp: "Today, 08:18 AM",
    },
    {
      id: "UPI-RAIN-9814",
      workerName: "Arun Swamy (Electrician)",
      locality: "HSR Layout Sector 3",
      disruptionType: "Heavy Monsoon Rain (51mm/hr)",
      amount: "₹850",
      status: "Instant UPI Credited",
      timestamp: "Today, 08:24 AM",
    },
    {
      id: "UPI-RAIN-9815",
      workerName: "Deepa Nair (Caregiver)",
      locality: "Jayanagar 4th Block",
      disruptionType: "Monsoon Disruption (49mm/hr)",
      amount: "₹850",
      status: "Instant UPI Credited",
      timestamp: "Today, 08:31 AM",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-20">
      
      {/* 1. Header Banner */}
      <div className="bg-slate-50 border-b border-slate-200 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-200 text-slate-800 px-2.5 py-1 rounded-full">
              Social Security & Welfare Engine
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
              Parametric Insurance & Minimum Earnings Guarantee (MEG)
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Worker Welfare & Parametric Shield
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 max-w-2xl font-normal leading-relaxed mt-1">
                Zero claim forms, zero waiting periods. Automated climate disruption payouts and guaranteed ₹10,000/mo income floor under cooperative social security reserves.
              </p>
            </div>

            {/* Live Indicator Pill */}
            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <div>
                <div className="text-xs font-black text-slate-900">Live IMD Weather Oracle</div>
                <div className="text-[10px] font-mono text-slate-500">Auto-payout protocol: ACTIVE</div>
              </div>
            </div>
          </div>

          {/* Segmented Control */}
          <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 text-xs font-bold w-fit mt-4">
            {[
              { id: "parametric", label: "🌧️ Parametric Weather Shield" },
              { id: "meg", label: "🛡️ ₹10,000 MEG Floor" },
              { id: "insurance", label: "🏥 Usage-Based Micro-Insurance" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-lg transition cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-slate-900 text-white shadow-2xs font-black"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        
        {/* Tab 1: Parametric Weather Protection */}
        {activeTab === "parametric" && (
          <div className="space-y-8">
            {/* Live Status Hero Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400">
                    <CloudRain className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
                      Disruption Signal Confirmed
                    </span>
                    <h2 className="text-xl font-black text-white">
                      Automated Rainfall Relief Payout Protocol
                    </h2>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400">Today&apos;s Disbursed Relief:</span>
                  <div className="text-2xl font-black font-mono text-white">
                    ₹35,700 <span className="text-xs text-slate-400 font-normal">to 42 craftsmen</span>
                  </div>
                </div>
              </div>

              {/* Rainfall Trigger Simulator */}
              <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/80 space-y-3">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-300">Simulate IMD Sensor Rainfall Rate:</span>
                  <span className="font-mono text-emerald-400 font-bold">{simulatedRainMm} mm / hour</span>
                </div>

                <input
                  type="range"
                  min="10"
                  max="100"
                  step="1"
                  value={simulatedRainMm}
                  onChange={(e) => setSimulatedRainMm(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />

                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>10 mm/hr (Light Drizzle)</span>
                  <span className="text-emerald-400 font-bold">45 mm/hr (Parametric Trigger Threshold)</span>
                  <span>100 mm/hr (Cloudburst)</span>
                </div>

                <div className="pt-2 text-xs">
                  {isRainTriggerActive ? (
                    <div className="p-3 bg-emerald-950/80 border border-emerald-700 text-emerald-200 rounded-xl flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span><strong>Threshold Exceeded:</strong> Verified weather disruption signal active. ₹850 lost-income protection automatically credited to worker UPI within 180 seconds.</span>
                    </div>
                  ) : (
                    <div className="p-3 bg-slate-700/60 border border-slate-600 text-slate-300 rounded-xl flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>Weather within manageable operating limits. Standard dispatch operations running.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Live Disruption Payouts Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-soft p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    Live Disruption Payout Ledger
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Immutable public disbursement ledger verified via bank UPI reference codes.
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-xl">
                  Bengaluru Central Oracle Feed
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-3">UPI Transfer ID</th>
                      <th className="py-3 px-3">Craftsman</th>
                      <th className="py-3 px-3">Ward Zone</th>
                      <th className="py-3 px-3">Disruption Trigger</th>
                      <th className="py-3 px-3">Relief Credit</th>
                      <th className="py-3 px-3">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {sampleRecentPayouts.map((payout) => (
                      <tr key={payout.id} className="hover:bg-slate-50 transition">
                        <td className="py-3.5 px-3 font-mono font-bold text-slate-900">{payout.id}</td>
                        <td className="py-3.5 px-3 font-bold text-slate-900">{payout.workerName}</td>
                        <td className="py-3.5 px-3 text-slate-600">{payout.locality}</td>
                        <td className="py-3.5 px-3 text-slate-800">{payout.disruptionType}</td>
                        <td className="py-3.5 px-3 text-emerald-700 font-black font-mono">{payout.amount}</td>
                        <td className="py-3.5 px-3 text-slate-400">{payout.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Minimum Earnings Guarantee (MEG) */}
        {activeTab === "meg" && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-8 shadow-soft">
            <div className="max-w-3xl space-y-2">
              <div className="flex items-center gap-2 text-slate-900">
                <TrendingUp className="w-5 h-5" />
                <h2 className="text-xl font-black">₹10,000/mo Minimum Earnings Guarantee (MEG)</h2>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Using AI demand forecasting and cross-cooperative workload sharing, SahakarSeva guarantees every active worker an income floor between ₹8,000–₹12,000 per month.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Guaranteed Monthly Floor</span>
                <div className="text-3xl font-black text-slate-900 font-mono">₹10,000</div>
                <p className="text-[11px] text-slate-500">
                  Backed by 7% cooperative social security reserves & institutional contracts.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Dynamic Gap Allocation</span>
                <div className="text-3xl font-black text-emerald-700 font-mono">Active</div>
                <p className="text-[11px] text-slate-500">
                  If projected earnings fall below MEG, system prioritizes high-probability jobs automatically.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Vulnerability Weighting</span>
                <div className="text-3xl font-black text-slate-900 font-mono">Top Priority</div>
                <p className="text-[11px] text-slate-500">
                  Workers with &gt;3 dependents or low savings buffers are matched first during crisis periods.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Usage-Based Micro-Insurance */}
        {activeTab === "insurance" && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-8 shadow-soft">
            <div className="max-w-3xl space-y-2">
              <div className="flex items-center gap-2 text-slate-900">
                <HeartPulse className="w-5 h-5 text-rose-600" />
                <h2 className="text-xl font-black">One-Click Enrolment & Usage-Based Micro-Insurance</h2>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Premiums are automatically deducted in micro-amounts (₹2 to ₹5 per job) with zero large annual lump-sums, linked directly to national social security frameworks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-slate-900 text-sm">Accident Micro-Cover</h3>
                  <span className="text-[10px] font-bold bg-slate-200 px-2 py-0.5 rounded">₹5 Lakhs Cover</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  24/7 on-duty accidental disability & hospital expense reimbursement subsidized via cooperative fund.
                </p>
                <div className="pt-2 border-t border-slate-200 font-mono font-bold text-slate-800">
                  Premium: ₹3.50 / completed job
                </div>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-slate-900 text-sm">Ayushman Bharat PM-JAY</h3>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">Government Linked</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Aadhaar e-KYC integration auto-enrolls unorganized workers for ₹5,00,000 cashless secondary/tertiary hospital care.
                </p>
                <div className="pt-2 border-t border-slate-200 font-mono font-bold text-slate-800">
                  Premium: 100% Free / Subsidized
                </div>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-slate-900 text-sm">Auto-Savings Micro-Fund</h3>
                  <span className="text-[10px] font-bold bg-slate-200 px-2 py-0.5 rounded">Retirement Buffer</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  1.5% of every transaction is quietly routed into an interest-bearing cooperative credit society emergency buffer.
                </p>
                <div className="pt-2 border-t border-slate-200 font-mono font-bold text-slate-800">
                  Cooperative Savings Yield: 7.4% p.a.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import InteractiveMap from "@/components/ui/InteractiveMap";
import { formatINR } from "@/lib/utils";
import {
  HardHat,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  HeartPulse,
  Award,
  ChevronRight,
  Flame,
  Scale,
  Heart,
  Umbrella,
  Zap,
} from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

export default function WorkerDashboard() {
  const { workerStatus, setWorkerStatus, currentWorker, showToast } = useApp();

  const [jobRequests, setJobRequests] = useState([
    {
      id: "req-901",
      customerName: "Ananya Roy",
      service: "Smart Switchboard & MCB Repair",
      locality: "Koramangala 4th Block",
      distanceKm: 0.8,
      estimatedPayout: 367, // 83% direct
      timeSlot: "15-Min Arrival",
    },
    {
      id: "req-902",
      customerName: "Vikram Mehta",
      service: "Inverter AC Gas Charge",
      locality: "HSR Layout Sector 3",
      distanceKm: 1.4,
      estimatedPayout: 510,
      timeSlot: "Today, 02:00 PM",
    },
  ]);

  const weeklyEarningsData = [
    { day: "Mon", earnings: 1450 },
    { day: "Tue", earnings: 1820 },
    { day: "Wed", earnings: 2100 },
    { day: "Thu", earnings: 1950 },
    { day: "Fri", earnings: 2400 },
    { day: "Sat", earnings: 3100 },
    { day: "Sun", earnings: 2850 },
  ];

  const handleAcceptJob = (id: string, name: string) => {
    setJobRequests(jobRequests.filter((j) => j.id !== id));
    showToast("Job Accepted", `You have accepted ${name}'s 15-minute dispatch.`);
  };

  const handleDeclineJob = (id: string) => {
    setJobRequests(jobRequests.filter((j) => j.id !== id));
    showToast("Job Passed", "Request passed to next available cooperative pro without penalty.");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-white text-slate-900">
      
      {/* 1. Pro Header with Duty Status Toggle */}
      <div className="bg-slate-950 text-white p-6 sm:p-8 rounded-3xl shadow-elevated flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentWorker.avatar}
            alt={currentWorker.name}
            className="w-16 h-16 rounded-2xl object-cover border border-slate-700 shadow-xs"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold bg-slate-800 text-slate-200 px-2.5 py-0.5 rounded-full border border-slate-700">
                {currentWorker.coopRole || "Cooperative Pro Craftsman"}
              </span>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> e-Shram Verified
              </span>
            </div>
            <h1 className="text-2xl font-black text-white">{currentWorker.name}</h1>
            <div className="text-xs text-slate-400">
              ★ {currentWorker.rating} Rating • 83%+ Direct Payout Ledger • e-Shram: UAN-8821-4401-9012
            </div>
          </div>
        </div>

        {/* Shift Duty Toggle */}
        <div className="bg-slate-900 p-1.5 rounded-2xl border border-slate-800 flex items-center gap-1.5">
          <span className="text-xs font-bold text-slate-400 pl-2">Duty:</span>
          {(["online", "on_break", "offline"] as const).map((st) => (
            <button
              key={st}
              onClick={() => {
                setWorkerStatus(st as any);
                showToast("Duty Status", `Switched to ${st.replace("_", " ")}`);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer capitalize ${
                workerStatus === st
                  ? st === "online"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : st === "on_break"
                    ? "bg-amber-600 text-white"
                    : "bg-rose-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {st.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Quick Navigation Shortcuts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <Link
          href="/worker/collective-bargaining"
          className="p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 transition space-y-1 group"
        >
          <div className="flex items-center justify-between text-slate-900 font-black text-xs">
            <span>Democratic Rate Voting</span>
            <TrendingUp className="w-4 h-4 text-slate-700 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-[11px] text-slate-500">Vote on ward hourly rate cards</p>
        </Link>

        <Link
          href="/worker/safety"
          className="p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 transition space-y-1 group"
        >
          <div className="flex items-center justify-between text-rose-700 font-black text-xs">
            <span>Women-Safety Cell</span>
            <Heart className="w-4 h-4 text-rose-600 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-[11px] text-slate-500">Safe-hours filter & buddy alert</p>
        </Link>

        <Link
          href="/worker/appeal"
          className="p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 transition space-y-1 group"
        >
          <div className="flex items-center justify-between text-slate-900 font-black text-xs">
            <span>Arbitration Appeals</span>
            <Scale className="w-4 h-4 text-slate-700 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-[11px] text-slate-500">Peer jury lockout protection</p>
        </Link>

        <Link
          href={`/worker/${currentWorker.id}`}
          className="p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 transition space-y-1 group"
        >
          <div className="flex items-center justify-between text-slate-900 font-black text-xs">
            <span>Sovereign Passport</span>
            <Award className="w-4 h-4 text-slate-700 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-[11px] text-slate-500">GNN Trust Network: 94/100</p>
        </Link>
      </div>

      {/* 3. Main Grid: Incoming Dispatch + Earnings & Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Job Queue */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900">
              Incoming Dispatches ({jobRequests.length})
            </h2>
            <span className="text-xs font-semibold text-slate-500">Zero-Penalty Decline</span>
          </div>

          <div className="space-y-4">
            {jobRequests.length === 0 ? (
              <div className="p-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-center text-xs text-slate-500">
                No active incoming requests at this moment. You will be alerted via voice prompt when a customer books.
              </div>
            ) : (
              jobRequests.map((job) => (
                <div
                  key={job.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-full">
                        {job.timeSlot}
                      </span>
                      <h4 className="text-base font-black text-slate-900 mt-1.5">
                        {job.service}
                      </h4>
                      <div className="text-xs text-slate-500 mt-0.5">Customer: {job.customerName}</div>
                      <div className="text-xs text-slate-500">{job.locality} ({job.distanceKm} km away)</div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-slate-400">83% Direct Pay</div>
                      <div className="text-xl font-black text-slate-900 font-mono">
                        {formatINR(job.estimatedPayout)}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => handleDeclineJob(job.id)}
                      className="py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <XCircle className="w-3.5 h-3.5 text-slate-500" />
                      <span>Pass to Guild</span>
                    </button>
                    <button
                      onClick={() => handleAcceptJob(job.id, job.customerName)}
                      className="py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Accept 15m Dispatch</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Welfare & Insurance Status Card */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-soft space-y-4">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Umbrella className="w-4 h-4 text-slate-800" />
              <span>Cooperative Welfare & Parametric Shield</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Group Medical Policy</span>
                <span className="font-bold text-slate-900">Active (₹5,00,000 Ayushman)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Parametric Rain Insurance Reserve</span>
                <span className="font-bold text-emerald-700 font-mono">₹14,200 Available</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Guaranteed Monthly Floor</span>
                <span className="font-bold text-slate-900 font-mono">₹10,000/mo MEG Floor Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Earnings Trend & Live Heatmap */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  Weekly Direct Payout
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  Earnings Trend (This Week: ₹15,670)
                </h3>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                +14.2% vs Last Week
              </span>
            </div>

            <div className="h-56 w-full pt-3">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyEarningsData}>
                  <defs>
                    <linearGradient id="workerEarningsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0f172a" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#0f172a" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `₹${v}`} />
                  <Tooltip formatter={(value) => [`₹${value}`, "Net Take-Home"]} />
                  <Area type="monotone" dataKey="earnings" stroke="#0f172a" strokeWidth={2.5} fill="url(#workerEarningsGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Flame className="w-4 h-4 text-slate-800" />
                <span>Demand Density Heatmap (Bangalore Urban)</span>
              </h3>
              <span className="text-xs text-slate-500">15-Min Coverage Zones</span>
            </div>
            <InteractiveMap mode="heatmap" height="h-[380px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

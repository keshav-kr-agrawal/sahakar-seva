"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { WORKERS } from "@/lib/mockData";
import InteractiveMap from "@/components/ui/InteractiveMap";
import TrustBadge from "@/components/ui/TrustBadge";
import { formatINR } from "@/lib/utils";
import {
  HardHat,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  HeartPulse,
  Award,
  ChevronRight,
  Flame,
  Scale,
  Heart
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
      estimatedPayout: 367, // 82% of 448
      timeSlot: "Today, 10:30 AM",
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
    showToast("Job Accepted!", `You have accepted ${name}'s service request.`);
  };

  const handleDeclineJob = (id: string) => {
    setJobRequests(jobRequests.filter((j) => j.id !== id));
    showToast("Job Passed", "Request passed to next available coop guild member without penalty.");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Banner with Online/Offline Toggle */}
      <div className="bg-gradient-to-r from-[#133e2b] via-[#1e5338] to-[#2d7a52] text-white p-6 sm:p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentWorker.avatar}
            alt={currentWorker.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400 shadow-md"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold bg-emerald-900/80 text-emerald-200 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                {currentWorker.coopRole || "Coop Guild Member"}
              </span>
              <span className="text-xs text-emerald-300 font-semibold">Tier 3 Verified</span>
            </div>
            <h1 className="text-2xl font-extrabold font-serif text-emerald-100">{currentWorker.name}</h1>
            <div className="text-xs text-emerald-200/80">★ {currentWorker.rating} Rating • 82% Direct Payout Ledger Active</div>
          </div>
        </div>

        {/* Shift Duty Toggle */}
        <div className="bg-[#0d2c1e] p-2 rounded-2xl border border-emerald-700/50 flex items-center gap-2">
          <span className="text-xs font-bold text-emerald-200 pl-2">Duty Status:</span>
          {(["online", "on_break", "offline"] as const).map((st) => (
            <button
              key={st}
              onClick={() => setWorkerStatus(st as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition capitalize ${
                workerStatus === st
                  ? st === "online"
                    ? "bg-[#2d7a52] text-white shadow-sm"
                    : st === "on_break"
                    ? "bg-amber-600 text-white"
                    : "bg-rose-600 text-white"
                  : "text-emerald-300/70 hover:bg-[#1e5338]"
              }`}
            >
              {st.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Worker Shortcuts Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link
          href="/worker/collective-bargaining"
          className="p-4 bg-white dark:bg-[#15241d] rounded-2xl border border-[#133e2b]/15 shadow-sm hover:shadow-md transition space-y-1 group"
        >
          <div className="flex items-center justify-between text-[#133e2b] dark:text-emerald-300">
            <span className="text-xs font-bold">Democratic Bargaining</span>
            <TrendingUp className="w-4 h-4 text-[#c85a32]" />
          </div>
          <p className="text-[11px] text-muted-foreground">Vote on minimum hourly rates</p>
        </Link>

        <Link
          href="/worker/safety"
          className="p-4 bg-white dark:bg-[#15241d] rounded-2xl border border-[#133e2b]/15 shadow-sm hover:shadow-md transition space-y-1 group"
        >
          <div className="flex items-center justify-between text-rose-700 dark:text-rose-300">
            <span className="text-xs font-bold">Women Safety Module</span>
            <Heart className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-[11px] text-muted-foreground">Safe hours & buddy check-ins</p>
        </Link>

        <Link
          href="/worker/appeal"
          className="p-4 bg-white dark:bg-[#15241d] rounded-2xl border border-[#133e2b]/15 shadow-sm hover:shadow-md transition space-y-1 group"
        >
          <div className="flex items-center justify-between text-amber-800 dark:text-amber-300">
            <span className="text-xs font-bold">Arbitration Appeals</span>
            <Scale className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-[11px] text-muted-foreground">Protection from unfair lockouts</p>
        </Link>

        <Link
          href="/heritage"
          className="p-4 bg-white dark:bg-[#15241d] rounded-2xl border border-[#133e2b]/15 shadow-sm hover:shadow-md transition space-y-1 group"
        >
          <div className="flex items-center justify-between text-[#133e2b] dark:text-emerald-300">
            <span className="text-xs font-bold">Heritage Skills</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-[11px] text-muted-foreground">Showcase master craft skills</p>
        </Link>
      </div>

      {/* Main Grid: Incoming Job Queue + Earnings Chart & Demand Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Incoming Job Queue */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#133e2b] dark:text-emerald-300 font-serif">
              Incoming Job Requests ({jobRequests.length})
            </h2>
            <span className="text-xs text-muted-foreground">Zero Penalty Decline</span>
          </div>

          <div className="space-y-4">
            {jobRequests.length === 0 ? (
              <div className="p-8 bg-white dark:bg-[#15241d] rounded-2xl border border-dashed border-gray-300 text-center text-xs text-muted-foreground">
                No active incoming requests at this moment.
              </div>
            ) : (
              jobRequests.map((job) => (
                <div
                  key={job.id}
                  className="bg-white dark:bg-[#15241d] p-5 rounded-2xl border-2 border-[#2d7a52]/40 shadow-lg space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold bg-[#e8f4ed] text-[#133e2b] px-2 py-0.5 rounded-full">
                        {job.timeSlot}
                      </span>
                      <h4 className="text-base font-bold text-[#133e2b] dark:text-emerald-300 font-serif mt-1">
                        {job.service}
                      </h4>
                      <div className="text-xs text-muted-foreground">Customer: {job.customerName}</div>
                      <div className="text-xs text-muted-foreground">{job.locality} ({job.distanceKm} km away)</div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">82% Take-Home</div>
                      <div className="text-xl font-extrabold text-[#2d7a52]">{formatINR(job.estimatedPayout)}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                    <button
                      onClick={() => handleDeclineJob(job.id)}
                      className="py-2 rounded-xl text-xs font-bold bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 flex items-center justify-center gap-1 transition"
                    >
                      <XCircle className="w-3.5 h-3.5 text-rose-500" />
                      <span>Pass to Guild</span>
                    </button>
                    <button
                      onClick={() => handleAcceptJob(job.id, job.customerName)}
                      className="py-2 rounded-xl text-xs font-bold bg-[#133e2b] hover:bg-[#1e5338] text-white flex items-center justify-center gap-1 shadow-md transition"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Accept Job</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Welfare & Insurance Status Card */}
          <div className="bg-white dark:bg-[#15241d] rounded-2xl p-6 border border-[#133e2b]/15 shadow-md space-y-4">
            <h3 className="text-base font-bold text-[#133e2b] dark:text-emerald-300 font-serif flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-rose-500" />
              <span>Cooperative Welfare & Group Insurance</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800">
                <span className="text-muted-foreground">Group Health Cover Policy</span>
                <span className="font-bold text-emerald-600">Active (₹5,00,000)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800">
                <span className="text-muted-foreground">Monsoon Emergency Fund Balance</span>
                <span className="font-bold text-[#133e2b] dark:text-emerald-300">₹14,200</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Annual Coop Dividend Rights</span>
                <span className="font-bold text-amber-600">1 Equity Voting Share</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Earnings Chart & Demand Heatmap */}
        <div className="lg:col-span-7 space-y-8">
          {/* Earnings Recharts Graph */}
          <div className="bg-white dark:bg-[#15241d] p-6 rounded-3xl border border-[#133e2b]/15 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#c85a32] bg-[#fceee9] px-2.5 py-0.5 rounded-full">
                  Weekly Ledger Payout
                </span>
                <h3 className="text-xl font-bold text-[#133e2b] dark:text-emerald-300 font-serif mt-1">
                  Earnings Trend (This Week: ₹15,670)
                </h3>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-lg">
                +14.2% vs Last Week
              </span>
            </div>

            <div className="h-56 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyEarningsData}>
                  <defs>
                    <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2d7a52" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#2d7a52" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#888888" fontSize={11} />
                  <YAxis stroke="#888888" fontSize={11} tickFormatter={(v) => `₹${v}`} />
                  <Tooltip formatter={(value) => [`₹${value}`, "Net Payout"]} />
                  <Area type="monotone" dataKey="earnings" stroke="#2d7a52" strokeWidth={3} fillOpacity={1} fill="url(#colorEarnings)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Live Demand Heatmap View */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#133e2b] dark:text-emerald-300 font-serif flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-500" />
                <span>Live Demand Heatmap (Bangalore Urban)</span>
              </h3>
              <span className="text-xs text-muted-foreground">Pulsing High Demand Zones</span>
            </div>
            <InteractiveMap mode="heatmap" height="h-[380px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

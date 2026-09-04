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
    showToast("Job Accepted", `You have accepted ${name}'s request.`);
  };

  const handleDeclineJob = (id: string) => {
    setJobRequests(jobRequests.filter((j) => j.id !== id));
    showToast("Job Passed", "Request passed to next available guild craftsman without penalty.");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Banner with Duty Toggle */}
      <div className="bg-[#193927] text-[#f9f7f2] p-8 rounded-3xl shadow-elevated flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-[#2d6243]">
        <div className="flex items-center gap-4">
          <img
            src={currentWorker.avatar}
            alt={currentWorker.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-[#8caea0] shadow-xs"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold bg-[#224c34] text-[#dce8e1] border border-[#35674a] px-2.5 py-0.5 rounded-full">
                {currentWorker.coopRole || "Cooperative Guild Member"}
              </span>
              <span className="text-xs text-[#c5d7cc] font-semibold">Tier 3 Verified</span>
            </div>
            <h1 className="text-2xl font-extrabold font-serif text-[#f9f7f2]">{currentWorker.name}</h1>
            <div className="text-xs text-[#a3b8ac]">★ {currentWorker.rating} Rating • 82% Direct Payout Ledger Active</div>
          </div>
        </div>

        {/* Shift Duty Toggle */}
        <div className="bg-[#0b1a12] p-1.5 rounded-2xl border border-[#1f3b2b] flex items-center gap-2">
          <span className="text-xs font-bold text-[#8caea0] pl-2.5">Duty Status:</span>
          {(["online", "on_break", "offline"] as const).map((st) => (
            <button
              key={st}
              onClick={() => setWorkerStatus(st as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition capitalize ${
                workerStatus === st
                  ? st === "online"
                    ? "bg-[#224c34] text-white shadow-xs"
                    : st === "on_break"
                    ? "bg-[#855b16] text-white"
                    : "bg-[#872828] text-white"
                  : "text-[#7c8d82] hover:bg-[#163022]"
              }`}
            >
              {st.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Navigation Shortcuts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <Link
          href="/worker/collective-bargaining"
          className="p-4 bg-[#ffffff] dark:bg-[#13221b] rounded-2xl border border-[#e2ded4] dark:border-[#233b2e] shadow-xs hover:border-[#193927] transition space-y-1"
        >
          <div className="flex items-center justify-between text-[#193927] dark:text-[#8caea0]">
            <span className="text-xs font-bold">Democratic Bargaining</span>
            <TrendingUp className="w-4 h-4 text-[#a84422]" />
          </div>
          <p className="text-[11px] text-[#7c8d82]">Vote on category minimum tariffs</p>
        </Link>

        <Link
          href="/worker/safety"
          className="p-4 bg-[#ffffff] dark:bg-[#13221b] rounded-2xl border border-[#e2ded4] dark:border-[#233b2e] shadow-xs hover:border-[#193927] transition space-y-1"
        >
          <div className="flex items-center justify-between text-[#872828] dark:text-[#e4a8a8]">
            <span className="text-xs font-bold">Women Safety Module</span>
            <Heart className="w-4 h-4 text-[#872828]" />
          </div>
          <p className="text-[11px] text-[#7c8d82]">Safe hours & buddy check-in</p>
        </Link>

        <Link
          href="/worker/appeal"
          className="p-4 bg-[#ffffff] dark:bg-[#13221b] rounded-2xl border border-[#e2ded4] dark:border-[#233b2e] shadow-xs hover:border-[#193927] transition space-y-1"
        >
          <div className="flex items-center justify-between text-[#855b16] dark:text-[#dec08a]">
            <span className="text-xs font-bold">Arbitration Appeals</span>
            <Scale className="w-4 h-4 text-[#855b16]" />
          </div>
          <p className="text-[11px] text-[#7c8d82]">Non-arbitrary lockout protection</p>
        </Link>

        <Link
          href="/heritage"
          className="p-4 bg-[#ffffff] dark:bg-[#13221b] rounded-2xl border border-[#e2ded4] dark:border-[#233b2e] shadow-xs hover:border-[#193927] transition space-y-1"
        >
          <div className="flex items-center justify-between text-[#193927] dark:text-[#8caea0]">
            <span className="text-xs font-bold">Heritage Marketplace</span>
            <Award className="w-4 h-4 text-[#855b16]" />
          </div>
          <p className="text-[11px] text-[#7c8d82]">Showcase traditional craft</p>
        </Link>
      </div>

      {/* Main Grid: Job Queue + Earnings Chart & Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Job Queue */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#14221b] dark:text-[#edebe4] font-serif">
              Incoming Job Requests ({jobRequests.length})
            </h2>
            <span className="text-xs text-[#7c8d82]">Zero Penalty Decline Guarantee</span>
          </div>

          <div className="space-y-4">
            {jobRequests.length === 0 ? (
              <div className="p-8 bg-[#ffffff] dark:bg-[#13221b] rounded-3xl border border-dashed border-[#e2ded4] text-center text-xs text-[#7c8d82]">
                No active incoming requests at this moment.
              </div>
            ) : (
              jobRequests.map((job) => (
                <div
                  key={job.id}
                  className="bg-[#ffffff] dark:bg-[#13221b] p-5 rounded-3xl border border-[#c5d7cc] dark:border-[#2a4e39] shadow-soft space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold bg-[#f0f5f2] text-[#193927] border border-[#c5d7cc] px-2.5 py-0.5 rounded-full">
                        {job.timeSlot}
                      </span>
                      <h4 className="text-base font-bold text-[#14221b] dark:text-[#edebe4] font-serif mt-1.5">
                        {job.service}
                      </h4>
                      <div className="text-xs text-[#7c8d82]">Customer: {job.customerName}</div>
                      <div className="text-xs text-[#7c8d82]">{job.locality} ({job.distanceKm} km away)</div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-[#7c8d82]">82% Take-Home</div>
                      <div className="text-xl font-extrabold text-[#224c34] dark:text-[#a3c9b4]">{formatINR(job.estimatedPayout)}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#ede9e1] dark:border-[#233b2e]">
                    <button
                      onClick={() => handleDeclineJob(job.id)}
                      className="py-2.5 rounded-xl text-xs font-bold bg-[#f4f0e8] hover:bg-[#e8f0ea] dark:bg-[#182c22] text-[#506155] dark:text-[#a3b8ac] flex items-center justify-center gap-1.5 transition border border-[#ede9e1]"
                    >
                      <XCircle className="w-3.5 h-3.5 text-[#872828]" />
                      <span>Pass to Guild</span>
                    </button>
                    <button
                      onClick={() => handleAcceptJob(job.id, job.customerName)}
                      className="py-2.5 rounded-xl text-xs font-bold bg-[#193927] hover:bg-[#224c34] text-white flex items-center justify-center gap-1.5 transition shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#dce8e1]" />
                      <span>Accept Job</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Welfare & Insurance Status Card */}
          <div className="bg-[#ffffff] dark:bg-[#13221b] rounded-3xl p-6 border border-[#e2ded4] dark:border-[#233b2e] shadow-soft space-y-4">
            <h3 className="text-base font-bold text-[#14221b] dark:text-[#edebe4] font-serif flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-[#872828]" />
              <span>Cooperative Welfare & Group Insurance</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-[#ede9e1] dark:border-[#233b2e]">
                <span className="text-[#7c8d82]">Group Medical Policy</span>
                <span className="font-bold text-[#224c34] dark:text-[#a3c9b4]">Active (₹5,00,000)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#ede9e1] dark:border-[#233b2e]">
                <span className="text-[#7c8d82]">Monsoon Emergency Balance</span>
                <span className="font-bold text-[#193927] dark:text-[#8caea0]">₹14,200</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#7c8d82]">Annual Cooperative Dividend</span>
                <span className="font-bold text-[#855b16]">1 Equity Voting Share</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Earnings Trend & Live Heatmap */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-[#ffffff] dark:bg-[#13221b] p-6 sm:p-7 rounded-3xl border border-[#e2ded4] dark:border-[#233b2e] shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#a84422] bg-[#f6e8e2] px-2.5 py-0.5 rounded-full">
                  Weekly Direct Payout
                </span>
                <h3 className="text-xl font-bold text-[#14221b] dark:text-[#edebe4] font-serif mt-1">
                  Earnings Trend (This Week: ₹15,670)
                </h3>
              </div>
              <span className="text-xs font-bold text-[#224c34] bg-[#f0f5f2] border border-[#c5d7cc] px-2.5 py-1 rounded-lg">
                +14.2% vs Last Week
              </span>
            </div>

            <div className="h-56 w-full pt-3">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyEarningsData}>
                  <defs>
                    <linearGradient id="workerEarningsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#224c34" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#224c34" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#7c8d82" fontSize={11} />
                  <YAxis stroke="#7c8d82" fontSize={11} tickFormatter={(v) => `₹${v}`} />
                  <Tooltip formatter={(value) => [`₹${value}`, "Net Take-Home"]} />
                  <Area type="monotone" dataKey="earnings" stroke="#224c34" strokeWidth={2.5} fill="url(#workerEarningsGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#14221b] dark:text-[#edebe4] font-serif flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#855b16]" />
                <span>Demand Density Heatmap (Bangalore Urban)</span>
              </h3>
              <span className="text-xs text-[#7c8d82]">High Density Zones</span>
            </div>
            <InteractiveMap mode="heatmap" height="h-[380px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

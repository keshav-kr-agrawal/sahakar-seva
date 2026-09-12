"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { COLLECTIVE_VOTE_TOPICS } from "@/lib/mockData";
import { formatINR } from "@/lib/utils";
import {
  TrendingUp,
  BarChart3,
  Users,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Zap,
  Sliders,
  DollarSign,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import confetti from "canvas-confetti";

export default function CollectiveBargainingPage() {
  const { showToast } = useApp();
  const [selectedTopic, setSelectedTopic] = useState(COLLECTIVE_VOTE_TOPICS[0]);
  const [proposedRateSlider, setProposedRateSlider] = useState(390);
  const [hasVoted, setHasVoted] = useState(false);

  const monthlyHours = 140;
  const baseMonthlyIncome = Math.round(selectedTopic.currentRate * monthlyHours * 0.83);
  const projectedMonthlyIncome = Math.round(proposedRateSlider * monthlyHours * 0.83);
  const incomeIncrease = projectedMonthlyIncome - baseMonthlyIncome;

  const projectionGraphData = [
    { rate: 350, monthlyTakeHome: Math.round(350 * 140 * 0.83) },
    { rate: 375, monthlyTakeHome: Math.round(375 * 140 * 0.83) },
    { rate: 400, monthlyTakeHome: Math.round(400 * 140 * 0.83) },
    { rate: 425, monthlyTakeHome: Math.round(425 * 140 * 0.83) },
    { rate: 450, monthlyTakeHome: Math.round(450 * 140 * 0.83) },
    { rate: 475, monthlyTakeHome: Math.round(475 * 140 * 0.83) },
    { rate: 500, monthlyTakeHome: Math.round(500 * 140 * 0.83) },
  ];

  const handleCastVote = (voteType: "YES" | "NO") => {
    setHasVoted(true);
    confetti({ particleCount: 70, spread: 55, origin: { y: 0.6 } });
    showToast(
      "Vote Recorded",
      `Ballot cast for ${selectedTopic.category} proposed tariff of ₹${proposedRateSlider}/hr.`
    );
  };

  const yesPercentage = Math.round((selectedTopic.currentYesVotes / selectedTopic.totalEligibleVotes) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-white text-slate-900">
      
      {/* Back Link */}
      <Link
        href="/worker"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Worker Portal</span>
      </Link>

      {/* Header Banner */}
      <div className="bg-slate-950 text-white p-6 sm:p-8 rounded-3xl shadow-elevated space-y-3 border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider border border-slate-700">
            <Users className="w-3.5 h-3.5" /> Democratic Rate Governance
          </span>
          <span className="text-xs text-slate-400">1 Worker = 1 Sovereign Vote</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Worker Collective Rate Bargaining
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
          Tariffs on SahakarSeva are never decided by unilateral platform algorithms. Craftsmen simulate the household market impact, propose base rates, and democratically vote on category minimums.
        </p>
      </div>

      {/* Main Grid: Rate Slider Simulator + Voting Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Rate Slider & Dynamic Projection */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2.5 py-0.5 rounded-md">
                  Interactive Tariff Simulator
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  Adjust Category Minimum Tariff
                </h3>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-400">Current Base Rate</div>
                <div className="text-lg font-black text-slate-400 line-through font-mono">
                  ₹{selectedTopic.currentRate}/hr
                </div>
              </div>
            </div>

            {/* Interactive Rate Slider */}
            <div className="space-y-3.5 p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  Proposed Minimum Base Rate:
                </span>
                <span className="text-3xl font-black text-slate-900 font-mono">
                  ₹{proposedRateSlider}/hr
                </span>
              </div>

              <input
                type="range"
                min="320"
                max="520"
                step="10"
                value={proposedRateSlider}
                onChange={(e) => setProposedRateSlider(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
              />

              <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                <span>₹320/hr (Current Low)</span>
                <span>₹420/hr (Coop Recommended)</span>
                <span>₹520/hr (Peak Monsoon)</span>
              </div>
            </div>

            {/* Dynamic Earnings Projection Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <div className="text-[11px] text-slate-500 font-semibold">Projected Monthly Take-Home (83%)</div>
                <div className="text-2xl font-black text-slate-900 font-mono">{formatINR(projectedMonthlyIncome)}</div>
                <div className="text-[10px] text-emerald-700 font-bold">
                  +₹{incomeIncrease} monthly income boost
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <div className="text-[11px] text-slate-500 font-semibold">Cooperative Welfare Pool (7%)</div>
                <div className="text-2xl font-black text-slate-900 font-mono">
                  {formatINR(Math.round(proposedRateSlider * 140 * 0.07))}
                </div>
                <div className="text-[10px] text-slate-500">Weather & accident safety buffer</div>
              </div>
            </div>

            {/* Recharts Curve */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-slate-700">
                Monthly Income Growth Curve vs Proposed Tariff
              </h4>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={projectionGraphData}>
                    <XAxis dataKey="rate" stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `₹${v}`} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `₹${v}`} />
                    <Tooltip formatter={(value) => [`₹${value}`, "Monthly Take-Home"]} />
                    <Line type="monotone" dataKey="monthlyTakeHome" stroke="#0f172a" strokeWidth={2.5} dot={{ r: 3.5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Democratic Voting Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-soft space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[10px] font-bold bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-full">
                Active Ballot #{selectedTopic.id}
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-1.5">
                {selectedTopic.category} Guild Ballot
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{selectedTopic.description}</p>
            </div>

            {/* Voting Progress Tally Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-900">YES Votes: {selectedTopic.currentYesVotes} ({yesPercentage}%)</span>
                <span className="text-slate-400">{selectedTopic.totalEligibleVotes} Eligible Members</span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex p-0.5">
                <div style={{ width: `${yesPercentage}%` }} className="bg-emerald-600 h-full rounded-l-full" />
                <div style={{ width: `${100 - yesPercentage}%` }} className="bg-rose-600 h-full rounded-r-full" />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                <span>Quorum Met (60% Minimum)</span>
                <span>{selectedTopic.daysRemaining} Days Remaining</span>
              </div>
            </div>

            {/* Cast Vote Controls */}
            <div className="space-y-3 pt-2">
              {hasVoted ? (
                <div className="p-4 bg-slate-50 text-slate-900 rounded-2xl text-center space-y-1 font-bold text-xs border border-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto" />
                  <div>Ballot Sealed & Recorded on Cooperative Ledger</div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleCastVote("YES")}
                    className="py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Vote YES for ₹{proposedRateSlider}</span>
                  </button>
                  <button
                    onClick={() => handleCastVote("NO")}
                    className="py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
                  >
                    <span>Vote NO (Keep ₹350)</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

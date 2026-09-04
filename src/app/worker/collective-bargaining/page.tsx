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
  DollarSign
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import confetti from "canvas-confetti";

export default function CollectiveBargainingPage() {
  const { showToast } = useApp();
  const [selectedTopic, setSelectedTopic] = useState(COLLECTIVE_VOTE_TOPICS[0]);
  const [proposedRateSlider, setProposedRateSlider] = useState(390);
  const [hasVoted, setHasVoted] = useState(false);

  // Dynamic projection calculations based on rate slider
  const monthlyHours = 140; // 140 billable hours per month
  const baseMonthlyIncome = Math.round(selectedTopic.currentRate * monthlyHours * 0.82);
  const projectedMonthlyIncome = Math.round(proposedRateSlider * monthlyHours * 0.82);
  const incomeIncrease = projectedMonthlyIncome - baseMonthlyIncome;

  const projectionGraphData = [
    { rate: 350, monthlyTakeHome: Math.round(350 * 140 * 0.82) },
    { rate: 375, monthlyTakeHome: Math.round(375 * 140 * 0.82) },
    { rate: 400, monthlyTakeHome: Math.round(400 * 140 * 0.82) },
    { rate: 425, monthlyTakeHome: Math.round(425 * 140 * 0.82) },
    { rate: 450, monthlyTakeHome: Math.round(450 * 140 * 0.82) },
    { rate: 475, monthlyTakeHome: Math.round(475 * 140 * 0.82) },
    { rate: 500, monthlyTakeHome: Math.round(500 * 140 * 0.82) },
  ];

  const handleCastVote = (voteType: "YES" | "NO") => {
    setHasVoted(true);
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    showToast(
      "Vote Cast Successfully",
      `You voted ${voteType} for ${selectedTopic.category} rate proposal of ₹${proposedRateSlider}/hr.`
    );
  };

  const yesPercentage = Math.round((selectedTopic.currentYesVotes / selectedTopic.totalEligibleVotes) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#133e2b] via-[#1e5338] to-[#2d7a52] text-white p-8 rounded-3xl shadow-2xl space-y-3">
        <div className="flex items-center gap-2">
          <span className="bg-[#c85a32] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <Users className="w-3.5 h-3.5" /> Democratic Governance Engine
          </span>
          <span className="text-xs text-emerald-200">1 Worker = 1 Vote Equity Rule</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-emerald-100">
          Worker Collective Rate Bargaining
        </h1>
        <p className="text-xs sm:text-sm text-emerald-200/80 max-w-2xl">
          On SahakarSeva, rates are never set unilaterally by corporate algorithms. Workers propose, simulate earnings impact, and democratically vote on minimum category tariffs.
        </p>
      </div>

      {/* Main Grid: Rate Slider Simulator + Voting Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Rate Slider & Dynamic Projection */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-[#15241d] rounded-3xl p-6 sm:p-8 border border-[#133e2b]/15 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
              <div>
                <span className="text-[11px] font-bold text-[#c85a32] uppercase tracking-wider bg-[#fceee9] px-2.5 py-0.5 rounded-full">
                  Interactive Rate Simulator
                </span>
                <h3 className="text-xl font-bold text-[#133e2b] dark:text-emerald-300 font-serif mt-1">
                  Adjust Minimum Base Hourly Rate
                </h3>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Current Base Tariff</div>
                <div className="text-xl font-extrabold text-gray-500 line-through">
                  ₹{selectedTopic.currentRate}/hr
                </div>
              </div>
            </div>

            {/* INTERACTIVE RATE SLIDER CONTROL */}
            <div className="space-y-4 p-6 bg-[#f4efe8]/70 dark:bg-emerald-950/60 rounded-2xl border border-[#133e2b]/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  Proposed Minimum Base Rate:
                </span>
                <span className="text-3xl font-extrabold text-[#2d7a52]">
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
                className="w-full h-3 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#2d7a52]"
              />

              <div className="flex justify-between text-[11px] font-semibold text-muted-foreground">
                <span>₹320/hr (Current Low)</span>
                <span>₹420/hr (Recommended)</span>
                <span>₹520/hr (High Demand)</span>
              </div>
            </div>

            {/* DYNAMIC EARNINGS PROJECTION STATS */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/80 rounded-2xl border border-emerald-300 dark:border-emerald-700 space-y-1">
                <div className="text-xs text-muted-foreground font-semibold">Projected Monthly Take-Home (82%)</div>
                <div className="text-2xl font-extrabold text-[#2d7a52]">{formatINR(projectedMonthlyIncome)}</div>
                <div className="text-[10px] text-emerald-700 dark:text-emerald-300 font-bold">
                  +₹{incomeIncrease} monthly income boost
                </div>
              </div>

              <div className="p-4 bg-[#f4efe8] dark:bg-emerald-950/40 rounded-2xl border border-gray-200 dark:border-gray-800 space-y-1">
                <div className="text-xs text-muted-foreground font-semibold">Coop Welfare Pool Contribution</div>
                <div className="text-2xl font-extrabold text-amber-600">
                  {formatINR(Math.round(proposedRateSlider * 140 * 0.08))}
                </div>
                <div className="text-[10px] text-muted-foreground">8% emergency monsoon reserve</div>
              </div>
            </div>

            {/* LIVE RECHARTS PROJECTION GRAPH */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300">
                Monthly Income Growth Curve vs Proposed Tariff
              </h4>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={projectionGraphData}>
                    <XAxis dataKey="rate" stroke="#888888" fontSize={11} tickFormatter={(v) => `₹${v}`} />
                    <YAxis stroke="#888888" fontSize={11} tickFormatter={(v) => `₹${v}`} />
                    <Tooltip formatter={(value) => [`₹${value}`, "Monthly Take-Home"]} />
                    <Line type="monotone" dataKey="monthlyTakeHome" stroke="#2d7a52" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Democratic Voting Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-[#15241d] rounded-3xl p-6 border border-[#133e2b]/15 shadow-xl space-y-6">
            <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
              <span className="text-[10px] font-bold bg-[#2d7a52] text-white px-2 py-0.5 rounded-full">
                Active Ballot #{selectedTopic.id}
              </span>
              <h3 className="text-xl font-bold text-[#133e2b] dark:text-emerald-300 font-serif mt-1">
                {selectedTopic.category} Guild Ballot
              </h3>
              <p className="text-xs text-muted-foreground mt-1">{selectedTopic.description}</p>
            </div>

            {/* Voting Progress Tally Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[#2d7a52]">YES Votes: {selectedTopic.currentYesVotes} ({yesPercentage}%)</span>
                <span className="text-muted-foreground">{selectedTopic.totalEligibleVotes} Eligible Guild Members</span>
              </div>
              <div className="h-3 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden flex">
                <div style={{ width: `${yesPercentage}%` }} className="bg-[#2d7a52] h-full" />
                <div style={{ width: `${100 - yesPercentage}%` }} className="bg-rose-500 h-full" />
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground font-semibold">
                <span>Quorum Met (60% Minimum)</span>
                <span>{selectedTopic.daysRemaining} Days Remaining</span>
              </div>
            </div>

            {/* Cast Vote Action */}
            <div className="space-y-3 pt-2">
              {hasVoted ? (
                <div className="p-4 bg-[#e8f4ed] text-[#133e2b] dark:bg-emerald-950 dark:text-emerald-300 rounded-2xl text-center space-y-1 font-bold text-xs">
                  <CheckCircle2 className="w-6 h-6 text-[#2d7a52] mx-auto" />
                  <div>Your Vote is Cast & Recorded on Cooperative Blockchain</div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleCastVote("YES")}
                    className="py-3 rounded-xl bg-[#133e2b] hover:bg-[#1e5338] text-white font-extrabold text-xs shadow-lg transition flex items-center justify-center gap-1"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Vote YES for ₹{proposedRateSlider}</span>
                  </button>
                  <button
                    onClick={() => handleCastVote("NO")}
                    className="py-3 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-extrabold text-xs transition"
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

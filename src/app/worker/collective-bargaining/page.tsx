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

  const monthlyHours = 140;
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
    confetti({ particleCount: 70, spread: 55, origin: { y: 0.6 } });
    showToast(
      "Vote Recorded",
      `Ballot cast for ${selectedTopic.category} proposed tariff of ₹${proposedRateSlider}/hr.`
    );
  };

  const yesPercentage = Math.round((selectedTopic.currentYesVotes / selectedTopic.totalEligibleVotes) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="bg-[#193927] text-[#f9f7f2] p-8 rounded-3xl shadow-elevated space-y-3 border border-[#2d6243]">
        <div className="flex items-center gap-2">
          <span className="bg-[#a84422] text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" /> Democratic Governance Engine
          </span>
          <span className="text-xs text-[#c5d7cc]">1 Worker = 1 Vote Cooperative Constitution</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-[#f9f7f2]">
          Worker Collective Rate Bargaining
        </h1>
        <p className="text-xs sm:text-sm text-[#dce8e1] max-w-2xl leading-relaxed">
          Tariffs on SahakarSeva are never decided by unilateral algorithms. Craftsmen simulate the household market impact, propose base rates, and democratically vote on category minimums.
        </p>
      </div>

      {/* Main Grid: Rate Slider Simulator + Voting Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Rate Slider & Dynamic Projection */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#ffffff] dark:bg-[#13221b] rounded-3xl p-6 sm:p-8 border border-[#e2ded4] dark:border-[#233b2e] shadow-soft space-y-6">
            <div className="flex items-center justify-between border-b border-[#ede9e1] dark:border-[#233b2e] pb-4">
              <div>
                <span className="text-[10px] font-bold text-[#a84422] uppercase tracking-wider bg-[#f6e8e2] px-2.5 py-0.5 rounded-full">
                  Interactive Tariff Simulator
                </span>
                <h3 className="text-xl font-bold text-[#14221b] dark:text-[#edebe4] font-serif mt-1.5">
                  Adjust Minimum Base Tariff
                </h3>
              </div>
              <div className="text-right">
                <div className="text-xs text-[#7c8d82]">Current Category Base</div>
                <div className="text-lg font-extrabold text-[#7c8d82] line-through">
                  ₹{selectedTopic.currentRate}/hr
                </div>
              </div>
            </div>

            {/* Interactive Rate Slider */}
            <div className="space-y-3.5 p-6 bg-[#f9f7f2] dark:bg-[#182c22] rounded-2xl border border-[#ede9e1] dark:border-[#244230]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#14221b] dark:text-[#edebe4]">
                  Proposed Minimum Base Rate:
                </span>
                <span className="text-3xl font-extrabold text-[#193927] dark:text-[#8caea0] font-mono">
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
                className="w-full h-2.5 bg-[#e2ded4] dark:bg-[#1c3025] rounded-lg appearance-none cursor-pointer accent-[#193927]"
              />

              <div className="flex justify-between text-[11px] font-semibold text-[#7c8d82]">
                <span>₹320/hr (Current Low)</span>
                <span>₹420/hr (Coop Recommended)</span>
                <span>₹520/hr (Peak Monsoon)</span>
              </div>
            </div>

            {/* Dynamic Earnings Projection Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-[#f0f5f2] dark:bg-[#152a1e] rounded-2xl border border-[#c5d7cc] dark:border-[#2a4e39] space-y-1">
                <div className="text-[11px] text-[#506155] dark:text-[#a3b8ac] font-semibold">Projected Monthly Take-Home (82%)</div>
                <div className="text-2xl font-extrabold text-[#193927] dark:text-[#edebe4]">{formatINR(projectedMonthlyIncome)}</div>
                <div className="text-[10px] text-[#224c34] dark:text-[#a3c9b4] font-bold">
                  +₹{incomeIncrease} monthly income boost
                </div>
              </div>

              <div className="p-4 bg-[#fdf4e8] dark:bg-[#2d2214] rounded-2xl border border-[#eedbc2] dark:border-[#523d24] space-y-1">
                <div className="text-[11px] text-[#7c8d82] font-semibold">Cooperative Welfare Pool Contribution</div>
                <div className="text-2xl font-extrabold text-[#855b16] dark:text-[#dec08a]">
                  {formatINR(Math.round(proposedRateSlider * 140 * 0.08))}
                </div>
                <div className="text-[10px] text-[#7c8d82]">8% emergency distress buffer</div>
              </div>
            </div>

            {/* Recharts Curve */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-[#14221b] dark:text-[#edebe4]">
                Monthly Income Growth Curve vs Proposed Tariff
              </h4>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={projectionGraphData}>
                    <XAxis dataKey="rate" stroke="#7c8d82" fontSize={11} tickFormatter={(v) => `₹${v}`} />
                    <YAxis stroke="#7c8d82" fontSize={11} tickFormatter={(v) => `₹${v}`} />
                    <Tooltip formatter={(value) => [`₹${value}`, "Monthly Take-Home"]} />
                    <Line type="monotone" dataKey="monthlyTakeHome" stroke="#224c34" strokeWidth={2.5} dot={{ r: 3.5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Democratic Voting Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#ffffff] dark:bg-[#13221b] rounded-3xl p-6 sm:p-7 border border-[#e2ded4] dark:border-[#233b2e] shadow-soft space-y-6">
            <div className="border-b border-[#ede9e1] dark:border-[#233b2e] pb-4">
              <span className="text-[10px] font-bold bg-[#f0f5f2] text-[#224c34] border border-[#c5d7cc] px-2.5 py-0.5 rounded-full">
                Active Ballot #{selectedTopic.id}
              </span>
              <h3 className="text-xl font-bold text-[#14221b] dark:text-[#edebe4] font-serif mt-1.5">
                {selectedTopic.category} Guild Ballot
              </h3>
              <p className="text-xs text-[#7c8d82] mt-1 leading-relaxed">{selectedTopic.description}</p>
            </div>

            {/* Voting Progress Tally Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[#224c34] dark:text-[#a3c9b4]">YES Votes: {selectedTopic.currentYesVotes} ({yesPercentage}%)</span>
                <span className="text-[#7c8d82]">{selectedTopic.totalEligibleVotes} Eligible Guild Members</span>
              </div>
              <div className="h-3 w-full bg-[#f4f0e8] dark:bg-[#1c3025] rounded-full overflow-hidden flex p-0.5">
                <div style={{ width: `${yesPercentage}%` }} className="bg-[#224c34] h-full rounded-l-full" />
                <div style={{ width: `${100 - yesPercentage}%` }} className="bg-[#872828] h-full rounded-r-full" />
              </div>
              <div className="flex justify-between text-[10px] text-[#7c8d82] font-semibold">
                <span>Quorum Met (60% Minimum)</span>
                <span>{selectedTopic.daysRemaining} Days Remaining</span>
              </div>
            </div>

            {/* Cast Vote Controls */}
            <div className="space-y-3 pt-2">
              {hasVoted ? (
                <div className="p-4 bg-[#f0f5f2] text-[#193927] dark:bg-[#152a1e] dark:text-[#dce8e1] rounded-2xl text-center space-y-1 font-bold text-xs border border-[#c5d7cc]">
                  <CheckCircle2 className="w-5 h-5 text-[#224c34] mx-auto" />
                  <div>Ballot Sealed & Recorded on Cooperative Ledger</div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleCastVote("YES")}
                    className="py-3 rounded-xl bg-[#193927] hover:bg-[#224c34] text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#dce8e1]" />
                    <span>Vote YES for ₹{proposedRateSlider}</span>
                  </button>
                  <button
                    onClick={() => handleCastVote("NO")}
                    className="py-3 rounded-xl bg-[#f4f0e8] hover:bg-[#e8f0ea] dark:bg-[#182c22] text-[#506155] dark:text-[#a3b8ac] font-bold text-xs transition border border-[#ede9e1]"
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

"use client";

import React from "react";
import { formatINR } from "@/lib/utils";
import { ShieldCheck, HeartPulse, HardHat, Server, Check, ArrowRight, Lock } from "lucide-react";
import { motion } from "framer-motion";

interface WageLedgerProps {
  totalAmount: number;
  workerName?: string;
  showComparison?: boolean;
  animated?: boolean;
}

export default function WageLedgerCard({
  totalAmount = 500,
  workerName = "Rajesh Kumar",
  showComparison = true,
  animated = true,
}: WageLedgerProps) {
  // SahakarSeva Transparent Breakdown
  const workerPay = Math.round(totalAmount * 0.82); // 82%
  const insurancePay = Math.round(totalAmount * 0.05); // 5%
  const coopFundPay = Math.round(totalAmount * 0.08); // 8%
  const platformFee = Math.round(totalAmount * 0.05); // 5%

  // Standard Private Platform Breakdown (Urban Company typical 35% commission)
  const corporatePlatformTake = Math.round(totalAmount * 0.35); // 35%
  const corporateWorkerPay = Math.round(totalAmount * 0.65); // 65%

  const items = [
    {
      title: "Worker Direct Take-Home",
      subtitle: `Direct to ${workerName}'s cooperative bank ledger`,
      percentage: "82%",
      amount: workerPay,
      icon: <HardHat className="w-4 h-4 text-[#10b981]" />,
      barColor: "bg-[#10b981]",
      tagStyle: "bg-[#ecfdf5] text-[#059669] border-[#a7f3d0]",
    },
    {
      title: "Group Health & Accident Insurance",
      subtitle: "Includes hospitalization & accidental disability cover",
      percentage: "5%",
      amount: insurancePay,
      icon: <HeartPulse className="w-4 h-4 text-[#ea580c]" />,
      barColor: "bg-[#ea580c]",
      tagStyle: "bg-[#fff7ed] text-[#ea580c] border-[#ffedd5]",
    },
    {
      title: "Cooperative Welfare & Emergency Fund",
      subtitle: "Monsoon distress safety buffer & pension equity reserve",
      percentage: "8%",
      amount: coopFundPay,
      icon: <ShieldCheck className="w-4 h-4 text-[#f59e0b]" />,
      barColor: "bg-[#f59e0b]",
      tagStyle: "bg-[#fefce8] text-[#b45309] border-[#fef08a]",
    },
    {
      title: "Open Platform Infrastructure & Ops",
      subtitle: "Open-source cloud servers, SMS dispatch & verification",
      percentage: "5%",
      amount: platformFee,
      icon: <Server className="w-4 h-4 text-[#3b82f6]" />,
      barColor: "bg-[#3b82f6]",
      tagStyle: "bg-[#eff6ff] text-[#2563eb] border-[#bfdbfe]",
    },
  ];

  return (
    <div className="bg-[#ffffff] rounded-3xl p-6 sm:p-7 border border-[#e2e8f0] shadow-soft space-y-6">
      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f1f5f9] pb-4">
        <div>
          <span className="text-[10px] font-bold tracking-wider text-[#059669] uppercase bg-[#ecfdf5] border border-[#a7f3d0] px-3 py-0.5 rounded-full inline-block mb-1.5">
            NCCT Certified Wage Ledger
          </span>
          <h3 className="text-xl font-bold text-[#0f172a] tracking-tight">
            100% Itemized Fee Breakdown
          </h3>
        </div>
        <div className="text-right">
          <span className="text-xs text-[#64748b]">Total Service Fare</span>
          <div className="text-2xl font-black text-[#0f172a] tracking-tight font-mono">
            {formatINR(totalAmount)}
          </div>
        </div>
      </div>

      {/* Progress Bar Visualizing 82% / 5% / 8% / 5% */}
      <div className="space-y-2">
        <div className="h-3 w-full rounded-full bg-[#f1f5f9] overflow-hidden flex p-0.5">
          <div style={{ width: "82%" }} className="bg-[#10b981] h-full rounded-l-full" title="Worker Take-Home: 82%" />
          <div style={{ width: "5%" }} className="bg-[#ea580c] h-full" title="Health Insurance: 5%" />
          <div style={{ width: "8%" }} className="bg-[#f59e0b] h-full" title="Coop Welfare Pool: 8%" />
          <div style={{ width: "5%" }} className="bg-[#3b82f6] h-full rounded-r-full" title="Platform Operations: 5%" />
        </div>
        <div className="flex items-center justify-between text-[11px] text-[#64748b] font-semibold px-0.5">
          <span className="text-[#059669] font-bold">82% Direct Worker Payout</span>
          <span>18% Collective Security & Infra</span>
        </div>
      </div>

      {/* Itemized Line-by-Line List */}
      <div className="space-y-2.5 pt-1">
        {items.map((item, index) => (
          <motion.div
            key={item.title}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#cbd5e1] transition"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2 rounded-xl bg-[#ffffff] border border-[#e2e8f0] shadow-xs">
                {item.icon}
              </div>
              <div>
                <div className="text-xs font-bold text-[#0f172a] flex items-center gap-2">
                  <span>{item.title}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full border ${item.tagStyle}`}>
                    {item.percentage}
                  </span>
                </div>
                <div className="text-[11px] text-[#64748b] mt-0.5">{item.subtitle}</div>
              </div>
            </div>
            <div className="text-sm font-bold text-[#0f172a] font-mono">
              {formatINR(item.amount)}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Comparison with Private Apps */}
      {showComparison && (
        <div className="mt-4 p-4 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] text-xs space-y-2.5">
          <div className="flex items-center justify-between font-bold text-[#0f172a]">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#10b981]" />
              <span>Cooperative Equity Advantage</span>
            </span>
            <span className="text-[#059669] font-extrabold">+₹{workerPay - corporateWorkerPay} more in worker's pocket</span>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-1 text-[11px]">
            <div className="p-3 bg-[#ffffff] rounded-xl border border-[#a7f3d0]">
              <div className="font-bold text-[#059669]">SahakarSeva Co-op</div>
              <div className="text-[#0f172a] font-black text-sm mt-0.5">{formatINR(workerPay)} to worker</div>
              <div className="text-[#64748b] text-[10px] mt-0.5">5% capped open platform fee</div>
            </div>
            <div className="p-3 bg-[#ffffff] rounded-xl border border-[#e2e8f0]">
              <div className="font-semibold text-[#64748b]">Private Apps (Urban Co.)</div>
              <div className="text-[#ef4444] font-black text-sm mt-0.5">{formatINR(corporateWorkerPay)} to worker</div>
              <div className="text-[#94a3b8] text-[10px] mt-0.5">Up to 35% corporate cut</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

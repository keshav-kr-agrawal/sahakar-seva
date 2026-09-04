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
      icon: <HardHat className="w-4 h-4 text-[#224c34]" />,
      barColor: "bg-[#224c34]",
      tagStyle: "bg-[#f0f5f2] text-[#193927] border-[#c5d7cc]",
    },
    {
      title: "Group Health & Accident Insurance",
      subtitle: "Includes hospitalization & accidental disability cover",
      percentage: "5%",
      amount: insurancePay,
      icon: <HeartPulse className="w-4 h-4 text-[#872828]" />,
      barColor: "bg-[#872828]",
      tagStyle: "bg-[#f9ecec] text-[#872828] border-[#f0d5d5]",
    },
    {
      title: "Cooperative Welfare & Emergency Fund",
      subtitle: "Monsoon distress safety buffer & pension equity reserve",
      percentage: "8%",
      amount: coopFundPay,
      icon: <ShieldCheck className="w-4 h-4 text-[#855b16]" />,
      barColor: "bg-[#855b16]",
      tagStyle: "bg-[#fdf4e8] text-[#855b16] border-[#eedbc2]",
    },
    {
      title: "Open Platform Infrastructure & Ops",
      subtitle: "Open-source cloud servers, SMS dispatch & verification",
      percentage: "5%",
      amount: platformFee,
      icon: <Server className="w-4 h-4 text-[#3c6152]" />,
      barColor: "bg-[#527964]",
      tagStyle: "bg-[#edf4f0] text-[#1c402c] border-[#cfe0d6]",
    },
  ];

  return (
    <div className="bg-[#ffffff] dark:bg-[#13221b] rounded-3xl p-6 sm:p-7 border border-[#e2ded4] dark:border-[#233b2e] shadow-soft space-y-6">
      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ede9e1] dark:border-[#233b2e] pb-4">
        <div>
          <span className="text-[10px] font-bold tracking-wider text-[#a84422] uppercase bg-[#f6e8e2] dark:bg-[#331d16] border border-[#e8cebe] dark:border-[#522c20] px-3 py-0.5 rounded-full inline-block mb-1.5">
            NCCT Certified Wage Ledger
          </span>
          <h3 className="text-xl font-bold text-[#14221b] dark:text-[#edebe4] font-serif">
            100% Itemized Fee Breakdown
          </h3>
        </div>
        <div className="text-right">
          <span className="text-xs text-[#7c8d82]">Total Service Fare</span>
          <div className="text-2xl font-extrabold text-[#193927] dark:text-[#8caea0] tracking-tight">
            {formatINR(totalAmount)}
          </div>
        </div>
      </div>

      {/* Progress Bar Visualizing 82% / 5% / 8% / 5% */}
      <div className="space-y-2">
        <div className="h-3.5 w-full rounded-full bg-[#f4f0e8] dark:bg-[#1c3025] overflow-hidden flex p-0.5">
          <div style={{ width: "82%" }} className="bg-[#224c34] h-full rounded-l-full" title="Worker Take-Home: 82%" />
          <div style={{ width: "5%" }} className="bg-[#872828] h-full" title="Health Insurance: 5%" />
          <div style={{ width: "8%" }} className="bg-[#855b16] h-full" title="Coop Welfare Pool: 8%" />
          <div style={{ width: "5%" }} className="bg-[#527964] h-full rounded-r-full" title="Platform Operations: 5%" />
        </div>
        <div className="flex items-center justify-between text-[11px] text-[#506155] dark:text-[#a3b8ac] font-semibold px-0.5">
          <span className="text-[#193927] dark:text-[#8caea0] font-bold">82% Direct Worker Payout</span>
          <span>18% Collective Pool & Platform</span>
        </div>
      </div>

      {/* Itemized Line-by-Line List */}
      <div className="space-y-2.5 pt-1">
        {items.map((item, index) => (
          <motion.div
            key={item.title}
            initial={animated ? { opacity: 0, y: 6 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-[#f9f7f2] dark:bg-[#182c22] border border-[#ede9e1] dark:border-[#244230] hover:border-[#d8d3c7] transition"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2 rounded-xl bg-[#ffffff] dark:bg-[#13221b] border border-[#e2ded4] dark:border-[#233b2e] shadow-xs">
                {item.icon}
              </div>
              <div>
                <div className="text-xs font-bold text-[#14221b] dark:text-[#edebe4] flex items-center gap-2">
                  <span>{item.title}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full border ${item.tagStyle}`}>
                    {item.percentage}
                  </span>
                </div>
                <div className="text-[11px] text-[#7c8d82] mt-0.5">{item.subtitle}</div>
              </div>
            </div>
            <div className="text-sm font-bold text-[#193927] dark:text-[#8caea0] font-mono">
              {formatINR(item.amount)}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Comparison with Private Apps */}
      {showComparison && (
        <div className="mt-4 p-4.5 rounded-2xl bg-[#f4f0e8] dark:bg-[#182c22] border border-[#e2ded4] dark:border-[#244230] text-xs space-y-2.5">
          <div className="flex items-center justify-between font-bold text-[#193927] dark:text-[#edebe4]">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#2d6243]" />
              <span>Cooperative Equity Advantage</span>
            </span>
            <span className="text-[#a84422] font-extrabold">+₹{workerPay - corporateWorkerPay} more in worker's pocket</span>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-1 text-[11px]">
            <div className="p-3 bg-[#ffffff] dark:bg-[#13221b] rounded-xl border border-[#c5d7cc] dark:border-[#2d6243]/40">
              <div className="font-bold text-[#193927] dark:text-[#8caea0]">SahakarSeva Cooperative</div>
              <div className="text-[#193927] dark:text-[#edebe4] font-extrabold text-sm mt-0.5">{formatINR(workerPay)} to worker</div>
              <div className="text-[#7c8d82] text-[10px] mt-0.5">5% capped open platform fee</div>
            </div>
            <div className="p-3 bg-[#fdfdfd] dark:bg-[#13221b]/60 rounded-xl border border-[#ede9e1] dark:border-[#233b2e]">
              <div className="font-semibold text-[#506155] dark:text-[#a3b8ac]">Private Corporate Apps</div>
              <div className="text-[#742d16] dark:text-[#de8a70] font-extrabold text-sm mt-0.5">{formatINR(corporateWorkerPay)} to worker</div>
              <div className="text-[#872828] text-[10px] mt-0.5">Up to 35% corporate margin cut</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

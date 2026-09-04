"use client";

import React from "react";
import { formatINR } from "@/lib/utils";
import { ShieldCheck, HeartPulse, HardHat, Server, Check, ArrowRight } from "lucide-react";
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
      title: "Worker Direct Payout",
      subtitle: `Direct to ${workerName}'s cooperative bank ledger`,
      percentage: "82%",
      amount: workerPay,
      icon: <HardHat className="w-4 h-4 text-emerald-600" />,
      color: "bg-emerald-500",
      textColor: "text-emerald-700 dark:text-emerald-300",
    },
    {
      title: "Group Health & Accident Insurance",
      subtitle: "Includes hospitalization & disability cover for family",
      percentage: "5%",
      amount: insurancePay,
      icon: <HeartPulse className="w-4 h-4 text-rose-500" />,
      color: "bg-rose-500",
      textColor: "text-rose-700 dark:text-rose-300",
    },
    {
      title: "Cooperative Emergency Welfare Pool",
      subtitle: "Monsoon distress fund, pension reserve & child education",
      percentage: "8%",
      amount: coopFundPay,
      icon: <ShieldCheck className="w-4 h-4 text-amber-500" />,
      color: "bg-amber-500",
      textColor: "text-amber-700 dark:text-amber-300",
    },
    {
      title: "Platform Infrastructure & Cloud Server",
      subtitle: "Open-source app maintenance & SMS alerts",
      percentage: "5%",
      amount: platformFee,
      icon: <Server className="w-4 h-4 text-sky-500" />,
      color: "bg-sky-500",
      textColor: "text-sky-700 dark:text-sky-300",
    },
  ];

  return (
    <div className="bg-white dark:bg-[#15241d] rounded-2xl p-6 border border-[#133e2b]/15 shadow-xl space-y-6">
      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 dark:border-gray-800 pb-4">
        <div>
          <span className="text-[11px] font-bold tracking-wider text-[#c85a32] uppercase bg-[#fceee9] px-2.5 py-0.5 rounded-full inline-block mb-1">
            Verified Itemized Wage Ledger
          </span>
          <h3 className="text-lg font-bold text-[#133e2b] dark:text-emerald-300 font-serif">
            100% Transparent Fee Breakdown
          </h3>
        </div>
        <div className="text-right">
          <span className="text-xs text-muted-foreground">Total Service Fare</span>
          <div className="text-2xl font-extrabold text-[#133e2b] dark:text-emerald-400">
            {formatINR(totalAmount)}
          </div>
        </div>
      </div>

      {/* Progress Bar Visualizing 82% / 5% / 8% / 5% */}
      <div className="space-y-1.5">
        <div className="h-3 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden flex">
          <div style={{ width: "82%" }} className="bg-[#2d7a52] h-full" title="Worker Pay: 82%" />
          <div style={{ width: "5%" }} className="bg-rose-500 h-full" title="Insurance: 5%" />
          <div style={{ width: "8%" }} className="bg-amber-500 h-full" title="Coop Fund: 8%" />
          <div style={{ width: "5%" }} className="bg-sky-500 h-full" title="Platform: 5%" />
        </div>
        <div className="flex items-center justify-between text-[11px] text-muted-foreground font-medium px-0.5">
          <span className="text-emerald-700 font-bold">82% Take-Home Pay</span>
          <span>18% Collective Pool & Ops</span>
        </div>
      </div>

      {/* Itemized Line-by-Line List */}
      <div className="space-y-3 pt-2">
        {items.map((item, index) => (
          <motion.div
            key={item.title}
            initial={animated ? { opacity: 0, x: -10 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 rounded-xl bg-[#f4efe8]/60 dark:bg-emerald-950/40 border border-[#133e2b]/5 hover:border-[#133e2b]/20 transition"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white dark:bg-[#15241d] shadow-sm">
                {item.icon}
              </div>
              <div>
                <div className="text-xs font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <span>{item.title}</span>
                  <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded ${item.textColor}`}>
                    ({item.percentage})
                  </span>
                </div>
                <div className="text-[11px] text-muted-foreground">{item.subtitle}</div>
              </div>
            </div>
            <div className="text-sm font-bold text-[#133e2b] dark:text-emerald-400">
              {formatINR(item.amount)}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Comparison with Private Apps */}
      {showComparison && (
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-emerald-900/10 via-emerald-800/5 to-transparent border border-emerald-800/20 text-xs space-y-2">
          <div className="flex items-center justify-between font-bold text-[#133e2b] dark:text-emerald-300">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>SahakarSeva Equity Advantage</span>
            </span>
            <span className="text-[#c85a32] font-bold">+₹{workerPay - corporateWorkerPay} more in worker's pocket</span>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-1 text-[11px]">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/60 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <div className="font-semibold text-emerald-800 dark:text-emerald-300">SahakarSeva (Coop)</div>
              <div className="text-emerald-900 dark:text-emerald-100 font-bold text-sm">{formatINR(workerPay)} to worker</div>
              <div className="text-muted-foreground">Only 5% platform fee</div>
            </div>
            <div className="p-2 bg-gray-100 dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="font-semibold text-gray-700 dark:text-gray-300">Private Tech App</div>
              <div className="text-gray-900 dark:text-gray-100 font-bold text-sm">{formatINR(corporateWorkerPay)} to worker</div>
              <div className="text-rose-600 font-semibold">35% corporate cut</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

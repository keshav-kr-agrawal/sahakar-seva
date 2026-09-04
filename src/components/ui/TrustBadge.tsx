"use client";

import React from "react";
import { ShieldCheck, Heart, Award, CheckCircle } from "lucide-react";

export type BadgeType = "verified" | "women_safe" | "heritage" | "coop_owned";

interface TrustBadgeProps {
  type: BadgeType;
  size?: "sm" | "md";
}

export default function TrustBadge({ type, size = "sm" }: TrustBadgeProps) {
  const configs = {
    verified: {
      label: "NCCT Verified",
      icon: <ShieldCheck className={size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"} />,
      bg: "bg-[#f0f5f2] dark:bg-[#152a1e] text-[#224c34] dark:text-[#a3c9b4] border-[#c5d7cc] dark:border-[#2a4e39]",
    },
    women_safe: {
      label: "Women-Safe",
      icon: <Heart className={size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"} />,
      bg: "bg-[#f9ecec] dark:bg-[#2b1717] text-[#872828] dark:text-[#e4a8a8] border-[#f0d5d5] dark:border-[#4d2828]",
    },
    heritage: {
      label: "Heritage Craft",
      icon: <Award className={size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"} />,
      bg: "bg-[#fdf4e8] dark:bg-[#2d2214] text-[#855b16] dark:text-[#dec08a] border-[#eedbc2] dark:border-[#523d24]",
    },
    coop_owned: {
      label: "Coop Equity Partner",
      icon: <CheckCircle className={size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"} />,
      bg: "bg-[#edf4f0] dark:bg-[#16271e] text-[#1c402c] dark:text-[#9bc2ac] border-[#cfe0d6] dark:border-[#2a4a37]",
    },
  };

  const config = configs[type];

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold border rounded-full ${config.bg} ${
        size === "sm" ? "px-2.5 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
      }`}
    >
      {config.icon}
      <span className="tracking-tight">{config.label}</span>
    </span>
  );
}

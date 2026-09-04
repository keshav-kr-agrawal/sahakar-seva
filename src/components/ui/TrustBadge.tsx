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
      icon: <ShieldCheck className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />,
      bg: "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700",
    },
    women_safe: {
      label: "Women-Safe",
      icon: <Heart className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />,
      bg: "bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-700",
    },
    heritage: {
      label: "Heritage Craft",
      icon: <Award className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />,
      bg: "bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700",
    },
    coop_owned: {
      label: "Coop Equity Partner",
      icon: <CheckCircle className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />,
      bg: "bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 border-sky-300 dark:border-sky-700",
    },
  };

  const config = configs[type];

  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold border rounded-full ${config.bg} ${
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs"
      }`}
    >
      {config.icon}
      <span>{config.label}</span>
    </span>
  );
}

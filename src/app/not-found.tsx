"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, HardHat, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-[#e8f4ed] text-[#133e2b] flex items-center justify-center mx-auto shadow-lg">
        <HardHat className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold text-[#c85a32] uppercase tracking-wider bg-[#fceee9] px-3 py-1 rounded-full">
          404 Page Not Found
        </span>
        <h1 className="text-3xl font-extrabold text-[#0f241a] dark:text-emerald-100 font-serif">
          Service Route Under Construction
        </h1>
        <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
          The cooperative page or service guild route you requested does not exist or has been relocated.
        </p>
      </div>

      <div className="flex justify-center gap-3 pt-2">
        <Link
          href="/"
          className="bg-[#133e2b] hover:bg-[#1e5338] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          href="/services"
          className="bg-[#f4efe8] dark:bg-emerald-950 text-[#133e2b] dark:text-emerald-300 px-5 py-2.5 rounded-xl font-bold text-xs transition"
        >
          Explore Services
        </Link>
      </div>
    </div>
  );
}

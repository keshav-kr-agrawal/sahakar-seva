"use client";

import React from "react";
import Link from "next/link";
import { HardHat, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-16 h-16 rounded-3xl bg-[#f0f5f2] text-[#193927] border border-[#c5d7cc] flex items-center justify-center mx-auto shadow-xs">
        <HardHat className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-[10px] font-bold text-[#a84422] uppercase tracking-wider bg-[#f6e8e2] px-3 py-1 rounded-full">
          404 Page Not Found
        </span>
        <h1 className="text-3xl font-extrabold text-[#14221b] dark:text-[#edebe4] font-serif">
          Service Route Under Construction
        </h1>
        <p className="text-xs text-[#7c8d82] max-w-md mx-auto leading-relaxed">
          The cooperative page or service guild route you requested does not exist or has been relocated.
        </p>
      </div>

      <div className="flex justify-center gap-3 pt-2">
        <Link
          href="/"
          className="bg-[#193927] hover:bg-[#224c34] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-xs transition flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          href="/services"
          className="bg-[#f4f0e8] hover:bg-[#e8f0ea] dark:bg-[#182c22] text-[#193927] dark:text-[#dce8e1] px-5 py-2.5 rounded-xl font-bold text-xs transition border border-[#ede9e1]"
        >
          Explore Services
        </Link>
      </div>
    </div>
  );
}

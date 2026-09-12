"use client";

import React from "react";
import Link from "next/link";
import { HardHat, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6 bg-white text-slate-900">
      <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-900 border border-slate-200 flex items-center justify-center mx-auto shadow-xs">
        <HardHat className="w-8 h-8 text-slate-800" />
      </div>

      <div className="space-y-2">
        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full">
          404 Page Not Found
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Service Route Not Found
        </h1>
        <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
          The page or craft route you requested does not exist or has been relocated within the cooperative network.
        </p>
      </div>

      <div className="flex justify-center gap-3 pt-2">
        <Link
          href="/"
          className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-xs transition flex items-center gap-2 cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          href="/services"
          className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer"
        >
          Explore All Services
        </Link>
      </div>
    </div>
  );
}

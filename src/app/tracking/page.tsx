"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import InteractiveMap from "@/components/ui/InteractiveMap";
import WageLedgerCard from "@/components/ui/WageLedgerCard";
import {
  PhoneCall,
  MessageSquare,
  ShieldCheck,
  AlertTriangle,
  Download,
  CheckCircle2,
  Clock,
  Key,
} from "lucide-react";

export default function TrackingPage() {
  const { activeBooking, showToast } = useApp();
  const worker = activeBooking?.worker || {
    id: "wrk-101",
    name: "Rajesh Kumar",
    category: "Electrical Services",
    avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80",
    rating: 4.92,
    reviewCount: 328,
    locality: "Koramangala 4th Block",
    distanceKm: 0.8,
    verificationTier: 3 as const,
    hourlyRate: 350,
    skills: ["MCB Wiring"],
  };

  const [sosTriggered, setSosTriggered] = useState(false);

  const handleTriggerSos = () => {
    setSosTriggered(true);
    showToast(
      "EMERGENCY DISPATCH ALERTED",
      "Live GPS telemetry relayed to cooperative safety officers and nearest gate security.",
      "warning"
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-white text-slate-900">
      
      {/* 1. Header Bar with ETA Pill */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-700 bg-slate-100 border border-slate-200 px-3 py-0.5 rounded-full">
              Booking ID: {activeBooking?.id || "SS-784912"}
            </span>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              Live Telemetry
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            15-Minute Dispatch Tracking
          </h1>
        </div>

        {/* SOS Emergency Check-in Button */}
        <button
          onClick={handleTriggerSos}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer shadow-xs ${
            sosTriggered
              ? "bg-rose-700 text-white"
              : "bg-slate-900 hover:bg-slate-800 text-white"
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>{sosTriggered ? "SOS Active • Security Alerted" : "Emergency Safety SOS"}</span>
        </button>
      </div>

      {/* 2. Main Grid: Interactive Map + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Map View Column */}
        <div className="lg:col-span-7 space-y-4">
          <InteractiveMap mode="tracking" activeWorker={worker as any} height="h-[500px]" />

          {/* Safety Status Protocol Bar */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-900 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Sovereign GPS Telemetry Protocol Active</span>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">GPS synced 3s ago</span>
          </div>
        </div>

        {/* Worker Dispatch Status Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft space-y-6">
            
            {/* Arrival Clock & Security OTP */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Estimated Arrival</span>
                <span className="text-xl font-black text-slate-900 font-mono">11 mins</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Security OTP</span>
                <span className="text-xl font-black text-slate-900 font-mono tracking-widest">4821</span>
              </div>
            </div>

            <div className="flex items-start gap-4 border-b border-slate-100 pb-4">
              <img
                src={worker.avatar}
                alt={worker.name}
                className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0"
              />
              <div className="flex-1 space-y-1">
                <span className="text-[10px] font-bold bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-full">
                  Worker En Route
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">
                  {worker.name}
                </h3>
                <div className="text-xs text-slate-500">★ {worker.rating} • Tier 3 e-Shram Verified</div>
              </div>
            </div>

            {/* Contact Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => showToast("Calling Worker", `Initiating direct voice call with ${worker.name}...`)}
                className="bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Pro</span>
              </button>
              <button
                onClick={() => showToast("Chat Initialized", `Chat session opened with ${worker.name}`)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat</span>
              </button>
            </div>

            {/* Service Summary Details */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Service Category</span>
                <span className="font-bold text-slate-900">{activeBooking?.serviceCategory || "Electrical Services"}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Scheduled Window</span>
                <span className="font-bold text-slate-900">{activeBooking?.scheduledTime || "15-Min Arrival"}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Service Address</span>
                <span className="font-bold text-slate-900">{activeBooking?.locality || "Koramangala 4th Block"}</span>
              </div>
            </div>
          </div>

          {/* Wage Ledger Receipt Box */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-900">
              <span>Itemized Wage Receipt</span>
              <button
                onClick={() => showToast("Receipt Exported", "Wage ledger PDF generated and saved.")}
                className="text-slate-600 hover:text-slate-900 underline flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export PDF</span>
              </button>
            </div>
            <WageLedgerCard totalAmount={activeBooking?.totalAmount || 448} workerName={worker.name} showComparison={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

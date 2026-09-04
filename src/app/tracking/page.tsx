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
  CheckCircle2
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
      "Live GPS telemetry relayed to local police precinct, Mahila Safety Officer, and RWA gate security.",
      "warning"
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[11px] font-bold text-[#193927] dark:text-[#8caea0] bg-[#f0f5f2] dark:bg-[#193225] border border-[#dce8e1] dark:border-[#244230] px-3 py-0.5 rounded-full">
            Booking ID: {activeBooking?.id || "SS-784912"}
          </span>
          <h1 className="text-3xl font-extrabold text-[#14221b] dark:text-[#edebe4] font-serif">
            Live Worker Dispatch Telemetry
          </h1>
        </div>

        {/* SOS Emergency Check-in Button */}
        <button
          onClick={handleTriggerSos}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition shadow-xs ${
            sosTriggered
              ? "bg-[#872828] text-white border border-[#9e3232]"
              : "bg-[#a84422] hover:bg-[#8c381c] text-white"
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>{sosTriggered ? "SOS Active • Security Alerted" : "Emergency Safety SOS"}</span>
        </button>
      </div>

      {/* Main Grid: Interactive Map + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Map View Column */}
        <div className="lg:col-span-7 space-y-4">
          <InteractiveMap mode="tracking" activeWorker={worker as any} height="h-[520px]" />

          {/* Safety Status Protocol Bar */}
          <div className="bg-[#f0f5f2] dark:bg-[#152a1e] p-4 rounded-2xl border border-[#c5d7cc] dark:border-[#2a4e39] flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#193927] dark:text-[#edebe4] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#2d6243]" />
              <span>NCCT Live Telemetry Protocol Active</span>
            </div>
            <span className="text-[11px] text-[#7c8d82]">GPS coordinates synced 4s ago</span>
          </div>
        </div>

        {/* Worker Dispatch Status Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#ffffff] dark:bg-[#13221b] rounded-3xl p-6 sm:p-7 border border-[#e2ded4] dark:border-[#233b2e] shadow-soft space-y-6">
            <div className="flex items-start gap-4 border-b border-[#ede9e1] dark:border-[#233b2e] pb-4">
              <img
                src={worker.avatar}
                alt={worker.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-[#224c34]"
              />
              <div className="flex-1 space-y-1">
                <span className="text-[10px] font-bold bg-[#f0f5f2] text-[#224c34] border border-[#c5d7cc] px-2.5 py-0.5 rounded-full">
                  Worker En Route
                </span>
                <h3 className="text-lg font-bold text-[#14221b] dark:text-[#edebe4] font-serif mt-0.5">
                  {worker.name}
                </h3>
                <div className="text-xs text-[#7c8d82]">★ {worker.rating} • Tier 3 RWA Verified</div>
              </div>
            </div>

            {/* Contact Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => showToast("Calling Worker", `Initiating phone call with ${worker.name}...`)}
                className="bg-[#193927] hover:bg-[#224c34] text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition shadow-xs"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Worker</span>
              </button>
              <button
                onClick={() => showToast("Chat Initialized", `Chat session opened with ${worker.name}`)}
                className="bg-[#f4f0e8] hover:bg-[#e8f0ea] dark:bg-[#182c22] text-[#193927] dark:text-[#dce8e1] py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition border border-[#ede9e1]"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat</span>
              </button>
            </div>

            {/* Service Summary Details */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-[#ede9e1] dark:border-[#233b2e]">
                <span className="text-[#7c8d82]">Service Category</span>
                <span className="font-bold text-[#14221b] dark:text-[#edebe4]">{activeBooking?.serviceCategory || "Electrical Services"}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#ede9e1] dark:border-[#233b2e]">
                <span className="text-[#7c8d82]">Scheduled Window</span>
                <span className="font-bold text-[#14221b] dark:text-[#edebe4]">{activeBooking?.scheduledTime || "10:30 AM Today"}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#ede9e1] dark:border-[#233b2e]">
                <span className="text-[#7c8d82]">Service Address</span>
                <span className="font-bold text-[#14221b] dark:text-[#edebe4]">{activeBooking?.locality || "Koramangala 4th Block"}</span>
              </div>
            </div>
          </div>

          {/* Wage Ledger Receipt Box */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-[#14221b] dark:text-[#edebe4]">
              <span>Itemized Wage Receipt</span>
              <button
                onClick={() => showToast("Receipt Exported", "Wage ledger PDF generated and saved.")}
                className="text-[#193927] dark:text-[#8caea0] hover:underline flex items-center gap-1.5"
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

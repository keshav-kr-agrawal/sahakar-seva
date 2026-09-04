"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import InteractiveMap from "@/components/ui/InteractiveMap";
import WageLedgerCard from "@/components/ui/WageLedgerCard";
import TrustBadge from "@/components/ui/TrustBadge";
import {
  Navigation,
  PhoneCall,
  MessageSquare,
  ShieldCheck,
  Phone,
  AlertTriangle,
  Clock,
  CheckCircle2,
  ChevronRight,
  Download
} from "lucide-react";
import { motion } from "framer-motion";

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
      "EMERGENCY SOS DISPATCHED",
      "Live GPS coordinates sent to Police (112), SahakarSeva Women Safety Cell & RWA Security.",
      "warning"
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            Booking Ref: {activeBooking?.id || "SS-784912"}
          </span>
          <h1 className="text-3xl font-extrabold text-[#0f241a] dark:text-emerald-100 font-serif mt-1">
            Live Worker Dispatch Tracking
          </h1>
        </div>

        {/* SOS Button */}
        <button
          onClick={handleTriggerSos}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-extrabold text-xs shadow-lg transition ${
            sosTriggered
              ? "bg-rose-700 text-white animate-pulse"
              : "bg-[#c85a32] hover:bg-[#b24a24] text-white"
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>{sosTriggered ? "SOS Active • Security Dispatched" : "Emergency SOS Check-in"}</span>
        </button>
      </div>

      {/* Main Grid: Interactive Map + Tracking Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Map View Column */}
        <div className="lg:col-span-7 space-y-4">
          <InteractiveMap mode="tracking" activeWorker={worker as any} height="h-[520px]" />

          {/* Safety Status Banner */}
          <div className="bg-[#e8f4ed] dark:bg-emerald-950/80 p-4 rounded-2xl border border-[#133e2b]/15 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#133e2b] dark:text-emerald-300 font-semibold">
              <ShieldCheck className="w-5 h-5 text-[#2d7a52]" />
              <span>NCCT Live Safety Tracking Protocol Active</span>
            </div>
            <span className="text-[11px] text-muted-foreground">GPS Pinged 4s ago</span>
          </div>
        </div>

        {/* Worker & Receipt Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          {/* Worker Dispatch Status Card */}
          <div className="bg-white dark:bg-[#15241d] rounded-3xl p-6 border border-[#133e2b]/15 shadow-xl space-y-6">
            <div className="flex items-start gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
              <img
                src={worker.avatar}
                alt={worker.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-[#2d7a52]"
              />
              <div className="flex-1 space-y-1">
                <span className="text-[10px] font-bold bg-[#2d7a52] text-white px-2 py-0.5 rounded-full">
                  Worker En Route
                </span>
                <h3 className="text-lg font-bold text-[#133e2b] dark:text-emerald-300 font-serif">
                  {worker.name}
                </h3>
                <div className="text-xs text-muted-foreground">★ {worker.rating} • Tier 3 Verified</div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => showToast("Simulated Call", `Calling ${worker.name}...`)}
                className="bg-[#133e2b] hover:bg-[#1e5338] text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Worker</span>
              </button>
              <button
                onClick={() => showToast("Chat Opened", `Chat session initialized with ${worker.name}`)}
                className="bg-[#f4efe8] hover:bg-[#e8f4ed] dark:bg-emerald-950 text-[#133e2b] dark:text-emerald-300 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat</span>
              </button>
            </div>

            {/* Service Summary Details */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800">
                <span className="text-muted-foreground">Service Category</span>
                <span className="font-bold text-[#133e2b] dark:text-emerald-300">{activeBooking?.serviceCategory || "Electrical Services"}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800">
                <span className="text-muted-foreground">Scheduled Time</span>
                <span className="font-bold text-[#133e2b] dark:text-emerald-300">{activeBooking?.scheduledTime || "10:30 AM Today"}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800">
                <span className="text-muted-foreground">Location</span>
                <span className="font-bold text-[#133e2b] dark:text-emerald-300">{activeBooking?.locality || "Koramangala 4th Block"}</span>
              </div>
            </div>
          </div>

          {/* Wage Ledger Receipt Box */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-gray-700 dark:text-gray-300">
              <span>Itemized Wage Receipt</span>
              <button
                onClick={() => showToast("Receipt Downloaded", "PDF receipt saved to your downloads.")}
                className="text-[#2d7a52] hover:underline flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            </div>
            <WageLedgerCard totalAmount={activeBooking?.totalAmount || 448} workerName={worker.name} showComparison={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

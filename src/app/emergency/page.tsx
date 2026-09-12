"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { WORKERS } from "@/lib/mockData";
import {
  AlertTriangle,
  Zap,
  PhoneCall,
  MapPin,
  Clock,
  Radio,
  ChevronRight,
  CheckCircle2,
  ShieldAlert,
  HeartPulse,
} from "lucide-react";

export default function EmergencyPage() {
  const router = useRouter();
  const { setSelectedWorkerForBooking, setActiveBooking, showToast } = useApp();

  const [selectedEmergencyType, setSelectedEmergencyType] = useState("Burst Water Pipe / Water Leak");
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [matchedWorker, setMatchedWorker] = useState<typeof WORKERS[0] | null>(null);

  const emergencyTypes = [
    { title: "Burst Water Pipe / Water Leak", icon: "💧", estArrival: "12 mins" },
    { title: "Electrical Spark / MCB Overload", icon: "⚡", estArrival: "10 mins" },
    { title: "Elder Healthcare / Urgent Nursing", icon: "🩺", estArrival: "8 mins" },
    { title: "Door Lockout / Broken Hinge", icon: "🔑", estArrival: "15 mins" },
  ];

  const handleBroadcast = () => {
    setIsBroadcasting(true);
    setMatchedWorker(null);

    setTimeout(() => {
      setIsBroadcasting(false);
      const worker = WORKERS[0]; // Rajesh Kumar
      setMatchedWorker(worker);
      setSelectedWorkerForBooking(worker);

      const emergencyBooking = {
        id: "SS-EMG-" + Math.floor(1000 + Math.random() * 9000),
        worker,
        serviceCategory: selectedEmergencyType,
        scheduledDate: "Immediate",
        scheduledTime: "10-Min Arrival",
        locality: "Koramangala 4th Block",
        totalAmount: 599,
        workerPay: 497, // 83%
        insurancePay: 30,
        coopFundPay: 42,
        platformFee: 30,
        status: "en_route" as const,
        addons: ["Emergency Priority Surcharge"],
      };

      setActiveBooking(emergencyBooking);
      showToast("URGENT WORKER MATCHED", `${worker.name} accepted your urgent dispatch. En route in 10 mins!`, "warning");
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-white text-slate-900">
      
      {/* 1. Header Banner */}
      <div className="bg-slate-950 text-white p-6 sm:p-8 rounded-3xl shadow-elevated space-y-4 border border-slate-800">
        <div className="flex items-center gap-2.5">
          <span className="bg-rose-600 text-white text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
            <Radio className="w-3 h-3" /> Urgent SOS Dispatch Channel
          </span>
          <span className="text-xs text-slate-400">Guaranteed Response under 60 seconds</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          10-Minute Urgent Household Dispatch
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed font-normal">
          Broadcasts your immediate location to all verified SahakarSeva cooperative craftsmen within a 3km radius. Zero surge pricing.
        </p>
      </div>

      {/* 2. Main Request Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
        <div>
          <label className="text-xs font-black text-slate-900 uppercase tracking-wider block mb-3">
            Select Immediate Problem
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {emergencyTypes.map((et) => {
              const isSelected = selectedEmergencyType === et.title;
              return (
                <button
                  key={et.title}
                  onClick={() => setSelectedEmergencyType(et.title)}
                  className={`p-4 rounded-2xl border text-left transition flex items-center justify-between gap-3 cursor-pointer ${
                    isSelected
                      ? "bg-slate-50 border-slate-900 shadow-xs font-bold"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{et.icon}</span>
                    <div>
                      <div className="text-xs font-black text-slate-900">{et.title}</div>
                      <div className="text-[11px] text-slate-500">Est. Arrival: {et.estArrival}</div>
                    </div>
                  </div>

                  <div className={`w-4 h-4 rounded-full border ${isSelected ? "bg-slate-900 border-slate-900" : "border-slate-300"}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Broadcasting State */}
        {isBroadcasting ? (
          <div className="py-12 text-center space-y-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center mx-auto shadow-sm animate-pulse">
              <Radio className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-black text-slate-900">
                Broadcasting to 14 Nearby Active Guild Technicians...
              </h3>
              <p className="text-xs text-slate-500">Matching nearest e-Shram & Aadhaar verified craftsman</p>
            </div>
          </div>
        ) : matchedWorker ? (
          /* Matched Worker Found State */
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-extrabold text-xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>URGENT TECHNICIAN ACCEPTED DISPATCH</span>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200">
              <img src={matchedWorker.avatar} alt={matchedWorker.name} className="w-14 h-14 rounded-2xl object-cover border border-slate-200" />
              <div className="flex-1 space-y-0.5">
                <h4 className="text-base font-black text-slate-900">{matchedWorker.name}</h4>
                <div className="text-xs text-slate-500">★ {matchedWorker.rating} • Tier 3 Verified</div>
                <div className="text-xs font-bold text-slate-900">En Route • Estimated Arrival in 10 Mins</div>
              </div>
            </div>

            <button
              onClick={() => router.push("/tracking")}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-xl font-bold text-xs shadow-soft transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Track Live GPS Telemetry</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleBroadcast}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3.5 rounded-xl font-bold text-xs shadow-soft transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Zap className="w-4 h-4" />
            <span>Broadcast Urgent Dispatch Request (10-min arrival)</span>
          </button>
        )}
      </div>
    </div>
  );
}

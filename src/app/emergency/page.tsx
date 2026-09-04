"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { WORKERS } from "@/lib/mockData";
import {
  AlertTriangle,
  Zap,
  ShieldCheck,
  PhoneCall,
  MapPin,
  Clock,
  Radio,
  ChevronRight,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";

export default function EmergencyPage() {
  const router = useRouter();
  const { setSelectedWorkerForBooking, setActiveBooking, showToast } = useApp();

  const [selectedEmergencyType, setSelectedEmergencyType] = useState("Burst Water Pipe / Flood");
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [matchedWorker, setMatchedWorker] = useState<typeof WORKERS[0] | null>(null);

  const emergencyTypes = [
    { title: "Burst Water Pipe / Leak", icon: "💧", estArrival: "12 mins" },
    { title: "Electrical Spark / MCB Failure", icon: "⚡", estArrival: "10 mins" },
    { title: "Elder Healthcare Emergency Aid", icon: "🚑", estArrival: "8 mins" },
    { title: "Door Lockout / Broken Hinge", icon: "🔑", estArrival: "15 mins" },
  ];

  const handleBroadcast = () => {
    setIsBroadcasting(true);
    setMatchedWorker(null);

    // Simulate 3.5s instant broadcast search to nearest online coop workers
    setTimeout(() => {
      setIsBroadcasting(false);
      const worker = WORKERS[0]; // Rajesh Kumar
      setMatchedWorker(worker);
      setSelectedWorkerForBooking(worker);

      const emergencyBooking = {
        id: "SS-EMG-" + Math.floor(1000 + Math.random() * 9000),
        worker,
        serviceCategory: selectedEmergencyType,
        scheduledDate: "NOW (Urgent)",
        scheduledTime: "Immediate Dispatch",
        locality: "Koramangala 4th Block",
        totalAmount: 599,
        workerPay: 491, // 82%
        insurancePay: 30,
        coopFundPay: 48,
        platformFee: 30,
        status: "en_route" as const,
        addons: ["Emergency Night Priority Surcharge"],
      };

      setActiveBooking(emergencyBooking);
      showToast("URGENT WORKER MATCHED", `${worker.name} accepted your SOS dispatch en route in 10 mins!`, "warning");
    }, 3500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner with Amber Urgency Styling */}
      <div className="bg-gradient-to-r from-amber-950 via-rose-950 to-amber-950 text-white p-8 rounded-3xl border border-rose-500/40 shadow-2xl space-y-4 relative overflow-hidden">
        <div className="flex items-center gap-2">
          <span className="bg-rose-600 text-white text-xs font-extrabold px-3 py-1 rounded-full flex items-center gap-1 animate-pulse">
            <Radio className="w-3.5 h-3.5" /> High Priority Dispatch
          </span>
          <span className="text-xs text-amber-200">Guaranteed Response under 60 seconds</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-amber-100">
          Emergency On-Demand Service Request
        </h1>
        <p className="text-xs sm:text-sm text-amber-200/80 max-w-xl">
          Instantly broadcasts your location to all active, verified SahakarSeva guild workers within a 3km radius.
        </p>
      </div>

      {/* Main Request Form */}
      <div className="bg-white dark:bg-[#15241d] rounded-3xl p-6 sm:p-8 border border-[#133e2b]/15 shadow-xl space-y-6">
        <div>
          <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
            Select Emergency Category
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            {emergencyTypes.map((et) => {
              const isSelected = selectedEmergencyType === et.title;
              return (
                <button
                  key={et.title}
                  onClick={() => setSelectedEmergencyType(et.title)}
                  className={`p-4 rounded-2xl border text-left transition flex items-center justify-between gap-3 ${
                    isSelected
                      ? "bg-amber-50 border-amber-500 text-amber-950 dark:bg-amber-950/60 dark:text-amber-100 font-bold"
                      : "bg-[#f4efe8]/50 border-gray-200 dark:border-gray-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{et.icon}</span>
                    <div>
                      <div className="text-xs font-bold">{et.title}</div>
                      <div className="text-[10px] text-muted-foreground">Est. Arrival: {et.estArrival}</div>
                    </div>
                  </div>

                  <div className={`w-5 h-5 rounded-full border ${isSelected ? "bg-amber-500 border-amber-500" : "border-gray-300"}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Broadcasting / Search Animation Area */}
        {isBroadcasting ? (
          <div className="py-12 text-center space-y-6 bg-amber-950/10 rounded-3xl border border-amber-500/30">
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-amber-500/20 animate-ping" />
              <div className="w-16 h-16 rounded-full bg-amber-600 text-white flex items-center justify-center text-xl font-bold shadow-2xl">
                <Radio className="w-8 h-8 animate-spin" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-amber-900 dark:text-amber-200 font-serif">
                Broadcasting to 14 Nearby Guild Workers...
              </h3>
              <p className="text-xs text-muted-foreground">Matching with nearest Tier 3 RWA verified technician</p>
            </div>
          </div>
        ) : matchedWorker ? (
          /* MATCHED WORKER FOUND STATE */
          <div className="p-6 bg-emerald-50 dark:bg-emerald-950/80 rounded-3xl border border-emerald-500/40 space-y-4">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>EMERGENCY WORKER ACCEPTED DISPATCH!</span>
            </div>

            <div className="flex items-center gap-4 bg-white dark:bg-[#15241d] p-4 rounded-2xl border border-emerald-500/30">
              <img src={matchedWorker.avatar} alt={matchedWorker.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500" />
              <div className="flex-1 space-y-1">
                <h4 className="text-base font-bold text-[#133e2b] dark:text-emerald-300">{matchedWorker.name}</h4>
                <div className="text-xs text-muted-foreground">★ {matchedWorker.rating} • Tier 3 RWA Verified</div>
                <div className="text-xs font-bold text-[#c85a32]">En Route • Arrival in 10 Mins</div>
              </div>
            </div>

            <button
              onClick={() => router.push("/tracking")}
              className="w-full bg-[#133e2b] hover:bg-[#1e5338] text-white py-3.5 rounded-xl font-extrabold text-sm shadow-xl transition flex items-center justify-center gap-2"
            >
              <span>Track Live En Route GPS</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleBroadcast}
            className="w-full bg-[#c85a32] hover:bg-[#b24a24] text-white py-4 rounded-2xl font-extrabold text-base shadow-2xl transition flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5" />
            <span>Broadcast Emergency Request Now</span>
          </button>
        )}
      </div>
    </div>
  );
}

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
      showToast("URGENT WORKER MATCHED", `${worker.name} accepted your urgent dispatch. En route in 10 mins!`, "warning");
    }, 2800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner with Muted Burgundy/Clay Styling */}
      <div className="bg-[#1f1412] text-[#f6e8e2] p-8 rounded-3xl border border-[#4d2828] shadow-elevated space-y-4 relative overflow-hidden">
        <div className="flex items-center gap-2.5">
          <span className="bg-[#872828] text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
            <Radio className="w-3 h-3" /> Priority Dispatch Channel
          </span>
          <span className="text-xs text-[#de8a70]">Guaranteed Response under 60 seconds</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-[#ffffff]">
          Urgent Household Service Dispatch
        </h1>
        <p className="text-xs sm:text-sm text-[#e4a8a8] max-w-xl leading-relaxed">
          Broadcasts your immediate location to all verified SahakarSeva cooperative technicians within a 3km radius.
        </p>
      </div>

      {/* Main Request Form */}
      <div className="bg-[#ffffff] dark:bg-[#13221b] rounded-3xl p-6 sm:p-8 border border-[#e2ded4] dark:border-[#233b2e] shadow-soft space-y-6">
        <div>
          <label className="text-xs font-bold text-[#14221b] dark:text-[#edebe4] uppercase tracking-wider">
            Select Immediate Problem
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
                      ? "bg-[#fdf4e8] border-[#855b16] text-[#742d16] font-bold dark:bg-[#2d2214] dark:text-[#dec08a]"
                      : "bg-[#f9f7f2] border-[#ede9e1] hover:border-[#d8d3c7]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{et.icon}</span>
                    <div>
                      <div className="text-xs font-bold">{et.title}</div>
                      <div className="text-[10px] text-[#7c8d82]">Est. Arrival: {et.estArrival}</div>
                    </div>
                  </div>

                  <div className={`w-4 h-4 rounded-full border ${isSelected ? "bg-[#855b16] border-[#855b16]" : "border-[#d8d3c7]"}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Broadcasting State */}
        {isBroadcasting ? (
          <div className="py-12 text-center space-y-5 bg-[#fdf4e8] dark:bg-[#2d2214] rounded-3xl border border-[#eedbc2] dark:border-[#523d24]">
            <div className="w-14 h-14 rounded-2xl bg-[#855b16] text-white flex items-center justify-center mx-auto shadow-sm">
              <Radio className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-[#742d16] dark:text-[#dec08a] font-serif">
                Broadcasting to 14 Nearby Active Guild Technicians...
              </h3>
              <p className="text-xs text-[#7c8d82]">Finding nearest Tier 3 RWA verified technician</p>
            </div>
          </div>
        ) : matchedWorker ? (
          /* Matched Worker Found State */
          <div className="p-6 bg-[#f0f5f2] dark:bg-[#152a1e] rounded-3xl border border-[#c5d7cc] dark:border-[#2a4e39] space-y-4">
            <div className="flex items-center gap-2 text-[#193927] dark:text-[#edebe4] font-bold text-xs">
              <CheckCircle2 className="w-5 h-5 text-[#224c34]" />
              <span>URGENT TECHNICIAN ACCEPTED DISPATCH</span>
            </div>

            <div className="flex items-center gap-4 bg-[#ffffff] dark:bg-[#13221b] p-4 rounded-2xl border border-[#c5d7cc] dark:border-[#2a4e39]">
              <img src={matchedWorker.avatar} alt={matchedWorker.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-[#224c34]" />
              <div className="flex-1 space-y-1">
                <h4 className="text-base font-bold text-[#14221b] dark:text-[#edebe4]">{matchedWorker.name}</h4>
                <div className="text-xs text-[#7c8d82]">★ {matchedWorker.rating} • Tier 3 RWA Verified</div>
                <div className="text-xs font-bold text-[#a84422]">En Route • Estimated Arrival in 10 Mins</div>
              </div>
            </div>

            <button
              onClick={() => router.push("/tracking")}
              className="w-full bg-[#193927] hover:bg-[#224c34] text-white py-3.5 rounded-2xl font-bold text-xs shadow-soft transition flex items-center justify-center gap-2"
            >
              <span>Track Live GPS Telemetry</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleBroadcast}
            className="w-full bg-[#a84422] hover:bg-[#8c381c] text-white py-3.5 rounded-2xl font-bold text-sm shadow-soft transition flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4" />
            <span>Broadcast Urgent Dispatch Request</span>
          </button>
        )}
      </div>
    </div>
  );
}

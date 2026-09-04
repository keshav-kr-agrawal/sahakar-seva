"use client";

import React, { useState, useEffect } from "react";
import { WorkerProfile, WORKERS } from "@/lib/mockData";
import { MapPin, Navigation, HardHat, PhoneCall, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface InteractiveMapProps {
  mode?: "pins" | "tracking" | "heatmap" | "batch_route";
  activeWorker?: WorkerProfile;
  onSelectWorker?: (worker: WorkerProfile) => void;
  height?: string;
}

export default function InteractiveMap({
  mode = "pins",
  activeWorker = WORKERS[0],
  onSelectWorker,
  height = "h-[450px]",
}: InteractiveMapProps) {
  const [progress, setProgress] = useState(0.4);
  const [selectedPinWorker, setSelectedPinWorker] = useState<WorkerProfile | null>(activeWorker);

  useEffect(() => {
    if (mode === "tracking") {
      const interval = setInterval(() => {
        setProgress((prev) => (prev >= 0.92 ? 0.25 : prev + 0.04));
      }, 2400);
      return () => clearInterval(interval);
    }
  }, [mode]);

  // Coordinates mapping for Koramangala area SVG simulation
  const pins = WORKERS.slice(0, 6).map((w, idx) => {
    const coords = [
      { x: 220, y: 150 },
      { x: 380, y: 110 },
      { x: 180, y: 280 },
      { x: 420, y: 260 },
      { x: 310, y: 340 },
      { x: 520, y: 190 },
    ][idx];
    return { ...w, ...coords };
  });

  const pathStart = { x: 120, y: 380 };
  const pathEnd = { x: 450, y: 160 };
  const currentWorkerX = pathStart.x + (pathEnd.x - pathStart.x) * progress;
  const currentWorkerY = pathStart.y + (pathEnd.y - pathStart.y) * progress;

  return (
    <div className={`relative w-full ${height} rounded-3xl overflow-hidden bg-[#101d16] border border-[#233b2e] shadow-elevated flex flex-col justify-between`}>
      {/* Map Header Overlay Bar */}
      <div className="absolute top-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto bg-[#0b1a12]/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-[#244230] text-xs text-[#dce8e1] flex items-center gap-2 font-semibold shadow-sm">
          <MapPin className="w-3.5 h-3.5 text-[#a84422]" />
          <span>
            {mode === "tracking"
              ? "Live GPS Telemetry • Worker En Route"
              : mode === "heatmap"
              ? "Bangalore Urban Demand Density (Cooperative Heatmap)"
              : mode === "batch_route"
              ? "RWA Neighborhood Aggregation • Optimized Multi-Stop Route"
              : "Locality Cooperative Worker Network"}
          </span>
        </div>

        {mode === "tracking" && (
          <div className="pointer-events-auto bg-[#224c34] text-[#f9f7f2] border border-[#35674a] px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#a84422]" />
            <span>ETA: {Math.max(2, Math.round((1 - progress) * 16))} Mins</span>
          </div>
        )}
      </div>

      {/* Stylized Cartographic SVG Layer */}
      <div className="relative w-full h-full bg-[#101d16] overflow-hidden">
        <svg className="w-full h-full opacity-95" viewBox="0 0 650 450">
          <defs>
            {/* Heatmap Organic Gradients (Muted Terracotta / Ochre / Pine - Zero Neon) */}
            <radialGradient id="heat-surge" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#a84422" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#8c381c" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#a84422" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="heat-steady" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#855b16" stopOpacity="0.45" />
              <stop offset="70%" stopColor="#855b16" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#855b16" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Grid lines simulating city layout */}
          <pattern id="city-grid" width="36" height="36" patternUnits="userSpaceOnUse">
            <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#182c22" strokeWidth="0.75" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#city-grid)" />

          {/* Primary Arterial Road Networks */}
          <path d="M 40 210 Q 300 170 610 270" fill="none" stroke="#1f382a" strokeWidth="10" />
          <path d="M 230 40 L 230 410" fill="none" stroke="#1f382a" strokeWidth="7" />
          <path d="M 410 30 L 410 420" fill="none" stroke="#1f382a" strokeWidth="7" strokeDasharray="6 4" />
          <path d="M 100 380 Q 250 250 450 160" fill="none" stroke="#2a4a38" strokeWidth="5" strokeDasharray="8 4" />

          {/* HEATMAP MODE OVERLAYS */}
          {mode === "heatmap" && (
            <g>
              {/* Koramangala Peak Hotspot */}
              <circle cx="240" cy="180" r="110" fill="url(#heat-surge)" />
              <text x="240" y="180" fill="#f6e8e2" fontSize="11" fontWeight="bold" textAnchor="middle">
                Koramangala 4th Block (High Demand)
              </text>
              <text x="240" y="195" fill="#c5d7cc" fontSize="9" textAnchor="middle">
                42 Bookings Today
              </text>

              {/* Indiranagar Peak Hotspot */}
              <circle cx="420" cy="140" r="95" fill="url(#heat-surge)" />
              <text x="420" y="140" fill="#f6e8e2" fontSize="11" fontWeight="bold" textAnchor="middle">
                Indiranagar 100ft Road
              </text>

              {/* HSR Medium Hotspot */}
              <circle cx="220" cy="320" r="80" fill="url(#heat-steady)" />
              <text x="220" y="320" fill="#fdf4e8" fontSize="10" fontWeight="semibold" textAnchor="middle">
                HSR Layout Sector 3
              </text>

              {/* Whitefield Medium Hotspot */}
              <circle cx="520" cy="280" r="85" fill="url(#heat-steady)" />
              <text x="520" y="280" fill="#fdf4e8" fontSize="10" fontWeight="semibold" textAnchor="middle">
                Whitefield Tech Corridor
              </text>
            </g>
          )}

          {/* BATCH ROUTE MODE */}
          {mode === "batch_route" && (
            <g>
              {/* Merged Route Path Line */}
              <path
                d="M 120 120 L 240 180 L 360 160 L 480 240 L 480 340"
                fill="none"
                stroke="#a84422"
                strokeWidth="3.5"
                strokeDasharray="5 3"
              />

              {/* Household Pins */}
              {[
                { x: 120, y: 120, label: "Home 1: #104" },
                { x: 240, y: 180, label: "Home 2: #202" },
                { x: 360, y: 160, label: "Home 3: #315" },
                { x: 480, y: 240, label: "Home 4: #408" },
              ].map((h, i) => (
                <g key={i} transform={`translate(${h.x}, ${h.y})`}>
                  <circle r="12" fill="#a84422" />
                  <text y="3.5" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                    H{i + 1}
                  </text>
                  <rect x="-38" y="16" width="76" height="18" rx="5" fill="#0b1a12" stroke="#244230" />
                  <text y="28" fill="#dce8e1" fontSize="8" textAnchor="middle">
                    {h.label}
                  </text>
                </g>
              ))}
            </g>
          )}

          {/* TRACKING MODE ANIMATED ROUTE & WORKER MARKER */}
          {mode === "tracking" && (
            <g>
              {/* Dashed Route Path */}
              <path
                d="M 120 380 Q 250 250 450 160"
                fill="none"
                stroke="#3d7c57"
                strokeWidth="5"
                strokeDasharray="8 5"
              />

              {/* Customer House Destination Pin */}
              <g transform="translate(450, 160)">
                <circle r="12" fill="#a84422" />
                <text y="3.5" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
                  YOU
                </text>
              </g>
            </g>
          )}
        </svg>

        {/* WORKER PINS FOR "PINS" MODE */}
        {mode === "pins" &&
          pins.map((p) => (
            <motion.button
              key={p.id}
              onClick={() => {
                setSelectedPinWorker(p);
                if (onSelectWorker) onSelectWorker(p);
              }}
              whileHover={{ scale: 1.08 }}
              style={{ left: `${(p.x / 650) * 100}%`, top: `${(p.y / 450) * 100}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10 focus:outline-none"
            >
              <div
                className={`relative flex items-center gap-2 p-1 rounded-full border transition shadow-soft ${
                  selectedPinWorker?.id === p.id
                    ? "bg-[#a84422] border-[#ffffff] text-white"
                    : "bg-[#163022] border-[#2d6243] text-[#dce8e1] hover:bg-[#224c34]"
                }`}
              >
                <img src={p.avatar} alt={p.name} className="w-8 h-8 rounded-full object-cover" />
                <div className="hidden sm:flex flex-col text-left pr-2 text-[10px]">
                  <span className="font-bold truncate max-w-[80px]">{p.name}</span>
                  <span className="opacity-80">★ {p.rating} • {p.distanceKm}km</span>
                </div>
              </div>
            </motion.button>
          ))}

        {/* MOVING WORKER MARKER FOR TRACKING MODE */}
        {mode === "tracking" && (
          <motion.div
            animate={{
              left: `${(currentWorkerX / 650) * 100}%`,
              top: `${(currentWorkerY / 450) * 100}%`,
            }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
          >
            <div className="relative flex flex-col items-center">
              <div className="w-11 h-11 rounded-full border-2 border-[#8caea0] bg-[#193927] p-0.5 shadow-elevated flex items-center justify-center">
                <img
                  src={activeWorker.avatar}
                  alt={activeWorker.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="mt-1 bg-[#0b1a12] text-[#dce8e1] text-[9px] font-bold px-2 py-0.5 rounded-md border border-[#244230] whitespace-nowrap shadow-sm">
                {activeWorker.name} (En Route)
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom Floating Info Pill for Selected Pin */}
      {mode === "pins" && selectedPinWorker && (
        <div className="absolute bottom-3.5 left-3.5 right-3.5 bg-[#0b1a12]/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#244230] text-white flex items-center justify-between gap-4 z-30 shadow-elevated">
          <div className="flex items-center gap-3">
            <img
              src={selectedPinWorker.avatar}
              alt={selectedPinWorker.name}
              className="w-10 h-10 rounded-xl object-cover border border-[#35674a]"
            />
            <div>
              <div className="text-xs font-bold flex items-center gap-2">
                <span>{selectedPinWorker.name}</span>
                <span className="bg-[#193927] text-[#8caea0] border border-[#2d6243] px-2 py-0.2 rounded-full text-[10px]">
                  Tier {selectedPinWorker.verificationTier} Verified
                </span>
              </div>
              <div className="text-[11px] text-[#8caea0] mt-0.5">
                ★ {selectedPinWorker.rating} ({selectedPinWorker.reviewCount} reviews) • {selectedPinWorker.locality}
              </div>
            </div>
          </div>

          <div className="text-right">
            <span className="text-sm font-extrabold text-[#dce8e1]">
              ₹{selectedPinWorker.hourlyRate}/hr
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

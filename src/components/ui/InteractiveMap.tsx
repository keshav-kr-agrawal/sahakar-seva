"use client";

import React, { useState, useEffect } from "react";
import { WorkerProfile, WORKERS } from "@/lib/mockData";
import { MapPin, Navigation, HardHat, PhoneCall, ShieldCheck, Zap } from "lucide-react";
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
  // En route animation step for tracking mode
  const [progress, setProgress] = useState(0.35);
  const [selectedPinWorker, setSelectedPinWorker] = useState<WorkerProfile | null>(activeWorker);

  useEffect(() => {
    if (mode === "tracking") {
      const interval = setInterval(() => {
        setProgress((prev) => (prev >= 0.95 ? 0.2 : prev + 0.05));
      }, 2500);
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

  // Calculate worker moving position along SVG route
  const pathStart = { x: 120, y: 380 };
  const pathEnd = { x: 450, y: 160 };
  const currentWorkerX = pathStart.x + (pathEnd.x - pathStart.x) * progress;
  const currentWorkerY = pathStart.y + (pathEnd.y - pathStart.y) * progress;

  return (
    <div className={`relative w-full ${height} rounded-2xl overflow-hidden bg-[#12241b] border border-emerald-900/60 shadow-2xl flex flex-col justify-between`}>
      {/* Map Header Overlay Bar */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto bg-[#0d2c1e]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-700/40 text-xs text-emerald-100 flex items-center gap-2 font-medium">
          <MapPin className="w-4 h-4 text-[#c85a32]" />
          <span>
            {mode === "tracking"
              ? "Live GPS Dispatch • Worker En Route"
              : mode === "heatmap"
              ? "Live AI Demand Hotspots (Bangalore Urban)"
              : mode === "batch_route"
              ? "RWA Batch Aggregation • Optimized Route"
              : "Locality Cooperative Worker Pins"}
          </span>
        </div>

        {mode === "tracking" && (
          <div className="pointer-events-auto bg-amber-500 text-black px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 animate-pulse shadow-lg">
            <Zap className="w-4 h-4" />
            <span>ETA: {Math.max(2, Math.round((1 - progress) * 18))} Mins</span>
          </div>
        )}
      </div>

      {/* Stylized SVG Map Layer */}
      <div className="relative w-full h-full bg-[#0d1c15] overflow-hidden">
        <svg className="w-full h-full opacity-90" viewBox="0 0 650 450">
          <defs>
            {/* Heatmap Radial Gradients */}
            <radialGradient id="heat-high" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.75" />
              <stop offset="60%" stopColor="#f97316" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="heat-medium" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#eab308" stopOpacity="0.7" />
              <stop offset="70%" stopColor="#eab308" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="heat-[#2d7a52]" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2d7a52" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#2d7a52" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Grid lines simulating city blocks */}
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1c3d2b" strokeWidth="0.8" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Simulated Primary Roads */}
          <path d="M 50 200 Q 300 180 600 280" fill="none" stroke="#2a5840" strokeWidth="12" />
          <path d="M 220 50 L 220 400" fill="none" stroke="#2a5840" strokeWidth="8" />
          <path d="M 420 30 L 420 420" fill="none" stroke="#2a5840" strokeWidth="8" strokeDasharray="6 4" />
          <path d="M 100 380 Q 250 250 450 160" fill="none" stroke="#38885c" strokeWidth="6" strokeDasharray="8 4" />

          {/* HEATMAP MODE OVERLAYS */}
          {mode === "heatmap" && (
            <g>
              {/* Koramangala Peak Hotspot */}
              <circle cx="240" cy="180" r="110" fill="url(#heat-high)" className="animate-pulse" />
              <text x="240" y="180" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                Koramangala (High Demand 🔥)
              </text>

              {/* Indiranagar Peak Hotspot */}
              <circle cx="420" cy="140" r="95" fill="url(#heat-high)" />
              <text x="420" y="140" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                Indiranagar (120% Surcharge Pool)
              </text>

              {/* HSR Medium Hotspot */}
              <circle cx="220" cy="320" r="80" fill="url(#heat-medium)" />
              <text x="220" y="320" fill="#ffffff" fontSize="10" fontWeight="semibold" textAnchor="middle">
                HSR Layout Sector 3
              </text>

              {/* Whitefield Medium Hotspot */}
              <circle cx="520" cy="280" r="85" fill="url(#heat-medium)" />
              <text x="520" y="280" fill="#ffffff" fontSize="10" fontWeight="semibold" textAnchor="middle">
                Whitefield Tech Zone
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
                stroke="#c85a32"
                strokeWidth="4"
                strokeDasharray="6 3"
              />

              {/* Household Pins */}
              {[
                { x: 120, y: 120, label: "Home A: #104" },
                { x: 240, y: 180, label: "Home B: #202" },
                { x: 360, y: 160, label: "Home C: #315" },
                { x: 480, y: 240, label: "Home D: #408" },
              ].map((h, i) => (
                <g key={i} transform={`translate(${h.x}, ${h.y})`}>
                  <circle r="14" fill="#c85a32" />
                  <text y="4" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                    H{i + 1}
                  </text>
                  <rect x="-40" y="18" width="80" height="18" rx="4" fill="#0d2c1e" opacity="0.9" />
                  <text y="30" fill="#e8f4ed" fontSize="8" textAnchor="middle">
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
                stroke="#399464"
                strokeWidth="6"
                strokeDasharray="10 6"
              />

              {/* Customer House Destination Pin */}
              <g transform="translate(450, 160)">
                <circle r="18" fill="#c85a32" opacity="0.3" className="animate-ping" />
                <circle r="14" fill="#c85a32" />
                <text y="4" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
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
              whileHover={{ scale: 1.15 }}
              style={{ left: `${(p.x / 650) * 100}%`, top: `${(p.y / 450) * 100}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10 focus:outline-none"
            >
              <div
                className={`relative flex items-center gap-1.5 p-1 rounded-full border-2 transition shadow-lg ${
                  selectedPinWorker?.id === p.id
                    ? "bg-[#c85a32] border-white text-white scale-110"
                    : "bg-[#133e2b] border-emerald-400 text-emerald-100 hover:bg-[#1e5338]"
                }`}
              >
                <img src={p.avatar} alt={p.name} className="w-8 h-8 rounded-full object-cover" />
                <div className="hidden sm:flex flex-col text-left pr-2 text-[10px]">
                  <span className="font-bold truncate max-w-[80px]">{p.name}</span>
                  <span className="opacity-90">★ {p.rating} • {p.distanceKm}km</span>
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
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
          >
            <div className="relative group">
              <div className="w-12 h-12 rounded-full border-4 border-emerald-400 bg-[#133e2b] p-0.5 shadow-2xl flex items-center justify-center animate-bounce">
                <img
                  src={activeWorker.avatar}
                  alt={activeWorker.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-[#0d2c1e] text-emerald-100 text-[10px] font-bold px-2 py-1 rounded-lg border border-emerald-600/50 whitespace-nowrap shadow-xl">
                {activeWorker.name} (En Route)
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom Floating Info Pill for Selected Pin */}
      {mode === "pins" && selectedPinWorker && (
        <div className="absolute bottom-3 left-3 right-3 bg-[#0d2c1e]/95 backdrop-blur-md p-3 rounded-xl border border-emerald-700/50 text-white flex items-center justify-between gap-3 z-30">
          <div className="flex items-center gap-3">
            <img
              src={selectedPinWorker.avatar}
              alt={selectedPinWorker.name}
              className="w-10 h-10 rounded-xl object-cover border border-emerald-400"
            />
            <div>
              <div className="text-xs font-bold flex items-center gap-1.5">
                <span>{selectedPinWorker.name}</span>
                <span className="bg-emerald-800 text-emerald-200 px-1.5 py-0.2 rounded text-[10px]">
                  Tier {selectedPinWorker.verificationTier} Verified
                </span>
              </div>
              <div className="text-[11px] text-emerald-200/80">
                ★ {selectedPinWorker.rating} ({selectedPinWorker.reviewCount} reviews) • {selectedPinWorker.locality}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-extrabold text-emerald-300">
              ₹{selectedPinWorker.hourlyRate}/hr
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

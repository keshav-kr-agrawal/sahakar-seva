"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { BATCH_POOL_ITEMS } from "@/lib/mockData";
import InteractiveMap from "@/components/ui/InteractiveMap";
import {
  Navigation,
  Building2,
  Users,
  Leaf,
  ChevronRight,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

export default function BatchPoolingPage() {
  const { showToast } = useApp();

  const handleApproveBatch = (neighborhood: string) => {
    showToast("Batch Dispatch Approved", `RWA optimized route dispatched for ${neighborhood}. CO2 & fuel savings locked.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-white text-slate-900">
      
      {/* Back Link */}
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Federation Admin</span>
      </Link>

      {/* Header Banner */}
      <div className="bg-slate-950 text-white p-6 sm:p-8 rounded-3xl shadow-elevated space-y-3 border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider border border-slate-700">
            <Building2 className="w-3.5 h-3.5" /> RWA Neighborhood Aggregator
          </span>
          <span className="text-xs text-slate-400">Eco-Route Optimization & Fuel Reduction</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Neighborhood Demand Pooling & Batch Optimization
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
          Aggregates multiple individual household service requests within the same apartment complex or RWA into 1 optimized batch route for worker teams, reducing transit distance by 45%.
        </p>
      </div>

      {/* Main Grid: Batch Map View + Batch Items List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Map View Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-900">
                Optimized Route Visualization
              </h2>
              <span className="text-xs text-emerald-700 font-bold flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                <Leaf className="w-4 h-4 text-emerald-600" /> -7.2 kg CO2 Emission Saved
              </span>
            </div>
            <InteractiveMap mode="batch_route" height="h-[480px]" />
          </div>
        </div>

        {/* Batch Items List Column */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="text-xl font-black text-slate-900">
            Active RWA Pooled Batches ({BATCH_POOL_ITEMS.length})
          </h2>

          <div className="space-y-4">
            {BATCH_POOL_ITEMS.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft space-y-4"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-full">
                    {item.rwaName}
                  </span>
                  <h3 className="text-base font-black text-slate-900 mt-1">
                    {item.serviceType}
                  </h3>
                  <div className="text-xs text-slate-500">{item.neighborhood}</div>
                  <div className="text-xs font-semibold text-emerald-700">{item.scheduledTime}</div>
                </div>

                {/* Metrics Box */}
                <div className="grid grid-cols-3 gap-2 p-3.5 bg-slate-50 rounded-xl text-center text-xs border border-slate-100">
                  <div>
                    <div className="text-[10px] text-slate-400">Households</div>
                    <div className="font-black text-slate-900">{item.householdsCount} Homes</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">Transit Saved</div>
                    <div className="font-black text-emerald-700">{item.originalTravelKm - item.optimizedTravelKm} km</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">RWA Discount</div>
                    <div className="font-black text-slate-900 font-mono">₹{item.discountPerHome} OFF</div>
                  </div>
                </div>

                <div className="text-xs text-slate-500">
                  Assigned Squad: {item.assignedWorkerTeam.join(", ")}
                </div>

                <button
                  onClick={() => handleApproveBatch(item.neighborhood)}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-bold text-xs shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Approve & Dispatch Batch Route</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

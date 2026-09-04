"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { BATCH_POOL_ITEMS } from "@/lib/mockData";
import InteractiveMap from "@/components/ui/InteractiveMap";
import {
  Navigation,
  Building2,
  Users,
  Leaf,
  ChevronRight,
  ShieldCheck
} from "lucide-react";

export default function BatchPoolingPage() {
  const { showToast } = useApp();

  const handleApproveBatch = (neighborhood: string) => {
    showToast("Batch Dispatch Approved", `RWA optimized route dispatched for ${neighborhood}. CO2 & fuel savings locked.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="bg-[#193927] text-[#f9f7f2] p-8 rounded-3xl shadow-elevated space-y-3 border border-[#2d6243]">
        <div className="flex items-center gap-2">
          <span className="bg-[#224c34] text-[#dce8e1] text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider border border-[#35674a]">
            <Building2 className="w-3.5 h-3.5" /> RWA Neighborhood Aggregator
          </span>
          <span className="text-xs text-[#c5d7cc]">Eco-Route Optimization & Fuel Reduction</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-[#f9f7f2]">
          Neighborhood Demand Pooling & Batch Optimization
        </h1>
        <p className="text-xs sm:text-sm text-[#dce8e1] max-w-2xl leading-relaxed">
          Aggregates multiple individual household service requests within the same apartment complex or RWA into 1 optimized batch route for worker teams, reducing transit distance by 45%.
        </p>
      </div>

      {/* Main Grid: Batch Map View + Batch Items List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Map View Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#14221b] dark:text-[#edebe4] font-serif">
                Optimized Route Visualization
              </h2>
              <span className="text-xs text-[#224c34] dark:text-[#8caea0] font-bold flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-[#2d6243]" /> -7.2 kg CO2 Emission Saved
              </span>
            </div>
            <InteractiveMap mode="batch_route" height="h-[480px]" />
          </div>
        </div>

        {/* Batch Items List Column */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="text-xl font-bold text-[#14221b] dark:text-[#edebe4] font-serif">
            Active RWA Pooled Batches ({BATCH_POOL_ITEMS.length})
          </h2>

          <div className="space-y-4">
            {BATCH_POOL_ITEMS.map((item) => (
              <div
                key={item.id}
                className="bg-[#ffffff] dark:bg-[#13221b] rounded-3xl p-6 sm:p-7 border border-[#e2ded4] dark:border-[#233b2e] shadow-soft space-y-4"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold bg-[#f0f5f2] text-[#193927] border border-[#c5d7cc] px-2.5 py-0.5 rounded-full">
                    {item.rwaName}
                  </span>
                  <h3 className="text-base font-bold text-[#14221b] dark:text-[#edebe4] font-serif mt-1">
                    {item.serviceType}
                  </h3>
                  <div className="text-xs text-[#7c8d82]">{item.neighborhood}</div>
                  <div className="text-xs font-semibold text-[#224c34] dark:text-[#8caea0]">{item.scheduledTime}</div>
                </div>

                {/* Metrics Box */}
                <div className="grid grid-cols-3 gap-2 p-3.5 bg-[#f9f7f2] dark:bg-[#182c22] rounded-2xl text-center text-xs border border-[#ede9e1] dark:border-[#244230]">
                  <div>
                    <div className="text-[10px] text-[#7c8d82]">Households</div>
                    <div className="font-extrabold text-[#193927] dark:text-[#edebe4]">{item.householdsCount} Homes</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#7c8d82]">Transit Saved</div>
                    <div className="font-extrabold text-[#224c34] dark:text-[#8caea0]">{item.originalTravelKm - item.optimizedTravelKm} km</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#7c8d82]">RWA Discount</div>
                    <div className="font-extrabold text-[#855b16]">₹{item.discountPerHome} OFF</div>
                  </div>
                </div>

                <div className="text-xs text-[#7c8d82]">
                  Assigned Team: {item.assignedWorkerTeam.join(", ")}
                </div>

                <button
                  onClick={() => handleApproveBatch(item.neighborhood)}
                  className="w-full bg-[#193927] hover:bg-[#224c34] text-white py-3 rounded-xl font-bold text-xs shadow-xs transition flex items-center justify-center gap-2"
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

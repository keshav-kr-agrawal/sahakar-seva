"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { BATCH_POOL_ITEMS } from "@/lib/mockData";
import InteractiveMap from "@/components/ui/InteractiveMap";
import {
  Navigation,
  Building2,
  Users,
  CheckCircle2,
  Leaf,
  ChevronRight,
  ShieldCheck,
  Zap
} from "lucide-react";

export default function BatchPoolingPage() {
  const { showToast } = useApp();

  const handleApproveBatch = (neighborhood: string) => {
    showToast("Batch Dispatch Approved", `RWA optimized route dispatched for ${neighborhood}. CO2 & fuel savings locked!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#133e2b] via-[#1e5338] to-[#2d7a52] text-white p-8 rounded-3xl shadow-2xl space-y-3">
        <div className="flex items-center gap-2">
          <span className="bg-emerald-800 text-emerald-100 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-emerald-500/30">
            <Building2 className="w-3.5 h-3.5" /> RWA Neighborhood Aggregator
          </span>
          <span className="text-xs text-emerald-200">Green Logistics & Eco-Route Optimization</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-emerald-100">
          Neighborhood Demand Pooling & Batch Optimization
        </h1>
        <p className="text-xs sm:text-sm text-emerald-200/80 max-w-2xl">
          Aggregates multiple individual household service requests within the same apartment complex or RWA into 1 optimized batch route for worker teams, reducing transit distance by 45%.
        </p>
      </div>

      {/* Main Grid: Batch Map View + Batch Items List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Map View Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#133e2b] dark:text-emerald-300 font-serif">
                Optimized Route Visualization
              </h2>
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                <Leaf className="w-4 h-4 text-emerald-600" /> -7.2 kg CO2 Emission Saved
              </span>
            </div>
            <InteractiveMap mode="batch_route" height="h-[480px]" />
          </div>
        </div>

        {/* Batch Items List Column */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="text-xl font-bold text-[#133e2b] dark:text-emerald-300 font-serif">
            Active RWA Pooled Batches ({BATCH_POOL_ITEMS.length})
          </h2>

          <div className="space-y-4">
            {BATCH_POOL_ITEMS.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-[#15241d] rounded-3xl p-6 border border-[#133e2b]/15 shadow-xl space-y-4"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold bg-[#e8f4ed] text-[#133e2b] px-2.5 py-0.5 rounded-full">
                    {item.rwaName}
                  </span>
                  <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 font-serif mt-1">
                    {item.serviceType}
                  </h3>
                  <div className="text-xs text-muted-foreground">{item.neighborhood}</div>
                  <div className="text-xs font-semibold text-emerald-600">{item.scheduledTime}</div>
                </div>

                {/* Metrics Box */}
                <div className="grid grid-cols-3 gap-2 p-3 bg-[#f4efe8]/60 dark:bg-emerald-950/40 rounded-2xl text-center text-xs">
                  <div>
                    <div className="text-[10px] text-muted-foreground">Households</div>
                    <div className="font-extrabold text-[#133e2b] dark:text-emerald-300">{item.householdsCount} Homes</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground">Travel Saved</div>
                    <div className="font-extrabold text-emerald-600">{item.originalTravelKm - item.optimizedTravelKm} km</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground">Discount/Home</div>
                    <div className="font-extrabold text-amber-600">₹{item.discountPerHome} OFF</div>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground flex items-center justify-between pt-1">
                  <span>Assigned Team: {item.assignedWorkerTeam.join(", ")}</span>
                </div>

                <button
                  onClick={() => handleApproveBatch(item.neighborhood)}
                  className="w-full bg-[#133e2b] hover:bg-[#1e5338] text-white py-2.5 rounded-xl font-extrabold text-xs shadow-md transition flex items-center justify-center gap-2"
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

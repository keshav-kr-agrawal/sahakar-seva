"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { DEMAND_FORECAST_DATA } from "@/lib/mockData";
import {
  Zap,
  TrendingUp,
  MapPin,
  Users,
  CheckCircle2,
  AlertCircle,
  Radio
} from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from "recharts";

export default function DemandForecastingPage() {
  const { showToast } = useApp();
  const [allocationSent, setAllocationSent] = useState(false);

  const handleBroadcastAllocation = () => {
    setAllocationSent(true);
    showToast(
      "AI WORKFORCE RE-ALLOCATION SENT",
      "Shift broadcast notification sent to 85 active coop workers for Koramangala & Whitefield evening surge."
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#133e2b] via-[#1e5338] to-[#2d7a52] text-white p-8 rounded-3xl shadow-2xl space-y-3">
        <div className="flex items-center gap-2">
          <span className="bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> Predictive Machine Learning Engine
          </span>
          <span className="text-xs text-emerald-200">Bengaluru Urban Grid Model</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-emerald-100">
          AI Demand Forecasting & Shift Allocation Panel
        </h1>
        <p className="text-xs sm:text-sm text-emerald-200/80 max-w-2xl">
          Predict local household service demand surges 48 hours in advance using monsoon weather telemetry, RWA maintenance schedules, and historic booking velocity.
        </p>
      </div>

      {/* Main Area Chart Section */}
      <div className="bg-white dark:bg-[#15241d] rounded-3xl p-6 sm:p-8 border border-[#133e2b]/15 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#c85a32] bg-[#fceee9] px-2.5 py-0.5 rounded-full">
              48-Hour Locality Projections
            </span>
            <h3 className="text-xl font-bold text-[#133e2b] dark:text-emerald-300 font-serif mt-1">
              Locality Demand Curves & Forecast Horizon
            </h3>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1 text-[#2d7a52]">
              <span className="w-3 h-3 rounded-full bg-[#2d7a52]" /> Koramangala
            </span>
            <span className="flex items-center gap-1 text-[#c85a32]">
              <span className="w-3 h-3 rounded-full bg-[#c85a32]" /> Indiranagar
            </span>
            <span className="flex items-center gap-1 text-amber-500">
              <span className="w-3 h-3 rounded-full bg-amber-500" /> Whitefield
            </span>
          </div>
        </div>

        {/* Recharts Forecast Graph */}
        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={DEMAND_FORECAST_DATA}>
              <defs>
                <linearGradient id="koraGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2d7a52" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#2d7a52" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="indiraGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c85a32" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#c85a32" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="whiteGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#eab308" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="timeLabel" stroke="#888888" fontSize={11} />
              <YAxis stroke="#888888" fontSize={11} />
              <Tooltip />
              <Area type="monotone" dataKey="KoramangalaDemand" stroke="#2d7a52" strokeWidth={2} fill="url(#koraGrad)" />
              <Area type="monotone" dataKey="IndiranagarDemand" stroke="#c85a32" strokeWidth={2} fill="url(#indiraGrad)" />
              <Area type="monotone" dataKey="WhitefieldDemand" stroke="#eab308" strokeWidth={2} fill="url(#whiteGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Recommendations List & Broadcast Action */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#15241d] p-6 rounded-3xl border border-[#133e2b]/15 shadow-md space-y-4">
          <h3 className="text-lg font-bold text-[#133e2b] dark:text-emerald-300 font-serif flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            <span>AI Automated Shift Allocation Directives</span>
          </h3>

          <div className="space-y-3">
            {[
              { loc: "Whitefield Tech Corridor", rec: "Deploy 22 additional AC Technicians (Rain Surge predicted at 04:00 PM)" },
              { loc: "Koramangala 4th Block", rec: "Pre-position 15 Domestic Cooks for evening meal prep surge" },
              { loc: "Indiranagar 100ft Road", rec: "Activate 10 Plumbers for monsoon basement pump clearing" },
            ].map((d) => (
              <div key={d.loc} className="p-3 bg-[#e8f4ed]/60 dark:bg-emerald-950/40 rounded-xl border border-[#133e2b]/10 text-xs space-y-0.5">
                <div className="font-bold text-[#133e2b] dark:text-emerald-300">{d.loc}</div>
                <div className="text-muted-foreground">{d.rec}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-[#15241d] p-6 rounded-3xl border border-[#133e2b]/15 shadow-md flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-[#133e2b] dark:text-emerald-300 font-serif">
              Broadcast Shift Allocation Directive
            </h3>
            <p className="text-xs text-muted-foreground">
              Send push alert to all off-duty guild members offering a 15% cooperative incentive bonus for accepting predicted surge shifts.
            </p>
          </div>

          <button
            onClick={handleBroadcastAllocation}
            className="w-full bg-[#133e2b] hover:bg-[#1e5338] text-white py-3.5 rounded-xl font-extrabold text-xs shadow-xl transition flex items-center justify-center gap-2"
          >
            <Radio className="w-4 h-4 text-emerald-400" />
            <span>{allocationSent ? "Allocation Broadcast Active to 85 Workers" : "Broadcast AI Shift Allocation Now"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

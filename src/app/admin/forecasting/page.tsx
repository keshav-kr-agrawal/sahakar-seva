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
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

export default function DemandForecastingPage() {
  const { showToast } = useApp();
  const [allocationSent, setAllocationSent] = useState(false);

  const handleBroadcastAllocation = () => {
    setAllocationSent(true);
    showToast(
      "AI SHIFT ALLOCATION DISPATCHED",
      "Shift broadcast notification sent to 85 active guild craftsmen for Koramangala & Whitefield predicted surge."
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="bg-[#193927] text-[#f9f7f2] p-8 rounded-3xl shadow-elevated space-y-3 border border-[#2d6243]">
        <div className="flex items-center gap-2">
          <span className="bg-[#855b16] text-[#ffffff] text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" /> Predictive Machine Learning Engine
          </span>
          <span className="text-xs text-[#c5d7cc]">Bangalore Urban Locality Model</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-[#f9f7f2]">
          AI Demand Forecasting & Shift Allocation Panel
        </h1>
        <p className="text-xs sm:text-sm text-[#dce8e1] max-w-2xl leading-relaxed">
          Predict local household service demand surges 48 hours in advance using monsoon weather telemetry, RWA maintenance schedules, and historic booking velocity.
        </p>
      </div>

      {/* Main Forecast Chart Section */}
      <div className="bg-[#ffffff] dark:bg-[#13221b] rounded-3xl p-6 sm:p-8 border border-[#e2ded4] dark:border-[#233b2e] shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#ede9e1] dark:border-[#233b2e] pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#a84422] bg-[#f6e8e2] px-2.5 py-0.5 rounded-full">
              48-Hour Locality Projections
            </span>
            <h3 className="text-xl font-bold text-[#14221b] dark:text-[#edebe4] font-serif mt-1">
              Locality Demand Curves & Shift Balancing
            </h3>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-[#224c34] dark:text-[#a3c9b4]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#224c34]" /> Koramangala
            </span>
            <span className="flex items-center gap-1.5 text-[#a84422] dark:text-[#de8a70]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#a84422]" /> Indiranagar
            </span>
            <span className="flex items-center gap-1.5 text-[#855b16] dark:text-[#dec08a]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#855b16]" /> Whitefield
            </span>
          </div>
        </div>

        {/* Recharts Forecast Graph */}
        <div className="h-72 w-full pt-3">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={DEMAND_FORECAST_DATA}>
              <defs>
                <linearGradient id="koraGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#224c34" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#224c34" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="indiraGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a84422" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#a84422" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="whiteGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#855b16" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#855b16" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="timeLabel" stroke="#7c8d82" fontSize={11} />
              <YAxis stroke="#7c8d82" fontSize={11} />
              <Tooltip />
              <Area type="monotone" dataKey="KoramangalaDemand" stroke="#224c34" strokeWidth={2} fill="url(#koraGrad)" />
              <Area type="monotone" dataKey="IndiranagarDemand" stroke="#a84422" strokeWidth={2} fill="url(#indiraGrad)" />
              <Area type="monotone" dataKey="WhitefieldDemand" stroke="#855b16" strokeWidth={2} fill="url(#whiteGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Directives & Shift Broadcast */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#ffffff] dark:bg-[#13221b] p-6 sm:p-7 rounded-3xl border border-[#e2ded4] dark:border-[#233b2e] shadow-soft space-y-4">
          <h3 className="text-lg font-bold text-[#14221b] dark:text-[#edebe4] font-serif flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#855b16]" />
            <span>AI Automated Shift Allocation Directives</span>
          </h3>

          <div className="space-y-2.5">
            {[
              { loc: "Whitefield Tech Corridor", rec: "Deploy 22 additional AC Technicians (Rain Surge predicted at 04:00 PM)" },
              { loc: "Koramangala 4th Block", rec: "Pre-position 15 Domestic Cooks for evening meal prep surge" },
              { loc: "Indiranagar 100ft Road", rec: "Activate 10 Plumbers for monsoon basement pump clearing" },
            ].map((d) => (
              <div key={d.loc} className="p-3.5 bg-[#f0f5f2] dark:bg-[#152a1e] rounded-2xl border border-[#c5d7cc] dark:border-[#2a4e39] text-xs space-y-0.5">
                <div className="font-bold text-[#193927] dark:text-[#edebe4]">{d.loc}</div>
                <div className="text-[#506155] dark:text-[#a3b8ac] text-[11px]">{d.rec}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#ffffff] dark:bg-[#13221b] p-6 sm:p-7 rounded-3xl border border-[#e2ded4] dark:border-[#233b2e] shadow-soft flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-[#14221b] dark:text-[#edebe4] font-serif">
              Broadcast Shift Allocation Directive
            </h3>
            <p className="text-xs text-[#506155] dark:text-[#a3b8ac] leading-relaxed">
              Dispatches push alert to all off-duty guild members offering a 15% cooperative incentive bonus for accepting predicted surge shifts.
            </p>
          </div>

          <button
            onClick={handleBroadcastAllocation}
            className="w-full bg-[#193927] hover:bg-[#224c34] text-white py-3.5 rounded-2xl font-bold text-xs shadow-soft transition flex items-center justify-center gap-2"
          >
            <Radio className="w-4 h-4 text-[#8caea0]" />
            <span>{allocationSent ? "Allocation Broadcast Active to 85 Workers" : "Broadcast AI Shift Allocation Now"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

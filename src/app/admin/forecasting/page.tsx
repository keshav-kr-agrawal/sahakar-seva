"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { DEMAND_FORECAST_DATA } from "@/lib/mockData";
import {
  Zap,
  TrendingUp,
  MapPin,
  Users,
  CheckCircle2,
  AlertCircle,
  Radio,
  ArrowLeft,
} from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

export default function DemandForecastingPage() {
  const { showToast } = useApp();
  const [allocationSent, setAllocationSent] = useState(false);

  const handleBroadcastAllocation = () => {
    setAllocationSent(true);
    showToast(
      "AI SHIFT ALLOCATION DISPATCHED",
      "Shift broadcast notification sent to 85 active craftsmen for Koramangala & Whitefield predicted surge."
    );
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
            <Zap className="w-3.5 h-3.5" /> GNN Demand Forecasting Engine
          </span>
          <span className="text-xs text-slate-400">Bangalore Urban Locality Time-Series</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          AI Demand Forecasting & Shift Balancing
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
          Predict local household service demand surges 48 hours in advance using monsoon weather telemetry, RWA maintenance schedules, and historic booking velocity.
        </p>
      </div>

      {/* Main Forecast Chart Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
              48-Hour Locality Projections
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-1">
              Locality Demand Curves & Shift Balancing
            </h3>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="flex items-center gap-1.5 text-slate-900">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-900" /> Koramangala
            </span>
            <span className="flex items-center gap-1.5 text-rose-600">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600" /> Indiranagar
            </span>
            <span className="flex items-center gap-1.5 text-amber-600">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600" /> Whitefield
            </span>
          </div>
        </div>

        {/* Recharts Forecast Graph */}
        <div className="h-72 w-full pt-3">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={DEMAND_FORECAST_DATA}>
              <defs>
                <linearGradient id="koraGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0f172a" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0f172a" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="indiraGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#e11d48" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#e11d48" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="whiteGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d97706" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#d97706" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="timeLabel" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip />
              <Area type="monotone" dataKey="KoramangalaDemand" stroke="#0f172a" strokeWidth={2} fill="url(#koraGrad)" />
              <Area type="monotone" dataKey="IndiranagarDemand" stroke="#e11d48" strokeWidth={2} fill="url(#indiraGrad)" />
              <Area type="monotone" dataKey="WhitefieldDemand" stroke="#d97706" strokeWidth={2} fill="url(#whiteGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Directives & Shift Broadcast */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-soft space-y-4">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Zap className="w-5 h-5 text-slate-900" />
            <span>AI Automated Shift Directives</span>
          </h3>

          <div className="space-y-2.5">
            {[
              { loc: "Whitefield Tech Corridor", rec: "Deploy 22 additional AC Technicians (Rain Surge predicted at 04:00 PM)" },
              { loc: "Koramangala 4th Block", rec: "Pre-position 15 Domestic Cooks for evening meal prep surge" },
              { loc: "Indiranagar 100ft Road", rec: "Activate 10 Plumbers for monsoon basement pump clearing" },
            ].map((d) => (
              <div key={d.loc} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-0.5">
                <div className="font-bold text-slate-900">{d.loc}</div>
                <div className="text-slate-600 text-[11px]">{d.rec}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-soft flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-black text-slate-900">
              Broadcast Shift Allocation Directive
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dispatches push alert to all off-duty craftsmen offering a 15% cooperative incentive bonus for accepting predicted surge shifts.
            </p>
          </div>

          <button
            onClick={handleBroadcastAllocation}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-xl font-bold text-xs shadow-soft transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Radio className="w-4 h-4 text-emerald-400" />
            <span>{allocationSent ? "Allocation Broadcast Active to 85 Workers" : "Broadcast AI Shift Allocation Now"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

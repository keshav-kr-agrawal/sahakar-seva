"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import {
  Heart,
  ShieldCheck,
  PhoneCall,
  Clock,
  Users,
  AlertTriangle,
  UserCheck,
  ArrowLeft,
} from "lucide-react";

export default function SafetyModulePage() {
  const { showToast } = useApp();

  const [womenOnlyToggle, setWomenOnlyToggle] = useState(true);
  const [safeHoursOnly, setSafeHoursOnly] = useState(true);
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const buddies = [
    { name: "Sunita Devi Sharma", distance: "0.4 km", status: "Active on Job in HSR", battery: "88%" },
    { name: "Lakshmi Priya", distance: "1.1 km", status: "Available in Malleshwaram", battery: "92%" },
    { name: "Deepa Nair", distance: "1.8 km", status: "Active in Indiranagar", battery: "74%" },
  ];

  const handleTriggerReport = () => {
    setReportSubmitted(true);
    showToast(
      "INCIDENT ESCALATED TO WOMEN SAFETY CELL",
      "Confidential alert dispatched to SahakarSeva Women Safety Officer & Local Mahila Guild Convener.",
      "warning"
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-white text-slate-900">
      
      {/* Back Link */}
      <Link
        href="/worker"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Worker Portal</span>
      </Link>

      {/* Header Banner */}
      <div className="bg-slate-950 text-white p-6 sm:p-8 rounded-3xl shadow-elevated space-y-3 border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="bg-rose-600 text-white text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-current" /> Gender-First Safety Protocol
          </span>
          <span className="text-xs text-slate-400">Cooperative Mahila Safety Directive</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Women Pro Autonomy & Sister Buddy Network
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
          Full sovereignty for women craftsmen: restrict job dispatch to verified women-only households, configure safe daylight working hours, and rely on real-time peer buddy check-ins.
        </p>
      </div>

      {/* Main Grid: Controls + Peer Buddy Status + Escalation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Safety Preferences */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-rose-600" />
              <span>Job Dispatch Safety Preferences</span>
            </h3>

            {/* Toggle 1: Women-Only Customers */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-rose-600" />
                  <span>Women-Only Verified Households</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Restrict incoming job requests strictly to households verified by Mahila RWA committees.
                </p>
              </div>

              <input
                type="checkbox"
                checked={womenOnlyToggle}
                onChange={(e) => setWomenOnlyToggle(e.target.checked)}
                className="w-5 h-5 accent-rose-600 rounded cursor-pointer"
              />
            </div>

            {/* Toggle 2: Safe Daylight Hours */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-700" />
                  <span>Safe Daylight Working Hours (08:00 AM – 07:00 PM)</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Automatically pause job dispatch after 07:00 PM to ensure safe return transit.
                </p>
              </div>

              <input
                type="checkbox"
                checked={safeHoursOnly}
                onChange={(e) => setSafeHoursOnly(e.target.checked)}
                className="w-5 h-5 accent-slate-900 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Sister Buddy Network & Harassment Escalation */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Peer Sister Buddy List */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-slate-800" />
              <span>Sister Peer Buddy Network (Nearby Active)</span>
            </h3>

            <div className="space-y-2.5">
              {buddies.map((b) => (
                <div
                  key={b.name}
                  className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-slate-900">{b.name}</div>
                    <div className="text-slate-500 text-[11px]">{b.status} • {b.distance} away</div>
                  </div>
                  <span className="text-[10px] bg-slate-200 text-slate-800 font-bold px-2.5 py-0.5 rounded-full">
                    Battery {b.battery}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* One-Tap Harassment Escalation */}
          <div className="bg-rose-50 p-6 rounded-3xl border border-rose-200 space-y-4">
            <div className="flex items-center gap-2 text-rose-800 font-black text-sm">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <span>One-Tap Harassment Escalation Cell</span>
            </div>
            <p className="text-xs text-rose-700 leading-relaxed">
              In case of inappropriate household behavior or unsafe conditions, trigger an immediate confidential escalation to the Mahila Safety Cell without penalty.
            </p>

            <button
              onClick={handleTriggerReport}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-xl font-bold text-xs shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>{reportSubmitted ? "Report Escalated to Mahila Safety Cell" : "Submit Urgent Incident Report"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

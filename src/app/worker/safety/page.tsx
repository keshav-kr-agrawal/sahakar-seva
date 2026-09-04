"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  Heart,
  ShieldCheck,
  PhoneCall,
  Clock,
  Users,
  AlertTriangle,
  CheckCircle2,
  Lock,
  UserCheck
} from "lucide-react";

export default function SafetyModulePage() {
  const { showToast } = useApp();

  const [womenOnlyToggle, setWomenOnlyToggle] = useState(true);
  const [safeHoursOnly, setSafeHoursOnly] = useState(true);
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const buddies = [
    { name: "Sunita Devi Sharma", distance: "0.4 km", status: "Active on Job in HSR", battery: "88%" },
    { name: "Lakshmi Priya", distance: "1.1 km", status: "Available", battery: "92%" },
    { name: "Deepa Nair", distance: "1.8 km", status: "Active in Indiranagar", battery: "74%" },
  ];

  const handleTriggerReport = () => {
    setReportSubmitted(true);
    showToast(
      "INCIDENT ESCALATED TO WOMEN SAFETY CELL",
      "Priority SOS alert dispatched to SahakarSeva Women Safety Officers & local Mahila Guild Lead.",
      "warning"
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner with Rose Accent Styling */}
      <div className="bg-gradient-to-r from-[#2c0e18] via-[#3e1322] to-[#531e2f] text-white p-8 rounded-3xl shadow-2xl space-y-3 border border-rose-500/30">
        <div className="flex items-center gap-2">
          <span className="bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 fill-current" /> Gender-First Safety Framework
          </span>
          <span className="text-xs text-rose-200">SahakarSeva Mahila Guild Directive</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-rose-100">
          Women Worker Protection & Buddy Network
        </h1>
        <p className="text-xs sm:text-sm text-rose-200/80 max-w-2xl">
          Full autonomy for women service professionals: restrict job dispatch to verified women-only households, configure safe working hours, and rely on real-time peer buddy check-ins.
        </p>
      </div>

      {/* Main Grid: Controls + Peer Buddy Status + Escalation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Safety Preferences Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white dark:bg-[#15241d] rounded-3xl p-6 sm:p-8 border border-[#133e2b]/15 shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-[#133e2b] dark:text-emerald-300 font-serif flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-rose-500" />
              <span>Job Dispatch Safety Preferences</span>
            </h3>

            {/* Toggle 1: Women-Only Customers */}
            <div className="p-4 bg-[#f4efe8]/70 dark:bg-emerald-950/60 rounded-2xl border border-gray-200 dark:border-gray-800 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-rose-500" />
                  <span>Women-Only Verified Customers</span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Restrict incoming job requests strictly to households verified by Mahila RWA committees.
                </p>
              </div>

              <input
                type="checkbox"
                checked={womenOnlyToggle}
                onChange={(e) => setWomenOnlyToggle(e.target.checked)}
                className="w-6 h-6 accent-rose-600 rounded cursor-pointer"
              />
            </div>

            {/* Toggle 2: Safe Work Hours */}
            <div className="p-4 bg-[#f4efe8]/70 dark:bg-emerald-950/60 rounded-2xl border border-gray-200 dark:border-gray-800 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span>Safe Daylight Working Hours (08:00 AM – 07:00 PM)</span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Automatically mute job dispatch after 07:00 PM to ensure safe return travel.
                </p>
              </div>

              <input
                type="checkbox"
                checked={safeHoursOnly}
                onChange={(e) => setSafeHoursOnly(e.target.checked)}
                className="w-6 h-6 accent-amber-600 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Sister Buddy Network & Harassment Report */}
        <div className="lg:col-span-6 space-y-6">
          {/* Peer Sister Buddy List */}
          <div className="bg-white dark:bg-[#15241d] rounded-3xl p-6 border border-[#133e2b]/15 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-[#133e2b] dark:text-emerald-300 font-serif flex items-center gap-2">
              <Users className="w-5 h-5 text-[#2d7a52]" />
              <span>Sister Peer Buddy Network (Nearby Active)</span>
            </h3>

            <div className="space-y-3">
              {buddies.map((b) => (
                <div
                  key={b.name}
                  className="p-3 bg-[#e8f4ed]/50 dark:bg-emerald-950/40 rounded-xl border border-[#133e2b]/10 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-[#133e2b] dark:text-emerald-300">{b.name}</div>
                    <div className="text-muted-foreground">{b.status} • {b.distance} away</div>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    GPS Ping • Battery {b.battery}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* One-Tap Harassment Reporting Box */}
          <div className="bg-rose-50 dark:bg-rose-950/40 p-6 rounded-3xl border border-rose-300 dark:border-rose-800 space-y-4">
            <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-bold text-sm">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <span>One-Tap Workplace Harassment Escalation</span>
            </div>
            <p className="text-xs text-rose-900/80 dark:text-rose-200">
              In case of inappropriate customer behavior or unsafe workplace environment, trigger instant confidential escalation to the Mahila Guild Safety Cell.
            </p>

            <button
              onClick={handleTriggerReport}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-xl font-extrabold text-xs shadow-lg transition flex items-center justify-center gap-2"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>{reportSubmitted ? "Report Escalated to Safety Officer" : "Submit Urgent Harassment Report"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

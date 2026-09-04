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
  UserCheck
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="bg-[#1f1412] text-[#f6e8e2] p-8 rounded-3xl shadow-elevated space-y-3 border border-[#4d2828]">
        <div className="flex items-center gap-2">
          <span className="bg-[#872828] text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-current" /> Gender-First Safety Framework
          </span>
          <span className="text-xs text-[#de8a70]">SahakarSeva Mahila Guild Directive</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-[#ffffff]">
          Women Worker Autonomy & Sister Buddy Network
        </h1>
        <p className="text-xs sm:text-sm text-[#e4a8a8] max-w-2xl leading-relaxed">
          Full autonomy for women service professionals: restrict job dispatch to verified women-only households, configure safe daylight working hours, and rely on real-time peer buddy check-ins.
        </p>
      </div>

      {/* Main Grid: Controls + Peer Buddy Status + Escalation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Safety Preferences */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-[#ffffff] dark:bg-[#13221b] rounded-3xl p-6 sm:p-8 border border-[#e2ded4] dark:border-[#233b2e] shadow-soft space-y-6">
            <h3 className="text-xl font-bold text-[#14221b] dark:text-[#edebe4] font-serif flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#872828]" />
              <span>Job Dispatch Safety Preferences</span>
            </h3>

            {/* Toggle 1: Women-Only Customers */}
            <div className="p-4 bg-[#f9f7f2] dark:bg-[#182c22] rounded-2xl border border-[#ede9e1] dark:border-[#244230] flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-bold text-[#14221b] dark:text-[#edebe4] flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-[#872828]" />
                  <span>Women-Only Verified Households</span>
                </div>
                <p className="text-[11px] text-[#7c8d82]">
                  Restrict incoming job requests strictly to households verified by Mahila RWA committees.
                </p>
              </div>

              <input
                type="checkbox"
                checked={womenOnlyToggle}
                onChange={(e) => setWomenOnlyToggle(e.target.checked)}
                className="w-5 h-5 accent-[#872828] rounded cursor-pointer"
              />
            </div>

            {/* Toggle 2: Safe Daylight Hours */}
            <div className="p-4 bg-[#f9f7f2] dark:bg-[#182c22] rounded-2xl border border-[#ede9e1] dark:border-[#244230] flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-bold text-[#14221b] dark:text-[#edebe4] flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#855b16]" />
                  <span>Safe Daylight Working Hours (08:00 AM – 07:00 PM)</span>
                </div>
                <p className="text-[11px] text-[#7c8d82]">
                  Automatically pause job dispatch after 07:00 PM to ensure safe return travel.
                </p>
              </div>

              <input
                type="checkbox"
                checked={safeHoursOnly}
                onChange={(e) => setSafeHoursOnly(e.target.checked)}
                className="w-5 h-5 accent-[#855b16] rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Sister Buddy Network & Harassment Escalation */}
        <div className="lg:col-span-6 space-y-6">
          {/* Peer Sister Buddy List */}
          <div className="bg-[#ffffff] dark:bg-[#13221b] rounded-3xl p-6 border border-[#e2ded4] dark:border-[#233b2e] shadow-soft space-y-4">
            <h3 className="text-lg font-bold text-[#14221b] dark:text-[#edebe4] font-serif flex items-center gap-2">
              <Users className="w-5 h-5 text-[#224c34]" />
              <span>Sister Peer Buddy Network (Nearby Active)</span>
            </h3>

            <div className="space-y-2.5">
              {buddies.map((b) => (
                <div
                  key={b.name}
                  className="p-3.5 bg-[#f0f5f2] dark:bg-[#152a1e] rounded-2xl border border-[#c5d7cc] dark:border-[#2a4e39] flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-[#193927] dark:text-[#edebe4]">{b.name}</div>
                    <div className="text-[#7c8d82] text-[11px]">{b.status} • {b.distance} away</div>
                  </div>
                  <span className="text-[10px] bg-[#dce8e1] dark:bg-[#234230] text-[#193927] dark:text-[#c5d7cc] font-semibold px-2.5 py-0.5 rounded-full">
                    Battery {b.battery}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* One-Tap Harassment Escalation */}
          <div className="bg-[#f9ecec] dark:bg-[#2b1717] p-6 rounded-3xl border border-[#f0d5d5] dark:border-[#4d2828] space-y-4">
            <div className="flex items-center gap-2 text-[#872828] dark:text-[#e4a8a8] font-bold text-sm">
              <AlertTriangle className="w-5 h-5 text-[#872828]" />
              <span>One-Tap Workplace Harassment Escalation</span>
            </div>
            <p className="text-xs text-[#872828]/80 dark:text-[#e4a8a8] leading-relaxed">
              In case of inappropriate household behavior or unsafe work conditions, trigger an immediate confidential escalation to the Mahila Safety Cell without penalty.
            </p>

            <button
              onClick={handleTriggerReport}
              className="w-full bg-[#872828] hover:bg-[#701f1f] text-white py-3 rounded-2xl font-bold text-xs shadow-xs transition flex items-center justify-center gap-2"
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

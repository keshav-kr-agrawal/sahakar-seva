"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  Scale,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  ChevronRight,
  Upload
} from "lucide-react";

export default function AppealPage() {
  const { showToast } = useApp();

  const [appealsList, setAppealsList] = useState([
    {
      id: "APL-8821",
      event: "1-Star Penalty Flag by Customer (Disputed Traffic Delay)",
      date: "August 29, 2026",
      status: "under_review",
      panelNotes: "Traffic telemetry data verified against Google Maps API logs. Hearing scheduled for Friday.",
      stepper: 2, // 1: Submitted, 2: Under Review, 3: Panel Decision
    },
  ]);

  const [appealText, setAppealText] = useState("");

  const handleSubmitAppeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appealText.trim()) return;

    const newAppeal = {
      id: "APL-" + Math.floor(1000 + Math.random() * 9000),
      event: "Customer Rating Dispute",
      date: "Today",
      status: "submitted",
      panelNotes: "Received by Cooperative Arbitration Officer. Verification pending.",
      stepper: 1,
    };

    setAppealsList([newAppeal, ...appealsList]);
    setAppealText("");
    showToast(
      "Appeal Submitted",
      "Your dispute has been logged with the Cooperative Arbitration Panel. Zero algorithmic lockout during review."
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#133e2b] via-[#1e5338] to-[#2d7a52] text-white p-8 rounded-3xl shadow-2xl space-y-3">
        <div className="flex items-center gap-2">
          <span className="bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <Scale className="w-3.5 h-3.5" /> Democratic Arbitration System
          </span>
          <span className="text-xs text-emerald-200">Protected by NCCT Worker Rights Act</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-emerald-100">
          Algorithmic Deprioritization & Rating Appeals
        </h1>
        <p className="text-xs sm:text-sm text-emerald-200/80 max-w-2xl">
          On private platforms, a single bad customer review instantly locks workers out of earning. On SahakarSeva, all rating penalties are subjected to peer review by the Cooperative Arbitration Panel.
        </p>
      </div>

      {/* Main Grid: Active Appeals Tracker + Submit New Appeal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Active Appeals List */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-xl font-bold text-[#133e2b] dark:text-emerald-300 font-serif">
            Active Appeal Cases ({appealsList.length})
          </h2>

          <div className="space-y-4">
            {appealsList.map((apl) => (
              <div
                key={apl.id}
                className="bg-white dark:bg-[#15241d] rounded-3xl p-6 border border-[#133e2b]/15 shadow-xl space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold bg-[#f4efe8] text-[#133e2b] px-2.5 py-0.5 rounded-full">
                      Ref: {apl.id} • {apl.date}
                    </span>
                    <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 font-serif mt-1">
                      {apl.event}
                    </h3>
                  </div>

                  <span className="text-xs font-bold bg-amber-100 text-amber-800 px-3 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Under Panel Review
                  </span>
                </div>

                {/* 3-Step Appeal Stepper */}
                <div className="p-4 bg-[#f4efe8]/60 dark:bg-emerald-950/40 rounded-2xl space-y-2">
                  <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    Arbitration Timeline Tracker
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 rounded-xl bg-[#2d7a52] text-white font-bold">1. Submitted</div>
                    <div className="p-2 rounded-xl bg-amber-500 text-black font-bold animate-pulse">2. Under Review</div>
                    <div className="p-2 rounded-xl bg-gray-200 dark:bg-gray-800 text-gray-500 font-medium">3. Decision</div>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground bg-emerald-50 dark:bg-emerald-950/60 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800">
                  <strong>Panel Notes:</strong> {apl.panelNotes}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Submit New Dispute Form */}
        <div className="lg:col-span-5 space-y-6">
          <form
            onSubmit={handleSubmitAppeal}
            className="bg-white dark:bg-[#15241d] rounded-3xl p-6 border border-[#133e2b]/15 shadow-xl space-y-4"
          >
            <h3 className="text-lg font-bold text-[#133e2b] dark:text-emerald-300 font-serif flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#2d7a52]" />
              <span>Submit Rating Dispute Appeal</span>
            </h3>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                Explain the Incident / Traffic Evidence
              </label>
              <textarea
                value={appealText}
                onChange={(e) => setAppealText(e.target.value)}
                placeholder="Describe what occurred (e.g. customer requested unlisted extra tasks, or monsoon traffic delay)..."
                rows={4}
                className="w-full bg-[#f4efe8] dark:bg-emerald-950/60 p-3 rounded-xl text-xs font-medium focus:outline-none border border-gray-200 dark:border-gray-800"
              />
            </div>

            <div className="p-3 bg-[#e8f4ed] dark:bg-emerald-950/40 rounded-xl flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Upload className="w-4 h-4 text-[#2d7a52]" /> Attach Photo / Telemetry Evidence
              </span>
              <span className="text-[10px] font-bold text-[#2d7a52]">Mock Upload Ready</span>
            </div>

            <button
              type="submit"
              className="w-full bg-[#133e2b] hover:bg-[#1e5338] text-white py-3 rounded-xl font-extrabold text-xs shadow-lg transition flex items-center justify-center gap-2"
            >
              <span>Submit to Arbitration Panel</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

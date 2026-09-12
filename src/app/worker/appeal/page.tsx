"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import {
  Scale,
  ShieldCheck,
  CheckCircle2,
  Clock,
  FileText,
  ChevronRight,
  Upload,
  ArrowLeft,
} from "lucide-react";

export default function AppealPage() {
  const { showToast } = useApp();

  const [appealsList, setAppealsList] = useState([
    {
      id: "APL-8821",
      event: "1-Star Rating Penalty Flag (Disputed Monsoon Traffic Delay)",
      date: "August 29, 2026",
      status: "under_review",
      panelNotes: "Telemetry corroborated heavy waterlogging on Outer Ring Road. Peer hearing scheduled with RWA delegate.",
      stepper: 2,
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
      panelNotes: "Received by Cooperative Arbitration Officer. Telemetry verification pending.",
      stepper: 1,
    };

    setAppealsList([newAppeal, ...appealsList]);
    setAppealText("");
    showToast(
      "Appeal Registered",
      "Your dispute has been logged with the Cooperative Arbitration Panel. Zero algorithmic lockout during review."
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
          <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider border border-slate-700">
            <Scale className="w-3.5 h-3.5" /> Democratic Arbitration System
          </span>
          <span className="text-xs text-slate-400">Zero Unilateral Algorithmic Lockouts</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Algorithmic Deprioritization & Rating Appeals
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
          On extractive private apps, a single bad customer rating silently cuts off worker dispatches. On SahakarSeva, all penalty flags are reviewed by a 4-member peer jury (3 senior workers + 1 federation administrator).
        </p>
      </div>

      {/* Main Grid: Active Appeals Tracker + Submit New Appeal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Active Appeals List */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-xl font-black text-slate-900">
            Active Arbitration Cases ({appealsList.length})
          </h2>

          <div className="space-y-4">
            {appealsList.map((apl) => (
              <div
                key={apl.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-soft space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-full">
                      Ref: {apl.id} • {apl.date}
                    </span>
                    <h3 className="text-base font-black text-slate-900 mt-1.5">
                      {apl.event}
                    </h3>
                  </div>

                  <span className="text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> Under Panel Review
                  </span>
                </div>

                {/* 3-Step Arbitration Timeline */}
                <div className="p-4 bg-slate-50 rounded-2xl space-y-2 border border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Arbitration Process Timeline
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 rounded-xl bg-slate-900 text-white font-bold">1. Logged</div>
                    <div className="p-2 rounded-xl bg-slate-800 text-white font-bold">2. Under Review</div>
                    <div className="p-2 rounded-xl bg-slate-200 text-slate-600 font-medium">3. Final Decision</div>
                  </div>
                </div>

                <div className="text-xs text-slate-700 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 leading-relaxed">
                  <strong>Panel Notes:</strong> {apl.panelNotes}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Submit Dispute Form */}
        <div className="lg:col-span-5 space-y-6">
          <form
            onSubmit={handleSubmitAppeal}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-soft space-y-4"
          >
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-slate-900" />
              <span>Submit Rating Dispute</span>
            </h3>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">
                Describe Circumstances / Attach Evidence
              </label>
              <textarea
                value={appealText}
                onChange={(e) => setAppealText(e.target.value)}
                placeholder="Explain what occurred (e.g. extreme monsoon waterlogging, customer requested unlisted extra tasks)..."
                rows={4}
                className="w-full bg-slate-50 p-3 rounded-2xl text-xs font-medium focus:outline-none border border-slate-200 text-slate-900 placeholder:text-slate-400"
              />
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl flex items-center justify-between text-xs text-slate-700 border border-slate-200">
              <span className="flex items-center gap-1.5">
                <Upload className="w-4 h-4 text-slate-800" /> Telemetry & GPS Logs Attached
              </span>
              <span className="text-[10px] font-bold text-emerald-700">Synced</span>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-xl font-bold text-xs shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
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

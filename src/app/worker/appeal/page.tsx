"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  Scale,
  ShieldCheck,
  CheckCircle2,
  Clock,
  FileText,
  ChevronRight,
  Upload
} from "lucide-react";

export default function AppealPage() {
  const { showToast } = useApp();

  const [appealsList, setAppealsList] = useState([
    {
      id: "APL-8821",
      event: "1-Star Rating Penalty Flag (Disputed Monsoon Traffic Delay)",
      date: "August 29, 2026",
      status: "under_review",
      panelNotes: "Google Maps traffic telemetry corroborated heavy waterlogging on Outer Ring Road. Hearing scheduled with RWA delegate.",
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="bg-[#193927] text-[#f9f7f2] p-8 rounded-3xl shadow-elevated space-y-3 border border-[#2d6243]">
        <div className="flex items-center gap-2">
          <span className="bg-[#855b16] text-[#ffffff] text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5" /> Democratic Arbitration System
          </span>
          <span className="text-xs text-[#c5d7cc]">Protected by NCCT Worker Rights Standard</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-[#f9f7f2]">
          Algorithmic Deprioritization & Rating Appeals
        </h1>
        <p className="text-xs sm:text-sm text-[#dce8e1] max-w-2xl leading-relaxed">
          On private platforms, a single punitive customer rating silently deprioritizes workers. On SahakarSeva, all rating flags are subject to peer review by the elected Cooperative Arbitration Panel.
        </p>
      </div>

      {/* Main Grid: Active Appeals Tracker + Submit New Appeal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Active Appeals List */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-xl font-bold text-[#14221b] dark:text-[#edebe4] font-serif">
            Active Arbitration Cases ({appealsList.length})
          </h2>

          <div className="space-y-4">
            {appealsList.map((apl) => (
              <div
                key={apl.id}
                className="bg-[#ffffff] dark:bg-[#13221b] rounded-3xl p-6 sm:p-7 border border-[#e2ded4] dark:border-[#233b2e] shadow-soft space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold bg-[#f4f0e8] text-[#193927] border border-[#ede9e1] px-2.5 py-0.5 rounded-full">
                      Ref: {apl.id} • {apl.date}
                    </span>
                    <h3 className="text-base font-bold text-[#14221b] dark:text-[#edebe4] font-serif mt-1.5">
                      {apl.event}
                    </h3>
                  </div>

                  <span className="text-xs font-bold bg-[#fdf4e8] text-[#855b16] border border-[#eedbc2] px-3 py-1 rounded-full flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> Under Panel Review
                  </span>
                </div>

                {/* 3-Step Arbitration Timeline */}
                <div className="p-4 bg-[#f9f7f2] dark:bg-[#182c22] rounded-2xl space-y-2 border border-[#ede9e1] dark:border-[#244230]">
                  <div className="text-[10px] font-bold text-[#7c8d82] uppercase tracking-wider">
                    Arbitration Process Timeline
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 rounded-xl bg-[#224c34] text-white font-bold">1. Logged</div>
                    <div className="p-2 rounded-xl bg-[#855b16] text-white font-bold">2. Under Review</div>
                    <div className="p-2 rounded-xl bg-[#f4f0e8] text-[#7c8d82] font-medium">3. Final Decision</div>
                  </div>
                </div>

                <div className="text-xs text-[#506155] dark:text-[#a3b8ac] bg-[#f0f5f2] dark:bg-[#152a1e] p-3.5 rounded-2xl border border-[#c5d7cc] dark:border-[#2a4e39] leading-relaxed">
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
            className="bg-[#ffffff] dark:bg-[#13221b] rounded-3xl p-6 sm:p-7 border border-[#e2ded4] dark:border-[#233b2e] shadow-soft space-y-4"
          >
            <h3 className="text-lg font-bold text-[#14221b] dark:text-[#edebe4] font-serif flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#224c34]" />
              <span>Submit Rating Dispute</span>
            </h3>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#14221b] dark:text-[#edebe4]">
                Describe Circumstances / Attach Evidence
              </label>
              <textarea
                value={appealText}
                onChange={(e) => setAppealText(e.target.value)}
                placeholder="Explain what occurred (e.g. extreme monsoon waterlogging, customer requested unlisted extra tasks)..."
                rows={4}
                className="w-full bg-[#f9f7f2] dark:bg-[#182c22] p-3 rounded-2xl text-xs font-medium focus:outline-none border border-[#ede9e1] dark:border-[#244230]"
              />
            </div>

            <div className="p-3.5 bg-[#f0f5f2] dark:bg-[#152a1e] rounded-2xl flex items-center justify-between text-xs text-[#506155] dark:text-[#a3b8ac] border border-[#c5d7cc] dark:border-[#2a4e39]">
              <span className="flex items-center gap-1.5">
                <Upload className="w-4 h-4 text-[#224c34]" /> Telemetry & GPS Logs Attached
              </span>
              <span className="text-[10px] font-bold text-[#224c34] dark:text-[#a3c9b4]">Synced</span>
            </div>

            <button
              type="submit"
              className="w-full bg-[#193927] hover:bg-[#224c34] text-white py-3.5 rounded-2xl font-bold text-xs shadow-xs transition flex items-center justify-center gap-2"
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

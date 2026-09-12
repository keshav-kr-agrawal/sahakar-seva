"use client";

import React from "react";
import { SAMPLE_WORKER_PASSPORT } from "@/lib/mockData";
import { useApp } from "@/context/AppContext";
import { formatINR } from "@/lib/utils";
import { X, ShieldCheck, CheckCircle2, Network } from "lucide-react";
import { motion } from "framer-motion";

export default function WorkerPassportModal() {
  const { activePassportModal, setActivePassportModal } = useApp();

  if (!activePassportModal) return null;

  const passport = SAMPLE_WORKER_PASSPORT;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm animate-in fade-in duration-150">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        className="bg-white rounded-2xl shadow-elevated border border-slate-200 w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-start justify-between bg-slate-900 text-white">
          <div>
            <div className="flex items-center gap-1.5 mb-1 text-slate-300 font-medium text-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Ministry of Cooperation / NCCT Certified</span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold">Cooperative Worker Passport</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Portable, worker-owned sovereign credential & trust graph
            </p>
          </div>

          <button
            onClick={() => setActivePassportModal(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-full transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Passport Content */}
        <div className="p-5 overflow-y-auto space-y-3.5 flex-1 text-xs">
          {/* Top Identifiers */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500 font-medium">e-Shram National UAN:</span>
              <span className="font-mono font-bold text-slate-900">{passport.uanNumber}</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500 font-medium">Aadhaar e-KYC:</span>
              <span className="font-bold text-slate-900 bg-slate-200 px-2 py-0.5 rounded text-[11px] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-slate-700" />
                Verified
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">NSDC Certification:</span>
              <span className="font-mono font-semibold text-slate-800">{passport.nsdcCertificateId}</span>
            </div>
          </div>

          {/* GNN Graph Trust Score */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-slate-900 font-bold text-xs">
                <Network className="w-3.5 h-3.5 text-slate-700" />
                <span>GNN Trust Network Score</span>
              </div>
              <span className="text-xl font-black text-slate-900 font-mono">
                {passport.gnnTrustScore}/100
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Computed via Graph Neural Network over {passport.multiHopNeighboursCount} verified peer craft attestations.
            </p>
          </div>

          {/* Dual Disaggregated Ratings */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Craft Quality Rating
              </span>
              <div className="text-lg font-black text-slate-900 font-mono mt-0.5">
                {passport.separateQualityRating} ★
              </div>
              <span className="text-[10px] text-slate-400">148 verified gigs</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Women-Safety Rating
              </span>
              <div className="text-lg font-black text-slate-900 font-mono mt-0.5">
                {passport.separateWomenSafetyRating} ★
              </div>
              <span className="text-[10px] text-slate-400">Zero safety incidents</span>
            </div>
          </div>

          {/* Privacy & Welfare */}
          <div className="p-3.5 rounded-xl bg-slate-900 text-white space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">Federated Learning Privacy</span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-bold">
                On-Device
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Raw behavioral data never leaves the worker phone. Only secure gradient updates are transmitted.
            </p>
            <div className="border-t border-slate-800 pt-1.5 flex items-center justify-between text-xs">
              <span className="text-slate-400">Ayushman Bharat PM-JAY:</span>
              <span className="font-mono font-bold text-white">{formatINR(passport.activeInsuranceCoverINR)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
          <span className="text-slate-500">Interoperable with ONDC Network</span>
          <button
            onClick={() => setActivePassportModal(false)}
            className="font-bold text-slate-900 bg-white px-4 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 transition cursor-pointer"
          >
            Close Passport
          </button>
        </div>
      </motion.div>
    </div>
  );
}

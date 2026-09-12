"use client";

import React from "react";
import { SAMPLE_WORKER_PASSPORT } from "@/lib/mockData";
import { useApp } from "@/context/AppContext";
import { formatINR } from "@/lib/utils";
import { X, ShieldCheck, Award, Lock, HeartHandshake, CheckCircle2, QrCode, Network, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function WorkerPassportModal() {
  const { activePassportModal, setActivePassportModal } = useApp();

  if (!activePassportModal) return null;

  const passport = SAMPLE_WORKER_PASSPORT;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-150">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-white rounded-3xl shadow-elevated border border-slate-200 w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-900 text-white">
          <div>
            <div className="flex items-center gap-1.5 mb-1 text-emerald-400 font-bold text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>Ministry of Cooperation / NCCT Certified</span>
            </div>
            <h2 className="text-xl font-black">Cooperative Worker Passport</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Portable, Worker-Owned Sovereign Credential & Trust Graph
            </p>
          </div>

          <button
            onClick={() => setActivePassportModal(false)}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Passport Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          {/* Top Identifiers Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
              <span className="text-slate-500 font-medium">e-Shram National UAN:</span>
              <span className="font-mono font-bold text-slate-900">{passport.uanNumber}</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
              <span className="text-slate-500 font-medium">Aadhaar e-KYC Verification:</span>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Verified
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Skill Certification:</span>
              <span className="font-mono font-semibold text-slate-800">{passport.nsdcCertificateId}</span>
            </div>
          </div>

          {/* GNN Graph Trust Score & Multi-Hop Attestation */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 via-emerald-50/40 to-transparent border border-emerald-200 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-sm">
                <Network className="w-4 h-4 text-emerald-600" />
                <span>GNN Trust Network Score</span>
              </div>
              <span className="text-2xl font-black text-emerald-700 font-mono">
                {passport.gnnTrustScore}/100
              </span>
            </div>
            <p className="text-[11px] text-slate-600">
              Computed via Graph Neural Network over {passport.multiHopNeighboursCount} verified peer craft attestations. Fraud-proof & Sybil-resistant.
            </p>
          </div>

          {/* Dual Disaggregated Ratings (Quality vs Women Safety) */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Craft Quality Rating
              </span>
              <div className="text-xl font-black text-slate-900 font-mono mt-1">
                {passport.separateQualityRating} ★
              </div>
              <span className="text-[10px] text-slate-500">Based on 148 customer audits</span>
            </div>

            <div className="p-3 bg-pink-50/60 rounded-2xl border border-pink-200/80">
              <span className="text-[10px] font-bold text-pink-700 uppercase tracking-wider block">
                Women-Safety Rating
              </span>
              <div className="text-xl font-black text-pink-900 font-mono mt-1">
                {passport.separateWomenSafetyRating} ★
              </div>
              <span className="text-[10px] text-pink-700">Zero safety incidents</span>
            </div>
          </div>

          {/* Privacy & Welfare Entitlements */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400">Federated Learning Privacy</span>
              <span className="text-[10px] bg-emerald-900 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                100% On-Device
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Raw behavioral data never leaves the worker phone. Only secure gradient updates are transmitted to the cooperative server.
            </p>
            <div className="border-t border-slate-800 pt-2 flex items-center justify-between text-xs">
              <span className="text-slate-300">Active Ayushman Bharat PM-JAY:</span>
              <span className="font-mono font-bold text-emerald-400">{formatINR(passport.activeInsuranceCoverINR)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
          <span className="text-slate-500">Interoperable with ONDC Network</span>
          <button
            onClick={() => setActivePassportModal(false)}
            className="font-bold text-slate-900 bg-white px-4 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 transition cursor-pointer"
          >
            Close Passport
          </button>
        </div>
      </motion.div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SAMPLE_WORKER_PASSPORT, WORKERS } from "@/lib/mockData";
import {
  ShieldCheck,
  Lock,
  Network,
  Cpu,
  Award,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  FileCheck,
  Share2,
  Download,
  ArrowRight,
  Sparkles,
  QrCode,
  UserCheck,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

export default function WorkerPassportPage() {
  const [activeTab, setActiveTab] = useState<"passport" | "federated" | "gnn">("passport");
  const [simulatedLinkProb, setSimulatedLinkProb] = useState(0.78);
  const passport = SAMPLE_WORKER_PASSPORT;

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-20">
      
      {/* 1. Header Banner */}
      <div className="bg-slate-50 border-b border-slate-200 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-200 text-slate-800 px-2.5 py-1 rounded-full">
              abc.md Innovation 3
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
              Sovereign Worker Passport & GNN Trust Network
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Cooperative Worker Passport
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 max-w-2xl font-normal leading-relaxed mt-1">
                Portable, sovereign credential owned by the worker. Powered by on-device federated learning and Graph Neural Network trust propagation across cooperative federations.
              </p>
            </div>

            {/* Credential Action Buttons */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => alert("Digital Passport JSON-LD exported with W3C Verifiable Credential standard.")}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Verifiable Credential</span>
              </button>
            </div>
          </div>

          {/* Segmented Control */}
          <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 text-xs font-bold w-fit mt-4">
            {[
              { id: "passport", label: "🪪 Sovereign Passport" },
              { id: "federated", label: "🔒 Federated Learning Privacy" },
              { id: "gnn", label: "🕸️ GNN Skill-Trust Network" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-lg transition cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-slate-900 text-white shadow-2xs font-black"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        
        {/* Tab 1: Sovereign Passport Specimen Card */}
        {activeTab === "passport" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: The Sovereign Passport Card */}
            <div className="lg:col-span-7 bg-white rounded-3xl border-2 border-slate-900 shadow-elevated p-6 sm:p-8 space-y-6 relative overflow-hidden">
              {/* Card Header Strip */}
              <div className="flex items-start justify-between border-b border-slate-100 pb-5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                    <img
                      src={WORKERS[0].avatar}
                      alt={WORKERS[0].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-black text-slate-900">{WORKERS[0].name}</h2>
                      <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                        Tier {WORKERS[0].verificationTier} Verified
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      National Labour Cooperative Federation of India (NLCFI)
                    </p>
                    <p className="text-[11px] font-mono font-bold text-slate-700 mt-0.5">
                      UAN: {passport.uanNumber}
                    </p>
                  </div>
                </div>

                <div className="w-16 h-16 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center justify-center text-slate-900 p-1 shrink-0">
                  <QrCode className="w-8 h-8" />
                  <span className="text-[8px] font-mono mt-0.5 font-bold">SCAN KYC</span>
                </div>
              </div>

              {/* 3 Core Trust Scores */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <div className="text-lg font-black text-slate-900 font-mono">
                    {passport.gnnTrustScore}/100
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase mt-0.5">
                    GNN Trust Index
                  </div>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <div className="text-lg font-black text-slate-900 font-mono">
                    {passport.separateWomenSafetyRating} ★
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase mt-0.5">
                    Women-Safety Rating
                  </div>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <div className="text-lg font-black text-slate-900 font-mono">
                    {WORKERS[0].jobsCompleted}
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase mt-0.5">
                    Jobs Completed
                  </div>
                </div>
              </div>

              {/* Verified Attestations List */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Verified Sovereign Credentials
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  {[
                    { title: "e-Shram National Unorganized Worker Registry", issuer: "Ministry of Labour & Employment", date: "Verified 2024" },
                    { title: "Aadhaar Demographic & Biometric e-KYC", issuer: "UIDAI Government of India", date: "Verified 2024" },
                    { title: `NSDC Certified: ${passport.nsdcCertificateId}`, issuer: "Skill India Mission", date: "Valid till 2027" },
                    { title: "38 Multi-Hop Community Peer Attestations", issuer: "Bengaluru Labour Co-op Society", date: "Active Trust" },
                  ].map((att) => (
                    <div
                      key={att.title}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-slate-900 leading-tight">{att.title}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{att.issuer} • {att.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills & Micro-Tests */}
              <div className="space-y-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Certified Crafts & Micro-Tests Passed
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {WORKERS[0].skills.map((s) => (
                    <span
                      key={s}
                      className="text-xs font-bold bg-slate-100 text-slate-800 px-3 py-1 rounded-xl border border-slate-200 flex items-center gap-1.5"
                    >
                      <Award className="w-3 h-3 text-slate-600" />
                      <span>{s}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Sovereign Identity Principles */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Why Sovereign Worker Ownership Matters</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  On private gig platforms, if an algorithm bans a worker, their entire reputation, customer reviews, and five years of ratings are erased overnight.
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The SahakarSeva Passport is <strong>cryptographically signed</strong> and owned by the worker. It remains portable across any participating cooperative, city federation, or ONDC consumer app.
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-200 text-xs">
                  <div className="flex items-center gap-2 text-slate-800 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>e-Shram National Database Linked</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-800 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Ayushman Bharat PM-JAY Linked</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-800 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>W3C Verifiable Credential Compliant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: On-Device Federated Learning Privacy */}
        {activeTab === "federated" && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-8 shadow-soft">
            <div className="max-w-3xl space-y-2">
              <div className="flex items-center gap-2 text-slate-900">
                <Lock className="w-5 h-5" />
                <h2 className="text-xl font-black">Federated Learning for Worker Behavior Models</h2>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Raw worker behavioral data (acceptance patterns, cancellation reasons, preferred shifts, GPS trails) never leaves the worker&apos;s personal device.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-900 text-xs">
                  1
                </div>
                <h3 className="text-sm font-extrabold text-slate-900">On-Device Training</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Worker behavioral gradients are computed locally on smartphone hardware using TensorFlow Lite without cloud telemetry.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-900 text-xs">
                  2
                </div>
                <h3 className="text-sm font-extrabold text-slate-900">Secure Aggregation</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Only parameter weight updates (gradients) are transmitted with differential privacy noise (ε=1.2) to prevent reconstruction attacks.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-900 text-xs">
                  3
                </div>
                <h3 className="text-sm font-extrabold text-slate-900">Global Model Broadcast</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Federation central server aggregates weights across 100,000+ workers and pushes back smarter dispatch models to everyone.
                </p>
              </div>
            </div>

            {/* Differential Privacy Metric Pill */}
            <div className="p-4 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero raw telemetry transmitted. Zero central profiling databases.</span>
              </div>
              <span className="font-mono text-emerald-400 font-bold">Differential Privacy Epsilon: 1.20</span>
            </div>
          </div>
        )}

        {/* Tab 3: Graph Neural Network (GNN) Skill-Trust Network */}
        {activeTab === "gnn" && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-8 shadow-soft">
            <div className="max-w-3xl space-y-2">
              <div className="flex items-center gap-2 text-slate-900">
                <Network className="w-5 h-5" />
                <h2 className="text-xl font-black">Heterogeneous Graph-Based Worker-Skill-Trust Network</h2>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                A heterogeneous graph of Worker nodes (W), Skill nodes (S), and Attestation nodes (T). GNN message passing predicts targeted upskilling gaps and neutralizes fraudulent review rings.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Link Prediction Skill Gap Simulator */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
                    Link Prediction Skill-Gap Detector
                  </h3>
                  <span className="text-[10px] font-bold bg-slate-200 text-slate-800 px-2 py-0.5 rounded">
                    Threshold: 0.70
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  When GNN edge link prediction probability between Worker and Skill exceeds 0.70 but the edge is absent, the system flags a recommended upskilling module.
                </p>

                <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800">Target Skill Node:</span>
                    <span className="font-mono font-bold text-slate-900">EV Home Charger Installation</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800">Computed Link Probability:</span>
                    <span className="font-mono font-bold text-emerald-700">{simulatedLinkProb} (Trigger Met)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800">Projected Income Bump:</span>
                    <span className="font-mono font-bold text-slate-900">+₹450/day</span>
                  </div>
                </div>

                <button
                  onClick={() => alert("Enrolled in 2-hour cooperative EV Charger micro-certification module.")}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs py-2.5 rounded-xl transition cursor-pointer"
                >
                  Enroll in Recommended Upskilling Module
                </button>
              </div>

              {/* Multi-Hop Trust Propagation */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
                  Multi-Hop Trust & Sybil Defense
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Trust propagates through multi-hop neighbor endorsements from verified cooperative society leads and senior master craftsmen.
                </p>

                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                    <span>1-Hop Lead Endorsement (Koramangala Co-op)</span>
                    <span className="font-mono font-bold text-slate-900">+42 pts</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                    <span>2-Hop Customer Verified Attestations (38 homes)</span>
                    <span className="font-mono font-bold text-slate-900">+34 pts</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                    <span>Zero Disciplinary Complaints (18 months)</span>
                    <span className="font-mono font-bold text-slate-900">+18 pts</span>
                  </div>
                  <div className="p-3 bg-slate-900 text-white rounded-xl flex items-center justify-between font-bold">
                    <span>Total Sovereign Trust Score:</span>
                    <span className="font-mono text-emerald-400">94 / 100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

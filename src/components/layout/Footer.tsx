"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Award, ArrowUpRight, CheckCircle2, Lock, Sparkles, Umbrella, HeartPulse } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 text-slate-400 border-t border-slate-800 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Column 1: Brand & Cooperative Operating System */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-white font-black text-xl">
                स
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white tracking-tight">
                  Sahakar<span className="text-white">Seva</span>
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  Cooperative Digital Services Operating System
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Cooperative-owned marketplace transforming home and community services across India. Governed democratically by Labour Cooperative Federations with 83%+ direct worker payout, sovereign e-Shram passports, and parametric climate safety.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>e-Shram & Aadhaar KYC</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300">
                <Umbrella className="w-4 h-4 text-sky-400" />
                <span>Parametric Weather Shield</span>
              </div>
            </div>
          </div>

          {/* Column 2: 10 Cooperative Crafts */}
          <div className="space-y-3 text-xs">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
              Cooperative Crafts
            </h4>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li>
                <Link href="/services?category=electrician" className="hover:text-white transition">
                  Electrical & Repairs
                </Link>
              </li>
              <li>
                <Link href="/services?category=plumber" className="hover:text-white transition">
                  Plumbing & Sanitary
                </Link>
              </li>
              <li>
                <Link href="/services?category=carpenter" className="hover:text-white transition">
                  Carpentry & Woodwork
                </Link>
              </li>
              <li>
                <Link href="/services?category=cleaner" className="hover:text-white transition">
                  Deep Cleaning & Sanitization
                </Link>
              </li>
              <li>
                <Link href="/services?category=domestic_help" className="hover:text-white transition">
                  Domestic & Kitchen Help
                </Link>
              </li>
              <li>
                <Link href="/services?category=caregiver" className="hover:text-white transition">
                  Elder & Patient Care
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white hover:underline flex items-center gap-1 font-bold pt-1">
                  <span>View all 10 guilds</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: For Cooperative Craftsmen */}
          <div className="space-y-3 text-xs">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
              Worker Sovereignty
            </h4>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li>
                <Link href="/worker" className="hover:text-white transition">
                  Worker Pro Dashboard
                </Link>
              </li>
              <li>
                <Link href="/passport" className="hover:text-white transition">
                  Sovereign Worker Passport
                </Link>
              </li>
              <li>
                <Link href="/worker/collective-bargaining" className="hover:text-white transition">
                  Democratic Rate Voting
                </Link>
              </li>
              <li>
                <Link href="/worker/safety" className="hover:text-white transition">
                  Women-First Safety Module
                </Link>
              </li>
              <li>
                <Link href="/worker/appeal" className="hover:text-white transition">
                  Arbitration Appeal Panel
                </Link>
              </li>
              <li>
                <Link href="/welfare" className="hover:text-white transition">
                  ₹10,000 MEG & Rain Shield
                </Link>
              </li>
              <li>
                <Link href="/emergency" className="text-rose-400 hover:text-rose-300 transition font-bold">
                  24/7 SOS Emergency Cell
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Platform Intelligence & Governance */}
          <div className="space-y-3 text-xs">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
              Governance & AI
            </h4>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li>
                <Link href="/admin" className="hover:text-white transition">
                  Federation Admin Portal
                </Link>
              </li>
              <li>
                <Link href="/fairness" className="hover:text-white transition">
                  Fairness Console (SHAP/XAI)
                </Link>
              </li>
              <li>
                <Link href="/admin/forecasting" className="hover:text-white transition">
                  GNN Demand Forecasting
                </Link>
              </li>
              <li>
                <Link href="/admin/redistribution" className="hover:text-white transition">
                  Vulnerability Equity Engine
                </Link>
              </li>
              <li>
                <Link href="/admin/batch-pooling" className="hover:text-white transition">
                  Transit Batch Optimizer
                </Link>
              </li>
              <li>
                <Link href="/open-protocol" className="hover:text-white transition">
                  ONDC Open Protocol Specs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & certification bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span>© 2026 SahakarSeva Cooperative Federation Operating System. Governed under National Labour Cooperative Standards.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-400 font-medium">
              <Lock className="w-3.5 h-3.5 text-emerald-500" /> On-Device Federated Privacy
            </span>
            <span className="flex items-center gap-1.5 text-slate-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> 100% Itemized Wage Ledger
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

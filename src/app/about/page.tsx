"use client";

import React from "react";
import Link from "next/link";
import WageLedgerCard from "@/components/ui/WageLedgerCard";
import {
  ShieldCheck,
  Award,
  Heart,
  Scale,
  Users,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 bg-white text-slate-900">
      
      {/* Hero Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
          Cooperative Operating System
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Restoring Dignity, Agency & Ownership to India&apos;s Service Workforce
        </h1>
        <p className="text-base text-slate-600 leading-relaxed font-normal">
          SahakarSeva is a cooperative-owned digital infrastructure engineered to replace predatory corporate commissions with transparent, democratic worker governance under Labour Cooperative Federations.
        </p>
      </div>

      {/* 4 Core Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "83% Direct Worker Pay",
            desc: "100% itemized wage ledger guarantees worker payout with zero hidden aggregator overheads.",
            icon: <Award className="w-5 h-5 text-slate-900" />,
          },
          {
            title: "Democratic Rates",
            desc: "Craftsmen collectively vote on base tariffs and heat-wave rest break allowances per craft.",
            icon: <Users className="w-5 h-5 text-slate-900" />,
          },
          {
            title: "Gender-First Safety",
            desc: "Women-safe verified badges, daylight scheduling preferences, and real-time sister buddy check-ins.",
            icon: <Heart className="w-5 h-5 text-rose-600" />,
          },
          {
            title: "Arbitration Appeals",
            desc: "Protected against unfair black-box algorithmic lockouts with peer-reviewed dispute juries.",
            icon: <Scale className="w-5 h-5 text-slate-900" />,
          },
        ].map((p) => (
          <div
            key={p.title}
            className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-soft space-y-3"
          >
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 w-fit">
              {p.icon}
            </div>
            <h3 className="text-lg font-black text-slate-900">{p.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>

      {/* Wage Transparency Ledger Philosophy Section */}
      <div id="wage-philosophy" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-6">
        <div className="lg:col-span-6 space-y-6">
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full">
            Financial Architecture
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            The Itemized Wage Transparency Ledger
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            On typical corporate gig apps, customers pay ₹500, but workers receive as low as ₹320, while the platform absorbs ₹180 as opaque corporate commission.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            SahakarSeva flips this model: every receipt itemizes the fare breakdown into 4 immutable buckets.
          </p>

          <div className="space-y-2.5 pt-1">
            {[
              "83% Direct Payout to Worker Cooperative Account",
              "5% Group Medical & Accident Hospitalization Cover",
              "7% Monsoon Distress & Parametric Weather Shield",
              "5% Open-Source Cloud Infrastructure Operations",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6">
          <WageLedgerCard totalAmount={600} workerName="Sunita Devi (Domestic Pro)" showComparison={true} />
        </div>
      </div>

      {/* Institutional CTA Box */}
      <div className="bg-slate-950 text-white p-8 sm:p-12 rounded-3xl text-center space-y-6 border border-slate-800 shadow-elevated">
        <h2 className="text-3xl font-black text-white tracking-tight">
          Experience the Cooperative Difference
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
          Explore our verified craftsmen directory or test the democratic collective bargaining simulator.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/services"
            className="bg-white text-slate-900 hover:bg-slate-100 px-6 py-3 rounded-xl font-bold text-xs shadow-xs transition"
          >
            Explore Services
          </Link>
          <Link
            href="/worker/collective-bargaining"
            className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-bold text-xs shadow-xs transition"
          >
            Democratic Rate Tool
          </Link>
        </div>
      </div>
    </div>
  );
}

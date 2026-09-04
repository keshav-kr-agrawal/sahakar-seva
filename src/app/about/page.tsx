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
  CheckCircle2
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#a84422] bg-[#f6e8e2] px-3 py-1 rounded-full">
          Ministry of Cooperation • SIH PS 26089
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#14221b] dark:text-[#edebe4] font-serif leading-tight">
          Restoring Dignity, Agency & Ownership to India's Gig Workforce
        </h1>
        <p className="text-base text-[#506155] dark:text-[#a3b8ac] leading-relaxed">
          SahakarSeva is a cooperative-owned digital infrastructure engineered to replace predatory corporate margins with transparent, democratic worker governance under the Ministry of Cooperation and NCCT.
        </p>
      </div>

      {/* 4 Core Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "82% Take-Home Pay",
            desc: "100% itemized wage ledger guarantees worker payout with zero hidden corporate overheads.",
            icon: <Award className="w-5 h-5 text-[#224c34]" />,
          },
          {
            title: "Democratic Rates",
            desc: "Craftsmen collectively vote on base tariffs and heat-wave rest break allowances per category.",
            icon: <Users className="w-5 h-5 text-[#527964]" />,
          },
          {
            title: "Gender-First Safety",
            desc: "Women-safe verified badges, daylight scheduling preferences, and real-time sister buddy check-ins.",
            icon: <Heart className="w-5 h-5 text-[#872828]" />,
          },
          {
            title: "Arbitration Appeals",
            desc: "Protected against unfair black-box algorithmic lockouts with peer-reviewed dispute panels.",
            icon: <Scale className="w-5 h-5 text-[#855b16]" />,
          },
        ].map((p) => (
          <div
            key={p.title}
            className="bg-[#ffffff] dark:bg-[#13221b] p-6 sm:p-7 rounded-3xl border border-[#e2ded4] dark:border-[#233b2e] shadow-soft space-y-3"
          >
            <div className="p-3 rounded-2xl bg-[#f0f5f2] dark:bg-[#152a1e] border border-[#c5d7cc] dark:border-[#2a4e39] w-fit">
              {p.icon}
            </div>
            <h3 className="text-lg font-bold text-[#14221b] dark:text-[#edebe4] font-serif">{p.title}</h3>
            <p className="text-xs text-[#506155] dark:text-[#a3b8ac] leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>

      {/* Wage Transparency Ledger Philosophy Section */}
      <div id="wage-philosophy" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-6">
        <div className="lg:col-span-6 space-y-6">
          <span className="text-[10px] font-bold text-[#193927] uppercase tracking-wider bg-[#f0f5f2] px-3 py-1 rounded-full">
            Financial Architecture Philosophy
          </span>
          <h2 className="text-3xl font-extrabold text-[#14221b] dark:text-[#edebe4] font-serif">
            The Itemized Wage Transparency Ledger
          </h2>
          <p className="text-sm text-[#506155] dark:text-[#a3b8ac] leading-relaxed">
            On typical corporate gig apps, customers pay ₹500, but workers often receive as low as ₹320, while the platform absorbs ₹180 as opaque corporate margin.
          </p>
          <p className="text-sm text-[#506155] dark:text-[#a3b8ac] leading-relaxed">
            SahakarSeva flips this model: every receipt clearly itemizes the fare breakdown into 4 immutable buckets.
          </p>

          <div className="space-y-2.5 pt-1">
            {[
              "82% Direct Payout to Worker Cooperative Account",
              "5% Group Medical & Accident Hospitalization Cover",
              "8% Monsoon Emergency & Distress Welfare Fund",
              "5% Open-Source Cloud Infrastructure Maintenance",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-xs font-semibold text-[#14221b] dark:text-[#edebe4]">
                <CheckCircle2 className="w-4 h-4 text-[#2d6243] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6">
          <WageLedgerCard totalAmount={600} workerName="Sunita Devi (Domestic Cook)" showComparison={true} />
        </div>
      </div>

      {/* Institutional CTA Box */}
      <div className="bg-[#193927] text-[#f9f7f2] p-8 sm:p-12 rounded-3xl text-center space-y-6 border border-[#2d6243] shadow-elevated">
        <h2 className="text-3xl font-extrabold font-serif text-[#f9f7f2]">
          Experience the Cooperative Difference
        </h2>
        <p className="text-xs sm:text-sm text-[#dce8e1] max-w-xl mx-auto leading-relaxed">
          Explore our verified worker marketplace or test the democratic collective bargaining tool.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/services"
            className="bg-[#ffffff] text-[#193927] hover:bg-[#f0f5f2] px-6 py-3 rounded-xl font-bold text-xs shadow-xs transition"
          >
            Explore Services
          </Link>
          <Link
            href="/worker/collective-bargaining"
            className="bg-[#a84422] hover:bg-[#8c381c] text-white px-6 py-3 rounded-xl font-bold text-xs shadow-xs transition"
          >
            Democratic Rate Tool
          </Link>
        </div>
      </div>
    </div>
  );
}

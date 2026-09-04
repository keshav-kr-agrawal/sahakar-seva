"use client";

import React from "react";
import Link from "next/link";
import TrustBadge from "@/components/ui/TrustBadge";
import WageLedgerCard from "@/components/ui/WageLedgerCard";
import {
  ShieldCheck,
  Award,
  Heart,
  Scale,
  Users,
  Building2,
  Lock,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#c85a32] bg-[#fceee9] px-3 py-1 rounded-full">
          Ministry of Cooperation • SIH PS 26089
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0f241a] dark:text-emerald-100 font-serif leading-tight">
          Restoring Dignity, Agency & Ownership to India's Gig Workforce
        </h1>
        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          SahakarSeva is a cooperative-owned digital platform engineered to replace predatory corporate commissions with transparent, democratic worker governance.
        </p>
      </div>

      {/* 4 Core Pillar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "82% Take-Home Pay",
            desc: "100% itemized wage ledger guarantees worker payout with zero hidden corporate overheads.",
            icon: <Award className="w-6 h-6 text-[#2d7a52]" />,
          },
          {
            title: "Democratic Rates",
            desc: "Workers collectively vote on base rates and rest break intervals per service category.",
            icon: <Users className="w-6 h-6 text-sky-600" />,
          },
          {
            title: "Gender-First Safety",
            desc: "Women-safe verified badges, buddy check-ins, and one-tap emergency escalation.",
            icon: <Heart className="w-6 h-6 text-rose-500" />,
          },
          {
            title: "Arbitration Panel",
            desc: "Protected against unfair algorithmic lockouts with peer-reviewed dispute hearings.",
            icon: <Scale className="w-6 h-6 text-amber-600" />,
          },
        ].map((p) => (
          <div
            key={p.title}
            className="bg-white dark:bg-[#15241d] p-6 rounded-2xl border border-[#133e2b]/15 shadow-md space-y-3"
          >
            <div className="p-3 rounded-xl bg-[#e8f4ed] dark:bg-emerald-950 w-fit">{p.icon}</div>
            <h3 className="text-lg font-bold text-[#133e2b] dark:text-emerald-300 font-serif">{p.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>

      {/* Wage Transparency Ledger Philosophy Section */}
      <div id="wage-philosophy" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs font-bold text-[#2d7a52] uppercase tracking-wider bg-[#e8f4ed] px-3 py-1 rounded-full">
            Our Financial Philosophy
          </span>
          <h2 className="text-3xl font-extrabold text-[#0f241a] dark:text-emerald-100 font-serif">
            The Itemized Wage Transparency Ledger
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            On private gig apps, customers pay ₹500, but workers often receive as low as ₹300, while the platform pockets ₹200 as opaque platform margin.
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            SahakarSeva flips this model: every receipt clearly itemizes the fare breakdown into 4 immutable buckets.
          </p>

          <div className="space-y-2 pt-2">
            {[
              "82% Direct Payout to Worker Cooperative Account",
              "5% Group Medical & Accident Insurance Cover",
              "8% Monsoon Emergency & Distress Welfare Fund",
              "5% Open-Source Cloud Infrastructure Maintenance",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-xs font-semibold text-[#133e2b] dark:text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-[#2d7a52] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6">
          <WageLedgerCard totalAmount={600} workerName="Sunita Devi (Domestic Cook)" showComparison={true} />
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-[#133e2b] text-white p-8 sm:p-12 rounded-3xl text-center space-y-6">
        <h2 className="text-3xl font-extrabold font-serif text-emerald-100">
          Ready to experience the cooperative difference?
        </h2>
        <p className="text-sm text-emerald-100/80 max-w-xl mx-auto">
          Explore our verified worker marketplace or test the democratic collective bargaining tool.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/services"
            className="bg-white text-[#133e2b] hover:bg-emerald-50 px-6 py-3 rounded-xl font-bold text-sm transition"
          >
            Explore Services
          </Link>
          <Link
            href="/worker/collective-bargaining"
            className="bg-[#c85a32] hover:bg-[#b24a24] text-white px-6 py-3 rounded-xl font-bold text-sm transition"
          >
            Test Democratic Rate Tool
          </Link>
        </div>
      </div>
    </div>
  );
}

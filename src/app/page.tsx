"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { SERVICE_CATEGORIES, LOCALITIES, WORKERS } from "@/lib/mockData";
import TrustBadge from "@/components/ui/TrustBadge";
import WageLedgerCard from "@/components/ui/WageLedgerCard";
import {
  Search,
  MapPin,
  ShieldCheck,
  Zap,
  Wrench,
  Hammer,
  Paintbrush,
  Home as HomeIcon,
  HeartPulse,
  Car,
  Flower2,
  Sparkles,
  Cpu,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Heart,
  Award,
  Users,
  Building2,
  DollarSign,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  const { selectedLocality, setSelectedLocality } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const getIcon = (name: string) => {
    switch (name) {
      case "Zap": return <Zap className="w-6 h-6 text-amber-500" />;
      case "Wrench": return <Wrench className="w-6 h-6 text-sky-500" />;
      case "Hammer": return <Hammer className="w-6 h-6 text-[#c85a32]" />;
      case "Paintbrush": return <Paintbrush className="w-6 h-6 text-purple-500" />;
      case "Home": return <HomeIcon className="w-6 h-6 text-[#2d7a52]" />;
      case "HeartPulse": return <HeartPulse className="w-6 h-6 text-rose-500" />;
      case "Car": return <Car className="w-6 h-6 text-blue-500" />;
      case "Flower2": return <Flower2 className="w-6 h-6 text-emerald-500" />;
      case "Sparkles": return <Sparkles className="w-6 h-6 text-yellow-500" />;
      case "Cpu": return <Cpu className="w-6 h-6 text-indigo-500" />;
      default: return <Wrench className="w-6 h-6 text-[#2d7a52]" />;
    }
  };

  const filteredCategories = SERVICE_CATEGORIES.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-20 pb-16">
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#e8f4ed]/60 via-white to-transparent dark:from-emerald-950/40 dark:via-[#0e1813] dark:to-transparent overflow-hidden">
        {/* Soft Background Accent Circles */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-[#2d7a52]/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-40 left-10 w-80 h-80 bg-[#c85a32]/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto space-y-10">
          {/* Top Tagline Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 max-w-fit mx-auto sm:mx-0 bg-white dark:bg-emerald-900/40 border border-[#133e2b]/15 px-3 py-1.5 rounded-full shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#2d7a52] animate-ping" />
            <span className="text-xs font-semibold text-[#133e2b] dark:text-emerald-300">
              Ministry of Cooperation / NCCT PS 26089 Project
            </span>
            <span className="text-xs text-[#c85a32] font-bold">100% Worker Owned</span>
          </motion.div>

          {/* Hero Headlines */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0f241a] dark:text-emerald-100 font-serif leading-[1.15] tracking-tight"
              >
                Urban Company solved how to book. <br />
                <span className="text-[#2d7a52] dark:text-emerald-400 underline decoration-[#c85a32]/40">
                  We solve worker dignity & fair income.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl leading-relaxed"
              >
                SahakarSeva connects you directly with verified, cooperative-member electricians, plumbers, cooks, and technicians. Every rupee is itemized: <strong>82% goes straight to worker bank accounts</strong>, zero hidden commissions.
              </motion.p>

              {/* Hero Search Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-[#15241d] p-3 rounded-2xl shadow-2xl border border-[#133e2b]/20 flex flex-col sm:flex-row items-center gap-3 max-w-2xl"
              >
                <div className="flex items-center gap-2 flex-1 px-3 w-full border-b sm:border-b-0 sm:border-r border-gray-200 dark:border-gray-800 pb-2 sm:pb-0">
                  <Search className="w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search 'Electrician', 'Deep Clean', 'Plumber'..."
                    className="w-full bg-transparent text-sm font-medium focus:outline-none placeholder:text-muted-foreground"
                  />
                </div>

                <div className="flex items-center gap-2 px-3 w-full sm:w-auto">
                  <MapPin className="w-4 h-4 text-[#c85a32] shrink-0" />
                  <select
                    value={selectedLocality}
                    onChange={(e) => setSelectedLocality(e.target.value)}
                    className="bg-transparent text-xs font-semibold text-[#133e2b] dark:text-emerald-300 focus:outline-none cursor-pointer"
                  >
                    {LOCALITIES.map((loc) => (
                      <option key={loc} value={loc} className="dark:bg-[#15241d]">
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <Link
                  href={`/services${searchQuery ? `?query=${encodeURIComponent(searchQuery)}` : ""}`}
                  className="w-full sm:w-auto bg-[#133e2b] hover:bg-[#1e5338] text-white px-6 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md transition"
                >
                  <span>Search</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>

              {/* Popular Service Quick Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-2 justify-center lg:justify-start">
                <span className="text-xs font-semibold text-muted-foreground">Popular:</span>
                {["Electrician", "Plumbing", "Domestic Cook", "Deep Cleaning", "Heritage Woodwork"].map((tag) => (
                  <Link
                    key={tag}
                    href={`/services?query=${encodeURIComponent(tag)}`}
                    className="text-xs bg-[#f4efe8] hover:bg-[#e8f4ed] dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-[#133e2b] dark:text-emerald-300 px-3 py-1 rounded-full font-medium transition border border-[#133e2b]/10"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Hero Right Visual: Live Wage Ledger Card Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-5"
            >
              <div className="relative">
                {/* Floating Verified Badge */}
                <div className="absolute -top-4 -left-4 z-10 bg-white dark:bg-[#15241d] p-3 rounded-2xl shadow-xl border border-emerald-500/30 flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-emerald-100 text-[#133e2b]">
                    <ShieldCheck className="w-5 h-5 text-[#2d7a52]" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-[#133e2b] dark:text-emerald-300">14,250+ Verified</div>
                    <div className="text-[10px] text-muted-foreground">Coop Guild Workers</div>
                  </div>
                </div>

                <WageLedgerCard totalAmount={499} workerName="Rajesh Kumar (Electrician)" showComparison={true} />
              </div>
            </motion.div>
          </div>

          {/* Trust Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-[#133e2b]/10 dark:border-white/10">
            {[
              { label: "Verified Coop Workers", value: "14,250+", icon: <Users className="w-5 h-5 text-[#2d7a52]" /> },
              { label: "Direct Worker Payouts", value: "₹4.8 Crore", icon: <DollarSign className="w-5 h-5 text-emerald-600" /> },
              { label: "On-Time Service Rate", value: "98.4%", icon: <CheckCircle2 className="w-5 h-5 text-sky-600" /> },
              { label: "Wage Ledger Transparency", value: "100% Itemized", icon: <ShieldCheck className="w-5 h-5 text-[#c85a32]" /> },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white dark:bg-[#15241d] p-4 rounded-xl border border-[#133e2b]/10 shadow-sm flex items-center gap-3"
              >
                <div className="p-2.5 rounded-lg bg-[#e8f4ed] dark:bg-emerald-950">{stat.icon}</div>
                <div>
                  <div className="text-xl font-extrabold text-[#133e2b] dark:text-emerald-300">{stat.value}</div>
                  <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#c85a32] bg-[#fceee9] px-2.5 py-0.5 rounded-full">
              Cooperative Guilds
            </span>
            <h2 className="text-3xl font-extrabold text-[#0f241a] dark:text-emerald-100 font-serif mt-2">
              Browse Services by Worker Cooperative
            </h2>
          </div>
          <Link
            href="/services"
            className="text-xs font-bold text-[#133e2b] dark:text-emerald-400 hover:text-[#2d7a52] flex items-center gap-1 bg-[#e8f4ed] dark:bg-emerald-950 px-3 py-2 rounded-lg transition"
          >
            <span>View All 10 Guilds</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredCategories.map((cat) => (
            <Link key={cat.id} href={`/services?category=${cat.id}`}>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-[#15241d] p-5 rounded-2xl border border-[#133e2b]/10 hover:border-[#133e2b]/30 shadow-md hover:shadow-xl transition space-y-3 flex flex-col justify-between h-full group"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-[#f4efe8] dark:bg-emerald-950/80 group-hover:scale-110 transition-transform">
                    {getIcon(cat.iconName)}
                  </div>
                  {cat.popular && (
                    <span className="text-[10px] font-bold bg-[#c85a32] text-white px-2 py-0.5 rounded-full">
                      Popular
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 group-hover:text-[#2d7a52] transition">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{cat.description}</p>
                </div>

                <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                  <span className="font-semibold text-muted-foreground">{cat.itemCount} Workers</span>
                  <span className="font-bold text-[#133e2b] dark:text-emerald-400">From ₹{cat.startingPrice}</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* URBAN COMPANY VS SAHAKARSEVA COMPARISON SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0d2c1e] via-[#133e2b] to-[#1e5338] text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8 border border-emerald-700/40 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-10 font-serif text-[200px] select-none pointer-events-none">
            स
          </div>

          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-widest bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/30">
              Why We Are Different
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-emerald-100">
              Urban Company vs. SahakarSeva Cooperative
            </h2>
            <p className="text-sm text-emerald-200/80 leading-relaxed">
              "Private platforms solved booking convenience by extracting 35% commissions from workers and using opaque deactivation algorithms. SahakarSeva restores worker ownership and transparency."
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-emerald-700/60 text-emerald-200 uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4 font-bold">Feature / Standard</th>
                  <th className="py-3 px-4 font-bold text-rose-300">Typical Private App (Urban Co)</th>
                  <th className="py-3 px-4 font-bold text-emerald-300 bg-emerald-900/40 rounded-t-xl">
                    SahakarSeva (Ministry PS 26089)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-800/40">
                <tr>
                  <td className="py-4 px-4 font-semibold text-emerald-100">Worker Commission Cut</td>
                  <td className="py-4 px-4 text-rose-300 font-medium">25% – 35%+ Corporate Take</td>
                  <td className="py-4 px-4 font-extrabold text-emerald-300 bg-emerald-900/30">
                    5% Open-Source Platform Fee (82% Direct Worker Pay)
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-emerald-100">Rate Governance</td>
                  <td className="py-4 px-4 text-gray-300">Unilateral Corporate Dynamic Pricing</td>
                  <td className="py-4 px-4 font-bold text-emerald-300 bg-emerald-900/30">
                    Democratic Worker Voting & Collective Bargaining
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-emerald-100">Deactivation Protection</td>
                  <td className="py-4 px-4 text-rose-300">Instant AI Rating Lockouts (No Appeal)</td>
                  <td className="py-4 px-4 font-bold text-emerald-300 bg-emerald-900/30">
                    Cooperative Arbitration Panel with Worker Rights
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-emerald-100">Welfare & Insurance</td>
                  <td className="py-4 px-4 text-gray-300">Optional out-of-pocket coverage</td>
                  <td className="py-4 px-4 font-bold text-emerald-300 bg-emerald-900/30">
                    5% Direct Group Medical + Monsoon Crisis Safety Fund
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-emerald-100">Receipt Transparency</td>
                  <td className="py-4 px-4 text-gray-300">Lump sum customer invoice</td>
                  <td className="py-4 px-4 font-bold text-emerald-300 bg-emerald-900/30">
                    100% Itemized Wage Transparency Ledger
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS 3-STEP ANIMATED SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2d7a52] bg-[#e8f4ed] px-3 py-1 rounded-full">
            Simple & Transparent
          </span>
          <h2 className="text-3xl font-extrabold text-[#0f241a] dark:text-emerald-100 font-serif">
            How SahakarSeva Works
          </h2>
          <p className="text-sm text-muted-foreground">
            A seamless experience for customers, built on worker dignity and cooperative trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Select Service & Worker",
              desc: "Browse verified local guild workers by rating, skill badges, and proximity. Combine add-on services for coop discounts.",
              icon: <Search className="w-6 h-6 text-[#2d7a52]" />,
            },
            {
              step: "02",
              title: "View Transparent Wage Ledger",
              desc: "See exact itemized line breakdown before paying: 82% to worker, 5% insurance, 8% welfare pool, 5% platform fee.",
              icon: <ShieldCheck className="w-6 h-6 text-[#c85a32]" />,
            },
            {
              step: "03",
              title: "Live GPS Tracking & Service",
              desc: "Track worker en-route on live map. Enjoy safe, high-quality home service with 1-tap SOS safety protection.",
              icon: <CheckCircle2 className="w-6 h-6 text-emerald-600" />,
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-white dark:bg-[#15241d] p-8 rounded-2xl border border-[#133e2b]/15 shadow-lg relative space-y-4"
            >
              <div className="text-4xl font-extrabold text-[#133e2b]/20 dark:text-emerald-500/20 font-serif absolute top-4 right-6">
                {item.step}
              </div>
              <div className="p-3 rounded-xl bg-[#e8f4ed] dark:bg-emerald-950 w-fit">{item.icon}</div>
              <h3 className="text-xl font-bold text-[#133e2b] dark:text-emerald-300 font-serif">{item.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED WORKERS & HERITAGE CRAFTS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
              Verified Cooperative Craftsmen
            </span>
            <h2 className="text-3xl font-extrabold text-[#0f241a] dark:text-emerald-100 font-serif mt-2">
              Top Rated Local Guild Members
            </h2>
          </div>
          <Link
            href="/services"
            className="text-xs font-bold text-[#133e2b] dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>View All Workers</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {WORKERS.slice(0, 3).map((w) => (
            <div
              key={w.id}
              className="bg-white dark:bg-[#15241d] rounded-2xl border border-[#133e2b]/15 shadow-xl overflow-hidden hover:shadow-2xl transition space-y-4 p-5"
            >
              <div className="flex items-start gap-4">
                <img
                  src={w.avatar}
                  alt={w.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-[#2d7a52]"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-[#133e2b] dark:text-emerald-300 font-serif">
                      {w.name}
                    </h3>
                    <span className="text-xs font-extrabold text-[#2d7a52]">₹{w.hourlyRate}/hr</span>
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#c85a32]" />
                    <span>{w.locality}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1 pt-1">
                    <TrustBadge type="verified" />
                    {w.isWomenSafe && <TrustBadge type="women_safe" />}
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground line-clamp-2 italic">"{w.bio}"</p>

              <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 font-bold text-amber-600">
                  <span>★ {w.rating}</span>
                  <span className="text-muted-foreground font-normal">({w.reviewCount} reviews)</span>
                </div>
                <Link
                  href={`/worker/${w.id}`}
                  className="bg-[#133e2b] hover:bg-[#1e5338] text-white px-3 py-1.5 rounded-lg font-bold text-xs transition"
                >
                  View Profile & Book
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#133e2b] to-[#2d7a52] text-white rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <h2 className="text-3xl font-extrabold font-serif text-emerald-100">
              Are you a gig worker or cooperative leader?
            </h2>
            <p className="text-sm text-emerald-100/80">
              Join SahakarSeva to access democratic rate bargaining, 82% take-home earnings, group insurance, and emergency welfare pools.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/worker"
              className="bg-white text-[#133e2b] hover:bg-emerald-50 px-6 py-3 rounded-xl font-extrabold text-sm shadow-lg transition"
            >
              Join Worker Hub
            </Link>
            <Link
              href="/admin"
              className="bg-[#c85a32] hover:bg-[#b24a24] text-white px-6 py-3 rounded-xl font-extrabold text-sm shadow-lg transition"
            >
              Federation Portal
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

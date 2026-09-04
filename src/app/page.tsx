"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { SERVICE_CATEGORIES, LOCALITIES, WORKERS } from "@/lib/mockData";
import TrustBadge from "@/components/ui/TrustBadge";
import { formatINR } from "@/lib/utils";
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
  Award,
  Users,
  Building2,
  ChevronRight,
  Sliders,
  HardHat,
  Lock
} from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  const { selectedLocality, setSelectedLocality } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Interactive Live Wage Specimen Slider for Hero
  const [heroFareSlider, setHeroFareSlider] = useState(600);
  const heroWorkerTakeHome = Math.round(heroFareSlider * 0.82);
  const heroCorporateTakeHome = Math.round(heroFareSlider * 0.65);
  const extraInWorkerPocket = heroWorkerTakeHome - heroCorporateTakeHome;

  const getGuildIcon = (name: string) => {
    const iconClass = "w-5 h-5 text-[#224c34] dark:text-[#8caea0]";
    switch (name) {
      case "Zap": return <Zap className={iconClass} />;
      case "Wrench": return <Wrench className={iconClass} />;
      case "Hammer": return <Hammer className={iconClass} />;
      case "Paintbrush": return <Paintbrush className={iconClass} />;
      case "Home": return <HomeIcon className={iconClass} />;
      case "HeartPulse": return <HeartPulse className={iconClass} />;
      case "Car": return <Car className={iconClass} />;
      case "Flower2": return <Flower2 className={iconClass} />;
      case "Sparkles": return <Sparkles className={iconClass} />;
      case "Cpu": return <Cpu className={iconClass} />;
      default: return <Wrench className={iconClass} />;
    }
  };

  const filteredCategories = SERVICE_CATEGORIES.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION: Asymmetric Split Editorial Layout */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#f2efe8] via-[#f9f7f2] to-transparent dark:from-[#11221a] dark:via-[#0d1712] dark:to-transparent overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Top Institutional Endorsement Pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 max-w-fit mx-auto sm:mx-0 bg-[#ffffff] dark:bg-[#13221b] border border-[#e2ded4] dark:border-[#233b2e] px-3.5 py-1.5 rounded-full shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#2d6243]" />
            <span className="text-xs font-semibold text-[#193927] dark:text-[#8caea0]">
              Ministry of Cooperation • SIH PS 26089
            </span>
            <span className="text-[#e2ded4] dark:text-[#233b2e]">•</span>
            <span className="text-xs text-[#a84422] font-bold">100% Worker-Owned Cooperative</span>
          </motion.div>

          {/* Hero Headlines & Interactive Specimen */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-7 text-left">
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-[3.75rem] font-extrabold text-[#14221b] dark:text-[#edebe4] font-serif leading-[1.12] tracking-tight"
              >
                Urban Company solved how to book. <br />
                <span className="text-[#193927] dark:text-[#8caea0] italic font-normal">
                  We solve fair wages, safety, & ownership.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg text-[#506155] dark:text-[#a3b8ac] max-w-2xl leading-relaxed"
              >
                SahakarSeva connects your home with verified electricians, plumbers, carpenters, and domestic caregivers organized under registered cooperative guilds. Every single rupee is itemized: <strong>82% goes directly to the worker</strong>, zero hidden commissions.
              </motion.p>

              {/* Integrated Search & Locality Selector */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-[#ffffff] dark:bg-[#13221b] p-3 rounded-2xl shadow-soft border border-[#e2ded4] dark:border-[#233b2e] flex flex-col sm:flex-row items-center gap-3 max-w-2xl"
              >
                <div className="flex items-center gap-2.5 flex-1 px-3.5 w-full border-b sm:border-b-0 sm:border-r border-[#ede9e1] dark:border-[#233b2e] pb-2 sm:pb-0">
                  <Search className="w-4 h-4 text-[#7c8d82]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by skill (e.g. MCB Wiring, Plumbing, Cook)..."
                    className="w-full bg-transparent text-xs sm:text-sm font-medium focus:outline-none placeholder:text-[#7c8d82]"
                  />
                </div>

                <div className="flex items-center gap-2 px-3 w-full sm:w-auto">
                  <MapPin className="w-4 h-4 text-[#a84422] shrink-0" />
                  <select
                    value={selectedLocality}
                    onChange={(e) => setSelectedLocality(e.target.value)}
                    className="bg-transparent text-xs font-semibold text-[#193927] dark:text-[#dce8e1] focus:outline-none cursor-pointer"
                  >
                    {LOCALITIES.map((loc) => (
                      <option key={loc} value={loc} className="dark:bg-[#13221b]">
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <Link
                  href={`/services${searchQuery ? `?query=${encodeURIComponent(searchQuery)}` : ""}`}
                  className="w-full sm:w-auto bg-[#193927] hover:bg-[#224c34] text-[#f9f7f2] px-6 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition shadow-xs"
                >
                  <span>Explore Guild</span>
                  <ArrowRight className="w-4 h-4 text-[#dce8e1]" />
                </Link>
              </motion.div>

              {/* Curated Service Quick Tags */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="font-semibold text-[#7c8d82]">Frequent Guilds:</span>
                {["Electrical Services", "Plumbing", "Domestic Cook", "Deep Cleaning", "Heritage Carpentry"].map((tag) => (
                  <Link
                    key={tag}
                    href={`/services?query=${encodeURIComponent(tag)}`}
                    className="bg-[#f4f0e8] hover:bg-[#e8f0ea] dark:bg-[#182c22] dark:hover:bg-[#223d2f] text-[#193927] dark:text-[#dce8e1] px-3 py-1 rounded-lg font-medium transition border border-[#d8d3c7] dark:border-[#2a4a38]"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Hero Right Visual: Interactive Live Fare & Wage Specimen */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 }}
              className="lg:col-span-5"
            >
              <div className="bg-[#ffffff] dark:bg-[#13221b] rounded-3xl p-6 sm:p-8 border border-[#e2ded4] dark:border-[#233b2e] shadow-elevated space-y-6">
                <div className="flex items-center justify-between border-b border-[#ede9e1] dark:border-[#233b2e] pb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#a84422] bg-[#f6e8e2] dark:bg-[#331d16] px-2.5 py-0.5 rounded-full inline-block mb-1">
                      Interactive Fare Specimen
                    </span>
                    <h2 className="text-xl font-bold text-[#14221b] dark:text-[#edebe4] font-serif">
                      Drag to test wage equity
                    </h2>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#7c8d82]">Service Fare</span>
                    <div className="text-2xl font-extrabold text-[#193927] dark:text-[#8caea0]">
                      {formatINR(heroFareSlider)}
                    </div>
                  </div>
                </div>

                {/* Interactive Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-[#506155] dark:text-[#a3b8ac] font-medium">
                    <span>Adjust sample booking amount:</span>
                    <span className="font-bold text-[#193927] dark:text-[#8caea0]">₹{heroFareSlider}</span>
                  </div>
                  <input
                    type="range"
                    min="300"
                    max="1500"
                    step="50"
                    value={heroFareSlider}
                    onChange={(e) => setHeroFareSlider(Number(e.target.value))}
                    className="w-full h-2.5 bg-[#f4f0e8] dark:bg-[#1c3025] rounded-lg appearance-none cursor-pointer accent-[#193927]"
                  />
                  <div className="flex justify-between text-[10px] text-[#7c8d82]">
                    <span>₹300 (Basic repair)</span>
                    <span>₹900 (Deep clean)</span>
                    <span>₹1,500 (Full overhaul)</span>
                  </div>
                </div>

                {/* 4-Part Transparent Ledger Breakdown */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 bg-[#f0f5f2] dark:bg-[#152a1e] rounded-2xl border border-[#c5d7cc] dark:border-[#2a4e39] space-y-1">
                    <div className="text-[11px] font-bold text-[#224c34] dark:text-[#a3c9b4]">Worker Take-Home (82%)</div>
                    <div className="text-xl font-extrabold text-[#193927] dark:text-[#edebe4]">{formatINR(heroWorkerTakeHome)}</div>
                    <div className="text-[10px] text-[#506155] dark:text-[#8caea0]">Straight to worker account</div>
                  </div>

                  <div className="p-3.5 bg-[#fdf4e8] dark:bg-[#2d2214] rounded-2xl border border-[#eedbc2] dark:border-[#523d24] space-y-1">
                    <div className="text-[11px] font-bold text-[#855b16] dark:text-[#dec08a]">Emergency Pool (8%)</div>
                    <div className="text-xl font-extrabold text-[#855b16] dark:text-[#dec08a]">
                      {formatINR(Math.round(heroFareSlider * 0.08))}
                    </div>
                    <div className="text-[10px] text-[#7c8d82]">Monsoon welfare buffer</div>
                  </div>

                  <div className="p-3.5 bg-[#f9ecec] dark:bg-[#2b1717] rounded-2xl border border-[#f0d5d5] dark:border-[#4d2828] space-y-1">
                    <div className="text-[11px] font-bold text-[#872828] dark:text-[#e4a8a8]">Health Insurance (5%)</div>
                    <div className="text-xl font-extrabold text-[#872828] dark:text-[#e4a8a8]">
                      {formatINR(Math.round(heroFareSlider * 0.05))}
                    </div>
                    <div className="text-[10px] text-[#7c8d82]">Hospitalization cover</div>
                  </div>

                  <div className="p-3.5 bg-[#f4f0e8] dark:bg-[#1c3025] rounded-2xl border border-[#e2ded4] dark:border-[#2a4a38] space-y-1">
                    <div className="text-[11px] font-bold text-[#506155] dark:text-[#a3b8ac]">Platform Ops (5%)</div>
                    <div className="text-xl font-extrabold text-[#14221b] dark:text-[#edebe4]">
                      {formatINR(Math.round(heroFareSlider * 0.05))}
                    </div>
                    <div className="text-[10px] text-[#7c8d82]">Open-source cloud server</div>
                  </div>
                </div>

                {/* Clear Advantage Comparison */}
                <div className="p-3.5 bg-[#f9f7f2] dark:bg-[#182c22] rounded-2xl border border-[#ede9e1] dark:border-[#244230] flex items-center justify-between text-xs">
                  <span className="text-[#506155] dark:text-[#a3b8ac]">Extra earned vs Private App:</span>
                  <span className="text-[#a84422] font-extrabold text-sm">
                    +₹{extraInWorkerPocket} more in worker pocket
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Clean Trust Proof Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-[#e2ded4] dark:border-[#233b2e]">
            {[
              { value: "14,250+", label: "Verified Guild Members", sub: "NCCT 3-Tier Tested" },
              { value: "₹4.8 Crore", label: "Direct Worker Payouts", sub: "82% Take-Home Rate" },
              { value: "98.4%", label: "On-Time Arrival", sub: "RWA Monitored" },
              { value: "100%", label: "Wage Transparency", sub: "Itemized on Every Fare" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-[#ffffff] dark:bg-[#13221b] p-5 rounded-2xl border border-[#e2ded4] dark:border-[#233b2e] shadow-xs space-y-1"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-[#193927] dark:text-[#8caea0] font-serif tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-[#14221b] dark:text-[#edebe4]">{stat.label}</div>
                <div className="text-[11px] text-[#7c8d82]">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. CURATED SERVICE GUILDS INDEX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#a84422] bg-[#f6e8e2] px-3 py-0.5 rounded-full">
              Registered Cooperative Guilds
            </span>
            <h2 className="text-3xl font-extrabold text-[#14221b] dark:text-[#edebe4] font-serif">
              Explore Household Services by Worker Guild
            </h2>
          </div>
          <Link
            href="/services"
            className="text-xs font-bold text-[#193927] dark:text-[#8caea0] hover:underline flex items-center gap-1.5"
          >
            <span>View All Guild Listings</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredCategories.map((cat) => (
            <Link key={cat.id} href={`/services?category=${cat.id}`} className="group">
              <div className="bg-[#ffffff] dark:bg-[#13221b] p-5 rounded-2xl border border-[#e2ded4] dark:border-[#233b2e] hover:border-[#193927] shadow-xs hover:shadow-soft transition-all h-full flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f0f5f2] dark:bg-[#193225] border border-[#dce8e1] dark:border-[#244230] flex items-center justify-center group-hover:bg-[#193927] transition-colors">
                    {getGuildIcon(cat.iconName)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#14221b] dark:text-[#edebe4] group-hover:text-[#193927] transition">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[#7c8d82] line-clamp-2 mt-1">{cat.description}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#ede9e1] dark:border-[#233b2e] flex items-center justify-between text-xs">
                  <span className="text-[#506155] dark:text-[#a3b8ac] font-medium">{cat.itemCount} Guild Craftsmen</span>
                  <span className="font-extrabold text-[#193927] dark:text-[#8caea0]">₹{cat.startingPrice}+</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. EDITORIAL COMPARATIVE MATRIX: Urban Company vs SahakarSeva */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#11261a] text-[#edebe4] rounded-3xl p-8 sm:p-12 shadow-elevated space-y-8 border border-[#244230] relative overflow-hidden">
          <div className="max-w-3xl space-y-3">
            <span className="text-[11px] font-bold text-[#dce8e1] uppercase tracking-wider bg-[#1d3c2a] px-3 py-1 rounded-full border border-[#2d6243]">
              Institutional Differentiation Matrix
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-[#f9f7f2]">
              Private Gig Platforms vs. SahakarSeva Cooperative
            </h2>
            <p className="text-xs sm:text-sm text-[#8caea0] leading-relaxed">
              "Urban Company solved booking convenience by extracting up to 35% commission and using black-box automated deactivations. SahakarSeva replaces predatory algorithmic extraction with democratic worker ownership."
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#244230] text-[#a3b8ac] uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4 font-bold">Standard of Governance</th>
                  <th className="py-3 px-4 font-bold text-[#e4a8a8]">Corporate Gig App (Urban Company)</th>
                  <th className="py-3 px-4 font-bold text-[#dce8e1] bg-[#163022] rounded-t-xl">
                    SahakarSeva Cooperative (PS 26089)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1c3627]">
                <tr>
                  <td className="py-4 px-4 font-semibold text-[#f9f7f2]">Worker Take-Home Fare</td>
                  <td className="py-4 px-4 text-[#de8a70]">65% – 75% (Opaque 25–35% Corporate Take)</td>
                  <td className="py-4 px-4 font-bold text-[#f9f7f2] bg-[#163022]">
                    82% Guaranteed Direct Take-Home (Capped 5% Platform Fee)
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-[#f9f7f2]">Tariff & Rate Governance</td>
                  <td className="py-4 px-4 text-[#8caea0]">Unilateral algorithmic dynamic pricing</td>
                  <td className="py-4 px-4 font-bold text-[#f9f7f2] bg-[#163022]">
                    Democratic Worker Collective Voting & Bargaining
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-[#f9f7f2]">Account Deactivation</td>
                  <td className="py-4 px-4 text-[#de8a70]">Instant automated algorithm lockout without appeal</td>
                  <td className="py-4 px-4 font-bold text-[#f9f7f2] bg-[#163022]">
                    Cooperative Arbitration Panel with Worker Representation
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-[#f9f7f2]">Distress & Crisis Safety Net</td>
                  <td className="py-4 px-4 text-[#8caea0]">Zero institutional financial reserve</td>
                  <td className="py-4 px-4 font-bold text-[#f9f7f2] bg-[#163022]">
                    8% Monsoon Distress Reserve + 5% Group Medical Insurance
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-[#f9f7f2]">Fee Transparency</td>
                  <td className="py-4 px-4 text-[#8caea0]">Single lump-sum customer receipt</td>
                  <td className="py-4 px-4 font-bold text-[#f9f7f2] bg-[#163022]">
                    100% Itemized Wage Transparency Ledger
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS: 3-Step Cooperative Protocol */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#193927] bg-[#f0f5f2] px-3 py-1 rounded-full">
            Transparent Workflow
          </span>
          <h2 className="text-3xl font-extrabold text-[#14221b] dark:text-[#edebe4] font-serif">
            How SahakarSeva Serves Households
          </h2>
          <p className="text-xs sm:text-sm text-[#506155] dark:text-[#a3b8ac]">
            A frictionless consumer experience backed by democratic worker dignity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              title: "Discover Local Guild Workers",
              desc: "Select verified electricians, plumbers, and cooks filtered by NCCT skill test tiers, RWA references, and proximity.",
              badge: "NCCT Verified",
            },
            {
              step: "02",
              title: "Audit the Itemized Wage Ledger",
              desc: "Before paying, inspect the immutable 82% worker payout, 5% medical insurance, 8% emergency pool, and 5% platform fee.",
              badge: "100% Transparent",
            },
            {
              step: "03",
              title: "Live GPS Telemetry & SOS Safety",
              desc: "Track the worker en-route on our interactive cartographic map with integrated women safety check-ins and emergency SOS.",
              badge: "Safe Daylight Routing",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-[#ffffff] dark:bg-[#13221b] p-7 rounded-3xl border border-[#e2ded4] dark:border-[#233b2e] shadow-soft space-y-4 relative"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl font-extrabold font-serif text-[#193927]/20 dark:text-[#8caea0]/20">
                  {item.step}
                </span>
                <span className="text-[10px] font-bold text-[#193927] dark:text-[#8caea0] bg-[#f0f5f2] dark:bg-[#193225] px-2.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#14221b] dark:text-[#edebe4] font-serif">
                {item.title}
              </h3>
              <p className="text-xs text-[#506155] dark:text-[#a3b8ac] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TOP GUILD WORKERS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#855b16] bg-[#fdf4e8] px-3 py-0.5 rounded-full">
              Verified Cooperative Guild Craftsmen
            </span>
            <h2 className="text-3xl font-extrabold text-[#14221b] dark:text-[#edebe4] font-serif">
              Highest-Rated Neighborhood Craftsmen
            </h2>
          </div>
          <Link
            href="/services"
            className="text-xs font-bold text-[#193927] dark:text-[#8caea0] hover:underline flex items-center gap-1"
          >
            <span>View All Guild Members</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {WORKERS.slice(0, 3).map((w) => (
            <div
              key={w.id}
              className="bg-[#ffffff] dark:bg-[#13221b] rounded-3xl border border-[#e2ded4] dark:border-[#233b2e] shadow-soft p-6 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                <div className="flex items-start gap-4">
                  <img
                    src={w.avatar}
                    alt={w.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-[#224c34]"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-[#14221b] dark:text-[#edebe4] font-serif">
                        {w.name}
                      </h3>
                      <span className="text-xs font-extrabold text-[#193927] dark:text-[#8caea0]">
                        ₹{w.hourlyRate}/hr
                      </span>
                    </div>
                    <div className="text-xs text-[#7c8d82] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#a84422]" />
                      <span>{w.locality}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <TrustBadge type="verified" />
                      {w.isWomenSafe && <TrustBadge type="women_safe" />}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#506155] dark:text-[#a3b8ac] line-clamp-2 italic bg-[#f9f7f2] dark:bg-[#182c22] p-3 rounded-xl border border-[#ede9e1] dark:border-[#244230]">
                  "{w.bio}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#ede9e1] dark:border-[#233b2e] flex items-center justify-between text-xs">
                <div className="text-xs font-semibold text-[#855b16]">
                  ★ {w.rating} ({w.reviewCount} reviews)
                </div>
                <Link
                  href={`/worker/${w.id}`}
                  className="bg-[#193927] hover:bg-[#224c34] text-[#f9f7f2] px-3.5 py-1.5 rounded-xl font-bold text-xs transition"
                >
                  Book Craftsman
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION: Cooperative Onboarding Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#193927] text-[#f9f7f2] rounded-3xl p-8 sm:p-12 shadow-elevated flex flex-col md:flex-row items-center justify-between gap-8 border border-[#2d6243]">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h2 className="text-3xl font-extrabold font-serif text-[#f9f7f2]">
              Are you a gig worker or cooperative union?
            </h2>
            <p className="text-xs sm:text-sm text-[#dce8e1] leading-relaxed">
              Register with SahakarSeva to establish democratic tariff bargaining, retain 82% take-home earnings, and access collective medical insurance.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/worker"
              className="bg-[#ffffff] text-[#193927] hover:bg-[#f0f5f2] px-6 py-3 rounded-xl font-bold text-xs shadow-xs transition"
            >
              Join Worker Hub
            </Link>
            <Link
              href="/admin"
              className="bg-[#a84422] hover:bg-[#8c381c] text-[#ffffff] px-6 py-3 rounded-xl font-bold text-xs shadow-xs transition"
            >
              Federation Portal
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

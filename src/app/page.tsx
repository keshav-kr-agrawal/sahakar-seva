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
  Lock,
  Clock,
  Star,
  Flame,
  Check
} from "lucide-react";

export default function HomePage() {
  const { selectedLocality, setSelectedLocality } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Interactive Live Wage Specimen Slider
  const [heroFareSlider, setHeroFareSlider] = useState(650);
  const heroWorkerTakeHome = Math.round(heroFareSlider * 0.82);
  const heroInsurance = Math.round(heroFareSlider * 0.05);
  const heroWelfarePool = Math.round(heroFareSlider * 0.08);
  const heroPlatform = Math.round(heroFareSlider * 0.05);
  const heroCorporateTakeHome = Math.round(heroFareSlider * 0.65);
  const extraInWorkerPocket = heroWorkerTakeHome - heroCorporateTakeHome;

  const presets = [
    { label: "Tap & Pipe Leak", amount: 350 },
    { label: "MCB & Switchboard", amount: 650 },
    { label: "Deep Kitchen Clean", amount: 1200 },
    { label: "AC Complete Service", amount: 1800 },
  ];

  const quickGigCategories = [
    { id: "cat-1", name: "Electrician", icon: <Zap className="w-6 h-6 text-[#10b981]" />, price: "₹199", arrival: "15 min", rating: "4.92" },
    { id: "cat-2", name: "Plumber", icon: <Wrench className="w-6 h-6 text-[#2563eb]" />, price: "₹199", arrival: "18 min", rating: "4.89" },
    { id: "cat-3", name: "Cleaning", icon: <Sparkles className="w-6 h-6 text-[#8b5cf6]" />, price: "₹349", arrival: "20 min", rating: "4.94" },
    { id: "cat-4", name: "Carpenter", icon: <Hammer className="w-6 h-6 text-[#f59e0b]" />, price: "₹249", arrival: "25 min", rating: "4.87" },
    { id: "cat-5", name: "AC & Tech", icon: <Cpu className="w-6 h-6 text-[#06b6d4]" />, price: "₹399", arrival: "20 min", rating: "4.91" },
    { id: "cat-6", name: "Home Cook", icon: <HomeIcon className="w-6 h-6 text-[#ea580c]" />, price: "₹299", arrival: "30 min", rating: "4.95" },
    { id: "cat-7", name: "Painter", icon: <Paintbrush className="w-6 h-6 text-[#ec4899]" />, price: "₹499", arrival: "Next Day", rating: "4.88" },
    { id: "cat-8", name: "Caregiver", icon: <HeartPulse className="w-6 h-6 text-[#ef4444]" />, price: "₹349", arrival: "Scheduled", rating: "4.97" },
  ];

  const getGuildIcon = (name: string) => {
    const iconClass = "w-5 h-5 text-[#0f172a]";
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
    <div className="space-y-16 sm:space-y-24 pb-24">
      {/* 1. HERO SECTION: Urban Company / Pronto Grade Tech Hero */}
      <section className="relative pt-6 sm:pt-10 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#f1f5f9] border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto space-y-10">
          
          {/* Institutional Credibility Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e2e8f0] pb-3">
            <div className="inline-flex items-center gap-2 bg-[#ecfdf5] border border-[#a7f3d0] px-3 py-1 rounded-full text-xs font-bold text-[#065f46]">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              <span>Ministry of Cooperation • SIH PS 26089</span>
              <span className="text-[#a7f3d0]">|</span>
              <span className="text-[#059669]">NCCT Tier-3 Tested</span>
            </div>

            <div className="hidden md:flex items-center gap-4 text-xs font-semibold text-[#64748b]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                100% Worker Owned Co-op
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
                0% Middleman Cut
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#10b981]" />
                15-Min Guaranteed Dispatch
              </span>
            </div>
          </div>

          {/* Hero Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Punchy Consumer Headline & Search Bar */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 bg-[#f1f5f9] text-[#0f172a] border border-[#e2e8f0] px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                  <Flame className="w-3.5 h-3.5 text-[#ea580c] fill-[#ea580c]" />
                  Urban Company Quality • Zero Corporate Middleman
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-[3.6rem] font-extrabold text-[#0f172a] tracking-tight leading-[1.1]">
                  Expert Home Services. <br />
                  <span className="text-[#059669]">Owned by the Workers.</span>
                </h1>

                <p className="text-base sm:text-lg text-[#475569] max-w-xl leading-relaxed font-normal">
                  Book verified local electricians, plumbers, cleaners, and carpenters in 15 minutes. <strong>82% goes directly to the worker</strong>, with zero hidden surge fees.
                </p>
              </div>

              {/* High-Converting Modern Search Console */}
              <div className="bg-[#ffffff] p-2 sm:p-2.5 rounded-2xl shadow-elevated border border-[#e2e8f0] space-y-2.5 max-w-2xl">
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <div className="flex items-center gap-2.5 flex-1 px-3.5 py-2.5 w-full bg-[#f8fafc] rounded-xl border border-[#e2e8f0]">
                    <Search className="w-4 h-4 text-[#64748b] shrink-0" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="What service do you need? (e.g. Electrician, Cook, AC Repair)..."
                      className="w-full bg-transparent text-xs sm:text-sm font-medium focus:outline-none placeholder:text-[#94a3b8] text-[#0f172a]"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-2.5 w-full sm:w-auto bg-[#f8fafc] rounded-xl border border-[#e2e8f0]">
                    <MapPin className="w-4 h-4 text-[#ea580c] shrink-0" />
                    <select
                      value={selectedLocality}
                      onChange={(e) => setSelectedLocality(e.target.value)}
                      className="bg-transparent text-xs font-bold text-[#0f172a] focus:outline-none cursor-pointer pr-1"
                    >
                      {LOCALITIES.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Link
                    href={`/services${searchQuery ? `?query=${encodeURIComponent(searchQuery)}` : ""}`}
                    className="w-full sm:w-auto bg-[#0f172a] hover:bg-[#1e293b] text-[#ffffff] px-5 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition shadow-soft shrink-0"
                  >
                    <span>Find Workers</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Popular Trending Gig Pills */}
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5 text-xs">
                  <span className="text-[11px] font-bold text-[#64748b]">Popular Now:</span>
                  {[
                    "⚡ Switchboard Spark",
                    "🔧 Pipe Leakage",
                    "❄️ AC Gas Refill",
                    "🧹 Deep Kitchen Clean",
                    "🪚 Teak Wood Polish"
                  ].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag.replace(/[^a-zA-Z ]/g, "").trim())}
                      className="bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#334155] px-2.5 py-0.5 rounded-lg text-[11px] font-semibold transition border border-[#e2e8f0]"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Instant Category Carousel Tiles (Urban Company style) */}
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 pt-2">
                {quickGigCategories.map((c) => (
                  <Link
                    key={c.id}
                    href={`/services?category=${c.id}`}
                    className="bg-[#ffffff] hover:bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#059669] p-2.5 rounded-xl flex flex-col items-center justify-center text-center space-y-1 transition shadow-xs group"
                  >
                    <div className="p-1.5 rounded-lg bg-[#f8fafc] group-hover:scale-110 transition-transform">
                      {c.icon}
                    </div>
                    <div className="text-[11px] font-bold text-[#0f172a] truncate w-full">{c.name}</div>
                    <div className="text-[10px] text-[#059669] font-bold">{c.price}+</div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: Fintech-Grade Transparent Wage Specimen (Apple Card / Stripe UI) */}
            <div className="lg:col-span-5">
              <div className="bg-[#0f172a] text-[#ffffff] rounded-3xl p-6 sm:p-7 border border-[#1e293b] shadow-elevated space-y-5">
                
                {/* Header Badge */}
                <div className="flex items-center justify-between border-b border-[#1e293b] pb-3.5">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#10b981] bg-[#064e3b] px-2.5 py-0.5 rounded-full inline-block mb-1">
                      Fintech-Grade Ledger Specimen
                    </span>
                    <h2 className="text-xl font-bold text-[#ffffff]">
                      Audit the Booking Fare
                    </h2>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-[#94a3b8] font-medium block">Total Fare</span>
                    <div className="text-2xl font-black text-[#10b981] font-mono">
                      {formatINR(heroFareSlider)}
                    </div>
                  </div>
                </div>

                {/* Interactive Slider & Presets */}
                <div className="space-y-2.5">
                  <div className="flex justify-between text-xs text-[#94a3b8] font-medium">
                    <span>Simulate service price:</span>
                    <span className="font-extrabold text-[#ffffff] font-mono">₹{heroFareSlider}</span>
                  </div>

                  <input
                    type="range"
                    min="300"
                    max="2500"
                    step="50"
                    value={heroFareSlider}
                    onChange={(e) => setHeroFareSlider(Number(e.target.value))}
                    className="w-full h-2.5 bg-[#1e293b] rounded-lg appearance-none cursor-pointer accent-[#10b981]"
                  />

                  {/* Preset Pills */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-0.5">
                    {presets.map((p) => (
                      <button
                        key={p.label}
                        onClick={() => setHeroFareSlider(p.amount)}
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition text-center cursor-pointer ${
                          heroFareSlider === p.amount
                            ? "bg-[#10b981] text-[#0f172a] border-[#10b981]"
                            : "bg-[#1e293b] text-[#cbd5e1] border-[#334155] hover:bg-[#334155]"
                        }`}
                      >
                        ₹{p.amount}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stacked Proportional Bar (82% Direct / 5% Ins / 8% Pool / 5% Platform) */}
                <div className="space-y-1 pt-1">
                  <div className="h-3 w-full rounded-full bg-[#1e293b] overflow-hidden flex p-0.5">
                    <div style={{ width: "82%" }} className="bg-[#10b981] h-full rounded-l-full" title="Worker Take-Home: 82%" />
                    <div style={{ width: "5%" }} className="bg-[#ea580c] h-full" title="Health Insurance: 5%" />
                    <div style={{ width: "8%" }} className="bg-[#f59e0b] h-full" title="Monsoon Pool: 8%" />
                    <div style={{ width: "5%" }} className="bg-[#3b82f6] h-full rounded-r-full" title="Platform Cloud Ops: 5%" />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-[#94a3b8] font-medium px-0.5">
                    <span className="text-[#10b981] font-bold">82% Worker</span>
                    <span>5% Ins.</span>
                    <span>8% Welfare</span>
                    <span>5% Server</span>
                  </div>
                </div>

                {/* 4-Part Transparent Ledger Cards */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="p-3 bg-[#020617] rounded-xl border border-[#1e293b] space-y-0.5">
                    <div className="text-[10px] font-bold text-[#10b981]">Worker Take-Home (82%)</div>
                    <div className="text-lg font-black text-[#ffffff] font-mono">{formatINR(heroWorkerTakeHome)}</div>
                    <div className="text-[9px] text-[#64748b]">Direct to bank ledger</div>
                  </div>

                  <div className="p-3 bg-[#020617] rounded-xl border border-[#1e293b] space-y-0.5">
                    <div className="text-[10px] font-bold text-[#f59e0b]">Monsoon Pool (8%)</div>
                    <div className="text-lg font-black text-[#f59e0b] font-mono">{formatINR(heroWelfarePool)}</div>
                    <div className="text-[9px] text-[#64748b]">Co-op distress reserve</div>
                  </div>

                  <div className="p-3 bg-[#020617] rounded-xl border border-[#1e293b] space-y-0.5">
                    <div className="text-[10px] font-bold text-[#ea580c]">Health Insurance (5%)</div>
                    <div className="text-lg font-black text-[#ea580c] font-mono">{formatINR(heroInsurance)}</div>
                    <div className="text-[9px] text-[#64748b]">Accident & hospital cover</div>
                  </div>

                  <div className="p-3 bg-[#020617] rounded-xl border border-[#1e293b] space-y-0.5">
                    <div className="text-[10px] font-bold text-[#38bdf8]">Platform Ops (5%)</div>
                    <div className="text-lg font-black text-[#38bdf8] font-mono">{formatINR(heroPlatform)}</div>
                    <div className="text-[9px] text-[#64748b]">Open cloud server cost</div>
                  </div>
                </div>

                {/* Callout vs Private Aggregators */}
                <div className="p-3 bg-[#1e293b] rounded-xl border border-[#334155] flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[11px] text-[#94a3b8] block">Urban Company Take-Home:</span>
                    <span className="line-through text-[#64748b] text-xs font-semibold">₹{heroCorporateTakeHome} (35% cut)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase text-[#10b981] block">Worker Benefit</span>
                    <span className="text-[#10b981] font-extrabold text-sm">
                      +₹{extraInWorkerPocket} more in pocket
                    </span>
                  </div>
                </div>

                <Link
                  href="/booking"
                  className="w-full bg-[#10b981] hover:bg-[#059669] text-[#0f172a] font-black py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-soft"
                >
                  <span>Book with Itemized Receipt</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* 4 Scale Metrics Ribbon */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {[
              { value: "₹4.82 Cr", label: "Direct Worker Payouts", sub: "82% Guaranteed Share" },
              { value: "14,250+", label: "Verified Gig Craftsmen", sub: "NCCT Tier-Tested" },
              { value: "0%", label: "Corporate Middleman Extraction", sub: "100% Co-op Owned" },
              { value: "15 min", label: "Average Arrival Time", sub: "GPS Monitored" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-[#ffffff] p-5 rounded-2xl border border-[#e2e8f0] shadow-soft space-y-1"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight font-sans">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-[#0f172a]">{stat.label}</div>
                <div className="text-[11px] text-[#64748b]">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. EXPLORE ALL 10 SERVICE CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[#e2e8f0] pb-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#059669] bg-[#ecfdf5] px-3 py-0.5 rounded-md border border-[#a7f3d0]">
              Verified Services
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
              Household Services in {selectedLocality}
            </h2>
            <p className="text-xs sm:text-sm text-[#64748b]">
              Top-rated neighborhood technicians and caregivers ready for instant dispatch.
            </p>
          </div>
          <Link
            href="/services"
            className="text-xs font-bold text-[#059669] hover:underline flex items-center gap-1.5 bg-[#f1f5f9] px-4 py-2 rounded-xl border border-[#e2e8f0]"
          >
            <span>View All Services</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredCategories.map((cat) => (
            <Link key={cat.id} href={`/services?category=${cat.id}`} className="group">
              <div className="bg-[#ffffff] p-5 rounded-2xl border border-[#e2e8f0] hover:border-[#059669] shadow-soft hover:shadow-card-hover transition-all h-full flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-11 h-11 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-center group-hover:bg-[#0f172a] group-hover:text-[#ffffff] transition-colors">
                    {getGuildIcon(cat.iconName)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0f172a] group-hover:text-[#059669] transition">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[#64748b] line-clamp-2 mt-1 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#f1f5f9] flex items-center justify-between text-xs">
                  <span className="text-[#64748b] font-semibold">{cat.itemCount} Workers</span>
                  <span className="font-extrabold text-[#059669]">₹{cat.startingPrice}+</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. CONSUMER DIFFERENTIATION MATRIX: Urban Company vs SahakarSeva */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0f172a] text-[#ffffff] rounded-3xl p-6 sm:p-10 shadow-elevated space-y-6 border border-[#1e293b]">
          
          <div className="max-w-2xl space-y-2">
            <span className="text-[11px] font-bold text-[#38bdf8] uppercase tracking-wider bg-[#1e293b] px-3 py-0.5 rounded-full border border-[#334155] inline-block">
              Why Choose SahakarSeva?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#ffffff] tracking-tight">
              Private Aggregator (Urban Company) vs. SahakarSeva Co-op
            </h2>
            <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
              Urban Company extracts up to 35% commission and deactivates workers without notice. SahakarSeva operates as an open, worker-owned cooperative where craftsmen keep 82% direct pay and deliver superior craft.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#1e293b] text-[#94a3b8] uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4 font-bold">Standard</th>
                  <th className="py-3 px-4 font-bold text-[#f87171]">Corporate App (Urban Company)</th>
                  <th className="py-3 px-4 font-bold text-[#10b981] bg-[#1e293b] rounded-t-xl">
                    SahakarSeva Co-op (PS 26089)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e293b]">
                <tr>
                  <td className="py-4 px-4 font-semibold text-[#ffffff]">Worker Direct Pay</td>
                  <td className="py-4 px-4 text-[#f87171]">65% – 75% (Opaque 25–35% Corporate Take)</td>
                  <td className="py-4 px-4 font-bold text-[#10b981] bg-[#1e293b]">
                    82% Guaranteed Direct Payout (Capped 5% Platform Fee)
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-[#ffffff]">Rate Setting</td>
                  <td className="py-4 px-4 text-[#94a3b8]">Unilateral dynamic surge pricing algorithm</td>
                  <td className="py-4 px-4 font-bold text-[#ffffff] bg-[#1e293b]">
                    Democratic Worker Collective Voting & Bargaining
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-[#ffffff]">Account Lockouts</td>
                  <td className="py-4 px-4 text-[#f87171]">Sudden automated algorithm lockout without appeal</td>
                  <td className="py-4 px-4 font-bold text-[#ffffff] bg-[#1e293b]">
                    Cooperative Peer Arbitration Panel with Worker Representation
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-[#ffffff]">Emergency Distress Safety Net</td>
                  <td className="py-4 px-4 text-[#94a3b8]">Zero institutional financial reserve for workers</td>
                  <td className="py-4 px-4 font-bold text-[#ffffff] bg-[#1e293b]">
                    8% Monsoon Distress Reserve + 5% Group Health Cover
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-[#ffffff]">Customer Receipt Transparency</td>
                  <td className="py-4 px-4 text-[#94a3b8]">Single opaque lump-sum bill with convenience fee</td>
                  <td className="py-4 px-4 font-bold text-[#10b981] bg-[#1e293b]">
                    100% Itemized Wage Transparency Ledger on every booking
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. TOP-RATED NEIGHBORHOOD CRAFTSMEN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[#e2e8f0] pb-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ea580c] bg-[#fff7ed] px-3 py-0.5 rounded-md border border-[#ffedd5]">
              Available Now in {selectedLocality}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
              Top-Rated Neighborhood Professionals
            </h2>
            <p className="text-xs sm:text-sm text-[#64748b]">
              Aadhaar-verified, police-cleared, and tested under National Council for Cooperative Training.
            </p>
          </div>
          <Link
            href="/services"
            className="text-xs font-bold text-[#059669] hover:underline flex items-center gap-1.5 bg-[#f1f5f9] px-4 py-2 rounded-xl border border-[#e2e8f0]"
          >
            <span>View All Workers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {WORKERS.slice(0, 3).map((w) => (
            <div
              key={w.id}
              className="bg-[#ffffff] rounded-2xl border border-[#e2e8f0] hover:border-[#059669] shadow-soft p-5 space-y-4 flex flex-col justify-between transition-all"
            >
              <div className="space-y-3.5">
                <div className="flex items-start gap-4">
                  <img
                    src={w.avatar}
                    alt={w.name}
                    className="w-16 h-16 rounded-xl object-cover border border-[#e2e8f0]"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-[#0f172a]">
                        {w.name}
                      </h3>
                      <span className="text-xs font-extrabold text-[#059669]">
                        ₹{w.hourlyRate}/hr
                      </span>
                    </div>
                    <div className="text-xs text-[#64748b] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#ea580c]" />
                      <span>{w.locality}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <TrustBadge type="verified" />
                      {w.isWomenSafe && <TrustBadge type="women_safe" />}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#475569] line-clamp-2 italic bg-[#f8fafc] p-3 rounded-xl border border-[#f1f5f9]">
                  "{w.bio}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#f1f5f9] flex items-center justify-between text-xs">
                <div className="text-xs font-bold text-[#f59e0b] flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-[#f59e0b]" />
                  <span>{w.rating}</span>
                  <span className="text-[#64748b] font-normal">({w.reviewCount})</span>
                </div>
                <Link
                  href={`/worker/${w.id}`}
                  className="bg-[#0f172a] hover:bg-[#1e293b] text-[#ffffff] px-4 py-2 rounded-xl font-bold text-xs transition shadow-xs"
                >
                  Book Professional
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-[#ffffff] rounded-3xl p-8 sm:p-12 shadow-elevated flex flex-col md:flex-row items-center justify-between gap-8 border border-[#334155]">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-[#1e293b] px-3 py-1 rounded-full text-xs font-bold text-[#38bdf8]">
              <Users className="w-3.5 h-3.5" />
              National Cooperative Network
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#ffffff] tracking-tight">
              Are you a gig worker or trade cooperative?
            </h2>
            <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">
              Register with SahakarSeva to establish democratic tariff bargaining, retain 82% take-home earnings, and access collective medical insurance.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/worker"
              className="bg-[#10b981] hover:bg-[#059669] text-[#0f172a] px-6 py-3.5 rounded-xl font-black text-xs shadow-soft transition"
            >
              Join Worker Hub
            </Link>
            <Link
              href="/admin"
              className="bg-[#1e293b] hover:bg-[#334155] text-[#ffffff] border border-[#475569] px-6 py-3.5 rounded-xl font-bold text-xs shadow-soft transition"
            >
              Federation Portal
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

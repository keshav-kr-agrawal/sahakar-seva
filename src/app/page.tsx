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
  ThumbsUp,
  AlertCircle,
  HelpCircle
} from "lucide-react";

export default function HomePage() {
  const { selectedLocality, setSelectedLocality } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Interactive Live Wage Specimen Slider for Hero
  const [heroFareSlider, setHeroFareSlider] = useState(650);
  const heroWorkerTakeHome = Math.round(heroFareSlider * 0.82);
  const heroInsurance = Math.round(heroFareSlider * 0.05);
  const heroWelfarePool = Math.round(heroFareSlider * 0.08);
  const heroPlatform = Math.round(heroFareSlider * 0.05);
  const heroCorporateTakeHome = Math.round(heroFareSlider * 0.65);
  const extraInWorkerPocket = heroWorkerTakeHome - heroCorporateTakeHome;

  const presets = [
    { label: "Tap & Pipe Leak", amount: 350 },
    { label: "MCB Wiring & Switch", amount: 650 },
    { label: "Deep Kitchen Clean", amount: 1200 },
    { label: "Full Teak Wood Restoration", amount: 2200 },
  ];

  const getGuildIcon = (name: string) => {
    const iconClass = "w-5 h-5 text-[#193927] dark:text-[#8caea0]";
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
    <div className="space-y-20 sm:space-y-28 pb-24">
      {/* 1. HERO SECTION: High-Craft Editorial Layout */}
      <section className="relative pt-8 sm:pt-12 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#f3efe7] via-[#f9f7f2] to-[#ffffff] dark:from-[#102217] dark:via-[#0d1712] dark:to-[#0b140f] border-b border-[#e6e2d8] dark:border-[#22392c] overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-10">
          
          {/* Institutional Trust Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e5e0d5] dark:border-[#223b2d] pb-4">
            <div className="flex items-center gap-2.5 bg-[#ffffff] dark:bg-[#13221b] border border-[#ded8cb] dark:border-[#244230] px-3.5 py-1.5 rounded-full shadow-xs max-w-full">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2d6243] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#193927]"></span>
              </span>
              <span className="text-[11px] sm:text-xs font-bold text-[#193927] dark:text-[#9bc2ad] truncate">
                Ministry of Cooperation • SIH PS 26089
              </span>
              <span className="text-[#cbbeaa] dark:text-[#335641] shrink-0">|</span>
              <span className="text-[11px] sm:text-xs text-[#a84422] font-extrabold shrink-0">NCCT Certified</span>
            </div>

            <div className="hidden md:flex items-center gap-4 text-xs font-semibold text-[#506155] dark:text-[#a3b8ac]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2d6243]" />
                100% Worker-Owned Cooperative
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2d6243]" />
                Zero Corporate Commission
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#2d6243]" />
                82% Direct Payout Ledger
              </span>
            </div>
          </div>

          {/* Hero Headlines & Interactive Specimen */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Col: Headings & Search Box */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-[#f4ece1] dark:bg-[#1d3225] text-[#742d16] dark:text-[#e4a896] border border-[#e4d4c2] dark:border-[#385642] px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-[#a84422]" />
                  A Democratic Alternative to Urban Company
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-[3.85rem] font-extrabold text-[#14221b] dark:text-[#f4f2ea] font-serif leading-[1.14] tracking-tight">
                  Household Services, <br />
                  <span className="text-[#193927] dark:text-[#8caea0] italic font-medium underline decoration-[#a84422]/40 decoration-wavy">
                    Owned by the Craftsmen.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-[#47574b] dark:text-[#b4c7bd] max-w-2xl leading-relaxed">
                  Book verified local electricians, plumbers, carpenters, and domestic caregivers organized under registered cooperative unions. Every single rupee is itemized on an open ledger: <strong className="text-[#193927] dark:text-[#dce8e1] font-bold">82% goes directly to the worker</strong>, zero black-box corporate cuts.
                </p>
              </div>

              {/* Integrated Search Console */}
              <div className="bg-[#ffffff] dark:bg-[#13221b] p-3 rounded-2xl shadow-elevated border border-[#ded8cb] dark:border-[#233b2e] space-y-3">
                <div className="flex flex-col sm:flex-row items-center gap-2.5">
                  <div className="flex items-center gap-3 flex-1 px-3.5 py-2.5 w-full bg-[#f9f7f2] dark:bg-[#182c22] rounded-xl border border-[#ede7dc] dark:border-[#2a4a38]">
                    <Search className="w-4 h-4 text-[#7c8d82] shrink-0" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="What service do you need? (e.g. Electrician, Cook, AC Service)..."
                      className="w-full bg-transparent text-xs sm:text-sm font-medium focus:outline-none placeholder:text-[#8d9b92] text-[#14221b] dark:text-[#f4f2ea]"
                    />
                  </div>

                  <div className="flex items-center gap-2 px-3 py-2.5 w-full sm:w-auto bg-[#f9f7f2] dark:bg-[#182c22] rounded-xl border border-[#ede7dc] dark:border-[#2a4a38]">
                    <MapPin className="w-4 h-4 text-[#a84422] shrink-0" />
                    <select
                      value={selectedLocality}
                      onChange={(e) => setSelectedLocality(e.target.value)}
                      className="bg-transparent text-xs font-bold text-[#193927] dark:text-[#dce8e1] focus:outline-none cursor-pointer pr-2"
                    >
                      {LOCALITIES.map((loc) => (
                        <option key={loc} value={loc} className="dark:bg-[#13221b] text-[#14221b]">
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Link
                    href={`/services${searchQuery ? `?query=${encodeURIComponent(searchQuery)}` : ""}`}
                    className="w-full sm:w-auto bg-[#193927] hover:bg-[#224c34] text-[#f9f7f2] px-6 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition shadow-soft shrink-0"
                  >
                    <span>Find Craftsmen</span>
                    <ArrowRight className="w-4 h-4 text-[#dce8e1]" />
                  </Link>
                </div>

                {/* Live Preset Search Badges */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
                  <span className="text-[11px] font-bold text-[#7c8d82] mr-1">Popular in {selectedLocality}:</span>
                  {[
                    "MCB Wiring",
                    "Bathroom Leakage",
                    "Full Day Cook",
                    "Sofa Deep Clean",
                    "Teak Wood Polish"
                  ].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="bg-[#f2ece2] hover:bg-[#e6decf] dark:bg-[#193024] dark:hover:bg-[#214030] text-[#193927] dark:text-[#dce8e1] px-2.5 py-0.5 rounded-lg text-[11px] font-semibold transition border border-[#dfd6c5] dark:border-[#2b4d3a]"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Endorsement Trust Pillars */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#e8f0ea] dark:bg-[#1c3627] flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4 text-[#193927] dark:text-[#8caea0]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#14221b] dark:text-[#edebe4]">NCCT Certified</div>
                    <div className="text-[11px] text-[#7c8d82]">3-Tier Skill Assessed</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#faeae4] dark:bg-[#341d17] flex items-center justify-center shrink-0 mt-0.5">
                    <Lock className="w-4 h-4 text-[#a84422]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#14221b] dark:text-[#edebe4]">100% Itemized</div>
                    <div className="text-[11px] text-[#7c8d82]">Zero Hidden Surge Fee</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#e8f0ea] dark:bg-[#1c3627] flex items-center justify-center shrink-0 mt-0.5">
                    <Users className="w-4 h-4 text-[#193927] dark:text-[#8caea0]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#14221b] dark:text-[#edebe4]">Worker Guilds</div>
                    <div className="text-[11px] text-[#7c8d82]">Democratic Governance</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Interactive Live Fare & Wage Specimen Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#ffffff] dark:bg-[#13221b] rounded-3xl p-6 sm:p-8 border border-[#ded8cb] dark:border-[#233b2e] shadow-elevated space-y-6">
                
                {/* Header Badge */}
                <div className="flex items-center justify-between border-b border-[#ece6d9] dark:border-[#233b2e] pb-4">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#a84422] bg-[#f9ebe4] dark:bg-[#331d16] border border-[#edd2c6] dark:border-[#522b1e] px-2.5 py-0.5 rounded-full inline-block mb-1">
                      Fintech-Grade Transparency Specimen
                    </span>
                    <h2 className="text-xl font-bold text-[#14221b] dark:text-[#edebe4] font-serif">
                      Drag to Audit the Fare
                    </h2>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-[#7c8d82] font-medium">Customer Bill</span>
                    <div className="text-2xl font-extrabold text-[#193927] dark:text-[#8caea0] font-serif">
                      {formatINR(heroFareSlider)}
                    </div>
                  </div>
                </div>

                {/* Interactive Slider & Presets */}
                <div className="space-y-3">
                  <div className="flex justify-between text-xs text-[#506155] dark:text-[#a3b8ac] font-medium">
                    <span>Simulated Service Total:</span>
                    <span className="font-extrabold text-[#193927] dark:text-[#8caea0] text-sm">₹{heroFareSlider}</span>
                  </div>

                  <input
                    type="range"
                    min="300"
                    max="2500"
                    step="50"
                    value={heroFareSlider}
                    onChange={(e) => setHeroFareSlider(Number(e.target.value))}
                    className="w-full h-3 bg-[#ede7dc] dark:bg-[#1c3025] rounded-lg appearance-none cursor-pointer accent-[#193927]"
                  />

                  {/* Preset Quick Click Pills */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1">
                    {presets.map((p) => (
                      <button
                        key={p.label}
                        onClick={() => setHeroFareSlider(p.amount)}
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition text-center ${
                          heroFareSlider === p.amount
                            ? "bg-[#193927] text-[#ffffff] border-[#193927]"
                            : "bg-[#f9f7f2] dark:bg-[#182c22] text-[#506155] dark:text-[#a3b8ac] border-[#ded8cb] dark:border-[#264432] hover:bg-[#ede7dc]"
                        }`}
                      >
                        ₹{p.amount}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stacked Proportional Progress Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="h-4 w-full rounded-full bg-[#ede7dc] dark:bg-[#1c3025] overflow-hidden flex p-0.5">
                    <div style={{ width: "82%" }} className="bg-[#193927] h-full rounded-l-full" title="Worker Share 82%" />
                    <div style={{ width: "5%" }} className="bg-[#a84422] h-full" title="Group Health Insurance 5%" />
                    <div style={{ width: "8%" }} className="bg-[#9e6d1c] h-full" title="Cooperative Welfare Fund 8%" />
                    <div style={{ width: "5%" }} className="bg-[#426752] h-full rounded-r-full" title="Open Platform Ops 5%" />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-[#7c8d82] font-medium px-1">
                    <span className="font-bold text-[#193927] dark:text-[#8caea0]">82% Direct Payout</span>
                    <span>5% Ins.</span>
                    <span>8% Welfare</span>
                    <span>5% Server</span>
                  </div>
                </div>

                {/* 4-Part Transparent Ledger Breakdown Tiles */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <div className="p-3 bg-[#edf5f0] dark:bg-[#152a1e] rounded-xl border border-[#c1d9cb] dark:border-[#2a4e39] space-y-0.5">
                    <div className="text-[10px] font-bold text-[#193927] dark:text-[#a3c9b4]">Worker Take-Home (82%)</div>
                    <div className="text-lg font-extrabold text-[#193927] dark:text-[#edebe4]">{formatINR(heroWorkerTakeHome)}</div>
                    <div className="text-[9px] text-[#506155] dark:text-[#8caea0]">Straight to cooperative bank</div>
                  </div>

                  <div className="p-3 bg-[#fdf6ec] dark:bg-[#2d2214] rounded-xl border border-[#ebd8bc] dark:border-[#523d24] space-y-0.5">
                    <div className="text-[10px] font-bold text-[#855b16] dark:text-[#dec08a]">Welfare Pool (8%)</div>
                    <div className="text-lg font-extrabold text-[#855b16] dark:text-[#dec08a]">{formatINR(heroWelfarePool)}</div>
                    <div className="text-[9px] text-[#7c8d82]">Monsoon & tool buffer</div>
                  </div>

                  <div className="p-3 bg-[#fbf0ed] dark:bg-[#2b1717] rounded-xl border border-[#f2d0c6] dark:border-[#4d2828] space-y-0.5">
                    <div className="text-[10px] font-bold text-[#8c381c] dark:text-[#e4a8a8]">Health Insurance (5%)</div>
                    <div className="text-lg font-extrabold text-[#8c381c] dark:text-[#e4a8a8]">{formatINR(heroInsurance)}</div>
                    <div className="text-[9px] text-[#7c8d82]">Hospitalization & accident</div>
                  </div>

                  <div className="p-3 bg-[#f4f0e8] dark:bg-[#1c3025] rounded-xl border border-[#ded8cb] dark:border-[#2a4a38] space-y-0.5">
                    <div className="text-[10px] font-bold text-[#506155] dark:text-[#a3b8ac]">Platform Infra (5%)</div>
                    <div className="text-lg font-extrabold text-[#14221b] dark:text-[#edebe4]">{formatINR(heroPlatform)}</div>
                    <div className="text-[9px] text-[#7c8d82]">Open-source cloud server</div>
                  </div>
                </div>

                {/* High-Impact Comparison vs Corporate Aggregators */}
                <div className="p-3.5 bg-[#f4ece1] dark:bg-[#1e2f24] rounded-xl border border-[#e1d2be] dark:border-[#2a4a38] flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[11px] text-[#506155] dark:text-[#a3b8ac] block">Urban Company Take-Home:</span>
                    <span className="line-through text-[#7c8d82] text-xs font-semibold">₹{heroCorporateTakeHome} (35% cut)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase text-[#a84422] block">Worker Benefit</span>
                    <span className="text-[#a84422] font-extrabold text-sm">
                      +₹{extraInWorkerPocket} more in pocket
                    </span>
                  </div>
                </div>

                <Link
                  href="/booking"
                  className="w-full bg-[#193927] hover:bg-[#224c34] text-[#ffffff] py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition shadow-soft"
                >
                  <span>Book with 100% Itemized Receipt</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* 4 Trust & Scale Metrics Ribbon */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
            {[
              { value: "₹4.82 Cr", label: "Direct Worker Payouts", sub: "82% Guaranteed Take-Home" },
              { value: "14,250+", label: "Verified Guild Craftsmen", sub: "NCCT 3-Tier Tested" },
              { value: "0%", label: "Corporate Middleman Extraction", sub: "100% Cooperative Owned" },
              { value: "98.7%", label: "On-Time Arrival Rate", sub: "Neighborhood RWA Audited" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-[#ffffff] dark:bg-[#13221b] p-5 rounded-2xl border border-[#ded8cb] dark:border-[#233b2e] shadow-soft space-y-1"
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
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[#e2ded4] dark:border-[#233b2e] pb-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#a84422] bg-[#f9ebe4] dark:bg-[#331d16] px-3 py-1 rounded-md border border-[#edd2c6] dark:border-[#522b1e]">
              <HardHat className="w-3.5 h-3.5 text-[#a84422]" />
              Cooperative Guild Services
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14221b] dark:text-[#edebe4] font-serif">
              Explore Household Services by Worker Guild
            </h2>
            <p className="text-xs sm:text-sm text-[#506155] dark:text-[#a3b8ac]">
              Craftsmen in your neighborhood organized into professional, self-governed cooperatives.
            </p>
          </div>
          <Link
            href="/services"
            className="text-xs font-bold text-[#193927] dark:text-[#8caea0] hover:underline flex items-center gap-1.5 bg-[#f4ece1] dark:bg-[#1c3025] px-4 py-2 rounded-xl border border-[#ded8cb] dark:border-[#2c4a38]"
          >
            <span>View All Guild Listings</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredCategories.map((cat) => (
            <Link key={cat.id} href={`/services?category=${cat.id}`} className="group">
              <div className="bg-[#ffffff] dark:bg-[#13221b] p-5 rounded-2xl border border-[#ded8cb] dark:border-[#233b2e] hover:border-[#193927] dark:hover:border-[#8caea0] shadow-soft hover:shadow-elevated transition-all h-full flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-11 h-11 rounded-xl bg-[#edf5f0] dark:bg-[#193225] border border-[#cbe1d3] dark:border-[#244230] flex items-center justify-center group-hover:bg-[#193927] transition-colors">
                    {getGuildIcon(cat.iconName)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#14221b] dark:text-[#edebe4] group-hover:text-[#193927] dark:group-hover:text-[#8caea0] transition">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[#7c8d82] line-clamp-2 mt-1 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#ede7dc] dark:border-[#233b2e] flex items-center justify-between text-xs">
                  <span className="text-[#506155] dark:text-[#a3b8ac] font-semibold">{cat.itemCount} Craftsmen</span>
                  <span className="font-extrabold text-[#193927] dark:text-[#8caea0]">₹{cat.startingPrice}+</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. EDITORIAL COMPARATIVE MATRIX: Urban Company vs SahakarSeva */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#11261a] text-[#edebe4] rounded-3xl p-6 sm:p-12 shadow-elevated space-y-8 border border-[#244230] relative overflow-hidden">
          
          <div className="max-w-3xl space-y-3">
            <span className="text-[11px] font-bold text-[#dce8e1] uppercase tracking-wider bg-[#1d3c2a] px-3.5 py-1 rounded-full border border-[#2d6243] inline-block">
              Institutional Governance Matrix
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-[#f9f7f2]">
              Private Aggregator vs. SahakarSeva Cooperative
            </h2>
            <p className="text-xs sm:text-sm text-[#8caea0] leading-relaxed">
              Private gig platforms use dynamic surge fees and unilateral account deactivations to maximize corporate investor margins. SahakarSeva replaces predatory algorithmic extraction with transparent, democratic worker governance.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#244230] text-[#a3b8ac] uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4 font-bold">Standard of Governance</th>
                  <th className="py-3 px-4 font-bold text-[#de8a70]">Corporate Gig App (Urban Company)</th>
                  <th className="py-3 px-4 font-bold text-[#dce8e1] bg-[#163022] rounded-t-xl">
                    SahakarSeva Cooperative (PS 26089)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1c3627]">
                <tr>
                  <td className="py-4 px-4 font-semibold text-[#f9f7f2]">Worker Take-Home Share</td>
                  <td className="py-4 px-4 text-[#de8a70]">65% – 75% (Opaque 25–35% Corporate Take)</td>
                  <td className="py-4 px-4 font-bold text-[#f9f7f2] bg-[#163022]">
                    82% Guaranteed Direct Take-Home (Capped 5% Platform Fee)
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-[#f9f7f2]">Tariff & Floor Rate Setting</td>
                  <td className="py-4 px-4 text-[#8caea0]">Unilateral algorithmic dynamic surge pricing</td>
                  <td className="py-4 px-4 font-bold text-[#f9f7f2] bg-[#163022]">
                    Democratic Worker Collective Voting & Bargaining
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-[#f9f7f2]">Account Deactivations</td>
                  <td className="py-4 px-4 text-[#de8a70]">Instant automated algorithmic lockout without hearing</td>
                  <td className="py-4 px-4 font-bold text-[#f9f7f2] bg-[#163022]">
                    Cooperative Arbitration Panel with Peer Worker Representation
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-[#f9f7f2]">Distress & Crisis Safety Net</td>
                  <td className="py-4 px-4 text-[#8caea0]">Zero institutional financial reserve for workers</td>
                  <td className="py-4 px-4 font-bold text-[#f9f7f2] bg-[#163022]">
                    8% Monsoon Distress Reserve + 5% Group Health Insurance
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-[#f9f7f2]">Customer Fee Transparency</td>
                  <td className="py-4 px-4 text-[#8caea0]">Single opaque lump-sum bill with convenience fee</td>
                  <td className="py-4 px-4 font-bold text-[#f9f7f2] bg-[#163022]">
                    100% Itemized Wage Transparency Ledger on every booking
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
          <span className="text-xs font-bold uppercase tracking-wider text-[#193927] dark:text-[#8caea0] bg-[#edf5f0] dark:bg-[#193225] px-3 py-1 rounded-full border border-[#cbe1d3] dark:border-[#244230]">
            Transparent Protocol
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
              title: "Discover Local Guild Craftsmen",
              desc: "Select verified electricians, plumbers, and cooks filtered by NCCT skill test tiers, RWA references, and proximity.",
              badge: "NCCT Tier-Tested",
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
              badge: "Daylight Routing",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-[#ffffff] dark:bg-[#13221b] p-7 rounded-3xl border border-[#ded8cb] dark:border-[#233b2e] shadow-soft space-y-4 relative"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl font-extrabold font-serif text-[#193927]/20 dark:text-[#8caea0]/20">
                  {item.step}
                </span>
                <span className="text-[10px] font-bold text-[#193927] dark:text-[#8caea0] bg-[#edf5f0] dark:bg-[#193225] px-2.5 py-0.5 rounded-full border border-[#cbe1d3] dark:border-[#244230]">
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
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[#e2ded4] dark:border-[#233b2e] pb-5">
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#855b16] dark:text-[#dec08a] bg-[#fdf6ec] dark:bg-[#2d2214] px-3 py-1 rounded-md border border-[#ebd8bc] dark:border-[#523d24]">
              Verified Cooperative Guild Members
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14221b] dark:text-[#edebe4] font-serif">
              Highest-Rated Neighborhood Craftsmen
            </h2>
            <p className="text-xs sm:text-sm text-[#506155] dark:text-[#a3b8ac]">
              Aadhaar-verified, police-cleared, and tested by National Council for Cooperative Training.
            </p>
          </div>
          <Link
            href="/services"
            className="text-xs font-bold text-[#193927] dark:text-[#8caea0] hover:underline flex items-center gap-1.5 bg-[#f4ece1] dark:bg-[#1c3025] px-4 py-2 rounded-xl border border-[#ded8cb] dark:border-[#2c4a38]"
          >
            <span>View All Guild Members</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {WORKERS.slice(0, 3).map((w) => (
            <div
              key={w.id}
              className="bg-[#ffffff] dark:bg-[#13221b] rounded-3xl border border-[#ded8cb] dark:border-[#233b2e] shadow-soft p-6 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                <div className="flex items-start gap-4">
                  <img
                    src={w.avatar}
                    alt={w.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-[#193927]"
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

                <p className="text-xs text-[#506155] dark:text-[#a3b8ac] line-clamp-2 italic bg-[#f9f7f2] dark:bg-[#182c22] p-3 rounded-xl border border-[#ede7dc] dark:border-[#244230]">
                  "{w.bio}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#ede7dc] dark:border-[#233b2e] flex items-center justify-between text-xs">
                <div className="text-xs font-semibold text-[#855b16] dark:text-[#dec08a]">
                  ★ {w.rating} ({w.reviewCount} reviews)
                </div>
                <Link
                  href={`/worker/${w.id}`}
                  className="bg-[#193927] hover:bg-[#224c34] text-[#f9f7f2] px-4 py-2 rounded-xl font-bold text-xs transition shadow-xs"
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
            <div className="inline-flex items-center gap-2 bg-[#244f36] px-3 py-1 rounded-full text-xs font-bold text-[#a3c9b4]">
              <Users className="w-3.5 h-3.5" />
              National Cooperative Network
            </div>
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
              className="bg-[#ffffff] text-[#193927] hover:bg-[#f0f5f2] px-6 py-3.5 rounded-xl font-bold text-xs shadow-soft transition"
            >
              Join Worker Hub
            </Link>
            <Link
              href="/admin"
              className="bg-[#a84422] hover:bg-[#8c381c] text-[#ffffff] px-6 py-3.5 rounded-xl font-bold text-xs shadow-soft transition"
            >
              Federation Portal
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

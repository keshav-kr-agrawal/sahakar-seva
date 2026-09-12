"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import {
  SERVICE_CATEGORIES,
  LOCALITIES,
  INSTAHELP_BLOCKS,
  MULTI_SKILL_CREWS,
  OUTCOME_PACKS,
  ACTIVE_PARAMETRIC_ALERT,
  SAMPLE_XAI_EXPLANATION,
  SAMPLE_WORKER_PASSPORT,
  WORKERS,
} from "@/lib/mockData";
import { formatINR } from "@/lib/utils";
import InstahelpBlockCard from "@/components/snabbit/InstahelpBlockCard";
import CrewCard from "@/components/snabbit/CrewCard";
import PackStudioModal from "@/components/snabbit/PackStudioModal";
import XAIExplanationDrawer from "@/components/snabbit/XAIExplanationDrawer";
import WorkerPassportModal from "@/components/snabbit/WorkerPassportModal";
import FloatingDispatchCart from "@/components/snabbit/FloatingDispatchCart";
import InteractiveMap from "@/components/ui/InteractiveMap";
import {
  Search,
  MapPin,
  Clock,
  Mic,
  ArrowRight,
  Plus,
  Scale,
  ShieldCheck,
  Check,
  Sliders,
  Umbrella,
  Zap,
  Star,
  Users,
  Award,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  TrendingUp,
  HeartHandshake,
  Lock,
} from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  const {
    selectedLocality,
    setSelectedLocality,
    addToCart,
    setActivePackStudio,
    setActiveXAIModal,
    setActivePassportModal,
    setIsCartDrawerOpen,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<"instahelp" | "crews" | "packs" | "tasks">("instahelp");
  const [searchQuery, setSearchQuery] = useState("");
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [voiceLang, setVoiceLang] = useState<"hi" | "kn" | "ta" | "en">("hi");

  const voicePrompts: Record<string, { query: string; actionItem: any }> = {
    hi: {
      query: "Mujhe 2 ghante ke liye handyman chahiye",
      actionItem: {
        id: "block-2hr",
        title: "2-Hour Handyman",
        price: 299,
        category: "Instahelp Block",
        etaMinutes: 15,
        unitType: "instahelp" as const,
        workerPayout: 255,
      },
    },
    kn: {
      query: "Nannage eradu ghante electrician beku",
      actionItem: {
        id: "block-2hr",
        title: "2-Hour Handyman",
        price: 299,
        category: "Instahelp Block",
        etaMinutes: 15,
        unitType: "instahelp" as const,
        workerPayout: 255,
      },
    },
    ta: {
      query: "Enakku oru mani neram plumber thevai",
      actionItem: {
        id: "block-1hr",
        title: "1-Hour Quick Fix",
        price: 179,
        category: "Instahelp Block",
        etaMinutes: 12,
        unitType: "instahelp" as const,
        workerPayout: 150,
      },
    },
    en: {
      query: "Need an electrician for quick repair in 15 mins",
      actionItem: {
        id: "block-1hr",
        title: "1-Hour Quick Fix",
        price: 179,
        category: "Instahelp Block",
        etaMinutes: 12,
        unitType: "instahelp" as const,
        workerPayout: 150,
      },
    },
  };

  const handleVoiceTrigger = () => {
    setIsVoiceListening(true);
    setTimeout(() => {
      const p = voicePrompts[voiceLang];
      setSearchQuery(p.query);
      setIsVoiceListening(false);
      showToast("BHASHINI Voice AI", `Recognized query: "${p.query}"`);
    }, 800);
  };

  const quickSearchTags = [
    { label: "Switchboard Spark", query: "Switchboard" },
    { label: "Tap Washer Leak", query: "Plumbing" },
    { label: "2-Hr Cleaning", query: "Cleaning" },
    { label: "AC Servicing", query: "AC" },
    { label: "Elder Assistance", query: "Elder" },
  ];

  const filteredCategories = SERVICE_CATEGORIES.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-slate-900">
      
      {/* 1. DISRUPTION & COOPERATIVE TRUST STATUS STRIP */}
      <div className="bg-slate-50 border-b border-slate-100 py-2.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-700 font-medium">
            <Umbrella className="w-3.5 h-3.5 text-slate-900 shrink-0" />
            <span>
              <strong>Parametric Weather Protection Active:</strong> {ACTIVE_PARAMETRIC_ALERT.autoPayoutAmountINR} UPI auto-payout released to {ACTIVE_PARAMETRIC_ALERT.beneficiariesCount} local craftsmen during heavy rainfall.
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-500 font-medium">
            <span>Guaranteed Floor: <strong className="text-slate-900 font-bold">₹10,000/mo MEG</strong></span>
            <span>•</span>
            <span>Avg Dispatch: <strong className="text-slate-900 font-mono font-bold">12 mins</strong></span>
          </div>
        </div>
      </div>

      {/* 2. PRONTO HERO BANNER: PHOTO-RICH, AIRY & CONFIDENT */}
      <section className="pt-10 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Headline & Single Pronto Command Search Bar */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-800 bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>⚡ 15-Minute Guaranteed Arrival in {selectedLocality}</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.08]">
                Home repairs & help <br />
                <span className="text-slate-900">in 15 minutes.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
                India&apos;s first worker-owned cooperative network. Verified electricians, plumbers, carpenters, and cleaning crews with 83%+ direct worker payout.
              </p>
            </div>

            {/* Single Powerful Command Search Bar */}
            <div className="space-y-3 max-w-xl">
              <div className="flex items-center gap-2 p-2 bg-white rounded-2xl border-2 border-slate-200 focus-within:border-slate-900 transition-all shadow-soft">
                <div className="flex items-center gap-2.5 flex-1 px-2">
                  <Search className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      isVoiceListening
                        ? `Listening in ${voiceLang.toUpperCase()}...`
                        : "Search repairs, cleaning, or speak..."
                    }
                    className="w-full text-xs sm:text-sm font-semibold focus:outline-none placeholder:text-slate-400 text-slate-900 bg-transparent py-1.5"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-xs text-slate-400 hover:text-slate-600 px-1"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Integrated BHASHINI Language Switcher & Mic */}
                <div className="flex items-center gap-1.5 shrink-0 border-l border-slate-200 pl-2">
                  <div className="hidden sm:flex items-center bg-slate-100 rounded-lg p-0.5 text-[11px] font-bold text-slate-600">
                    {(["hi", "kn", "ta", "en"] as const).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setVoiceLang(lang)}
                        className={`px-1.5 py-0.5 rounded cursor-pointer transition ${
                          voiceLang === lang ? "bg-white text-slate-900 font-extrabold shadow-2xs" : "hover:text-slate-900"
                        }`}
                      >
                        {lang === "hi" ? "हि" : lang === "kn" ? "ಕ" : lang === "ta" ? "த" : "EN"}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleVoiceTrigger}
                    className={`p-2 rounded-xl transition cursor-pointer flex items-center justify-center ${
                      isVoiceListening ? "bg-slate-900 text-white animate-pulse" : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                    }`}
                    title="Speak in your language"
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Quick Search Tag Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Popular:</span>
                {quickSearchTags.map((tag) => (
                  <button
                    key={tag.label}
                    onClick={() => setSearchQuery(tag.query)}
                    className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                  >
                    {tag.label}
                  </button>
                ))}
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-5 text-xs text-slate-600 font-medium pt-2">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-slate-900" />
                  0% Platform Cut
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-slate-900" />
                  100% Itemized Wages
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-slate-900" />
                  Aadhaar & e-Shram Verified
                </span>
              </div>
            </div>
          </div>

          {/* Right: Pronto Bento Card with Real-time Status */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-elevated border border-slate-800 space-y-6 relative overflow-hidden">
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Live Co-op Network
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400 font-semibold">
                  Bengaluru Central
                </span>
              </div>

              <div className="relative z-10 space-y-4">
                <div>
                  <div className="text-3xl font-black text-white font-mono tracking-tight">
                    428 Verified Pros
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    On active duty across Koramangala, Indiranagar, and HSR Layout.
                  </p>
                </div>

                {/* Specimen Live Pro Dispatch Card */}
                <div className="bg-slate-800/90 rounded-2xl p-3.5 border border-slate-700/80 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-700 shrink-0">
                    <img
                      src={WORKERS[0].avatar}
                      alt={WORKERS[0].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black text-white truncate">{WORKERS[0].name}</h4>
                      <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-emerald-400" /> 4.94
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-300 truncate">
                      {WORKERS[0].category} • 9 yrs exp
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1 font-mono">
                      <span>⚡ 12m away</span>
                      <span>•</span>
                      <span className="text-emerald-300 font-bold">e-Shram Verified</span>
                    </div>
                  </div>
                </div>

                {/* 3 Metric Pills */}
                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/50">
                    <div className="text-sm font-black text-white font-mono">12 mins</div>
                    <div className="text-[10px] text-slate-400 font-medium mt-0.5">Avg Arrival</div>
                  </div>
                  <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/50">
                    <div className="text-sm font-black text-emerald-400 font-mono">83%+</div>
                    <div className="text-[10px] text-slate-400 font-medium mt-0.5">Direct Wages</div>
                  </div>
                  <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/50">
                    <div className="text-sm font-black text-white font-mono">₹10,000</div>
                    <div className="text-[10px] text-slate-400 font-medium mt-0.5">MEG Floor</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ALL 10 COOPERATIVE SERVICES: TACTILE PHOTO CARDS */}
      <section className="py-10 px-4 sm:px-6 max-w-7xl mx-auto border-t border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Certified Craft Guilds
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              All 10 Cooperative Services
            </h2>
          </div>
          <Link
            href="/services"
            className="text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center gap-1 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition"
          >
            <span>Explore full catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/services?category=${cat.id}`}
              className="bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-2xl p-3 flex flex-col justify-between transition-all shadow-2xs hover:shadow-soft group"
            >
              <div className="w-full h-28 rounded-xl overflow-hidden bg-slate-100 mb-3 border border-slate-100 relative">
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                  ⚡ 15m
                </span>
              </div>
              <div>
                <h3 className="text-xs font-extrabold text-slate-900 truncate group-hover:text-slate-700">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{cat.description}</p>
              </div>
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-slate-900">from ₹{cat.startingPrice}</span>
                <span className="text-[11px] font-bold text-slate-600 group-hover:text-slate-900 flex items-center">
                  Book →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. FLEXIBLE SERVICE UNITS (ABC.MD INNOVATION 1) */}
      <section id="instahelp" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto border-t border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Flexible Service Units (Innovation 1)
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Book by time, crew, or outcome
            </h2>
          </div>

          {/* Clean Segmented Control */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold self-start sm:self-auto">
            {[
              { id: "instahelp", label: "⚡ Hourly Blocks" },
              { id: "crews", label: "👥 Multi-Skill Crews" },
              { id: "packs", label: "📦 Outcome Packs" },
              { id: "tasks", label: "🛠️ Single Tasks" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-lg transition cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-white text-slate-900 shadow-2xs font-black"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Hourly Time Blocks (Instahelp) */}
        {activeTab === "instahelp" && (
          <div className="space-y-4">
            <p className="text-xs text-slate-500">
              Dedicated time blocks for any pending household punchlist. Fixed rate, zero haggling, and guaranteed minimum wage floor.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {INSTAHELP_BLOCKS.map((block) => (
                <InstahelpBlockCard key={block.id} block={block} />
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Multi-Skill Crews */}
        {activeTab === "crews" && (
          <div id="crews" className="space-y-4">
            <p className="text-xs text-slate-500">
              Cooperative squads formed based on skill complementarity. Team lead oversight with 100% itemized, visible member payout splits.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {MULTI_SKILL_CREWS.map((crew) => (
                <CrewCard key={crew.id} crew={crew} />
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Outcome Packs */}
        {activeTab === "packs" && (
          <div className="space-y-4">
            <p className="text-xs text-slate-500">
              Complete results delivered as a package. Click &quot;Pack Studio&quot; to customize tasks and review live wage breakdowns.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {OUTCOME_PACKS.map((pack) => (
                <div
                  key={pack.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between overflow-hidden"
                >
                  {pack.imageUrl && (
                    <div className="h-40 w-full overflow-hidden bg-slate-100 relative">
                      <img
                        src={pack.imageUrl}
                        alt={pack.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-slate-900 font-extrabold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md shadow-2xs">
                        {pack.badge}
                      </div>
                      <div className="absolute top-3 right-3 bg-slate-900/90 text-white font-mono font-bold text-[11px] px-2 py-0.5 rounded-md">
                        ~{pack.estimatedHours} hrs
                      </div>
                    </div>
                  )}

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 mb-1">{pack.title}</h3>
                      <p className="text-xs text-slate-600 mb-3 leading-relaxed">{pack.outcomeHeadline}</p>

                      <div className="space-y-1.5 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                          Inclusions ({pack.tasks.length} items):
                        </div>
                        {pack.tasks.slice(0, 3).map((t) => (
                          <div key={t.id} className="flex items-start gap-1.5 text-slate-700">
                            <Check className="w-3 h-3 text-slate-600 shrink-0 mt-0.5" />
                            <span className="leading-tight text-[11px]">{t.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-medium block">Starting from</span>
                        <div className="text-lg font-black text-slate-900 font-mono">
                          {formatINR(pack.basePriceINR)}
                        </div>
                      </div>

                      <button
                        onClick={() => setActivePackStudio(pack)}
                        className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs px-4 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <Sliders className="w-3.5 h-3.5" />
                        <span>Pack Studio</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Single Tasks */}
        {activeTab === "tasks" && (
          <div className="space-y-4">
            <p className="text-xs text-slate-500">
              Single-problem diagnosis and repair. Book certified neighborhood craftsmen in 15 minutes.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {filteredCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-slate-400 transition shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 mb-2 border border-slate-200">
                      <img src={cat.imageUrl} alt={cat.name} className="w-full h-full object-cover" />
                    </div>
                    <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">{cat.name}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{cat.description}</p>
                    <div className="flex items-center gap-1 text-[10px] text-slate-600 font-semibold mt-2">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>15-min arrival</span>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-900 text-xs sm:text-sm">₹{cat.startingPrice}+</span>
                    <button
                      onClick={() =>
                        addToCart({
                          id: cat.id,
                          title: cat.name,
                          price: cat.startingPrice,
                          category: "Single Craft",
                          etaMinutes: 15,
                          unitType: "task",
                          workerPayout: Math.round(cat.startingPrice * 0.82),
                        })
                      }
                      className="p-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition cursor-pointer"
                      title="Add task"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 5. COOPERATIVE DIFFERENCE: WHY SAHAKAR SEVA? */}
      <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto border-t border-slate-100">
        <div className="mb-8">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            The Cooperative Advantage
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Why SahakarSeva vs Private Gig Apps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Private App Card */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wider bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                Traditional Private Platforms
              </span>
              <span className="text-xs text-slate-400 font-mono">25-30% Commission</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✕</span>
                <span>Opaque algorithm blacklists workers without human arbitration</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✕</span>
                <span>No minimum wage guarantee during off-peak or bad weather days</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✕</span>
                <span>Zero social security, pension, or parametric climate insurance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✕</span>
                <span>Customers pay inflated commissions with hidden surge charges</span>
              </li>
            </ul>
          </div>

          {/* SahakarSeva Cooperative Card */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800">
                SahakarSeva Cooperative
              </span>
              <span className="text-xs text-emerald-300 font-mono font-bold">83%+ Direct to Worker</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Democratic worker arbitration panel & Explainable AI (SHAP / LIME)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>₹10,000/mo Minimum Earnings Guarantee (MEG) floor protection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Parametric rain insurance with instant UPI payout during disruptions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>100% itemized wage ledger so customers see exact craftsman payout</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. TRANSPARENCY & SOVEREIGN TRUST (ABC.MD INNOVATIONS 2 & 3) */}
      <section id="trust" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto border-t border-slate-100">
        <div className="mb-6">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Algorithmic Fairness & Sovereign Trust (Innovations 2 & 3)
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Accountability in every 15-minute dispatch
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Explainable AI (XAI) Specimen Card */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-800">
                    <Scale className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">Explainable AI (XAI) Matching</h3>
                    <p className="text-[11px] text-slate-500">Transparent algorithmic dispatch (SHAP & LIME)</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-slate-200 text-slate-800 px-2 py-0.5 rounded">
                  Fair Matching
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Every worker match reveals its mathematical factors: skill certification (+0.32), proximity (+0.15), and weekly workload fairness (+0.12) to prevent burnout and algorithmic bias.
              </p>

              <div className="bg-white rounded-xl p-3 border border-slate-200 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Matched Pro:</span>
                  <span className="font-bold text-slate-900">{SAMPLE_XAI_EXPLANATION.workerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Affinity Score:</span>
                  <span className="font-mono font-bold text-slate-900">94%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Fairness Gini:</span>
                  <span className="font-mono text-slate-700">0.24 (Equitable workload)</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveXAIModal(true)}
              className="w-full bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs py-2.5 rounded-xl border border-slate-200 transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Inspect Live SHAP Match Factors</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Cooperative Worker Passport Card */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-800">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">Cooperative Worker Passport</h3>
                    <p className="text-[11px] text-slate-500">Portable sovereign credential (e-Shram & Aadhaar)</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-slate-200 text-slate-800 px-2 py-0.5 rounded">
                  Sovereign Identity
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Portable, sovereign credential owned by the worker. Powered by on-device federated learning and Graph Neural Network trust propagation across 38 peer attestations.
              </p>

              <div className="bg-white rounded-xl p-3 border border-slate-200 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">National UAN:</span>
                  <span className="font-mono font-bold text-slate-900">{SAMPLE_WORKER_PASSPORT.uanNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">GNN Trust Score:</span>
                  <span className="font-mono font-bold text-slate-900">{SAMPLE_WORKER_PASSPORT.gnnTrustScore}/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Women-Safety Rating:</span>
                  <span className="font-mono font-bold text-slate-900">{SAMPLE_WORKER_PASSPORT.separateWomenSafetyRating} ★ (Zero incidents)</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActivePassportModal(true)}
              className="w-full bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs py-2.5 rounded-xl border border-slate-200 transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>View Sovereign Credential Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. LIVE BENGALURU WARD COVERAGE MAP */}
      <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto border-t border-slate-100">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Live Neighborhood Coverage
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Active Cooperative Dispatch Clusters
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Active in 8 wards across Bengaluru with ~12m response time.
          </span>
        </div>

        <div className="bg-slate-50 rounded-3xl p-4 sm:p-6 border border-slate-200">
          <InteractiveMap className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden shadow-inner" />
        </div>
      </section>

      {/* 8. MODALS & FLOATING DISPATCH CART */}
      <PackStudioModal />
      <XAIExplanationDrawer />
      <WorkerPassportModal />
      <FloatingDispatchCart />
    </div>
  );
}

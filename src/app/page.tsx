"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import {
  SERVICE_CATEGORIES,
  LOCALITIES,
  WORKERS,
  INSTAHELP_BLOCKS,
  MULTI_SKILL_CREWS,
  OUTCOME_PACKS,
  ACTIVE_PARAMETRIC_ALERT,
  SAMPLE_XAI_EXPLANATION,
  SAMPLE_WORKER_PASSPORT,
} from "@/lib/mockData";
import { formatINR } from "@/lib/utils";
import InstahelpBlockCard from "@/components/snabbit/InstahelpBlockCard";
import CrewCard from "@/components/snabbit/CrewCard";
import PackStudioModal from "@/components/snabbit/PackStudioModal";
import XAIExplanationDrawer from "@/components/snabbit/XAIExplanationDrawer";
import WorkerPassportModal from "@/components/snabbit/WorkerPassportModal";
import BhashiniVoiceBar from "@/components/snabbit/BhashiniVoiceBar";
import FloatingDispatchCart from "@/components/snabbit/FloatingDispatchCart";
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
  Clock,
  Star,
  Flame,
  Check,
  Layers,
  Users,
  Sliders,
  Award,
  Umbrella,
  QrCode,
  Network,
  Plus,
  Scale,
  Activity,
} from "lucide-react";

export default function HomePage() {
  const {
    selectedLocality,
    setSelectedLocality,
    addToCart,
    setActivePackStudio,
    setActiveXAIModal,
    setActivePassportModal,
  } = useApp();

  const [activeTab, setActiveTab] = useState<"instahelp" | "crews" | "packs" | "tasks">("instahelp");
  const [taskSearch, setTaskSearch] = useState("");

  const filteredCategories = SERVICE_CATEGORIES.filter((c) =>
    c.name.toLowerCase().includes(taskSearch.toLowerCase()) ||
    c.description.toLowerCase().includes(taskSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-32">
      {/* 1. SNABBIT / PRONTO FAST DISPATCH TOP HEADER */}
      <section className="bg-slate-900 text-white pt-5 pb-8 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto space-y-4">
          
          {/* Top Bar: Live ETA & Location Pill */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>⚡ Instant Help in 10-15 Mins</span>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-xs text-slate-400">
                <span>Indiranagar Cluster 4</span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold">428 Pros Online</span>
              </div>
            </div>

            {/* Ward Locality Pill */}
            <div className="flex items-center gap-1.5 bg-slate-800/90 border border-slate-700 px-3 py-1 rounded-full text-xs font-bold text-slate-200">
              <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              <span>{selectedLocality}</span>
            </div>
          </div>

          {/* Snabbit / Pronto Headline */}
          <div className="space-y-1 pt-1">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Instant Home Help. <span className="text-emerald-400">Worker-Owned Co-op.</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              Book hourly handyman blocks, multi-skill crews, or instant repairs. <strong>83%+ goes directly to craftsmen</strong> with zero corporate platform cut.
            </p>
          </div>

          {/* Parametric Weather & Minimum Earnings Guarantee (MEG) Live Ticker */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
            <div className="flex items-center gap-2 text-slate-200">
              <Umbrella className="w-4 h-4 text-sky-400 shrink-0" />
              <div>
                <span className="font-bold text-white">Parametric Rain Insurance Active: </span>
                <span className="text-slate-300">{ACTIVE_PARAMETRIC_ALERT.triggerCondition} detected in East Zone</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-0.5 rounded-lg">
                ₹{ACTIVE_PARAMETRIC_ALERT.autoPayoutAmountINR} Auto-Payout
              </span>
              <span className="text-[11px] text-slate-400">₹10,000/mo MEG Floor</span>
            </div>
          </div>

          {/* BHASHINI Voice Search Bar */}
          <div className="pt-1">
            <BhashiniVoiceBar />
          </div>
        </div>
      </section>

      {/* 2. UNIT-OF-HELP MODE SWITCHER (ABC.MD INNOVATION 1) */}
      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 px-4 sm:px-6 lg:px-8 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {[
              { id: "instahelp", label: "⚡ Instahelp (Hourly Blocks)", count: "1-4 hrs" },
              { id: "crews", label: "👥 Multi-Skill Crews", count: "3 Teams" },
              { id: "packs", label: "📦 Outcome Packs", count: "Pack Studio" },
              { id: "tasks", label: "🛠️ Quick Tasks", count: "10 Crafts" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 sm:px-4 py-2 rounded-2xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? "bg-slate-900 text-white shadow-soft"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    activeTab === tab.id ? "bg-emerald-500 text-slate-950" : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Emergency SOS Shortcut */}
          <Link
            href="/emergency"
            className="hidden md:flex items-center gap-1.5 bg-orange-50 text-orange-700 border border-orange-200 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap hover:bg-orange-100 transition"
          >
            <Zap className="w-3.5 h-3.5 text-orange-600" />
            <span>15-Min Emergency SOS</span>
          </Link>
        </div>
      </section>

      {/* 3. MAIN CONTENT DISPLAY BASED ON ACTIVE TAB */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        
        {/* TAB 1: INSTAHELP HOURLY TIME BLOCKS */}
        {activeTab === "instahelp" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                  <span>Hourly Time Blocks (Instahelp)</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    Fixed Time • Any Task
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Book a verified craftsman for dedicated time blocks. No haggling, standard inclusions, and minimum guaranteed earnings for workers.
                </p>
              </div>
              <div className="text-xs font-bold text-slate-500">
                Arrival time: <strong className="text-emerald-600 font-mono">12-25 mins</strong>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {INSTAHELP_BLOCKS.map((block) => (
                <InstahelpBlockCard key={block.id} block={block} />
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: PRE-FORMED MULTI-SKILL CREWS */}
        {activeTab === "crews" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                  <span>Pre-Formed Multi-Skill Crews</span>
                  <span className="text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">
                    Visible Worker Split
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Cooperative squads formed based on skill complementarity and trust. Team leads coordinate entire jobs with quality guarantees.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MULTI_SKILL_CREWS.map((crew) => (
                <CrewCard key={crew.id} crew={crew} />
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: OUTCOME-BASED SERVICE PACKS */}
        {activeTab === "packs" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                  <span>Outcome-Based Service Packs</span>
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                    Pack Studio Ready
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Sold as complete outcomes (Festival-Ready, Move-In, Elder Care). Click &quot;Customize in Pack Studio&quot; to toggle inclusions.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {OUTCOME_PACKS.map((pack) => (
                <div
                  key={pack.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                        {pack.badge}
                      </span>
                      <span className="text-xs font-bold text-slate-400">~{pack.estimatedHours} hrs</span>
                    </div>

                    <h3 className="text-lg font-black text-slate-900 mb-1">{pack.title}</h3>
                    <p className="text-xs text-slate-600 mb-4">{pack.outcomeHeadline}</p>

                    <div className="space-y-1.5 mb-4 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Default Inclusions ({pack.tasks.length} tasks):
                      </div>
                      {pack.tasks.slice(0, 3).map((t) => (
                        <div key={t.id} className="flex items-start gap-1.5 text-xs text-slate-700 font-medium">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-tight">{t.name}</span>
                        </div>
                      ))}
                      {pack.tasks.length > 3 && (
                        <div className="text-[11px] text-emerald-700 font-bold pt-1">
                          +{pack.tasks.length - 3} more customizable options
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-medium block">Starting from</span>
                      <div className="text-xl font-black text-slate-900 font-mono">
                        {formatINR(pack.basePriceINR)}
                      </div>
                    </div>

                    <button
                      onClick={() => setActivePackStudio(pack)}
                      className="bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Pack Studio</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: QUICK SINGLE TASKS & CRAFTS */}
        {activeTab === "tasks" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Instant Single-Craft Tasks
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Book certified neighborhood craftsmen for specific diagnostic repairs in 15 minutes.
                </p>
              </div>

              {/* Filter search */}
              <div className="relative max-w-xs w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter crafts..."
                  value={taskSearch}
                  onChange={(e) => setTaskSearch(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {filteredCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-emerald-500 transition shadow-2xs hover:shadow-soft flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-lg mb-2">
                      ⚡
                    </div>
                    <h4 className="font-extrabold text-sm text-slate-900">{cat.name}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{cat.description}</p>
                    <div className="flex items-center gap-1 text-[11px] text-slate-600 font-semibold mt-2">
                      <Clock className="w-3 h-3 text-emerald-600" />
                      <span>15-min arrival</span>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="font-mono font-black text-slate-900 text-sm">₹{cat.startingPrice}+</span>
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
                      className="p-1.5 bg-slate-900 hover:bg-emerald-600 text-white rounded-lg transition cursor-pointer"
                      title="Add task"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. INNOVATION HIGHLIGHTS: XAI SHAP & WORKER PASSPORT SPECIMEN */}
        <section className="pt-6 border-t border-slate-200 grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Explainable AI (XAI) Specimen Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Explainable AI (XAI) Matching</h3>
                  <p className="text-[11px] text-slate-500">SHAP / LIME Algorithmic Transparency</p>
                </div>
              </div>

              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                Innovation 2
              </span>
            </div>

            <p className="text-xs text-slate-600">
              Unlike opaque corporate algorithms, SahakarSeva uses SHAP to prove why every worker is assigned: skill level (+0.32), availability (+0.28), and weekly workload fairness (+0.12).
            </p>

            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="font-medium text-slate-600">Matched Pro:</span>
                <span className="font-bold text-slate-900">{SAMPLE_XAI_EXPLANATION.workerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-slate-600">Confidence Score:</span>
                <span className="font-mono font-bold text-emerald-600">94% Affinity</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-slate-600">Gini Fairness Index:</span>
                <span className="font-mono text-slate-700">0.24 (Equitable Workload)</span>
              </div>
            </div>

            <button
              onClick={() => setActiveXAIModal(true)}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Inspect Live SHAP Values & Appeal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Cooperative Worker Passport Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Cooperative Worker Passport</h3>
                  <p className="text-[11px] text-slate-500">e-Shram • Aadhaar KYC • GNN Trust Graph</p>
                </div>
              </div>

              <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
                Innovation 3
              </span>
            </div>

            <p className="text-xs text-slate-600">
              Portable, worker-owned sovereign credential with Graph Neural Network trust propagation, NSDC certified skills, and on-device federated learning privacy.
            </p>

            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="font-medium text-slate-600">National UAN:</span>
                <span className="font-mono font-bold text-slate-900">{SAMPLE_WORKER_PASSPORT.uanNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-slate-600">GNN Trust Score:</span>
                <span className="font-mono font-bold text-blue-600">{SAMPLE_WORKER_PASSPORT.gnnTrustScore}/100 (38 Peer Attestations)</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-slate-600">Women-Safety Rating:</span>
                <span className="font-mono font-bold text-pink-600">{SAMPLE_WORKER_PASSPORT.separateWomenSafetyRating} ★ (Zero Incidents)</span>
              </div>
            </div>

            <button
              onClick={() => setActivePassportModal(true)}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>View Full Passport Credential</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>
      </main>

      {/* 5. MODAL LAYERS */}
      <PackStudioModal />
      <XAIExplanationDrawer />
      <WorkerPassportModal />
      <FloatingDispatchCart />
    </div>
  );
}

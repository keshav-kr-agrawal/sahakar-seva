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
} from "@/lib/mockData";
import { formatINR } from "@/lib/utils";
import InstahelpBlockCard from "@/components/snabbit/InstahelpBlockCard";
import CrewCard from "@/components/snabbit/CrewCard";
import PackStudioModal from "@/components/snabbit/PackStudioModal";
import XAIExplanationDrawer from "@/components/snabbit/XAIExplanationDrawer";
import WorkerPassportModal from "@/components/snabbit/WorkerPassportModal";
import FloatingDispatchCart from "@/components/snabbit/FloatingDispatchCart";
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
  Wrench,
  Sparkles,
  Hammer,
  Cpu,
  Home as HomeIcon,
  Paintbrush,
  HeartPulse,
} from "lucide-react";

export default function HomePage() {
  const {
    selectedLocality,
    setSelectedLocality,
    addToCart,
    setActivePackStudio,
    setActiveXAIModal,
    setActivePassportModal,
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
      showToast("BHASHINI Voice Recognized", `Intent: ${p.query}`);
    }, 800);
  };

  const getCraftIcon = (name: string) => {
    switch (name) {
      case "Electrician": return <Zap className="w-5 h-5 text-slate-800" />;
      case "Plumbing": return <Wrench className="w-5 h-5 text-slate-800" />;
      case "Cleaning": return <Sparkles className="w-5 h-5 text-slate-800" />;
      case "Carpentry": return <Hammer className="w-5 h-5 text-slate-800" />;
      case "Appliances": return <Cpu className="w-5 h-5 text-slate-800" />;
      case "Cooking": return <HomeIcon className="w-5 h-5 text-slate-800" />;
      case "Painting": return <Paintbrush className="w-5 h-5 text-slate-800" />;
      case "Elder Care": return <HeartPulse className="w-5 h-5 text-slate-800" />;
      default: return <Wrench className="w-5 h-5 text-slate-800" />;
    }
  };

  const filteredCategories = SERVICE_CATEGORIES.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-32">
      
      {/* 1. QUIET DISRUPTION & CO-OP STATUS STRIP */}
      <div className="bg-slate-50 border-b border-slate-100 py-2 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <Umbrella className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <span>
              <strong>Parametric Rain Cover Active:</strong> {ACTIVE_PARAMETRIC_ALERT.autoPayoutAmountINR} automatic UPI safety payout triggered in East Zone ({ACTIVE_PARAMETRIC_ALERT.beneficiariesCount} workers).
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-500 font-medium">
            <span>Guaranteed Floor: <strong>₹10,000/mo MEG</strong></span>
            <span>•</span>
            <span>Avg Arrival: <strong className="text-slate-900 font-mono">14m</strong></span>
          </div>
        </div>
      </div>

      {/* 2. HERO SECTION: PRONTO CLEANLINESS & BREATHING ROOM */}
      <section className="pt-10 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="space-y-6 max-w-3xl">
          
          {/* Location Badge */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100/80 px-3 py-1 rounded-full border border-slate-200">
            <MapPin className="w-3.5 h-3.5 text-slate-800" />
            <span>Delivering to <strong>{selectedLocality}</strong></span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-800 font-bold">15-Min Dispatch</span>
          </div>

          {/* Main Clean Headline */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.08]">
              Home services in <br />
              <span className="text-slate-900">10-15 minutes.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-xl">
              Verified electricians, plumbers, cleaners, and handymen from worker-owned cooperatives. 83%+ goes directly to craftsmen.
            </p>
          </div>

          {/* Clean Integrated Search Console with Built-In BHASHINI Voice */}
          <div className="space-y-2 pt-1 max-w-2xl">
            <div className="flex items-center gap-2 p-1.5 bg-white rounded-2xl border border-slate-300 focus-within:border-slate-900 transition-colors shadow-soft">
              <div className="flex items-center gap-2 flex-1 px-3">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isVoiceListening
                      ? `Listening in ${voiceLang.toUpperCase()}...`
                      : "Search service, problem, or voice intent..."
                  }
                  className="w-full text-xs sm:text-sm font-medium focus:outline-none placeholder:text-slate-400 text-slate-900 bg-transparent py-2"
                />
              </div>

              {/* Integrated BHASHINI Language Switcher & Mic */}
              <div className="flex items-center gap-1.5 pr-1 shrink-0">
                <div className="flex items-center bg-slate-100 rounded-lg p-0.5 text-[11px] font-bold text-slate-600">
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

            {/* Subtle Proof Points */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium pt-1 px-1">
              <span className="flex items-center gap-1 text-slate-700">
                <Check className="w-3.5 h-3.5 text-slate-800" />
                100% Worker-Owned Co-op
              </span>
              <span className="flex items-center gap-1 text-slate-700">
                <Check className="w-3.5 h-3.5 text-slate-800" />
                0% Platform Commission
              </span>
              <span className="flex items-center gap-1 text-slate-700">
                <Check className="w-3.5 h-3.5 text-slate-800" />
                15-Min Guaranteed Arrival
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CLEAN PRONTO 8-CATEGORY TILES */}
      <section className="py-6 px-4 sm:px-6 max-w-6xl mx-auto border-t border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
            Quick Services (15-Min Dispatch)
          </h2>
          <Link href="/services" className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-0.5">
            <span>View all 10 crafts</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {SERVICE_CATEGORIES.slice(0, 8).map((c) => (
            <Link
              key={c.id}
              href={`/services?category=${c.id}`}
              className="bg-slate-50 hover:bg-slate-100 border border-slate-200/80 p-3 rounded-2xl flex flex-col items-center justify-center text-center space-y-1.5 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-slate-200 shadow-2xs group-hover:scale-105 transition-transform">
                {getCraftIcon(c.name)}
              </div>
              <div className="text-xs font-extrabold text-slate-900 truncate w-full">{c.name}</div>
              <div className="text-[10px] text-slate-500 font-medium">₹{c.startingPrice}+</div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. UNIT-OF-HELP MODE SWITCHER (ABC.MD INNOVATION 1) */}
      <section className="py-8 px-4 sm:px-6 max-w-6xl mx-auto border-t border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Flexible Service Units
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Choose your unit of help
            </h2>
          </div>

          {/* Clean Segmented Control */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold self-start sm:self-auto">
            {[
              { id: "instahelp", label: "Hourly Blocks" },
              { id: "crews", label: "Multi-Skill Crews" },
              { id: "packs", label: "Outcome Packs" },
              { id: "tasks", label: "Single Tasks" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-white text-slate-900 shadow-2xs font-extrabold"
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
              Dedicated time blocks for any pending household fixes. Fixed rate, allowed tasks checklist, and guaranteed minimum wage floor.
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
          <div className="space-y-4">
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
              Complete results delivered as a package. Click &quot;Customize in Pack Studio&quot; to toggle inclusions and review live wage breakdowns.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {OUTCOME_PACKS.map((pack) => (
                <div
                  key={pack.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md">
                        {pack.badge}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">~{pack.estimatedHours} hrs</span>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900 mb-1">{pack.title}</h3>
                    <p className="text-xs text-slate-600 mb-3.5 leading-relaxed">{pack.outcomeHeadline}</p>

                    <div className="space-y-1.5 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Inclusions ({pack.tasks.length} items):
                      </div>
                      {pack.tasks.slice(0, 3).map((t) => (
                        <div key={t.id} className="flex items-start gap-1.5 text-xs text-slate-700 font-medium">
                          <Check className="w-3.5 h-3.5 text-slate-600 shrink-0 mt-0.5" />
                          <span className="leading-tight">{t.name}</span>
                        </div>
                      ))}
                      {pack.tasks.length > 3 && (
                        <div className="text-[11px] text-slate-500 font-semibold pt-0.5">
                          +{pack.tasks.length - 3} customizable items
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
                      className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
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
                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center mb-2">
                      {getCraftIcon(cat.name)}
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

      {/* 5. COOPERATIVE INTELLIGENCE & SOVEREIGN TRUST (ABC.MD INNOVATIONS 2 & 3) */}
      <section className="py-10 px-4 sm:px-6 max-w-6xl mx-auto border-t border-slate-100">
        <div className="mb-6">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Algorithmic Fairness & Worker Sovereignty
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Built on cooperative transparency, not blackbox extraction
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Explainable AI (XAI) Specimen Card */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-800">
                    <Scale className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">Explainable AI (XAI) Matching</h3>
                    <p className="text-[11px] text-slate-500">SHAP & LIME transparency engine</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-slate-200 text-slate-800 px-2 py-0.5 rounded">
                  Innovation 2
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Every worker match reveals its mathematical factors: skill certification (+0.32), proximity (+0.15), and weekly workload fairness (+0.12) to prevent overwork.
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
              <span>Inspect Live SHAP Values & Dispute Rights</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Cooperative Worker Passport Card */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-800">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">Cooperative Worker Passport</h3>
                    <p className="text-[11px] text-slate-500">e-Shram • Aadhaar KYC • GNN Trust Graph</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-slate-200 text-slate-800 px-2 py-0.5 rounded">
                  Innovation 3
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

      {/* 6. MODALS & FLOATING CART */}
      <PackStudioModal />
      <XAIExplanationDrawer />
      <WorkerPassportModal />
      <FloatingDispatchCart />
    </div>
  );
}

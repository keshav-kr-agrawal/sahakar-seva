"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { SERVICE_CATEGORIES, WORKERS, LOCALITIES, WorkerProfile } from "@/lib/mockData";
import TrustBadge from "@/components/ui/TrustBadge";
import InteractiveMap from "@/components/ui/InteractiveMap";
import { formatINR } from "@/lib/utils";
import {
  Search,
  MapPin,
  Star,
  ShieldCheck,
  Grid,
  Map as MapIcon,
  ChevronRight,
  Clock,
  Sparkles,
  Award,
  SlidersHorizontal,
  CheckCircle2,
} from "lucide-react";

function ServicesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialQuery = searchParams.get("query") || "";

  const { selectedLocality, setSelectedLocality, setSelectedWorkerForBooking, addToCart, showToast } = useApp();

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [sortBy, setSortBy] = useState<"rating" | "distance" | "price">("rating");
  const [womenSafeOnly, setWomenSafeOnly] = useState(false);

  let filteredWorkers = WORKERS.filter((w) => {
    if (activeCategory !== "all" && w.category !== activeCategory) return false;
    if (womenSafeOnly && !w.isWomenSafe) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = w.name.toLowerCase().includes(q);
      const matchSkills = w.skills.some((s) => s.toLowerCase().includes(q));
      const matchCategory = w.category.toLowerCase().includes(q);
      if (!matchName && !matchSkills && !matchCategory) return false;
    }
    return true;
  });

  filteredWorkers = filteredWorkers.sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "distance") return a.distanceKm - b.distanceKm;
    if (sortBy === "price") return a.hourlyRate - b.hourlyRate;
    return 0;
  });

  const selectedCategoryObj = SERVICE_CATEGORIES.find((c) => c.id === activeCategory);

  const handleBookWorker = (worker: WorkerProfile) => {
    setSelectedWorkerForBooking(worker);
    showToast("Worker Selected", `${worker.name} queued for 15-min dispatch.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-white text-slate-900">
      
      {/* 1. Header with Breadcrumbs & 15-min Dispatch Pill */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span>⚡ 15-Minute Guaranteed Arrival in {selectedLocality}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">
            Cooperative Craftsmen & Services
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl font-normal leading-relaxed">
            Verified professionals from democratic Labour Cooperative Federations. Transparent 83%+ direct worker payout with sovereign e-Shram credentials.
          </p>
        </div>

        {/* Quick Stats Pill */}
        <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs">
          <div className="text-center px-2">
            <div className="font-mono font-bold text-slate-900 text-sm">428</div>
            <div className="text-[10px] text-slate-500">Active Pros</div>
          </div>
          <div className="h-6 w-px bg-slate-200" />
          <div className="text-center px-2">
            <div className="font-mono font-bold text-emerald-700 text-sm">83.4%</div>
            <div className="text-[10px] text-slate-500">Direct Take-Home</div>
          </div>
          <div className="h-6 w-px bg-slate-200" />
          <div className="text-center px-2">
            <div className="font-mono font-bold text-slate-900 text-sm">14m</div>
            <div className="text-[10px] text-slate-500">Avg Arrival</div>
          </div>
        </div>
      </div>

      {/* 2. Category Filter Pills with Photos */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Select Craft Guild ({SERVICE_CATEGORIES.length})
          </span>
          {activeCategory !== "all" && (
            <button
              onClick={() => setActiveCategory("all")}
              className="text-xs font-bold text-slate-700 hover:text-slate-900 cursor-pointer underline"
            >
              Reset to All
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition cursor-pointer border ${
              activeCategory === "all"
                ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
            }`}
          >
            All Services ({WORKERS.length})
          </button>
          {SERVICE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-2 border ${
                activeCategory === cat.id
                  ? "bg-slate-900 text-white border-slate-900 shadow-xs font-extrabold"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
            >
              <img
                src={cat.imageUrl}
                alt={cat.name}
                className="w-4 h-4 rounded-md object-cover"
              />
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Control & Search Toolbar */}
      <div className="bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[240px] bg-white px-3.5 py-2 rounded-xl border border-slate-200 focus-within:border-slate-900 transition">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by pro name, skill (switchboard, leak, elder care)..."
            className="w-full bg-transparent text-xs font-medium focus:outline-none text-slate-900 placeholder:text-slate-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 cursor-pointer select-none bg-white px-3 py-2 rounded-xl border border-slate-200">
            <input
              type="checkbox"
              checked={womenSafeOnly}
              onChange={(e) => setWomenSafeOnly(e.target.checked)}
              className="w-3.5 h-3.5 accent-slate-900 rounded cursor-pointer"
            />
            <span>Women-Safe Pro Badge</span>
          </label>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-xs font-bold text-slate-900 focus:outline-none cursor-pointer"
            >
              <option value="rating">Highest Rated</option>
              <option value="distance">Nearest (15-min)</option>
              <option value="price">Rate: Low to High</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-white p-0.5 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                viewMode === "grid" ? "bg-slate-900 text-white shadow-2xs" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                viewMode === "map" ? "bg-slate-900 text-white shadow-2xs" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Map</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Active View: Grid or Map */}
      {viewMode === "map" ? (
        <div className="space-y-4">
          <InteractiveMap mode="pins" height="h-[550px]" onSelectWorker={handleBookWorker} />
          <p className="text-xs text-slate-500 text-center">
            Click on any worker pin to inspect verified credentials, GNN trust score, and book in 15 minutes.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkers.length === 0 ? (
            <div className="col-span-full bg-slate-50 p-12 rounded-3xl text-center space-y-3 border border-dashed border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">
                No Certified Craftsmen Found
              </h3>
              <p className="text-xs text-slate-500">
                Try broadening your search criteria or switching to all service categories.
              </p>
            </div>
          ) : (
            filteredWorkers.map((w) => (
              <div
                key={w.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-soft hover:shadow-elevated p-5 flex flex-col justify-between space-y-4 transition group"
              >
                <div className="space-y-3">
                  <div className="flex items-start gap-3.5">
                    <div className="relative shrink-0">
                      <img
                        src={w.avatar}
                        alt={w.name}
                        className="w-16 h-16 rounded-2xl object-cover border border-slate-200 group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute -bottom-1 -right-1 bg-slate-900 text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-md">
                        T{w.verificationTier}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <Link href={`/worker/${w.id}`} className="hover:underline truncate">
                          <h3 className="text-base font-black text-slate-900 truncate">
                            {w.name}
                          </h3>
                        </Link>
                        <span className="text-sm font-black text-slate-900 font-mono shrink-0">
                          ₹{w.hourlyRate}<span className="text-xs font-normal text-slate-500">/hr</span>
                        </span>
                      </div>

                      <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{w.locality} ({w.distanceKm} km away)</span>
                      </div>

                      <div className="flex items-center gap-2 pt-1.5">
                        <div className="flex items-center gap-1 text-xs font-bold text-slate-900">
                          <Star className="w-3.5 h-3.5 fill-slate-900" />
                          <span>{w.rating}</span>
                        </div>
                        <span className="text-[11px] text-slate-400">•</span>
                        <span className="text-[11px] text-slate-500 font-medium">{w.jobsCompleted} jobs</span>
                        <span className="text-[11px] text-slate-400">•</span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                          e-Shram KYC
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {w.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-lg font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    &quot;{w.bio}&quot;
                  </p>
                </div>

                {/* Worker Guarantee & Actions */}
                <div className="pt-3 border-t border-slate-100 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Direct Worker Payout:</span>
                    <span className="font-bold text-slate-900 font-mono">
                      ₹{Math.round(w.hourlyRate * 0.83)}/hr (83%)
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/worker/${w.id}`}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-center py-2 rounded-xl text-xs font-bold transition"
                    >
                      Passport
                    </Link>
                    <Link
                      href={`/booking?workerId=${w.id}`}
                      onClick={() => handleBookWorker(w)}
                      className="bg-slate-900 hover:bg-slate-800 text-white text-center py-2 rounded-xl text-xs font-bold transition shadow-xs flex items-center justify-center gap-1"
                    >
                      <Clock className="w-3 h-3" />
                      <span>Book 15m</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-500">Loading Craftsmen Directory...</div>}>
      <ServicesContent />
    </Suspense>
  );
}

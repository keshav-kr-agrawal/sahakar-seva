"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { SERVICE_CATEGORIES, WORKERS, LOCALITIES, WorkerProfile } from "@/lib/mockData";
import TrustBadge from "@/components/ui/TrustBadge";
import InteractiveMap from "@/components/ui/InteractiveMap";
import {
  Search,
  Filter,
  MapPin,
  Star,
  ShieldCheck,
  Grid,
  Map as MapIcon,
  SlidersHorizontal,
  ArrowRight,
  PlusCircle,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";

function ServicesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialQuery = searchParams.get("query") || "";

  const { selectedLocality, setSelectedLocality, setSelectedWorkerForBooking, showToast } = useApp();

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [sortBy, setSortBy] = useState<"rating" | "distance" | "price">("rating");
  const [womenSafeOnly, setWomenSafeOnly] = useState(false);
  const [heritageOnly, setHeritageOnly] = useState(false);

  let filteredWorkers = WORKERS.filter((w) => {
    if (activeCategory !== "all" && w.category !== activeCategory) return false;
    if (womenSafeOnly && !w.isWomenSafe) return false;
    if (heritageOnly && !w.isHeritageSkill) return false;
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

  const handleBookWorker = (worker: WorkerProfile) => {
    setSelectedWorkerForBooking(worker);
    showToast("Worker Selected", `${worker.name} added to your booking context.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Title & Subtitle */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#c85a32] uppercase tracking-wider bg-[#fceee9] px-3 py-1 rounded-full w-fit">
          <ShieldCheck className="w-4 h-4" />
          <span>NCCT Certified Cooperative Guild Marketplace</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f241a] dark:text-emerald-100 font-serif">
          Find Verified Cooperative Guild Workers
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Direct access to local skilled workers with transparent 82% take-home pay, group insurance, and RWA verified credentials.
        </p>
      </div>

      {/* Category Filter Horizontal Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition border ${
            activeCategory === "all"
              ? "bg-[#133e2b] text-white border-[#133e2b]"
              : "bg-white dark:bg-[#15241d] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:bg-[#e8f4ed]"
          }`}
        >
          All Guilds ({WORKERS.length})
        </button>
        {SERVICE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition border ${
              activeCategory === cat.id
                ? "bg-[#133e2b] text-white border-[#133e2b]"
                : "bg-white dark:bg-[#15241d] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:bg-[#e8f4ed]"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Control Bar: Search, Filters, Sort, View Toggle */}
      <div className="bg-white dark:bg-[#15241d] p-4 rounded-2xl border border-[#133e2b]/15 shadow-md flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1 min-w-[240px] bg-[#f4efe8] dark:bg-emerald-950/60 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search worker by name, skill, or service..."
            className="w-full bg-transparent text-xs font-medium focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer select-none">
            <input
              type="checkbox"
              checked={womenSafeOnly}
              onChange={(e) => setWomenSafeOnly(e.target.checked)}
              className="accent-[#c85a32] rounded"
            />
            <span className="text-rose-700 dark:text-rose-300">Women-Safe Badge Only</span>
          </label>

          <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer select-none">
            <input
              type="checkbox"
              checked={heritageOnly}
              onChange={(e) => setHeritageOnly(e.target.checked)}
              className="accent-amber-600 rounded"
            />
            <span className="text-amber-800 dark:text-amber-300">Heritage Artisans</span>
          </label>

          <div className="flex items-center gap-1 text-xs font-semibold text-muted-foreground">
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#f4efe8] dark:bg-emerald-950 px-2.5 py-1.5 rounded-lg text-xs font-bold text-[#133e2b] dark:text-emerald-300 focus:outline-none"
            >
              <option value="rating">Highest Rated</option>
              <option value="distance">Nearest Distance</option>
              <option value="price">Price Low → High</option>
            </select>
          </div>

          <div className="flex items-center bg-[#f4efe8] dark:bg-emerald-950 p-1 rounded-xl border border-gray-200 dark:border-gray-800">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition ${
                viewMode === "grid" ? "bg-[#133e2b] text-white shadow-sm" : "text-gray-600 dark:text-gray-400"
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition ${
                viewMode === "map" ? "bg-[#133e2b] text-white shadow-sm" : "text-gray-600 dark:text-gray-400"
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Map</span>
            </button>
          </div>
        </div>
      </div>

      {/* MAIN VIEW AREA: GRID OR MAP */}
      {viewMode === "map" ? (
        <div className="space-y-4">
          <InteractiveMap mode="pins" height="h-[550px]" onSelectWorker={handleBookWorker} />
          <p className="text-xs text-muted-foreground text-center">
            Click on any worker pin on the map to view detailed profile and initiate booking.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkers.length === 0 ? (
            <div className="col-span-full bg-white dark:bg-[#15241d] p-12 rounded-2xl text-center space-y-3 border border-dashed border-gray-300">
              <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 font-serif">
                No Cooperative Workers Found
              </h3>
              <p className="text-xs text-muted-foreground">
                Try loosening your search query or selecting a different service category.
              </p>
            </div>
          ) : (
            filteredWorkers.map((w) => (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-[#15241d] rounded-2xl border border-[#133e2b]/15 shadow-md hover:shadow-xl transition space-y-4 p-5 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <img
                        src={w.avatar}
                        alt={w.name}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-[#2d7a52]"
                      />
                      <span className="absolute -bottom-1 -right-1 bg-[#133e2b] text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded">
                        T{w.verificationTier}
                      </span>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <Link href={`/worker/${w.id}`} className="hover:underline">
                          <h3 className="text-base font-bold text-[#133e2b] dark:text-emerald-300 font-serif">
                            {w.name}
                          </h3>
                        </Link>
                        <span className="text-sm font-extrabold text-[#2d7a52]">₹{w.hourlyRate}/hr</span>
                      </div>

                      <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#c85a32]" />
                        <span>{w.locality} ({w.distanceKm} km)</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-1 pt-1.5">
                        <TrustBadge type="verified" />
                        {w.isWomenSafe && <TrustBadge type="women_safe" />}
                        {w.isHeritageSkill && <TrustBadge type="heritage" />}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {w.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] bg-[#f4efe8] dark:bg-emerald-950/60 text-[#133e2b] dark:text-emerald-300 px-2 py-0.5 rounded font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-2 italic">"{w.bio}"</p>
                </div>

                <div className="pt-3 border-t border-gray-100 dark:border-gray-800 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 font-bold text-amber-600">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{w.rating}</span>
                      <span className="text-muted-foreground font-normal">({w.reviewCount})</span>
                    </div>
                    <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                      {w.jobsCompleted} Jobs Done
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/worker/${w.id}`}
                      className="w-full bg-[#f4efe8] hover:bg-[#e8f4ed] dark:bg-emerald-950 dark:hover:bg-emerald-900 text-[#133e2b] dark:text-emerald-300 text-center py-2 rounded-xl text-xs font-bold transition"
                    >
                      View Profile
                    </Link>
                    <Link
                      href={`/booking?workerId=${w.id}`}
                      onClick={() => handleBookWorker(w)}
                      className="w-full bg-[#133e2b] hover:bg-[#1e5338] text-white text-center py-2 rounded-xl text-xs font-bold transition shadow-sm"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-muted-foreground">Loading Services Marketplace...</div>}>
      <ServicesContent />
    </Suspense>
  );
}

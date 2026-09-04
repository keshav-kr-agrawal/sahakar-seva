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
  MapPin,
  Star,
  ShieldCheck,
  Grid,
  Map as MapIcon,
  ChevronRight,
  SlidersHorizontal
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
    showToast("Worker Selected", `${worker.name} queued for booking.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Title & Subtitle */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-[#a84422] uppercase tracking-wider bg-[#f6e8e2] px-3 py-1 rounded-full w-fit">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>NCCT Certified Cooperative Guild Marketplace</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#14221b] dark:text-[#edebe4] font-serif">
          Verified Cooperative Guild Craftsmen
        </h1>
        <p className="text-xs sm:text-sm text-[#506155] dark:text-[#a3b8ac] max-w-2xl leading-relaxed">
          Direct access to local skilled workers with transparent 82% direct take-home pay, collective medical insurance, and RWA verified credentials.
        </p>
      </div>

      {/* Category Filter Horizontal Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition border ${
            activeCategory === "all"
              ? "bg-[#193927] text-[#f9f7f2] border-[#193927]"
              : "bg-[#ffffff] dark:bg-[#13221b] text-[#506155] dark:text-[#a3b8ac] border-[#e2ded4] dark:border-[#233b2e] hover:bg-[#f4f0e8]"
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
                ? "bg-[#193927] text-[#f9f7f2] border-[#193927]"
                : "bg-[#ffffff] dark:bg-[#13221b] text-[#506155] dark:text-[#a3b8ac] border-[#e2ded4] dark:border-[#233b2e] hover:bg-[#f4f0e8]"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Control Bar: Search, Filters, Sort, View Toggle */}
      <div className="bg-[#ffffff] dark:bg-[#13221b] p-4 rounded-3xl border border-[#e2ded4] dark:border-[#233b2e] shadow-soft flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 flex-1 min-w-[240px] bg-[#f9f7f2] dark:bg-[#182c22] px-3.5 py-2.5 rounded-xl border border-[#ede9e1] dark:border-[#244230]">
          <Search className="w-4 h-4 text-[#7c8d82]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by name, specialty, or repair task..."
            className="w-full bg-transparent text-xs font-medium focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer select-none">
            <input
              type="checkbox"
              checked={womenSafeOnly}
              onChange={(e) => setWomenSafeOnly(e.target.checked)}
              className="w-4 h-4 accent-[#a84422] rounded cursor-pointer"
            />
            <span className="text-[#872828] dark:text-[#e4a8a8]">Women-Safe Guild Only</span>
          </label>

          <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer select-none">
            <input
              type="checkbox"
              checked={heritageOnly}
              onChange={(e) => setHeritageOnly(e.target.checked)}
              className="w-4 h-4 accent-[#855b16] rounded cursor-pointer"
            />
            <span className="text-[#855b16] dark:text-[#dec08a]">Heritage Artisans</span>
          </label>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#7c8d82]">
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#f9f7f2] dark:bg-[#182c22] px-3 py-1.5 rounded-lg text-xs font-bold text-[#193927] dark:text-[#dce8e1] focus:outline-none border border-[#ede9e1] dark:border-[#244230]"
            >
              <option value="rating">Highest Rated</option>
              <option value="distance">Nearest Distance</option>
              <option value="price">Price: Low to High</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-[#f4f0e8] dark:bg-[#182c22] p-1 rounded-xl border border-[#e2ded4] dark:border-[#233b2e]">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                viewMode === "grid" ? "bg-[#193927] text-white shadow-xs" : "text-[#7c8d82]"
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                viewMode === "map" ? "bg-[#193927] text-white shadow-xs" : "text-[#7c8d82]"
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Map</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main View: Grid or Map */}
      {viewMode === "map" ? (
        <div className="space-y-4">
          <InteractiveMap mode="pins" height="h-[550px]" onSelectWorker={handleBookWorker} />
          <p className="text-xs text-[#7c8d82] text-center">
            Click on any worker pin to inspect credentials and initiate transparent wage booking.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkers.length === 0 ? (
            <div className="col-span-full bg-[#ffffff] dark:bg-[#13221b] p-12 rounded-3xl text-center space-y-3 border border-dashed border-[#e2ded4]">
              <h3 className="text-lg font-bold text-[#14221b] dark:text-[#edebe4] font-serif">
                No Cooperative Workers Found
              </h3>
              <p className="text-xs text-[#7c8d82]">
                Try adjusting your search criteria or toggling all guilds.
              </p>
            </div>
          ) : (
            filteredWorkers.map((w) => (
              <div
                key={w.id}
                className="bg-[#ffffff] dark:bg-[#13221b] rounded-3xl border border-[#e2ded4] dark:border-[#233b2e] shadow-soft p-6 flex flex-col justify-between space-y-4 hover:border-[#193927] transition"
              >
                <div className="space-y-3.5">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <img
                        src={w.avatar}
                        alt={w.name}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-[#224c34]"
                      />
                      <span className="absolute -bottom-1 -right-1 bg-[#193927] text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-md">
                        T{w.verificationTier}
                      </span>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <Link href={`/worker/${w.id}`} className="hover:underline">
                          <h3 className="text-base font-bold text-[#14221b] dark:text-[#edebe4] font-serif">
                            {w.name}
                          </h3>
                        </Link>
                        <span className="text-sm font-extrabold text-[#193927] dark:text-[#8caea0]">
                          ₹{w.hourlyRate}/hr
                        </span>
                      </div>

                      <div className="text-xs text-[#7c8d82] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#a84422]" />
                        <span>{w.locality} ({w.distanceKm} km away)</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
                        <TrustBadge type="verified" />
                        {w.isWomenSafe && <TrustBadge type="women_safe" />}
                        {w.isHeritageSkill && <TrustBadge type="heritage" />}
                      </div>
                    </div>
                  </div>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1">
                    {w.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] bg-[#f4f0e8] dark:bg-[#182c22] text-[#193927] dark:text-[#dce8e1] px-2 py-0.5 rounded-md font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-[#506155] dark:text-[#a3b8ac] line-clamp-2 italic bg-[#f9f7f2] dark:bg-[#182c22] p-3 rounded-xl border border-[#ede9e1] dark:border-[#244230]">
                    "{w.bio}"
                  </p>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-3 border-t border-[#ede9e1] dark:border-[#233b2e] space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 font-bold text-[#855b16]">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{w.rating}</span>
                      <span className="text-[#7c8d82] font-normal">({w.reviewCount} reviews)</span>
                    </div>
                    <span className="text-[11px] text-[#224c34] dark:text-[#8caea0] font-semibold">
                      {w.jobsCompleted} Jobs Completed
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/worker/${w.id}`}
                      className="w-full bg-[#f4f0e8] hover:bg-[#e8f0ea] dark:bg-[#182c22] text-[#193927] dark:text-[#dce8e1] text-center py-2.5 rounded-xl text-xs font-bold transition border border-[#d8d3c7] dark:border-[#2a4a38]"
                    >
                      View Profile
                    </Link>
                    <Link
                      href={`/booking?workerId=${w.id}`}
                      onClick={() => handleBookWorker(w)}
                      className="w-full bg-[#193927] hover:bg-[#224c34] text-white text-center py-2.5 rounded-xl text-xs font-bold transition shadow-xs"
                    >
                      Book Now
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
    <Suspense fallback={<div className="p-12 text-center text-xs text-[#7c8d82]">Loading Guild Marketplace...</div>}>
      <ServicesContent />
    </Suspense>
  );
}

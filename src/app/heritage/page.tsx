"use client";

import React from "react";
import Link from "next/link";
import TrustBadge from "@/components/ui/TrustBadge";
import { WORKERS } from "@/lib/mockData";
import { Award, ShieldCheck, Star, MapPin, Sparkles, ArrowRight, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function HeritageMarketplacePage() {
  const heritageWorkers = WORKERS.filter((w) => w.isHeritageSkill);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Premium Hero Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-[#3a2012] to-amber-950 text-amber-100 p-8 sm:p-12 rounded-3xl border border-amber-600/30 shadow-2xl space-y-4 relative overflow-hidden">
        <div className="flex items-center gap-2">
          <span className="bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <Award className="w-4 h-4" /> Ministry of Craft & Heritage Guild
          </span>
          <span className="text-xs text-amber-200">State Awardee Master Artisans</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-amber-50 leading-tight">
          Heritage Artisanal Crafts Marketplace
        </h1>
        <p className="text-xs sm:text-sm text-amber-200/80 max-w-2xl leading-relaxed">
          Preserving India's sacred craft traditions. Hire master artisans for heritage teak wood carving, lime-wash eco wall plaster, and rosewood inlay work directly through SahakarSeva.
        </p>
      </div>

      {/* Grid of Heritage Artisan Story Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {heritageWorkers.map((artisan) => (
          <motion.div
            key={artisan.id}
            whileHover={{ y: -6 }}
            className="bg-white dark:bg-[#15241d] rounded-3xl border-2 border-amber-500/30 shadow-xl overflow-hidden flex flex-col justify-between"
          >
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <img
                  src={artisan.avatar}
                  alt={artisan.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-500 shadow-md"
                />
                <div className="text-right">
                  <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full inline-block mb-1">
                    Master Craftsman
                  </span>
                  <div className="text-lg font-extrabold text-[#133e2b] dark:text-emerald-300">
                    ₹{artisan.hourlyRate}/hr
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#133e2b] dark:text-emerald-300 font-serif">
                  {artisan.name}
                </h3>
                <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#c85a32]" />
                  <span>{artisan.locality} ({artisan.experienceYears} Years Master Craft Exp)</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                <TrustBadge type="heritage" size="md" />
                <TrustBadge type="verified" size="md" />
              </div>

              <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed italic bg-amber-50 dark:bg-amber-950/40 p-3 rounded-xl border border-amber-200 dark:border-amber-800">
                "{artisan.bio}"
              </p>

              {/* Special Skill Tags */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Mastered Heritage Techniques
                </span>
                <div className="flex flex-wrap gap-1">
                  {artisan.skills.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 px-2 py-0.5 rounded font-semibold"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Card Footer */}
            <div className="p-6 pt-0 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div className="text-xs font-bold text-amber-600 flex items-center gap-1">
                <Star className="w-4 h-4 fill-current" />
                <span>★ {artisan.rating} ({artisan.reviewCount} reviews)</span>
              </div>

              <Link
                href={`/booking?workerId=${artisan.id}`}
                className="bg-amber-800 hover:bg-amber-900 text-white px-4 py-2 rounded-xl text-xs font-extrabold shadow-md transition flex items-center gap-1"
              >
                <span>Commission Craft</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import TrustBadge from "@/components/ui/TrustBadge";
import { WORKERS } from "@/lib/mockData";
import { Award, Star, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HeritageMarketplacePage() {
  const heritageWorkers = WORKERS.filter((w) => w.isHeritageSkill);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Editorial Craft Header Banner */}
      <div className="bg-[#1f1610] text-[#fdf4e8] p-8 sm:p-12 rounded-3xl border border-[#523d24] shadow-elevated space-y-4 relative overflow-hidden">
        <div className="flex items-center gap-2">
          <span className="bg-[#855b16] text-[#ffffff] text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" /> Ministry of Craft & NCCT Heritage Guild
          </span>
          <span className="text-xs text-[#dec08a]">Preserving Hereditary Master Techniques</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-[#ffffff] leading-tight">
          Heritage Artisanal Crafts Marketplace
        </h1>
        <p className="text-xs sm:text-sm text-[#dec08a] max-w-2xl leading-relaxed">
          Preserving India's living architectural traditions. Commission master craftsmen for teak wood carving, eco-lime plaster restoration, and rosewood inlay cabinetry directly through our cooperative guild.
        </p>
      </div>

      {/* Grid of Heritage Artisan Story Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {heritageWorkers.map((artisan) => (
          <motion.div
            key={artisan.id}
            whileHover={{ y: -4 }}
            className="bg-[#ffffff] dark:bg-[#13221b] rounded-3xl border border-[#eedbc2] dark:border-[#523d24] shadow-soft overflow-hidden flex flex-col justify-between"
          >
            <div className="p-6 sm:p-7 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <img
                  src={artisan.avatar}
                  alt={artisan.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-[#855b16] shadow-xs"
                />
                <div className="text-right">
                  <span className="text-[10px] font-bold text-[#855b16] bg-[#fdf4e8] border border-[#eedbc2] px-2.5 py-0.5 rounded-full inline-block mb-1">
                    Master Craftsman
                  </span>
                  <div className="text-lg font-extrabold text-[#14221b] dark:text-[#edebe4]">
                    ₹{artisan.hourlyRate}/hr
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#14221b] dark:text-[#edebe4] font-serif">
                  {artisan.name}
                </h3>
                <div className="text-xs text-[#7c8d82] flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#a84422]" />
                  <span>{artisan.locality} ({artisan.experienceYears} Yrs Hereditary Practice)</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                <TrustBadge type="heritage" size="md" />
                <TrustBadge type="verified" size="md" />
              </div>

              <p className="text-xs text-[#506155] dark:text-[#a3b8ac] leading-relaxed italic bg-[#fdf4e8] dark:bg-[#2d2214] p-3.5 rounded-2xl border border-[#eedbc2] dark:border-[#523d24]">
                "{artisan.bio}"
              </p>

              {/* Mastered Heritage Techniques */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7c8d82]">
                  Mastered Traditional Disciplines
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {artisan.skills.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] bg-[#fdf4e8] dark:bg-[#2d2214] text-[#855b16] dark:text-[#dec08a] border border-[#eedbc2] dark:border-[#523d24] px-2.5 py-0.5 rounded-md font-semibold"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="p-6 pt-0 border-t border-[#ede9e1] dark:border-[#233b2e] flex items-center justify-between">
              <div className="text-xs font-bold text-[#855b16] flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>★ {artisan.rating} ({artisan.reviewCount} reviews)</span>
              </div>

              <Link
                href={`/booking?workerId=${artisan.id}`}
                className="bg-[#193927] hover:bg-[#224c34] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-1.5"
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

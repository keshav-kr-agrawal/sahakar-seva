"use client";

import React from "react";
import Link from "next/link";
import TrustBadge from "@/components/ui/TrustBadge";
import { WORKERS } from "@/lib/mockData";
import { Award, Star, MapPin, ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function HeritageMarketplacePage() {
  const heritageWorkers = WORKERS.filter((w) => w.isHeritageSkill);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-white text-slate-900">
      
      {/* Back Link */}
      <Link
        href="/services"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to All Services</span>
      </Link>

      {/* Editorial Craft Header Banner */}
      <div className="bg-slate-950 text-white p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-elevated space-y-4">
        <div className="flex items-center gap-2">
          <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider border border-slate-700">
            <Award className="w-3.5 h-3.5" /> Traditional Artisan Guild
          </span>
          <span className="text-xs text-slate-400">Preserving Hereditary Master Techniques</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Heritage Artisanal Crafts Marketplace
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
          Preserving India&apos;s living architectural traditions. Commission master craftsmen for teak wood carving, eco-lime plaster restoration, and rosewood inlay cabinetry directly through our cooperative guild.
        </p>
      </div>

      {/* Grid of Heritage Artisan Story Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {heritageWorkers.map((artisan) => (
          <motion.div
            key={artisan.id}
            whileHover={{ y: -4 }}
            className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden flex flex-col justify-between"
          >
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <img
                  src={artisan.avatar}
                  alt={artisan.name}
                  className="w-20 h-20 rounded-2xl object-cover border border-slate-200 shadow-xs"
                />
                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-full inline-block mb-1">
                    Master Craftsman
                  </span>
                  <div className="text-lg font-black text-slate-900 font-mono">
                    ₹{artisan.hourlyRate}/hr
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900">
                  {artisan.name}
                </h3>
                <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{artisan.locality} ({artisan.experienceYears} Yrs Practice)</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-100">
                  e-Shram Verified
                </span>
                <span className="text-[11px] font-bold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200">
                  Master Guild Member
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed italic bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                &quot;{artisan.bio}&quot;
              </p>

              {/* Mastered Heritage Techniques */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Mastered Disciplines
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {artisan.skills.map((s) => (
                    <span
                      key={s}
                      className="text-[11px] bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-md font-semibold"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-slate-900" />
                <span>★ {artisan.rating} ({artisan.reviewCount} reviews)</span>
              </div>

              <Link
                href={`/booking?workerId=${artisan.id}`}
                className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-1.5"
              >
                <span>Commission Pro</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

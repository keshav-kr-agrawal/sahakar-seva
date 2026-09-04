"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { WORKERS } from "@/lib/mockData";
import TrustBadge from "@/components/ui/TrustBadge";
import WageLedgerCard from "@/components/ui/WageLedgerCard";
import {
  MapPin,
  Star,
  ShieldCheck,
  Calendar,
  Clock,
  CheckCircle2,
  Award,
  Heart,
  Phone,
  MessageSquare,
  ArrowLeft,
  ChevronRight,
  HardHat
} from "lucide-react";
import { motion } from "framer-motion";

export default function WorkerProfilePage() {
  const params = useParams();
  const router = useRouter();
  const workerId = params.id as string;
  const { setSelectedWorkerForBooking, showToast } = useApp();

  const worker = WORKERS.find((w) => w.id === workerId) || WORKERS[0];
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("10:30 AM");
  const [selectedDay, setSelectedDay] = useState("Today");

  const timeSlots = ["09:00 AM", "10:30 AM", "01:30 PM", "04:00 PM", "06:30 PM"];
  const days = ["Today", "Tomorrow", "Saturday", "Sunday"];

  const handleProceedToBooking = () => {
    setSelectedWorkerForBooking(worker);
    showToast("Booking Initiated", `Selected ${worker.name} for ${selectedDay} at ${selectedTimeSlot}`);
    router.push(`/booking?workerId=${worker.id}&date=${selectedDay}&slot=${encodeURIComponent(selectedTimeSlot)}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back Button */}
      <Link
        href="/services"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#133e2b] dark:text-emerald-400 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Service Guild Marketplace</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Left Column: Worker Profile & Credentials */}
        <div className="lg:col-span-7 space-y-8">
          {/* Header Hero Card */}
          <div className="bg-white dark:bg-[#15241d] rounded-3xl p-6 sm:p-8 border border-[#133e2b]/15 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="relative">
                <img
                  src={worker.avatar}
                  alt={worker.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-[#2d7a52] shadow-md"
                />
                <span className="absolute -bottom-2 -right-2 bg-[#133e2b] text-white text-xs font-extrabold px-2 py-0.5 rounded-full border-2 border-white">
                  Tier {worker.verificationTier}
                </span>
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f241a] dark:text-emerald-100 font-serif">
                    {worker.name}
                  </h1>
                  <span className="text-xl font-extrabold text-[#2d7a52]">₹{worker.hourlyRate}/hr</span>
                </div>

                {worker.coopRole && (
                  <div className="text-xs font-bold text-[#c85a32] flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    <span>{worker.coopRole}</span>
                  </div>
                )}

                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <span className="flex items-center gap-1 text-[#c85a32] font-semibold">
                    <MapPin className="w-3.5 h-3.5" />
                    {worker.locality} ({worker.distanceKm} km away)
                  </span>
                  <span>•</span>
                  <span>{worker.experienceYears} Years Exp</span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  <TrustBadge type="verified" size="md" />
                  {worker.isWomenSafe && <TrustBadge type="women_safe" size="md" />}
                  {worker.isHeritageSkill && <TrustBadge type="heritage" size="md" />}
                  <TrustBadge type="coop_owned" size="md" />
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed bg-[#f4efe8]/50 dark:bg-emerald-950/40 p-4 rounded-2xl border border-[#133e2b]/10 italic">
              "{worker.bio}"
            </p>

            {/* Performance KPIs Grid */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-[#f4efe8] dark:bg-emerald-950/80 p-3 rounded-xl text-center space-y-0.5">
                <div className="text-sm font-extrabold text-amber-600">★ {worker.rating}</div>
                <div className="text-[10px] text-muted-foreground">{worker.reviewCount} Ratings</div>
              </div>
              <div className="bg-[#f4efe8] dark:bg-emerald-950/80 p-3 rounded-xl text-center space-y-0.5">
                <div className="text-sm font-extrabold text-[#133e2b] dark:text-emerald-300">{worker.jobsCompleted}+</div>
                <div className="text-[10px] text-muted-foreground">Jobs Completed</div>
              </div>
              <div className="bg-[#f4efe8] dark:bg-emerald-950/80 p-3 rounded-xl text-center space-y-0.5">
                <div className="text-sm font-extrabold text-emerald-600">{worker.onTimeRate}%</div>
                <div className="text-[10px] text-muted-foreground">On-Time Arrival</div>
              </div>
            </div>
          </div>

          {/* Skill Certificates & Verified Badges */}
          <div className="bg-white dark:bg-[#15241d] rounded-3xl p-6 border border-[#133e2b]/15 shadow-md space-y-4">
            <h3 className="text-lg font-bold text-[#133e2b] dark:text-emerald-300 font-serif flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#2d7a52]" />
              <span>Verified Skill Certificates & Guild Credentials</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {worker.skills.map((skill) => (
                <div
                  key={skill}
                  className="p-3 bg-[#e8f4ed]/50 dark:bg-emerald-950/50 rounded-xl border border-[#133e2b]/10 flex items-center gap-2 text-xs font-semibold text-[#133e2b] dark:text-emerald-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#2d7a52] shrink-0" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Transparent Wage Ledger for this worker */}
          <WageLedgerCard totalAmount={worker.hourlyRate * 2} workerName={worker.name} />
        </div>

        {/* Right Sticky Column: Interactive Booking Widget */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-[#15241d] rounded-3xl p-6 border border-[#133e2b]/20 shadow-2xl space-y-6 sticky top-24">
            <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
              <span className="text-[11px] font-bold text-[#c85a32] uppercase tracking-wider bg-[#fceee9] px-2.5 py-0.5 rounded-full">
                Instant Coop Dispatch
              </span>
              <h3 className="text-xl font-bold text-[#133e2b] dark:text-emerald-300 font-serif mt-1">
                Book {worker.name}
              </h3>
            </div>

            {/* Select Day */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1">
                <Calendar className="w-4 h-4 text-[#2d7a52]" />
                <span>Select Date</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {days.map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDay(d)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition border ${
                      selectedDay === d
                        ? "bg-[#133e2b] text-white border-[#133e2b]"
                        : "bg-[#f4efe8] dark:bg-emerald-950/60 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:bg-[#e8f4ed]"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Select Time Slot */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1">
                <Clock className="w-4 h-4 text-[#2d7a52]" />
                <span>Select Arrival Time Slot</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`py-2 px-2 rounded-xl text-[11px] font-bold transition border ${
                      selectedTimeSlot === slot
                        ? "bg-[#c85a32] text-white border-[#c85a32]"
                        : "bg-[#f4efe8] dark:bg-emerald-950/60 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:bg-[#e8f4ed]"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Fare Summary Box */}
            <div className="p-4 bg-[#e8f4ed] dark:bg-emerald-950/80 rounded-2xl space-y-2 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Base Hourly Rate</span>
                <span className="font-bold text-[#133e2b] dark:text-emerald-300">₹{worker.hourlyRate}/hr</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Estimated Duration</span>
                <span className="font-bold text-[#133e2b] dark:text-emerald-300">1.5 Hours</span>
              </div>
              <div className="border-t border-[#133e2b]/15 pt-2 flex justify-between font-extrabold text-sm text-[#133e2b] dark:text-emerald-300">
                <span>Total Fare</span>
                <span>₹{Math.round(worker.hourlyRate * 1.5)}</span>
              </div>
              <div className="text-[10px] text-emerald-800 dark:text-emerald-400 font-semibold pt-1">
                ✓ 82% (₹{Math.round(worker.hourlyRate * 1.5 * 0.82)}) directly transfers to worker bank account.
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="space-y-2">
              <button
                onClick={handleProceedToBooking}
                className="w-full bg-[#133e2b] hover:bg-[#1e5338] text-white py-3.5 rounded-xl font-extrabold text-sm shadow-xl transition flex items-center justify-center gap-2"
              >
                <span>Proceed to Wage Ledger Booking</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-muted-foreground text-center">
                Free cancellation up to 30 mins before arrival. 100% money-back guarantee.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

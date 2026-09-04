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
      {/* Back Link */}
      <Link
        href="/services"
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#193927] dark:text-[#8caea0] hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Service Guild Marketplace</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Left Column: Worker Profile & Verified Credentials */}
        <div className="lg:col-span-7 space-y-8">
          {/* Header Card */}
          <div className="bg-[#ffffff] dark:bg-[#13221b] rounded-3xl p-6 sm:p-8 border border-[#e2ded4] dark:border-[#233b2e] shadow-soft space-y-6">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="relative">
                <img
                  src={worker.avatar}
                  alt={worker.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-2 border-[#224c34] shadow-xs"
                />
                <span className="absolute -bottom-2 -right-2 bg-[#193927] text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border border-[#ffffff]">
                  Tier {worker.verificationTier}
                </span>
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14221b] dark:text-[#edebe4] font-serif">
                    {worker.name}
                  </h1>
                  <span className="text-xl font-extrabold text-[#193927] dark:text-[#8caea0]">
                    ₹{worker.hourlyRate}/hr
                  </span>
                </div>

                {worker.coopRole && (
                  <div className="text-xs font-bold text-[#a84422] flex items-center gap-1.5">
                    <Award className="w-4 h-4" />
                    <span>{worker.coopRole}</span>
                  </div>
                )}

                <div className="text-xs text-[#7c8d82] flex items-center gap-2">
                  <span className="flex items-center gap-1 text-[#a84422] font-semibold">
                    <MapPin className="w-3.5 h-3.5" />
                    {worker.locality} ({worker.distanceKm} km away)
                  </span>
                  <span>•</span>
                  <span>{worker.experienceYears} Years Verified Exp</span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  <TrustBadge type="verified" size="md" />
                  {worker.isWomenSafe && <TrustBadge type="women_safe" size="md" />}
                  {worker.isHeritageSkill && <TrustBadge type="heritage" size="md" />}
                  <TrustBadge type="coop_owned" size="md" />
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#506155] dark:text-[#a3b8ac] leading-relaxed bg-[#f9f7f2] dark:bg-[#182c22] p-4 rounded-2xl border border-[#ede9e1] dark:border-[#244230] italic">
              "{worker.bio}"
            </p>

            {/* Performance KPIs Grid */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              <div className="bg-[#f4f0e8] dark:bg-[#182c22] p-3.5 rounded-2xl text-center space-y-0.5">
                <div className="text-base font-extrabold text-[#855b16]">★ {worker.rating}</div>
                <div className="text-[11px] text-[#7c8d82]">{worker.reviewCount} Ratings</div>
              </div>
              <div className="bg-[#f4f0e8] dark:bg-[#182c22] p-3.5 rounded-2xl text-center space-y-0.5">
                <div className="text-base font-extrabold text-[#193927] dark:text-[#8caea0]">{worker.jobsCompleted}+</div>
                <div className="text-[11px] text-[#7c8d82]">Jobs Completed</div>
              </div>
              <div className="bg-[#f4f0e8] dark:bg-[#182c22] p-3.5 rounded-2xl text-center space-y-0.5">
                <div className="text-base font-extrabold text-[#224c34] dark:text-[#a3c9b4]">{worker.onTimeRate}%</div>
                <div className="text-[11px] text-[#7c8d82]">On-Time Arrival</div>
              </div>
            </div>
          </div>

          {/* Skill Certificates & Verified Badges */}
          <div className="bg-[#ffffff] dark:bg-[#13221b] rounded-3xl p-6 sm:p-7 border border-[#e2ded4] dark:border-[#233b2e] shadow-soft space-y-4">
            <h3 className="text-lg font-bold text-[#14221b] dark:text-[#edebe4] font-serif flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#224c34]" />
              <span>Verified Skill Certificates & Guild Credentials</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {worker.skills.map((skill) => (
                <div
                  key={skill}
                  className="p-3 bg-[#f0f5f2] dark:bg-[#152a1e] rounded-xl border border-[#c5d7cc] dark:border-[#2a4e39] flex items-center gap-2 text-xs font-semibold text-[#193927] dark:text-[#dce8e1]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#2d6243] shrink-0" />
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
          <div className="bg-[#ffffff] dark:bg-[#13221b] rounded-3xl p-6 sm:p-7 border border-[#e2ded4] dark:border-[#233b2e] shadow-elevated space-y-6 sticky top-28">
            <div className="border-b border-[#ede9e1] dark:border-[#233b2e] pb-4">
              <span className="text-[10px] font-bold text-[#a84422] uppercase tracking-wider bg-[#f6e8e2] px-2.5 py-0.5 rounded-full">
                Instant Cooperative Dispatch
              </span>
              <h3 className="text-xl font-bold text-[#14221b] dark:text-[#edebe4] font-serif mt-1">
                Book {worker.name}
              </h3>
            </div>

            {/* Select Day */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#14221b] dark:text-[#edebe4] flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#224c34]" />
                <span>Select Service Date</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {days.map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDay(d)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition border ${
                      selectedDay === d
                        ? "bg-[#193927] text-white border-[#193927]"
                        : "bg-[#f4f0e8] dark:bg-[#182c22] text-[#506155] dark:text-[#a3b8ac] border-[#ede9e1] hover:bg-[#e8f0ea]"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Select Time Slot */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#14221b] dark:text-[#edebe4] flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#224c34]" />
                <span>Select Arrival Window</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`py-2 px-2 rounded-xl text-[11px] font-bold transition border ${
                      selectedTimeSlot === slot
                        ? "bg-[#a84422] text-white border-[#a84422]"
                        : "bg-[#f4f0e8] dark:bg-[#182c22] text-[#506155] dark:text-[#a3b8ac] border-[#ede9e1] hover:bg-[#e8f0ea]"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Fare Summary Box */}
            <div className="p-4 bg-[#f0f5f2] dark:bg-[#152a1e] rounded-2xl border border-[#c5d7cc] dark:border-[#2a4e39] space-y-2 text-xs">
              <div className="flex justify-between text-[#506155] dark:text-[#a3b8ac]">
                <span>Base Hourly Tariff</span>
                <span className="font-bold text-[#193927] dark:text-[#8caea0]">₹{worker.hourlyRate}/hr</span>
              </div>
              <div className="flex justify-between text-[#506155] dark:text-[#a3b8ac]">
                <span>Estimated Service Duration</span>
                <span className="font-bold text-[#193927] dark:text-[#8caea0]">1.5 Hours</span>
              </div>
              <div className="border-t border-[#c5d7cc] dark:border-[#2a4e39] pt-2 flex justify-between font-extrabold text-sm text-[#193927] dark:text-[#edebe4]">
                <span>Total Service Fare</span>
                <span>₹{Math.round(worker.hourlyRate * 1.5)}</span>
              </div>
              <div className="text-[10px] text-[#224c34] dark:text-[#a3c9b4] font-semibold pt-0.5">
                ✓ 82% (₹{Math.round(worker.hourlyRate * 1.5 * 0.82)}) directly transfers to {worker.name}'s cooperative bank account.
              </div>
            </div>

            {/* Action CTA Button */}
            <div className="space-y-2">
              <button
                onClick={handleProceedToBooking}
                className="w-full bg-[#193927] hover:bg-[#224c34] text-white py-3.5 rounded-2xl font-bold text-xs shadow-soft transition flex items-center justify-center gap-2"
              >
                <span>Proceed to Wage Ledger Booking</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-[#7c8d82] text-center">
                Free cancellation up to 30 mins before arrival. 100% money-back guarantee.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

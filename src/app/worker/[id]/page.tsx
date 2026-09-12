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
  HardHat,
  Umbrella,
} from "lucide-react";

export default function WorkerProfilePage() {
  const params = useParams();
  const router = useRouter();
  const workerId = params.id as string;
  const { setSelectedWorkerForBooking, showToast } = useApp();

  const worker = WORKERS.find((w) => w.id === workerId) || WORKERS[0];
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("15-Min Arrival");
  const [selectedDay, setSelectedDay] = useState("Today");

  const timeSlots = ["15-Min Arrival", "10:30 AM", "01:30 PM", "04:00 PM", "06:30 PM"];
  const days = ["Today", "Tomorrow", "Saturday", "Sunday"];

  const handleProceedToBooking = () => {
    setSelectedWorkerForBooking(worker);
    showToast("Booking Initiated", `Selected ${worker.name} for ${selectedDay} (${selectedTimeSlot})`);
    router.push(`/booking?workerId=${worker.id}&date=${selectedDay}&slot=${encodeURIComponent(selectedTimeSlot)}`);
  };

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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Left Column: Worker Profile & Verified Credentials */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Header Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="relative shrink-0">
                <img
                  src={worker.avatar}
                  alt={worker.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border border-slate-200 shadow-xs"
                />
                <span className="absolute -bottom-2 -right-2 bg-slate-900 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full border border-white">
                  Tier {worker.verificationTier}
                </span>
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {worker.name}
                  </h1>
                  <span className="text-xl font-black text-slate-900 font-mono">
                    ₹{worker.hourlyRate}<span className="text-xs font-normal text-slate-500">/hr</span>
                  </span>
                </div>

                {worker.coopRole && (
                  <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-slate-800" />
                    <span>{worker.coopRole}</span>
                  </div>
                )}

                <div className="text-xs text-slate-500 flex items-center gap-2">
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {worker.locality} ({worker.distanceKm} km away)
                  </span>
                  <span>•</span>
                  <span>{worker.experienceYears} Years Verified Exp</span>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-100 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> e-Shram UAN Verified
                  </span>
                  {worker.isWomenSafe && (
                    <span className="text-[11px] font-bold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200">
                      Women-Safe Verified
                    </span>
                  )}
                  <span className="text-[11px] font-bold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200">
                    GNN Trust: 94/100
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100 italic">
              &quot;{worker.bio}&quot;
            </p>

            {/* Performance KPIs Grid */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              <div className="bg-slate-50 p-3.5 rounded-2xl text-center space-y-0.5 border border-slate-100">
                <div className="text-base font-black text-slate-900">★ {worker.rating}</div>
                <div className="text-[11px] text-slate-500">{worker.reviewCount} Ratings</div>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-2xl text-center space-y-0.5 border border-slate-100">
                <div className="text-base font-black text-slate-900">{worker.jobsCompleted}+</div>
                <div className="text-[11px] text-slate-500">Jobs Completed</div>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-2xl text-center space-y-0.5 border border-slate-100">
                <div className="text-base font-black text-slate-900">{worker.onTimeRate}%</div>
                <div className="text-[11px] text-slate-500">On-Time Arrival</div>
              </div>
            </div>
          </div>

          {/* Skill Certificates & Verified Badges */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-soft space-y-4">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-slate-900" />
              <span>Verified Skill Certificates & Guild Credentials</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {worker.skills.map((skill) => (
                <div
                  key={skill}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2 text-xs font-bold text-slate-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
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
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-elevated space-y-6 sticky top-24">
            <div className="border-b border-slate-100 pb-4">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full mb-1">
                <Clock className="w-3 h-3 text-slate-700" />
                <span>15-Minute Guaranteed Arrival</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Book {worker.name}
              </h3>
            </div>

            {/* Select Day */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-600" />
                <span>Select Service Date</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {days.map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDay(d)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition border cursor-pointer ${
                      selectedDay === d
                        ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Select Time Slot */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-600" />
                <span>Select Arrival Window</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`py-2 px-2 rounded-xl text-[11px] font-bold transition border cursor-pointer ${
                      selectedTimeSlot === slot
                        ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Fare Summary Box */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Base Hourly Tariff</span>
                <span className="font-bold text-slate-900 font-mono">₹{worker.hourlyRate}/hr</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Estimated Duration</span>
                <span className="font-bold text-slate-900 font-mono">1.5 Hours</span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between font-black text-sm text-slate-900">
                <span>Total Service Fare</span>
                <span className="font-mono">₹{Math.round(worker.hourlyRate * 1.5)}</span>
              </div>
              <div className="text-[10px] text-slate-600 font-semibold pt-0.5">
                ✓ 83% (₹{Math.round(worker.hourlyRate * 1.5 * 0.83)}) directly transfers to {worker.name}&apos;s account.
              </div>
            </div>

            {/* Action CTA Button */}
            <div className="space-y-2">
              <button
                onClick={handleProceedToBooking}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-xl font-bold text-xs shadow-soft transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Wage Ledger Checkout</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-slate-400 text-center">
                Free cancellation up to 30 mins before arrival. 100% money-back guarantee.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

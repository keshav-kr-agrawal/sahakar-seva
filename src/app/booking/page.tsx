"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { WORKERS, SERVICE_ADDONS, WorkerProfile } from "@/lib/mockData";
import WageLedgerCard from "@/components/ui/WageLedgerCard";
import TrustBadge from "@/components/ui/TrustBadge";
import { formatINR } from "@/lib/utils";
import confetti from "canvas-confetti";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Clock,
  ShieldCheck,
  Sparkles,
  CreditCard,
  QrCode,
  CheckCircle2,
  HardHat,
  MapPin,
  Plus
} from "lucide-react";
import { motion } from "framer-motion";

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const workerIdFromUrl = searchParams.get("workerId");

  const { selectedWorkerForBooking, setActiveBooking, showToast } = useApp();

  const initialWorker = WORKERS.find((w) => w.id === workerIdFromUrl) || selectedWorkerForBooking || WORKERS[0];
  const [selectedWorker, setSelectedWorker] = useState<WorkerProfile>(initialWorker);

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["add-1"]);
  const [scheduledDate, setScheduledDate] = useState("Today");
  const [scheduledTime, setScheduledTime] = useState("10:30 AM");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "cash">("upi");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const basePrice = selectedWorker.hourlyRate * 1.5;
  const addonsTotal = selectedAddons.reduce((acc, addonId) => {
    const addon = SERVICE_ADDONS.find((a) => a.id === addonId);
    return acc + (addon ? addon.price : 0);
  }, 0);
  const grandTotal = Math.round(basePrice + addonsTotal);

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const handleConfirmBooking = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setBookingSuccess(true);
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      const newBooking = {
        id: "SS-" + Math.floor(100000 + Math.random() * 900000),
        worker: selectedWorker,
        serviceCategory: selectedWorker.category,
        scheduledDate,
        scheduledTime,
        locality: selectedWorker.locality,
        totalAmount: grandTotal,
        workerPay: Math.round(grandTotal * 0.82),
        insurancePay: Math.round(grandTotal * 0.05),
        coopFundPay: Math.round(grandTotal * 0.08),
        platformFee: Math.round(grandTotal * 0.05),
        status: "en_route" as const,
        addons: selectedAddons,
      };

      setActiveBooking(newBooking);
      showToast("Booking Confirmed!", `Itemized receipt generated for ${selectedWorker.name}`);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-[#c85a32] uppercase tracking-wider bg-[#fceee9] px-3 py-1 rounded-full">
          Cooperative Transparent Booking
        </span>
        <h1 className="text-3xl font-extrabold text-[#0f241a] dark:text-emerald-100 font-serif">
          Schedule & Itemized Wage Booking
        </h1>
      </div>

      {/* Stepper Progress Bar */}
      <div className="flex items-center justify-between relative max-w-xl mx-auto">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 -z-10 -translate-y-1/2" />
        {[
          { step: 1, label: "Services" },
          { step: 2, label: "Worker" },
          { step: 3, label: "Schedule" },
          { step: 4, label: "Wage Ledger" },
          { step: 5, label: "Payment" },
        ].map((s) => {
          const isDone = currentStep > s.step;
          const isCurrent = currentStep === s.step;
          return (
            <div key={s.step} className="flex flex-col items-center gap-1 bg-[#faf8f5] dark:bg-[#0e1813] px-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${
                  isDone
                    ? "bg-[#2d7a52] text-white"
                    : isCurrent
                    ? "bg-[#133e2b] text-white ring-4 ring-[#e8f4ed]"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-500"
                }`}
              >
                {isDone ? <Check className="w-4 h-4" /> : s.step}
              </div>
              <span className={`text-[10px] font-semibold ${isCurrent ? "text-[#133e2b] dark:text-emerald-300 font-bold" : "text-muted-foreground"}`}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* STEP CONTENT CONTAINER */}
      <div className="bg-white dark:bg-[#15241d] rounded-3xl p-6 sm:p-8 border border-[#133e2b]/15 shadow-xl space-y-6">
        {/* STEP 1: SERVICE & ADD-ON BUNDLES */}
        {currentStep === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#133e2b] dark:text-emerald-300 font-serif">
                Select Service Add-ons & AI Coop Bundles
              </h2>
              <p className="text-xs text-muted-foreground">
                Combining add-on services reduces worker travel distance and unlocks coop bundle discounts.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SERVICE_ADDONS.map((addon) => {
                const isSelected = selectedAddons.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition flex items-start justify-between gap-3 ${
                      isSelected
                        ? "bg-[#e8f4ed] border-[#2d7a52] dark:bg-emerald-950/80"
                        : "bg-[#f4efe8]/50 border-gray-200 dark:border-gray-800 hover:border-gray-300"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-900 dark:text-gray-100">{addon.title}</span>
                        <span className="text-[10px] bg-[#c85a32] text-white px-1.5 py-0.2 rounded font-bold">
                          {addon.discountPercentage}% OFF
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground">{addon.description}</p>
                      <div className="text-xs font-extrabold text-[#133e2b] dark:text-emerald-400">
                        +₹{addon.price}
                      </div>
                    </div>

                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center border transition ${
                        isSelected ? "bg-[#2d7a52] text-white border-[#2d7a52]" : "border-gray-300"
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* STEP 2: WORKER SELECTOR */}
        {currentStep === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#133e2b] dark:text-emerald-300 font-serif">
                Confirm Service Worker
              </h2>
              <p className="text-xs text-muted-foreground">
                You can keep the matched worker or select another verified guild member.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {WORKERS.slice(0, 4).map((w) => {
                const isSelected = selectedWorker.id === w.id;
                return (
                  <div
                    key={w.id}
                    onClick={() => setSelectedWorker(w)}
                    className={`p-4 rounded-2xl border cursor-pointer transition flex items-center gap-4 ${
                      isSelected
                        ? "bg-[#e8f4ed] border-[#2d7a52] dark:bg-emerald-950/80"
                        : "bg-[#f4efe8]/50 border-gray-200 dark:border-gray-800"
                    }`}
                  >
                    <img src={w.avatar} alt={w.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-[#2d7a52]" />
                    <div className="flex-1 space-y-0.5">
                      <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100">{w.name}</h4>
                      <div className="text-[11px] text-muted-foreground">★ {w.rating} • {w.locality}</div>
                      <div className="text-xs font-extrabold text-[#2d7a52]">₹{w.hourlyRate}/hr</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* STEP 3: SCHEDULE DATE & TIME */}
        {currentStep === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#133e2b] dark:text-emerald-300 font-serif">
                Select Arrival Date & Time Slot
              </h2>
              <p className="text-xs text-muted-foreground">
                Guaranteed arrival within 15 minutes of your selected time slot.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Date</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["Today", "Tomorrow", "Saturday", "Sunday"].map((d) => (
                    <button
                      key={d}
                      onClick={() => setScheduledDate(d)}
                      className={`py-3 px-3 rounded-xl text-xs font-bold transition border ${
                        scheduledDate === d
                          ? "bg-[#133e2b] text-white border-[#133e2b]"
                          : "bg-[#f4efe8] text-gray-700 dark:bg-emerald-950/60 dark:text-gray-300"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Time Slot</label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {["09:00 AM", "10:30 AM", "01:30 PM", "04:00 PM", "06:30 PM"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setScheduledTime(t)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold transition border ${
                        scheduledTime === t
                          ? "bg-[#c85a32] text-white border-[#c85a32]"
                          : "bg-[#f4efe8] text-gray-700 dark:bg-emerald-950/60 dark:text-gray-300"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 4: ITEMIZED WAGE TRANSPARENCY LEDGER */}
        {currentStep === 4 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#133e2b] dark:text-emerald-300 font-serif">
                Verified Itemized Wage Transparency Ledger
              </h2>
              <p className="text-xs text-muted-foreground">
                Before paying, review exactly how your fare is distributed to {selectedWorker.name} and the cooperative safety pool.
              </p>
            </div>

            <WageLedgerCard totalAmount={grandTotal} workerName={selectedWorker.name} showComparison={true} />
          </motion.div>
        )}

        {/* STEP 5: MOCK PAYMENT & CONFIRMATION */}
        {currentStep === 5 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {!bookingSuccess ? (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-[#133e2b] dark:text-emerald-300 font-serif">
                    Select Payment Method
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Simulation payment mode — no real card or money will be deducted.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "upi", label: "UPI Instant QR", icon: <QrCode className="w-5 h-5 text-[#2d7a52]" /> },
                    { id: "card", label: "Debit/Credit Card", icon: <CreditCard className="w-5 h-5 text-sky-600" /> },
                    { id: "cash", label: "Cash After Service", icon: <HardHat className="w-5 h-5 text-amber-600" /> },
                  ].map((pm) => (
                    <button
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id as any)}
                      className={`p-4 rounded-2xl border text-center space-y-2 transition flex flex-col items-center ${
                        paymentMethod === pm.id
                          ? "bg-[#e8f4ed] border-[#2d7a52] dark:bg-emerald-950/80 font-bold"
                          : "bg-[#f4efe8]/50 border-gray-200 dark:border-gray-800"
                      }`}
                    >
                      {pm.icon}
                      <span className="text-xs">{pm.label}</span>
                    </button>
                  ))}
                </div>

                <div className="p-4 bg-[#f4efe8] dark:bg-emerald-950/60 rounded-2xl flex items-center justify-between text-sm">
                  <span>Grand Total (All Inclusive)</span>
                  <span className="text-xl font-extrabold text-[#133e2b] dark:text-emerald-300">
                    {formatINR(grandTotal)}
                  </span>
                </div>

                <button
                  onClick={handleConfirmBooking}
                  disabled={isProcessingPayment}
                  className="w-full bg-[#133e2b] hover:bg-[#1e5338] text-white py-4 rounded-2xl font-extrabold text-base shadow-xl transition flex items-center justify-center gap-2"
                >
                  {isProcessingPayment ? (
                    <span className="animate-pulse">Generating Wage Ledger & Confirming...</span>
                  ) : (
                    <>
                      <span>Pay {formatINR(grandTotal)} & Confirm Booking</span>
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            ) : (
              /* SUCCESS STATE */
              <div className="text-center py-8 space-y-6">
                <div className="w-20 h-20 rounded-full bg-[#e8f4ed] text-[#2d7a52] flex items-center justify-center mx-auto shadow-lg animate-bounce">
                  <CheckCircle2 className="w-12 h-12" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                    Booking Confirmed • Receipt Generated
                  </span>
                  <h2 className="text-3xl font-extrabold text-[#133e2b] dark:text-emerald-300 font-serif">
                    Worker Dispatch En Route!
                  </h2>
                  <p className="text-xs text-muted-foreground max-w-md mx-auto">
                    {selectedWorker.name} has accepted your booking for {scheduledDate} at {scheduledTime}.
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <button
                    onClick={() => router.push("/tracking")}
                    className="bg-[#c85a32] hover:bg-[#b24a24] text-white px-6 py-3 rounded-xl font-extrabold text-xs shadow-lg transition flex items-center gap-2"
                  >
                    <span>View Live GPS Tracking</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => router.push("/customer")}
                    className="bg-[#f4efe8] dark:bg-emerald-950 text-[#133e2b] dark:text-emerald-300 px-6 py-3 rounded-xl font-bold text-xs transition"
                  >
                    View My Dashboard
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* STEPPER NAV BUTTONS */}
        {!bookingSuccess && (
          <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 disabled:opacity-30 hover:bg-gray-100 flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentStep < 5 && (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="bg-[#133e2b] hover:bg-[#1e5338] text-white px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1 shadow-md transition"
              >
                <span>Continue Step {currentStep + 1}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-muted-foreground">Loading Booking Engine...</div>}>
      <BookingContent />
    </Suspense>
  );
}

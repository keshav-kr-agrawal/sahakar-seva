"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { WORKERS, SERVICE_ADDONS, WorkerProfile } from "@/lib/mockData";
import WageLedgerCard from "@/components/ui/WageLedgerCard";
import { formatINR } from "@/lib/utils";
import confetti from "canvas-confetti";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Clock,
  ShieldCheck,
  CreditCard,
  QrCode,
  CheckCircle2,
  HardHat,
  MapPin
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
        particleCount: 80,
        spread: 60,
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
    }, 1800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title Header */}
      <div className="text-center space-y-2">
        <span className="text-[10px] font-bold text-[#a84422] uppercase tracking-wider bg-[#f6e8e2] px-3 py-1 rounded-full">
          Cooperative Transparent Booking
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#14221b] dark:text-[#edebe4] font-serif">
          Schedule & Itemized Wage Booking
        </h1>
      </div>

      {/* Stepper Progress Bar */}
      <div className="flex items-center justify-between relative max-w-xl mx-auto">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#e2ded4] dark:bg-[#233b2e] -z-10 -translate-y-1/2" />
        {[
          { step: 1, label: "Services" },
          { step: 2, label: "Worker" },
          { step: 3, label: "Schedule" },
          { step: 4, label: "Wage Ledger" },
          { step: 5, label: "Confirmation" },
        ].map((s) => {
          const isDone = currentStep > s.step;
          const isCurrent = currentStep === s.step;
          return (
            <div key={s.step} className="flex flex-col items-center gap-1 bg-[#f9f7f2] dark:bg-[#0d1712] px-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${
                  isDone
                    ? "bg-[#224c34] text-white"
                    : isCurrent
                    ? "bg-[#193927] text-white ring-4 ring-[#dce8e1]"
                    : "bg-[#f4f0e8] text-[#7c8d82] border border-[#e2ded4]"
                }`}
              >
                {isDone ? <Check className="w-3.5 h-3.5" /> : s.step}
              </div>
              <span className={`text-[10px] font-semibold ${isCurrent ? "text-[#193927] dark:text-[#8caea0] font-bold" : "text-[#7c8d82]"}`}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Step Content Container */}
      <div className="bg-[#ffffff] dark:bg-[#13221b] rounded-3xl p-6 sm:p-8 border border-[#e2ded4] dark:border-[#233b2e] shadow-soft space-y-6">
        {/* STEP 1: SERVICE & ADD-ONS */}
        {currentStep === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#14221b] dark:text-[#edebe4] font-serif">
                Select Service Add-ons & Cooperative Bundles
              </h2>
              <p className="text-xs text-[#7c8d82] mt-0.5">
                Bundling multiple household check-ups reduces worker transit travel and unlocks direct discounts.
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
                        ? "bg-[#f0f5f2] border-[#224c34] dark:bg-[#152a1e]"
                        : "bg-[#f9f7f2] border-[#ede9e1] hover:border-[#d8d3c7]"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#14221b] dark:text-[#edebe4]">{addon.title}</span>
                        <span className="text-[10px] bg-[#f6e8e2] text-[#a84422] border border-[#e8cebe] px-1.5 py-0.2 rounded-full font-bold">
                          {addon.discountPercentage}% OFF
                        </span>
                      </div>
                      <p className="text-[11px] text-[#7c8d82]">{addon.description}</p>
                      <div className="text-xs font-extrabold text-[#193927] dark:text-[#8caea0]">
                        +₹{addon.price}
                      </div>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border transition ${
                        isSelected ? "bg-[#224c34] text-white border-[#224c34]" : "border-[#d8d3c7]"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
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
              <h2 className="text-xl font-bold text-[#14221b] dark:text-[#edebe4] font-serif">
                Confirm Assigned Cooperative Craftsman
              </h2>
              <p className="text-xs text-[#7c8d82] mt-0.5">
                Keep the matched neighborhood worker or choose another verified guild member.
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
                        ? "bg-[#f0f5f2] border-[#224c34] dark:bg-[#152a1e]"
                        : "bg-[#f9f7f2] border-[#ede9e1] hover:border-[#d8d3c7]"
                    }`}
                  >
                    <img src={w.avatar} alt={w.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-[#224c34]" />
                    <div className="flex-1 space-y-0.5">
                      <h4 className="text-xs font-bold text-[#14221b] dark:text-[#edebe4]">{w.name}</h4>
                      <div className="text-[11px] text-[#7c8d82]">★ {w.rating} • {w.locality}</div>
                      <div className="text-xs font-extrabold text-[#193927] dark:text-[#8caea0]">₹{w.hourlyRate}/hr</div>
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
              <h2 className="text-xl font-bold text-[#14221b] dark:text-[#edebe4] font-serif">
                Select Arrival Date & Window
              </h2>
              <p className="text-xs text-[#7c8d82] mt-0.5">
                Guaranteed arrival within 15 minutes of your selected time window.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#14221b] dark:text-[#edebe4]">Date</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["Today", "Tomorrow", "Saturday", "Sunday"].map((d) => (
                    <button
                      key={d}
                      onClick={() => setScheduledDate(d)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold transition border ${
                        scheduledDate === d
                          ? "bg-[#193927] text-white border-[#193927]"
                          : "bg-[#f4f0e8] text-[#506155] border-[#ede9e1] hover:bg-[#e8f0ea]"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[#14221b] dark:text-[#edebe4]">Time Window</label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {["09:00 AM", "10:30 AM", "01:30 PM", "04:00 PM", "06:30 PM"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setScheduledTime(t)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold transition border ${
                        scheduledTime === t
                          ? "bg-[#a84422] text-white border-[#a84422]"
                          : "bg-[#f4f0e8] text-[#506155] border-[#ede9e1] hover:bg-[#e8f0ea]"
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
              <h2 className="text-xl font-bold text-[#14221b] dark:text-[#edebe4] font-serif">
                Verified Itemized Wage Transparency Ledger
              </h2>
              <p className="text-xs text-[#7c8d82] mt-0.5">
                Before confirming, review the exact mathematical allocation of your fare to {selectedWorker.name} and the cooperative safety reserve.
              </p>
            </div>

            <WageLedgerCard totalAmount={grandTotal} workerName={selectedWorker.name} showComparison={true} />
          </motion.div>
        )}

        {/* STEP 5: PAYMENT METHOD & SUCCESS */}
        {currentStep === 5 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {!bookingSuccess ? (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-[#14221b] dark:text-[#edebe4] font-serif">
                    Select Payment Method
                  </h2>
                  <p className="text-xs text-[#7c8d82] mt-0.5">
                    Simulation demo mode — no actual charge will be executed.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "upi", label: "UPI Instant QR", icon: <QrCode className="w-5 h-5 text-[#224c34]" /> },
                    { id: "card", label: "Debit/Credit Card", icon: <CreditCard className="w-5 h-5 text-[#506155]" /> },
                    { id: "cash", label: "Cash After Service", icon: <HardHat className="w-5 h-5 text-[#855b16]" /> },
                  ].map((pm) => (
                    <button
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id as any)}
                      className={`p-4 rounded-2xl border text-center space-y-2 transition flex flex-col items-center ${
                        paymentMethod === pm.id
                          ? "bg-[#f0f5f2] border-[#224c34] dark:bg-[#152a1e] font-bold"
                          : "bg-[#f9f7f2] border-[#ede9e1]"
                      }`}
                    >
                      {pm.icon}
                      <span className="text-xs text-[#14221b] dark:text-[#edebe4]">{pm.label}</span>
                    </button>
                  ))}
                </div>

                <div className="p-4 bg-[#f4f0e8] dark:bg-[#182c22] rounded-2xl flex items-center justify-between text-sm">
                  <span className="text-[#506155] dark:text-[#a3b8ac]">Total Fare Payable (All Inclusive):</span>
                  <span className="text-xl font-extrabold text-[#193927] dark:text-[#8caea0]">
                    {formatINR(grandTotal)}
                  </span>
                </div>

                <button
                  onClick={handleConfirmBooking}
                  disabled={isProcessingPayment}
                  className="w-full bg-[#193927] hover:bg-[#224c34] text-white py-3.5 rounded-2xl font-bold text-sm shadow-soft transition flex items-center justify-center gap-2"
                >
                  {isProcessingPayment ? (
                    <span>Allocating Wage Ledger & Confirming...</span>
                  ) : (
                    <>
                      <span>Pay {formatINR(grandTotal)} & Generate Ledger</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            ) : (
              /* CONFIRMATION SUCCESS STATE */
              <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 rounded-full bg-[#f0f5f2] text-[#224c34] border border-[#c5d7cc] flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-[#224c34] bg-[#f0f5f2] border border-[#c5d7cc] px-3 py-1 rounded-full">
                    Booking Confirmed • Wage Ledger Active
                  </span>
                  <h2 className="text-3xl font-extrabold text-[#14221b] dark:text-[#edebe4] font-serif">
                    Worker Dispatch En Route!
                  </h2>
                  <p className="text-xs text-[#506155] dark:text-[#a3b8ac] max-w-md mx-auto">
                    {selectedWorker.name} has received and accepted your booking for {scheduledDate} at {scheduledTime}.
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 pt-3">
                  <button
                    onClick={() => router.push("/tracking")}
                    className="bg-[#a84422] hover:bg-[#8c381c] text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-xs transition flex items-center gap-2"
                  >
                    <span>View Live GPS Telemetry</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => router.push("/customer")}
                    className="bg-[#f4f0e8] hover:bg-[#e8f0ea] dark:bg-[#182c22] text-[#193927] dark:text-[#dce8e1] px-6 py-2.5 rounded-xl font-bold text-xs transition border border-[#ede9e1]"
                  >
                    View My Dashboard
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Stepper Navigation Controls */}
        {!bookingSuccess && (
          <div className="flex items-center justify-between pt-6 border-t border-[#ede9e1] dark:border-[#233b2e]">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-4 py-2 rounded-xl text-xs font-bold text-[#7c8d82] disabled:opacity-30 hover:bg-[#f4f0e8] flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentStep < 5 && (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="bg-[#193927] hover:bg-[#224c34] text-white px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs transition"
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
    <Suspense fallback={<div className="p-12 text-center text-xs text-[#7c8d82]">Loading Booking Engine...</div>}>
      <BookingContent />
    </Suspense>
  );
}

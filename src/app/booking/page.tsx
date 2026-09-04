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
  MapPin,
  Sparkles,
  Zap,
  Info,
  Award
} from "lucide-react";

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
  const [aiDiagnosedProblem, setAiDiagnosedProblem] = useState<string | null>(null);

  const basePrice = selectedWorker.hourlyRate * 1.5;
  const addonsTotal = selectedAddons.reduce((acc, addonId) => {
    const addon = SERVICE_ADDONS.find((a) => a.id === addonId);
    return acc + (addon ? addon.price : 0);
  }, 0);
  const grandTotal = Math.round(basePrice + addonsTotal);
  const workerDirectCut = Math.round(grandTotal * 0.82);

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const handleApplyDiagnosis = (issue: string, addonToSelect?: string) => {
    setAiDiagnosedProblem(issue);
    if (addonToSelect && !selectedAddons.includes(addonToSelect)) {
      setSelectedAddons([...selectedAddons, addonToSelect]);
    }
    showToast("AI Diagnostic Match", `Applied standard protocol for: "${issue}"`);
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
    }, 1400);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title Header */}
      <div className="text-center space-y-2">
        <span className="text-[11px] font-bold text-[#a84422] uppercase tracking-wider bg-[#f9ebe4] dark:bg-[#331d16] border border-[#edd2c6] dark:border-[#522b1e] px-3.5 py-1 rounded-full inline-block">
          Cooperative Transparent Booking
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#14221b] dark:text-[#edebe4] font-serif">
          Schedule & Itemized Wage Booking
        </h1>
        <p className="text-xs text-[#506155] dark:text-[#a3b8ac] max-w-lg mx-auto">
          Every booking directly allocates 82% to your craftsman, backed by the National Council for Cooperative Training.
        </p>
      </div>

      {/* Stepper Progress Bar */}
      <div className="flex items-center justify-between relative max-w-xl mx-auto">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#ded8cb] dark:bg-[#233b2e] -z-10 -translate-y-1/2" />
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
              <button
                onClick={() => setCurrentStep(s.step)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition cursor-pointer ${
                  isDone
                    ? "bg-[#193927] text-white"
                    : isCurrent
                    ? "bg-[#193927] text-white ring-4 ring-[#cbe1d3] dark:ring-[#234b34]"
                    : "bg-[#f4ece1] dark:bg-[#182c22] text-[#506155] dark:text-[#a3b8ac] border border-[#ded8cb] dark:border-[#233b2e] hover:bg-[#ede7dc]"
                }`}
              >
                {isDone ? <Check className="w-3.5 h-3.5" /> : s.step}
              </button>
              <span className={`text-[10px] font-semibold ${isCurrent ? "text-[#193927] dark:text-[#8caea0] font-bold" : "text-[#7c8d82]"}`}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Step Content Container */}
      <div className="bg-[#ffffff] dark:bg-[#13221b] rounded-3xl p-6 sm:p-8 border border-[#ded8cb] dark:border-[#233b2e] shadow-elevated space-y-6">
        
        {/* STEP 1: SERVICE & ADD-ONS */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="border-b border-[#ece6d9] dark:border-[#233b2e] pb-4">
              <span className="text-[10px] font-bold text-[#193927] dark:text-[#8caea0] uppercase tracking-wider bg-[#edf5f0] dark:bg-[#193225] px-2.5 py-0.5 rounded-full inline-block mb-1">
                Step 1 of 5
              </span>
              <h2 className="text-xl font-bold text-[#14221b] dark:text-[#edebe4] font-serif">
                Select Service Add-ons & Diagnostic Package
              </h2>
              <p className="text-xs text-[#7c8d82] mt-0.5">
                Bundling multiple household check-ups reduces worker transit travel and unlocks direct discounts.
              </p>
            </div>

            {/* AI Diagnostic Helper Simulation */}
            <div className="bg-[#f4ece1] dark:bg-[#1c2e23] p-4 rounded-2xl border border-[#ded8cb] dark:border-[#2c4a38] space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#193927] dark:text-[#9bc2ad]">
                <Sparkles className="w-4 h-4 text-[#a84422]" />
                <span>AI Problem Diagnostic Assistant (Cooperative Guild Engine)</span>
              </div>
              <p className="text-xs text-[#506155] dark:text-[#a3b8ac]">
                Not sure what the issue requires? Click a common symptom below for instant guidance:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  { label: "Frequent MCB Tripping / Spark", addon: "add-1" },
                  { label: "Low Water Pressure / Tap Drip", addon: "add-2" },
                  { label: "Full Electrical Safety Health-Check", addon: "add-3" },
                ].map((diag) => (
                  <button
                    key={diag.label}
                    onClick={() => handleApplyDiagnosis(diag.label, diag.addon)}
                    className="bg-[#ffffff] dark:bg-[#13221b] hover:bg-[#193927] hover:text-[#ffffff] dark:hover:bg-[#254c37] text-[#193927] dark:text-[#dce8e1] px-3 py-1.5 rounded-xl text-xs font-semibold border border-[#ded8cb] dark:border-[#2b4b37] transition shadow-xs"
                  >
                    ⚡ {diag.label}
                  </button>
                ))}
              </div>
              {aiDiagnosedProblem && (
                <div className="mt-2 text-xs text-[#224c34] dark:text-[#9bc2ad] bg-[#edf5f0] dark:bg-[#14261d] p-2.5 rounded-xl border border-[#c1d9cb] dark:border-[#244b36] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2d6243] shrink-0" />
                  <span>Diagnosed symptom active: <strong>"{aiDiagnosedProblem}"</strong></span>
                </div>
              )}
            </div>

            {/* Addons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SERVICE_ADDONS.map((addon) => {
                const isSelected = selectedAddons.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition flex items-start justify-between gap-3 ${
                      isSelected
                        ? "bg-[#edf5f0] border-[#193927] dark:bg-[#152a1e] dark:border-[#8caea0] shadow-xs"
                        : "bg-[#f9f7f2] dark:bg-[#182c22] border-[#ded8cb] dark:border-[#264432] hover:border-[#a84422]"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#14221b] dark:text-[#edebe4]">{addon.title}</span>
                        <span className="text-[10px] bg-[#f9ebe4] dark:bg-[#341d17] text-[#a84422] border border-[#edd2c6] dark:border-[#522b1e] px-1.5 py-0.2 rounded-full font-bold">
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
                        isSelected ? "bg-[#193927] text-white border-[#193927]" : "border-[#ded8cb]"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: WORKER SELECTOR */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="border-b border-[#ece6d9] dark:border-[#233b2e] pb-4">
              <span className="text-[10px] font-bold text-[#193927] dark:text-[#8caea0] uppercase tracking-wider bg-[#edf5f0] dark:bg-[#193225] px-2.5 py-0.5 rounded-full inline-block mb-1">
                Step 2 of 5
              </span>
              <h2 className="text-xl font-bold text-[#14221b] dark:text-[#edebe4] font-serif">
                Confirm Assigned Cooperative Craftsman
              </h2>
              <p className="text-xs text-[#7c8d82] mt-0.5">
                Keep the matched neighborhood worker or select another verified guild member.
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
                        ? "bg-[#edf5f0] border-[#193927] dark:bg-[#152a1e] dark:border-[#8caea0] shadow-xs"
                        : "bg-[#f9f7f2] dark:bg-[#182c22] border-[#ded8cb] dark:border-[#264432] hover:border-[#a84422]"
                    }`}
                  >
                    <img src={w.avatar} alt={w.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-[#193927]" />
                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-[#14221b] dark:text-[#edebe4]">{w.name}</h4>
                        <span className="text-[10px] font-bold text-[#193927] bg-[#ffffff] dark:bg-[#13221b] border border-[#ded8cb] px-1.5 py-0.2 rounded-md">
                          T{w.verificationTier}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#7c8d82]">★ {w.rating} • {w.locality}</div>
                      <div className="text-xs font-extrabold text-[#193927] dark:text-[#8caea0]">₹{w.hourlyRate}/hr</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: SCHEDULE DATE & TIME */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="border-b border-[#ece6d9] dark:border-[#233b2e] pb-4">
              <span className="text-[10px] font-bold text-[#193927] dark:text-[#8caea0] uppercase tracking-wider bg-[#edf5f0] dark:bg-[#193225] px-2.5 py-0.5 rounded-full inline-block mb-1">
                Step 3 of 5
              </span>
              <h2 className="text-xl font-bold text-[#14221b] dark:text-[#edebe4] font-serif">
                Select Arrival Date & Window
              </h2>
              <p className="text-xs text-[#7c8d82] mt-0.5">
                Guaranteed arrival within 15 minutes of your selected time window.
              </p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#14221b] dark:text-[#edebe4]">Date of Service</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {["Today", "Tomorrow", "Saturday", "Sunday"].map((d) => (
                    <button
                      key={d}
                      onClick={() => setScheduledDate(d)}
                      className={`py-3 px-3 rounded-xl text-xs font-bold transition border ${
                        scheduledDate === d
                          ? "bg-[#193927] text-white border-[#193927]"
                          : "bg-[#f4ece1] dark:bg-[#182c22] text-[#506155] dark:text-[#a3b8ac] border-[#ded8cb] dark:border-[#264432] hover:bg-[#ede7dc]"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[#14221b] dark:text-[#edebe4]">Preferred Arrival Time Window</label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {["09:00 AM", "10:30 AM", "01:30 PM", "04:00 PM", "06:30 PM"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setScheduledTime(t)}
                      className={`py-2.5 px-2 rounded-xl text-xs font-bold transition border ${
                        scheduledTime === t
                          ? "bg-[#a84422] text-white border-[#a84422]"
                          : "bg-[#f4ece1] dark:bg-[#182c22] text-[#506155] dark:text-[#a3b8ac] border-[#ded8cb] dark:border-[#264432] hover:bg-[#ede7dc]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: ITEMIZED WAGE TRANSPARENCY LEDGER */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="border-b border-[#ece6d9] dark:border-[#233b2e] pb-4">
              <span className="text-[10px] font-bold text-[#193927] dark:text-[#8caea0] uppercase tracking-wider bg-[#edf5f0] dark:bg-[#193225] px-2.5 py-0.5 rounded-full inline-block mb-1">
                Step 4 of 5
              </span>
              <h2 className="text-xl font-bold text-[#14221b] dark:text-[#edebe4] font-serif">
                Verified Itemized Wage Transparency Ledger
              </h2>
              <p className="text-xs text-[#7c8d82] mt-0.5">
                Before confirming, review the exact mathematical allocation of your fare to {selectedWorker.name} and the cooperative safety reserve.
              </p>
            </div>

            <WageLedgerCard totalAmount={grandTotal} workerName={selectedWorker.name} showComparison={true} />
          </div>
        )}

        {/* STEP 5: PAYMENT METHOD & SUCCESS */}
        {currentStep === 5 && (
          <div className="space-y-6">
            {!bookingSuccess ? (
              <div className="space-y-6">
                <div className="border-b border-[#ece6d9] dark:border-[#233b2e] pb-4">
                  <span className="text-[10px] font-bold text-[#193927] dark:text-[#8caea0] uppercase tracking-wider bg-[#edf5f0] dark:bg-[#193225] px-2.5 py-0.5 rounded-full inline-block mb-1">
                    Step 5 of 5
                  </span>
                  <h2 className="text-xl font-bold text-[#14221b] dark:text-[#edebe4] font-serif">
                    Select Payment Method & Authorize
                  </h2>
                  <p className="text-xs text-[#7c8d82] mt-0.5">
                    Simulation demo mode — no actual charge will be made to your account.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "upi", label: "UPI Instant QR", icon: <QrCode className="w-5 h-5 text-[#193927]" /> },
                    { id: "card", label: "Debit/Credit Card", icon: <CreditCard className="w-5 h-5 text-[#506155]" /> },
                    { id: "cash", label: "Cash After Service", icon: <HardHat className="w-5 h-5 text-[#855b16]" /> },
                  ].map((pm) => (
                    <button
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id as any)}
                      className={`p-4 rounded-2xl border text-center space-y-2 transition flex flex-col items-center ${
                        paymentMethod === pm.id
                          ? "bg-[#edf5f0] border-[#193927] dark:bg-[#152a1e] font-bold shadow-xs"
                          : "bg-[#f9f7f2] dark:bg-[#182c22] border-[#ded8cb] dark:border-[#264432]"
                      }`}
                    >
                      {pm.icon}
                      <span className="text-xs text-[#14221b] dark:text-[#edebe4]">{pm.label}</span>
                    </button>
                  ))}
                </div>

                {/* Total Summary Strip */}
                <div className="p-4 bg-[#f4ece1] dark:bg-[#1e2f24] rounded-2xl border border-[#ded8cb] dark:border-[#2b4b37] flex items-center justify-between text-sm">
                  <div>
                    <span className="text-[#506155] dark:text-[#a3b8ac] block text-xs">Total Fare (All Itemized Inclusions):</span>
                    <span className="text-[11px] text-[#224c34] dark:text-[#8caea0] font-bold">
                      Direct to {selectedWorker.name}: ₹{workerDirectCut} (82%)
                    </span>
                  </div>
                  <span className="text-2xl font-extrabold text-[#193927] dark:text-[#8caea0] font-serif">
                    {formatINR(grandTotal)}
                  </span>
                </div>

                <button
                  onClick={handleConfirmBooking}
                  disabled={isProcessingPayment}
                  className="w-full bg-[#193927] hover:bg-[#224c34] text-white py-4 rounded-2xl font-bold text-sm shadow-soft transition flex items-center justify-center gap-2"
                >
                  {isProcessingPayment ? (
                    <span>Allocating Wage Ledger & Dispatching...</span>
                  ) : (
                    <>
                      <span>Confirm & Authorize {formatINR(grandTotal)}</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            ) : (
              /* CONFIRMATION SUCCESS STATE */
              <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 rounded-full bg-[#edf5f0] text-[#193927] border border-[#cbe1d3] flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-[#193927] dark:text-[#8caea0] bg-[#edf5f0] dark:bg-[#193225] border border-[#cbe1d3] dark:border-[#244230] px-3.5 py-1 rounded-full inline-block">
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
                    className="bg-[#a84422] hover:bg-[#8c381c] text-white px-6 py-3 rounded-xl font-bold text-xs shadow-soft transition flex items-center gap-2"
                  >
                    <span>View Live GPS Telemetry</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => router.push("/customer")}
                    className="bg-[#f4ece1] hover:bg-[#ede7dc] dark:bg-[#182c22] text-[#193927] dark:text-[#dce8e1] px-6 py-3 rounded-xl font-bold text-xs transition border border-[#ded8cb] dark:border-[#264432]"
                  >
                    View Customer Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Stepper Navigation Controls */}
        {!bookingSuccess && (
          <div className="flex items-center justify-between pt-6 border-t border-[#ece6d9] dark:border-[#233b2e]">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-4 py-2 rounded-xl text-xs font-bold text-[#7c8d82] disabled:opacity-30 hover:bg-[#f4ece1] flex items-center gap-1 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentStep < 5 && (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="bg-[#193927] hover:bg-[#224c34] text-white px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition"
              >
                <span>Continue to Step {currentStep + 1}</span>
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

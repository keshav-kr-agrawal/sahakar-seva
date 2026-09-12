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
  Award,
  ArrowRight,
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
  const [scheduledTime, setScheduledTime] = useState("15-Min Arrival");
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
  const workerDirectCut = Math.round(grandTotal * 0.83);

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
        workerPay: Math.round(grandTotal * 0.83),
        insurancePay: Math.round(grandTotal * 0.05),
        coopFundPay: Math.round(grandTotal * 0.07),
        platformFee: Math.round(grandTotal * 0.05),
        status: "en_route" as const,
        addons: selectedAddons,
      };

      setActiveBooking(newBooking);
      showToast("Booking Confirmed!", `Itemized receipt generated for ${selectedWorker.name}`);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-white text-slate-900">
      
      {/* Page Title Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
          <span className="w-2 h-2 rounded-full bg-emerald-600" />
          <span>⚡ 15-Minute Instant Dispatch Available</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Schedule & Transparent Wage Booking
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Every booking guarantees 83%+ direct pay to your craftsman, with sovereign e-Shram verification and climate protection.
        </p>
      </div>

      {/* Stepper Progress Bar */}
      <div className="flex items-center justify-between relative max-w-xl mx-auto">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -z-10 -translate-y-1/2" />
        {[
          { step: 1, label: "Services" },
          { step: 2, label: "Worker" },
          { step: 3, label: "Schedule" },
          { step: 4, label: "Wage Ledger" },
          { step: 5, label: "Checkout" },
        ].map((s) => {
          const isDone = currentStep > s.step;
          const isCurrent = currentStep === s.step;
          return (
            <div key={s.step} className="flex flex-col items-center gap-1 bg-white px-2">
              <button
                onClick={() => setCurrentStep(s.step)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition cursor-pointer ${
                  isDone
                    ? "bg-slate-900 text-white"
                    : isCurrent
                    ? "bg-slate-900 text-white ring-4 ring-slate-200"
                    : "bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200"
                }`}
              >
                {isDone ? <Check className="w-3.5 h-3.5" /> : s.step}
              </button>
              <span className={`text-[10px] font-semibold ${isCurrent ? "text-slate-900 font-extrabold" : "text-slate-500"}`}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Step Content Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
        
        {/* STEP 1: SERVICE & ADD-ONS */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2.5 py-0.5 rounded-md inline-block mb-1">
                Step 1 of 5
              </span>
              <h2 className="text-xl font-black text-slate-900">
                Select Service Inclusions & Diagnostics
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Bundling multiple household check-ups reduces worker transit and unlocks direct discounts.
              </p>
            </div>

            {/* AI Diagnostic Helper */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <Sparkles className="w-4 h-4 text-slate-900" />
                <span>AI Problem Diagnostic Assistant</span>
              </div>
              <p className="text-xs text-slate-600">
                Not sure what the issue requires? Click a symptom below for instant guidance:
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
                    className="bg-white hover:bg-slate-900 hover:text-white text-slate-800 px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-200 transition cursor-pointer shadow-2xs"
                  >
                    ⚡ {diag.label}
                  </button>
                ))}
              </div>
              {aiDiagnosedProblem && (
                <div className="mt-2 text-xs text-slate-900 bg-white p-2.5 rounded-xl border border-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Diagnosed symptom active: <strong>&quot;{aiDiagnosedProblem}&quot;</strong></span>
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
                        ? "bg-slate-50 border-slate-900 shadow-2xs"
                        : "bg-white border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{addon.title}</span>
                        <span className="text-[10px] bg-slate-100 text-slate-800 px-1.5 py-0.2 rounded font-bold">
                          {addon.discountPercentage}% OFF
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">{addon.description}</p>
                      <div className="text-xs font-black text-slate-900 font-mono">
                        +₹{addon.price}
                      </div>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border transition ${
                        isSelected ? "bg-slate-900 text-white border-slate-900" : "border-slate-300"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                onClick={() => setCurrentStep(2)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-6 py-3 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Continue to Worker Selection</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: WORKER SELECTOR */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2.5 py-0.5 rounded-md inline-block mb-1">
                Step 2 of 5
              </span>
              <h2 className="text-xl font-black text-slate-900">
                Confirm Assigned Cooperative Craftsman
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Matched via Explainable AI based on skill certification (+0.32) and proximity (+0.15).
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
                        ? "bg-slate-50 border-slate-900 shadow-2xs"
                        : "bg-white border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <img src={w.avatar} alt={w.name} className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shrink-0" />
                    <div className="flex-1 space-y-0.5 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-black text-slate-900 truncate">{w.name}</h4>
                        <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-1.5 py-0.2 rounded shrink-0">
                          T{w.verificationTier}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500">★ {w.rating} • {w.locality}</div>
                      <div className="text-xs font-mono font-bold text-slate-900">₹{w.hourlyRate}/hr</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => setCurrentStep(1)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-4 py-3 rounded-xl transition flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-6 py-3 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Continue to Schedule</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SCHEDULE DATE & TIME */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2.5 py-0.5 rounded-md inline-block mb-1">
                Step 3 of 5
              </span>
              <h2 className="text-xl font-black text-slate-900">
                Select Arrival Date & Window
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Guaranteed arrival within 15 minutes of your selected time window.
              </p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-900">Date of Service</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {["Today", "Tomorrow", "Saturday", "Sunday"].map((d) => (
                    <button
                      key={d}
                      onClick={() => setScheduledDate(d)}
                      className={`py-3 px-3 rounded-xl text-xs font-bold transition border cursor-pointer ${
                        scheduledDate === d
                          ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-900">Preferred Arrival Time Window</label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {["15-Min Arrival", "10:30 AM", "01:30 PM", "04:00 PM", "06:30 PM"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setScheduledTime(t)}
                      className={`py-2.5 px-2 rounded-xl text-xs font-bold transition border cursor-pointer ${
                        scheduledTime === t
                          ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => setCurrentStep(2)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-4 py-3 rounded-xl transition flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-6 py-3 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Review Wage Ledger</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: ITEMIZED WAGE TRANSPARENCY LEDGER */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2.5 py-0.5 rounded-md inline-block mb-1">
                Step 4 of 5
              </span>
              <h2 className="text-xl font-black text-slate-900">
                Verified Itemized Wage Transparency Ledger
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Before confirming, review the exact mathematical allocation of your fare to {selectedWorker.name} and the cooperative safety reserve.
              </p>
            </div>

            <WageLedgerCard totalAmount={grandTotal} workerName={selectedWorker.name} showComparison={true} />

            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => setCurrentStep(3)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-4 py-3 rounded-xl transition flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setCurrentStep(5)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-6 py-3 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: PAYMENT METHOD & SUCCESS */}
        {currentStep === 5 && (
          <div className="space-y-6">
            {!bookingSuccess ? (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2.5 py-0.5 rounded-md inline-block mb-1">
                    Step 5 of 5
                  </span>
                  <h2 className="text-xl font-black text-slate-900">
                    Select Payment Method & Authorize
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Simulation demo mode — 100% itemized cryptographic ledger recording.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "upi", label: "UPI Instant QR", icon: <QrCode className="w-5 h-5 text-slate-900" /> },
                    { id: "card", label: "Debit/Credit Card", icon: <CreditCard className="w-5 h-5 text-slate-600" /> },
                    { id: "cash", label: "Cash After Service", icon: <HardHat className="w-5 h-5 text-slate-700" /> },
                  ].map((pm) => (
                    <button
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id as any)}
                      className={`p-4 rounded-2xl border text-center space-y-2 transition flex flex-col items-center cursor-pointer ${
                        paymentMethod === pm.id
                          ? "bg-slate-50 border-slate-900 font-bold shadow-xs"
                          : "bg-white border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {pm.icon}
                      <span className="text-xs text-slate-900 font-bold">{pm.label}</span>
                    </button>
                  ))}
                </div>

                {/* Total Summary Strip */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-sm">
                  <div>
                    <span className="text-slate-500 block text-xs">Total Fare (All Itemized Inclusions):</span>
                    <span className="text-[11px] text-slate-900 font-bold">
                      Direct to {selectedWorker.name}: ₹{workerDirectCut} (83%)
                    </span>
                  </div>
                  <span className="text-2xl font-black text-slate-900 font-mono">
                    {formatINR(grandTotal)}
                  </span>
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-4 py-3 rounded-xl transition flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    onClick={handleConfirmBooking}
                    disabled={isProcessingPayment}
                    className="bg-slate-900 hover:bg-slate-800 text-white py-3 px-8 rounded-xl font-bold text-xs shadow-soft transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isProcessingPayment ? (
                      <span>Allocating Wage Ledger & Dispatching...</span>
                    ) : (
                      <>
                        <span>Confirm & Dispatch Pro {formatINR(grandTotal)}</span>
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              /* CONFIRMATION SUCCESS STATE */
              <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-900 border border-slate-300 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-800 bg-slate-100 border border-slate-200 px-3.5 py-1 rounded-full inline-block">
                    Booking Confirmed • Wage Ledger Active
                  </span>
                  <h2 className="text-3xl font-black text-slate-900">
                    Pro Dispatched & En Route!
                  </h2>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    {selectedWorker.name} has received and accepted your booking for {scheduledDate} ({scheduledTime}).
                  </p>
                </div>

                <div className="max-w-sm mx-auto p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2 text-left">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Service Category:</span>
                    <span className="font-bold text-slate-900">{selectedWorker.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Assigned Pro:</span>
                    <span className="font-bold text-slate-900">{selectedWorker.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Guaranteed Arrival:</span>
                    <span className="font-mono font-bold text-slate-900">14 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total Charged:</span>
                    <span className="font-mono font-bold text-slate-900">{formatINR(grandTotal)}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-2">
                    <span className="text-slate-500">Direct Pro Wage (83%):</span>
                    <span className="font-mono font-bold text-emerald-700">₹{workerDirectCut}</span>
                  </div>
                </div>

                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={() => router.push("/tracking")}
                    className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold text-xs shadow-soft transition flex items-center gap-2 cursor-pointer"
                  >
                    <span>Track 15-Minute Dispatch Live</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => router.push("/")}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-5 py-3 rounded-xl font-bold text-xs transition cursor-pointer"
                  >
                    Home
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-500">Loading Checkout Console...</div>}>
      <BookingContent />
    </Suspense>
  );
}

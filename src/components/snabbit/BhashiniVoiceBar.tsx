"use client";

import React, { useState } from "react";
import { Mic, MicOff, Volume2, Sparkles, Check, ArrowRight, Languages } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function BhashiniVoiceBar() {
  const { showToast, addToCart } = useApp();
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<"hi" | "kn" | "ta" | "en">("hi");
  const [recognizedText, setRecognizedText] = useState("");

  const sampleVoicePrompts: Record<string, { query: string; intent: string; actionItem: any }> = {
    hi: {
      query: "Mujhe 2 ghante ke liye handyman chahiye",
      intent: "Book 2-Hour Handyman Block (₹299)",
      actionItem: {
        id: "block-2hr",
        title: "2-Hour Handyman",
        price: 299,
        category: "Instahelp Block",
        etaMinutes: 15,
        unitType: "instahelp" as const,
        workerPayout: 255,
      },
    },
    kn: {
      query: "Nannage eradu ghante electrician beku",
      intent: "Book 2-Hour Handyman Block (₹299)",
      actionItem: {
        id: "block-2hr",
        title: "2-Hour Handyman",
        price: 299,
        category: "Instahelp Block",
        etaMinutes: 15,
        unitType: "instahelp" as const,
        workerPayout: 255,
      },
    },
    ta: {
      query: "Enakku oru mani neram plumber thevai",
      intent: "Book 1-Hour Quick Fix (₹179)",
      actionItem: {
        id: "block-1hr",
        title: "1-Hour Quick Fix",
        price: 179,
        category: "Instahelp Block",
        etaMinutes: 12,
        unitType: "instahelp" as const,
        workerPayout: 150,
      },
    },
    en: {
      query: "Need an emergency electrician in 15 minutes",
      intent: "Book 1-Hour Quick Fix (₹179)",
      actionItem: {
        id: "block-1hr",
        title: "1-Hour Quick Fix",
        price: 179,
        category: "Instahelp Block",
        etaMinutes: 12,
        unitType: "instahelp" as const,
        workerPayout: 150,
      },
    },
  };

  const simulateVoiceRecognition = () => {
    setIsListening(true);
    setRecognizedText("");

    setTimeout(() => {
      const sample = sampleVoicePrompts[selectedLanguage];
      setRecognizedText(sample.query);
      setIsListening(false);
      showToast("Voice Recognized (BHASHINI)", `Detected intent: ${sample.intent}`);
    }, 1000);
  };

  const handleApplyVoiceOrder = () => {
    const sample = sampleVoicePrompts[selectedLanguage];
    addToCart(sample.actionItem);
    setRecognizedText("");
  };

  return (
    <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-950 text-white rounded-3xl p-4 sm:p-5 border border-emerald-500/20 shadow-elevated">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Info */}
        <div className="flex items-center gap-3">
          <button
            onClick={simulateVoiceRecognition}
            disabled={isListening}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition shadow-lg cursor-pointer ${
              isListening
                ? "bg-rose-600 text-white animate-pulse"
                : "bg-emerald-500 hover:bg-emerald-400 text-slate-950"
            }`}
            title="Tap to speak"
          >
            <Mic className="w-6 h-6" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                BHASHINI Voice AI
              </span>
              <span className="text-xs text-slate-400">Speak in your language</span>
            </div>
            <div className="text-sm font-bold text-white mt-0.5">
              {isListening ? (
                <span className="text-emerald-400 animate-pulse">Listening in {selectedLanguage.toUpperCase()}...</span>
              ) : recognizedText ? (
                <span>&quot;{recognizedText}&quot;</span>
              ) : (
                <span>Tap microphone or try a voice intent in Hindi, Kannada, Tamil</span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Language Pill Selector & Action */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700 text-xs font-bold">
            {[
              { id: "hi", label: "हिन्दी" },
              { id: "kn", label: "ಕನ್ನಡ" },
              { id: "ta", label: "தமிழ்" },
              { id: "en", label: "EN" },
            ].map((lang) => (
              <button
                key={lang.id}
                onClick={() => setSelectedLanguage(lang.id as any)}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  selectedLanguage === lang.id
                    ? "bg-emerald-500 text-slate-950 font-black"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {recognizedText && (
            <button
              onClick={handleApplyVoiceOrder}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs px-3.5 py-2 rounded-xl transition flex items-center gap-1 cursor-pointer"
            >
              <span>Book Voice Intent</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

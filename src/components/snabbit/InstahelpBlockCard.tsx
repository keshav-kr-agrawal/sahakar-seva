"use client";

import React from "react";
import { InstahelpBlock } from "@/lib/mockData";
import { useApp } from "@/context/AppContext";
import { formatINR } from "@/lib/utils";
import { Zap, Wrench, Sparkles, HardHat, Clock, ShieldCheck, Check, Plus, Minus, ArrowRight } from "lucide-react";

interface Props {
  block: InstahelpBlock;
}

export default function InstahelpBlockCard({ block }: Props) {
  const { cartItems, addToCart, removeFromCart } = useApp();
  const cartItem = cartItems.find((i) => i.id === block.id);
  const quantity = cartItem?.quantity || 0;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Zap": return <Zap className="w-5 h-5 text-emerald-500" />;
      case "Wrench": return <Wrench className="w-5 h-5 text-blue-500" />;
      case "Sparkles": return <Sparkles className="w-5 h-5 text-purple-500" />;
      case "HardHat": return <HardHat className="w-5 h-5 text-amber-500" />;
      default: return <Wrench className="w-5 h-5 text-emerald-500" />;
    }
  };

  return (
    <div className={`relative bg-white rounded-3xl p-5 border transition-all duration-200 shadow-soft hover:shadow-elevated flex flex-col justify-between ${
      block.isPopular ? "border-emerald-500 ring-2 ring-emerald-500/20" : "border-slate-200"
    }`}>
      {/* Popular Badge */}
      {block.isPopular && (
        <div className="absolute -top-3 left-6 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs">
          ⚡ Most Booked Block
        </div>
      )}

      <div>
        {/* Top Meta: Duration Pill & Arrival Countdown */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0">
              {getIcon(block.icon)}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {block.durationHours}-Hour Fixed Block
              </div>
              <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                {block.title}
              </h3>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full text-xs font-bold">
              <Clock className="w-3 h-3 text-emerald-600 animate-pulse" />
              <span>{block.arrivalMinutes} mins</span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium mt-0.5">Guaranteed ETA</span>
          </div>
        </div>

        <p className="text-xs text-slate-600 mb-4 line-clamp-2">
          {block.tagline}
        </p>

        {/* Task Checklist (What's included) */}
        <div className="space-y-1.5 mb-4 bg-slate-50/80 rounded-2xl p-3 border border-slate-100">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Common Tasks Handled:
          </div>
          {block.popularTasks.map((task, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700 font-medium">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span className="leading-tight">{task}</span>
            </div>
          ))}
        </div>

        {/* Co-op Minimum Wage Floor Guarantee Note */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 bg-emerald-50/50 border border-emerald-100 px-3 py-1.5 rounded-xl mb-4">
          <div className="flex items-center gap-1 text-emerald-800 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Worker Guaranteed Floor:</span>
          </div>
          <span className="font-bold text-emerald-700 font-mono">
            {formatINR(block.workerGuaranteedTakeHome)} (85%+)
          </span>
        </div>
      </div>

      {/* Bottom Price & Add Action Bar */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 font-medium block">All-Inclusive</span>
          <div className="text-xl font-black text-slate-900 font-mono">
            {formatINR(block.priceINR)}
          </div>
        </div>

        {quantity === 0 ? (
          <button
            onClick={() =>
              addToCart({
                id: block.id,
                title: block.title,
                price: block.priceINR,
                category: "Instahelp Block",
                etaMinutes: block.arrivalMinutes,
                unitType: "instahelp",
                workerPayout: block.workerGuaranteedTakeHome,
              })
            }
            className="bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>+ ADD</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 bg-slate-900 text-white rounded-xl px-2 py-1">
            <button
              onClick={() => removeFromCart(block.id)}
              className="p-1 hover:bg-slate-800 rounded text-slate-300 hover:text-white cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-black px-1.5 font-mono">{quantity}</span>
            <button
              onClick={() =>
                addToCart({
                  id: block.id,
                  title: block.title,
                  price: block.priceINR,
                  category: "Instahelp Block",
                  etaMinutes: block.arrivalMinutes,
                  unitType: "instahelp",
                  workerPayout: block.workerGuaranteedTakeHome,
                })
              }
              className="p-1 hover:bg-slate-800 rounded text-slate-300 hover:text-white cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

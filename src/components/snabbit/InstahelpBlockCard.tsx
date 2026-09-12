"use client";

import React from "react";
import { InstahelpBlock } from "@/lib/mockData";
import { useApp } from "@/context/AppContext";
import { formatINR } from "@/lib/utils";
import { Zap, Wrench, Sparkles, HardHat, Clock, Check, Plus, Minus } from "lucide-react";

interface Props {
  block: InstahelpBlock;
}

export default function InstahelpBlockCard({ block }: Props) {
  const { cartItems, addToCart, removeFromCart } = useApp();
  const cartItem = cartItems.find((i) => i.id === block.id);
  const quantity = cartItem?.quantity || 0;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Zap": return <Zap className="w-5 h-5 text-slate-800" />;
      case "Wrench": return <Wrench className="w-5 h-5 text-slate-800" />;
      case "Sparkles": return <Sparkles className="w-5 h-5 text-slate-800" />;
      case "HardHat": return <HardHat className="w-5 h-5 text-slate-800" />;
      default: return <Wrench className="w-5 h-5 text-slate-800" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between">
      <div>
        {/* Top Header: Duration & Arrival */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
              {getIcon(block.icon)}
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                {block.durationHours} Hours Fixed Block
              </span>
              <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                {block.title}
              </h3>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 px-2 py-0.5 rounded-md text-[11px] font-bold">
              <Clock className="w-3 h-3 text-slate-500" />
              <span>{block.arrivalMinutes}m</span>
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-600 mb-3.5 leading-relaxed">
          {block.tagline}
        </p>

        {/* Task Checklist */}
        <div className="space-y-1.5 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Common Inclusions:
          </div>
          {block.popularTasks.map((task, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700 font-medium">
              <Check className="w-3.5 h-3.5 text-slate-600 shrink-0 mt-0.5" />
              <span className="leading-tight">{task}</span>
            </div>
          ))}
        </div>

        {/* Worker Minimum Wage Floor Guarantee */}
        <div className="flex items-center justify-between text-[11px] text-slate-600 pb-3 border-b border-slate-100">
          <span className="font-medium text-slate-500">Worker Floor (85%+):</span>
          <span className="font-bold text-slate-900 font-mono">
            {formatINR(block.workerGuaranteedTakeHome)}
          </span>
        </div>
      </div>

      {/* Bottom Price & Add Action Bar */}
      <div className="pt-3 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 font-medium block">Total</span>
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
            className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl transition shadow-xs cursor-pointer"
          >
            + ADD
          </button>
        ) : (
          <div className="flex items-center gap-2 bg-slate-900 text-white rounded-xl px-2.5 py-1">
            <button
              onClick={() => removeFromCart(block.id)}
              className="p-1 hover:bg-slate-800 rounded text-slate-300 hover:text-white cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-bold px-1.5 font-mono">{quantity}</span>
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

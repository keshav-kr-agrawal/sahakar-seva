"use client";

import React from "react";
import { InstahelpBlock } from "@/lib/mockData";
import { useApp } from "@/context/AppContext";
import { formatINR } from "@/lib/utils";
import { Clock, Check, Plus, Minus } from "lucide-react";

interface Props {
  block: InstahelpBlock;
}

export default function InstahelpBlockCard({ block }: Props) {
  const { cartItems, addToCart, removeFromCart } = useApp();
  const cartItem = cartItems.find((i) => i.id === block.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between overflow-hidden">
      {/* Visual Service Image */}
      {block.imageUrl && (
        <div className="relative h-36 w-full overflow-hidden bg-slate-100">
          <img
            src={block.imageUrl}
            alt={block.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-sm text-slate-900 font-extrabold text-[11px] px-2.5 py-0.5 rounded-lg shadow-2xs">
            {block.durationHours} {block.durationHours === 1 ? "Hour" : "Hours"} Dedicated
          </div>
          <div className="absolute top-2.5 right-2.5 bg-slate-900/90 text-white font-mono font-bold text-[11px] px-2 py-0.5 rounded-lg flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-300" />
            <span>{block.arrivalMinutes}m ETA</span>
          </div>
        </div>
      )}

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 leading-tight mb-1">
            {block.title}
          </h3>
          <p className="text-xs text-slate-600 mb-3 leading-relaxed">
            {block.tagline}
          </p>

          {/* Checklist */}
          <div className="space-y-1 mb-3.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Scope of Tasks:
            </div>
            {block.popularTasks.slice(0, 3).map((task, idx) => (
              <div key={idx} className="flex items-start gap-1.5 text-slate-700">
                <Check className="w-3 h-3 text-slate-600 shrink-0 mt-0.5" />
                <span className="leading-tight text-[11px]">{task}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          {/* Worker Payout Note */}
          <div className="flex items-center justify-between text-[10px] text-slate-500 pb-2.5 border-b border-slate-100">
            <span>Guaranteed Worker Floor:</span>
            <span className="font-bold text-slate-900 font-mono">
              {formatINR(block.workerGuaranteedTakeHome)} (85%+)
            </span>
          </div>

          {/* Bottom Price & Add Action Bar */}
          <div className="pt-2.5 flex items-center justify-between">
            <div>
              <span className="text-[9px] text-slate-400 uppercase font-medium block">All-Inclusive</span>
              <div className="text-lg font-black text-slate-900 font-mono">
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
                className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs px-4 py-2 rounded-xl transition shadow-xs cursor-pointer"
              >
                + ADD
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-slate-900 text-white rounded-xl px-2 py-1">
                <button
                  onClick={() => removeFromCart(block.id)}
                  className="p-1 hover:bg-slate-800 rounded text-slate-300 hover:text-white cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-bold px-1 font-mono">{quantity}</span>
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
      </div>
    </div>
  );
}

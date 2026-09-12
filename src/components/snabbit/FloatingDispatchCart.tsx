"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { formatINR } from "@/lib/utils";
import { Zap, Clock, ShieldCheck, ArrowRight, X, Trash2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function FloatingDispatchCart() {
  const router = useRouter();
  const { cartItems, removeFromCart, clearCart, showToast } = useApp();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (cartItems.length === 0) return null;

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const minEta = Math.min(...cartItems.map((i) => i.etaMinutes));
  const workerPayoutTotal = Math.round(totalAmount * 0.83);

  const handleConfirmOrder = () => {
    setIsCheckoutOpen(false);
    clearCart();
    showToast("15-Min Dispatch Triggered", "Assigned nearest co-op pro in Indiranagar Ward 112.");
    router.push("/tracking");
  };

  return (
    <>
      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-4 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-xl z-40">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="bg-slate-900 text-white rounded-2xl sm:rounded-full p-2.5 sm:px-5 sm:py-3 shadow-elevated border border-slate-700/80 flex items-center justify-between gap-3"
        >
          {/* Left: Summary */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-sm shrink-0">
              {totalItemsCount}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-extrabold text-white font-mono">{formatINR(totalAmount)}</span>
                <span className="text-[11px] text-slate-400">Total</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
                <Clock className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>Dispatch in ~{minEta} mins</span>
              </div>
            </div>
          </div>

          {/* Right: Trigger Checkout Modal */}
          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm px-4 sm:px-6 py-2 rounded-xl sm:rounded-full transition flex items-center gap-1.5 shadow-xs cursor-pointer shrink-0"
          >
            <span>Proceed to Dispatch</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Checkout Drawer / Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="bg-white rounded-t-3xl sm:rounded-3xl shadow-elevated border border-slate-200 w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                    ⚡
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">Instant 15-Min Dispatch</h3>
                    <p className="text-[11px] text-slate-500">Delivering to Indiranagar, Ward 112</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="p-5 overflow-y-auto space-y-3 flex-1 text-xs">
                <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  Selected Service Units:
                </div>

                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-slate-900">{item.title}</div>
                      <div className="text-[10px] text-slate-400">
                        {item.category} • ~{item.etaMinutes} min arrival
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-slate-900 text-sm">
                        {formatINR(item.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* 100% Itemized Wage Specimen */}
                <div className="bg-slate-900 text-white p-4 rounded-2xl space-y-2 mt-4">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center justify-between">
                    <span>100% Transparent Wage Split</span>
                    <span className="bg-emerald-900 text-emerald-300 px-2 py-0.5 rounded">0% Platform Cut</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-300">Direct Worker Take-Home (83%):</span>
                    <span className="font-mono font-bold text-emerald-400">{formatINR(workerPayoutTotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">Monsoon & Safety Welfare Pool (12%):</span>
                    <span className="font-mono text-slate-400">{formatINR(Math.round(totalAmount * 0.12))}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">Cloud Operations & Dispatch (5%):</span>
                    <span className="font-mono text-slate-400">{formatINR(Math.round(totalAmount * 0.05))}</span>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-medium text-slate-400 uppercase">Grand Total</div>
                  <div className="text-2xl font-black text-slate-900 font-mono">{formatINR(totalAmount)}</div>
                </div>

                <button
                  onClick={handleConfirmOrder}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm px-6 py-3 rounded-2xl transition shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Dispatch Verified Pro</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

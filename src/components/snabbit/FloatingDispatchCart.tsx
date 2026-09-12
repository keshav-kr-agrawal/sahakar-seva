"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { formatINR } from "@/lib/utils";
import { Clock, ArrowRight, X, Trash2, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function FloatingDispatchCart() {
  const router = useRouter();
  const { cartItems, removeFromCart, clearCart, showToast, isCartDrawerOpen, setIsCartDrawerOpen } = useApp();

  if (cartItems.length === 0) return null;

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const minEta = Math.min(...cartItems.map((i) => i.etaMinutes));
  const workerPayoutTotal = Math.round(totalAmount * 0.83);

  const handleConfirmOrder = () => {
    setIsCartDrawerOpen(false);
    clearCart();
    showToast("15-Min Dispatch Confirmed", "Assigned nearest co-op craftsman in Indiranagar Ward 112.");
    router.push("/tracking");
  };

  return (
    <>
      {/* Sticky Bottom Pill (Apple / Pronto style) */}
      <div className="fixed bottom-5 left-4 right-4 sm:left-auto sm:right-8 sm:max-w-md z-40">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          className="bg-slate-900 text-white rounded-full px-4 py-2.5 shadow-elevated border border-slate-800 flex items-center justify-between gap-3"
        >
          {/* Left: Summary */}
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-white text-slate-900 flex items-center justify-center font-extrabold text-xs shrink-0">
              {totalItemsCount}
            </span>
            <div>
              <div className="text-sm font-extrabold text-white font-mono leading-none">
                {formatINR(totalAmount)}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                <Clock className="w-2.5 h-2.5 text-slate-400" />
                <span>ETA ~{minEta} mins</span>
              </div>
            </div>
          </div>

          {/* Right: Checkout Button */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs px-4 py-2 rounded-full transition flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>View Dispatch</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </div>

      {/* Checkout Drawer / Modal */}
      <AnimatePresence>
        {isCartDrawerOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white rounded-t-2xl sm:rounded-2xl shadow-elevated border border-slate-200 w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">15-Min Guaranteed Dispatch</h3>
                  <p className="text-[11px] text-slate-500">Delivering to Indiranagar, Ward 112</p>
                </div>

                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="p-4 sm:p-5 overflow-y-auto space-y-2.5 flex-1 text-xs">
                <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                  Selected Service Units:
                </div>

                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-slate-900">{item.title}</div>
                      <div className="text-[10px] text-slate-500">
                        {item.category} • ~{item.etaMinutes}m arrival
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-slate-900">
                        {formatINR(item.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* 100% Itemized Wage Specimen */}
                <div className="bg-slate-900 text-white p-4 rounded-xl space-y-1.5 mt-3">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span>100% Itemized Wage Split</span>
                    <span className="text-white">0% Platform Cut</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-300">Direct Worker Take-Home (83%):</span>
                    <span className="font-mono font-bold text-white">{formatINR(workerPayoutTotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Monsoon & Welfare Pool (12%):</span>
                    <span className="font-mono text-slate-400">{formatINR(Math.round(totalAmount * 0.12))}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Cloud Operations (5%):</span>
                    <span className="font-mono text-slate-400">{formatINR(Math.round(totalAmount * 0.05))}</span>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-medium text-slate-400 uppercase">Grand Total</div>
                  <div className="text-xl font-black text-slate-900 font-mono">{formatINR(totalAmount)}</div>
                </div>

                <button
                  onClick={handleConfirmOrder}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 fill-white" />
                  <span>Confirm & Dispatch</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

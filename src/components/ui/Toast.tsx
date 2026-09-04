"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Toast() {
  const { toastMessage } = useApp();

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none max-w-sm w-full">
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className={`pointer-events-auto p-4 rounded-xl shadow-2xl border flex items-start gap-3 backdrop-blur-md ${
              toastMessage.type === "warning"
                ? "bg-amber-950/90 text-amber-100 border-amber-500/40"
                : toastMessage.type === "info"
                ? "bg-[#133e2b]/95 text-white border-emerald-500/40"
                : "bg-[#0d2c1e]/95 text-emerald-100 border-emerald-400/50"
            }`}
          >
            {toastMessage.type === "warning" ? (
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            ) : toastMessage.type === "info" ? (
              <Info className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            )}

            <div className="flex-1 space-y-0.5">
              <h4 className="text-sm font-bold leading-tight">{toastMessage.title}</h4>
              <p className="text-xs opacity-90 leading-relaxed">{toastMessage.desc}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

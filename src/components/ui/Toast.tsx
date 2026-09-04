"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Toast() {
  const { toastMessage } = useApp();

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none max-w-sm w-full">
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            className={`pointer-events-auto p-4 rounded-2xl shadow-elevated border flex items-start gap-3 backdrop-blur-md ${
              toastMessage.type === "warning"
                ? "bg-[#20150d]/95 text-[#fdf4e8] border-[#6b421a]"
                : toastMessage.type === "info"
                ? "bg-[#0b1a12]/95 text-[#dce8e1] border-[#244230]"
                : "bg-[#0b1a12]/95 text-[#dce8e1] border-[#2d6243]"
            }`}
          >
            {toastMessage.type === "warning" ? (
              <AlertCircle className="w-5 h-5 text-[#be522d] shrink-0 mt-0.5" />
            ) : toastMessage.type === "info" ? (
              <Info className="w-5 h-5 text-[#8caea0] shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-[#4b7d5e] shrink-0 mt-0.5" />
            )}

            <div className="flex-1 space-y-0.5">
              <h4 className="text-xs font-bold leading-tight tracking-tight">{toastMessage.title}</h4>
              <p className="text-[11px] text-[#a3b8ac] leading-relaxed">{toastMessage.desc}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

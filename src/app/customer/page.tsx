"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { WORKERS } from "@/lib/mockData";
import TrustBadge from "@/components/ui/TrustBadge";
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  ShieldCheck,
  FileText,
  Heart,
  ChevronRight,
  Download
} from "lucide-react";

export default function CustomerDashboard() {
  const { activeBooking, showToast } = useApp();

  const pastBookings = [
    {
      id: "SS-619284",
      service: "Domestic & Kitchen Support",
      workerName: "Sunita Devi Sharma",
      date: "August 28, 2026",
      amount: 420,
      status: "Completed",
      workerPay: 344,
    },
    {
      id: "SS-481920",
      service: "Heritage Teak Woodwork",
      workerName: "Master Ramesh Acharya",
      date: "August 14, 2026",
      amount: 1250,
      status: "Completed",
      workerPay: 1025,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#133e2b] to-[#2d7a52] text-white p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-xs font-bold text-emerald-200 uppercase tracking-wider bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-500/30">
            Customer Dashboard
          </span>
          <h1 className="text-3xl font-extrabold font-serif text-emerald-100">Welcome Back, Ananya</h1>
          <p className="text-xs text-emerald-100/80">
            You've contributed <strong>₹2,110</strong> directly to local worker bank accounts through SahakarSeva.
          </p>
        </div>

        <Link
          href="/services"
          className="bg-white text-[#133e2b] hover:bg-emerald-50 px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-md transition"
        >
          Book New Service
        </Link>
      </div>

      {/* Active Booking Widget (if any) */}
      {activeBooking && (
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-[#133e2b] dark:text-emerald-300 font-serif">
            Active Service Dispatch
          </h2>

          <div className="bg-white dark:bg-[#15241d] rounded-3xl p-6 border-2 border-[#2d7a52] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={activeBooking.worker.avatar}
                alt={activeBooking.worker.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-[#2d7a52]"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold bg-[#c85a32] text-white px-2 py-0.5 rounded-full animate-pulse">
                    En Route
                  </span>
                  <span className="text-xs text-muted-foreground">ID: {activeBooking.id}</span>
                </div>
                <h3 className="text-base font-bold text-[#133e2b] dark:text-emerald-300 font-serif">
                  {activeBooking.serviceCategory} — {activeBooking.worker.name}
                </h3>
                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <span>{activeBooking.scheduledDate}</span>
                  <span>•</span>
                  <span>{activeBooking.scheduledTime}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/tracking"
                className="bg-[#133e2b] hover:bg-[#1e5338] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md transition flex items-center gap-2"
              >
                <span>Live GPS Map</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Past Bookings & Receipts Table */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#133e2b] dark:text-emerald-300 font-serif">
          Booking History & Wage Ledger Receipts
        </h2>

        <div className="bg-white dark:bg-[#15241d] rounded-3xl border border-[#133e2b]/15 shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#f4efe8] dark:bg-emerald-950/80 text-muted-foreground uppercase text-[11px] font-bold">
                <tr>
                  <th className="py-3 px-4">Booking Ref</th>
                  <th className="py-3 px-4">Service & Worker</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Total Paid</th>
                  <th className="py-3 px-4">Worker Payout (82%)</th>
                  <th className="py-3 px-4 text-right">Wage Ledger Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {pastBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-[#e8f4ed]/40 transition">
                    <td className="py-4 px-4 font-bold text-[#133e2b] dark:text-emerald-300">{b.id}</td>
                    <td className="py-4 px-4 font-medium">{b.service} ({b.workerName})</td>
                    <td className="py-4 px-4 text-muted-foreground">{b.date}</td>
                    <td className="py-4 px-4 font-bold">₹{b.amount}</td>
                    <td className="py-4 px-4 font-bold text-emerald-600">₹{b.workerPay}</td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => showToast("Receipt Downloaded", `Itemized Wage Ledger PDF generated for ${b.id}`)}
                        className="text-[#2d7a52] hover:underline font-bold text-xs inline-flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

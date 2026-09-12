"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  ShieldCheck,
  ChevronRight,
  Download,
  CheckCircle2,
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
      workerPay: 348,
    },
    {
      id: "SS-481920",
      service: "Carpentry & Furniture",
      workerName: "Ramesh Acharya",
      date: "August 14, 2026",
      amount: 1250,
      status: "Completed",
      workerPay: 1037,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-white text-slate-900">
      
      {/* 1. Header Banner */}
      <div className="bg-slate-950 text-white p-6 sm:p-8 rounded-3xl shadow-elevated flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider bg-slate-800 px-3 py-0.5 rounded-full border border-slate-700">
            Customer Account
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Welcome Back, Ananya</h1>
          <p className="text-xs text-slate-400">
            You have contributed <strong className="text-white">₹2,110</strong> directly to local worker bank accounts through SahakarSeva&apos;s transparent ledger.
          </p>
        </div>

        <Link
          href="/services"
          className="bg-white text-slate-900 hover:bg-slate-100 px-5 py-2.5 rounded-xl text-xs font-bold shadow-xs transition"
        >
          Book in 15 Mins
        </Link>
      </div>

      {/* 2. Active Service Dispatch */}
      {activeBooking && (
        <div className="space-y-3">
          <h2 className="text-xl font-black text-slate-900">
            Active Service Dispatch
          </h2>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={activeBooking.worker.avatar}
                alt={activeBooking.worker.name}
                className="w-16 h-16 rounded-2xl object-cover border border-slate-200"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold bg-slate-200 text-slate-800 px-2.5 py-0.5 rounded-full">
                    En Route
                  </span>
                  <span className="text-xs text-slate-500 font-mono">Ref: {activeBooking.id}</span>
                </div>
                <h3 className="text-base font-black text-slate-900">
                  {activeBooking.serviceCategory} — {activeBooking.worker.name}
                </h3>
                <div className="text-xs text-slate-500 flex items-center gap-2">
                  <span>{activeBooking.scheduledDate}</span>
                  <span>•</span>
                  <span>{activeBooking.scheduledTime}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/tracking"
                className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-1.5"
              >
                <span>Live GPS Telemetry</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 3. Booking History & Wage Ledger Receipts Table */}
      <div className="space-y-4">
        <h2 className="text-xl font-black text-slate-900">
          Booking History & Wage Ledger Records
        </h2>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Booking Ref</th>
                  <th className="py-3 px-4">Service & Craftsman</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Total Fare</th>
                  <th className="py-3 px-4">Worker Payout (83%)</th>
                  <th className="py-3 px-4 text-right">Wage Ledger PDF</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pastBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50 transition">
                    <td className="py-4 px-4 font-bold text-slate-900 font-mono">{b.id}</td>
                    <td className="py-4 px-4 font-bold text-slate-900">{b.service} ({b.workerName})</td>
                    <td className="py-4 px-4 text-slate-500">{b.date}</td>
                    <td className="py-4 px-4 font-bold text-slate-900 font-mono">₹{b.amount}</td>
                    <td className="py-4 px-4 font-bold text-emerald-700 font-mono">₹{b.workerPay}</td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => showToast("Receipt Exported", `Itemized Wage Ledger PDF generated for ${b.id}`)}
                        className="text-slate-800 hover:text-slate-950 font-bold text-xs inline-flex items-center gap-1.5 underline cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export</span>
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

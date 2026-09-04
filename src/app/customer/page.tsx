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
      <div className="bg-[#193927] text-[#f9f7f2] p-8 rounded-3xl shadow-elevated flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-[#2d6243]">
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-[#dce8e1] uppercase tracking-wider bg-[#224c34] px-3 py-0.5 rounded-full border border-[#35674a]">
            Customer Portal
          </span>
          <h1 className="text-3xl font-extrabold font-serif text-[#f9f7f2]">Welcome Back, Ananya</h1>
          <p className="text-xs text-[#c5d7cc]">
            You have contributed <strong>₹2,110</strong> directly to local worker bank accounts through SahakarSeva's transparent ledger.
          </p>
        </div>

        <Link
          href="/services"
          className="bg-[#ffffff] text-[#193927] hover:bg-[#f0f5f2] px-5 py-2.5 rounded-xl text-xs font-bold shadow-xs transition"
        >
          Book New Service
        </Link>
      </div>

      {/* Active Service Dispatch */}
      {activeBooking && (
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-[#14221b] dark:text-[#edebe4] font-serif">
            Active Service Dispatch
          </h2>

          <div className="bg-[#ffffff] dark:bg-[#13221b] rounded-3xl p-6 border border-[#c5d7cc] dark:border-[#2a4e39] shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={activeBooking.worker.avatar}
                alt={activeBooking.worker.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-[#224c34]"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold bg-[#f6e8e2] text-[#a84422] border border-[#e8cebe] px-2.5 py-0.5 rounded-full">
                    En Route
                  </span>
                  <span className="text-xs text-[#7c8d82]">Ref: {activeBooking.id}</span>
                </div>
                <h3 className="text-base font-bold text-[#14221b] dark:text-[#edebe4] font-serif">
                  {activeBooking.serviceCategory} — {activeBooking.worker.name}
                </h3>
                <div className="text-xs text-[#7c8d82] flex items-center gap-2">
                  <span>{activeBooking.scheduledDate}</span>
                  <span>•</span>
                  <span>{activeBooking.scheduledTime}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/tracking"
                className="bg-[#193927] hover:bg-[#224c34] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-1.5"
              >
                <span>Live GPS Telemetry</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Booking History & Wage Ledger Receipts Table */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#14221b] dark:text-[#edebe4] font-serif">
          Booking History & Wage Ledger Records
        </h2>

        <div className="bg-[#ffffff] dark:bg-[#13221b] rounded-3xl border border-[#e2ded4] dark:border-[#233b2e] shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#f4f0e8] dark:bg-[#182c22] text-[#7c8d82] uppercase text-[10px] font-bold">
                <tr>
                  <th className="py-3 px-4">Booking Ref</th>
                  <th className="py-3 px-4">Service & Craftsman</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Total Fare</th>
                  <th className="py-3 px-4">Worker Payout (82%)</th>
                  <th className="py-3 px-4 text-right">Wage Ledger PDF</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ede9e1] dark:divide-[#233b2e]">
                {pastBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-[#f9f7f2] dark:hover:bg-[#182c22] transition">
                    <td className="py-4 px-4 font-bold text-[#193927] dark:text-[#8caea0] font-mono">{b.id}</td>
                    <td className="py-4 px-4 font-semibold text-[#14221b] dark:text-[#edebe4]">{b.service} ({b.workerName})</td>
                    <td className="py-4 px-4 text-[#7c8d82]">{b.date}</td>
                    <td className="py-4 px-4 font-bold text-[#14221b] dark:text-[#edebe4]">₹{b.amount}</td>
                    <td className="py-4 px-4 font-bold text-[#224c34] dark:text-[#a3c9b4]">₹{b.workerPay}</td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => showToast("Receipt Exported", `Itemized Wage Ledger PDF generated for ${b.id}`)}
                        className="text-[#193927] dark:text-[#8caea0] hover:underline font-bold text-xs inline-flex items-center gap-1.5"
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

"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Heart, Award, ArrowUpRight, CheckCircle2, Lock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a1e14] text-white border-t border-[#1e5338]/30 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-emerald-900/50">
          {/* Column 1: Brand & Ministry Backing */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white font-bold text-xl font-serif">
                स
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-emerald-100 font-serif">SahakarSeva</span>
                <span className="text-xs text-emerald-300/80 font-medium">
                  Cooperative Gig Services Platform
                </span>
              </div>
            </div>

            <p className="text-xs text-emerald-200/70 leading-relaxed max-w-sm">
              An initiative under Smart India Hackathon PS 26089 for the Ministry of Cooperation & NCCT. Empowering gig workers through worker-owned cooperatives, democratic rate governance, and 100% itemized wage transparency.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-2 bg-[#133e2b] border border-emerald-700/50 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified by NCCT</span>
              </div>
              <div className="flex items-center gap-2 bg-[#133e2b] border border-emerald-700/50 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-200">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Worker Owned</span>
              </div>
            </div>
          </div>

          {/* Column 2: Customer Services */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-bold text-emerald-200 uppercase tracking-wider">
              Service Guilds
            </h4>
            <ul className="space-y-2 text-emerald-100/70">
              <li>
                <Link href="/services?category=electrician" className="hover:text-emerald-300 transition">
                  Electrical & Switchboard
                </Link>
              </li>
              <li>
                <Link href="/services?category=plumber" className="hover:text-emerald-300 transition">
                  Plumbing & Sanitation
                </Link>
              </li>
              <li>
                <Link href="/services?category=carpenter" className="hover:text-emerald-300 transition">
                  Carpentry & Furniture
                </Link>
              </li>
              <li>
                <Link href="/services?category=domestic_help" className="hover:text-emerald-300 transition">
                  Domestic & Cook Services
                </Link>
              </li>
              <li>
                <Link href="/services?category=caregiver" className="hover:text-emerald-300 transition">
                  Elder Healthcare & Caregiver
                </Link>
              </li>
              <li>
                <Link href="/heritage" className="text-amber-300 hover:underline flex items-center gap-1 font-semibold">
                  <span>Heritage Master Artisans</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: For Workers & Cooperatives */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-bold text-emerald-200 uppercase tracking-wider">
              For Gig Workers
            </h4>
            <ul className="space-y-2 text-emerald-100/70">
              <li>
                <Link href="/worker" className="hover:text-emerald-300 transition">
                  Join Worker Cooperative
                </Link>
              </li>
              <li>
                <Link href="/worker/collective-bargaining" className="hover:text-emerald-300 transition">
                  Democratic Rate Bargaining
                </Link>
              </li>
              <li>
                <Link href="/worker/safety" className="hover:text-emerald-300 transition">
                  Gender-First Women Safety
                </Link>
              </li>
              <li>
                <Link href="/worker/appeal" className="hover:text-emerald-300 transition">
                  Arbitration Appeal Panel
                </Link>
              </li>
              <li>
                <Link href="/about#wage-philosophy" className="hover:text-emerald-300 transition">
                  82% Direct Pay Ledger
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Trust & Transparency */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-bold text-emerald-200 uppercase tracking-wider">
              Federations & Policy
            </h4>
            <ul className="space-y-2 text-emerald-100/70">
              <li>
                <Link href="/admin" className="hover:text-emerald-300 transition">
                  Federation Admin Portal
                </Link>
              </li>
              <li>
                <Link href="/admin/forecasting" className="hover:text-emerald-300 transition">
                  AI Demand Forecasting
                </Link>
              </li>
              <li>
                <Link href="/admin/redistribution" className="hover:text-emerald-300 transition">
                  Crisis Mode Equity Engine
                </Link>
              </li>
              <li>
                <Link href="/admin/batch-pooling" className="hover:text-emerald-300 transition">
                  Neighborhood Batch Routes
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-300 transition">
                  Ministry PS 26089 Guidelines
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-emerald-300/60">
          <div className="flex items-center gap-2">
            <span>© 2026 SahakarSeva Cooperative Platform. Built for SIH PS 26089.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-emerald-400" /> 100% Encrypted & Worker Owned
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> NCCT Governance Standard
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

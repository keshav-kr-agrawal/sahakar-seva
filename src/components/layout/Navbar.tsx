"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp, UserRole } from "@/context/AppContext";
import { SERVICE_CATEGORIES, LOCALITIES } from "@/lib/mockData";
import {
  MapPin,
  ChevronDown,
  Menu,
  X,
  ShieldCheck,
  PhoneCall,
  Navigation,
  ArrowRight,
  Zap,
  CheckCircle2,
  HardHat,
  User,
  SlidersHorizontal,
  Flame
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { role, setRole, selectedLocality, setSelectedLocality, activeBooking, isCrisisMode, toggleCrisisMode } = useApp();

  const [isLocalityOpen, setIsLocalityOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Find Workers", href: "/services" },
    { label: "Book Service", href: "/booking" },
    { label: "Rate Voting", href: "/worker/collective-bargaining" },
    { label: "Wage Ledger", href: "/about" },
  ];

  return (
    <header className="sticky top-3 z-50 w-full px-3 sm:px-6 max-w-7xl mx-auto transition-all">
      {/* 21st.dev Style Floating Island / Pill Navbar */}
      <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-soft rounded-2xl sm:rounded-full px-3.5 sm:px-5 h-15 sm:h-16 flex items-center justify-between gap-2 relative">
        
        {/* Left: Brand & Locality Selector */}
        <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center font-black shadow-xs group-hover:scale-105 transition-transform shrink-0">
              <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight font-sans">
                Sahakar<span className="text-emerald-600">Seva</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-bold">
                100% Co-op
              </span>
            </div>
          </Link>

          {/* Clean Location Selector Pill */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setIsLocalityOpen(!isLocalityOpen)}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition cursor-pointer"
            >
              <MapPin className="w-3 h-3 text-orange-600 shrink-0" />
              <span className="max-w-[110px] truncate">{selectedLocality}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isLocalityOpen && (
              <div className="absolute left-0 mt-2 w-60 bg-white rounded-2xl shadow-elevated border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1">
                  Select Location
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {LOCALITIES.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        setSelectedLocality(loc);
                        setIsLocalityOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between transition cursor-pointer ${
                        selectedLocality === loc
                          ? "font-bold text-emerald-700 bg-emerald-50"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <span>{loc}</span>
                      {selectedLocality === loc && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center: 21st.dev Tubelight Navigation Links (Desktop lg+) */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/60 text-xs font-semibold">
          {/* Services Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition cursor-pointer ${
                isCategoryOpen ? "bg-white text-slate-900 shadow-xs font-bold" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>Services</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isCategoryOpen && (
              <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-elevated border border-slate-200 p-2.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150 space-y-1">
                <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1 flex items-center justify-between">
                  <span>10 Gig Categories</span>
                  <span className="text-emerald-600">15m Arrival</span>
                </div>
                <Link
                  href="/services"
                  onClick={() => setIsCategoryOpen(false)}
                  className="px-2.5 py-1.5 text-xs text-emerald-600 font-bold hover:bg-emerald-50 rounded-lg flex items-center justify-between transition"
                >
                  <span>All 10 Categories</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
                <div className="max-h-56 overflow-y-auto space-y-0.5">
                  {SERVICE_CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/services?category=${cat.id}`}
                      onClick={() => setIsCategoryOpen(false)}
                      className="px-2.5 py-1.5 text-xs text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg flex items-center justify-between transition"
                    >
                      <span>{cat.name}</span>
                      <span className="text-[11px] font-semibold text-emerald-600">₹{cat.startingPrice}+</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-full transition whitespace-nowrap ${
                  isActive
                    ? "bg-white text-slate-900 shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Integrated Role Switcher & Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          
          {/* 21st.dev Style Segmented Role Switcher (Replaces clumsy top bar) */}
          <div className="hidden sm:flex items-center bg-slate-100 p-0.5 rounded-full border border-slate-200/80 text-[11px] font-semibold">
            {[
              { id: "customer", label: "Customer", icon: <User className="w-3 h-3" /> },
              { id: "worker", label: "Worker", icon: <HardHat className="w-3 h-3" /> },
              { id: "admin", label: "Admin", icon: <ShieldCheck className="w-3 h-3" /> },
            ].map((r) => {
              const isActive = role === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id as UserRole)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                    isActive
                      ? "bg-slate-900 text-white shadow-xs font-bold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {r.icon}
                  <span>{r.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Booking Tracker Pill (if active) */}
          {activeBooking && (
            <Link
              href="/tracking"
              className="hidden md:flex items-center gap-1 bg-orange-50 text-orange-600 border border-orange-200 px-2.5 py-1 rounded-full text-xs font-bold animate-pulse whitespace-nowrap"
            >
              <Navigation className="w-3 h-3" />
              <span>En Route</span>
            </Link>
          )}

          {/* Urgent SOS Button (Clean pill) */}
          <Link
            href="/emergency"
            className="flex items-center gap-1 bg-orange-600 hover:bg-orange-700 text-white px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold transition shadow-xs whitespace-nowrap"
          >
            <PhoneCall className="w-3 h-3 shrink-0" />
            <span className="hidden sm:inline">Urgent SOS</span>
            <span className="sm:hidden">SOS</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-slate-700 hover:bg-slate-100 rounded-full cursor-pointer transition border border-slate-200 flex items-center justify-center"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 21st.dev Style Floating Mobile Card Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-18 left-3 right-3 bg-white/98 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-elevated p-4 space-y-3.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          
          {/* Mobile Role Switcher */}
          <div className="flex items-center justify-between bg-slate-100 p-1 rounded-xl">
            <span className="text-[11px] font-bold text-slate-500 uppercase px-2">Role:</span>
            <div className="flex items-center gap-1">
              {[
                { id: "customer", label: "Customer" },
                { id: "worker", label: "Worker" },
                { id: "admin", label: "Admin" },
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id as UserRole)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                    role === r.id ? "bg-slate-900 text-white shadow-xs" : "text-slate-600"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Location Selector */}
          <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs">
            <span className="font-semibold text-slate-500">Delivery Location:</span>
            <div className="flex items-center gap-1 text-slate-900 font-bold">
              <MapPin className="w-3.5 h-3.5 text-orange-600" />
              <select
                value={selectedLocality}
                onChange={(e) => setSelectedLocality(e.target.value)}
                className="bg-transparent font-bold focus:outline-none cursor-pointer"
              >
                {LOCALITIES.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Grid Links */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-800 text-center border border-slate-200"
            >
              All Services
            </Link>
            <Link
              href="/booking"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold text-center shadow-xs"
            >
              Book Service
            </Link>
            <Link
              href="/worker/collective-bargaining"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold text-center border border-emerald-200"
            >
              Rate Voting
            </Link>
            <Link
              href="/tracking"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 bg-orange-50 text-orange-600 rounded-xl text-xs font-bold text-center border border-orange-200"
            >
              Live Tracking
            </Link>
          </div>

          {/* List Links */}
          <div className="pt-2 space-y-1 text-xs font-semibold border-t border-slate-100">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50"
            >
              Home & Fare Specimen
            </Link>
            <Link
              href="/worker"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50"
            >
              Worker Hub & Earnings
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50"
            >
              Federation Portal
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50"
            >
              100% Itemized Wage Philosophy
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

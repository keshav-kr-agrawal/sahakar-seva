"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { SERVICE_CATEGORIES, LOCALITIES } from "@/lib/mockData";
import {
  MapPin,
  ChevronDown,
  Globe,
  Search,
  Menu,
  X,
  ShieldCheck,
  Zap,
  Sparkles,
  PhoneCall,
  Navigation,
  HardHat,
  BarChart3,
  Flame,
  Heart,
  Scale,
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const { role, selectedLocality, setSelectedLocality, language, setLanguage, activeBooking } = useApp();

  const [isLocalityOpen, setIsLocalityOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी (Hindi)" },
    { code: "kn", name: "ಕನ್ನಡ (Kannada)" },
    { code: "mr", name: "मराठी (Marathi)" },
  ];

  return (
    <header className="sticky top-[37px] z-40 w-full glass-nav border-b border-[#133e2b]/10 dark:border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#133e2b] to-[#2d7a52] flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
                <span className="font-serif">स</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-bold text-[#133e2b] dark:text-emerald-400 tracking-tight font-serif">
                    SahakarSeva
                  </span>
                  <span className="text-[10px] bg-[#133e2b]/10 dark:bg-emerald-900/40 text-[#133e2b] dark:text-emerald-300 px-1.5 py-0.5 rounded font-semibold uppercase">
                    Coop
                  </span>
                </div>
                <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#2d7a52]" />
                  NCCT & Ministry Verified
                </span>
              </div>
            </Link>

            {/* Locality Selector Dropdown */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setIsLocalityOpen(!isLocalityOpen)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-[#f4efe8] dark:bg-emerald-950/60 hover:bg-[#e8f4ed] dark:hover:bg-emerald-900/40 text-[#133e2b] dark:text-emerald-300 rounded-lg transition border border-[#133e2b]/15"
              >
                <MapPin className="w-3.5 h-3.5 text-[#c85a32]" />
                <span className="max-w-[130px] truncate">{selectedLocality}</span>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </button>

              <AnimatePresence>
                {isLocalityOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute left-0 mt-2 w-64 bg-white dark:bg-[#15241d] rounded-xl shadow-xl border border-[#133e2b]/10 py-2 z-50"
                  >
                    <div className="px-3 py-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Select Service Location
                    </div>
                    {LOCALITIES.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => {
                          setSelectedLocality(loc);
                          setIsLocalityOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#e8f4ed] dark:hover:bg-emerald-900/30 transition ${
                          selectedLocality === loc ? "font-bold text-[#133e2b] dark:text-emerald-400 bg-[#e8f4ed]/50" : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <span>{loc}</span>
                        {selectedLocality === loc && <span className="w-1.5 h-1.5 rounded-full bg-[#2d7a52]" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Center / Right Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {/* Common Public / Customer Links */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center gap-1 text-[#133e2b] dark:text-emerald-200 hover:text-[#2d7a52] transition"
              >
                <span>Services</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              <AnimatePresence>
                {isCategoryOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute left-0 mt-2 w-72 bg-white dark:bg-[#15241d] rounded-xl shadow-xl border border-[#133e2b]/10 py-2 z-50 grid grid-cols-1 gap-0.5"
                  >
                    <div className="px-3 py-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider border-b border-gray-100 dark:border-gray-800 pb-1">
                      Cooperative Service Guilds
                    </div>
                    <Link
                      href="/services"
                      onClick={() => setIsCategoryOpen(false)}
                      className="px-3 py-2 text-xs text-[#2d7a52] font-semibold hover:bg-[#e8f4ed] flex items-center justify-between"
                    >
                      <span>Explore All Services</span>
                      <Sparkles className="w-3.5 h-3.5 text-[#c85a32]" />
                    </Link>
                    {SERVICE_CATEGORIES.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/services?category=${cat.id}`}
                        onClick={() => setIsCategoryOpen(false)}
                        className="px-3 py-1.5 text-xs text-gray-700 dark:text-gray-300 hover:bg-[#e8f4ed] dark:hover:bg-emerald-900/30 hover:text-[#133e2b] flex items-center justify-between transition"
                      >
                        <span>{cat.name}</span>
                        <span className="text-[10px] text-muted-foreground">₹{cat.startingPrice}+</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Role Specific Shortcuts */}
            {role === "customer" && (
              <>
                <Link
                  href="/services"
                  className={`hover:text-[#2d7a52] transition ${pathname === "/services" ? "text-[#2d7a52] font-bold" : "text-gray-700 dark:text-gray-300"}`}
                >
                  Find Workers
                </Link>
                {activeBooking && (
                  <Link
                    href="/tracking"
                    className="flex items-center gap-1.5 text-[#c85a32] font-semibold bg-[#fceee9] dark:bg-amber-950/40 px-2.5 py-1 rounded-full text-xs animate-pulse"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Live Tracking</span>
                  </Link>
                )}
                <Link
                  href="/heritage"
                  className="flex items-center gap-1 text-amber-800 dark:text-amber-300 hover:text-amber-900"
                >
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  <span>Heritage Artisans</span>
                </Link>
                <Link
                  href="/customer"
                  className={`hover:text-[#2d7a52] transition ${pathname === "/customer" ? "text-[#2d7a52] font-bold" : "text-gray-700 dark:text-gray-300"}`}
                >
                  My Dashboard
                </Link>
              </>
            )}

            {role === "worker" && (
              <>
                <Link
                  href="/worker"
                  className={`flex items-center gap-1 hover:text-[#2d7a52] transition ${pathname === "/worker" ? "text-[#2d7a52] font-bold" : "text-gray-700 dark:text-gray-300"}`}
                >
                  <HardHat className="w-3.5 h-3.5" />
                  <span>Worker Hub</span>
                </Link>
                <Link
                  href="/worker/collective-bargaining"
                  className={`flex items-center gap-1 hover:text-[#2d7a52] transition ${pathname === "/worker/collective-bargaining" ? "text-[#2d7a52] font-bold" : "text-gray-700 dark:text-gray-300"}`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Rate Bargaining</span>
                </Link>
                <Link
                  href="/worker/safety"
                  className={`flex items-center gap-1 hover:text-[#2d7a52] transition ${pathname === "/worker/safety" ? "text-[#2d7a52] font-bold" : "text-gray-700 dark:text-gray-300"}`}
                >
                  <Heart className="w-3.5 h-3.5 text-rose-500" />
                  <span>Women Safety</span>
                </Link>
                <Link
                  href="/worker/appeal"
                  className={`flex items-center gap-1 hover:text-[#2d7a52] transition ${pathname === "/worker/appeal" ? "text-[#2d7a52] font-bold" : "text-gray-700 dark:text-gray-300"}`}
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Appeals</span>
                </Link>
              </>
            )}

            {role === "admin" && (
              <>
                <Link
                  href="/admin"
                  className={`flex items-center gap-1 hover:text-[#2d7a52] transition ${pathname === "/admin" ? "text-[#2d7a52] font-bold" : "text-gray-700 dark:text-gray-300"}`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Overview</span>
                </Link>
                <Link
                  href="/admin/forecasting"
                  className={`flex items-center gap-1 hover:text-[#2d7a52] transition ${pathname === "/admin/forecasting" ? "text-[#2d7a52] font-bold" : "text-gray-700 dark:text-gray-300"}`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>AI Demand Forecast</span>
                </Link>
                <Link
                  href="/admin/redistribution"
                  className={`flex items-center gap-1 hover:text-[#2d7a52] transition ${pathname === "/admin/redistribution" ? "text-[#2d7a52] font-bold" : "text-gray-700 dark:text-gray-300"}`}
                >
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>Crisis Redistribution</span>
                </Link>
                <Link
                  href="/admin/batch-pooling"
                  className={`flex items-center gap-1 hover:text-[#2d7a52] transition ${pathname === "/admin/batch-pooling" ? "text-[#2d7a52] font-bold" : "text-gray-700 dark:text-gray-300"}`}
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Batch Route Map</span>
                </Link>
              </>
            )}

            <Link
              href="/about"
              className={`hover:text-[#2d7a52] transition ${pathname === "/about" ? "text-[#2d7a52] font-bold" : "text-gray-700 dark:text-gray-300"}`}
            >
              Wage Philosophy
            </Link>
          </nav>

          {/* Right Action Tools */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-[#133e2b] hover:bg-black/5 rounded-lg transition flex items-center gap-1 text-xs font-semibold"
                title="Change Language"
              >
                <Globe className="w-4 h-4 text-[#2d7a52]" />
                <span className="uppercase">{language}</span>
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute right-0 mt-2 w-44 bg-white dark:bg-[#15241d] rounded-xl shadow-xl border border-[#133e2b]/10 py-1.5 z-50"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as any);
                          setIsLangOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#e8f4ed] dark:hover:bg-emerald-900/30 transition ${
                          language === lang.code ? "font-bold text-[#133e2b] dark:text-emerald-400 bg-[#e8f4ed]/50" : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Emergency SOS Button */}
            <Link
              href="/emergency"
              className="flex items-center gap-1.5 bg-[#c85a32] hover:bg-[#b24a24] text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm transition hover:scale-105 active:scale-95"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>SOS Urgent</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/emergency"
              className="bg-[#c85a32] text-white p-2 rounded-lg text-xs font-bold"
            >
              <PhoneCall className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 dark:text-gray-200 hover:bg-black/5 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-[#15241d] border-b border-[#133e2b]/10 px-4 py-4 space-y-3"
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <span className="text-xs font-semibold uppercase text-muted-foreground">Location</span>
              <button
                onClick={() => setIsLocalityOpen(!isLocalityOpen)}
                className="text-xs font-bold text-[#133e2b] dark:text-emerald-400 flex items-center gap-1"
              >
                <MapPin className="w-3.5 h-3.5 text-[#c85a32]" />
                {selectedLocality}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link
                href="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 bg-[#f4efe8] dark:bg-emerald-950/40 rounded-xl text-xs font-bold text-[#133e2b] dark:text-emerald-300 text-center"
              >
                Explore Services
              </Link>
              <Link
                href="/booking"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 bg-[#133e2b] text-white rounded-xl text-xs font-bold text-center"
              >
                Book Worker
              </Link>
              <Link
                href="/tracking"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 bg-[#fceee9] text-[#c85a32] rounded-xl text-xs font-bold text-center"
              >
                Live Tracking
              </Link>
              <Link
                href="/heritage"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 bg-amber-50 text-amber-900 rounded-xl text-xs font-bold text-center"
              >
                Heritage Marketplace
              </Link>
            </div>

            <div className="pt-3 space-y-1 text-sm">
              <Link
                href="/worker"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-emerald-900/30"
              >
                Worker Hub & Dashboard
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-emerald-900/30"
              >
                Federation Admin Panel
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-emerald-900/30"
              >
                Wage Transparency Philosophy
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

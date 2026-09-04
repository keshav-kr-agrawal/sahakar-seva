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
  Menu,
  X,
  ShieldCheck,
  PhoneCall,
  Navigation,
  HardHat,
  BarChart3,
  Flame,
  Heart,
  Scale,
  Award,
  ArrowRight
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
    <header className="sticky top-[37px] z-40 w-full glass-header border-b border-[#e2ded4] dark:border-[#233b2e] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Emblem Section */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="w-11 h-11 rounded-xl bg-[#193927] border border-[#2d6243] flex items-center justify-center text-[#f9f7f2] font-serif font-bold text-2xl shadow-sm group-hover:bg-[#224c34] transition-colors">
                <span>स</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-extrabold text-[#14221b] dark:text-[#edebe4] tracking-tight font-serif">
                    SahakarSeva
                  </span>
                  <span className="text-[10px] bg-[#f0f5f2] dark:bg-[#193225] text-[#224c34] dark:text-[#8caea0] border border-[#dce8e1] dark:border-[#234230] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">
                    Cooperative
                  </span>
                </div>
                <span className="text-[11px] text-[#506155] dark:text-[#8caea0] font-medium flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2d6243]" />
                  NCCT Verified • Ministry of Cooperation
                </span>
              </div>
            </Link>

            {/* Locality Selector Dropdown */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setIsLocalityOpen(!isLocalityOpen)}
                className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold bg-[#f4f0e8] dark:bg-[#182c22] hover:bg-[#e8f0ea] dark:hover:bg-[#223d2f] text-[#193927] dark:text-[#dce8e1] rounded-lg transition border border-[#d8d3c7] dark:border-[#2a4a38]"
              >
                <MapPin className="w-3.5 h-3.5 text-[#a84422]" />
                <span className="max-w-[140px] truncate">{selectedLocality}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#7c8d82]" />
              </button>

              <AnimatePresence>
                {isLocalityOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="absolute left-0 mt-2 w-64 bg-[#ffffff] dark:bg-[#13221b] rounded-2xl shadow-elevated border border-[#e2ded4] dark:border-[#233b2e] py-2 z-50"
                  >
                    <div className="px-3.5 py-1.5 text-[10px] font-bold text-[#7c8d82] uppercase tracking-wider">
                      Select Service Locality
                    </div>
                    {LOCALITIES.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => {
                          setSelectedLocality(loc);
                          setIsLocalityOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition ${
                          selectedLocality === loc
                            ? "font-bold text-[#193927] dark:text-[#dce8e1] bg-[#f0f5f2] dark:bg-[#193225]"
                            : "text-[#4a5b51] dark:text-[#a3b8ac] hover:bg-[#f4f0e8] dark:hover:bg-[#1c3025]"
                        }`}
                      >
                        <span>{loc}</span>
                        {selectedLocality === loc && <span className="w-1.5 h-1.5 rounded-full bg-[#2d6243]" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center gap-1.5 text-[#14221b] dark:text-[#edebe4] hover:text-[#224c34] transition py-1"
              >
                <span>Service Guilds</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#7c8d82]" />
              </button>

              <AnimatePresence>
                {isCategoryOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="absolute left-0 mt-2 w-80 bg-[#ffffff] dark:bg-[#13221b] rounded-2xl shadow-elevated border border-[#e2ded4] dark:border-[#233b2e] p-3 z-50 space-y-1"
                  >
                    <div className="px-3 py-1 text-[10px] font-bold text-[#7c8d82] uppercase tracking-wider border-b border-[#ede9e1] dark:border-[#233b2e] pb-1.5">
                      Cooperative Worker Guilds
                    </div>
                    <Link
                      href="/services"
                      onClick={() => setIsCategoryOpen(false)}
                      className="px-3 py-2 text-xs text-[#224c34] dark:text-[#8caea0] font-bold hover:bg-[#f0f5f2] dark:hover:bg-[#193225] rounded-lg flex items-center justify-between transition"
                    >
                      <span>Browse All 10 Service Guilds</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#a84422]" />
                    </Link>
                    <div className="max-h-72 overflow-y-auto space-y-0.5 pt-1">
                      {SERVICE_CATEGORIES.map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/services?category=${cat.id}`}
                          onClick={() => setIsCategoryOpen(false)}
                          className="px-3 py-1.5 text-xs text-[#4a5b51] dark:text-[#a3b8ac] hover:bg-[#f4f0e8] dark:hover:bg-[#1c3025] hover:text-[#14221b] rounded-lg flex items-center justify-between transition"
                        >
                          <span>{cat.name}</span>
                          <span className="text-[11px] font-semibold text-[#7c8d82]">From ₹{cat.startingPrice}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Role-Sensitive Navigation Items */}
            {role === "customer" && (
              <>
                <Link
                  href="/services"
                  className={`py-1 transition ${pathname === "/services" ? "text-[#193927] font-bold border-b-2 border-[#193927]" : "text-[#4a5b51] dark:text-[#a3b8ac] hover:text-[#193927]"}`}
                >
                  Verified Workers
                </Link>
                {activeBooking && (
                  <Link
                    href="/tracking"
                    className="flex items-center gap-1.5 text-[#a84422] font-bold bg-[#f6e8e2] dark:bg-[#331d16] border border-[#e8cebe] dark:border-[#522c20] px-3 py-1 rounded-full text-xs"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Worker En Route</span>
                  </Link>
                )}
                <Link
                  href="/heritage"
                  className={`flex items-center gap-1.5 py-1 transition ${pathname === "/heritage" ? "text-[#193927] font-bold border-b-2 border-[#193927]" : "text-[#4a5b51] dark:text-[#a3b8ac] hover:text-[#193927]"}`}
                >
                  <Award className="w-4 h-4 text-[#855b16]" />
                  <span>Heritage Crafts</span>
                </Link>
                <Link
                  href="/customer"
                  className={`py-1 transition ${pathname === "/customer" ? "text-[#193927] font-bold border-b-2 border-[#193927]" : "text-[#4a5b51] dark:text-[#a3b8ac] hover:text-[#193927]"}`}
                >
                  My Bookings
                </Link>
              </>
            )}

            {role === "worker" && (
              <>
                <Link
                  href="/worker"
                  className={`flex items-center gap-1.5 py-1 transition ${pathname === "/worker" ? "text-[#193927] font-bold border-b-2 border-[#193927]" : "text-[#4a5b51] dark:text-[#a3b8ac] hover:text-[#193927]"}`}
                >
                  <HardHat className="w-4 h-4" />
                  <span>Worker Hub</span>
                </Link>
                <Link
                  href="/worker/collective-bargaining"
                  className={`flex items-center gap-1.5 py-1 transition ${pathname === "/worker/collective-bargaining" ? "text-[#193927] font-bold border-b-2 border-[#193927]" : "text-[#4a5b51] dark:text-[#a3b8ac] hover:text-[#193927]"}`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Rate Bargaining</span>
                </Link>
                <Link
                  href="/worker/safety"
                  className={`flex items-center gap-1.5 py-1 transition ${pathname === "/worker/safety" ? "text-[#193927] font-bold border-b-2 border-[#193927]" : "text-[#4a5b51] dark:text-[#a3b8ac] hover:text-[#193927]"}`}
                >
                  <Heart className="w-4 h-4 text-[#9e3232]" />
                  <span>Women Safety</span>
                </Link>
                <Link
                  href="/worker/appeal"
                  className={`flex items-center gap-1.5 py-1 transition ${pathname === "/worker/appeal" ? "text-[#193927] font-bold border-b-2 border-[#193927]" : "text-[#4a5b51] dark:text-[#a3b8ac] hover:text-[#193927]"}`}
                >
                  <Scale className="w-4 h-4" />
                  <span>Appeals</span>
                </Link>
              </>
            )}

            {role === "admin" && (
              <>
                <Link
                  href="/admin"
                  className={`flex items-center gap-1.5 py-1 transition ${pathname === "/admin" ? "text-[#193927] font-bold border-b-2 border-[#193927]" : "text-[#4a5b51] dark:text-[#a3b8ac] hover:text-[#193927]"}`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Admin Portal</span>
                </Link>
                <Link
                  href="/admin/forecasting"
                  className={`flex items-center gap-1.5 py-1 transition ${pathname === "/admin/forecasting" ? "text-[#193927] font-bold border-b-2 border-[#193927]" : "text-[#4a5b51] dark:text-[#a3b8ac] hover:text-[#193927]"}`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Demand Forecast</span>
                </Link>
                <Link
                  href="/admin/redistribution"
                  className={`flex items-center gap-1.5 py-1 transition ${pathname === "/admin/redistribution" ? "text-[#193927] font-bold border-b-2 border-[#193927]" : "text-[#4a5b51] dark:text-[#a3b8ac] hover:text-[#193927]"}`}
                >
                  <Flame className="w-4 h-4 text-[#855b16]" />
                  <span>Crisis Redistribution</span>
                </Link>
                <Link
                  href="/admin/batch-pooling"
                  className={`flex items-center gap-1.5 py-1 transition ${pathname === "/admin/batch-pooling" ? "text-[#193927] font-bold border-b-2 border-[#193927]" : "text-[#4a5b51] dark:text-[#a3b8ac] hover:text-[#193927]"}`}
                >
                  <Navigation className="w-4 h-4" />
                  <span>Batch Route Pooling</span>
                </Link>
              </>
            )}

            <Link
              href="/about"
              className={`py-1 transition ${pathname === "/about" ? "text-[#193927] font-bold border-b-2 border-[#193927]" : "text-[#4a5b51] dark:text-[#a3b8ac] hover:text-[#193927]"}`}
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
                className="p-2 text-[#4a5b51] dark:text-[#a3b8ac] hover:text-[#14221b] hover:bg-[#f4f0e8] dark:hover:bg-[#1c3025] rounded-lg transition flex items-center gap-1.5 text-xs font-semibold"
                title="Change Language"
              >
                <Globe className="w-4 h-4 text-[#2d6243]" />
                <span className="uppercase">{language}</span>
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="absolute right-0 mt-2 w-44 bg-[#ffffff] dark:bg-[#13221b] rounded-xl shadow-elevated border border-[#e2ded4] dark:border-[#233b2e] py-1.5 z-50"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as any);
                          setIsLangOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-1.5 text-xs flex items-center justify-between transition ${
                          language === lang.code
                            ? "font-bold text-[#193927] dark:text-[#dce8e1] bg-[#f0f5f2] dark:bg-[#193225]"
                            : "text-[#4a5b51] dark:text-[#a3b8ac] hover:bg-[#f4f0e8]"
                        }`}
                      >
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Emergency SOS Urgent Request Button */}
            <Link
              href="/emergency"
              className="flex items-center gap-2 bg-[#a84422] hover:bg-[#8c381c] text-[#ffffff] px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Urgent Service</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/emergency"
              className="bg-[#a84422] text-[#ffffff] p-2 rounded-xl text-xs font-bold"
            >
              <PhoneCall className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#14221b] dark:text-[#edebe4] hover:bg-[#f4f0e8] rounded-xl"
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
            className="lg:hidden bg-[#ffffff] dark:bg-[#13221b] border-b border-[#e2ded4] px-5 py-5 space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#ede9e1]">
              <span className="text-xs font-semibold uppercase text-[#7c8d82]">Active Locality</span>
              <button
                onClick={() => setIsLocalityOpen(!isLocalityOpen)}
                className="text-xs font-bold text-[#193927] dark:text-[#dce8e1] flex items-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5 text-[#a84422]" />
                {selectedLocality}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link
                href="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 bg-[#f4f0e8] dark:bg-[#182c22] rounded-xl text-xs font-bold text-[#193927] dark:text-[#dce8e1] text-center"
              >
                Explore Services
              </Link>
              <Link
                href="/booking"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 bg-[#193927] text-white rounded-xl text-xs font-bold text-center"
              >
                Book Worker
              </Link>
              <Link
                href="/tracking"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 bg-[#f6e8e2] text-[#a84422] rounded-xl text-xs font-bold text-center"
              >
                Live Tracking
              </Link>
              <Link
                href="/heritage"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 bg-[#f9f2e4] text-[#855b16] rounded-xl text-xs font-bold text-center"
              >
                Heritage Guild
              </Link>
            </div>

            <div className="pt-2 space-y-1 text-sm">
              <Link
                href="/worker"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg font-semibold hover:bg-[#f4f0e8]"
              >
                Worker Hub & Earnings
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg font-semibold hover:bg-[#f4f0e8]"
              >
                Federation Admin Portal
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg font-semibold hover:bg-[#f4f0e8]"
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

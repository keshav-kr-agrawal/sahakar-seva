"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp, Language } from "@/context/AppContext";
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
  ArrowRight,
  Sparkles,
  Users,
  Search
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { role, selectedLocality, setSelectedLocality, language, setLanguage, activeBooking } = useApp();

  const [isLocalityOpen, setIsLocalityOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const languages: { code: Language; name: string }[] = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी (Hindi)" },
    { code: "kn", name: "ಕನ್ನಡ (Kannada)" },
    { code: "mr", name: "मराठी (Marathi)" },
  ];

  return (
    <nav aria-label="Main Navigation" className="w-full bg-[#ffffff] dark:bg-[#11261a] border-b border-[#ded8cb] dark:border-[#233b2e] shadow-xs relative z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* Left: Logo, Emblem & Locality Picker */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#193927] border border-[#2d6243] flex items-center justify-center text-[#ffffff] font-serif font-bold text-xl sm:text-2xl shadow-xs group-hover:bg-[#224c34] transition-colors">
                <span>स</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-extrabold text-[#14221b] dark:text-[#f4f2ea] tracking-tight font-serif">
                    SahakarSeva
                  </span>
                  <span className="hidden sm:inline text-[9px] bg-[#edf5f0] dark:bg-[#193225] text-[#193927] dark:text-[#9bc2ad] border border-[#cbe1d3] dark:border-[#234230] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    Cooperative
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-[#224c34] dark:text-[#9bc2ad] font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#2d6243] shrink-0" />
                  <span className="truncate max-w-[180px] sm:max-w-none">NCCT Verified • Ministry of Cooperation</span>
                </span>
              </div>
            </Link>

            {/* Desktop Locality Dropdown */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setIsLocalityOpen(!isLocalityOpen)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold bg-[#f4ece1] dark:bg-[#182c22] hover:bg-[#ede7dc] dark:hover:bg-[#223d2f] text-[#193927] dark:text-[#dce8e1] rounded-xl transition border border-[#ded8cb] dark:border-[#2a4a38] cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-[#a84422] shrink-0" />
                <span className="max-w-[130px] truncate">{selectedLocality}</span>
                <ChevronDown className="w-3 h-3 text-[#7c8d82]" />
              </button>

              {isLocalityOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-[#ffffff] dark:bg-[#13221b] rounded-2xl shadow-elevated border border-[#ded8cb] dark:border-[#233b2e] py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3.5 py-1.5 text-[10px] font-bold text-[#7c8d82] uppercase tracking-wider border-b border-[#ece6d9] dark:border-[#233b2e] pb-1.5">
                    Select Active Locality
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {LOCALITIES.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => {
                          setSelectedLocality(loc);
                          setIsLocalityOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition cursor-pointer ${
                          selectedLocality === loc
                            ? "font-bold text-[#193927] dark:text-[#dce8e1] bg-[#edf5f0] dark:bg-[#193225]"
                            : "text-[#4a5b51] dark:text-[#a3b8ac] hover:bg-[#f4ece1] dark:hover:bg-[#1c3025]"
                        }`}
                      >
                        <span>{loc}</span>
                        {selectedLocality === loc && <span className="w-1.5 h-1.5 rounded-full bg-[#193927]" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-6 text-sm font-semibold">
            {/* Service Guilds Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center gap-1.5 text-[#14221b] dark:text-[#edebe4] hover:text-[#193927] transition py-1 cursor-pointer"
              >
                <span>Service Guilds</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#7c8d82]" />
              </button>

              {isCategoryOpen && (
                <div className="absolute left-0 mt-2 w-80 bg-[#ffffff] dark:bg-[#13221b] rounded-2xl shadow-elevated border border-[#ded8cb] dark:border-[#233b2e] p-3 z-50 space-y-1 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3 py-1 text-[10px] font-bold text-[#7c8d82] uppercase tracking-wider border-b border-[#ece6d9] dark:border-[#233b2e] pb-1.5 flex items-center justify-between">
                    <span>10 Registered Guilds</span>
                    <span className="text-[#a84422]">NCCT Tier-3</span>
                  </div>
                  <Link
                    href="/services"
                    onClick={() => setIsCategoryOpen(false)}
                    className="px-3 py-2 text-xs text-[#193927] dark:text-[#8caea0] font-bold hover:bg-[#edf5f0] dark:hover:bg-[#193225] rounded-lg flex items-center justify-between transition"
                  >
                    <span>Browse All 10 Guilds</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#a84422]" />
                  </Link>
                  <div className="max-h-72 overflow-y-auto space-y-0.5 pt-1">
                    {SERVICE_CATEGORIES.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/services?category=${cat.id}`}
                        onClick={() => setIsCategoryOpen(false)}
                        className="px-3 py-1.5 text-xs text-[#4a5b51] dark:text-[#a3b8ac] hover:bg-[#f4ece1] dark:hover:bg-[#1c3025] hover:text-[#14221b] rounded-lg flex items-center justify-between transition"
                      >
                        <span>{cat.name}</span>
                        <span className="text-[11px] font-bold text-[#193927] dark:text-[#8caea0]">From ₹{cat.startingPrice}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/services"
              className={`py-1 transition ${
                pathname === "/services"
                  ? "text-[#193927] dark:text-[#8caea0] font-bold border-b-2 border-[#193927]"
                  : "text-[#4a5b51] dark:text-[#a3b8ac] hover:text-[#193927]"
              }`}
            >
              Find Craftsmen
            </Link>

            <Link
              href="/booking"
              className={`py-1 transition ${
                pathname === "/booking"
                  ? "text-[#193927] dark:text-[#8caea0] font-bold border-b-2 border-[#193927]"
                  : "text-[#4a5b51] dark:text-[#a3b8ac] hover:text-[#193927]"
              }`}
            >
              Book Service
            </Link>

            <Link
              href="/worker/collective-bargaining"
              className={`py-1 transition ${
                pathname.includes("/collective-bargaining")
                  ? "text-[#193927] dark:text-[#8caea0] font-bold border-b-2 border-[#193927]"
                  : "text-[#4a5b51] dark:text-[#a3b8ac] hover:text-[#193927]"
              }`}
            >
              Rate Governance
            </Link>

            <Link
              href="/about"
              className={`py-1 transition ${
                pathname === "/about"
                  ? "text-[#193927] dark:text-[#8caea0] font-bold border-b-2 border-[#193927]"
                  : "text-[#4a5b51] dark:text-[#a3b8ac] hover:text-[#193927]"
              }`}
            >
              Ledger Philosophy
            </Link>

            {activeBooking && (
              <Link
                href="/tracking"
                className="flex items-center gap-1.5 text-[#a84422] font-bold bg-[#f9ebe4] dark:bg-[#331d16] border border-[#edd2c6] dark:border-[#522c20] px-3 py-1 rounded-full text-xs animate-pulse"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Worker En Route</span>
              </Link>
            )}
          </div>

          {/* Right: Actions & Urgent Service */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Selector */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#506155] dark:text-[#a3b8ac] hover:bg-[#f4ece1] dark:hover:bg-[#182c22] rounded-xl transition border border-[#ded8cb] dark:border-[#233b2e] cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="uppercase">{language}</span>
                <ChevronDown className="w-3 h-3 text-[#7c8d82]" />
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-[#ffffff] dark:bg-[#13221b] rounded-2xl shadow-elevated border border-[#ded8cb] dark:border-[#233b2e] py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-1.5 text-xs transition cursor-pointer ${
                        language === lang.code
                          ? "font-bold text-[#193927] dark:text-[#dce8e1] bg-[#edf5f0] dark:bg-[#193225]"
                          : "text-[#4a5b51] dark:text-[#a3b8ac] hover:bg-[#f4ece1]"
                      }`}
                    >
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Urgent Service Callout */}
            <Link
              href="/emergency"
              className="flex items-center gap-2 bg-[#a84422] hover:bg-[#8c381c] text-[#ffffff] px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Urgent Service</span>
            </Link>
          </div>

          {/* Mobile & Tablet Hamburger Toggle */}
          <div className="flex xl:hidden items-center gap-2">
            <Link
              href="/emergency"
              className="sm:hidden bg-[#a84422] text-[#ffffff] p-2 rounded-xl text-xs font-bold"
              title="Urgent Service SOS"
            >
              <PhoneCall className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#14221b] dark:text-[#edebe4] hover:bg-[#f4ece1] rounded-xl cursor-pointer transition border border-[#ded8cb] dark:border-[#233b2e]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Solid Opaque Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#ffffff] dark:bg-[#11261a] border-b border-[#ded8cb] dark:border-[#233b2e] px-4 sm:px-6 py-5 space-y-4 shadow-elevated animate-in fade-in slide-in-from-top-1 duration-150">
          
          {/* Mobile Locality Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-[#ece6d9] dark:border-[#233b2e]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7c8d82]">Service Area</span>
            <div className="flex items-center gap-1 text-xs font-bold text-[#193927] dark:text-[#dce8e1] bg-[#f4ece1] dark:bg-[#182c22] px-3 py-1 rounded-lg border border-[#ded8cb]">
              <MapPin className="w-3.5 h-3.5 text-[#a84422]" />
              <select
                value={selectedLocality}
                onChange={(e) => setSelectedLocality(e.target.value)}
                className="bg-transparent font-bold focus:outline-none cursor-pointer"
              >
                {LOCALITIES.map((loc) => (
                  <option key={loc} value={loc} className="dark:bg-[#13221b]">
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Action Grid */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 bg-[#f4ece1] dark:bg-[#182c22] rounded-xl text-xs font-bold text-[#193927] dark:text-[#dce8e1] text-center border border-[#ded8cb]"
            >
              Explore Guilds
            </Link>
            <Link
              href="/booking"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 bg-[#193927] text-white rounded-xl text-xs font-bold text-center shadow-xs"
            >
              Book Craftsman
            </Link>
            <Link
              href="/tracking"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 bg-[#f9ebe4] text-[#a84422] rounded-xl text-xs font-bold text-center border border-[#edd2c6]"
            >
              Live GPS Tracking
            </Link>
            <Link
              href="/worker/collective-bargaining"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 bg-[#edf5f0] text-[#193927] rounded-xl text-xs font-bold text-center border border-[#cbe1d3]"
            >
              Rate Governance
            </Link>
          </div>

          {/* Navigation Links List */}
          <div className="pt-2 space-y-1 text-sm border-t border-[#ece6d9] dark:border-[#233b2e]">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg font-semibold text-[#14221b] dark:text-[#edebe4] hover:bg-[#f4ece1]"
            >
              Home Page & Fare Specimen
            </Link>
            <Link
              href="/worker"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg font-semibold text-[#14221b] dark:text-[#edebe4] hover:bg-[#f4ece1]"
            >
              Worker Hub & Cooperative Earnings
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg font-semibold text-[#14221b] dark:text-[#edebe4] hover:bg-[#f4ece1]"
            >
              Federation Portal & AI Demand
            </Link>
            <Link
              href="/emergency"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg font-bold text-[#a84422] hover:bg-[#f9ebe4]"
            >
              Emergency 24/7 SOS Dispatch
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg font-semibold text-[#14221b] dark:text-[#edebe4] hover:bg-[#f4ece1]"
            >
              Wage Transparency Philosophy
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

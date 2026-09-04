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
    <nav aria-label="Main Navigation" className="w-full bg-[#ffffff] border-b border-[#ded8cb] shadow-xs relative z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-17 sm:h-19">
          
          {/* Left: Brand Emblem & Title */}
          <div className="flex items-center gap-3 sm:gap-5">
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#193927] border border-[#2d6243] flex items-center justify-center text-[#ffffff] font-serif font-bold text-lg sm:text-xl shadow-xs group-hover:bg-[#224c34] transition-colors shrink-0">
                <span>स</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-lg sm:text-xl lg:text-2xl font-extrabold text-[#14221b] tracking-tight font-serif">
                    SahakarSeva
                  </span>
                  <span className="text-[9px] bg-[#edf5f0] text-[#193927] border border-[#cbe1d3] px-2 py-0.2 rounded-full font-bold uppercase tracking-wider">
                    Co-op
                  </span>
                </div>
                <span className="hidden sm:flex text-[10px] text-[#224c34] font-semibold items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#2d6243] shrink-0" />
                  <span>NCCT Verified • Ministry of Cooperation</span>
                </span>
              </div>
            </Link>

            {/* Locality Picker for Laptop / Desktop (hidden on small tablet/mobile, available in drawer) */}
            <div className="relative hidden xl:block">
              <button
                onClick={() => setIsLocalityOpen(!isLocalityOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-[#f4ece1] hover:bg-[#ede7dc] text-[#193927] rounded-xl transition border border-[#ded8cb] cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-[#a84422] shrink-0" />
                <span className="max-w-[125px] truncate">{selectedLocality}</span>
                <ChevronDown className="w-3 h-3 text-[#7c8d82]" />
              </button>

              {isLocalityOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-[#ffffff] rounded-2xl shadow-elevated border border-[#ded8cb] py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3.5 py-1.5 text-[10px] font-bold text-[#7c8d82] uppercase tracking-wider border-b border-[#ece6d9] pb-1.5">
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
                            ? "font-bold text-[#193927] bg-[#edf5f0]"
                            : "text-[#4a5b51] hover:bg-[#f4ece1]"
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

          {/* Center: Desktop / Laptop Navigation Links (Active from lg: 1024px upwards) */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs xl:text-sm font-semibold">
            {/* Service Guilds Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center gap-1 text-[#14221b] hover:text-[#193927] transition py-1 cursor-pointer"
              >
                <span>Service Guilds</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#7c8d82]" />
              </button>

              {isCategoryOpen && (
                <div className="absolute left-0 mt-2 w-76 bg-[#ffffff] rounded-2xl shadow-elevated border border-[#ded8cb] p-3 z-50 space-y-1 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3 py-1 text-[10px] font-bold text-[#7c8d82] uppercase tracking-wider border-b border-[#ece6d9] pb-1.5 flex items-center justify-between">
                    <span>10 Registered Guilds</span>
                    <span className="text-[#a84422]">NCCT Tier-3</span>
                  </div>
                  <Link
                    href="/services"
                    onClick={() => setIsCategoryOpen(false)}
                    className="px-3 py-2 text-xs text-[#193927] font-bold hover:bg-[#edf5f0] rounded-lg flex items-center justify-between transition"
                  >
                    <span>Browse All 10 Guilds</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#a84422]" />
                  </Link>
                  <div className="max-h-64 overflow-y-auto space-y-0.5 pt-1">
                    {SERVICE_CATEGORIES.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/services?category=${cat.id}`}
                        onClick={() => setIsCategoryOpen(false)}
                        className="px-3 py-1.5 text-xs text-[#4a5b51] hover:bg-[#f4ece1] hover:text-[#14221b] rounded-lg flex items-center justify-between transition"
                      >
                        <span>{cat.name}</span>
                        <span className="text-[11px] font-bold text-[#193927]">From ₹{cat.startingPrice}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/services"
              className={`py-1 transition whitespace-nowrap ${
                pathname === "/services"
                  ? "text-[#193927] font-bold border-b-2 border-[#193927]"
                  : "text-[#4a5b51] hover:text-[#193927]"
              }`}
            >
              Find Craftsmen
            </Link>

            <Link
              href="/booking"
              className={`py-1 transition whitespace-nowrap ${
                pathname === "/booking"
                  ? "text-[#193927] font-bold border-b-2 border-[#193927]"
                  : "text-[#4a5b51] hover:text-[#193927]"
              }`}
            >
              Book Service
            </Link>

            <Link
              href="/worker/collective-bargaining"
              className={`py-1 transition whitespace-nowrap ${
                pathname.includes("/collective-bargaining")
                  ? "text-[#193927] font-bold border-b-2 border-[#193927]"
                  : "text-[#4a5b51] hover:text-[#193927]"
              }`}
            >
              Rate Governance
            </Link>

            <Link
              href="/about"
              className={`py-1 transition whitespace-nowrap ${
                pathname === "/about"
                  ? "text-[#193927] font-bold border-b-2 border-[#193927]"
                  : "text-[#4a5b51] hover:text-[#193927]"
              }`}
            >
              Ledger Philosophy
            </Link>

            {activeBooking && (
              <Link
                href="/tracking"
                className="flex items-center gap-1.5 text-[#a84422] font-bold bg-[#f9ebe4] border border-[#edd2c6] px-2.5 py-1 rounded-full text-xs animate-pulse whitespace-nowrap"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Worker En Route</span>
              </Link>
            )}
          </div>

          {/* Right: Actions & Urgent Service */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector (Laptop/Desktop) */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-[#506155] hover:bg-[#f4ece1] rounded-xl transition border border-[#ded8cb] cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="uppercase">{language}</span>
                <ChevronDown className="w-3 h-3 text-[#7c8d82]" />
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-[#ffffff] rounded-2xl shadow-elevated border border-[#ded8cb] py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-1.5 text-xs transition cursor-pointer ${
                        language === lang.code
                          ? "font-bold text-[#193927] bg-[#edf5f0]"
                          : "text-[#4a5b51] hover:bg-[#f4ece1]"
                      }`}
                    >
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Urgent Service Callout Button */}
            <Link
              href="/emergency"
              className="flex items-center gap-1.5 sm:gap-2 bg-[#a84422] hover:bg-[#8c381c] text-[#ffffff] px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs whitespace-nowrap"
            >
              <PhoneCall className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Urgent Service</span>
              <span className="sm:hidden">SOS</span>
            </Link>

            {/* Mobile & Tablet Hamburger Button (Visible below lg: 1024px) */}
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 text-[#14221b] hover:bg-[#f4ece1] rounded-xl cursor-pointer transition border border-[#ded8cb] flex items-center justify-center"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Solid Opaque Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#ffffff] border-b border-[#ded8cb] px-4 sm:px-6 py-5 space-y-4 shadow-elevated animate-in fade-in slide-in-from-top-1 duration-150">
          
          {/* Mobile Locality Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-[#ece6d9]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7c8d82]">Service Area</span>
            <div className="flex items-center gap-1 text-xs font-bold text-[#193927] bg-[#f4ece1] px-3 py-1.5 rounded-xl border border-[#ded8cb]">
              <MapPin className="w-3.5 h-3.5 text-[#a84422] shrink-0" />
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

          {/* Quick Action Grid */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 bg-[#f4ece1] rounded-xl text-xs font-bold text-[#193927] text-center border border-[#ded8cb]"
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
          <div className="pt-2 space-y-1 text-sm border-t border-[#ece6d9]">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg font-semibold text-[#14221b] hover:bg-[#f4ece1]"
            >
              Home Page & Fare Specimen
            </Link>
            <Link
              href="/worker"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg font-semibold text-[#14221b] hover:bg-[#f4ece1]"
            >
              Worker Hub & Cooperative Earnings
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg font-semibold text-[#14221b] hover:bg-[#f4ece1]"
            >
              Federation Portal & AI Demand
            </Link>
            <Link
              href="/emergency"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg font-bold text-[#a84422] hover:bg-[#f9ebe4]"
            >
              Emergency 24/7 SOS Dispatch
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg font-semibold text-[#14221b] hover:bg-[#f4ece1]"
            >
              Wage Transparency Philosophy
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

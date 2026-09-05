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
  ArrowRight,
  Sparkles,
  Zap,
  Users,
  Search,
  CheckCircle2
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
    <nav aria-label="Main Navigation" className="w-full bg-[#ffffff] border-b border-[#e2e8f0] shadow-xs relative z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-17 sm:h-18">
          
          {/* Left: Modern Tech Brand & Locality Selector */}
          <div className="flex items-center gap-3 sm:gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-[#0f172a] to-[#1e293b] text-[#10b981] flex items-center justify-center font-black text-xl shadow-xs group-hover:scale-105 transition-transform shrink-0">
                <Zap className="w-5 h-5 text-[#10b981] fill-[#10b981]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-black text-[#0f172a] tracking-tight font-sans">
                    Sahakar<span className="text-[#059669]">Seva</span>
                  </span>
                  <span className="text-[9px] bg-[#ecfdf5] text-[#059669] border border-[#a7f3d0] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    Gig Co-op
                  </span>
                </div>
                <span className="hidden sm:flex text-[10px] text-[#64748b] font-medium items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#059669] shrink-0" />
                  <span>NCCT Certified • 100% Worker Owned</span>
                </span>
              </div>
            </Link>

            {/* Seamless Locality Picker (Urban Company style) */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setIsLocalityOpen(!isLocalityOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#0f172a] rounded-xl transition border border-[#e2e8f0] cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-[#ea580c] shrink-0" />
                <span className="max-w-[130px] truncate">{selectedLocality}</span>
                <ChevronDown className="w-3 h-3 text-[#64748b]" />
              </button>

              {isLocalityOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-[#ffffff] rounded-2xl shadow-elevated border border-[#e2e8f0] py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3.5 py-1.5 text-[10px] font-bold text-[#64748b] uppercase tracking-wider border-b border-[#f1f5f9] pb-1.5">
                    Select Delivery Locality
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
                            ? "font-bold text-[#059669] bg-[#ecfdf5]"
                            : "text-[#334155] hover:bg-[#f8fafc]"
                        }`}
                      >
                        <span>{loc}</span>
                        {selectedLocality === loc && <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Center: Modern Gig Navigation (Laptop / Desktop) */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs xl:text-sm font-semibold">
            {/* Service Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center gap-1 text-[#334155] hover:text-[#0f172a] transition py-1 cursor-pointer font-bold"
              >
                <span>Services</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#64748b]" />
              </button>

              {isCategoryOpen && (
                <div className="absolute left-0 mt-2 w-80 bg-[#ffffff] rounded-2xl shadow-elevated border border-[#e2e8f0] p-3 z-50 space-y-1 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3 py-1 text-[10px] font-bold text-[#64748b] uppercase tracking-wider border-b border-[#f1f5f9] pb-1.5 flex items-center justify-between">
                    <span>10 Verified Gig Categories</span>
                    <span className="text-[#059669]">15-Min Arrival</span>
                  </div>
                  <Link
                    href="/services"
                    onClick={() => setIsCategoryOpen(false)}
                    className="px-3 py-2 text-xs text-[#059669] font-bold hover:bg-[#ecfdf5] rounded-lg flex items-center justify-between transition"
                  >
                    <span>Explore All 10 Categories</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <div className="max-h-64 overflow-y-auto space-y-0.5 pt-1">
                    {SERVICE_CATEGORIES.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/services?category=${cat.id}`}
                        onClick={() => setIsCategoryOpen(false)}
                        className="px-3 py-1.5 text-xs text-[#475569] hover:bg-[#f8fafc] hover:text-[#0f172a] rounded-lg flex items-center justify-between transition"
                      >
                        <span>{cat.name}</span>
                        <span className="text-[11px] font-bold text-[#059669]">From ₹{cat.startingPrice}</span>
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
                  ? "text-[#059669] font-bold border-b-2 border-[#059669]"
                  : "text-[#334155] hover:text-[#0f172a]"
              }`}
            >
              Find Workers
            </Link>

            <Link
              href="/booking"
              className={`py-1 transition whitespace-nowrap ${
                pathname === "/booking"
                  ? "text-[#059669] font-bold border-b-2 border-[#059669]"
                  : "text-[#334155] hover:text-[#0f172a]"
              }`}
            >
              Book Service
            </Link>

            <Link
              href="/worker/collective-bargaining"
              className={`py-1 transition whitespace-nowrap ${
                pathname.includes("/collective-bargaining")
                  ? "text-[#059669] font-bold border-b-2 border-[#059669]"
                  : "text-[#334155] hover:text-[#0f172a]"
              }`}
            >
              Rate Voting
            </Link>

            <Link
              href="/about"
              className={`py-1 transition whitespace-nowrap ${
                pathname === "/about"
                  ? "text-[#059669] font-bold border-b-2 border-[#059669]"
                  : "text-[#334155] hover:text-[#0f172a]"
              }`}
            >
              Fair Ledger
            </Link>

            {activeBooking && (
              <Link
                href="/tracking"
                className="flex items-center gap-1.5 text-[#ea580c] font-bold bg-[#fff7ed] border border-[#ffedd5] px-2.5 py-1 rounded-full text-xs animate-pulse whitespace-nowrap"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Worker En Route</span>
              </Link>
            )}
          </div>

          {/* Right: Actions (Language, SOS, Hamburger) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-[#64748b] hover:bg-[#f1f5f9] rounded-xl transition border border-[#e2e8f0] cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="uppercase">{language}</span>
                <ChevronDown className="w-3 h-3 text-[#64748b]" />
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-[#ffffff] rounded-2xl shadow-elevated border border-[#e2e8f0] py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-1.5 text-xs transition cursor-pointer ${
                        language === lang.code
                          ? "font-bold text-[#059669] bg-[#ecfdf5]"
                          : "text-[#475569] hover:bg-[#f8fafc]"
                      }`}
                    >
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Urgent Service Button */}
            <Link
              href="/emergency"
              className="flex items-center gap-1.5 bg-[#ea580c] hover:bg-[#c2410c] text-[#ffffff] px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-xs whitespace-nowrap"
            >
              <PhoneCall className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Urgent SOS</span>
              <span className="sm:hidden">SOS</span>
            </Link>

            {/* Mobile / Tablet Menu Button */}
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 text-[#0f172a] hover:bg-[#f1f5f9] rounded-xl cursor-pointer transition border border-[#e2e8f0] flex items-center justify-center"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Solid Opaque Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#ffffff] border-b border-[#e2e8f0] px-4 sm:px-6 py-5 space-y-4 shadow-elevated animate-in fade-in slide-in-from-top-1 duration-150">
          
          {/* Mobile Locality Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-[#f1f5f9]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748b]">Service Location</span>
            <div className="flex items-center gap-1 text-xs font-bold text-[#0f172a] bg-[#f1f5f9] px-3 py-1.5 rounded-xl border border-[#e2e8f0]">
              <MapPin className="w-3.5 h-3.5 text-[#ea580c] shrink-0" />
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
              className="p-3 bg-[#f8fafc] rounded-xl text-xs font-bold text-[#0f172a] text-center border border-[#e2e8f0] hover:border-[#059669]"
            >
              Explore Services
            </Link>
            <Link
              href="/booking"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 bg-[#0f172a] text-[#ffffff] rounded-xl text-xs font-bold text-center shadow-xs"
            >
              Book Service
            </Link>
            <Link
              href="/tracking"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 bg-[#fff7ed] text-[#ea580c] rounded-xl text-xs font-bold text-center border border-[#ffedd5]"
            >
              Live Tracking
            </Link>
            <Link
              href="/worker/collective-bargaining"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 bg-[#ecfdf5] text-[#059669] rounded-xl text-xs font-bold text-center border border-[#a7f3d0]"
            >
              Rate Voting
            </Link>
          </div>

          {/* Navigation Links List */}
          <div className="pt-2 space-y-1 text-sm border-t border-[#f1f5f9]">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg font-semibold text-[#0f172a] hover:bg-[#f8fafc]"
            >
              Home & Live Wage Specimen
            </Link>
            <Link
              href="/worker"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg font-semibold text-[#0f172a] hover:bg-[#f8fafc]"
            >
              Worker Hub & Earnings
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg font-semibold text-[#0f172a] hover:bg-[#f8fafc]"
            >
              Federation Portal & Demand AI
            </Link>
            <Link
              href="/emergency"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg font-bold text-[#ea580c] hover:bg-[#fff7ed]"
            >
              Emergency SOS 24/7 Dispatch
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg font-semibold text-[#0f172a] hover:bg-[#f8fafc]"
            >
              100% Itemized Wage Philosophy
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

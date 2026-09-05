"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useApp, UserRole } from "@/context/AppContext";
import { SERVICE_CATEGORIES, LOCALITIES, WORKERS } from "@/lib/mockData";
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
  Search,
  Command,
  Star,
  Sparkles,
  Bell,
  Activity,
  LocateFixed,
  Vote,
  FileSpreadsheet,
  Layers,
  Wrench,
  Clock,
  ExternalLink,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const {
    role,
    setRole,
    selectedLocality,
    setSelectedLocality,
    activeBooking,
    isCrisisMode,
    toggleCrisisMode,
    setSelectedWorkerForBooking,
    showToast
  } = useApp();

  // State management for dropdowns and overlays
  const [isLocalityOpen, setIsLocalityOpen] = useState(false);
  const [isCategoryMegaOpen, setIsCategoryMegaOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [cmdSearchQuery, setCmdSearchQuery] = useState("");
  const [activeCommandTab, setActiveCommandTab] = useState<"all" | "services" | "workers" | "nav">("all");
  const [isLocating, setIsLocating] = useState(false);
  const [locSearch, setLocSearch] = useState("");

  const localityRef = useRef<HTMLDivElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (localityRef.current && !localityRef.current.contains(e.target as Node)) {
        setIsLocalityOpen(false);
      }
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node)) {
        setIsCategoryMegaOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(e.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 21st.dev Signature Tubelight Navigation Links
  const navLinks = [
    { id: "booking", label: "Book Service", href: "/booking" },
    { id: "voting", label: "Rate Voting", href: "/worker/collective-bargaining", badge: "Live" },
    { id: "ledger", label: "Wage Ledger", href: "/about" },
  ];

  // Shortcut listener for Cmd+K / Ctrl+K (Signature 21st.dev Spotlight Feature)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsCommandOpen(false);
        setIsCategoryMegaOpen(false);
        setIsLocalityOpen(false);
        setIsNotificationsOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filtered lists for Command Palette
  const filteredCommandCategories = SERVICE_CATEGORIES.filter((c) =>
    c.name.toLowerCase().includes(cmdSearchQuery.toLowerCase())
  );

  const filteredCommandWorkers = WORKERS.filter((w) =>
    w.name.toLowerCase().includes(cmdSearchQuery.toLowerCase()) ||
    w.category.toLowerCase().includes(cmdSearchQuery.toLowerCase())
  );

  // Filtered Localities
  const filteredLocalities = LOCALITIES.filter((loc) =>
    loc.toLowerCase().includes(locSearch.toLowerCase())
  );

  // Simulated GPS Location Detection
  const handleDetectLocation = () => {
    setIsLocating(true);
    setTimeout(() => {
      setSelectedLocality("Indiranagar, Ward 112");
      setIsLocating(false);
      setIsLocalityOpen(false);
      showToast("Location Verified", "GPS linked to Indiranagar, Ward 112 (Cluster 4)");
    }, 600);
  };

  // 21st.dev Live Co-op Notification Feed
  const notifications = [
    {
      id: "n1",
      title: "Monsoon Surge Cap Active",
      desc: "Worker Assembly voted 1.0x cap (Zero predatory surge)",
      time: "10m ago",
      type: "governance",
      icon: <Vote className="w-3.5 h-3.5 text-emerald-600" />
    },
    {
      id: "n2",
      title: "428 Craftsmen Online",
      desc: "Avg arrival in Indiranagar: 14 minutes",
      time: "25m ago",
      type: "dispatch",
      icon: <Zap className="w-3.5 h-3.5 text-amber-500" />
    },
    {
      id: "n3",
      title: "100% Itemized Payouts",
      desc: "₹1,48,200 deposited to worker bank accounts today",
      time: "1h ago",
      type: "finance",
      icon: <FileSpreadsheet className="w-3.5 h-3.5 text-blue-500" />
    }
  ];

  return (
    <>
      <header className="sticky top-3 z-50 w-full px-3 sm:px-6 max-w-7xl mx-auto transition-all">
        {/* 21st.dev Floating Island Pill Container */}
        <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-2xl sm:rounded-full px-3 sm:px-5 h-15 sm:h-16 flex items-center justify-between gap-2 sm:gap-3 relative">
          
          {/* Left: Brand & Cooperative Badge */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center font-black shadow-xs group-hover:scale-105 transition-transform shrink-0">
                <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight font-sans">
                    Sahakar<span className="text-emerald-600">Seva</span>
                  </span>
                  <span className="hidden xl:inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-bold">
                    100% Co-op
                  </span>
                </div>
              </div>
            </Link>

            {/* 21st.dev Style Interactive Location Selector Pill */}
            <div className="relative hidden md:block" ref={localityRef}>
              <button
                onClick={() => setIsLocalityOpen(!isLocalityOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-slate-100/90 hover:bg-slate-200 text-slate-700 rounded-full transition cursor-pointer border border-slate-200/60"
                aria-expanded={isLocalityOpen}
              >
                <MapPin className="w-3 h-3 text-orange-600 shrink-0" />
                <span className="max-w-[115px] truncate">{selectedLocality}</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isLocalityOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Location Popover with GPS Detect & Search */}
              <AnimatePresence>
                {isLocalityOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 mt-2.5 w-72 bg-white rounded-2xl shadow-elevated border border-slate-200 p-3 z-50"
                  >
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Delivery Ward
                      </span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                        15-Min Coverage
                      </span>
                    </div>

                    {/* GPS Auto Detect Button */}
                    <button
                      onClick={handleDetectLocation}
                      disabled={isLocating}
                      className="w-full mb-2.5 py-1.5 px-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 text-emerald-700 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer border border-emerald-200/60"
                    >
                      <LocateFixed className={`w-3.5 h-3.5 text-emerald-600 ${isLocating ? "animate-spin" : ""}`} />
                      <span>{isLocating ? "Detecting GPS Ward..." : "Use Current Ward (GPS)"}</span>
                    </button>

                    {/* Filter Input */}
                    <div className="relative mb-2">
                      <Search className="w-3 h-3 text-slate-400 absolute left-2.5 top-2" />
                      <input
                        type="text"
                        placeholder="Search locality..."
                        value={locSearch}
                        onChange={(e) => setLocSearch(e.target.value)}
                        className="w-full text-xs pl-7 pr-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    {/* Locality Items */}
                    <div className="max-h-48 overflow-y-auto space-y-0.5">
                      {filteredLocalities.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => {
                            setSelectedLocality(loc);
                            setIsLocalityOpen(false);
                            showToast("Ward Updated", `Active zone: ${loc}`);
                          }}
                          className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg flex items-center justify-between transition cursor-pointer ${
                            selectedLocality === loc
                              ? "font-bold text-emerald-700 bg-emerald-50"
                              : "text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          <span className="truncate">{loc}</span>
                          {selectedLocality === loc && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Center: 21st.dev Tubelight Navigation Island with Lamp Glow */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/70 text-xs font-semibold relative">
            
            {/* 21st.dev Interactive Mega-Menu Trigger */}
            <div className="relative" ref={megaMenuRef}>
              <button
                onClick={() => setIsCategoryMegaOpen(!isCategoryMegaOpen)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition cursor-pointer ${
                  isCategoryMegaOpen
                    ? "bg-white text-slate-900 shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                aria-expanded={isCategoryMegaOpen}
              >
                <span>Services</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isCategoryMegaOpen ? "rotate-180" : ""}`} />
              </button>

              {/* 21st.dev Style Rich Mega-Menu Flyout */}
              <AnimatePresence>
                {isCategoryMegaOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 mt-3 w-[580px] bg-white/98 backdrop-blur-xl rounded-3xl shadow-elevated border border-slate-200 p-4 z-50"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {/* Left: Popular Fast-Book Services */}
                      <div>
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Popular Categories
                          </span>
                          <Link
                            href="/services"
                            onClick={() => setIsCategoryMegaOpen(false)}
                            className="text-[11px] font-bold text-emerald-600 hover:underline flex items-center gap-0.5"
                          >
                            All 10
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                        <div className="space-y-1">
                          {SERVICE_CATEGORIES.slice(0, 5).map((cat) => (
                            <Link
                              key={cat.id}
                              href={`/services?category=${cat.id}`}
                              onClick={() => setIsCategoryMegaOpen(false)}
                              className="group flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition"
                            >
                              <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs group-hover:bg-emerald-600 group-hover:text-white transition">
                                  ⚡
                                </div>
                                <div>
                                  <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">
                                    {cat.name}
                                  </div>
                                  <div className="text-[10px] text-slate-400">4.9 ★ • {cat.itemCount} pros</div>
                                </div>
                              </div>
                              <span className="text-[11px] font-extrabold text-emerald-600 bg-emerald-50/80 px-2 py-0.5 rounded-full">
                                ₹{cat.startingPrice}+
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Right: SahakarAI & Co-op Highlights */}
                      <div className="flex flex-col justify-between border-l border-slate-100 pl-4">
                        <div>
                          <div className="pb-2 mb-2 border-b border-slate-100">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              Smart Diagnostic & Co-op
                            </span>
                          </div>

                          {/* SahakarAI Card */}
                          <Link
                            href="/booking?tab=diagnostic"
                            onClick={() => setIsCategoryMegaOpen(false)}
                            className="block p-3 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-200/80 hover:border-emerald-300 transition group mb-2.5"
                          >
                            <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs mb-1">
                              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                              <span>SahakarAI Diagnostician</span>
                            </div>
                            <p className="text-[11px] text-slate-600 line-clamp-2">
                              Describe your symptom or upload a photo to get fair estimated time and democratic wage breakdown.
                            </p>
                            <div className="mt-2 text-[10px] font-bold text-emerald-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                              Try Diagnostic →
                            </div>
                          </Link>

                          {/* Zero Surge Protection Note */}
                          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 text-[11px] text-slate-600 space-y-1">
                            <div className="flex items-center gap-1 text-slate-900 font-bold">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Cooperative Price Lock</span>
                            </div>
                            <p className="text-[10px] text-slate-500">
                              Never pay 2x-3x surge. All base rates and emergency multipliers are voted transparently by registered guilds.
                            </p>
                          </div>
                        </div>

                        {/* Transparency Banner */}
                        <div className="pt-2 text-[10px] font-medium text-slate-400 flex items-center justify-between">
                          <span>Ministry of Cooperation / NCCT</span>
                          <span className="text-emerald-600 font-bold">SIH PS 26089</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tubelight Links with Ayushmaan Singh Lamp Glow Effect */}
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`relative px-3 py-1.5 rounded-full transition whitespace-nowrap ${
                    isActive
                      ? "text-slate-900 font-bold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-1">
                    {link.label}
                    {link.badge && (
                      <span className="bg-emerald-500 text-white text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider">
                        {link.badge}
                      </span>
                    )}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="tubelight-active"
                      className="absolute inset-0 bg-white rounded-full shadow-xs -z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    >
                      {/* 21st.dev Tubelight Lamp & Beam Reflection */}
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-8 h-[2.5px] bg-emerald-500 rounded-full blur-[0.5px]">
                        <div className="absolute w-12 h-4 bg-emerald-500/25 rounded-full blur-md -top-1.5 -left-2" />
                      </div>
                    </motion.div>
                  )}
                </Link>
              );
            })}

            {/* 21st.dev Spotlight Cmd+K Search Trigger */}
            <button
              onClick={() => setIsCommandOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-slate-500 hover:text-slate-800 hover:bg-white/70 transition ml-0.5 cursor-pointer border border-transparent hover:border-slate-200/60"
              title="Press ⌘K to open Spotlight"
            >
              <Search className="w-3 h-3 text-slate-400" />
              <span className="text-[11px]">Search</span>
              <kbd className="text-[9px] bg-slate-200/80 text-slate-600 px-1.5 py-0.5 rounded font-mono font-bold">
                ⌘K
              </kbd>
            </button>
          </nav>

          {/* Right: Actions, Notifications & Role Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            
            {/* 21st.dev Live Co-op Activity Notifications Hub */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer border border-slate-200/60"
                title="Live Co-op Activity"
                aria-label="Cooperative Live Notifications"
              >
                <Bell className="w-4 h-4" />
                {/* 21st.dev Pulse Ping Indicator */}
                <span className="absolute top-1 right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </button>

              {/* Notification Popover */}
              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2.5 w-80 bg-white rounded-2xl shadow-elevated border border-slate-200 p-3.5 z-50"
                  >
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-xs font-bold text-slate-900">Cooperative Pulse</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        Live Feed
                      </span>
                    </div>

                    <div className="space-y-2">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition flex items-start gap-2.5"
                        >
                          <div className="w-7 h-7 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center shrink-0 shadow-2xs">
                            {n.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-800">{n.title}</span>
                              <span className="text-[9px] text-slate-400">{n.time}</span>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{n.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                      <span>Audited by NCCT / PS 26089</span>
                      <Link
                        href="/about"
                        onClick={() => setIsNotificationsOpen(false)}
                        className="text-emerald-600 font-bold hover:underline"
                      >
                        Transparency Report →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 21st.dev Segmented Role Pill Switcher */}
            <div className="hidden sm:flex items-center bg-slate-100 p-0.5 rounded-full border border-slate-200/80 text-[11px] font-semibold relative">
              {[
                { id: "customer", label: "Customer", icon: <User className="w-3 h-3" /> },
                { id: "worker", label: "Worker", icon: <HardHat className="w-3 h-3" /> },
                { id: "admin", label: "Admin", icon: <ShieldCheck className="w-3 h-3" /> },
              ].map((r) => {
                const isActive = role === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => {
                      setRole(r.id as UserRole);
                      showToast("View Switched", `Active prototype mode: ${r.label} View`);
                    }}
                    className={`relative flex items-center gap-1 px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                      isActive ? "text-white font-bold" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-1">
                      {r.icon}
                      <span>{r.label}</span>
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="role-active-pill"
                        className="absolute inset-0 bg-slate-900 rounded-full shadow-xs"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Active Booking Live GPS Tracker Pill */}
            {activeBooking && (
              <Link
                href="/tracking"
                className="hidden md:flex items-center gap-1 bg-orange-50 text-orange-600 border border-orange-200 px-2.5 py-1 rounded-full text-xs font-bold animate-pulse whitespace-nowrap"
              >
                <Navigation className="w-3 h-3" />
                <span>En Route</span>
              </Link>
            )}

            {/* Urgent Service SOS Button */}
            <Link
              href="/emergency"
              className="flex items-center gap-1 bg-orange-600 hover:bg-orange-700 text-white px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold transition shadow-xs whitespace-nowrap"
            >
              <PhoneCall className="w-3 h-3 shrink-0" />
              <span className="hidden sm:inline">Urgent SOS</span>
              <span className="sm:hidden">SOS</span>
            </Link>

            {/* Mobile Menu Toggle Button */}
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
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="lg:hidden absolute top-18 left-3 right-3 bg-white/98 backdrop-blur-2xl rounded-3xl border border-slate-200/90 shadow-elevated p-4 space-y-3.5 z-50"
            >
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
                      onClick={() => {
                        setRole(r.id as UserRole);
                        setMobileMenuOpen(false);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                        role === r.id ? "bg-slate-900 text-white shadow-xs" : "text-slate-600"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Selector in Mobile */}
              <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs">
                <span className="font-semibold text-slate-500">Location:</span>
                <div className="flex items-center gap-1 text-slate-900 font-bold">
                  <MapPin className="w-3.5 h-3.5 text-orange-600" />
                  <select
                    value={selectedLocality}
                    onChange={(e) => setSelectedLocality(e.target.value)}
                    className="bg-transparent font-bold focus:outline-none cursor-pointer max-w-[180px] truncate"
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

              {/* Co-op Notification Pill in Mobile Drawer */}
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-emerald-900 font-bold">428 Craftsmen Active</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                  0% Commission
                </span>
              </div>

              {/* List Links */}
              <div className="pt-2 space-y-1 text-xs font-semibold border-t border-slate-100">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50"
                >
                  Home & Live Wage Specimen
                </Link>
                <Link
                  href="/worker"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50"
                >
                  Worker Hub & Itemized Earnings
                </Link>
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50"
                >
                  Federation Oversight Portal
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50"
                >
                  100% Itemized Wage Philosophy
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 21st.dev Spotlight Command Palette Dialog (⌘K) with Filter Chips & Actions */}
      <AnimatePresence>
        {isCommandOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.15 }}
              className="bg-white rounded-3xl shadow-elevated border border-slate-200 w-full max-w-xl overflow-hidden"
            >
              {/* Search Header */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  autoFocus
                  value={cmdSearchQuery}
                  onChange={(e) => setCmdSearchQuery(e.target.value)}
                  placeholder="Type a craft, symptom or pro (e.g. Electrician, Leak, Ramesh)..."
                  className="w-full text-sm font-medium focus:outline-none placeholder:text-slate-400 text-slate-900"
                />
                <button
                  onClick={() => setIsCommandOpen(false)}
                  className="text-xs bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md text-slate-600 font-mono cursor-pointer"
                >
                  ESC
                </button>
              </div>

              {/* 21st.dev Filter Category Pills */}
              <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-50/80 border-b border-slate-100 text-xs font-semibold overflow-x-auto">
                <button
                  onClick={() => setActiveCommandTab("all")}
                  className={`px-2.5 py-1 rounded-full cursor-pointer transition ${
                    activeCommandTab === "all"
                      ? "bg-slate-900 text-white font-bold shadow-2xs"
                      : "text-slate-600 hover:bg-slate-200/60"
                  }`}
                >
                  All Matches
                </button>
                <button
                  onClick={() => setActiveCommandTab("services")}
                  className={`px-2.5 py-1 rounded-full cursor-pointer transition ${
                    activeCommandTab === "services"
                      ? "bg-emerald-600 text-white font-bold shadow-2xs"
                      : "text-slate-600 hover:bg-slate-200/60"
                  }`}
                >
                  ⚡ Services ({filteredCommandCategories.length})
                </button>
                <button
                  onClick={() => setActiveCommandTab("workers")}
                  className={`px-2.5 py-1 rounded-full cursor-pointer transition ${
                    activeCommandTab === "workers"
                      ? "bg-emerald-600 text-white font-bold shadow-2xs"
                      : "text-slate-600 hover:bg-slate-200/60"
                  }`}
                >
                  👷 Craftsmen ({filteredCommandWorkers.length})
                </button>
                <button
                  onClick={() => setActiveCommandTab("nav")}
                  className={`px-2.5 py-1 rounded-full cursor-pointer transition ${
                    activeCommandTab === "nav"
                      ? "bg-emerald-600 text-white font-bold shadow-2xs"
                      : "text-slate-600 hover:bg-slate-200/60"
                  }`}
                >
                  🧭 Navigation
                </button>
              </div>

              {/* Search Results List */}
              <div className="p-3 max-h-84 overflow-y-auto space-y-3">
                {/* Fast Nav Options */}
                {(activeCommandTab === "all" || activeCommandTab === "nav") && (
                  <div className="space-y-1">
                    <div className="px-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Quick Shortcuts
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => {
                          router.push("/booking");
                          setIsCommandOpen(false);
                        }}
                        className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50 transition text-left cursor-pointer border border-slate-100"
                      >
                        <Wrench className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-bold text-slate-800">Book Instant Pro</span>
                      </button>
                      <button
                        onClick={() => {
                          router.push("/worker/collective-bargaining");
                          setIsCommandOpen(false);
                        }}
                        className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50 transition text-left cursor-pointer border border-slate-100"
                      >
                        <Vote className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-bold text-slate-800">Rate Governance</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Categories */}
                {(activeCommandTab === "all" || activeCommandTab === "services") && (
                  <div className="space-y-1">
                    <div className="px-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Service Categories
                    </div>
                    {filteredCommandCategories.slice(0, 4).map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          router.push(`/services?category=${c.id}`);
                          setIsCommandOpen(false);
                        }}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition text-left cursor-pointer group"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                            ⚡
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-600">
                              {c.name}
                            </div>
                            <div className="text-[10px] text-slate-400">{c.itemCount} verified craftsmen available</div>
                          </div>
                        </div>
                        <div className="text-xs font-extrabold text-emerald-600">₹{c.startingPrice}+</div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Workers */}
                {(activeCommandTab === "all" || activeCommandTab === "workers") && (
                  <div className="space-y-1">
                    <div className="px-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Neighborhood Craftsmen
                    </div>
                    {filteredCommandWorkers.slice(0, 3).map((w) => (
                      <button
                        key={w.id}
                        onClick={() => {
                          setSelectedWorkerForBooking(w);
                          router.push(`/booking?workerId=${w.id}`);
                          setIsCommandOpen(false);
                        }}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition text-left cursor-pointer group"
                      >
                        <div className="flex items-center gap-2.5">
                          <img src={w.avatar} alt={w.name} className="w-7 h-7 rounded-full object-cover" />
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-600">
                              {w.name}
                            </div>
                            <div className="text-[10px] text-slate-400">★ {w.rating} • {w.category}</div>
                          </div>
                        </div>
                        <div className="text-xs font-bold text-slate-700">₹{w.hourlyRate}/hr</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer Tip */}
              <div className="bg-slate-50 px-4 py-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Navigate with mouse or arrow keys</span>
                <span className="font-semibold text-emerald-700">100% Co-op Transparent Booking</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

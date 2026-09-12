"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useApp, UserRole } from "@/context/AppContext";
import { LOCALITIES, SERVICE_CATEGORIES } from "@/lib/mockData";
import {
  MapPin,
  ChevronDown,
  ShoppingCart,
  PhoneCall,
  Menu,
  X,
  CheckCircle2,
  User,
  HardHat,
  ShieldCheck,
  Clock,
  Sparkles,
  Users,
  Search,
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
    cartItems,
    setIsCartDrawerOpen,
    showToast,
  } = useApp();

  const [isLocalityOpen, setIsLocalityOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const localityRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const cartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  // Close popovers on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (localityRef.current && !localityRef.current.contains(e.target as Node)) {
        setIsLocalityOpen(false);
      }
      if (roleRef.current && !roleRef.current.contains(e.target as Node)) {
        setIsRoleMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { label: "All Services", href: "/services" },
    { label: "⚡ Hourly Instahelp", href: "/#instahelp" },
    { label: "👥 Crews & Packs", href: "/#crews" },
    { label: "Track Dispatch", href: "/tracking" },
    { label: "Co-op Trust & XAI", href: "/#trust" },
  ];

  return (
    <>
      {/* 21st.dev Style Floating Header */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Left: Brand + Ward Location Pill */}
          <div className="flex items-center gap-3 sm:gap-6 shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-sm shadow-2xs group-hover:scale-105 transition-transform">
                स
              </div>
              <span className="text-xl font-black text-slate-900 tracking-tight">
                Sahakar<span className="text-slate-900">Seva</span>
              </span>
              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                15m
              </span>
            </Link>

            {/* Ward Locality Chip */}
            <div className="relative hidden md:block" ref={localityRef}>
              <button
                onClick={() => setIsLocalityOpen(!isLocalityOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 transition cursor-pointer"
                title="Select Service Ward"
              >
                <MapPin className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                <span className="max-w-[150px] truncate">{selectedLocality}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {/* Locality Dropdown */}
              <AnimatePresence>
                {isLocalityOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-elevated border border-slate-200 p-2 z-50"
                  >
                    <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1 mb-1">
                      Choose Service Ward (15-Min Coverage)
                    </div>
                    <div className="max-h-56 overflow-y-auto space-y-0.5">
                      {LOCALITIES.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => {
                            setSelectedLocality(loc);
                            setIsLocalityOpen(false);
                            showToast("Ward Updated", `Active zone: ${loc}`);
                          }}
                          className={`w-full text-left px-3 py-2 text-xs rounded-xl flex items-center justify-between transition cursor-pointer ${
                            selectedLocality === loc
                              ? "bg-slate-900 text-white font-bold"
                              : "text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          <span>{loc}</span>
                          {selectedLocality === loc && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Center: Clean 21st.dev Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  pathname === item.href
                    ? "text-slate-900 bg-slate-100"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right: SOS Emergency, Cart Trigger & Role Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            
            {/* Urgent SOS Button */}
            <Link
              href="/emergency"
              className="flex items-center gap-1 sm:gap-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-2xs"
            >
              <PhoneCall className="w-3 h-3 text-rose-600 animate-pulse" />
              <span className="hidden sm:inline">SOS Emergency</span>
              <span className="sm:hidden font-extrabold">SOS</span>
            </Link>

            {/* Cart Button with Counter */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative flex items-center gap-1 sm:gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition shadow-2xs cursor-pointer"
              title="Open Dispatch Cart"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-black">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Role Switcher Menu (Desktop only, mobile has it in drawer) */}
            <div className="relative hidden md:block" ref={roleRef}>
              <button
                onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/70 border border-slate-200 text-xs font-bold text-slate-800 transition cursor-pointer"
                title="Switch Perspective"
              >
                <User className="w-3.5 h-3.5 text-slate-600" />
                <span className="capitalize">{role}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              <AnimatePresence>
                {isRoleMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-elevated border border-slate-200 p-2 z-50"
                  >
                    <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1 mb-1">
                      Switch Platform Perspective
                    </div>
                    <div className="space-y-1">
                      <button
                        onClick={() => {
                          setRole("customer");
                          setIsRoleMenuOpen(false);
                          router.push("/customer");
                          showToast("Customer Portal", "Switched to Customer view");
                        }}
                        className={`w-full text-left px-3 py-2 text-xs rounded-xl flex items-center gap-2.5 transition cursor-pointer ${
                          role === "customer" ? "bg-slate-900 text-white font-bold" : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <User className="w-3.5 h-3.5" />
                        <div>
                          <div className="font-bold">Customer Portal</div>
                          <div className="text-[10px] opacity-70">Bookings & wage transparency</div>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          setRole("worker");
                          setIsRoleMenuOpen(false);
                          router.push("/worker");
                          showToast("Worker Pro", "Switched to Craftsman Pro view");
                        }}
                        className={`w-full text-left px-3 py-2 text-xs rounded-xl flex items-center gap-2.5 transition cursor-pointer ${
                          role === "worker" ? "bg-slate-900 text-white font-bold" : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <HardHat className="w-3.5 h-3.5" />
                        <div>
                          <div className="font-bold">Worker Pro App</div>
                          <div className="text-[10px] opacity-70">Earnings, duties & safety buddy</div>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          setRole("admin");
                          setIsRoleMenuOpen(false);
                          router.push("/admin");
                          showToast("Cooperative Federation", "Switched to Federation Admin console");
                        }}
                        className={`w-full text-left px-3 py-2 text-xs rounded-xl flex items-center gap-2.5 transition cursor-pointer ${
                          role === "admin" ? "bg-slate-900 text-white font-bold" : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <div>
                          <div className="font-bold">Federation Admin</div>
                          <div className="text-[10px] opacity-70">GNN demand, equity & batching</div>
                        </div>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition cursor-pointer border border-slate-200"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-slate-100 bg-white p-4 space-y-3"
            >
              {/* Locality Selector for Mobile */}
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <span className="font-medium text-slate-600 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-700" />
                  Ward Zone:
                </span>
                <span className="font-bold text-slate-900">{selectedLocality}</span>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50 transition"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Quick Perspectives */}
              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Open Platform Portals:
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Link
                    href="/customer"
                    onClick={() => {
                      setRole("customer");
                      setMobileMenuOpen(false);
                    }}
                    className={`p-2 rounded-xl border text-center text-xs font-bold transition ${
                      role === "customer" ? "bg-slate-900 text-white border-slate-900" : "bg-slate-50 border-slate-200 text-slate-800"
                    }`}
                  >
                    Customer
                  </Link>
                  <Link
                    href="/worker"
                    onClick={() => {
                      setRole("worker");
                      setMobileMenuOpen(false);
                    }}
                    className={`p-2 rounded-xl border text-center text-xs font-bold transition ${
                      role === "worker" ? "bg-slate-900 text-white border-slate-900" : "bg-slate-50 border-slate-200 text-slate-800"
                    }`}
                  >
                    Worker Pro
                  </Link>
                  <Link
                    href="/admin"
                    onClick={() => {
                      setRole("admin");
                      setMobileMenuOpen(false);
                    }}
                    className={`p-2 rounded-xl border text-center text-xs font-bold transition ${
                      role === "admin" ? "bg-slate-900 text-white border-slate-900" : "bg-slate-50 border-slate-200 text-slate-800"
                    }`}
                  >
                    Admin
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

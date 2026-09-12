"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { WorkerProfile, WORKERS } from "@/lib/mockData";

export type UserRole = "customer" | "worker" | "admin";
export type Language = "en" | "hi" | "kn" | "mr";

export interface BookingState {
  id: string;
  worker: WorkerProfile;
  serviceCategory: string;
  scheduledDate: string;
  scheduledTime: string;
  locality: string;
  totalAmount: number;
  workerPay: number;
  insurancePay: number;
  coopFundPay: number;
  platformFee: number;
  status: "confirmed" | "en_route" | "in_progress" | "completed";
  addons: string[];
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  category: string;
  etaMinutes: number;
  unitType: "instahelp" | "crew" | "pack" | "task";
  workerPayout: number;
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  selectedLocality: string;
  setSelectedLocality: (locality: string) => void;
  activeBooking: BookingState | null;
  setActiveBooking: (booking: BookingState | null) => void;
  isCrisisMode: boolean;
  setIsCrisisMode: (crisis: boolean) => void;
  toggleCrisisMode: () => void;
  workerStatus: "online" | "offline" | "busy" | "on_break";
  setWorkerStatus: (status: "online" | "offline" | "busy" | "on_break") => void;
  currentWorker: WorkerProfile;
  selectedWorkerForBooking: WorkerProfile | null;
  setSelectedWorkerForBooking: (worker: WorkerProfile | null) => void;
  toastMessage: { title: string; desc: string; type?: "success" | "info" | "warning" } | null;
  showToast: (title: string, desc: string, type?: "success" | "info" | "warning") => void;
  
  // Snabbit / Pronto Cart & State
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  activePackStudio: any | null;
  setActivePackStudio: (pack: any | null) => void;
  activeXAIModal: boolean;
  setActiveXAIModal: (open: boolean) => void;
  activePassportModal: boolean;
  setActivePassportModal: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>("customer");
  const [language, setLanguage] = useState<Language>("en");
  const [selectedLocality, setSelectedLocality] = useState<string>("Koramangala 4th Block");
  const [isCrisisMode, setIsCrisisMode] = useState<boolean>(false);
  const [workerStatus, setWorkerStatus] = useState<"online" | "offline" | "busy" | "on_break">("online");
  const [selectedWorkerForBooking, setSelectedWorkerForBooking] = useState<WorkerProfile | null>(WORKERS[0]);
  
  // Default active booking for live tracking showcase
  const [activeBooking, setActiveBooking] = useState<BookingState | null>({
    id: "SS-784912",
    worker: WORKERS[0],
    serviceCategory: "Electrical Services",
    scheduledDate: "Today",
    scheduledTime: "10:30 AM",
    locality: "Koramangala 4th Block",
    totalAmount: 448,
    workerPay: 367, // 82%
    insurancePay: 22, // 5%
    coopFundPay: 36, // 8%
    platformFee: 23, // 5%
    status: "en_route",
    addons: ["MCB Safety & Earthing Inspection"],
  });

  const [toastMessage, setToastMessage] = useState<{ title: string; desc: string; type?: "success" | "info" | "warning" } | null>(null);

  const showToast = (title: string, desc: string, type: "success" | "info" | "warning" = "success") => {
    setToastMessage({ title, desc, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const toggleCrisisMode = () => {
    const nextState = !isCrisisMode;
    setIsCrisisMode(nextState);
    if (nextState) {
      showToast(
        "Crisis Mode Activated",
        "Allocation priority switched to vulnerability-weighted equity index (dependents & low savings buffer prioritized).",
        "warning"
      );
    } else {
      showToast(
        "Normal Mode Restored",
        "Worker dispatch queue returned to standard distance & merit ranking.",
        "info"
      );
    }
  };

  // Snabbit / Pronto Cart & State Implementation
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activePackStudio, setActivePackStudio] = useState<any | null>(null);
  const [activeXAIModal, setActiveXAIModal] = useState<boolean>(false);
  const [activePassportModal, setActivePassportModal] = useState<boolean>(false);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    showToast("Added to 15-Min Dispatch", `${item.title} added to quick checkout.`);
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing && existing.quantity > 1) {
        return prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i));
      }
      return prev.filter((i) => i.id !== id);
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        language,
        setLanguage,
        selectedLocality,
        setSelectedLocality,
        activeBooking,
        setActiveBooking,
        isCrisisMode,
        setIsCrisisMode,
        toggleCrisisMode,
        workerStatus,
        setWorkerStatus,
        currentWorker: WORKERS[0],
        selectedWorkerForBooking,
        setSelectedWorkerForBooking,
        toastMessage,
        showToast,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        activePackStudio,
        setActivePackStudio,
        activeXAIModal,
        setActiveXAIModal,
        activePassportModal,
        setActivePassportModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

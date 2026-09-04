import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import RoleSwitcherBar from "@/components/layout/RoleSwitcherBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Toast from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "SahakarSeva | Cooperative Digital Marketplace for Household Services",
  description: "Built for Ministry of Cooperation / NCCT (SIH PS 26089). Empowering gig workers with cooperative equity, transparent wage ledgers, and democratic rate setting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family-[#133e2b]+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col justify-between selection:bg-[#2d7a52] selection:text-white">
        <AppProvider>
          {/* Top Demo Bar for Hackathon Judges */}
          <RoleSwitcherBar />

          {/* Sticky Navigation Header */}
          <Navbar />

          {/* Main Page Content */}
          <main className="flex-1 w-full">{children}</main>

          {/* Toast Notification Container */}
          <Toast />

          {/* Global Footer */}
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}

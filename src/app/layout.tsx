import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import RoleSwitcherBar from "@/components/layout/RoleSwitcherBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Toast from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "SahakarSeva | Cooperative Digital Marketplace for Household Services",
  description: "Built for Ministry of Cooperation / NCCT (SIH PS 26089). Empowering gig workers through worker-owned cooperatives, democratic rate governance, and 100% itemized wage transparency.",
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
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..800;1,9..144,400..800&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
        {/* Auto-unregister any stale service worker from other localhost projects */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function(registrations) {
                  for (let registration of registrations) {
                    registration.unregister();
                  }
                });
              }
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col justify-between selection:bg-[#224c34] selection:text-[#f9f7f2]">
        <AppProvider>
          {/* Unified Sticky Header Container with solid opaque background */}
          <div className="sticky top-0 z-50 w-full bg-[#ffffff] dark:bg-[#11261a] shadow-xs">
            <RoleSwitcherBar />
            <Navbar />
          </div>

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

import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Toast from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "SahakarSeva | Cooperative Digital Services Platform",
  description: "India's first worker-owned digital marketplace for household and community services. 15-minute guaranteed arrival, 83%+ direct worker payout, sovereign e-Shram passports, and 0% platform extraction.",
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
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&family=Inter:wght@300..800&display=swap"
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
      <body className="antialiased min-h-screen flex flex-col justify-between selection:bg-slate-900 selection:text-white bg-white text-slate-900 font-sans">
        <AppProvider>
          {/* 21st.dev Style Floating Header */}
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

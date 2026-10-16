import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "../context/StoreContext";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";
import AnnouncementBar from "../components/layout/AnnouncementBar";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import CartDrawer from "../components/layout/CartDrawer";
import SearchModal from "../components/layout/SearchModal";
import WhatsAppFloating from "../components/ui/WhatsAppFloating";
import SevakAssistant from "../components/ui/SevakAssistant";
import ToastContainer from "../components/ui/ToastContainer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SEVAK CREATION | Modern Indian Jewellery & Festive Accessories",
    template: "%s | SEVAK CREATION",
  },
  description:
    "Shop handcrafted oxidized earrings, jhumkas, chokers, haathphool, ked kandoro, rings and festive Indian accessories by Kishan & Aesha. Affordable luxury with pan-India delivery.",
  keywords: [
    "Sevak Creation",
    "Indian jewellery",
    "oxidized jhumkas",
    "Navratri jewellery",
    "ked kandoro",
    "haathphool",
    "choker necklace",
    "traditional Gujarati jewellery",
    "Garba fashion",
    "festive accessories",
  ],
  authors: [{ name: "Kishan and Aesha" }],
  creator: "Sevak Creation",
  publisher: "Sevak Creation",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: "SEVAK CREATION | Modern Indian Jewellery & Festive Accessories",
    description:
      "Handcrafted oxidized silver ornaments, bridal sets, and daily sparkle designed to add festive elegance to every moment.",
    url: "https://sevakcreation.com",
    siteName: "Sevak Creation",
    images: [
      {
        url: "https://images.unsplash.com/photo-1544077960-604201fe74bc?q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "Sevak Creation Indian Jewellery Collection",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    name: "Sevak Creation",
    description:
      "Online Indian jewellery and festive fashion accessories store founded by Kishan and Aesha.",
    url: "https://sevakcreation.com",
    telephone: "+91-90998-76252",
    priceRange: "₹299 - ₹2999",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, Credit Card, UPI, Net Banking",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      addressCountry: "IN",
    },
    founders: [
      { "@type": "Person", name: "Kishan" },
      { "@type": "Person", name: "Aesha" },
    ],
  };

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FCFBF7] text-[#1F1F1F] font-sans antialiased selection:bg-[#5C1327] selection:text-white">
        <StoreProvider>
          <CartProvider>
            <WishlistProvider>
              {/* Top Announcement */}
              <AnnouncementBar />

              {/* Sticky Navigation Header */}
              <Suspense fallback={null}>
                <Header />
              </Suspense>

              {/* Main Content Viewport */}
              <main className="flex-1">{children}</main>

              {/* Footer */}
              <Footer />

              {/* Interactive Modals & Drawers */}
              <CartDrawer />
              <SearchModal />
              <WhatsAppFloating />
              <SevakAssistant />
              <ToastContainer />
            </WishlistProvider>
          </CartProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

import React from "react";
import HeroBanner from "../components/home/HeroBanner";
import CategoryCards from "../components/home/CategoryCards";
import OccasionSelector from "../components/home/OccasionSelector";
import TrendingCarousel from "../components/home/TrendingCarousel";
import NavratriSpotlight from "../components/home/NavratriSpotlight";
import SeasonalCollectionSpotlight from "../components/home/SeasonalCollectionSpotlight";
import BestSellersSection from "../components/home/BestSellersSection";
import TrustBadges from "../components/home/TrustBadges";
import InstagramSection from "../components/home/InstagramSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import NewsletterWhatsApp from "../components/home/NewsletterWhatsApp";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <HeroBanner />

      {/* 2. SHOP BY CATEGORY */}
      <CategoryCards />

      {/* 3. SHOP BY OCCASION */}
      <OccasionSelector />

      {/* 4. TRENDING NOW CAROUSEL */}
      <TrendingCarousel />

      {/* 5. NAVRATRI COLLECTION SPOTLIGHT */}
      <NavratriSpotlight />

      {/* 6. DYNAMIC SEASONAL COLLECTIONS */}
      <SeasonalCollectionSpotlight />

      {/* 7. BEST SELLERS */}
      <BestSellersSection />

      {/* 8. WHY SEVAK CREATION TRUST PILLARS */}
      <TrustBadges />

      {/* 9. INSTAGRAM SHOWCASE */}
      <InstagramSection />

      {/* 10. CUSTOMER REVIEWS */}
      <TestimonialsSection />

      {/* 11. NEWSLETTER & WHATSAPP VIP CTA */}
      <NewsletterWhatsApp />
    </div>
  );
}

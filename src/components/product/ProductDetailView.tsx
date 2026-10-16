"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Heart,
  Star,
  ShoppingBag,
  Zap,
  MessageCircle,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Plus,
  Minus,
  Check,
  Share2,
} from "lucide-react";
import { Product } from "../../lib/types";
import { products } from "../../lib/data/products";
import { formatINR, generateWhatsAppLink, generateProductInquiryMessage } from "../../lib/utils";
import { defaultSiteConfig } from "../../lib/config/siteConfig";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useStore } from "../../context/StoreContext";
import ProductCard from "./ProductCard";

interface ProductDetailViewProps {
  product: Product;
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string>("details");

  const isFavorited = isInWishlist(product.id);

  // Similar products in same category
  const similarProducts = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  // Frequently bought together bundle item
  const bundleItem =
    products.find(
      (p) => p.id !== product.id && (p.isBestSeller || p.categorySlug !== product.categorySlug)
    ) || products[0];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showToast(`Added ${quantity} × ${product.name} to bag!`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push("/checkout");
  };

  const handleShare = async () => {
    if (typeof window !== "undefined") {
      try {
        if (navigator.share) {
          await navigator.share({
            title: `${product.name} | Sevak Creation`,
            text: product.shortDescription,
            url: window.location.href,
          });
        } else {
          navigator.clipboard?.writeText(window.location.href);
          showToast("Product link copied to clipboard!");
        }
      } catch {}
    }
  };

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const inquiryMessage = generateProductInquiryMessage(
    product.name,
    product.price,
    product.sku,
    currentUrl
  );
  const whatsappInquiryUrl = generateWhatsAppLink(
    defaultSiteConfig.contact.whatsappNumber,
    inquiryMessage
  );

  return (
    <div className="py-8 sm:py-12 bg-[#FCFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#8A8A8A] uppercase tracking-wider mb-8 flex-wrap">
          <Link href="/" className="hover:text-[#5C1327]">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-[#5C1327]">
            Shop
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link
            href={`/categories/${product.categorySlug}`}
            className="hover:text-[#5C1327]"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1F1F1F] font-semibold truncate max-w-xs">
            {product.name}
          </span>
        </nav>

        {/* Product Details Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start mb-16">
          {/* LEFT: PRODUCT GALLERY */}
          <div className="space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#FAF6F0] border border-[#ECE4D8] shadow-xs group">
              <Image
                src={product.images[activeImageIndex] || product.thumbnail}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
                {product.discountPercentage > 0 && (
                  <span className="px-3 py-1 rounded-md bg-[#5C1327] text-white text-xs font-bold uppercase tracking-wider shadow-xs">
                    {product.discountPercentage}% OFF
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="px-3 py-1 rounded-md bg-[#C5A059] text-[#1F1F1F] text-xs font-bold uppercase tracking-wider shadow-xs">
                    BESTSELLER
                  </span>
                )}
              </div>

              {/* Quick Actions */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#2B2B2B] flex items-center justify-center shadow-xs transition"
                  aria-label="Share product"
                  title="Share product link"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center shadow-xs transition ${
                    isFavorited
                      ? "bg-[#5C1327] text-white"
                      : "bg-white/90 text-[#2B2B2B] hover:bg-[#5C1327] hover:text-white"
                  }`}
                  aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart
                    className={`w-4 h-4 ${isFavorited ? "fill-white" : ""}`}
                  />
                </button>
              </div>
            </div>

            {/* Thumbnail Navigation Strip */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden bg-[#FAF6F0] shrink-0 border-2 transition ${
                      activeImageIndex === idx
                        ? "border-[#5C1327] shadow-sm"
                        : "border-[#ECE4D8] opacity-75 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: PRODUCT INFO & ORDER ACTIONS */}
          <div className="space-y-6">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-[#8A8A8A] mb-2">
                <span className="uppercase tracking-widest font-semibold text-[#8F7E6B]">
                  {product.category} • SKU: {product.sku}
                </span>
                <div className="flex items-center gap-1.5 text-[#C5A059] font-medium bg-[#FAF6F0] px-2.5 py-1 rounded-full border border-[#ECE4D8]">
                  <Star className="w-3.5 h-3.5 fill-[#C5A059]" />
                  <span className="text-xs font-bold text-[#1F1F1F]">
                    {product.rating}
                  </span>
                  <span className="text-[#888]">
                    ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-brand-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1F1F1F] leading-snug">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-3 flex-wrap">
                <span className="text-2xl sm:text-3xl font-bold text-[#4A0E17]">
                  {formatINR(product.price)}
                </span>
                {product.compareAtPrice > product.price && (
                  <>
                    <span className="text-base text-[#8A8A8A] line-through">
                      {formatINR(product.compareAtPrice)}
                    </span>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      Save {formatINR(product.compareAtPrice - product.price)} (
                      {product.discountPercentage}% OFF)
                    </span>
                  </>
                )}
              </div>
              <p className="text-[11px] text-[#7A7A7A] mt-1">
                Inclusive of all taxes. Free express shipping on orders above ₹999.
              </p>
            </div>

            {/* Short Description */}
            <p className="text-sm text-[#4A4A4A] leading-relaxed border-t border-[#ECE4D8] pt-4">
              {product.shortDescription}
            </p>

            {/* Specifications Quick Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-[#FAF6F0] p-4 rounded-xl border border-[#ECE4D8]">
              <div>
                <span className="text-[#8A8A8A] block">Finish / Tone:</span>
                <span className="font-semibold text-[#1F1F1F]">{product.colour}</span>
              </div>
              <div>
                <span className="text-[#8A8A8A] block">Material:</span>
                <span className="font-semibold text-[#1F1F1F] truncate block">{product.material}</span>
              </div>
              {product.size && (
                <div>
                  <span className="text-[#8A8A8A] block">Dimensions:</span>
                  <span className="font-semibold text-[#1F1F1F]">{product.size}</span>
                </div>
              )}
              {product.weight && (
                <div>
                  <span className="text-[#8A8A8A] block">Weight:</span>
                  <span className="font-semibold text-[#1F1F1F]">{product.weight}</span>
                </div>
              )}
            </div>

            {/* Stock Availability */}
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-emerald-800">
                In Stock ({product.stock} pieces available)
              </span>
              <span className="text-[#8A8A8A]">• Ready for prompt dispatch</span>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-[#4A4A4A]">Quantity:</span>
                <div className="flex items-center border border-[#D5CABB] rounded-lg bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 hover:bg-[#F3ECE1] text-[#4A4A4A] rounded-l-lg transition"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-xs font-bold text-[#1F1F1F]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="p-2 hover:bg-[#F3ECE1] text-[#4A4A4A] rounded-r-lg transition"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Add to Cart & Buy Now Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="py-3.5 px-6 rounded-xl bg-[#5C1327] hover:bg-[#4A0E17] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="py-3.5 px-6 rounded-xl bg-[#C5A059] hover:bg-[#D4AF37] text-[#1F1F1F] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <Zap className="w-4 h-4" />
                  <span>Buy Now</span>
                </button>
              </div>

              {/* WhatsApp Inquire Button */}
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl border border-emerald-600/40 bg-emerald-50/60 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-2 transition"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Ask Kishan & Aesha about this on WhatsApp</span>
              </a>
            </div>

            {/* Trust Points */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#ECE4D8] text-center text-[11px] text-[#666]">
              <div className="p-2 bg-[#FAF6F0] rounded-lg">
                <Truck className="w-4 h-4 mx-auto mb-1 text-[#5C1327]" />
                <span>3-5 Days Delivery</span>
              </div>
              <div className="p-2 bg-[#FAF6F0] rounded-lg">
                <RotateCcw className="w-4 h-4 mx-auto mb-1 text-[#5C1327]" />
                <span>5-Day Replacement</span>
              </div>
              <div className="p-2 bg-[#FAF6F0] rounded-lg">
                <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-[#5C1327]" />
                <span>Quality Inspected</span>
              </div>
            </div>

            {/* Accordions */}
            <div className="border-t border-[#ECE4D8] pt-4 space-y-2">
              {/* Product Details Accordion */}
              <div className="border border-[#ECE4D8] rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() =>
                    setActiveAccordion(activeAccordion === "details" ? "" : "details")
                  }
                  className="w-full p-3.5 text-left text-xs font-bold text-[#1F1F1F] flex items-center justify-between hover:bg-[#FAF6F0]"
                >
                  <span>Product Details & Craft Story</span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      activeAccordion === "details" ? "rotate-90 text-[#5C1327]" : ""
                    }`}
                  />
                </button>
                {activeAccordion === "details" && (
                  <div className="p-4 text-xs text-[#555] leading-relaxed border-t border-[#ECE4D8] space-y-3 bg-[#FAF6F0]/40">
                    <p>{product.description}</p>
                    {product.whyYouWillLoveIt && (
                      <div className="mt-2">
                        <strong className="text-[#1F1F1F] block mb-1">
                          Why You&apos;ll Love It:
                        </strong>
                        <ul className="list-disc pl-4 space-y-1 text-[#4A4A4A]">
                          {product.whyYouWillLoveIt.map((reason, i) => (
                            <li key={i}>{reason}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Care Instructions Accordion */}
              <div className="border border-[#ECE4D8] rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() =>
                    setActiveAccordion(activeAccordion === "care" ? "" : "care")
                  }
                  className="w-full p-3.5 text-left text-xs font-bold text-[#1F1F1F] flex items-center justify-between hover:bg-[#FAF6F0]"
                >
                  <span>Jewellery Care Guide</span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      activeAccordion === "care" ? "rotate-90 text-[#5C1327]" : ""
                    }`}
                  />
                </button>
                {activeAccordion === "care" && (
                  <div className="p-4 text-xs text-[#555] leading-relaxed border-t border-[#ECE4D8] bg-[#FAF6F0]/40">
                    <ul className="list-disc pl-4 space-y-1.5 text-[#4A4A4A]">
                      {product.careInstructions?.map((c, i) => (
                        <li key={i}>{c}</li>
                      )) || (
                        <li>Wipe clean with a soft dry cloth and store in an airtight bag.</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              {/* Shipping & Returns Accordion */}
              <div className="border border-[#ECE4D8] rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() =>
                    setActiveAccordion(activeAccordion === "shipping" ? "" : "shipping")
                  }
                  className="w-full p-3.5 text-left text-xs font-bold text-[#1F1F1F] flex items-center justify-between hover:bg-[#FAF6F0]"
                >
                  <span>Shipping & Returns</span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      activeAccordion === "shipping" ? "rotate-90 text-[#5C1327]" : ""
                    }`}
                  />
                </button>
                {activeAccordion === "shipping" && (
                  <div className="p-4 text-xs text-[#555] leading-relaxed border-t border-[#ECE4D8] space-y-2 bg-[#FAF6F0]/40">
                    <p>
                      • <strong>Free Express Shipping:</strong> Automatically applied on all orders above ₹999.
                    </p>
                    <p>
                      • <strong>Dispatch:</strong> Dispatched within 24–48 hours from Ahmedabad, Gujarat.
                    </p>
                    <p>
                      • <strong>Hassle-Free Replacement:</strong> 5-day replacement policy in case of any transit defect.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* FREQUENTLY BOUGHT TOGETHER BUNDLE */}
        <div className="mb-16 p-6 sm:p-8 bg-[#FAF6F0] rounded-2xl border border-[#ECE4D8]">
          <h3 className="font-brand-serif text-xl sm:text-2xl font-bold text-[#1F1F1F] mb-1">
            Frequently Bought Together
          </h3>
          <p className="text-xs text-[#666] mb-6">
            Pair these complementary festive pieces together for a coordinated look.
          </p>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center gap-4 flex-wrap justify-center">
              {/* Product 1 */}
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#ECE4D8]">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#FAF6F0] relative shrink-0">
                  <Image
                    src={product.thumbnail}
                    alt={product.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#1F1F1F] max-w-[140px] truncate">
                    {product.name}
                  </div>
                  <div className="text-xs font-bold text-[#4A0E17]">
                    {formatINR(product.price)}
                  </div>
                </div>
              </div>

              <span className="text-xl font-bold text-[#8A8A8A]">+</span>

              {/* Product 2 */}
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#ECE4D8]">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#FAF6F0] relative shrink-0">
                  <Image
                    src={bundleItem.thumbnail}
                    alt={bundleItem.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#1F1F1F] max-w-[140px] truncate">
                    {bundleItem.name}
                  </div>
                  <div className="text-xs font-bold text-[#4A0E17]">
                    {formatINR(bundleItem.price)}
                  </div>
                </div>
              </div>
            </div>

            {/* Bundle Action */}
            <div className="md:ml-auto text-center md:text-right">
              <div className="text-xs text-[#666]">Total Bundle Price:</div>
              <div className="text-xl font-bold text-[#4A0E17]">
                {formatINR(product.price + bundleItem.price)}
              </div>
              <button
                onClick={() => {
                  addToCart(product, 1);
                  addToCart(bundleItem, 1);
                  showToast("Added matching bundle to bag!");
                }}
                className="mt-2 px-5 py-2.5 rounded-xl bg-[#5C1327] hover:bg-[#4A0E17] text-white text-xs font-bold uppercase tracking-wider transition"
              >
                Add Both to Bag
              </button>
            </div>
          </div>
        </div>

        {/* SIMILAR PRODUCTS */}
        {similarProducts.length > 0 && (
          <div className="pt-8 border-t border-[#ECE4D8]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-bold">
                  Recommended For You
                </span>
                <h3 className="font-brand-serif text-2xl sm:text-3xl text-[#1F1F1F] mt-1">
                  Similar Jewellery
                </h3>
              </div>
              <Link
                href={`/categories/${product.categorySlug}`}
                className="text-xs font-bold text-[#5C1327] hover:underline uppercase tracking-wider"
              >
                View Category ({product.category}) →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {similarProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

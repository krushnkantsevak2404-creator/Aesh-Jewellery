"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Star, ShoppingBag, Check } from "lucide-react";
import { Product } from "../../lib/types";
import { formatINR } from "../../lib/utils";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useStore } from "../../context/StoreContext";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useStore();

  const [isAdded, setIsAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    showToast(`Added ${product.name} to bag!`);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    showToast(
      isFavorited
        ? `Removed ${product.name} from wishlist`
        : `Saved ${product.name} to wishlist!`
    );
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-xl overflow-hidden border border-[#EFE8DC] hover:border-[#D5CABB] hover:shadow-md transition-all duration-300">
      {/* Product Image Frame */}
      <Link
        href={`/product/${product.slug}`}
        className="relative aspect-square w-full bg-[#F3ECE1] overflow-hidden block"
      >
        <Image
          src={
            imageError
              ? "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=800&auto=format&fit=crop"
              : product.thumbnail
          }
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={priority}
          onError={() => setImageError(true)}
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
          {product.discountPercentage > 0 && (
            <span className="px-2 py-0.5 rounded-md bg-[#5C1327] text-white text-[10px] font-bold tracking-wider uppercase shadow-xs">
              {product.discountPercentage}% OFF
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2 py-0.5 rounded-md bg-[#C5A059] text-[#1F1F1F] text-[10px] font-bold tracking-wider uppercase shadow-xs">
              BESTSELLER
            </span>
          )}
          {product.isNew && !product.isBestSeller && (
            <span className="px-2 py-0.5 rounded-md bg-[#2B2B2B] text-white text-[10px] font-bold tracking-wider uppercase shadow-xs">
              NEW
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10 shadow-xs ${
            isFavorited
              ? "bg-[#5C1327] text-white"
              : "bg-white/90 text-[#4A4A4A] hover:bg-[#5C1327] hover:text-white"
          }`}
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-4 h-4 transition ${
              isFavorited ? "fill-white" : ""
            }`}
          />
        </button>

        {/* Desktop Quick Add Button Overlay */}
        <div className="absolute bottom-2.5 inset-x-2.5 hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={handleQuickAdd}
            className="w-full py-2.5 px-3 rounded-lg bg-[#4A0E17]/95 hover:bg-[#5C1327] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition backdrop-blur-xs"
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </Link>

      {/* Product Content */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-[#7A7A7A] mb-1">
            <span className="uppercase tracking-wider font-medium text-[#8F7E6B]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-[#C5A059] font-medium">
              <Star className="w-3 h-3 fill-[#C5A059]" />
              <span>{product.rating}</span>
              <span className="text-[#A0A0A0]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link
            href={`/product/${product.slug}`}
            className="font-medium text-xs sm:text-sm text-[#1F1F1F] hover:text-[#5C1327] line-clamp-2 transition leading-snug"
          >
            {product.name}
          </Link>
        </div>

        {/* Price & Mobile Quick Add */}
        <div className="mt-3 pt-2 border-t border-[#F5EFE6] flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-sm sm:text-base font-bold text-[#4A0E17]">
                {formatINR(product.price)}
              </span>
              {product.compareAtPrice > product.price && (
                <span className="text-xs text-[#8A8A8A] line-through">
                  {formatINR(product.compareAtPrice)}
                </span>
              )}
            </div>
          </div>

          {/* Mobile Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            className="md:hidden p-2 rounded-lg bg-[#5C1327] text-white hover:bg-[#4A0E17] transition shrink-0"
            aria-label="Add to bag"
          >
            {isAdded ? (
              <Check className="w-4 h-4 text-emerald-300" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

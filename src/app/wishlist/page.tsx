"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useStore } from "../../context/StoreContext";
import { formatINR } from "../../lib/utils";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useStore();

  const handleMoveToBag = (product: any) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
    showToast(`Moved ${product.name} to bag!`);
  };

  return (
    <div className="py-10 sm:py-16 bg-[#FCFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#ECE4D8] mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C5A059] mb-1">
              <Heart className="w-3.5 h-3.5 text-[#5C1327] fill-[#5C1327]" />
              <span>Saved Items</span>
            </div>
            <h1 className="font-brand-serif text-3xl sm:text-4xl text-[#1F1F1F]">
              My Wishlist
            </h1>
          </div>

          {wishlist.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-xs text-[#8A8A8A] hover:text-[#5C1327] transition font-medium self-start sm:self-auto"
            >
              Clear All ({wishlist.length})
            </button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="py-24 text-center bg-[#FAF6F0] rounded-2xl border border-[#ECE4D8] p-8 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#F3ECE1] text-[#C5A059] flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="font-brand-serif text-2xl font-bold text-[#1F1F1F] mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-xs sm:text-sm text-[#666] mb-6">
              Save your favorite festive jhumkas, chokers, and ked kandoros while you browse so you can order them anytime!
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#5C1327] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#4A0E17] transition shadow-sm"
            >
              <span>Explore Jewellery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#ECE4D8] shadow-xs flex flex-col justify-between group"
              >
                <div className="relative aspect-square w-full bg-[#FAF6F0] overflow-hidden">
                  <Image
                    src={product.thumbnail}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/90 text-[#9E9E9E] hover:text-rose-600 transition shadow-xs"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#8F7E6B] font-semibold">
                      {product.category}
                    </span>
                    <Link
                      href={`/product/${product.slug}`}
                      className="font-medium text-xs sm:text-sm text-[#1F1F1F] hover:text-[#5C1327] line-clamp-2 mt-0.5 block"
                    >
                      {product.name}
                    </Link>
                    <div className="mt-2 text-sm font-bold text-[#4A0E17]">
                      {formatINR(product.price)}
                    </div>
                  </div>

                  <button
                    onClick={() => handleMoveToBag(product)}
                    className="mt-4 w-full py-2.5 px-3 rounded-xl bg-[#5C1327] hover:bg-[#4A0E17] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition shadow-2xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

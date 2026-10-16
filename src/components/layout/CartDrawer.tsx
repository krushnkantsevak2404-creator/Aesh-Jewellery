"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  X,
  Plus,
  Minus,
  Trash2,
  Bookmark,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Tag,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { formatINR } from "../../lib/utils";

export default function CartDrawer() {
  const {
    cart,
    isCartDrawerOpen,
    closeCartDrawer,
    updateQuantity,
    removeFromCart,
    moveToSaved,
    subtotal,
    discountAmount,
    shippingFee,
    freeShippingThreshold,
    freeShippingRemaining,
    grandTotal,
    totalItemCount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    couponError,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const ok = applyCoupon(couponInput.trim());
    if (ok) setCouponInput("");
  };

  const progressPercent = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={closeCartDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FCFBF7] shadow-2xl flex flex-col border-l border-[#E8DFD0] animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-[#E8DFD0] flex items-center justify-between bg-[#F8F4EC]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#5C1327]" />
              <h2 className="font-brand-serif font-bold text-lg text-[#1F1F1F]">
                Your Shopping Bag
              </h2>
              <span className="text-xs bg-[#5C1327] text-white px-2 py-0.5 rounded-full font-semibold">
                {totalItemCount}
              </span>
            </div>
            <button
              onClick={closeCartDrawer}
              className="p-1.5 text-[#5C1327] hover:bg-black/5 rounded-full transition"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#FAF4EB] px-5 py-3 border-b border-[#E8DFD0]">
            {freeShippingRemaining > 0 ? (
              <div>
                <p className="text-xs text-[#2B2B2B] font-medium flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                  Add <span className="font-bold text-[#5C1327]">{formatINR(freeShippingRemaining)}</span> more to get <span className="font-bold">Free Express Shipping!</span>
                </p>
                <div className="w-full bg-[#E5DCD0] rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-[#5C1327] h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-xs text-emerald-800 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                🎉 You&apos;ve unlocked Free Express Shipping!
              </p>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-[#F3ECE1] flex items-center justify-center mx-auto mb-4 text-[#C5A059]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-brand-serif text-lg font-bold text-[#1F1F1F] mb-1">
                  Your bag is empty
                </h3>
                <p className="text-xs text-[#7A7A7A] max-w-xs mx-auto mb-6">
                  Explore our handcrafted festive earrings, chokers, and ked kandoros to find your sparkle.
                </p>
                <button
                  onClick={closeCartDrawer}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#5C1327] text-white text-xs font-semibold hover:bg-[#4A0E17] transition"
                >
                  <Link href="/shop" onClick={closeCartDrawer}>
                    Discover Jewellery
                  </Link>
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3.5 p-3 rounded-xl bg-white border border-[#EFE8DC] shadow-2xs group"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#ECE6DC] shrink-0 relative">
                    <Image
                      src={item.product.thumbnail}
                      alt={item.product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${item.product.slug}`}
                          onClick={closeCartDrawer}
                          className="text-xs font-semibold text-[#1F1F1F] hover:text-[#5C1327] line-clamp-2 transition leading-snug"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[#9E9E9E] hover:text-rose-600 transition p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-[#7A7A7A] mt-0.5">
                        {item.selectedColour || item.product.colour}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F5F0E6]">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#DED4C5] rounded-md bg-[#FAF7F2]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-[#EAE1D3] text-[#4A4A4A] rounded-l-md transition"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-[#1F1F1F]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="p-1 hover:bg-[#EAE1D3] text-[#4A4A4A] rounded-r-md transition disabled:opacity-40"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => moveToSaved(item.product.id)}
                          className="text-[10px] text-[#8A8A8A] hover:text-[#5C1327] flex items-center gap-0.5 transition"
                          title="Save for later"
                        >
                          <Bookmark className="w-3 h-3" />
                          <span className="hidden sm:inline">Save</span>
                        </button>
                        <div className="text-right">
                          <span className="text-xs font-bold text-[#4A0E17]">
                            {formatINR(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#E8DFD0] bg-[#F8F4EC] space-y-3.5">
              {/* Coupon Form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Coupon <strong>{appliedCoupon.code}</strong> applied (-{formatINR(discountAmount)})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-rose-600 hover:underline font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Coupon code (e.g. SEVAK10)"
                      className="flex-1 px-3 py-1.5 rounded-lg border border-[#D5CABB] bg-white text-xs uppercase placeholder:normal-case focus:outline-hidden focus:border-[#5C1327]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-lg bg-[#5C1327] text-white text-xs font-semibold hover:bg-[#4A0E17] transition"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-rose-600 mt-1">{couponError}</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#4A4A4A] border-t border-[#E8DFD0] pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1F1F1F]">{formatINR(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount</span>
                    <span className="font-semibold">-{formatINR(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-[#1F1F1F]">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-bold uppercase text-[11px]">FREE</span>
                    ) : (
                      formatINR(shippingFee)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#1F1F1F] border-t border-[#E8DFD0] pt-2">
                  <span>Grand Total</span>
                  <span className="text-[#4A0E17]">{formatINR(grandTotal)}</span>
                </div>
              </div>

              {/* Checkout CTAs */}
              <div className="space-y-2 pt-1">
                <Link
                  href="/checkout"
                  onClick={closeCartDrawer}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#5C1327] hover:bg-[#4A0E17] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center justify-between text-[11px]">
                  <Link
                    href="/cart"
                    onClick={closeCartDrawer}
                    className="text-[#5C1327] font-semibold hover:underline"
                  >
                    View Cart Page
                  </Link>
                  <span className="flex items-center gap-1 text-[#666]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    100% Secure Checkout
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

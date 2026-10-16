"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Tag,
  Bookmark,
  Check,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { formatINR } from "../../lib/utils";

export default function FullCartPage() {
  const {
    cart,
    savedForLater,
    updateQuantity,
    removeFromCart,
    moveToSaved,
    moveToCartFromSaved,
    subtotal,
    discountAmount,
    shippingFee,
    freeShippingThreshold,
    freeShippingRemaining,
    grandTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    couponError,
    totalItemCount,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");

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
    <div className="py-10 sm:py-16 bg-[#FCFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#ECE4D8] pb-6 mb-8">
          <div className="text-xs text-[#8A8A8A] uppercase tracking-wider mb-1">
            Home / Bag
          </div>
          <h1 className="font-brand-serif text-3xl sm:text-4xl text-[#1F1F1F]">
            Shopping Bag ({totalItemCount} {totalItemCount === 1 ? "item" : "items"})
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="py-24 text-center bg-[#FAF6F0] rounded-2xl border border-[#ECE4D8] p-8 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#F3ECE1] text-[#C5A059] flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="font-brand-serif text-2xl font-bold text-[#1F1F1F] mb-2">
              Your bag is empty
            </h2>
            <p className="text-xs sm:text-sm text-[#666] mb-6">
              Looks like you haven&apos;t added any jewellery yet. Explore our handcrafted festive collections.
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            {/* Left 2 cols: Cart items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Free Shipping Progress */}
              <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#ECE4D8]">
                {freeShippingRemaining > 0 ? (
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#2B2B2B] mb-2 font-medium">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-[#C5A059]" />
                        Add <strong className="text-[#5C1327]">{formatINR(freeShippingRemaining)}</strong> more for Free Express Shipping
                      </span>
                      <span className="text-[#888]">{progressPercent}%</span>
                    </div>
                    <div className="w-full bg-[#E8DFD0] rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-[#5C1327] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-emerald-800 font-semibold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C5A059]" />
                    <span>🎉 You&apos;ve unlocked Free Express Shipping across India!</span>
                  </div>
                )}
              </div>

              {/* Items Table/List */}
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-4 sm:p-5 bg-white rounded-2xl border border-[#ECE4D8] shadow-xs flex flex-col sm:flex-row gap-4 sm:gap-6 justify-between items-start sm:items-center"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#FAF6F0] shrink-0 relative border border-[#F0E8DC]">
                        <Image
                          src={item.product.thumbnail}
                          alt={item.product.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#8F7E6B] font-semibold">
                          {item.product.category}
                        </span>
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="font-medium text-xs sm:text-sm text-[#1F1F1F] hover:text-[#5C1327] block max-w-sm line-clamp-2"
                        >
                          {item.product.name}
                        </Link>
                        <div className="text-xs text-[#7A7A7A] mt-0.5">
                          Tone: {item.selectedColour || item.product.colour}
                        </div>
                        <div className="text-sm font-bold text-[#4A0E17] mt-1 sm:hidden">
                          {formatINR(item.product.price * item.quantity)}
                        </div>
                      </div>
                    </div>

                    <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#F5EFE6]">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#D5CABB] rounded-lg bg-[#FAF7F2]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-[#E8DFD0] text-[#4A4A4A] rounded-l-lg transition"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-[#1F1F1F]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="p-1.5 hover:bg-[#E8DFD0] text-[#4A4A4A] rounded-r-lg transition disabled:opacity-40"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total for item */}
                      <div className="text-right hidden sm:block min-w-[80px]">
                        <div className="text-sm font-bold text-[#4A0E17]">
                          {formatINR(item.product.price * item.quantity)}
                        </div>
                        <div className="text-[11px] text-[#888]">
                          ({formatINR(item.product.price)} each)
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => moveToSaved(item.product.id)}
                          className="p-2 text-[#888] hover:text-[#5C1327] rounded-lg hover:bg-[#FAF6F0] transition"
                          title="Save for later"
                        >
                          <Bookmark className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-2 text-[#888] hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Saved For Later Section */}
              {savedForLater.length > 0 && (
                <div className="pt-8 border-t border-[#ECE4D8]">
                  <h3 className="font-brand-serif text-xl font-bold text-[#1F1F1F] mb-4">
                    Saved for Later ({savedForLater.length})
                  </h3>
                  <div className="space-y-3">
                    {savedForLater.map((s) => (
                      <div
                        key={s.product.id}
                        className="p-3 bg-white rounded-xl border border-[#ECE4D8] flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#FAF6F0] relative shrink-0">
                            <Image
                              src={s.product.thumbnail}
                              alt={s.product.name}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-[#1F1F1F] max-w-xs truncate">
                              {s.product.name}
                            </div>
                            <div className="text-xs font-bold text-[#4A0E17]">
                              {formatINR(s.product.price)}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => moveToCartFromSaved(s.product.id)}
                          className="px-4 py-2 rounded-lg bg-[#5C1327] text-white text-xs font-semibold hover:bg-[#4A0E17] transition shrink-0"
                        >
                          Move to Bag
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right 1 col: Order Summary */}
            <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#ECE4D8] space-y-6 sticky top-24">
              <h3 className="font-brand-serif text-xl font-bold text-[#1F1F1F] pb-3 border-b border-[#E8DFD0]">
                Order Summary
              </h3>

              {/* Coupon Form */}
              <div>
                <label className="text-xs font-bold text-[#C5A059] uppercase tracking-wider block mb-2">
                  Have a Coupon?
                </label>
                {appliedCoupon ? (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-800">
                      <Tag className="w-4 h-4 text-emerald-600" />
                      <span>Code <strong>{appliedCoupon.code}</strong> applied</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-rose-600 font-semibold hover:underline"
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
                      placeholder="e.g. SEVAK10"
                      className="flex-1 px-3 py-2 rounded-xl border border-[#D5CABB] bg-white text-xs uppercase placeholder:normal-case focus:outline-hidden focus:border-[#5C1327]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#5C1327] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#4A0E17] transition"
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
              <div className="space-y-2.5 text-xs text-[#4A4A4A] border-t border-[#E8DFD0] pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1F1F1F]">{formatINR(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount Savings</span>
                    <span>-{formatINR(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span className="font-semibold text-[#1F1F1F]">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-bold uppercase text-[11px]">FREE</span>
                    ) : (
                      formatINR(shippingFee)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#1F1F1F] border-t border-[#E8DFD0] pt-3">
                  <span>Grand Total</span>
                  <span className="text-[#4A0E17]">{formatINR(grandTotal)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <div className="space-y-3 pt-2">
                <Link
                  href="/checkout"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#5C1327] hover:bg-[#4A0E17] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="text-center text-[11px] text-[#666] flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Secure 256-bit Indian checkout with guest purchase</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

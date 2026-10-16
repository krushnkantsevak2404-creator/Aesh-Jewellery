"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  User,
  Package,
  Heart,
  Truck,
  Settings,
  ShieldCheck,
  ShoppingBag,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { formatINR } from "../../lib/utils";
import { useWishlist } from "../../context/WishlistContext";

export default function AccountPage() {
  const { wishlistCount } = useWishlist();
  const [lastOrder, setLastOrder] = useState<any>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("sevak_last_order");
      if (stored) {
        setLastOrder(JSON.parse(stored));
      }
    } catch {}
  }, []);

  return (
    <div className="py-10 sm:py-16 bg-[#FCFBF7] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Profile Summary */}
        <div className="p-6 sm:p-8 bg-[#FAF6F0] rounded-3xl border border-[#ECE4D8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#5C1327] text-white flex items-center justify-center font-brand-serif text-2xl font-bold">
              SC
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059]">
                Customer Account
              </div>
              <h1 className="font-brand-serif text-2xl sm:text-3xl font-bold text-[#1F1F1F]">
                {lastOrder?.customer?.fullName || "Valued Shopper"}
              </h1>
              <p className="text-xs text-[#7A7A7A]">
                {lastOrder?.customer?.email || "Welcome to Sevak Creation"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/track-order"
              className="px-4 py-2 bg-white rounded-xl border border-[#D5CABB] text-xs font-semibold hover:border-[#5C1327] text-[#1F1F1F] flex items-center gap-1.5 transition"
            >
              <Truck className="w-3.5 h-3.5 text-[#5C1327]" />
              <span>Track Orders</span>
            </Link>
            <Link
              href="/wishlist"
              className="px-4 py-2 bg-[#5C1327] text-white rounded-xl text-xs font-semibold hover:bg-[#4A0E17] flex items-center gap-1.5 transition"
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Wishlist ({wishlistCount})</span>
            </Link>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Recent Order */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-[#ECE4D8] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#ECE4D8]">
              <h2 className="font-brand-serif text-lg font-bold text-[#1F1F1F] flex items-center gap-2">
                <Package className="w-4 h-4 text-[#5C1327]" />
                Latest Order
              </h2>
              {lastOrder && (
                <span className="text-xs text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full font-semibold border border-emerald-200">
                  {lastOrder.orderStatus}
                </span>
              )}
            </div>

            {lastOrder ? (
              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-[#888]">
                  <span>Order Number:</span>
                  <span className="font-bold text-[#1F1F1F]">
                    #{lastOrder.orderNumber}
                  </span>
                </div>
                <div className="flex justify-between text-[#888]">
                  <span>Items:</span>
                  <span>{lastOrder.items?.length || 1} pieces</span>
                </div>
                <div className="flex justify-between text-[#888]">
                  <span>Amount:</span>
                  <span className="font-bold text-[#4A0E17]">
                    {formatINR(lastOrder.total)}
                  </span>
                </div>
                <div className="flex justify-between text-[#888]">
                  <span>Payment Method:</span>
                  <span className="uppercase font-semibold">
                    {lastOrder.paymentMethod}
                  </span>
                </div>

                <div className="pt-3 border-t border-[#ECE4D8] flex gap-3">
                  <Link
                    href={`/track-order?id=${lastOrder.orderNumber}`}
                    className="flex-1 py-2 text-center rounded-xl bg-[#FAF6F0] hover:bg-[#F3ECE1] text-[#5C1327] font-semibold text-xs transition border border-[#ECE4D8]"
                  >
                    Track Shipment
                  </Link>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-[#888]">
                <Package className="w-8 h-8 text-[#C5A059] mx-auto mb-2 opacity-60" />
                <p>No recent orders found on this device.</p>
                <Link
                  href="/shop"
                  className="mt-3 inline-block px-4 py-2 rounded-xl bg-[#5C1327] text-white text-xs font-semibold"
                >
                  Start Shopping
                </Link>
              </div>
            )}
          </div>

          {/* Card 2: Quick Links */}
          <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#ECE4D8] space-y-4">
            <h3 className="font-brand-serif text-lg font-bold text-[#1F1F1F]">
              Account Shortcuts
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/wishlist"
                  className="p-2.5 rounded-xl bg-white hover:bg-[#F3ECE1] border border-[#ECE4D8] flex items-center justify-between transition"
                >
                  <span>My Saved Wishlist</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#888]" />
                </Link>
              </li>
              <li>
                <Link
                  href="/track-order"
                  className="p-2.5 rounded-xl bg-white hover:bg-[#F3ECE1] border border-[#ECE4D8] flex items-center justify-between transition"
                >
                  <span>Track Active Parcel</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#888]" />
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="p-2.5 rounded-xl bg-white hover:bg-[#F3ECE1] border border-[#ECE4D8] flex items-center justify-between transition"
                >
                  <span>Help & Jewellery Care</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#888]" />
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="p-2.5 rounded-xl bg-[#4A0E17] text-white flex items-center justify-between transition shadow-2xs font-semibold"
                >
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Admin Dashboard</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

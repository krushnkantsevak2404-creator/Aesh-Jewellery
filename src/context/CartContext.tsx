"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Product, CartItem, Coupon } from "../lib/types";
import { defaultSiteConfig, availableCoupons } from "../lib/config/siteConfig";

interface CartContextType {
  cart: CartItem[];
  savedForLater: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedSize?: string, selectedColour?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  moveToSaved: (productId: string) => void;
  moveToCartFromSaved: (productId: string) => void;
  appliedCoupon: Coupon | null;
  couponError: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
  grandTotal: number;
  totalItemCount: number;
  isCartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "sevak_cart_v1";
const SAVED_STORAGE_KEY = "sevak_saved_v1";
const COUPON_STORAGE_KEY = "sevak_coupon_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [savedForLater, setSavedForLater] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from localStorage safely
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) setCart(JSON.parse(storedCart));

      const storedSaved = localStorage.getItem(SAVED_STORAGE_KEY);
      if (storedSaved) setSavedForLater(JSON.parse(storedSaved));

      const storedCoupon = localStorage.getItem(COUPON_STORAGE_KEY);
      if (storedCoupon) {
        const found = availableCoupons.find((c) => c.code === storedCoupon);
        if (found) setAppliedCoupon(found);
      }
    } catch {
      // localStorage may fail in restricted privacy modes
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {}
  }, [cart, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(savedForLater));
    } catch {}
  }, [savedForLater, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      if (appliedCoupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, appliedCoupon.code);
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch {}
  }, [appliedCoupon, isLoaded]);

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedSize?: string,
    selectedColour?: string
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: Math.min(newQty, product.stock),
        };
        return updated;
      }
      return [
        ...prev,
        {
          product,
          quantity: Math.min(quantity, product.stock),
          selectedSize: selectedSize || product.size,
          selectedColour: selectedColour || product.colour,
        },
      ];
    });
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          return {
            ...item,
            quantity: Math.min(quantity, item.product.stock),
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const moveToSaved = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    if (!item) return;
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
    setSavedForLater((prev) => {
      if (prev.some((i) => i.product.id === productId)) return prev;
      return [...prev, item];
    });
  };

  const moveToCartFromSaved = (productId: string) => {
    const item = savedForLater.find((i) => i.product.id === productId);
    if (!item) return;
    setSavedForLater((prev) => prev.filter((i) => i.product.id !== productId));
    addToCart(item.product, item.quantity, item.selectedSize, item.selectedColour);
  };

  // Financial calculations
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const applyCoupon = (code: string): boolean => {
    setCouponError(null);
    const cleanCode = code.trim().toUpperCase();
    const coupon = availableCoupons.find((c) => c.code.toUpperCase() === cleanCode);

    if (!coupon) {
      setCouponError("Invalid coupon code. Try SEVAK10 or FESTIVE15.");
      return false;
    }

    if (subtotal < coupon.minOrderValue) {
      setCouponError(`This code requires a minimum order value of ₹${coupon.minOrderValue}.`);
      return false;
    }

    setAppliedCoupon(coupon);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
  };

  let discountAmount = 0;
  if (appliedCoupon) {
    if (subtotal >= appliedCoupon.minOrderValue) {
      if (appliedCoupon.discountType === "percentage") {
        discountAmount = Math.round((subtotal * appliedCoupon.discountValue) / 100);
      } else {
        discountAmount = appliedCoupon.discountValue;
      }
    }
  }

  const freeShippingThreshold = defaultSiteConfig.shipping.freeShippingThreshold;
  const shippingFee = subtotal === 0 || subtotal >= freeShippingThreshold ? 0 : defaultSiteConfig.shipping.standardShippingFee;
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - subtotal);
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        savedForLater,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        moveToSaved,
        moveToCartFromSaved,
        appliedCoupon,
        couponError,
        applyCoupon,
        removeCoupon,
        subtotal,
        discountAmount,
        shippingFee,
        freeShippingThreshold,
        freeShippingRemaining,
        grandTotal,
        totalItemCount,
        isCartDrawerOpen,
        openCartDrawer: () => setIsCartDrawerOpen(true),
        closeCartDrawer: () => setIsCartDrawerOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

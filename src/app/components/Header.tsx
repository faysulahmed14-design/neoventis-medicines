"use client";

import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

export default function Header() {
  const { cart, wishlist } = useCart();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalWishlistCount = wishlist.length;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-2">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-1.5 shrink-0">
            <span className="text-lg sm:text-2xl font-black tracking-tight text-emerald-600 leading-tight">
              Neoventis<br className="sm:hidden" />
              <span className="text-gray-900 sm:ml-1.5">Medicines</span>
            </span>
          </Link>

          {/* Navigation Links - Desktop Only */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link href="/" className="hover:text-emerald-600 transition">
              Home
            </Link>
            <Link href="/products" className="hover:text-emerald-600 transition">
              All Medicines
            </Link>
            <Link href="/tracking" className="hover:text-emerald-600 transition">
              Track Order
            </Link>
            <Link href="/account" className="hover:text-emerald-600 transition">
              My Account
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2 text-gray-700 hover:text-red-500 rounded-lg border border-gray-200 hover:border-red-200 transition"
              title="Wishlist"
            >
              ❤️
              {totalWishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm">
                  {totalWishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-emerald-600 rounded-lg border border-gray-200 hover:border-emerald-200 transition"
              title="Cart"
            >
              🛒
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white shadow-sm">
                  {totalCartCount}
                </span>
              )}
            </Link>

            {/* Admin Panel */}
            <Link
              href="/admin/products"
              className="px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs font-semibold rounded-lg bg-gray-100 text-gray-800 hover:bg-emerald-600 hover:text-white transition shrink-0"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
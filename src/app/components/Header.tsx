"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { cart, wishlist } = useCart();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* ব্র্যান্ড নাম */}
        <Link
          href="/"
          className="text-2xl font-black tracking-tight text-green-700 transition hover:opacity-90"
        >
          Neoventis Medicines
        </Link>

        {/* নেভিগেশন লিংক */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-semibold text-gray-700 transition hover:text-green-700"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-sm font-semibold text-gray-700 transition hover:text-green-700"
          >
            All Medicines
          </Link>
          <Link
            href="/tracking"
            className="text-sm font-semibold text-gray-700 transition hover:text-green-700"
          >
            Track Order
          </Link>
          <Link
            href="/account"
            className="text-sm font-semibold text-gray-700 transition hover:text-green-700"
          >
            My Account
          </Link>
        </nav>

        {/* অ্যাকশন বাটন ও কাউন্ট ব্যাজ */}
        <div className="flex items-center gap-4">
          <Link
            href="/wishlist"
            className="relative flex items-center justify-center rounded-lg border border-gray-200 p-2 text-gray-700 transition hover:bg-gray-50"
            title="Wishlist"
          >
            <span className="text-xl">❤️️</span>
            {wishlist.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link
            href="/cart"
            className="relative flex items-center justify-center rounded-lg border border-gray-200 p-2 text-gray-700 transition hover:bg-gray-50"
            title="Cart"
          >
            <span className="text-xl">🛒</span>
            {totalCartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white">
                {totalCartCount}
              </span>
            )}
          </Link>

          <Link
            href="/admin/dashboard"
            className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-200 transition"
          >
            Admin Panel
          </Link>
        </div>
      </div>
    </header>
  );
}
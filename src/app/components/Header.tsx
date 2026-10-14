"use client";

import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext";

export default function Header() {
  const { cart, wishlist } = useCart();
  const { customer, admin } = useAuth();

  const totalCartCount = (cart || []).reduce(
    (sum: number, item: any) => sum + (Number(item.quantity) || 1),
    0
  );
  const totalWishlistCount = (wishlist || []).length;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-2">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-1.5 shrink-0">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-emerald-600">
              Neoventis <span className="text-gray-900">Medicine</span>
            </span>
          </Link>

          {/* Navigation Links - Desktop */}
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
            <Link href={customer ? "/account" : "/login"} className="hover:text-emerald-600 transition">
              {customer ? "My Profile" : "My Account"}
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2 text-gray-700 hover:text-red-500 rounded-xl border border-gray-200 hover:border-red-200 transition"
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
              className="relative p-2 text-gray-700 hover:text-emerald-600 rounded-xl border border-gray-200 hover:border-emerald-200 transition"
              title="Cart"
            >
              🛒
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white shadow-sm">
                  {totalCartCount}
                </span>
              )}
            </Link>

            {/* Customer Auth Button */}
            {customer ? (
              <Link
                href="/account"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/80 hover:bg-emerald-100 transition"
                title={`Logged in as ${customer.name}`}
              >
                <span>👤</span>
                <span className="max-w-[80px] truncate">{customer.name.split(" ")[0]}</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="px-3 py-1.5 text-xs font-bold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition"
              >
                Login
              </Link>
            )}

            {/* Admin Portal Button */}
            <Link
              href={admin ? "/admin/dashboard" : "/admin/login"}
              className={`px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs font-bold rounded-xl transition shrink-0 flex items-center gap-1 ${
                admin
                  ? "bg-slate-900 text-emerald-400 border border-emerald-500/30 hover:bg-slate-800"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              title={admin ? "Admin Console (Active)" : "Admin Portal Login"}
            >
              <span>{admin ? "🛡️" : "⚙️"}</span>
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
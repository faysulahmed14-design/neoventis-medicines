"use client";

import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

const defaultFeatured = [
  { name: "Napa", category: "Tablet", price: 35, stock: 100 },
  { name: "Cap. Otubic", category: "Medicine", price: 100, stock: 29 },
  { name: "Cap. Otucid", category: "Medicine", price: 100, stock: 50 },
  { name: "Tab. Utamin", category: "Medicine", price: 100, stock: 50 },
  { name: "Cap. Eberry", category: "Medicine", price: 100, stock: 50 },
  { name: "Cap. Xymotac", category: "Medicine", price: 100, stock: 50 },
  { name: "Cap. Fattycid", category: "Medicine", price: 100, stock: 50 },
  { name: "Tab. Capium", category: "Medicine", price: 100, stock: 50 },
];

export default function HomePage() {
  const { addToCart, toggleWishlist, wishlist, products } = useCart();

  const displayMedicines = (products && products.length > 0)
    ? products.slice(0, 8)
    : defaultFeatured;

  return (
    <div className="min-h-screen bg-slate-50/70 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 p-8 sm:p-14 text-white shadow-xl">
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-5">
            <span className="inline-block py-1 px-4 rounded-full text-xs font-extrabold uppercase tracking-widest bg-white/20 text-white backdrop-blur-md">
              ⚡ Trusted Online Pharmacy in Bangladesh
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Your Trusted Healthcare <br className="hidden sm:block" />
              Partner at Home
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-emerald-100 max-w-2xl mx-auto font-normal">
              Order authentic prescription drugs, wellness products, and healthcare essentials with guaranteed rapid doorstep delivery.
            </p>

            <div className="pt-3 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/products"
                className="rounded-2xl bg-white hover:bg-emerald-50 px-7 py-3 text-sm font-extrabold text-emerald-800 shadow-md transition active:scale-95"
              >
                Shop Medicines →
              </Link>
              <Link
                href="/account"
                className="rounded-2xl border border-white/30 bg-white/10 hover:bg-white/20 px-7 py-3 text-sm font-extrabold text-white backdrop-blur-md transition active:scale-95"
              >
                My Account
              </Link>
            </div>
          </div>

          {/* Glowing gradient orbs */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-teal-400/20 blur-3xl pointer-events-none" />
        </section>

        {/* 3 Highlights Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-50 flex items-center justify-center text-2xl">
              💊
            </div>
            <h3 className="font-extrabold text-gray-900 text-base">Prescription Drugs</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              100% verified quality, verified batch dates & temperature-controlled storage.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center text-2xl">
              🩹
            </div>
            <h3 className="font-extrabold text-gray-900 text-base">First Aid & Care</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Antiseptics, surgical masks, bandages, and daily wellness items always in stock.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-50 flex items-center justify-center text-2xl">
              ⚡
            </div>
            <h3 className="font-extrabold text-gray-900 text-base">Rapid Home Delivery</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Fast, discreet, and reliable delivery right to your door anywhere in Bangladesh.
            </p>
          </div>
        </section>

        {/* Featured Medicines Section */}
        <section className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-gray-200/80 pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                Featured Medicines
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Commonly requested daily medicines and healthcare essentials.
              </p>
            </div>
            <Link
              href="/products"
              className="text-xs sm:text-sm font-bold text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-1"
            >
              View all medicines <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayMedicines.map((medicine) => {
              const isWishlisted = (wishlist || []).some(
                (w: any) => w.name === medicine.name
              );
              const isOutOfStock = medicine.stock <= 0;

              return (
                <div
                  key={medicine.name}
                  className="group relative bg-white rounded-3xl border border-gray-100 p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Category Pill & Wishlist */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100/60">
                        {medicine.category}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleWishlist(medicine)}
                        className={`p-2 rounded-xl border transition ${
                          isWishlisted
                            ? "bg-red-50 border-red-200 text-red-500 scale-105"
                            : "bg-gray-50/70 border-gray-100 text-gray-400 hover:text-red-500 hover:bg-white"
                        }`}
                        title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                      >
                        <span className="text-sm">{isWishlisted ? "❤️" : "🤍"}</span>
                      </button>
                    </div>

                    {/* Pill Icon Illustration */}
                    <div className="h-32 flex items-center justify-center bg-gradient-to-br from-emerald-50/50 to-teal-50/30 rounded-2xl mb-4 group-hover:scale-105 transition duration-200">
                      <span className="text-5xl filter drop-shadow-sm">💊</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-gray-900 text-base leading-snug">
                      {medicine.name}
                    </h3>

                    {/* Stock status indicator */}
                    <div className="mt-2 flex items-center gap-1.5">
                      <span
                        className={`inline-block h-2 w-2 rounded-full ${
                          isOutOfStock ? "bg-red-500" : "bg-emerald-500"
                        }`}
                      />
                      <span
                        className={`text-[11px] font-semibold ${
                          isOutOfStock ? "text-red-600" : "text-emerald-700"
                        }`}
                      >
                        {isOutOfStock ? "Out of Stock" : `In Stock (${medicine.stock})`}
                      </span>
                    </div>
                  </div>

                  {/* Price & Add to Cart */}
                  <div className="mt-5 pt-4 border-t border-gray-100 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-xs text-gray-400 font-medium">Price</span>
                        <div className="text-2xl font-black text-gray-900 tracking-tight">
                          ৳{medicine.price}
                        </div>
                      </div>
                      <span className="text-[11px] font-medium text-gray-400">
                        Per Unit
                      </span>
                    </div>

                    <button
                      type="button"
                      disabled={isOutOfStock}
                      onClick={() => addToCart(medicine)}
                      className={`w-full py-3 rounded-2xl text-xs sm:text-sm font-bold shadow-sm transition flex items-center justify-center gap-2 cursor-pointer ${
                        isOutOfStock
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white shadow-emerald-200 hover:shadow-md"
                      }`}
                    >
                      <span>🛒</span>
                      {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
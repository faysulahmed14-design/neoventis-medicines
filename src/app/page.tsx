"use client";

import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

const featuredMedicines = [
  { id: "med-1", name: "Napa", category: "TABLET", price: 35, stock: 100, icon: "💊" },
  { id: "med-2", name: "Cap. Otubic", category: "MEDICINE", price: 100, stock: 29, icon: "💊" },
  { id: "med-3", name: "Cap. Otucid", category: "MEDICINE", price: 100, stock: 50, icon: "💊" },
  { id: "med-4", name: "Tab. Utamin", category: "MEDICINE", price: 100, stock: 50, icon: "💊" },
  { id: "med-5", name: "Cap. Eberry", category: "MEDICINE", price: 100, stock: 50, icon: "💊" },
  { id: "med-6", name: "Cap. Xymotac", category: "MEDICINE", price: 100, stock: 50, icon: "💊" },
  { id: "med-7", name: "Cap. Fattycid", category: "MEDICINE", price: 100, stock: 50, icon: "💊" },
  { id: "med-8", name: "Tab. Capium", category: "MEDICINE", price: 100, stock: 50, icon: "💊" },
];

export default function HomePage() {
  const { addToCart, toggleWishlist, wishlist } = useCart();

  return (
    <div className="min-h-screen bg-gray-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Single Hero Section */}
        <section className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <span className="inline-block py-1 px-3.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            Trusted Online Pharmacy
          </span>

          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            Your Trusted Healthcare Partner <br className="hidden sm:block" />
            at Home
          </h1>

          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            Order genuine prescription medicines and healthcare products with fast home delivery across Bangladesh.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/products"
              className="rounded-xl bg-emerald-600 hover:bg-emerald-700 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition"
            >
              Shop Medicines
            </Link>
            <Link
              href="/account"
              className="rounded-xl border border-gray-300 bg-white hover:bg-gray-50 px-6 py-2.5 text-sm font-bold text-gray-800 shadow-sm transition"
            >
              My Account
            </Link>
          </div>
        </section>

        {/* 3 Highlights Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="text-2xl mb-1">💊</div>
            <h3 className="font-bold text-gray-900 text-sm">Prescription Drugs</h3>
            <p className="text-xs text-gray-500 mt-0.5">Verified quality & authentic batches</p>
          </div>
          <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="text-2xl mb-1">🩹</div>
            <h3 className="font-bold text-gray-900 text-sm">First Aid & Care</h3>
            <p className="text-xs text-gray-500 mt-0.5">Bandages, antiseptics, & daily gear</p>
          </div>
          <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="text-2xl mb-1">⚡</div>
            <h3 className="font-bold text-gray-900 text-sm">Rapid Home Delivery</h3>
            <p className="text-xs text-gray-500 mt-0.5">Safe and fast delivery directly to your door</p>
          </div>
        </section>

        {/* Featured Medicines Grid */}
        <section className="space-y-6 pt-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Featured Medicines</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Commonly requested daily medicines and healthcare essentials.
              </p>
            </div>
            <Link
              href="/products"
              className="text-xs sm:text-sm font-semibold text-emerald-600 hover:underline"
            >
              View all medicines →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredMedicines.map((medicine) => {
              const isWishlisted = (wishlist || []).some(
                (w: any) => w.name === medicine.name
              );

              return (
                <div
                  key={medicine.id}
                  className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">
                        {medicine.category}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleWishlist(medicine)}
                        className={`text-base p-1 rounded-full transition ${
                          isWishlisted ? "text-red-500" : "text-gray-300 hover:text-red-400"
                        }`}
                        title="Add to Wishlist"
                      >
                        ♥
                      </button>
                    </div>

                    <div className="h-28 flex items-center justify-center bg-gray-50/70 rounded-xl mb-4 text-4xl">
                      {medicine.icon}
                    </div>

                    <h3 className="font-bold text-gray-900 text-base mb-1">
                      {medicine.name}
                    </h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-black text-emerald-600">
                        ৳{medicine.price}
                      </span>
                      <span className="text-[11px] font-medium text-gray-400">
                        Stock: {medicine.stock}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => addToCart(medicine)}
                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition shadow-sm cursor-pointer"
                    >
                      Add to Cart
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
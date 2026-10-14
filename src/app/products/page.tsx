"use client";

import { useState } from "react";
import { useCart } from "@/app/context/CartContext";

const allMedicines = [
  { id: "med-1", name: "Napa", category: "TABLET", price: 35, stock: 100, icon: "💊" },
  { id: "med-2", name: "Cap. Otubic", category: "MEDICINE", price: 100, stock: 29, icon: "💊" },
  { id: "med-3", name: "Cap. Otucid", category: "MEDICINE", price: 100, stock: 50, icon: "💊" },
  { id: "med-4", name: "Tab. Utamin", category: "MEDICINE", price: 100, stock: 50, icon: "💊" },
  { id: "med-5", name: "Cap. Eberry", category: "MEDICINE", price: 100, stock: 50, icon: "💊" },
  { id: "med-6", name: "Cap. Xymotac", category: "MEDICINE", price: 100, stock: 50, icon: "💊" },
  { id: "med-7", name: "Cap. Fattycid", category: "MEDICINE", price: 100, stock: 50, icon: "💊" },
  { id: "med-8", name: "Tab. Capium", category: "MEDICINE", price: 100, stock: 50, icon: "💊" },
  { id: "med-9", name: "Cap. Aptigut", category: "MEDICINE", price: 100, stock: 50, icon: "💊" },
  { id: "med-10", name: "Cap. Infinity F", category: "MEDICINE", price: 100, stock: 50, icon: "💊" },
  { id: "med-11", name: "Tab. Infinity F", category: "MEDICINE", price: 100, stock: 50, icon: "💊" },
  { id: "med-12", name: "Tab. Ocosam", category: "MEDICINE", price: 100, stock: 50, icon: "💊" },
];

export default function ProductsPage() {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = allMedicines.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Title and Search */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            All Medicines
          </h1>
          <p className="text-sm text-gray-500">
            Browse our medicines and healthcare products with real-time stock updates.
          </p>
          <div className="pt-2">
            <input
              type="text"
              placeholder="Search medicines by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ color: "#111827", backgroundColor: "#ffffff" }}
              className="w-full max-w-md rounded-xl border border-gray-300 px-4 py-2.5 text-sm !text-gray-900 placeholder:text-gray-400 bg-white shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
            />
          </div>
          <p className="text-xs text-gray-400">
            Showing {filteredProducts.length} medicines
          </p>
        </div>

        {/* Medicines Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isWishlisted = (wishlist || []).some(
              (w: any) => w.name === product.name
            );

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">
                      {product.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleWishlist(product)}
                      className={`text-base p-1 rounded-full transition ${
                        isWishlisted ? "text-red-500" : "text-gray-300 hover:text-red-400"
                      }`}
                      title="Add to Wishlist"
                    >
                      ♥
                    </button>
                  </div>

                  <div className="h-28 flex items-center justify-center bg-gray-50/70 rounded-xl mb-4 text-4xl">
                    {product.icon}
                  </div>

                  <h3 className="font-bold text-gray-900 text-base mb-1">
                    {product.name}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-black text-emerald-600">
                      ৳{product.price}
                    </span>
                    <span className="text-[11px] font-medium text-gray-400">
                      Stock: {product.stock}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition shadow-sm cursor-pointer"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
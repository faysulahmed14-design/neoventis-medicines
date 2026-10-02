"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

export default function ProductsPage() {
  const { products, wishlist, addToCart, toggleWishlist } = useCart();
  const [searchTerm, setSearchTerm] = useState("");

  // লাইভ সেন্ট্রাল স্টেট থেকে সার্চ ফিল্টারিং
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-7xl">
          {/* হেডিং */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">
              All Medicines
            </h1>
            <p className="mt-3 text-gray-600">
              Browse our medicines and healthcare products with real-time stock updates.
            </p>
          </div>

          {/* সার্চ বার */}
          <div className="mx-auto mt-8 max-w-2xl">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search medicines by name..."
              className="w-full rounded-xl border border-gray-300 bg-white px-5 py-3 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 shadow-sm"
            />
          </div>

          {/* প্রোডাক্ট কাউন্ট */}
          <div className="mt-6 text-center text-sm text-gray-500">
            Showing {filteredProducts.length} of {products.length} medicines
          </div>

          {/* মেডিসিন গ্রিড */}
          {filteredProducts.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredProducts.map((product) => {
                const isWishlisted = wishlist.some(
                  (item) => item.name === product.name
                );

                return (
                  <div
                    key={product.name}
                    className="flex flex-col justify-between overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <div>
                      <div className="flex h-44 items-center justify-center bg-green-50 text-5xl">
                        💊
                      </div>

                      <div className="p-5">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="inline-block rounded bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700 uppercase">
                              {product.category}
                            </span>
                            <h2 className="mt-2 text-lg font-bold text-gray-900">
                              {product.name}
                            </h2>
                          </div>

                          <button
                            onClick={() => toggleWishlist(product)}
                            className="text-2xl transition hover:scale-110"
                            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                          >
                            {isWishlisted ? "❤️" : "🤍"}
                          </button>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-xl font-bold text-green-600">
                            ৳{product.price}
                          </span>
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded ${
                              product.stock > 10
                                ? "bg-green-50 text-green-700"
                                : product.stock > 0
                                ? "bg-yellow-50 text-yellow-700"
                                : "bg-red-50 text-red-700"
                            }`}
                          >
                            {product.stock > 0
                              ? `Stock: ${product.stock}`
                              : "Out of Stock"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0">
                      <button
                        onClick={() => addToCart(product)}
                        disabled={product.stock <= 0}
                        className={`w-full rounded-lg px-4 py-2.5 font-semibold text-white transition ${
                          product.stock <= 0
                            ? "cursor-not-allowed bg-gray-400"
                            : "bg-green-600 hover:bg-green-700 shadow-sm"
                        }`}
                      >
                        {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-12 rounded-xl bg-white p-12 text-center border shadow-sm">
              <div className="text-5xl">🔍</div>
              <h2 className="mt-4 text-xl font-bold text-gray-900">
                No medicines found
              </h2>
              <p className="mt-2 text-gray-500">
                Try searching with a different medicine name.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
"use client";

import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-7xl">
          {/* হেডিং */}
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-green-600">
              My Wishlist
            </p>
            <h1 className="mt-2 text-4xl font-bold text-gray-900">
              Saved Medicines
            </h1>
            <p className="mt-3 text-gray-600">
              Review your favorite medicines and move them to cart anytime.
            </p>
          </div>

          {/* এম্পটি উইশলিস্ট */}
          {wishlist.length === 0 ? (
            <div className="mt-10 rounded-xl border bg-white p-12 text-center shadow-sm">
              <div className="text-6xl">❤️</div>
              <h2 className="mt-5 text-2xl font-bold text-gray-900">
                Your wishlist is empty
              </h2>
              <p className="mt-2 text-gray-500">
                You haven't saved any medicines to your wishlist yet.
              </p>
              <Link
                href="/products"
                className="mt-6 inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white shadow-sm hover:bg-green-700 transition"
              >
                Browse Medicines
              </Link>
            </div>
          ) : (
            /* উইশলিস্ট গ্রিড */
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {wishlist.map((product) => (
                <div
                  key={product.name}
                  className="flex flex-col justify-between overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div>
                    <div className="flex h-44 items-center justify-center bg-green-50 text-5xl">
                      💊
                    </div>

                    <div className="p-5">
                      <span className="inline-block rounded bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700 uppercase">
                        {product.category}
                      </span>

                      <h2 className="mt-2 text-lg font-bold text-gray-900">
                        {product.name}
                      </h2>

                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xl font-bold text-green-600">
                          ৳{product.price}
                        </span>
                        <span className="text-xs text-gray-500">
                          Stock: {product.stock}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 space-y-2">
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

                    <button
                      onClick={() => toggleWishlist(product)}
                      className="w-full rounded-lg border border-red-200 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
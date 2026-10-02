"use client";

import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useCart } from "./context/CartContext";

export default function Home() {
  const { products, wishlist, addToCart, toggleWishlist } = useCart();

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-white px-6 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <span className="inline-block rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">
            Trusted Online Pharmacy
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            Your Trusted Healthcare Partner at Home
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Order genuine prescription medicines and healthcare products with fast home delivery across Bangladesh.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/products"
              className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white shadow-sm hover:bg-green-700 transition"
            >
              Shop Medicines
            </Link>
            <Link
              href="/account"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              My Account
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Medicines Section */}
      <section className="bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Featured Medicines
              </h2>
              <p className="mt-1 text-gray-600">
                Commonly requested daily medicines and healthcare essentials.
              </p>
            </div>
            <Link
              href="/products"
              className="font-semibold text-green-600 hover:text-green-700"
            >
              View all medicines →
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 8).map((product) => {
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
                          <h3 className="mt-2 text-lg font-bold text-gray-900">
                            {product.name}
                          </h3>
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
        </div>
      </section>

      <Footer />
    </>
  );
}
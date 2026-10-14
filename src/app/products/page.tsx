"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { type Product } from "../data/products";

export default function ProductsPage() {
  const { products, addToCart, toggleWishlist, wishlist } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [sortBy, setSortBy] = useState("default");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Extract distinct categories dynamically
  const categories = useMemo(() => {
    const cats = new Set<string>();
    (products || []).forEach((p) => {
      if (p.category) cats.add(p.category.toUpperCase());
    });
    return ["ALL", ...Array.from(cats)];
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return (products || [])
      .filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesCategory =
          selectedCategory === "ALL" ||
          product.category?.toUpperCase() === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "name-asc") return a.name.localeCompare(b.name);
        return 0;
      });
  }, [products, searchQuery, selectedCategory, sortBy]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setToastMessage(`✓ ${product.name} added to cart`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 py-10 px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl transition-all animate-bounce">
          <span className="text-sm font-semibold">{toastMessage}</span>
          <Link
            href="/cart"
            className="text-xs bg-white text-emerald-700 font-bold px-3 py-1 rounded-xl hover:bg-emerald-50 transition"
          >
            View Cart
          </Link>
        </div>
      )}

      {/* Product List Schema.org for Google Search Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Medicines & Healthcare Products",
            itemListElement: (products || []).map((product, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Product",
                name: product.name,
                category: product.category || "Medicine",
                offers: {
                  "@type": "Offer",
                  priceCurrency: "BDT",
                  price: product.price,
                  availability:
                    Number(product.stock) > 0
                      ? "https://schema.org/InStock"
                      : "https://schema.org/OutOfStock",
                  itemCondition: "https://schema.org/NewCondition",
                },
              },
            })),
          }),
        }}
      />

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 p-8 sm:p-12 text-white shadow-lg">
          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="inline-block py-1 px-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-white backdrop-blur-md">
              100% Authentic Medicines
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              All Healthcare & Medicines
            </h1>
            <p className="text-sm sm:text-base text-emerald-100 font-normal">
              Find genuine prescription medicines, OTC drugs, and healthcare products with real-time stock and instant home delivery across Bangladesh.
            </p>
          </div>
          {/* Decorative background shapes */}
          <div className="absolute right-0 top-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute right-32 bottom-0 -mb-10 h-48 w-48 rounded-full bg-emerald-400/20 blur-xl pointer-events-none" />
        </div>

        {/* Controls: Search, Categories & Sorting */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-5">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400 pointer-events-none">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search by medicine name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-white focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 hover:text-gray-600 text-sm"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-semibold text-gray-500">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm focus:border-emerald-500 outline-none cursor-pointer"
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-gray-100">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-1">Categories:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-emerald-600 text-white shadow-sm shadow-emerald-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat === "ALL" ? "All Categories" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-gray-500 px-1">
          <span>Showing <strong className="text-gray-900 font-bold">{filteredProducts.length}</strong> medicines</span>
          {(searchQuery || selectedCategory !== "ALL") && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("ALL");
              }}
              className="text-emerald-600 font-semibold hover:underline cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Medicines Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isWishlisted = (wishlist || []).some(
                (w: any) => w.name === product.name
              );
              const isOutOfStock = product.stock <= 0;
              const isLowStock = product.stock > 0 && product.stock <= 10;

              return (
                <div
                  key={product.name}
                  className="group relative bg-white rounded-3xl border border-gray-100 p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Badges & Wishlist */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100/60">
                        {product.category || "MEDICINE"}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleWishlist(product)}
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

                    {/* Product Icon / Image Illustration */}
                    <div className="h-32 flex items-center justify-center bg-gradient-to-br from-emerald-50/50 to-teal-50/30 rounded-2xl mb-4 group-hover:scale-105 transition duration-200">
                      <span className="text-5xl filter drop-shadow-sm">💊</span>
                    </div>

                    {/* Product Title */}
                    <h3 className="font-bold text-gray-900 text-base leading-snug line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Stock Status Pill */}
                    <div className="mt-2 flex items-center gap-1.5">
                      <span
                        className={`inline-block h-2 w-2 rounded-full ${
                          isOutOfStock
                            ? "bg-red-500"
                            : isLowStock
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                        }`}
                      />
                      <span
                        className={`text-[11px] font-semibold ${
                          isOutOfStock
                            ? "text-red-600"
                            : isLowStock
                            ? "text-amber-600"
                            : "text-emerald-700"
                        }`}
                      >
                        {isOutOfStock
                          ? "Out of Stock"
                          : isLowStock
                          ? `Low Stock (${product.stock} left)`
                          : `In Stock (${product.stock})`}
                      </span>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="mt-5 pt-4 border-t border-gray-100 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-xs text-gray-400 font-medium">Price</span>
                        <div className="text-2xl font-black text-gray-900 tracking-tight">
                          ৳{product.price}
                        </div>
                      </div>
                      <span className="text-[11px] font-medium text-gray-400">
                        Per Unit
                      </span>
                    </div>

                    <button
                      type="button"
                      disabled={isOutOfStock}
                      onClick={() => handleAddToCart(product)}
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
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-sm max-w-md mx-auto space-y-4">
            <div className="text-5xl">🔍</div>
            <h3 className="text-lg font-bold text-gray-900">No medicines found</h3>
            <p className="text-xs text-gray-500">
              We couldn&apos;t find any medicine matching &quot;{searchQuery}&quot;. Please check the spelling or clear filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("ALL");
              }}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
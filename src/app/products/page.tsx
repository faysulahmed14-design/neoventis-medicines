"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { products, type Product } from "../data/products";

export default function ProductsPage() {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedWishlist = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );

    setWishlist(
      savedWishlist.map((item: Product) => item.name)
    );
  }, []);

  const addToCart = (product: Product) => {
    const existingCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const existingProduct = existingCart.find(
      (item: Product & { quantity: number }) =>
        item.name === product.name
    );

    if (existingProduct) {
      if (existingProduct.quantity >= product.stock) {
        alert("Maximum available stock reached!");
        return;
      }

      existingProduct.quantity += 1;
    } else {
      existingCart.push({
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(existingCart)
    );

    alert(`${product.name} added to cart!`);
  };

  const addToWishlist = (product: Product) => {
    const existingWishlist = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );

    const alreadyExists = existingWishlist.some(
      (item: Product) => item.name === product.name
    );

    if (alreadyExists) {
      alert(`${product.name} is already in your wishlist!`);
      return;
    }

    const updatedWishlist = [
      ...existingWishlist,
      product,
    ];

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );

    setWishlist(
      updatedWishlist.map(
        (item: Product) => item.name
      )
    );

    alert(`${product.name} added to wishlist!`);
  };

  const filteredProducts = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-7xl">

          {/* Page Heading */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">
              All Medicines
            </h1>

            <p className="mt-3 text-gray-600">
              Browse our medicines and healthcare products.
            </p>
          </div>

          {/* Search */}
          <div className="mx-auto mt-8 max-w-2xl">
            <input
              type="text"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Search medicines..."
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
            />
          </div>

          {/* Medicine Count */}
          <div className="mt-6 text-center text-sm text-gray-500">
            Showing {filteredProducts.length} of{" "}
            {products.length} medicines
          </div>

          {/* Products */}
          {filteredProducts.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.name}
                  className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  {/* Product Image */}
                  <div className="flex h-48 items-center justify-center bg-gray-100 text-6xl">
                    💊
                  </div>

                  <div className="p-5">

                    {/* Category */}
                    <p className="text-sm text-gray-500">
                      {product.category}
                    </p>

                    {/* Product Name */}
                    <h2 className="mt-2 text-lg font-semibold text-gray-900">
                      {product.name}
                    </h2>

                    {/* Price & Stock */}
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xl font-bold text-green-600">
                        ৳{product.price}
                      </span>

                      <span className="text-sm text-gray-500">
                        Stock: {product.stock}
                      </span>
                    </div>

                    {/* Wishlist */}
                    <button
                      onClick={() =>
                        addToWishlist(product)
                      }
                      className={`mt-5 w-full rounded-lg px-4 py-3 font-semibold transition ${
                        wishlist.includes(product.name)
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600"
                      }`}
                    >
                      {wishlist.includes(product.name)
                        ? "❤️ In Wishlist"
                        : "♡ Add to Wishlist"}
                    </button>

                    {/* Cart */}
                    <button
                      onClick={() =>
                        addToCart(product)
                      }
                      className="mt-3 w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700"
                    >
                      Add to Cart
                    </button>

                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* No Results */
            <div className="mt-12 rounded-xl bg-white p-12 text-center shadow-sm">
              <div className="text-5xl">🔍</div>

              <h2 className="mt-4 text-2xl font-bold text-gray-900">
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
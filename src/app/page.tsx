"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { products, type Product } from "./data/products";

export default function Home() {
  const [wishlist, setWishlist] = useState<string[]>([]);

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

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="bg-green-50 px-6 py-20">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
            Your Trusted Online Medicine Store
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Order medicines and healthcare products easily
            from the comfort of your home.
          </p>

          <a
            href="/products"
            className="mt-8 inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
          >
            Shop Medicines
          </a>
        </div>
      </section>

      {/* Medicines Section */}
      <section className="min-h-screen bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-7xl">

          <div className="mb-10 text-center">
            <h2 className="text-4xl font-bold text-gray-900">
              Our Medicines
            </h2>

            <p className="mt-3 text-gray-600">
              Browse our available medicines and healthcare products.
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
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
                  <h3 className="mt-2 text-lg font-semibold text-gray-900">
                    {product.name}
                  </h3>

                  {/* Price & Stock */}
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xl font-bold text-green-600">
                      ৳{product.price}
                    </span>

                    <span className="text-sm text-gray-500">
                      Stock: {product.stock}
                    </span>
                  </div>

                  {/* Wishlist Button */}
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

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-3 w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700"
                  >
                    Add to Cart
                  </button>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
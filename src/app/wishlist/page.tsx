"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

type WishlistProduct = {
  name: string;
  category: string;
  price: number;
  stock: number;
};

type CartProduct = WishlistProduct & {
  quantity: number;
};

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistProduct[]>([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");

    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  const removeFromWishlist = (productName: string) => {
    const updatedWishlist = wishlist.filter(
      (item) => item.name !== productName
    );

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );
  };

  const addToCart = (product: WishlistProduct) => {
    const existingCart: CartProduct[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const existingProduct = existingCart.find(
      (item) => item.name === product.name
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

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-7xl">

          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-green-600">
              My Wishlist
            </p>

            <h1 className="mt-2 text-4xl font-bold text-gray-900">
              Wishlist
            </h1>

            <p className="mt-3 text-gray-600">
              Save your favorite medicines for later.
            </p>
          </div>

          {wishlist.length === 0 ? (
            <div className="mt-10 rounded-xl border bg-white p-12 text-center shadow-sm">
              <div className="text-6xl">❤️</div>

              <h2 className="mt-5 text-2xl font-bold text-gray-900">
                Your Wishlist is Empty
              </h2>

              <p className="mt-2 text-gray-500">
                Add medicines to your wishlist to see them here.
              </p>

              <a
                href="/products"
                className="mt-6 inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
              >
                Browse Medicines
              </a>
            </div>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {wishlist.map((product) => (
                <div
                  key={product.name}
                  className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-48 items-center justify-center bg-gray-100 text-6xl">
                    💊
                  </div>

                  <div className="p-5">
                    <p className="text-sm text-gray-500">
                      {product.category}
                    </p>

                    <h2 className="mt-2 text-lg font-semibold text-gray-900">
                      {product.name}
                    </h2>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xl font-bold text-green-600">
                        ৳{product.price}
                      </span>

                      <span className="text-sm text-gray-500">
                        Stock: {product.stock}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="mt-5 w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700"
                    >
                      Add to Cart
                    </button>

                    <button
                      onClick={() =>
                        removeFromWishlist(product.name)
                      }
                      className="mt-3 w-full rounded-lg border border-red-200 px-4 py-3 font-semibold text-red-600 hover:bg-red-50"
                    >
                      Remove from Wishlist
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
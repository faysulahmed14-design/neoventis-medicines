"use client";

import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    subtotal,
    deliveryCharge,
    grandTotal,
  } = useCart();

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          {/* পেজ হেডার */}
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-green-600">
              Shopping Cart
            </p>
            <h1 className="mt-1 text-3xl font-bold text-gray-900">
              Your Medicines
            </h1>
            <p className="mt-2 text-gray-600">
              Review your items before proceeding to checkout.
            </p>
          </div>

          {/* এম্পটি কার্ট ভিউ */}
          {cart.length === 0 ? (
            <div className="rounded-xl border bg-white px-6 py-16 text-center shadow-sm">
              <div className="text-6xl">🛒</div>
              <h2 className="mt-5 text-2xl font-bold text-gray-900">
                Your cart is empty
              </h2>
              <p className="mt-2 text-gray-500">
                You haven't added any medicines yet.
              </p>
              <Link
                href="/products"
                className="mt-6 inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 transition shadow-sm"
              >
                Browse Medicines
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              {/* কার্ট আইটেম লিস্ট */}
              <div className="space-y-4 lg:col-span-2">
                {cart.map((item) => (
                  <div
                    key={item.name}
                    className="flex flex-col gap-4 rounded-xl border bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                  >
                    {/* মেডিসিন ইনফো */}
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-50 text-3xl">
                        💊
                      </div>
                      <div>
                        <span className="text-xs font-semibold uppercase text-green-600">
                          {item.category}
                        </span>
                        <h2 className="text-lg font-bold text-gray-900">
                          {item.name}
                        </h2>
                        <p className="font-semibold text-green-600">
                          ৳{item.price}
                        </p>
                      </div>
                    </div>

                    {/* কোয়ান্টিটি ও রিমুভ কন্ট্রোল */}
                    <div className="flex items-center justify-between sm:justify-end gap-4 border-t pt-3 sm:border-0 sm:pt-0">
                      <div className="flex items-center rounded-lg border">
                        <button
                          onClick={() => decreaseQuantity(item.name)}
                          className="px-3 py-1.5 font-bold text-gray-700 hover:bg-gray-100 transition"
                        >
                          −
                        </button>
                        <span className="min-w-10 text-center font-semibold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item.name)}
                          disabled={item.quantity >= item.stock}
                          className={`px-3 py-1.5 font-bold ${
                            item.quantity >= item.stock
                              ? "cursor-not-allowed text-gray-300"
                              : "text-gray-700 hover:bg-gray-100"
                          } transition`}
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-gray-900">
                          ৳{item.price * item.quantity}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.name)}
                          className="text-xs font-semibold text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* অর্ডার সামারি */}
              <div className="h-fit rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900">
                  Order Summary
                </h2>

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">৳{subtotal}</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Charge</span>
                    <span className="font-medium text-gray-900">৳{deliveryCharge}</span>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="font-bold text-gray-900">Grand Total</span>
                      <span className="text-xl font-bold text-green-600">
                        ৳{grandTotal}
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="mt-6 block w-full rounded-lg bg-green-600 px-5 py-3 text-center font-semibold text-white shadow-sm hover:bg-green-700 transition"
                >
                  Proceed to Checkout
                </Link>

                <Link
                  href="/products"
                  className="mt-3 block w-full rounded-lg bg-gray-100 px-5 py-3 text-center font-semibold text-gray-700 hover:bg-gray-200 transition"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
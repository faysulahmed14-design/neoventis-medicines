"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type CartItem = {
  name: string;
  category: string;
  price: number;
  stock: number;
  quantity: number;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  // =========================
  // LOAD CART
  // =========================

  useEffect(() => {
    const savedCart =
      localStorage.getItem("cart");

    if (!savedCart) {
      setCart([]);
      return;
    }

    try {
      const parsedCart =
        JSON.parse(savedCart);

      setCart(parsedCart);
    } catch (error) {
      console.error(
        "Failed to load cart:",
        error
      );

      setCart([]);
    }
  }, []);

  // =========================
  // SAVE CART
  // =========================

  const saveCart = (
    updatedCart: CartItem[]
  ) => {
    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  // =========================
  // INCREASE QUANTITY
  // =========================

  const increaseQuantity = (
    productName: string
  ) => {
    const updatedCart = cart.map(
      (item) => {

        if (
          item.name !== productName
        ) {
          return item;
        }

        if (
          item.quantity >=
          item.stock
        ) {
          alert(
            "Maximum available stock reached!"
          );

          return item;
        }

        return {
          ...item,
          quantity:
            item.quantity + 1,
        };
      }
    );

    saveCart(updatedCart);
  };

  // =========================
  // DECREASE QUANTITY
  // =========================

  const decreaseQuantity = (
    productName: string
  ) => {
    const updatedCart = cart
      .map((item) => {

        if (
          item.name !== productName
        ) {
          return item;
        }

        return {
          ...item,
          quantity:
            item.quantity - 1,
        };
      })
      .filter(
        (item) =>
          item.quantity > 0
      );

    saveCart(updatedCart);
  };

  // =========================
  // REMOVE PRODUCT
  // =========================

  const removeItem = (
    productName: string
  ) => {
    const updatedCart =
      cart.filter(
        (item) =>
          item.name !== productName
      );

    saveCart(updatedCart);
  };

  // =========================
  // SUBTOTAL
  // =========================

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      item.price *
        item.quantity,
    0
  );

  // =========================
  // DELIVERY
  // =========================

  const delivery =
    cart.length > 0 ? 60 : 0;

  // =========================
  // GRAND TOTAL
  // =========================

  const grandTotal =
    subtotal + delivery;

  // =========================
  // EMPTY CART
  // =========================

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-10">

        <div className="mx-auto max-w-4xl">

          <div className="rounded-xl border bg-white px-6 py-16 text-center shadow-sm">

            <div className="text-6xl">
              🛒
            </div>

            <h1 className="mt-5 text-2xl font-bold text-gray-900">
              Your cart is empty
            </h1>

            <p className="mt-2 text-gray-500">
              Add some medicines to your cart.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
            >
              Browse Medicines
            </Link>

          </div>

        </div>

      </main>
    );
  }

  // =========================
  // CART PAGE
  // =========================

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">

      <div className="mx-auto max-w-6xl">

        {/* HEADER */}

        <div className="mb-8">

          <p className="text-sm font-semibold text-green-600">
            Shopping Cart
          </p>

          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            Your Cart
          </h1>

          <p className="mt-2 text-gray-600">
            Review your medicines before checkout.
          </p>

        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          {/* ========================= */}
          {/* CART ITEMS */}
          {/* ========================= */}

          <div className="space-y-4 lg:col-span-2">

            {cart.map(
              (item) => (

                <div
                  key={item.name}
                  className="rounded-xl border bg-white p-5 shadow-sm"
                >

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                    {/* PRODUCT */}

                    <div className="flex items-center gap-4">

                      <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-gray-100 text-4xl">
                        💊
                      </div>

                      <div>

                        <p className="text-xs font-semibold uppercase text-green-600">
                          {item.category}
                        </p>

                        <h2 className="mt-1 text-lg font-bold text-gray-900">
                          {item.name}
                        </h2>

                        <p className="mt-1 font-semibold text-green-600">
                          ৳{item.price}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          Available stock:{" "}
                          {item.stock}
                        </p>

                      </div>

                    </div>

                    {/* CONTROLS */}

                    <div className="flex items-center gap-4">

                      <div className="flex items-center overflow-hidden rounded-lg border">

                        <button
                          onClick={() =>
                            decreaseQuantity(
                              item.name
                            )
                          }
                          className="px-4 py-2 text-lg font-bold text-gray-700 hover:bg-gray-100"
                        >
                          −
                        </button>

                        <span className="min-w-12 border-x px-4 py-2 text-center font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(
                              item.name
                            )
                          }
                          disabled={
                            item.quantity >=
                            item.stock
                          }
                          className={`px-4 py-2 text-lg font-bold ${
                            item.quantity >=
                            item.stock
                              ? "cursor-not-allowed text-gray-300"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          +
                        </button>

                      </div>

                      <button
                        onClick={() =>
                          removeItem(
                            item.name
                          )
                        }
                        className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                  {/* ITEM TOTAL */}

                  <div className="mt-4 border-t pt-4 text-right">

                    <span className="text-sm text-gray-500">
                      Item Total:{" "}
                    </span>

                    <span className="font-bold text-gray-900">
                      ৳
                      {item.price *
                        item.quantity}
                    </span>

                  </div>

                </div>

              )
            )}

          </div>

          {/* ========================= */}
          {/* ORDER SUMMARY */}
          {/* ========================= */}

          <div className="h-fit rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">

              <div className="flex justify-between text-gray-600">

                <span>
                  Subtotal
                </span>

                <span>
                  ৳{subtotal}
                </span>

              </div>

              <div className="flex justify-between text-gray-600">

                <span>
                  Delivery
                </span>

                <span>
                  ৳{delivery}
                </span>

              </div>

              <div className="border-t pt-4">

                <div className="flex justify-between">

                  <span className="font-bold text-gray-900">
                    Grand Total
                  </span>

                  <span className="text-xl font-bold text-green-600">
                    ৳{grandTotal}
                  </span>

                </div>

              </div>

            </div>

            <Link
              href="/checkout"
              className="mt-6 block w-full rounded-lg bg-green-600 px-5 py-3 text-center font-semibold text-white hover:bg-green-700"
            >
              Proceed to Checkout
            </Link>

            <Link
              href="/products"
              className="mt-3 block w-full rounded-lg bg-gray-100 px-5 py-3 text-center font-semibold text-gray-700 hover:bg-gray-200"
            >
              Continue Shopping
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}
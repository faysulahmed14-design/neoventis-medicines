"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

type CartProduct = {
  name: string;
  category: string;
  price: number;
  stock: number;
  quantity: number;
};

type PaymentMethod = "cod" | "bkash" | "nagad" | "card";

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartProduct[]>([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("cod");

  const deliveryCharge = 60;

  useEffect(() => {
    const savedCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    setCart(savedCart);
  }, []);

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const grandTotal = subtotal + deliveryCharge;

  const getPaymentMethodName = () => {
    if (paymentMethod === "cod") {
      return "Cash on Delivery";
    }

    if (paymentMethod === "bkash") {
      return "bKash";
    }

    if (paymentMethod === "nagad") {
      return "Nagad";
    }

    return "Card";
  };

  const handlePlaceOrder = () => {
    if (!name.trim()) {
      alert("Please enter your full name.");
      return;
    }

    if (!phone.trim()) {
      alert("Please enter your mobile number.");
      return;
    }

    if (!address.trim()) {
      alert("Please enter your delivery address.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const orderId =
      "ORD-" +
      Date.now().toString().slice(-8);

    const order = {
      orderId,

      customer: {
        name,
        phone,
        address,
      },

      items: cart,

      subtotal,

      deliveryCharge,

      grandTotal,

      paymentMethod: getPaymentMethodName(),

      status: "Order Placed",

      createdAt: new Date().toISOString(),
    };

    /*
      Save latest order
      This is used by the Order Confirmation page.
    */
    localStorage.setItem(
      "latestOrder",
      JSON.stringify(order)
    );

    /*
      Get previous orders
    */
    const existingOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    /*
      Add new order to order history
    */
    existingOrders.push(order);

    /*
      Save all orders
    */
    localStorage.setItem(
      "orders",
      JSON.stringify(existingOrders)
    );

    /*
      Clear cart
    */
    localStorage.removeItem("cart");

    /*
      Go to confirmation page
    */
    window.location.href =
      "/order-confirmation";
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-7xl">

          {/* Page Header */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Checkout
            </h1>

            <p className="mt-2 text-gray-600">
              Complete your delivery and payment information.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-3">

            {/* LEFT SIDE */}
            <div className="space-y-8 lg:col-span-2">

              {/* Delivery Information */}
              <div className="rounded-xl border bg-white p-6 shadow-sm">

                <h2 className="text-2xl font-bold text-gray-900">
                  Delivery Information
                </h2>

                {/* Full Name */}
                <div className="mt-6">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    placeholder="Enter your full name"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                  />
                </div>

                {/* Mobile Number */}
                <div className="mt-5">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Mobile Number
                  </label>

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value)
                    }
                    placeholder="01XXXXXXXXX"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                  />
                </div>

                {/* Delivery Address */}
                <div className="mt-5">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Delivery Address
                  </label>

                  <textarea
                    value={address}
                    onChange={(e) =>
                      setAddress(e.target.value)
                    }
                    placeholder="Enter your complete delivery address"
                    rows={5}
                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                  />
                </div>

              </div>

              {/* Payment Method */}
              <div className="rounded-xl border bg-white p-6 shadow-sm">

                <h2 className="text-2xl font-bold text-gray-900">
                  Payment Method
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Select your preferred payment method.
                </p>

                <div className="mt-6 space-y-3">

                  {/* Cash on Delivery */}
                  <label
                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition ${
                      paymentMethod === "cod"
                        ? "border-green-600 bg-green-50"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        💵
                      </span>

                      <div>
                        <p className="font-semibold text-gray-900">
                          Cash on Delivery
                        </p>

                        <p className="text-sm text-gray-500">
                          Pay when your order arrives.
                        </p>
                      </div>
                    </div>

                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "cod"}
                      onChange={() =>
                        setPaymentMethod("cod")
                      }
                      className="h-5 w-5 accent-green-600"
                    />
                  </label>

                  {/* bKash */}
                  <label
                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition ${
                      paymentMethod === "bkash"
                        ? "border-green-600 bg-green-50"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        📱
                      </span>

                      <div>
                        <p className="font-semibold text-gray-900">
                          bKash
                        </p>

                        <p className="text-sm text-gray-500">
                          Pay securely using bKash.
                        </p>
                      </div>
                    </div>

                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "bkash"}
                      onChange={() =>
                        setPaymentMethod("bkash")
                      }
                      className="h-5 w-5 accent-green-600"
                    />
                  </label>

                  {/* Nagad */}
                  <label
                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition ${
                      paymentMethod === "nagad"
                        ? "border-green-600 bg-green-50"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        📱
                      </span>

                      <div>
                        <p className="font-semibold text-gray-900">
                          Nagad
                        </p>

                        <p className="text-sm text-gray-500">
                          Pay securely using Nagad.
                        </p>
                      </div>
                    </div>

                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "nagad"}
                      onChange={() =>
                        setPaymentMethod("nagad")
                      }
                      className="h-5 w-5 accent-green-600"
                    />
                  </label>

                  {/* Card */}
                  <label
                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition ${
                      paymentMethod === "card"
                        ? "border-green-600 bg-green-50"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        💳
                      </span>

                      <div>
                        <p className="font-semibold text-gray-900">
                          Card
                        </p>

                        <p className="text-sm text-gray-500">
                          Pay using your debit or credit card.
                        </p>
                      </div>
                    </div>

                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "card"}
                      onChange={() =>
                        setPaymentMethod("card")
                      }
                      className="h-5 w-5 accent-green-600"
                    />
                  </label>

                </div>
              </div>

            </div>

            {/* RIGHT SIDE */}
            <div>

              <div className="sticky top-6 rounded-xl border bg-white p-6 shadow-sm">

                <h2 className="text-2xl font-bold text-gray-900">
                  Order Summary
                </h2>

                {/* Products */}
                <div className="mt-6 space-y-4">

                  {cart.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      Your cart is empty.
                    </p>
                  ) : (
                    cart.map((product) => (
                      <div
                        key={product.name}
                        className="flex justify-between gap-4"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {product.name}
                          </p>

                          <p className="text-sm text-gray-500">
                            Qty: {product.quantity}
                          </p>
                        </div>

                        <p className="font-semibold text-gray-900">
                          ৳
                          {product.price *
                            product.quantity}
                        </p>
                      </div>
                    ))
                  )}

                </div>

                <div className="my-5 border-t"></div>

                {/* Subtotal */}
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Subtotal
                  </span>

                  <span className="font-semibold">
                    ৳{subtotal}
                  </span>
                </div>

                {/* Delivery */}
                <div className="mt-3 flex justify-between">
                  <span className="text-gray-600">
                    Delivery Charge
                  </span>

                  <span className="font-semibold">
                    ৳{deliveryCharge}
                  </span>
                </div>

                <div className="my-5 border-t"></div>

                {/* Grand Total */}
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    Grand Total
                  </span>

                  <span className="text-2xl font-bold text-green-600">
                    ৳{grandTotal}
                  </span>
                </div>

                {/* Place Order */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={cart.length === 0}
                  className="mt-6 w-full rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  Place Order
                </button>

                <p className="mt-4 text-center text-xs text-gray-500">
                  By placing your order, you agree to our
                  terms and conditions.
                </p>

              </div>

            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
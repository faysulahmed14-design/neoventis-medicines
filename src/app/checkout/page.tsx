"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

type PaymentMethod = "cod" | "bkash" | "nagad" | "card";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, deliveryCharge, grandTotal, clearCart, deductStock } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // সেভ করা প্রোফাইল থাকলে অটো-ফিল করা
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem("customerProfile");
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        if (profile.name) setName(profile.name);
        if (profile.phone) setPhone(profile.phone);
        if (profile.address) setAddress(profile.address);
      }
    } catch (e) {
      console.error("Failed to load customer profile:", e);
    }
  }, []);

  const getPaymentMethodName = () => {
    switch (paymentMethod) {
      case "cod":
        return "Cash on Delivery";
      case "bkash":
        return "bKash";
      case "nagad":
        return "Nagad";
      case "card":
        return "Card";
    }
  };

  const handlePlaceOrder = () => {
    if (!name.trim()) {
      alert("Please enter your full name.");
      return;
    }

    if (!phone.trim() || phone.trim().length < 11) {
      alert("Please enter a valid mobile number (at least 11 digits).");
      return;
    }

    if (!address.trim()) {
      alert("Please enter your delivery address.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty. Add medicines first.");
      router.push("/products");
      return;
    }

    setIsSubmitting(true);

    const orderId = "ORD-" + Date.now().toString().slice(-8);

    const order = {
      orderId,
      customer: {
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
      },
      items: cart,
      subtotal,
      deliveryCharge,
      grandTotal,
      paymentMethod: getPaymentMethodName(),
      status: "Order Placed",
      createdAt: new Date().toISOString(),
    };

    try {
      // ১. ইনভেন্টরি থেকে স্টক ডিডাক্ট করা
      deductStock(cart);

      // ২. সর্বশেষ অর্ডারটি সেভ করা (কনফার্মেশন ও ট্র্যাকিংয়ের জন্য)
      localStorage.setItem("latestOrder", JSON.stringify(order));

      // ৩. অর্ডার হিস্টোরিতে যুক্ত করা
      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      existingOrders.push(order);
      localStorage.setItem("orders", JSON.stringify(existingOrders));

      // ৪. সফল অর্ডারের পর কার্ট খালি করা
      clearCart();

      // ৫. অর্ডার কনফার্মেশন পেজে পাঠানো
      router.push("/order-confirmation");
    } catch (error) {
      console.error("Order placing error:", error);
      alert("Failed to place order. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-green-600">
              Checkout
            </p>
            <h1 className="mt-1 text-3xl font-extrabold text-gray-900 md:text-4xl">
              Complete Your Order
            </h1>
            <p className="mt-2 text-gray-600">
              Please enter your delivery and payment details.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {/* বাম পাশ: ফর্ম ও পেমেন্ট অপশন */}
            <div className="space-y-8 lg:col-span-2">
              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900">
                  Delivery Information
                </h2>

                <div className="mt-6 space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Delivery Address *
                    </label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="House / Road, Area, City"
                      rows={4}
                      className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                    />
                  </div>
                </div>
              </div>

              {/* পেমেন্ট মেথড */}
              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900">
                  Payment Method
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Select your preferred payment method.
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    { id: "cod", name: "Cash on Delivery", desc: "Pay with cash upon delivery", icon: "💵" },
                    { id: "bkash", name: "bKash", desc: "Pay securely using bKash wallet", icon: "📱" },
                    { id: "nagad", name: "Nagad", desc: "Pay securely using Nagad wallet", icon: "📱" },
                    { id: "card", name: "Debit / Credit Card", desc: "Pay with Visa or Mastercard", icon: "💳" },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition ${
                        paymentMethod === method.id
                          ? "border-green-600 bg-green-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{method.icon}</span>
                        <div>
                          <p className="font-semibold text-gray-900">{method.name}</p>
                          <p className="text-xs text-gray-500">{method.desc}</p>
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id as PaymentMethod)}
                        className="h-4 w-4 accent-green-600"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* ডান পাশ: অর্ডার সারাংশ */}
            <div>
              <div className="sticky top-6 rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900">
                  Order Summary
                </h2>

                <div className="mt-6 max-h-60 space-y-3 overflow-y-auto pr-1">
                  {cart.length === 0 ? (
                    <p className="text-sm text-gray-500">Your cart is empty.</p>
                  ) : (
                    cart.map((item) => (
                      <div key={item.name} className="flex justify-between text-sm">
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-gray-900">
                          ৳{item.price * item.quantity}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                <div className="my-5 border-t" />

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">৳{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Charge</span>
                    <span className="font-medium text-gray-900">৳{deliveryCharge}</span>
                  </div>
                </div>

                <div className="my-5 border-t" />

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">Grand Total</span>
                  <span className="text-2xl font-bold text-green-600">
                    ৳{grandTotal}
                  </span>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={cart.length === 0 || isSubmitting}
                  className="mt-6 w-full rounded-lg bg-green-600 py-3 font-semibold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  {isSubmitting ? "Placing Order..." : "Confirm & Place Order"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
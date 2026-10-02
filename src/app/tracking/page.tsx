"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

type OrderItem = {
  name: string;
  category: string;
  price: number;
  stock: number;
  quantity: number;
};

type Order = {
  orderId: string;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  items: OrderItem[];
  subtotal: number;
  deliveryCharge: number;
  grandTotal: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
};

const statusSteps = [
  "Order Placed",
  "Order Confirmed",
  "Preparing",
  "Out for Delivery",
  "Delivered",
];

export default function TrackingPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [searchId, setSearchId] = useState("");

  const loadLatestOrder = () => {
    try {
      const saved = localStorage.getItem("latestOrder");
      if (saved) {
        setOrder(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Storage error:", e);
    }
  };

  useEffect(() => {
    loadLatestOrder();

    // অ্যাডমিন প্যানেল অন্য ট্যাবে থাকলে লাইভ সিঙ্ক হওয়া
    const handleStorageChange = () => {
      loadLatestOrder();
    };

    window.addEventListener("storage", handleStorageChange);
    const interval = setInterval(loadLatestOrder, 1500);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleSearchOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    try {
      const allOrders: Order[] = JSON.parse(
        localStorage.getItem("orders") || "[]"
      );
      const matched = allOrders.find(
        (o) => o.orderId.toLowerCase() === searchId.trim().toLowerCase()
      );

      if (matched) {
        setOrder(matched);
      } else {
        alert("No order found with this ID.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const currentStep = order ? statusSteps.indexOf(order.status) : -1;

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-4xl">
          {/* হেডিং */}
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-green-600">
              Live Delivery Status
            </p>
            <h1 className="mt-2 text-3xl font-extrabold text-gray-900 md:text-4xl">
              Track Your Medicine Order
            </h1>
            <p className="mt-2 text-gray-600">
              Check real-time preparation and delivery progress.
            </p>
          </div>

          {/* অর্ডার আইডি দিয়ে সার্চ */}
          <form
            onSubmit={handleSearchOrder}
            className="mx-auto mt-8 flex max-w-lg gap-3"
          >
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Search by Order ID (e.g. ORD-12345678)"
              className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 shadow-sm"
            />
            <button
              type="submit"
              className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700 transition"
            >
              Search
            </button>
          </form>

          {!order ? (
            <div className="mt-10 rounded-xl border bg-white p-12 text-center shadow-sm">
              <div className="text-6xl">📦</div>
              <h2 className="mt-4 text-2xl font-bold text-gray-900">
                No Recent Order Found
              </h2>
              <p className="mt-2 text-gray-500">
                Place an order first or search using an Order ID.
              </p>
              <Link
                href="/products"
                className="mt-6 inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 transition"
              >
                Browse Medicines
              </Link>
            </div>
          ) : (
            <div className="mt-10 space-y-8">
              {/* অর্ডার হেড কার্ড */}
              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <span className="text-xs font-semibold uppercase text-gray-400">
                      Order Reference
                    </span>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {order.orderId}
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      Placed on: {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <span className="inline-block rounded-full bg-green-100 px-4 py-1.5 text-sm font-bold text-green-700">
                    {order.status}
                  </span>
                </div>
              </div>

              {/* স্টেপ প্রোগ্রেস ট্র্যাকার */}
              <div className="rounded-xl border bg-white p-8 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-8">
                  Delivery Timeline
                </h3>

                <div className="relative pl-6 space-y-8 border-l-2 border-gray-200 ml-4">
                  {statusSteps.map((step, idx) => {
                    const isCompleted = idx <= currentStep;
                    const isCurrent = idx === currentStep;

                    return (
                      <div key={step} className="relative">
                        {/* গোল আইকন মার্কার */}
                        <div
                          className={`absolute -left-[35px] top-0 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition ${
                            isCompleted
                              ? "bg-green-600 text-white"
                              : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {isCompleted ? "✓" : idx + 1}
                        </div>

                        <div>
                          <p
                            className={`font-semibold text-base ${
                              isCurrent
                                ? "text-green-600"
                                : isCompleted
                                ? "text-gray-900"
                                : "text-gray-400"
                            }`}
                          >
                            {step}
                          </p>
                          {isCurrent && (
                            <p className="text-xs text-gray-500 mt-1">
                              Your order is currently processing under this stage.
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ডেলিভারি ও প্রোডাক্ট সামারি */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 border-b pb-3">
                    Shipping Details
                  </h3>
                  <div className="mt-4 space-y-2 text-sm">
                    <p><span className="text-gray-500">Recipient:</span> <span className="font-semibold text-gray-900">{order.customer?.name}</span></p>
                    <p><span className="text-gray-500">Phone:</span> <span className="font-semibold text-gray-900">{order.customer?.phone}</span></p>
                    <p><span className="text-gray-500">Address:</span> <span className="font-semibold text-gray-900">{order.customer?.address}</span></p>
                  </div>
                </div>

                <div className="rounded-xl border bg-white p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 border-b pb-3">
                    Payment & Total
                  </h3>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Payment:</span>
                      <span className="font-semibold text-gray-900">{order.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Subtotal:</span>
                      <span className="font-semibold text-gray-900">৳{order.subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Delivery:</span>
                      <span className="font-semibold text-gray-900">৳{order.deliveryCharge}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 text-base font-bold">
                      <span className="text-gray-900">Total Paid:</span>
                      <span className="text-green-600">৳{order.grandTotal}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
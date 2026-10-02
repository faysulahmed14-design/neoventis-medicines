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
  grandTotal: number;
  status: string;
  createdAt: string;
};

export default function AccountPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    // সেভ করা প্রোফাইল লোড করা
    try {
      const savedProfile = localStorage.getItem("customerProfile");
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        setName(profile.name || "");
        setPhone(profile.phone || "");
        setAddress(profile.address || "");
      }

      // অর্ডার হিস্টোরি লোড করা
      const savedOrders = localStorage.getItem("orders");
      if (savedOrders) {
        const parsedOrders: Order[] = JSON.parse(savedOrders);
        setOrders([...parsedOrders].reverse());
      }
    } catch (e) {
      console.error("Storage load error:", e);
    }
  }, []);

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter your name.");
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

    const profile = { name: name.trim(), phone: phone.trim(), address: address.trim() };
    localStorage.setItem("customerProfile", JSON.stringify(profile));
    alert("Profile saved successfully! These details will autofill on checkout.");
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-green-600">
              Customer Portal
            </p>
            <h1 className="mt-1 text-3xl font-extrabold text-gray-900 md:text-4xl">
              My Account
            </h1>
            <p className="mt-2 text-gray-600">
              Manage your default delivery address and track past medicine orders.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {/* ১. প্রোফাইল এডিট ফর্ম */}
            <div className="lg:col-span-1">
              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <div className="flex items-center gap-4 border-b pb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-2xl">
                    👤
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">Default Shipping</h2>
                    <p className="text-xs text-gray-500">Fast checkout pre-fill</p>
                  </div>
                </div>

                <form onSubmit={saveProfile} className="mt-5 space-y-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Faysul Ahmed"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                      Delivery Address
                    </label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="House / Road, Area, City"
                      rows={3}
                      className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-lg bg-green-600 py-2.5 font-semibold text-sm text-white shadow-sm hover:bg-green-700 transition"
                  >
                    Save Address Details
                  </button>
                </form>
              </div>
            </div>

            {/* ২. অর্ডার হিস্টোরি */}
            <div className="lg:col-span-2">
              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Order History</h2>
                    <p className="text-xs text-gray-500">Your previous purchases</p>
                  </div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                    {orders.length} Orders
                  </span>
                </div>

                {orders.length === 0 ? (
                  <div className="mt-8 rounded-lg bg-gray-50 p-8 text-center border">
                    <div className="text-5xl">📦</div>
                    <h3 className="mt-3 text-base font-bold text-gray-900">No Orders Yet</h3>
                    <p className="mt-1 text-xs text-gray-500">
                      When you place an order, it will appear here.
                    </p>
                    <Link
                      href="/products"
                      className="mt-4 inline-block rounded-lg bg-green-600 px-4 py-2 text-xs font-semibold text-white hover:bg-green-700"
                    >
                      Browse Medicines
                    </Link>
                  </div>
                ) : (
                  <div className="mt-6 space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.orderId}
                        className="rounded-lg border p-5 transition hover:border-gray-300"
                      >
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <span className="text-xs text-gray-400 uppercase font-semibold">Order ID</span>
                            <h3 className="font-bold text-gray-900">{order.orderId}</h3>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>

                          <div className="sm:text-right">
                            <span className="inline-block rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-bold text-green-700">
                              {order.status}
                            </span>
                            <p className="mt-1 font-bold text-green-600">
                              ৳{order.grandTotal}
                            </p>
                          </div>
                        </div>

                        {/* ওষুধের নামগুলোর ছোট তালিকা */}
                        <div className="mt-3 border-t pt-2 text-xs text-gray-500">
                          {order.items?.map((item) => `${item.name} (x${item.quantity})`).join(", ")}
                        </div>

                        <div className="mt-3 flex justify-end">
                          <Link
                            href="/tracking"
                            onClick={() => {
                              localStorage.setItem("latestOrder", JSON.stringify(order));
                            }}
                            className="text-xs font-bold text-green-600 hover:text-green-700 hover:underline"
                          >
                            Live Tracking →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
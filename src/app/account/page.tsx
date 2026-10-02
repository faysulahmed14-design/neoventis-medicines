"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface OrderItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
}

interface OrderRecord {
  id: string | number;
  createdAt: string;
  items: OrderItem[];
  totalAmount?: number;
  total?: number;
}

export default function AccountPage() {
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    phone: "",
    address: "",
  });
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Load saved address
    const savedAddress = localStorage.getItem("neoventis_shipping_info");
    if (savedAddress) {
      try {
        setShippingInfo(JSON.parse(savedAddress));
      } catch (e) {
        console.error("Failed to parse shipping info", e);
      }
    }

    // Load orders directly from localStorage
    const savedOrders = localStorage.getItem("neoventis_orders");
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        console.error("Failed to parse orders", e);
      }
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
    setIsSaved(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("neoventis_shipping_info", JSON.stringify(shippingInfo));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            My Account
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your default shipping address and track past medicine orders.
          </p>
        </div>

        {/* Shipping Form Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-3 pb-6 border-b border-gray-100">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold">
              👤
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Default Shipping</h2>
              <p className="text-xs text-gray-500">Fast checkout pre-fill</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="mt-6 space-y-5">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={shippingInfo.fullName}
                onChange={handleChange}
                placeholder="e.g. Faysul Ahmed"
                style={{ color: "#111827", backgroundColor: "#ffffff" }}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-base !text-gray-900 placeholder:text-gray-400 bg-white font-semibold focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={shippingInfo.phone}
                onChange={handleChange}
                placeholder="01XXXXXXXXX"
                style={{ color: "#111827", backgroundColor: "#ffffff" }}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-base !text-gray-900 placeholder:text-gray-400 bg-white font-semibold focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                Delivery Address
              </label>
              <textarea
                name="address"
                rows={3}
                value={shippingInfo.address}
                onChange={handleChange}
                placeholder="House / Road, Area, City"
                style={{ color: "#111827", backgroundColor: "#ffffff" }}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-base !text-gray-900 placeholder:text-gray-400 bg-white font-semibold focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 transition shadow-sm text-sm sm:text-base cursor-pointer"
            >
              {isSaved ? "Saved Successfully! ✓" : "Save Address Details"}
            </button>
          </form>
        </div>

        {/* Order History */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Order History</h2>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-1 rounded-full">
              {orders.length} Orders
            </span>
          </div>

          {orders.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-gray-500 text-sm">You have not placed any orders yet.</p>
              <Link
                href="/products"
                className="mt-4 inline-block text-sm font-semibold text-emerald-600 hover:underline"
              >
                Browse Medicines →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 mt-4">
              {orders.map((order) => (
                <div key={order.id} className="py-4 flex flex-col sm:flex-row justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      Order #{order.id}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "Recent"} • {order.items?.length || 0} items
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-emerald-600">
                      ৳{order.totalAmount ?? order.total ?? 0}
                    </span>
                    <Link
                      href={`/tracking?orderId=${order.id}`}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                    >
                      Track Order
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
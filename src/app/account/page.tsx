"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

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
  const { customer, logoutCustomer } = useAuth();

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    phone: "",
    address: "",
  });
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (customer) {
      setShippingInfo({
        fullName: customer.name || "",
        phone: customer.phone || "",
        address: customer.address || "",
      });
    } else {
      const savedAddress = localStorage.getItem("neoventis_shipping_info");
      if (savedAddress) {
        try {
          setShippingInfo(JSON.parse(savedAddress));
        } catch (e) {
          console.error("Failed to parse shipping info", e);
        }
      }
    }

    const savedOrders = localStorage.getItem("neoventis_orders");
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        console.error("Failed to parse orders", e);
      }
    }
  }, [customer]);

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
    <div className="min-h-screen bg-slate-50/70 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Page Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {customer ? `Welcome, ${customer.name}!` : "Customer Profile"}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              Manage your default delivery address and track past medicine orders.
            </p>
          </div>

          {customer ? (
            <button
              type="button"
              onClick={logoutCustomer}
              className="px-4 py-2 rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold transition self-start sm:self-auto cursor-pointer"
            >
              Log Out
            </button>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm self-start sm:self-auto"
            >
              Sign In / Register
            </Link>
          )}
        </div>

        {/* Not logged in notification banner */}
        {!customer && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="text-emerald-900">
              <strong>Tip:</strong> Create an account or sign in to save your prescriptions, addresses, and order history across devices.
            </div>
            <Link
              href="/login"
              className="font-bold text-emerald-700 hover:underline shrink-0"
            >
              Customer Login →
            </Link>
          </div>
        )}

        {/* Shipping Form Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-3 pb-6 border-b border-gray-100">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold">
              👤
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">Delivery & Shipping Address</h2>
              <p className="text-xs text-gray-500">Auto-filled during checkout</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={shippingInfo.fullName}
                onChange={handleChange}
                placeholder="e.g. Faysul Ahmed"
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm bg-white font-medium focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={shippingInfo.phone}
                onChange={handleChange}
                placeholder="01XXXXXXXXX"
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm bg-white font-medium focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Delivery Address
              </label>
              <textarea
                name="address"
                rows={3}
                value={shippingInfo.address}
                onChange={handleChange}
                placeholder="House / Road, Area, City"
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm bg-white font-medium focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 transition shadow-sm text-sm cursor-pointer"
            >
              {isSaved ? "Saved Successfully! ✓" : "Save Address Details"}
            </button>
          </form>
        </div>

        {/* Order History */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <h2 className="text-base font-bold text-gray-900">Past Orders</h2>
            <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-3 py-1 rounded-full border border-emerald-100">
              {orders.length} Orders
            </span>
          </div>

          {orders.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <div className="text-4xl">📦</div>
              <p className="text-gray-500 text-xs">You have not placed any orders yet.</p>
              <Link
                href="/products"
                className="mt-3 inline-block text-xs font-bold text-emerald-600 hover:underline"
              >
                Browse Medicines →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 mt-2">
              {orders.map((order) => (
                <div key={order.id} className="py-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      Order #{order.id}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "Recent"} • {order.items?.length || 0} items
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-base font-black text-emerald-600">
                      ৳{order.totalAmount ?? order.total ?? 0}
                    </span>
                    <Link
                      href={`/tracking?orderId=${order.id}`}
                      className="text-xs font-bold px-3.5 py-1.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
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
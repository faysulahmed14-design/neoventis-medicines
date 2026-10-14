"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

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

const statusOptions = [
  "Order Placed",
  "Order Confirmed",
  "Preparing",
  "Out for Delivery",
  "Delivered",
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/orders");
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        setOrders(json.data);
      } else {
        const saved = localStorage.getItem("neoventis_orders") || localStorage.getItem("orders");
        if (saved) {
          setOrders(JSON.parse(saved));
        }
      }
    } catch (e) {
      console.warn("Could not fetch orders from cloud API, using local fallback:", e);
      const saved = localStorage.getItem("neoventis_orders") || localStorage.getItem("orders");
      if (saved) {
        setOrders(JSON.parse(saved));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      await fetch("/api/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      });

      setOrders((prev) =>
        prev.map((order) =>
          order.orderId === orderId || (order as any).id === orderId
            ? { ...order, status: newStatus }
            : order
        )
      );

      // Local storage sync as well
      const saved = localStorage.getItem("neoventis_orders");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const updated = parsed.map((o: any) =>
            o.orderId === orderId || o.id === orderId ? { ...o, status: newStatus } : o
          );
          localStorage.setItem("neoventis_orders", JSON.stringify(updated));
        } catch (err) {
          console.error(err);
        }
      }

      alert(`Order ${orderId} updated to "${newStatus}"!`);
    } catch (e) {
      console.error("Failed to update status:", e);
    }
  };

  const router = useRouter();
  const { admin, logoutAdmin, isAuthLoaded } = useAuth();

  useEffect(() => {
    if (isAuthLoaded && !admin) {
      router.push("/admin/login");
    }
  }, [isAuthLoaded, admin, router]);

  const totalSales = orders.reduce((total, order) => total + order.grandTotal, 0);
  const pendingOrders = orders.filter((order) => order.status !== "Delivered").length;

  if (!isAuthLoaded || !admin) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="text-center space-y-3">
          <div className="text-3xl animate-spin">🛡️</div>
          <p className="text-xs text-slate-400">Verifying Admin Access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* Admin Bar */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                🛡️ ADMIN CONSOLE
              </span>
              <span className="text-xs text-gray-500 font-mono">
                {admin.email}
              </span>
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-black text-gray-900">
              Customer Orders Management
            </h1>
            <p className="mt-0.5 text-xs sm:text-sm text-gray-500">
              Review placed orders, update delivery progress, and audit payments.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/admin/dashboard"
              className="rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2 text-xs font-bold text-gray-700 hover:bg-gray-100 transition"
            >
              📊 Dashboard
            </Link>
            <Link
              href="/admin/products"
              className="rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2 text-xs font-bold text-gray-700 hover:bg-gray-100 transition"
            >
              💊 Products
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 transition"
            >
              🏪 Store
            </Link>
            <button
              type="button"
              onClick={logoutAdmin}
              className="rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 px-3.5 py-2 text-xs font-bold text-red-600 transition cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>

          {/* স্ট্যাটাস কার্ডস */}
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-gray-500">Total Placed Orders</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{orders.length}</p>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-gray-500">Total Sales Value</p>
              <p className="mt-2 text-3xl font-bold text-green-600">৳{totalSales}</p>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-gray-500">Pending Deliveries</p>
              <p className="mt-2 text-3xl font-bold text-orange-600">{pendingOrders}</p>
            </div>
          </div>

          {/* অর্ডার তালিকা */}
          <div className="mt-8">
            {orders.length === 0 ? (
              <div className="rounded-xl border bg-white p-12 text-center shadow-sm">
                <div className="text-6xl">📦</div>
                <h2 className="mt-5 text-2xl font-bold text-gray-900">No Orders Found</h2>
                <p className="mt-2 text-gray-500">
                  Customer orders will automatically show up here once placed.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div
                    key={order.orderId}
                    className="overflow-hidden rounded-xl border bg-white shadow-sm"
                  >
                    {/* কার্ড টপ */}
                    <div className="border-b bg-gray-50 p-6">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-xs uppercase font-semibold text-gray-500">Order ID</p>
                          <h2 className="text-xl font-bold text-gray-900">{order.orderId}</h2>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(order.createdAt).toLocaleString()}
                          </p>
                        </div>

                        <div>
                          <span className={`inline-block rounded-full px-4 py-1.5 text-xs font-semibold ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* কার্ড বডি: ৩ কলাম গ্রিড */}
                    <div className="grid gap-8 p-6 lg:grid-cols-3">
                      {/* ১. কাস্টমার তথ্য */}
                      <div>
                        <h3 className="font-bold text-gray-900 border-b pb-2">Customer Details</h3>
                        <div className="mt-3 space-y-2 text-sm">
                          <p><span className="text-gray-500">Name:</span> <span className="font-medium text-gray-900">{order.customer?.name}</span></p>
                          <p><span className="text-gray-500">Phone:</span> <span className="font-medium text-gray-900">{order.customer?.phone}</span></p>
                          <p><span className="text-gray-500">Address:</span> <span className="font-medium text-gray-900">{order.customer?.address}</span></p>
                        </div>
                      </div>

                      {/* ২. অর্ডারকৃত ওষুধ */}
                      <div>
                        <h3 className="font-bold text-gray-900 border-b pb-2">Ordered Medicines</h3>
                        <div className="mt-3 space-y-2 max-h-40 overflow-y-auto pr-1">
                          {order.items?.map((item) => (
                            <div key={item.name} className="flex justify-between text-sm bg-gray-50 p-2 rounded">
                              <div>
                                <p className="font-medium text-gray-900">{item.name}</p>
                                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                              </div>
                              <p className="font-semibold text-gray-900">৳{item.price * item.quantity}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* ৩. পেমেন্ট ও সামারি */}
                      <div>
                        <h3 className="font-bold text-gray-900 border-b pb-2">Payment Summary</h3>
                        <div className="mt-3 space-y-1.5 text-sm">
                          <div className="flex justify-between text-gray-600">
                            <span>Method:</span>
                            <span className="font-medium text-gray-900">{order.paymentMethod}</span>
                          </div>
                          <div className="flex justify-between text-gray-600">
                            <span>Subtotal:</span>
                            <span className="font-medium text-gray-900">৳{order.subtotal}</span>
                          </div>
                          <div className="flex justify-between text-gray-600">
                            <span>Delivery:</span>
                            <span className="font-medium text-gray-900">৳{order.deliveryCharge}</span>
                          </div>
                          <div className="flex justify-between border-t pt-2 font-bold text-base text-gray-900">
                            <span>Grand Total:</span>
                            <span className="text-green-600">৳{order.grandTotal}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* কার্ড বটম: স্ট্যাটাস আপডেট ড্রপডাউন */}
                    <div className="border-t bg-gray-50 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">Update Order Stage</p>
                        <p className="text-xs text-gray-500">Updating this updates customer tracking immediately.</p>
                      </div>

                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.orderId, e.target.value)}
                        className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-sm text-gray-700 outline-none focus:border-green-600"
                      >
                        {statusOptions.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
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
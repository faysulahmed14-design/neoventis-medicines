"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

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

  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem("orders");
      if (savedOrders) {
        const parsedOrders: Order[] = JSON.parse(savedOrders);
        setOrders([...parsedOrders].reverse());
      }
    } catch (e) {
      console.error("Failed to load orders:", e);
    }
  }, []);

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    const savedOrders = localStorage.getItem("orders");
    if (!savedOrders) return;

    try {
      const parsedOrders: Order[] = JSON.parse(savedOrders);
      const updatedOrders = parsedOrders.map((order) =>
        order.orderId === orderId ? { ...order, status: newStatus } : order
      );

      // মূল অর্ডার হিস্টোরি আপডেট
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
      setOrders([...updatedOrders].reverse());

      // কাস্টমার ট্র্যাকিংয়ের জন্য latestOrder আপডেট
      const latestOrderData = localStorage.getItem("latestOrder");
      if (latestOrderData) {
        const latestOrder: Order = JSON.parse(latestOrderData);
        if (latestOrder.orderId === orderId) {
          localStorage.setItem(
            "latestOrder",
            JSON.stringify({ ...latestOrder, status: newStatus })
          );
        }
      }

      alert(`Order ${orderId} updated to "${newStatus}"!`);
    } catch (e) {
      console.error("Failed to update status:", e);
    }
  };

  const totalSales = orders.reduce((total, order) => total + order.grandTotal, 0);
  const pendingOrders = orders.filter((order) => order.status !== "Delivered").length;

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-green-600">
              Admin Panel
            </p>
            <h1 className="mt-2 text-3xl font-extrabold text-gray-900">
              Order Management
            </h1>
            <p className="mt-1 text-gray-600">
              Update order processing stage and manage delivery status.
            </p>
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
      </main>

      <Footer />
    </>
  );
}
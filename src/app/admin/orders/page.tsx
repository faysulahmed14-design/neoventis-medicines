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
    const savedOrders = localStorage.getItem("orders");

    if (savedOrders) {
      const parsedOrders: Order[] = JSON.parse(savedOrders);

      setOrders([...parsedOrders].reverse());
    }
  }, []);

  const updateOrderStatus = (
    orderId: string,
    newStatus: string
  ) => {
    const savedOrders = localStorage.getItem("orders");

    if (!savedOrders) {
      return;
    }

    const parsedOrders: Order[] =
      JSON.parse(savedOrders);

    const updatedOrders = parsedOrders.map(
      (order) =>
        order.orderId === orderId
          ? {
              ...order,
              status: newStatus,
            }
          : order
    );

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );

    setOrders(
      [...updatedOrders].reverse()
    );

    const latestOrderData =
      localStorage.getItem("latestOrder");

    if (latestOrderData) {
      const latestOrder: Order =
        JSON.parse(latestOrderData);

      if (latestOrder.orderId === orderId) {
        const updatedLatestOrder = {
          ...latestOrder,
          status: newStatus,
        };

        localStorage.setItem(
          "latestOrder",
          JSON.stringify(updatedLatestOrder)
        );
      }
    }

    alert(
      `Order ${orderId} status updated successfully!`
    );
  };

  const totalSales = orders.reduce(
    (total, order) =>
      total + order.grandTotal,
    0
  );

  const pendingOrders = orders.filter(
    (order) => order.status !== "Delivered"
  ).length;

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-7xl">

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-green-600">
              Admin Panel
            </p>

            <h1 className="mt-2 text-4xl font-bold text-gray-900">
              Order Management
            </h1>

            <p className="mt-2 text-gray-600">
              View customer orders and manage their status.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">

            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">
                Total Orders
              </p>

              <p className="mt-2 text-3xl font-bold text-gray-900">
                {orders.length}
              </p>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">
                Total Sales
              </p>

              <p className="mt-2 text-3xl font-bold text-green-600">
                ৳{totalSales}
              </p>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">
                Pending Orders
              </p>

              <p className="mt-2 text-3xl font-bold text-orange-600">
                {pendingOrders}
              </p>
            </div>

          </div>

          <div className="mt-8">

            {orders.length === 0 ? (
              <div className="rounded-xl border bg-white p-12 text-center shadow-sm">

                <div className="text-6xl">
                  📦
                </div>

                <h2 className="mt-5 text-2xl font-bold text-gray-900">
                  No Orders Found
                </h2>

                <p className="mt-2 text-gray-500">
                  Customer orders will appear here after an order is placed.
                </p>

              </div>
            ) : (
              <div className="space-y-6">

                {orders.map((order) => (
                  <div
                    key={order.orderId}
                    className="overflow-hidden rounded-xl border bg-white shadow-sm"
                  >

                    <div className="border-b bg-gray-50 p-6">

                      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                        <div>
                          <p className="text-sm text-gray-500">
                            Order ID
                          </p>

                          <h2 className="mt-1 text-xl font-bold text-gray-900">
                            {order.orderId}
                          </h2>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">
                            Order Date
                          </p>

                          <p className="mt-1 font-medium text-gray-900">
                            {new Date(
                              order.createdAt
                            ).toLocaleString()}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">
                            Current Status
                          </p>

                          <span className="mt-1 inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                            {order.status}
                          </span>
                        </div>

                      </div>

                    </div>

                    <div className="grid gap-8 p-6 lg:grid-cols-3">

                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          Customer Information
                        </h3>

                        <div className="mt-4 space-y-3">

                          <div>
                            <p className="text-sm text-gray-500">
                              Name
                            </p>

                            <p className="font-semibold text-gray-900">
                              {order.customer.name}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">
                              Phone
                            </p>

                            <p className="font-semibold text-gray-900">
                              {order.customer.phone}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">
                              Address
                            </p>

                            <p className="font-semibold text-gray-900">
                              {order.customer.address}
                            </p>
                          </div>

                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          Ordered Products
                        </h3>

                        <div className="mt-4 space-y-3">

                          {order.items.map((item) => (
                            <div
                              key={item.name}
                              className="flex justify-between gap-4 rounded-lg bg-gray-50 p-3"
                            >

                              <div>
                                <p className="font-semibold text-gray-900">
                                  {item.name}
                                </p>

                                <p className="text-sm text-gray-500">
                                  Quantity: {item.quantity}
                                </p>
                              </div>

                              <p className="font-semibold text-gray-900">
                                ৳
                                {item.price *
                                  item.quantity}
                              </p>

                            </div>
                          ))}

                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          Payment & Total
                        </h3>

                        <div className="mt-4 space-y-3">

                          <div className="flex justify-between gap-4">
                            <span className="text-gray-500">
                              Payment
                            </span>

                            <span className="font-semibold text-gray-900">
                              {order.paymentMethod}
                            </span>
                          </div>

                          <div className="flex justify-between gap-4">
                            <span className="text-gray-500">
                              Subtotal
                            </span>

                            <span className="font-semibold">
                              ৳{order.subtotal}
                            </span>
                          </div>

                          <div className="flex justify-between gap-4">
                            <span className="text-gray-500">
                              Delivery
                            </span>

                            <span className="font-semibold">
                              ৳{order.deliveryCharge}
                            </span>
                          </div>

                          <div className="border-t pt-3">

                            <div className="flex justify-between gap-4">

                              <span className="text-lg font-bold text-gray-900">
                                Grand Total
                              </span>

                              <span className="text-xl font-bold text-green-600">
                                ৳{order.grandTotal}
                              </span>

                            </div>

                          </div>

                        </div>
                      </div>

                    </div>

                    <div className="border-t bg-gray-50 p-6">

                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                        <div>
                          <h3 className="font-bold text-gray-900">
                            Update Order Status
                          </h3>

                          <p className="mt-1 text-sm text-gray-500">
                            Changing this status will also update order tracking.
                          </p>
                        </div>

                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateOrderStatus(
                              order.orderId,
                              e.target.value
                            )
                          }
                          className="rounded-lg border border-gray-300 bg-white px-4 py-3 font-medium text-gray-700 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                        >
                          {statusOptions.map(
                            (status) => (
                              <option
                                key={status}
                                value={status}
                              >
                                {status}
                              </option>
                            )
                          )}
                        </select>

                      </div>

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
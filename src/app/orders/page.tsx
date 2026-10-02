"use client";

import { useEffect, useState } from "react";
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

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    setOrders(savedOrders.reverse());
  }, []);

  const viewOrder = (order: Order) => {
    localStorage.setItem(
      "latestOrder",
      JSON.stringify(order)
    );

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
              My Orders
            </h1>

            <p className="mt-2 text-gray-600">
              View your previous orders and order details.
            </p>
          </div>

          {orders.length === 0 ? (
            /* Empty Orders */
            <div className="mt-10 rounded-xl border bg-white p-10 text-center shadow-sm">

              <div className="text-6xl">
                📦
              </div>

              <h2 className="mt-5 text-2xl font-bold text-gray-900">
                No Orders Yet
              </h2>

              <p className="mt-2 text-gray-500">
                You have not placed any orders yet.
              </p>

              <a
                href="/products"
                className="mt-6 inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
              >
                Browse Medicines
              </a>

            </div>
          ) : (
            /* Orders List */
            <div className="mt-10 space-y-5">

              {orders.map((order) => (
                <div
                  key={order.orderId}
                  className="rounded-xl border bg-white p-6 shadow-sm"
                >

                  {/* Order Top */}
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                    <div>
                      <p className="text-sm text-gray-500">
                        Order ID
                      </p>

                      <h2 className="mt-1 text-lg font-bold text-gray-900">
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
                      <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                        {order.status}
                      </span>
                    </div>

                  </div>

                  <div className="my-5 border-t"></div>

                  {/* Order Information */}
                  <div className="grid gap-6 md:grid-cols-4">

                    {/* Products */}
                    <div>
                      <p className="text-sm text-gray-500">
                        Products
                      </p>

                      <p className="mt-1 font-semibold text-gray-900">
                        {order.items.length} item
                        {order.items.length > 1
                          ? "s"
                          : ""}
                      </p>
                    </div>

                    {/* Payment */}
                    <div>
                      <p className="text-sm text-gray-500">
                        Payment Method
                      </p>

                      <p className="mt-1 font-semibold text-gray-900">
                        {order.paymentMethod}
                      </p>
                    </div>

                    {/* Total */}
                    <div>
                      <p className="text-sm text-gray-500">
                        Grand Total
                      </p>

                      <p className="mt-1 text-lg font-bold text-green-600">
                        ৳{order.grandTotal}
                      </p>
                    </div>

                    {/* Customer */}
                    <div>
                      <p className="text-sm text-gray-500">
                        Customer
                      </p>

                      <p className="mt-1 font-semibold text-gray-900">
                        {order.customer.name}
                      </p>
                    </div>

                  </div>

                  {/* Order Items Preview */}
                  <div className="mt-6 rounded-lg bg-gray-50 p-4">

                    <p className="mb-3 text-sm font-semibold text-gray-700">
                      Ordered Products
                    </p>

                    <div className="space-y-2">

                      {order.items.map((item) => (
                        <div
                          key={item.name}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-gray-700">
                            {item.name} ×{" "}
                            {item.quantity}
                          </span>

                          <span className="font-medium text-gray-900">
                            ৳
                            {item.price *
                              item.quantity}
                          </span>
                        </div>
                      ))}

                    </div>

                  </div>

                  {/* View Order */}
                  <div className="mt-5 flex justify-end">

                    <button
                      onClick={() => viewOrder(order)}
                      className="rounded-lg bg-green-600 px-5 py-2.5 font-semibold text-white hover:bg-green-700"
                    >
                      View Order Details
                    </button>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
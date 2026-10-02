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

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem("latestOrder");

    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  if (!order) {
    return (
      <>
        <Header />

        <main className="min-h-screen bg-gray-50 px-6 py-16">
          <div className="mx-auto max-w-2xl rounded-xl border bg-white p-10 text-center shadow-sm">

            <div className="text-6xl">
              📦
            </div>

            <h1 className="mt-5 text-3xl font-bold text-gray-900">
              No Order Found
            </h1>

            <p className="mt-3 text-gray-600">
              We could not find a recent order.
            </p>

            <a
              href="/products"
              className="mt-6 inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
            >
              Browse Medicines
            </a>

          </div>
        </main>

        <Footer />
      </>
    );
  }

  const orderDate = new Date(
    order.createdAt
  ).toLocaleString();

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-5xl">

          {/* Success Message */}
          <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-3xl text-white">
              ✓
            </div>

            <h1 className="mt-5 text-3xl font-bold text-green-800">
              Order Placed Successfully!
            </h1>

            <p className="mt-2 text-green-700">
              Thank you for your order.
            </p>

            <p className="mt-4 text-sm text-gray-600">
              Order ID:
            </p>

            <p className="mt-1 text-xl font-bold text-gray-900">
              {order.orderId}
            </p>

          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-3">

            {/* Order Details */}
            <div className="space-y-8 lg:col-span-2">

              {/* Customer Information */}
              <div className="rounded-xl border bg-white p-6 shadow-sm">

                <h2 className="text-2xl font-bold text-gray-900">
                  Delivery Information
                </h2>

                <div className="mt-5 space-y-4">

                  <div>
                    <p className="text-sm text-gray-500">
                      Customer Name
                    </p>

                    <p className="mt-1 font-semibold text-gray-900">
                      {order.customer.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Mobile Number
                    </p>

                    <p className="mt-1 font-semibold text-gray-900">
                      {order.customer.phone}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Delivery Address
                    </p>

                    <p className="mt-1 font-semibold text-gray-900">
                      {order.customer.address}
                    </p>
                  </div>

                </div>

              </div>

              {/* Ordered Products */}
              <div className="rounded-xl border bg-white p-6 shadow-sm">

                <h2 className="text-2xl font-bold text-gray-900">
                  Ordered Products
                </h2>

                <div className="mt-6 space-y-4">

                  {order.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0"
                    >

                      <div>
                        <p className="font-semibold text-gray-900">
                          {item.name}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          {item.category}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ৳{item.price}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          Total: ৳
                          {item.price * item.quantity}
                        </p>
                      </div>

                    </div>
                  ))}

                </div>

              </div>

            </div>

            {/* Order Summary */}
            <div>

              <div className="sticky top-6 rounded-xl border bg-white p-6 shadow-sm">

                <h2 className="text-2xl font-bold text-gray-900">
                  Order Summary
                </h2>

                {/* Status */}
                <div className="mt-5 rounded-lg bg-green-50 p-4">

                  <p className="text-sm text-gray-500">
                    Order Status
                  </p>

                  <p className="mt-1 font-bold text-green-700">
                    {order.status}
                  </p>

                </div>

                {/* Payment */}
                <div className="mt-5">

                  <p className="text-sm text-gray-500">
                    Payment Method
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {order.paymentMethod}
                  </p>

                </div>

                {/* Order Date */}
                <div className="mt-5">

                  <p className="text-sm text-gray-500">
                    Order Date
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {orderDate}
                  </p>

                </div>

                <div className="my-6 border-t"></div>

                {/* Subtotal */}
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Subtotal
                  </span>

                  <span className="font-semibold">
                    ৳{order.subtotal}
                  </span>
                </div>

                {/* Delivery */}
                <div className="mt-3 flex justify-between">
                  <span className="text-gray-600">
                    Delivery Charge
                  </span>

                  <span className="font-semibold">
                    ৳{order.deliveryCharge}
                  </span>
                </div>

                <div className="my-5 border-t"></div>

                {/* Grand Total */}
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    Grand Total
                  </span>

                  <span className="text-2xl font-bold text-green-600">
                    ৳{order.grandTotal}
                  </span>
                </div>

              </div>

            </div>

          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

            <a
              href="/products"
              className="rounded-lg bg-green-600 px-6 py-3 text-center font-semibold text-white hover:bg-green-700"
            >
              Continue Shopping
            </a>

            <a
              href="/"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-center font-semibold text-gray-700 hover:bg-gray-50"
            >
              Back to Home
            </a>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
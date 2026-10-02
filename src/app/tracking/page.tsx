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

const statusSteps = [
  "Order Placed",
  "Order Confirmed",
  "Preparing",
  "Out for Delivery",
  "Delivered",
];

export default function TrackingPage() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const loadOrder = () => {
      const savedOrder = localStorage.getItem("latestOrder");

      if (savedOrder) {
        setOrder(JSON.parse(savedOrder));
      }
    };

    loadOrder();

    const handleStorageChange = () => {
      loadOrder();
    };

    window.addEventListener(
      "storage",
      handleStorageChange
    );

    const interval = setInterval(loadOrder, 1000);

    return () => {
      window.removeEventListener(
        "storage",
        handleStorageChange
      );

      clearInterval(interval);
    };
  }, []);

  const currentStep = order
    ? statusSteps.indexOf(order.status)
    : -1;

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-5xl">

          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-green-600">
              Order Tracking
            </p>

            <h1 className="mt-2 text-4xl font-bold text-gray-900">
              Track Your Order
            </h1>

            <p className="mt-3 text-gray-600">
              Check the current status of your medicine order.
            </p>
          </div>

          {!order ? (
            <div className="mt-10 rounded-xl border bg-white p-10 text-center shadow-sm">
              <div className="text-6xl">📦</div>

              <h2 className="mt-5 text-2xl font-bold text-gray-900">
                No Order Found
              </h2>

              <p className="mt-2 text-gray-500">
                Place an order first to track your delivery.
              </p>

              <a
                href="/products"
                className="mt-6 inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
              >
                Browse Medicines
              </a>
            </div>
          ) : (
            <>
              <div className="mt-10 rounded-xl border bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      Order ID
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-gray-900">
                      {order.orderId}
                    </h2>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Order Date
                    </p>

                    <p className="mt-1 font-semibold text-gray-900">
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

              <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900">
                  Order Status
                </h2>

                <div className="mt-8">
                  {statusSteps.map((status, index) => {
                    const completed =
                      index <= currentStep;

                    const isCurrent =
                      index === currentStep;

                    return (
                      <div
                        key={status}
                        className="relative flex gap-4"
                      >
                        {index <
                          statusSteps.length - 1 && (
                          <div
                            className={`absolute left-4 top-9 h-16 w-0.5 ${
                              index < currentStep
                                ? "bg-green-600"
                                : "bg-gray-200"
                            }`}
                          />
                        )}

                        <div
                          className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                            completed
                              ? "bg-green-600 text-white"
                              : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {completed ? "✓" : index + 1}
                        </div>

                        <div className="pb-8">
                          <p
                            className={`font-semibold ${
                              isCurrent
                                ? "text-green-600"
                                : completed
                                ? "text-gray-900"
                                : "text-gray-400"
                            }`}
                          >
                            {status}
                          </p>

                          {isCurrent && (
                            <p className="mt-1 text-sm text-gray-500">
                              Your order is currently at this stage.
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 grid gap-8 md:grid-cols-2">

                <div className="rounded-xl border bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-900">
                    Delivery Information
                  </h2>

                  <div className="mt-5 space-y-4">
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

                <div className="rounded-xl border bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-900">
                    Order Summary
                  </h2>

                  <div className="mt-5 space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={item.name}
                        className="flex justify-between gap-4"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
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

                  <div className="my-5 border-t" />

                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Subtotal
                    </span>

                    <span className="font-semibold">
                      ৳{order.subtotal}
                    </span>
                  </div>

                  <div className="mt-3 flex justify-between">
                    <span className="text-gray-600">
                      Delivery
                    </span>

                    <span className="font-semibold">
                      ৳{order.deliveryCharge}
                    </span>
                  </div>

                  <div className="my-5 border-t" />

                  <div className="flex justify-between">
                    <span className="text-lg font-bold">
                      Grand Total
                    </span>

                    <span className="text-xl font-bold text-green-600">
                      ৳{order.grandTotal}
                    </span>
                  </div>
                </div>

              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
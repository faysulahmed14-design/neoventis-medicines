"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

type Order = {
  orderId: string;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
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
    const savedOrders = localStorage.getItem("orders");

    if (savedOrders) {
      const parsedOrders: Order[] =
        JSON.parse(savedOrders);

      setOrders([...parsedOrders].reverse());
    }

    const savedProfile =
      localStorage.getItem("customerProfile");

    if (savedProfile) {
      const profile = JSON.parse(savedProfile);

      setName(profile.name || "");
      setPhone(profile.phone || "");
      setAddress(profile.address || "");
    }
  }, []);

  const saveProfile = () => {
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!phone.trim()) {
      alert("Please enter your mobile number.");
      return;
    }

    if (!address.trim()) {
      alert("Please enter your address.");
      return;
    }

    const profile = {
      name,
      phone,
      address,
    };

    localStorage.setItem(
      "customerProfile",
      JSON.stringify(profile)
    );

    alert("Profile saved successfully!");
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-7xl">

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-green-600">
              My Account
            </p>

            <h1 className="mt-2 text-4xl font-bold text-gray-900">
              Account Dashboard
            </h1>

            <p className="mt-2 text-gray-600">
              Manage your profile, address and orders.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-3">

            <div className="lg:col-span-1">
              <div className="rounded-xl border bg-white p-6 shadow-sm">

                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl">
                    👤
                  </div>

                  <div>
                    <h2 className="font-bold text-gray-900">
                      My Profile
                    </h2>

                    <p className="text-sm text-gray-500">
                      Customer Information
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    placeholder="Enter your name"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                  />
                </div>

                <div className="mt-5">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Mobile Number
                  </label>

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value)
                    }
                    placeholder="01XXXXXXXXX"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                  />
                </div>

                <div className="mt-5">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Delivery Address
                  </label>

                  <textarea
                    value={address}
                    onChange={(e) =>
                      setAddress(e.target.value)
                    }
                    placeholder="Enter your delivery address"
                    rows={4}
                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                  />
                </div>

                <button
                  onClick={saveProfile}
                  className="mt-6 w-full rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
                >
                  Save Profile
                </button>

              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="rounded-xl border bg-white p-6 shadow-sm">

                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Order History
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      View your previous orders.
                    </p>
                  </div>

                  <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                    {orders.length} Orders
                  </span>
                </div>

                {orders.length === 0 ? (
                  <div className="mt-8 rounded-lg bg-gray-50 p-8 text-center">
                    <div className="text-5xl">📦</div>

                    <h3 className="mt-4 text-lg font-semibold text-gray-900">
                      No Orders Yet
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                      Your order history will appear here.
                    </p>

                    <a
                      href="/products"
                      className="mt-5 inline-block rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
                    >
                      Shop Medicines
                    </a>
                  </div>
                ) : (
                  <div className="mt-6 space-y-4">

                    {orders.map((order) => (
                      <div
                        key={order.orderId}
                        className="rounded-lg border p-5"
                      >
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                          <div>
                            <p className="text-sm text-gray-500">
                              Order ID
                            </p>

                            <h3 className="mt-1 font-bold text-gray-900">
                              {order.orderId}
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                              {new Date(
                                order.createdAt
                              ).toLocaleString()}
                            </p>
                          </div>

                          <div className="text-left md:text-right">
                            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                              {order.status}
                            </span>

                            <p className="mt-2 text-lg font-bold text-green-600">
                              ৳{order.grandTotal}
                            </p>
                          </div>

                        </div>

                        <div className="mt-4 border-t pt-4">
                          <a
                            href="/tracking"
                            className="text-sm font-semibold text-green-600 hover:text-green-700"
                          >
                            Track this order →
                          </a>
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
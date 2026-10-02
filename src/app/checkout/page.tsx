"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  useEffect(() => {
    const saved = localStorage.getItem("neoventis_shipping_info");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCustomer({
          name: parsed.fullName || "",
          phone: parsed.phone || "",
          address: parsed.address || "",
        });
      } catch (e) {
        console.error("Failed to load shipping info", e);
      }
    }
  }, []);

  const totalAmount = (cart || []).reduce(
    (sum: number, item: any) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.name || !customer.phone || !customer.address) {
      alert("Please fill in all delivery details");
      return;
    }

    const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      id: orderId,
      customer,
      items: cart,
      totalAmount,
      paymentMethod,
      createdAt: new Date().toISOString(),
      status: "Processing",
    };

    const existingOrders = JSON.parse(
      localStorage.getItem("neoventis_orders") || "[]"
    );
    localStorage.setItem(
      "neoventis_orders",
      JSON.stringify([newOrder, ...existingOrders])
    );

    clearCart();
    router.push(`/order-confirmation?orderId=${orderId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shipping details */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Delivery Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                placeholder="Your full name"
                style={{ color: "#111827", backgroundColor: "#ffffff" }}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-base !text-gray-900 placeholder:text-gray-400 bg-white font-medium focus:border-emerald-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={customer.phone}
                onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                placeholder="01XXXXXXXXX"
                style={{ color: "#111827", backgroundColor: "#ffffff" }}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-base !text-gray-900 placeholder:text-gray-400 bg-white font-medium focus:border-emerald-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Delivery Address
              </label>
              <textarea
                rows={3}
                value={customer.address}
                onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                placeholder="House, Road, Area, City"
                style={{ color: "#111827", backgroundColor: "#ffffff" }}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-base !text-gray-900 placeholder:text-gray-400 bg-white font-medium focus:border-emerald-500 outline-none"
                required
              />
            </div>

            <div className="pt-2">
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Payment Option
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 border rounded-xl border-gray-200 cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="text-emerald-600"
                  />
                  <span className="text-sm font-semibold text-gray-900">
                    Cash on Delivery
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={(cart || []).length === 0}
              className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 text-white font-bold py-3.5 rounded-xl transition shadow-sm cursor-pointer"
            >
              Confirm Order (৳{totalAmount})
            </button>
          </form>
        </div>

        {/* Order summary */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm h-fit">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
          <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto pr-1">
            {(cart || []).map((item: any, index: number) => {
              const itemKey = item.id || item.productId || item._id || index;
              const itemName = item.name || item.title || "Medicine Item";
              const itemPrice = Number(item.price) || 0;
              const itemQuantity = Number(item.quantity) || 1;

              return (
                <div key={itemKey} className="py-3 flex justify-between items-center text-sm">
                  <div>
                    <p className="font-semibold text-gray-900">{itemName}</p>
                    <p className="text-xs text-gray-500">Qty: {itemQuantity}</p>
                  </div>
                  <span className="font-bold text-gray-900">
                    ৳{itemPrice * itemQuantity}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="border-t border-gray-100 pt-4 mt-4 flex justify-between items-center">
            <span className="font-bold text-base text-gray-900">Total Payable</span>
            <span className="font-black text-xl text-emerald-600">৳{totalAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
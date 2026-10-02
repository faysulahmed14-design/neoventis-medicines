"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

type OrderItem = {
  name: string;
  category: string;
  price: number;
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
    try {
      const saved = localStorage.getItem("latestOrder");
      if (saved) {
        setOrder(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load invoice order:", e);
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!order) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 px-6 py-16 text-center">
          <div className="mx-auto max-w-md rounded-2xl border bg-white p-8 shadow-sm">
            <div className="text-5xl">📄</div>
            <h1 className="mt-4 text-2xl font-bold text-gray-900">
              No Recent Invoice Found
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              It seems no order was placed in this session.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-block rounded-lg bg-green-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-green-700 transition"
            >
              Start Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      {/* প্রিন্ট করার সময় হেডার লুকিয়ে রাখা */}
      <div className="print:hidden">
        <Header />
      </div>

      <main className="min-h-screen bg-gray-100 px-4 py-8 print:bg-white print:p-0">
        <div className="mx-auto max-w-3xl">
          {/* অ্যাকশন বাটন বার (প্রিন্টের সময় দেখাবে না) */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 print:hidden">
            <Link
              href="/tracking"
              className="inline-flex items-center text-sm font-semibold text-green-700 hover:underline"
            >
              ← Track This Order Live
            </Link>

            <div className="flex gap-3">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700 transition"
              >
                <span>🖨️</span> Print / Save Invoice
              </button>
              <Link
                href="/products"
                className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
              >
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* মূল ইনভয়েস পেপার */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-md print:border-none print:shadow-none print:p-4">
            {/* ইনভয়েস হেডার */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-6 gap-4">
              <div>
                <span className="text-2xl font-black tracking-tight text-green-700">
                  MediCare Pharmacy
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  Licensed Online Healthcare Provider
                </p>
                <p className="text-xs text-gray-500">Dhaka, Bangladesh</p>
              </div>

              <div className="sm:text-right">
                <span className="inline-block rounded-md bg-green-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-green-800">
                  Official Invoice
                </span>
                <h2 className="mt-2 text-lg font-bold text-gray-900">
                  {order.orderId}
                </h2>
                <p className="text-xs text-gray-500">
                  Date: {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* বিলিং ও ডেলিভারি তথ্য */}
            <div className="mt-6 grid grid-cols-2 gap-6 border-b pb-6 text-sm">
              <div>
                <h3 className="font-bold text-gray-800 uppercase text-xs tracking-wider">
                  Billed To:
                </h3>
                <p className="mt-2 font-bold text-gray-900">
                  {order.customer?.name}
                </p>
                <p className="text-gray-600 text-xs mt-1">
                  📞 {order.customer?.phone}
                </p>
                <p className="text-gray-600 text-xs mt-1 whitespace-pre-line">
                  📍 {order.customer?.address}
                </p>
              </div>

              <div className="text-right">
                <h3 className="font-bold text-gray-800 uppercase text-xs tracking-wider">
                  Order Details:
                </h3>
                <p className="mt-2 text-xs text-gray-600">
                  <span className="font-medium text-gray-900">Payment:</span>{" "}
                  {order.paymentMethod}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  <span className="font-medium text-gray-900">Status:</span>{" "}
                  <span className="font-semibold text-green-700">
                    {order.status}
                  </span>
                </p>
              </div>
            </div>

            {/* আইটেম টেবিল */}
            <div className="mt-6">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b bg-gray-50 text-xs uppercase text-gray-500">
                    <th className="py-2.5 px-3">Item Description</th>
                    <th className="py-2.5 px-3 text-center">Qty</th>
                    <th className="py-2.5 px-3 text-right">Unit Price</th>
                    <th className="py-2.5 px-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-gray-800">
                  {order.items?.map((item) => (
                    <tr key={item.name}>
                      <td className="py-3 px-3">
                        <p className="font-bold text-gray-900">{item.name}</p>
                        <span className="text-xs text-gray-500 uppercase">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center font-medium">
                        {item.quantity}
                      </td>
                      <td className="py-3 px-3 text-right text-gray-600">
                        ৳{item.price}
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-gray-900">
                        ৳{item.price * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* সামারি ও টোটাল */}
            <div className="mt-6 border-t pt-4">
              <div className="flex justify-end">
                <div className="w-64 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span className="font-medium text-gray-900">
                      ৳{order.subtotal}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Charge:</span>
                    <span className="font-medium text-gray-900">
                      ৳{order.deliveryCharge}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2 text-base font-bold text-gray-900">
                    <span>Grand Total:</span>
                    <span className="text-green-700">৳{order.grandTotal}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ইনভয়েস ফুটার নোট */}
            <div className="mt-10 border-t pt-6 text-center text-xs text-gray-400">
              <p>Thank you for choosing MediCare Pharmacy for your healthcare needs.</p>
              <p className="mt-1">
                For questions regarding this delivery, call +880 1700-000000 or email support@medicare.bd
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* প্রিন্ট করার সময় ফুটার লুকিয়ে রাখা */}
      <div className="print:hidden">
        <Footer />
      </div>
    </>
  );
}
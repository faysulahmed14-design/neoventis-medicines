"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type OrderItem = {
  name: string;
  category?: string;
  price: number;
  quantity: number;
};

type Order = {
  orderId: string;
  id?: string;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  items: OrderItem[];
  totalAmount?: number;
  subtotal?: number;
  deliveryCharge?: number;
  grandTotal?: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
};

function InvoiceContent() {
  const searchParams = useSearchParams();
  const queryOrderId = searchParams.get("orderId");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      // 1. Try fetching from cloud database API if orderId in URL
      if (queryOrderId) {
        try {
          const res = await fetch(`/api/orders?orderId=${encodeURIComponent(queryOrderId)}`);
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            setOrder(json.data[0]);
            setLoading(false);
            return;
          }
        } catch (err) {
          console.warn("Could not fetch order from API:", err);
        }
      }

      // 2. Fallback to localStorage latestOrder
      try {
        const saved = localStorage.getItem("latestOrder");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (!queryOrderId || parsed.orderId === queryOrderId || parsed.id === queryOrderId) {
            setOrder(parsed);
          }
        }
      } catch (e) {
        console.error("Failed to load invoice order from storage:", e);
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [queryOrderId]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 text-center">
        <div className="space-y-3">
          <div className="text-3xl animate-spin">⏳</div>
          <p className="text-sm font-semibold text-gray-600">Generating Official Invoice...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 px-6 py-16 text-center">
        <div className="mx-auto max-w-md rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="text-5xl">📄</div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            No Recent Invoice Found
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            It seems no order was placed in this session.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-block rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  const calculatedSubtotal =
    order.subtotal ||
    (order.items || []).reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0);
  const deliveryCharge = order.deliveryCharge !== undefined ? order.deliveryCharge : 60;
  const grandTotal = order.totalAmount || order.grandTotal || calculatedSubtotal + deliveryCharge;

  return (
    <div className="min-h-screen bg-slate-50/70 px-4 py-8 print:bg-white print:p-0">
      <div className="mx-auto max-w-3xl">
        {/* Action Button Bar (Hidden in Print) */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 print:hidden">
          <Link
            href="/tracking"
            className="inline-flex items-center text-sm font-semibold text-emerald-700 hover:underline"
          >
            ← Track This Order Live
          </Link>

          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition cursor-pointer"
            >
              <span>🖨️</span> Print / Save Invoice
            </button>
            <Link
              href="/products"
              className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Invoice Paper */}
        <div className="rounded-3xl border border-gray-200/80 bg-white p-8 shadow-sm print:border-none print:shadow-none print:p-4">
          {/* Invoice Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-6 gap-4">
            <div>
              <span className="text-2xl font-black tracking-tight text-emerald-600">
                Neoventis <span className="text-gray-900">Medicine</span>
              </span>
              <p className="text-xs text-gray-500 mt-1">
                Licensed Online Healthcare & Medicine Delivery
              </p>
              <p className="text-xs text-gray-500">Dhaka, Bangladesh</p>
            </div>

            <div className="sm:text-right">
              <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
                Official Invoice
              </span>
              <h2 className="mt-2 text-lg font-black text-gray-900">
                {order.orderId || order.id}
              </h2>
              <p className="text-xs text-gray-500">
                Date: {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Billing & Delivery Details */}
          <div className="mt-6 grid grid-cols-2 gap-6 border-b border-gray-100 pb-6 text-sm">
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
                <span className="uppercase">{order.paymentMethod || "Cash on Delivery"}</span>
              </p>
              <p className="text-xs text-gray-600 mt-1">
                <span className="font-medium text-gray-900">Status:</span>{" "}
                <span className="font-semibold text-emerald-700">
                  {order.status || "Order Placed"}
                </span>
              </p>
            </div>
          </div>

          {/* Items Table */}
          <div className="mt-6">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/70 text-xs uppercase text-gray-500 rounded-xl">
                  <th className="py-2.5 px-3">Item Description</th>
                  <th className="py-2.5 px-3 text-center">Qty</th>
                  <th className="py-2.5 px-3 text-right">Unit Price</th>
                  <th className="py-2.5 px-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-800">
                {order.items?.map((item, idx) => (
                  <tr key={item.name + idx}>
                    <td className="py-3 px-3">
                      <p className="font-bold text-gray-900">{item.name}</p>
                      <span className="text-[11px] text-gray-500 uppercase font-medium">
                        {item.category || "Medicine"}
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

          {/* Summary & Total */}
          <div className="mt-6 border-t border-gray-100 pt-4">
            <div className="flex justify-end">
              <div className="w-64 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600 text-xs">
                  <span>Subtotal:</span>
                  <span className="font-medium text-gray-900">
                    ৳{calculatedSubtotal}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600 text-xs">
                  <span>Delivery Charge:</span>
                  <span className="font-medium text-gray-900">
                    ৳{deliveryCharge}
                  </span>
                </div>
                <div className="flex justify-between border-t border-gray-100 pt-2 text-base font-black text-gray-900">
                  <span>Grand Total:</span>
                  <span className="text-emerald-700">৳{grandTotal}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Footer Note */}
          <div className="mt-10 border-t border-gray-100 pt-6 text-center text-xs text-gray-400">
            <p>Thank you for choosing Neoventis Medicine for your healthcare needs.</p>
            <p className="mt-1">
              For questions regarding this delivery, call +880 1758-940277 or email support@neoventis.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <p className="text-sm font-semibold text-gray-500">Loading invoice...</p>
      </div>
    }>
      <InvoiceContent />
    </Suspense>
  );
}
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-gray-100 text-center space-y-6 shadow-sm">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl">
          🛍️
        </div>

        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Direct Order Enabled
          </h1>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            As a healthcare service, customers do not need to create an account or log in to order medicines. You can order directly!
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <Link
            href="/products"
            className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold text-sm shadow-md shadow-emerald-200 transition flex items-center justify-center gap-2"
          >
            <span>💊</span>
            <span>Browse Medicines & Order</span>
          </Link>

          <Link
            href="/tracking"
            className="w-full py-3 px-4 rounded-2xl border border-gray-200 bg-gray-50 hover:bg-white text-gray-700 font-bold text-sm transition flex items-center justify-center gap-2"
          >
            <span>📦</span>
            <span>Track Existing Order</span>
          </Link>

          <div className="pt-4 border-t border-gray-100">
            <Link
              href="/admin/login"
              className="text-xs font-semibold text-slate-500 hover:text-emerald-600 transition flex items-center justify-center gap-1.5"
            >
              <span>🛡️</span>
              <span>Pharmacy Admin Portal Login →</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

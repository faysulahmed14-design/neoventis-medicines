"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function CustomerLoginPage() {
  const router = useRouter();
  const { customer, loginCustomer, logoutCustomer } = useAuth();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form state
  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regAddress, setRegAddress] = useState("");
  const [regPassword, setRegPassword] = useState("");

  // If already logged in
  if (customer) {
    return (
      <div className="min-h-screen bg-slate-50/70 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-gray-100 shadow-md text-center space-y-5">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-3xl mx-auto">
            👤
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              Logged In
            </span>
            <h2 className="text-2xl font-bold text-gray-900 mt-2">
              Welcome, {customer.name}!
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Phone: {customer.phone} • Email: {customer.email || "N/A"}
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <Link
              href="/account"
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition shadow-sm"
            >
              Go to My Account & Orders
            </Link>
            <Link
              href="/products"
              className="w-full py-3 rounded-2xl border border-gray-200 bg-gray-50 hover:bg-white text-gray-700 font-bold text-sm transition"
            >
              Browse Medicines
            </Link>
            <button
              type="button"
              onClick={logoutCustomer}
              className="text-xs text-red-600 hover:underline pt-2 font-semibold"
            >
              Log Out Customer
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!loginIdentifier.trim() || !loginPassword.trim()) {
      setError("Please enter your Phone number/Email and Password.");
      return;
    }

    // Attempt login
    loginCustomer({
      name: loginIdentifier.includes("@") ? loginIdentifier.split("@")[0] : "Customer",
      phone: loginIdentifier.includes("@") ? "01700-000000" : loginIdentifier,
      email: loginIdentifier.includes("@") ? loginIdentifier : "",
      address: "Dhaka, Bangladesh",
    });

    setSuccess("Logged in successfully! Redirecting...");
    setTimeout(() => {
      router.push("/account");
    }, 1000);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!regName.trim() || !regPhone.trim() || !regPassword.trim()) {
      setError("Please fill in Name, Mobile number, and Password.");
      return;
    }

    loginCustomer({
      name: regName.trim(),
      phone: regPhone.trim(),
      email: regEmail.trim(),
      address: regAddress.trim() || "Dhaka, Bangladesh",
    });

    setSuccess("Account created successfully! Redirecting...");
    setTimeout(() => {
      router.push("/account");
    }, 1000);
  };

  const fillDemoCustomer = () => {
    loginCustomer({
      name: "Tanzil Ahmed",
      phone: "01758-940277",
      email: "tanzil@gmail.com",
      address: "House 12, Road 4, Dhanmondi, Dhaka",
    });
    setSuccess("Logged in as Demo Customer! Redirecting...");
    setTimeout(() => {
      router.push("/account");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto space-y-6">
        
        {/* Branding header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-black text-emerald-600">
              Neoventis <span className="text-gray-900">Medicine</span>
            </span>
          </Link>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900">
            Customer Portal
          </h1>
          <p className="text-xs text-gray-500">
            Sign in to track orders, manage delivery addresses, and re-order medicines quickly.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="bg-gray-100 p-1.5 rounded-2xl flex gap-1 shadow-inner">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setError(null);
            }}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition cursor-pointer ${
              mode === "login"
                ? "bg-white text-emerald-700 shadow-sm"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("register");
              setError(null);
            }}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition cursor-pointer ${
              mode === "register"
                ? "bg-white text-emerald-700 shadow-sm"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Error / Success messages */}
        {error && (
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
            ⚠️ {error}
          </div>
        )}
        {success && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold animate-pulse">
            ✓ {success}
          </div>
        )}

        {/* Main Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm">
          {mode === "login" ? (
            /* Login Form */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Mobile Number or Email
                </label>
                <input
                  type="text"
                  placeholder="e.g. 01700-000000 or you@mail.com"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-gray-700">
                    Password
                  </label>
                  <span className="text-[11px] text-emerald-600 hover:underline cursor-pointer">
                    Forgot?
                  </span>
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold text-sm shadow-md shadow-emerald-200 transition cursor-pointer"
              >
                Sign In to Account
              </button>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Delivery Address
                </label>
                <input
                  type="text"
                  placeholder="House/Road/Area, City"
                  value={regAddress}
                  onChange={(e) => setRegAddress(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  placeholder="Create a password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold text-sm shadow-md shadow-emerald-200 transition cursor-pointer mt-2"
              >
                Create Customer Account
              </button>
            </form>
          )}

          {/* Quick Demo Login Option */}
          <div className="mt-6 pt-5 border-t border-gray-100 text-center">
            <button
              type="button"
              onClick={fillDemoCustomer}
              className="w-full py-2.5 rounded-xl border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100/60 text-emerald-800 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>⚡</span> Quick Sign-In as Demo Customer
            </button>
          </div>
        </div>

        {/* Admin Login Portal Link */}
        <div className="text-center pt-2">
          <p className="text-xs text-gray-400">
            Are you a pharmacy administrator?{" "}
            <Link
              href="/admin/login"
              className="font-bold text-emerald-700 hover:underline"
            >
              Go to Admin Login →
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

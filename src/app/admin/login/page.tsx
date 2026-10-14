"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

export default function AdminLoginPage() {
  const router = useRouter();
  const { admin, loginAdmin, logoutAdmin } = useAuth();

  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // If already logged in
  if (admin) {
    return (
      <div className="min-h-screen bg-slate-900 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl text-center space-y-5 text-white">
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-3xl mx-auto shadow-inner">
            🛡️
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              Admin Session Active
            </span>
            <h2 className="text-2xl font-black text-white mt-3">
              Welcome, {admin.name}!
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Signed in as: <span className="text-slate-200 font-mono">{admin.email}</span>
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <Link
              href="/admin/dashboard"
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-900/50"
            >
              Go to Admin Dashboard →
            </Link>
            <Link
              href="/admin/orders"
              className="w-full py-3 rounded-2xl bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-sm transition"
            >
              Manage Orders & Status
            </Link>
            <Link
              href="/admin/products"
              className="w-full py-3 rounded-2xl bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-sm transition"
            >
              Manage Inventory
            </Link>
            <button
              type="button"
              onClick={logoutAdmin}
              className="text-xs text-rose-400 hover:text-rose-300 font-semibold pt-2 transition cursor-pointer"
            >
              Sign Out of Admin Portal
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Accept default credentials or demo login
    const validEmail = adminEmail.trim().toLowerCase();
    const validPass = adminPassword.trim();

    setTimeout(() => {
      if (
        (validEmail === "admin@neoventis.com" || validEmail === "admin") &&
        (validPass === "admin" || validPass === "admin123" || validPass === "123456")
      ) {
        loginAdmin({
          email: "admin@neoventis.com",
          name: "Chief Pharmacist / Admin",
          role: "admin",
        });
        setSuccess("Access Granted! Loading Admin Console...");
        setTimeout(() => {
          router.push("/admin/dashboard");
        }, 800);
      } else {
        setError("Invalid Admin credentials. Use default: admin@neoventis.com / admin");
        setLoading(false);
      }
    }, 400);
  };

  const fillDemoAdmin = () => {
    setAdminEmail("admin@neoventis.com");
    setAdminPassword("admin");
    loginAdmin({
      email: "admin@neoventis.com",
      name: "Super Admin",
      role: "admin",
    });
    setSuccess("Quick Demo Access Granted! Redirecting...");
    setTimeout(() => {
      router.push("/admin/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto space-y-6">
        
        {/* Top Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-3xl mb-1 text-emerald-400">
            🛡️
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Pharmacy Admin Portal
          </h1>
          <p className="text-xs text-slate-400">
            Authorized management console for Neoventis Medicine.
          </p>
        </div>

        {/* Error / Success alerts */}
        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-950/50 border border-rose-800 text-rose-300 text-xs font-semibold">
            ⚠️ {error}
          </div>
        )}
        {success && (
          <div className="p-3.5 rounded-2xl bg-emerald-950/50 border border-emerald-800 text-emerald-300 text-xs font-semibold animate-pulse">
            ✓ {success}
          </div>
        )}

        {/* Login Card */}
        <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-5 text-slate-200">
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Admin ID / Email
              </label>
              <input
                type="text"
                placeholder="admin@neoventis.com"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-700 bg-slate-800/80 text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Security Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-700 bg-slate-800/80 text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-bold text-sm shadow-lg shadow-emerald-900/40 transition flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>🔐</span>
              {loading ? "Authenticating..." : "Authorize & Sign In"}
            </button>
          </form>

          {/* Preset Credentials Box */}
          <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-3.5 space-y-1.5 text-xs text-slate-300">
            <div className="flex items-center justify-between text-slate-400 text-[11px] font-bold uppercase tracking-wider">
              <span>Demo Credentials</span>
              <span className="text-emerald-400">Ready to test</span>
            </div>
            <div className="font-mono text-[11px] text-slate-300">
              Email: <span className="text-white font-bold">admin@neoventis.com</span>
            </div>
            <div className="font-mono text-[11px] text-slate-300">
              Pass: <span className="text-white font-bold">admin</span>
            </div>
            
            <button
              type="button"
              onClick={fillDemoAdmin}
              className="w-full mt-2 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-emerald-400 font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>⚡</span> 1-Click Instant Admin Sign-In
            </button>
          </div>
        </div>

        {/* Back to Customer Site */}
        <div className="text-center pt-2">
          <Link
            href="/"
            className="text-xs text-slate-500 hover:text-slate-300 transition font-medium"
          >
            ← Back to Customer Pharmacy Store
          </Link>
        </div>

      </div>
    </div>
  );
}

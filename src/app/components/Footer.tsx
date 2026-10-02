export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* ব্র্যান্ড ইনফো */}
          <div>
            <h3 className="text-xl font-bold text-white">
              Neoventis Medicines
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Your trusted partner for authentic medicines and healthcare products.
            </p>
          </div>

          {/* কন্টাক্ট ইনফো */}
          <div className="text-sm text-gray-400 space-y-1">
            <p>📍 Dhaka, Bangladesh</p>
            <p>📞 +880 1758-940277 | ✉️ support@neoventis.bd</p>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Neoventis Medicines. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
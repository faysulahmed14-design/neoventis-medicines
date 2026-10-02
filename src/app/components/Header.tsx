import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-5">
        <span className="inline-block py-1 px-3 rounded-full text-xs font-semibold tracking-wide bg-emerald-100 text-emerald-800">
          Trusted Online Pharmacy
        </span>

        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight">
          Your Trusted Healthcare Partner at Home
        </h1>

        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          Order genuine prescription medicines and healthcare products with fast home delivery across Bangladesh.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/products"
            className="rounded-xl bg-emerald-600 px-6 py-3 text-sm sm:text-base font-bold text-white shadow-sm hover:bg-emerald-700 transition"
          >
            Shop Medicines
          </Link>
          <Link
            href="/account"
            className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm sm:text-base font-bold text-gray-800 shadow-sm hover:bg-gray-50 transition"
          >
            My Account
          </Link>
        </div>
      </div>

      {/* Featured Section Placeholder */}
      <div className="mt-16 w-full max-w-5xl">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Featured Medicines</h2>
            <p className="text-xs text-gray-500">Commonly requested daily medicines and healthcare essentials.</p>
          </div>
          <Link href="/products" className="text-xs font-semibold text-emerald-600 hover:underline">
            View all medicines →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div className="text-3xl mb-2">💊</div>
            <h3 className="font-bold text-gray-900">Prescription Drugs</h3>
            <p className="text-xs text-gray-500 mt-1">Verified quality & authentic batches</p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div className="text-3xl mb-2">🩹</div>
            <h3 className="font-bold text-gray-900">First Aid & Care</h3>
            <p className="text-xs text-gray-500 mt-1">Bandages, antiseptics, & daily gear</p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-bold text-gray-900">Rapid Home Delivery</h3>
            <p className="text-xs text-gray-500 mt-1">Safe and fast delivery directly to your door</p>
          </div>
        </div>
      </div>
    </div>
  );
}
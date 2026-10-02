import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-black text-emerald-600">
              Neoventis <span className="text-gray-900">Medicine</span>
            </h3>
            <p className="mt-2 text-sm text-gray-500 max-w-md">
              Your trusted partner in healthcare. Providing genuine medicines, wellness essentials, and rapid home delivery.
            </p>
            <p className="mt-2 text-sm font-semibold text-gray-700">
              Emergency Contact: +880 1758-940277
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li><Link href="/" className="hover:text-emerald-600">Home</Link></li>
              <li><Link href="/products" className="hover:text-emerald-600">All Medicines</Link></li>
              <li><Link href="/tracking" className="hover:text-emerald-600">Order Tracking</Link></li>
              <li><Link href="/account" className="hover:text-emerald-600">My Account</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Services</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>Prescription Refill</li>
              <li>24/7 Delivery</li>
              <li>Direct Consultations</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Neoventis Medicine. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Built with modern healthcare standards.</p>
        </div>
      </div>
    </footer>
  );
}
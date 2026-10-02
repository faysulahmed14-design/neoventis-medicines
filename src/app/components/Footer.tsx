export default function Footer() {
  return (
    <footer className="bg-gray-900 px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h2 className="text-xl font-bold">
              Medical E-commerce
            </h2>

            <p className="mt-3 text-sm text-gray-400">
              Your trusted online medicine store for quality
              healthcare products.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Quick Links</h3>

            <div className="mt-3 space-y-2 text-sm text-gray-400">
              <p>Home</p>
              <p>Medicines</p>
              <p>Cart</p>
              <p>My Account</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Customer Support</h3>

            <p className="mt-3 text-sm text-gray-400">
              Need help? Contact our support team.
            </p>

            <p className="mt-2 text-sm text-gray-400">
              Phone: +880 1XXX-XXXXXX
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          © 2026 Medical E-commerce. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
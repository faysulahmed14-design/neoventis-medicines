export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a
          href="/"
          className="text-2xl font-bold text-green-700"
        >
          Medical E-commerce
        </a>

        <nav className="flex items-center gap-6">
          <a
            href="/"
            className="text-gray-700 hover:text-green-700"
          >
            Home
          </a>

          <a
            href="/products"
            className="text-gray-700 hover:text-green-700"
          >
            Medicines
          </a>

          <a
            href="/wishlist"
            className="text-gray-700 hover:text-green-700"
          >
            Wishlist
          </a>

          <a
            href="/cart"
            className="text-gray-700 hover:text-green-700"
          >
            Cart
          </a>

          <a
            href="/account"
            className="text-gray-700 hover:text-green-700"
          >
            My Account
          </a>
        </nav>
      </div>
    </header>
  );
}
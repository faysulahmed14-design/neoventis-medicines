"use client";

import { useEffect, useState } from "react";

type Product = {
  name: string;
  category: string;
  price: number;
  stock: number;
};

type CartItem = {
  name: string;
  category: string;
  price: number;
  stock: number;
  quantity: number;
};

const fallbackProducts: Product[] = [
  { name: "Cap. Otubic", category: "Medicine", price: 100, stock: 50 },
  { name: "Cap. Otucid", category: "Medicine", price: 100, stock: 50 },
  { name: "Tab. Utamin", category: "Medicine", price: 100, stock: 50 },
  { name: "Cap. Eberry", category: "Medicine", price: 100, stock: 50 },
  { name: "Cap. Xymotac", category: "Medicine", price: 100, stock: 50 },
  { name: "Cap. Fattycid", category: "Medicine", price: 100, stock: 50 },
  { name: "Tab. Capium", category: "Medicine", price: 100, stock: 50 },
  { name: "Cap. Aptigut", category: "Medicine", price: 100, stock: 50 },
  { name: "Cap. Infinity F", category: "Medicine", price: 100, stock: 50 },
  { name: "Tab. Infinity F", category: "Medicine", price: 100, stock: 50 },
  { name: "Tab. Gcosam", category: "Medicine", price: 100, stock: 50 },
  { name: "Cap. Addlife", category: "Medicine", price: 100, stock: 50 },
  { name: "Cap. Simogut", category: "Medicine", price: 100, stock: 50 },
  { name: "Tab. Kedopa", category: "Medicine", price: 100, stock: 50 },
  { name: "Cap. Assure", category: "Medicine", price: 100, stock: 50 },
  { name: "Tab. Lipocid SR", category: "Medicine", price: 100, stock: 50 },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    // =========================
    // LOAD PRODUCTS
    // =========================

    const savedProducts =
      localStorage.getItem("adminProducts");

    if (savedProducts) {
      try {
        const adminProducts: Product[] =
          JSON.parse(savedProducts);

        setProducts(adminProducts);
      } catch (error) {
        console.error(
          "Failed to load admin products:",
          error
        );

        setProducts(fallbackProducts);
      }
    } else {
      localStorage.setItem(
        "adminProducts",
        JSON.stringify(fallbackProducts)
      );

      setProducts(fallbackProducts);
    }

    // =========================
    // LOAD WISHLIST
    // =========================

    const savedWishlist =
      localStorage.getItem("wishlist");

    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch {
        setWishlist([]);
      }
    }

    // =========================
    // LOAD & MIGRATE CART
    // =========================

    const savedCart =
      localStorage.getItem("cart");

    if (savedCart) {
      try {
        const oldCart = JSON.parse(savedCart);

        const migratedCart: CartItem[] =
          oldCart.map((item: any) => {
            const product = (
              savedProducts
                ? JSON.parse(savedProducts)
                : fallbackProducts
            ).find(
              (p: Product) =>
                p.name === item.name
            );

            return {
              name: item.name,
              category:
                product?.category ??
                item.category ??
                "Medicine",
              price:
                product?.price ??
                item.price ??
                0,
              stock:
                product?.stock ??
                0,

              // Old cart system used stock as quantity.
              // We reset old quantity to 1.
              quantity:
                typeof item.quantity === "number"
                  ? item.quantity
                  : 1,
            };
          });

        setCart(migratedCart);

        localStorage.setItem(
          "cart",
          JSON.stringify(migratedCart)
        );
      } catch (error) {
        console.error(
          "Failed to load cart:",
          error
        );

        setCart([]);
      }
    }
  }, []);

  // =========================
  // SEARCH
  // =========================

  const filteredProducts = products.filter(
    (product) =>
      product.name
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
  );

  // =========================
  // WISHLIST
  // =========================

  const toggleWishlist = (
    productName: string
  ) => {
    let updatedWishlist: string[];

    if (wishlist.includes(productName)) {
      updatedWishlist =
        wishlist.filter(
          (name) =>
            name !== productName
        );
    } else {
      updatedWishlist = [
        ...wishlist,
        productName,
      ];
    }

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );
  };

  // =========================
  // ADD TO CART
  // =========================

  const addToCart = (
    product: Product
  ) => {
    if (product.stock <= 0) {
      alert(
        `${product.name} is currently out of stock.`
      );

      return;
    }

    const existingItem =
      cart.find(
        (item) =>
          item.name === product.name
      );

    let updatedCart: CartItem[];

    if (existingItem) {
      if (
        existingItem.quantity >=
        product.stock
      ) {
        alert(
          "Maximum available stock reached!"
        );

        return;
      }

      updatedCart = cart.map(
        (item) =>
          item.name === product.name
            ? {
                ...item,
                price: product.price,
                stock: product.stock,
                quantity:
                  item.quantity + 1,
              }
            : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          name: product.name,
          category: product.category,
          price: product.price,
          stock: product.stock,
          quantity: 1,
        },
      ];
    }

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    alert(
      `${product.name} added to cart!`
    );
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mb-8">

          <p className="text-sm font-semibold text-green-600">
            Online Pharmacy
          </p>

          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            Medicines
          </h1>

          <p className="mt-2 text-gray-600">
            Browse and order your medicines.
          </p>

        </div>

        {/* SEARCH */}

        <div className="mb-8">

          <input
            type="text"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
            placeholder="Search medicines..."
            className="w-full rounded-xl border border-gray-300 bg-white px-5 py-4 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
          />

        </div>

        {/* RESULT COUNT */}

        <div className="mb-6">

          <p className="text-sm text-gray-500">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1
              ? "medicine"
              : "medicines"}{" "}
            found
          </p>

        </div>

        {/* PRODUCTS */}

        {filteredProducts.length === 0 ? (

          <div className="rounded-xl border bg-white py-16 text-center shadow-sm">

            <div className="text-5xl">
              🔍
            </div>

            <h2 className="mt-4 text-xl font-bold text-gray-900">
              No medicines found
            </h2>

            <p className="mt-2 text-gray-500">
              Try searching with another medicine name.
            </p>

          </div>

        ) : (

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredProducts.map(
              (product) => {

                const isWishlisted =
                  wishlist.includes(
                    product.name
                  );

                const cartItem =
                  cart.find(
                    (item) =>
                      item.name ===
                      product.name
                  );

                const cartQuantity =
                  cartItem?.quantity ?? 0;

                return (
                  <div
                    key={product.name}
                    className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >

                    {/* IMAGE */}

                    <div className="flex h-48 items-center justify-center bg-gray-100">

                      <div className="text-7xl">
                        💊
                      </div>

                    </div>

                    {/* INFO */}

                    <div className="p-5">

                      <div className="flex items-start justify-between gap-3">

                        <div>

                          <p className="text-xs font-semibold uppercase tracking-wide text-green-600">
                            {product.category}
                          </p>

                          <h2 className="mt-1 text-lg font-bold text-gray-900">
                            {product.name}
                          </h2>

                        </div>

                        {/* WISHLIST */}

                        <button
                          onClick={() =>
                            toggleWishlist(
                              product.name
                            )
                          }
                          className="text-2xl transition hover:scale-110"
                          title={
                            isWishlisted
                              ? "Remove from wishlist"
                              : "Add to wishlist"
                          }
                        >
                          {isWishlisted
                            ? "❤️"
                            : "🤍"}
                        </button>

                      </div>

                      {/* PRICE + STOCK */}

                      <div className="mt-4 flex items-center justify-between">

                        <p className="text-xl font-bold text-green-600">
                          ৳{product.price}
                        </p>

                        <p className="text-sm text-gray-500">
                          Stock:{" "}
                          {product.stock}
                        </p>

                      </div>

                      {/* STATUS */}

                      <div className="mt-3">

                        {product.stock === 0 ? (

                          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                            Out of Stock
                          </span>

                        ) : product.stock <= 10 ? (

                          <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                            Low Stock
                          </span>

                        ) : (

                          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                            In Stock
                          </span>

                        )}

                      </div>

                      {/* CART QUANTITY */}

                      {cartQuantity > 0 && (
                        <p className="mt-3 text-sm font-medium text-gray-600">
                          In cart:{" "}
                          {cartQuantity}
                        </p>
                      )}

                      {/* ADD TO CART */}

                      <button
                        onClick={() =>
                          addToCart(
                            product
                          )
                        }
                        disabled={
                          product.stock === 0 ||
                          cartQuantity >=
                            product.stock
                        }
                        className={`mt-4 w-full rounded-lg px-4 py-3 font-semibold text-white ${
                          product.stock === 0 ||
                          cartQuantity >=
                            product.stock
                            ? "cursor-not-allowed bg-gray-400"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        {product.stock === 0
                          ? "Out of Stock"
                          : cartQuantity >=
                              product.stock
                            ? "Stock Limit Reached"
                            : "Add to Cart"}
                      </button>

                    </div>

                  </div>
                );
              }
            )}

          </div>

        )}

      </div>
    </main>
  );
}
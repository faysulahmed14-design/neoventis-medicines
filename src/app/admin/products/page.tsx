"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useCart } from "../../context/CartContext";

export default function AdminProductsPage() {
  const { products, updateProductStock, addNewProduct } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [stockInput, setStockInput] = useState<number>(0);

  // নতুন মেডিসিন ফর্ম স্টেট
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("Tablet");
  const [newPrice, setNewPrice] = useState("");
  const [newStock, setNewStock] = useState("");

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const outOfStockCount = products.filter((p) => p.stock <= 0).length;
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= 10).length;

  const handleEditClick = (name: string, currentStock: number) => {
    setEditingProduct(name);
    setStockInput(currentStock);
  };

  const handleSaveStock = (name: string) => {
    updateProductStock(name, Number(stockInput));
    setEditingProduct(null);
  };

  const handleQuickAdd = (name: string, currentStock: number, addAmount: number) => {
    updateProductStock(name, currentStock + addAmount);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newName.trim()) {
      alert("Please enter a medicine name.");
      return;
    }
    if (!newPrice || Number(newPrice) <= 0) {
      alert("Please enter a valid price.");
      return;
    }
    if (!newStock || Number(newStock) < 0) {
      alert("Please enter an initial stock amount.");
      return;
    }

    addNewProduct({
      name: newName.trim(),
      category: newCategory,
      price: Number(newPrice),
      stock: Number(newStock),
    });

    // ফর্ম রিসেট
    setNewName("");
    setNewPrice("");
    setNewStock("");
    setShowAddForm(false);
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="mx-auto max-w-7xl">
          {/* হেডার ও অ্যাকশন */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-green-600">
                Admin Panel
              </p>
              <h1 className="mt-1 text-3xl font-extrabold text-gray-900">
                Inventory & Stock Management
              </h1>
              <p className="mt-1 text-gray-600">
                Directly monitor, add, and manage medicine stock levels across the store.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 transition"
              >
                {showAddForm ? "✕ Close Form" : "+ Add New Medicine"}
              </button>

              <Link
                href="/admin/dashboard"
                className="inline-block rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition"
              >
                ← Dashboard
              </Link>
            </div>
          </div>

          {/* নতুন মেডিসিন যোগ করার কার্ড */}
          {showAddForm && (
            <div className="mt-8 rounded-xl border border-green-200 bg-green-50/50 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">
                Add New Medicine to Catalogue
              </h2>
              <form onSubmit={handleCreateProduct} className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-700">
                    Medicine Name *
                  </label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Napa Extra 500mg"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-green-600"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-700">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-green-600"
                  >
                    <option value="Tablet">Tablet</option>
                    <option value="Capsule">Capsule</option>
                    <option value="Syrup">Syrup</option>
                    <option value="Drop">Drop</option>
                    <option value="Injection">Injection</option>
                    <option value="Healthcare">Healthcare</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-700">
                    Unit Price (৳) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="e.g. 35"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-green-600"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-700">
                    Initial Stock *
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                    placeholder="e.g. 100"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-green-600"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-green-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 transition"
                  >
                    Save Medicine
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ইনভেন্টরি পরিসংখ্যান */}
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <p className="text-xs uppercase font-semibold text-gray-500">Total Medicines</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{products.length}</p>
            </div>

            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <p className="text-xs uppercase font-semibold text-yellow-600">Low Stock (≤10)</p>
              <p className="mt-2 text-3xl font-bold text-yellow-600">{lowStockCount}</p>
            </div>

            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <p className="text-xs uppercase font-semibold text-red-600">Out of Stock</p>
              <p className="mt-2 text-3xl font-bold text-red-600">{outOfStockCount}</p>
            </div>
          </div>

          {/* সার্চ ফিল্টার */}
          <div className="mt-8 max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by medicine name or category..."
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 shadow-sm"
            />
          </div>

          {/* ইনভেন্টরি টেবিল */}
          <div className="mt-6 overflow-hidden rounded-xl border bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[750px]">
                <thead className="bg-gray-50 border-b text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Medicine</th>
                    <th className="px-6 py-4 text-left font-semibold">Category</th>
                    <th className="px-6 py-4 text-left font-semibold">Unit Price</th>
                    <th className="px-6 py-4 text-left font-semibold">Current Stock</th>
                    <th className="px-6 py-4 text-left font-semibold">Status</th>
                    <th className="px-6 py-4 text-right font-semibold">Stock Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y text-sm">
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                        No medicines match your search.
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((product) => (
                      <tr key={product.name} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 font-bold text-gray-900">
                          {product.name}
                        </td>

                        <td className="px-6 py-4 text-gray-600">
                          <span className="inline-block rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                            {product.category}
                          </span>
                        </td>

                        <td className="px-6 py-4 font-semibold text-green-600">
                          ৳{product.price}
                        </td>

                        <td className="px-6 py-4 font-bold">
                          {editingProduct === product.name ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                min="0"
                                value={stockInput}
                                onChange={(e) => setStockInput(Number(e.target.value))}
                                className="w-20 rounded border border-green-600 px-2 py-1 text-sm outline-none"
                                autoFocus
                              />
                              <button
                                onClick={() => handleSaveStock(product.name)}
                                className="rounded bg-green-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-green-700"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingProduct(null)}
                                className="rounded bg-gray-200 px-2 py-1 text-xs text-gray-700 hover:bg-gray-300"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <span className="text-gray-900">{product.stock} units</span>
                          )}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              product.stock <= 0
                                ? "bg-red-100 text-red-700"
                                : product.stock <= 10
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {product.stock <= 0
                              ? "Out of Stock"
                              : product.stock <= 10
                              ? "Low Stock"
                              : "In Stock"}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleQuickAdd(product.name, product.stock, 10)}
                              className="rounded border border-gray-300 px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100"
                              title="Restock 10 units"
                            >
                              +10
                            </button>
                            <button
                              onClick={() => handleQuickAdd(product.name, product.stock, 50)}
                              className="rounded border border-gray-300 px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100"
                              title="Restock 50 units"
                            >
                              +50
                            </button>
                            <button
                              onClick={() => handleEditClick(product.name, product.stock)}
                              className="rounded bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700 hover:bg-green-100"
                            >
                              Set Value
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
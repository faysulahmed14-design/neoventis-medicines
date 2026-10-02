"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

const stats = [
  {
    title: "Total Orders",
    value: "24",
    icon: "📦",
    description: "All customer orders",
  },
  {
    title: "Total Products",
    value: "8",
    icon: "💊",
    description: "Medicines & healthcare",
  },
  {
    title: "Customers",
    value: "18",
    icon: "👥",
    description: "Registered customers",
  },
  {
    title: "Total Sales",
    value: "৳12,450",
    icon: "💰",
    description: "Total order value",
  },
];

const quickActions = [
  {
    title: "Manage Products",
    description: "Add, edit and manage medicines",
    icon: "💊",
    link: "/admin/products",
  },
  {
    title: "Manage Orders",
    description: "View and update customer orders",
    icon: "📦",
    link: "/admin/orders",
  },
  {
    title: "Manage Customers",
    description: "View registered customers",
    icon: "👥",
    link: "/admin/customers",
  },
  {
    title: "Inventory",
    description: "Monitor product stock",
    icon: "📊",
    link: "/admin/inventory",
  },
];

const recentOrders = [
  {
    id: "ORD-01181154",
    customer: "Faysul Ahmed",
    amount: 770,
    status: "Order Placed",
  },
  {
    id: "ORD-00928178",
    customer: "Rahim Ahmed",
    amount: 210,
    status: "Order Placed",
  },
  {
    id: "ORD-00854347",
    customer: "Karim Hasan",
    amount: 210,
    status: "Order Placed",
  },
];

export default function AdminDashboardPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-100 px-6 py-10">
        <div className="mx-auto max-w-7xl">

          {/* Page Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-green-600">
                ADMIN PANEL
              </p>

              <h1 className="mt-1 text-4xl font-bold text-gray-900">
                Dashboard
              </h1>

              <p className="mt-2 text-gray-600">
                Manage your medical e-commerce business from one place.
              </p>
            </div>

            <div>
              <a
                href="/"
                className="inline-block rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
              >
                View Store
              </a>
            </div>
          </div>

          {/* Statistics */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.title}
                className="rounded-xl border bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="text-3xl">
                    {stat.icon}
                  </div>

                  <span className="text-sm font-medium text-green-600">
                    Overview
                  </span>
                </div>

                <p className="mt-5 text-sm text-gray-500">
                  {stat.title}
                </p>

                <h2 className="mt-1 text-3xl font-bold text-gray-900">
                  {stat.value}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <section className="mt-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Quick Actions
              </h2>

              <p className="mt-1 text-gray-600">
                Quickly access important admin functions.
              </p>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {quickActions.map((action) => (
                <a
                  key={action.title}
                  href={action.link}
                  className="rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="text-4xl">
                    {action.icon}
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-gray-900">
                    {action.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    {action.description}
                  </p>

                  <span className="mt-4 inline-block text-sm font-semibold text-green-600">
                    Open →
                  </span>
                </a>
              ))}
            </div>
          </section>

          {/* Recent Orders */}
          <section className="mt-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Recent Orders
                </h2>

                <p className="mt-1 text-gray-600">
                  Latest customer orders.
                </p>
              </div>

              <a
                href="/admin/orders"
                className="text-sm font-semibold text-green-600 hover:text-green-700"
              >
                View All
              </a>
            </div>

            <div className="mt-5 overflow-hidden rounded-xl border bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                        Order ID
                      </th>

                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                        Customer
                      </th>

                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                        Amount
                      </th>

                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                        Status
                      </th>

                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-t"
                      >
                        <td className="px-6 py-4 font-semibold text-gray-900">
                          {order.id}
                        </td>

                        <td className="px-6 py-4 text-gray-700">
                          {order.customer}
                        </td>

                        <td className="px-6 py-4 font-semibold text-green-600">
                          ৳{order.amount}
                        </td>

                        <td className="px-6 py-4">
                          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                            {order.status}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <a
                            href="/admin/orders"
                            className="text-sm font-semibold text-green-600 hover:text-green-700"
                          >
                            View
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Low Stock Alert */}
          <section className="mt-10">
            <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div className="flex items-start gap-4">
                  <div className="text-3xl">
                    ⚠️
                  </div>

                  <div>
                    <h2 className="font-bold text-yellow-900">
                      Low Stock Alert
                    </h2>

                    <p className="mt-1 text-sm text-yellow-800">
                      Some products may need stock updates.
                    </p>
                  </div>
                </div>

                <a
                  href="/admin/inventory"
                  className="rounded-lg bg-yellow-600 px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-yellow-700"
                >
                  Check Inventory
                </a>

              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}
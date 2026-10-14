import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://neoventis-medicines.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Neoventis Medicine | Buy Genuine Medicines Online Bangladesh",
    template: "%s | Neoventis Medicine",
  },
  description:
    "Order genuine prescription drugs, wellness products, and healthcare essentials online in Bangladesh with rapid doorstep delivery. 100% authentic pharmacy items, Cash on Delivery available.",
  keywords: [
    "medicine online bangladesh",
    "online pharmacy dhaka",
    "buy medicines online bd",
    "otubic capsule price",
    "otucid",
    "utamin tablet",
    "ebarry capsule",
    "xymotac",
    "neoventis medicine",
    "emergency medicine delivery bangladesh",
    "cash on delivery pharmacy",
  ],
  authors: [{ name: "Neoventis Medicine" }],
  creator: "Neoventis Medicine",
  publisher: "Neoventis Medicine",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Neoventis Medicine | Trusted Online Pharmacy in Bangladesh",
    description:
      "Order authentic prescription medicines and daily healthcare essentials with guaranteed rapid home delivery across Bangladesh.",
    url: siteUrl,
    siteName: "Neoventis Medicine",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neoventis Medicine | Buy Genuine Medicines Online Bangladesh",
    description:
      "Order authentic prescription drugs and healthcare essentials with doorstep delivery in Bangladesh.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pharmacySchema = {
    "@context": "https://schema.org",
    "@type": "Pharmacy",
    name: "Neoventis Medicine",
    description:
      "Licensed and authentic online healthcare provider and medicine delivery service in Bangladesh.",
    url: siteUrl,
    telephone: "+8801758940277",
    currenciesAccepted: "BDT",
    paymentAccepted: "Cash, Cash on Delivery, Mobile Banking",
    priceRange: "৳",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pharmacySchema) }}
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50 text-gray-900`}>
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
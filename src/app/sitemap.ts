import { MetadataRoute } from "next";
import { products } from "./data/products";

const baseUrl = "https://neoventis-medicines.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Static core pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tracking`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  // Dynamic products sitemap for every single medicine
  const productRoutes: MetadataRoute.Sitemap = (products || []).map((product) => ({
    url: `${baseUrl}/products?search=${encodeURIComponent(product.name)}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}

import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://adityalabs.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { url: "", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/services", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/process", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/about", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/portfolio", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/testimonials", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/pricing", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/contact", priority: 0.9, changeFrequency: "weekly" as const },
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  serverExternalPackages: ['@prisma/client'],
  // Turbopack optimizations for Clerk
  experimental: {
    // Ensure proper code splitting for dynamic imports
    optimizePackageImports: ['@clerk/nextjs'],
  },
  // Empty Turbopack config (Turbopack is default in Next.js 16)
  turbopack: {},

  // Image optimization settings
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'pickyassist.com',
      },
    ],
  },
  // SWC minification for better bundle size
  // swcMinify:true,
};

export default nextConfig;

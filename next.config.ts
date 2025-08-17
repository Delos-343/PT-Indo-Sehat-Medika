import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [new URL('https://unsplash.com/photos/**'), new URL('https://plus.unsplash.com/**')],
    unoptimized: true,
  },
  output: 'export',
};

export default nextConfig;

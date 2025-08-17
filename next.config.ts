import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [new URL('https://unsplash.com/photos/**'), new URL('https://plus.unsplash.com/**')],
    unoptimized: true
  },
  output: "export"
};

export default nextConfig;

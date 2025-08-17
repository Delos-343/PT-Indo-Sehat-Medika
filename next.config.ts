import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  images: {
    remotePatterns: [new URL('https://unsplash.com/photos/**'), new URL('https://plus.unsplash.com/**')],
  }
};

export default nextConfig;

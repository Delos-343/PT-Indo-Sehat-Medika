import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://unsplash.com/photos/**'), new URL('https://plus.unsplash.com/**')],
  },
  output: 'export'
};

export default nextConfig;

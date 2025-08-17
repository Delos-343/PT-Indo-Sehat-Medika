// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Export static HTML (next export)
  output: 'export',
  // next export likes trailing slashes so pages become folders with index.html
  trailingSlash: true,
  // image config: unoptimized -> Next won't attempt runtime image optimizations
  images: {
    // remotePatterns in object shape (avoid using new URL)
    remotePatterns: [
      // Unsplash common hosts (images may be served from images.unsplash.com or plus.unsplash.com)
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'plus.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'unsplash.com', pathname: '/photos/**' }
    ],
    unoptimized: true
  }
};

export default nextConfig;

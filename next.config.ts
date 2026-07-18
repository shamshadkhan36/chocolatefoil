import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  // Ensure strict mode is off if necessary, but true is standard
  reactStrictMode: true,
};

export default nextConfig;

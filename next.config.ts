import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

// Define your Next.js configuration
const nextConfig: NextConfig = {
  // output: "export", // Enable static export
  /* Add other config options here */
};

// Combine the bundle analyzer with the Next.js config
export default bundleAnalyzer(nextConfig);

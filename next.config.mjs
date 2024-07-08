// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['testshopapi.tools121.com'], // Add your image domain here
  },
};

export default withBundleAnalyzer(nextConfig);

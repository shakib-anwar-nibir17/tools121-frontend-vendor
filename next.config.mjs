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
    domains: [process.env.NEXT_PUBLIC_SHOP_DOMAIN], // Add your image domain here
  },
};

export default withBundleAnalyzer(nextConfig);

// next.config.js

require('dotenv').config(); // Ensure env variables are loaded

// Load image patterns from .env (protocol|hostname|pathname)
const imagePatternString = process.env.NEXT_PUBLIC_IMAGE_PATTERNS || "";
const remotePatterns = imagePatternString
  .split(",")
  .map((entry) => {
    const [protocol, hostname, pathname] = entry.split("|").map((s) => s.trim());
    if (protocol && hostname) {
      return {
        protocol,
        hostname,
        pathname: pathname || "/**",
      };
    }
    return null;
  })
  .filter(Boolean); // Remove invalid entries

module.exports = {
  images: {
    remotePatterns,
  },
};

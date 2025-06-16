/* eslint-disable */
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    domains: ["localhost", "res.cloudinary.com", "images.unsplash.com"],
    unoptimized: true,
  },
};

// Import the next-intl plugin
const withNextIntl = require("next-intl/plugin")("./i18n.ts");

// Export the config with the plugin
module.exports = withNextIntl(nextConfig);

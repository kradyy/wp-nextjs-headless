/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true,
  },
  images: {
    domains: ["wp-headless.lndo.site", "localhost"],
  },
};

module.exports = nextConfig;

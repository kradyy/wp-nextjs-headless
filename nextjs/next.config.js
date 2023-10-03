/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true,
  },
  images: {
    domains: ["wp-headless.lndo.site"],
    domains: ["localhost"],
  },
};

module.exports = nextConfig;

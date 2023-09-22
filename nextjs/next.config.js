/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["wp-headless.lndo.site"],
    domains: ["localhost"],
  },
};

module.exports = nextConfig;

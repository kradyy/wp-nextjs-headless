/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'wp-headless.lndo.site', 
    ]
  }
}

module.exports = nextConfig

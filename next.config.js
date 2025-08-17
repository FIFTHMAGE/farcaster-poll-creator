/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['imagedelivery.net'],
  },
}

module.exports = nextConfig
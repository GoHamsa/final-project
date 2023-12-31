/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
    serverActions: true,
  },
  images: {
    domains: ['res.cloudinary.com'],

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's2.coinmarketcap.com',
      },
    ],
  },
};

module.exports = nextConfig;

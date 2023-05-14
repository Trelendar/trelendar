/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
      },
    ],
  },
  env: {
    FE_URL: process.env.FE_URL,
  },
};

module.exports = nextConfig;

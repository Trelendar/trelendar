/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: true,
  env: {
    URL_SOCKET: process.env.URL_SOCKET,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
      },
    ],
  },
};

module.exports = nextConfig;

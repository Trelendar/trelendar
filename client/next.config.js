module.exports = {
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

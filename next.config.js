/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/events',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;

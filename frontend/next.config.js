/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    domains: ['cdn.sanity.io'],
  },
};

module.exports = nextConfig;

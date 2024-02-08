/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.dummyjson.com',
        // port: '',
        pathname: '/**',
      },
    ],
    domains: ['cdn.dummyjson.com'],
  },
}

module.exports = nextConfig

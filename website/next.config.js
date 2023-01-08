/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'anchorscad.s3-ap-southeast-2.amazonaws.com',
      },
    ],
  },
}

module.exports = nextConfig

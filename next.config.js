/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove the export configuration as it's not needed for Vercel
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['images.unsplash.com'], // Add any other image domains you're using
  },
};

module.exports = nextConfig;
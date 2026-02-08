import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [{
      protocol: 'https',
      hostname: 'res.cloudinary.com',
    },
  ]
  },
};

export default nextConfig;



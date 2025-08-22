import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow both local public/ images and YouTube thumbnails
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
    // Keep formats lean (no heavy AVIF unless you want max compression)
    formats: ["image/webp"],
    // Limit size for optimization so big PNG/JPGs don’t blow data
    deviceSizes: [320, 640, 768, 1024, 1280],
    imageSizes: [16, 32, 48, 64, 96],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

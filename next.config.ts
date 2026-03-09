// import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "www.shutterstock.com" },
      { protocol: "https", hostname: "images.stockcake.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

module.exports = nextConfig;
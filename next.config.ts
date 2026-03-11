/** @type {import('next').NextConfig} */

const MAIN_API = process.env.NEXT_PUBLIC_MAIN_API;
const CHATBOT_API = process.env.NEXT_PUBLIC_CHATBOT_API;

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "www.shutterstock.com" },
      { protocol: "https", hostname: "images.stockcake.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${MAIN_API}/api/:path*`,
      },
      {
        source: "/chatbot/:path*",
        destination: `${CHATBOT_API}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
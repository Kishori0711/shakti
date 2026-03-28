/** @type {import('next').NextConfig} */

const MAIN_API = process.env.NEXT_PUBLIC_MAIN_API;
// const CHATBOT_API = process.env.NEXT_PUBLIC_CHATBOT_API;

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "www.shutterstock.com" },
      { protocol: "https", hostname: "images.stockcake.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "thumbs.dreamstime.com" }, 
    
      { protocol: "http", hostname: "20.244.10.145", port: "3000" },
      { protocol: "http", hostname: "localhost", port: "3000" },
    ],
  },

  async rewrites() {
    return [
  {
        source: "/api/v1/:path*",
        destination: `${MAIN_API}/api/v1/:path*`,
      },
      // {
      //   source: "/chatbot/:path*",
      //   destination: `${CHATBOT_API}/:path*`,
      // },
    ];
  },
};

module.exports = nextConfig;
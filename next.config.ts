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

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://20.244.10.145:3000/api/:path*",
      },
       {
        source: "/chatbot/:path*",
        destination: "http://CHATBOT_SERVER:4000/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
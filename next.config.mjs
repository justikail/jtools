/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "assets.vercel.com",
      },
      {
        hostname: "anime.kirwako.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/sitename.xml",
        destination: "/sitemap.xml",
      },
    ];
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sleek-cat-262.convex.cloud",
        port: "",
      },
    ],
  },
};

export default nextConfig;

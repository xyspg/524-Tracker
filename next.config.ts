import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "u.cubeupload.com"
      },
      {
        protocol: "https",
        hostname: "forum.uscreditcardguide.com"
      },
      {
        protocol: "https",
        hostname: "asset-cdn.uscardforum.com"
      },
      {
        protocol: "https",
        hostname: "d1do1axor6p0u1.cloudfront.net"
      }
    ]
  }
};

export default nextConfig;

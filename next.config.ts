import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "not-lain-background-removal.hf.space",
        port: "",
        pathname: "/**", // Changed to allow any path structure
      },
    ],
  },
};

export default nextConfig;

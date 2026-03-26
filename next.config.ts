import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/birthday",
  assetPrefix: "/birthday/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
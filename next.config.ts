import type { NextConfig } from "next";

const repo = process.env.DECK_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: repo,
  assetPrefix: repo || undefined,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;

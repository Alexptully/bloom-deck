import type { NextConfig } from "next";

// Set in CI to "/<repo-name>" so the deck works under username.github.io/<repo-name>/.
const repo = process.env.DECK_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: repo,
  assetPrefix: repo || undefined,
  images: { unoptimized: true },
  trailingSlash: true,
  // next/image does not add basePath to plain string sources, so components read it from here.
  env: { NEXT_PUBLIC_BASE_PATH: repo },
};

export default nextConfig;

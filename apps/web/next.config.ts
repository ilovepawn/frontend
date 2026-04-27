import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@ilovepawn/shared", "@ilovepawn/api"],
};

export default nextConfig;

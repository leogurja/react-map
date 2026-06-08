import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const withMDX = createMDX();

const config: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  reactCompiler: true,
  bundlePagesRouterDependencies: false,
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withMDX(config);

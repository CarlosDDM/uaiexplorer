import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: "standalone",
  images: {
    remotePatterns: [new URL("https://images.uaiexplorer.com.br/uaiexplorer/**")],
  },
};

export default nextConfig;

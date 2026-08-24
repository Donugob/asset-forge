import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@resvg/resvg-js', '@react-pdf/renderer', 'satori', 'harfbuzzjs'],
  experimental: {
    outputFileTracingIncludes: {
      '/api/**/*': ['./node_modules/**/*.wasm']
    }
  }
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@resvg/resvg-js', '@react-pdf/renderer', 'satori', 'harfbuzzjs'],
  outputFileTracingIncludes: {
    '/api/**/*': ['./node_modules/**/*.wasm', './public/fonts/**/*']
  }
};

export default nextConfig;

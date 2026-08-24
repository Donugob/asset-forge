import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@resvg/resvg-js', '@react-pdf/renderer', 'satori', 'harfbuzzjs'],
};

export default nextConfig;

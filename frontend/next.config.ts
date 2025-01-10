import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/login', 
        destination: '/auth/login',
      },
      {
        source: '/register',
        destination: '/auth/register',
      }
    ];
  },
};

export default nextConfig;

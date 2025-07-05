import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "*",
      
    }]
  },

  // experimental: {
  //   ppr: "incremental"  
  // },

  devIndicators: {
    appIsrStatus: true,
    buildActivity: true,
    buildActivityPosition: "top-left"
  }
};

export default nextConfig;

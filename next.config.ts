import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "static.wixstatic.com" },
    ],
  },
  // Allow LAN devices (iPhone, iPad, other laptops on the same Wi-Fi) to
  // load dev assets. Next 16 blocks cross-origin dev requests by default,
  // which prevents JS hydration when you hit the dev server via the Mac's
  // LAN IP (e.g. http://192.168.x.x:3000) from another device.
  // Patterns are per-segment globs, not CIDR — see
  // node_modules/next/dist/server/app-render/csrf-protection.js
  allowedDevOrigins: [
    "192.168.*.*",
    "10.*.*.*",
    "172.16.*.*",
    "172.17.*.*",
    "172.18.*.*",
    "172.19.*.*",
    "172.20.*.*",
    "172.21.*.*",
    "172.22.*.*",
    "172.23.*.*",
    "172.24.*.*",
    "172.25.*.*",
    "172.26.*.*",
    "172.27.*.*",
    "172.28.*.*",
    "172.29.*.*",
    "172.30.*.*",
    "172.31.*.*",
    "*.local",
  ],
};

export default nextConfig;

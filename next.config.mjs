/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  experimental: {
    agentUpgrade: "security",
  },
};

export default nextConfig;

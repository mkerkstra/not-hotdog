/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@kerk/data", "@kerk/ui"],
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: [
      "@prisma/client",
      "prisma",
      "tailwindcss",
    ],
  },
};

module.exports = nextConfig;

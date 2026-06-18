/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Empty turbopack config silences the "webpack config with no turbopack config" warning
  // that Next.js 16 raises when Turbopack (the default bundler) sees a webpack config.
  turbopack: {},
  webpack: (config) => {
    // Required for react-pdf when building with webpack (e.g. `next build` or `--webpack`)
    config.resolve.alias.canvas = false;
    return config;
  },
};

module.exports = nextConfig;

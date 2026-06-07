/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: process.env.STATIC_EXPORT === "true"
  },
  output: process.env.STATIC_EXPORT === "true" ? "export" : undefined,
  reactStrictMode: true
};

export default nextConfig;

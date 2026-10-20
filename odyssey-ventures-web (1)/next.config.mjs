/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Photos currently served from the existing site's CDN.
    // To remove this dependency, download them into /public/images and update src/config/images.ts.
    remotePatterns: [{ protocol: "https", hostname: "framerusercontent.com" }],
  },
};

export default nextConfig;

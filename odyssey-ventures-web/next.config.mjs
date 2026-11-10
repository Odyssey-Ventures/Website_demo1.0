/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Photos currently served from the existing site's CDN.
    // To remove this dependency, download them into /public/images and update src/config/images.ts.
    remotePatterns: [
      { protocol: "https", hostname: "framerusercontent.com" },
      // Stock photos (Unsplash License), listed in src/config/photos.ts.
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;

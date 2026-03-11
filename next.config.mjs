// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    // add external hosts that serve character images. Verify the host name in the Network tab and add it here.
    domains: ["akabab.github.io", "raw.githubusercontent.com", "rawcdn.githack.com"],
  },
};

export default nextConfig;

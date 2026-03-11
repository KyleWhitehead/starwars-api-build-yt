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
    remotePatterns: [
      { protocol: "https", hostname: "akabab.github.io", pathname: "/**" },
      { protocol: "https", hostname: "raw.githubusercontent.com", pathname: "/**" },
      { protocol: "https", hostname: "rawcdn.githack.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;

/** next.config.mjs */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    // Use `remotePatterns` instead of the deprecated `domains` list.
    // This is more secure and prevents malicious users from forcing your app to fetch
    // images from attacker-controlled hosts.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "akabab.github.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "vignette.wikia.nocookie.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "rawcdn.githack.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/**",
      },
      // Example wildcard pattern (uncomment if you need broader matching):
      // { protocol: 'https', hostname: '**.nocookie.net', pathname: '/**' },
    ],
  },
};

export default nextConfig;


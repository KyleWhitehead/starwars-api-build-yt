/** next.config.mjs */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      "akabab.github.io",                // API host you already use
      "vignette.wikia.nocookie.net",    // host shown in your screenshot
      "rawcdn.githack.com",             // sometimes used as CDN
      "raw.githubusercontent.com"
    ],
    // optional: remotePatterns allows broader matching if you have many subdomains
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vignette.wikia.nocookie.net",
        pathname: "/**",
      },
      // { protocol: 'https', hostname: '**.nocookie.net', pathname: '/**' } // alternative wildcard
    ],
  },
};

export default nextConfig;


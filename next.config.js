const nextConfig = {
  experimental: {
    reactRoot: true,
    runtime: 'edge',
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};

module.exports = nextConfig;

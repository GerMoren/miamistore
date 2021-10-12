const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const config = {
  images: {
    domains: [
      "i5.walmartimages.com",
      "images.ctfassets.net",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
    ],
  },
  i18n: {
    locales: ["en-US", "es"],
    defaultLocale: "en-US",
  },
};

module.exports = withBundleAnalyzer(config);

const webpack = require("webpack");

const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");

const config = require("./config");

const configs = {
  distDir: "dest",

  generateEtags: true,

  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },

  pageExtensions: ["jsx", "js"],

  generateBuildId: async () => {
    if (process.env.YOUR_BUILD_ID) {
      return process.env.YOUR_BUILD_ID;
    }
    return null;
  },

  webpack(config, options) {
    return config;
  },

  webpackDevMiddleware: (config) => {
    return config;
  },

  env: {
    customeKey: "value",
  },

  serverRuntimeConfig: {
    mySecret: "secret",
    secondSecret: process.env.SECOND_SECRET,
  },

  publicRuntimeConfig: {
    staticFolder: "/static",
  },
};

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  webpack(config) {
    // ignore other moment plugins but CN
    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
    return config;
  },
  publicRuntimeConfig: {
    GITHUB_OAUTH_URL: config.GITHUB_OAUTH_URL,
    OAUTH_URL: config.OAUTH_URL,
  },
  analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: "static",
      reportFileName: "../bundles/server.html",
    },
    browser: {
      analyzerMode: "static",
      reportFileName: "../bundles/client.html",
    },
  },
});

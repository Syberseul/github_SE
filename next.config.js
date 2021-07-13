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

const GITHUB_OAUTH_URL = "https://github.com/login/oauth/authorize";
const SCOPE = "user";

module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    GITHUB_OAUTH_URL,
    OAUTH_URL: `${GITHUB_OAUTH_URL}?client_id=${config.github.client_id}&scope=${SCOPE}`,
  },
};

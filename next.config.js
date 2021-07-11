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

module.exports = {
  reactStrictMode: true,
};

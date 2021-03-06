const axios = require("axios");

const GITHUB_BASE_URL = "https://api.github.com";

const isServer = typeof window === "undefined";

async function requestGithub(method, url, data, headers) {
  return await axios({
    method,
    url: `${GITHUB_BASE_URL}${url}`,
    data,
    headers,
  });
}

async function request({ method = "GET", url, data = {} }, req, res) {
  if (!url) {
    throw Error("url must be provide");
  }
  if (isServer) {
    const { session } = req;
    const { githubAuth } = session || {};
    const { access_token, token_type } = githubAuth || {};
    const headers = {};
    if (githubAuth && access_token) {
      headers["Authorization"] = `${token_type} ${access_token}`;
    }
    return await requestGithub(method, url, data, headers);
  } else {
    return await axios({
      method,
      url: `/github${url}`,
      data,
    });
  }
}

module.exports = {
  request,
  requestGithub,
};

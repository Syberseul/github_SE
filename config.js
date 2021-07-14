const GITHUB_OAUTH_URL = "https://github.com/login/oauth/authorize";
const SCOPE = "user";
const client_id = "5a2c3a85ae7e22f9cd96";

module.exports = {
  github: {
    request_token_url: "https://github.com/login/oauth/access_token",
    client_id,
    client_secret: "62633420352f94fbf96dbe590582c0bdda28a2a4",
  },
  GITHUB_OAUTH_URL,
  OAUTH_URL: `${GITHUB_OAUTH_URL}?client_id=${client_id}&scope=${SCOPE}`,
};

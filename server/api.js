const { requestGithub } = require("../lib/api");

module.exports = (server) => {
  server.use(async (ctx, next) => {
    const { path, method } = ctx;

    if (path.startsWith("/github/")) {
      const { session } = ctx;
      const { githubAuth } = session || {};

      const { access_token, token_type } = githubAuth || {};
      const headers = {};
      if (githubAuth && access_token) {
        headers["Authorization"] = `${token_type} ${access_token}`;
      }
      const result = await requestGithub(
        method,
        ctx.url.replace("/github/", "/"),
        ctx.request.body || {},
        headers
      );

      ctx.status = result.status;
      ctx.body = result.data;
    } else {
      await next();
    }
  });
};

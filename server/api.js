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

// const axios = require("axios");
// const github_base_url = "https://api.github.com";

// module.exports = (server) => {
//   server.use(async (ctx, next) => {
//     const path = ctx.path;
//     if (path.startsWith("/github/")) {
//       const githubAuth = ctx.session.githubAuth;
//       const githubPath = `${github_base_url}${ctx.url.replace(
//         "/github/",
//         "/"
//       )}`;
//       const token = githubAuth && githubAuth.access_token;
//       let headers = {};

//       if (token) {
//         headers["Authorization"] = `${githubAuth.token_type} ${token}`;
//       }

//       try {
//         const result = await axios({
//           method: "GET",
//           url: githubPath,
//           headers,
//         });
//         if (result.status === 200) {
//           ctx.body = result.data;
//           ctx.set("Content-Type", "application/json");
//         } else {
//           ctx.status = result.status;
//           ctx.body = {
//             success: false,
//           };
//           ctx.set("Content-Type", "application/json");
//           console.log(headers);
//         }
//       } catch (err) {
//         console.error(err);
//         ctx.body = {
//           success: false,
//         };
//         ctx.set("Content-Type", "application/json");
//       }
//     } else {
//       await next();
//     }
//   });
// };

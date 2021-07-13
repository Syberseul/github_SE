const Koa = require("koa");
const Router = require("koa-router");
const next = require("next");
const session = require("koa-session");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  server.keys = ["search engine for github"];
  const SESSION_CONFIG = {
    key: "ghse",
  };

  server.use(session(SESSION_CONFIG, server));

  server.use(async (ctx, next) => {
    console.log("session is: ", ctx.session);
    await next();
  });

  router.get("/a/:id", async (ctx) => {
    const id = ctx.params.id;

    await handle(ctx.req, ctx.res, {
      pathname: "/a",
      query: { id },
    });
    ctx.respond = false;
  });

  router.get("/set/user", async (ctx) => {
    ctx.session.user = {
      name: "anonymous",
      age: 18,
    };
    ctx.body = "set session success";
  });

  router.get("/b/:id", async (ctx) => {
    const id = ctx.params.id;

    await handle(ctx.req, ctx.res, {
      pathname: "/b",
      query: { id },
    });
    ctx.respond = false;
  });

  server.use(router.routes());

  server.use(async (ctx, next) => {
    ctx.cookies.set("id", "userId:xxxxx");
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.listen(3000, () => {
    console.log(`koa server listening on 3000`);
  });
});

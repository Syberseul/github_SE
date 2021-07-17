import { useEffect } from "react";
import { connect } from "react-redux";
import getConfig from "next/config";
import Router, { withRouter } from "next/router";
import LRU from "lru-cache";
import { Button, Tabs } from "antd";

import Repo from "../components/Repo";
import { cacheArray } from "../lib/repo-basic-cache";

const api = require("../lib/api");

const cache = new LRU({
  maxAge: 1000 * 60 * 10,
});

const { publicRuntimeConfig } = getConfig();

// let cachedUserRepos, cachedUserStaredRepos;

const isServer = typeof window === "undefined";

function Index({ userRepos, userStaredRepos, user, router }) {
  const tabKey = router.query.key || "1";

  const handleTabChange = (activeKey) => {
    Router.push(`/?key=${activeKey}`);
  };

  useEffect(() => {
    if (!isServer) {
      if (userRepos) {
        cache.set("userRepos", userRepos);
      }
      if (userStaredRepos) {
        cache.set("userStaredRepos", userStaredRepos);
      }

      // cachedUserRepos = userRepos;
      // cachedUserStaredRepos = userStaredRepos;
      // const timeOut = setTimeout(() => {
      //   cachedUserRepos = null;
      //   cachedUserStaredRepos = null;
      // }, 1000 * 10);
      // return () => {
      //   clearTimeout(timeOut);
      // };
    }
  }, [userRepos, userStaredRepos]);

  useEffect(() => {
    if (!isServer) {
      cacheArray(userRepos);
      cacheArray(userStaredRepos);
    }
  });

  if (!user || !user.id) {
    return (
      <div className="root">
        <p>Please log in first</p>
        <Button type="primary" href={publicRuntimeConfig.OAUTH_URL}>
          Click and Log In
        </Button>
        <style jsx>{`
          .root {
            height: 400px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </div>
    );
  } else {
    return (
      <div className="root">
        <div className="user-info">
          <img src={user.avatar_url} alt="user avatar" className="avatar" />
          <span className="login">{user.login}</span>
          <span className="name">{user.name}</span>
          <span className="bio">{user.bio}</span>
          <a href={user.html_url}>
            <p className="url">{user.html_url}</p>
          </a>
          <a href={`mailto:${user.email}`}>
            <p className="url">{user.email}</p>
          </a>
        </div>
        <div className="user-repos">
          <div className="user-repos">
            <Tabs
              activeKey={tabKey}
              onChange={handleTabChange}
              animated={false}
            >
              {userRepos ? (
                <Tabs.TabPane tab="Your Repos" key="1">
                  {userRepos.map((repo) => (
                    <Repo key={repo.id} repo={repo} />
                  ))}
                </Tabs.TabPane>
              ) : null}
              {userStaredRepos ? (
                <Tabs.TabPane tab="Your Star Repos" key="2">
                  {userStaredRepos.map((repo) => (
                    <Repo key={repo.id} repo={repo} />
                  ))}
                </Tabs.TabPane>
              ) : null}
            </Tabs>
          </div>
        </div>
        <style jsx>{`
          .root {
            display: flex;
            align-items: flex-start;
            padding: 20px 0;
          }
          .user-info {
            width: 200px;
            margin-right: 40px;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
          }
          .avatar {
            width: 100%;
            border-radius: 5px;
          }
          .login {
            font-weight: 800;
            font-size: 20px;
            margin-top: 20px;
          }
          .name,
          .bio {
            font-size: 16px;
            color: #666;
          }
          .user-repos: {
            flex-grow: 1;
          }
        `}</style>
      </div>
    );
  }
}

Index.getInitialProps = async ({ ctx, reduxStore }) => {
  // console.log(ctx.req, ctx.res);

  const user = reduxStore.getState().user;
  if (!user || !user.id) {
    return {
      isLogin: false,
    };
  }

  if (!isServer) {
    if (cache.get("userRepos") && cache.get("userStaredRepos")) {
      return {
        userRepos: cache.get("userRepos"),
        userStaredRepos: cache.get("userStaredRepos"),
      };
    }

    // if (cachedUserRepos && cachedUserStaredRepos) {
    //   return {
    //     userRepos: cachedUserRepos,
    //     userStaredRepos: cachedUserStaredRepos,
    //   };
    // }
  }

  const userRepos = await api.request(
    {
      url: "/user/repos",
    },
    ctx.req,
    ctx.res
  );

  const userStaredRepos = await api.request(
    {
      url: "/user/starred",
    },
    ctx.req,
    ctx.res
  );

  return {
    isLogin: true,
    userRepos: userRepos.data,
    userStaredRepos: userStaredRepos.data,
  };
};

const mapState = (state) => {
  return {
    user: state.user,
  };
};

export default withRouter(connect(mapState, null)(Index));

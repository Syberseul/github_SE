import { useEffect } from "react";
import { connect } from "react-redux";
import Repo from "../components/Repo";
import getConfig from "next/config";
import Router, { withRouter } from "next/router";

import { Button, Tabs } from "antd";

const api = require("../lib/api");

const { publicRuntimeConfig } = getConfig();

let catchedUserRepos, catchedUserStaredRepos;

const isServer = typeof window === "undefined";

function Index({ userRepos, userStaredRepos, user, router }) {
  const tabKey = router.query.key || "1";

  const handleTabChange = (activeKey) => {
    Router.push(`/?key=${activeKey}`);
  };

  useEffect(() => {
    if (!isServer) {
      catchedUserRepos = userRepos;
      catchedUserStaredRepos = userStaredRepos;
    }
  }, []);

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
              <Tabs.TabPane tab="Your Repos" key="1">
                {userRepos.map((repo) => (
                  <Repo key={repo.id} repo={repo} />
                ))}
              </Tabs.TabPane>
              <Tabs.TabPane tab="Your Star Repos" key="2">
                {userStaredRepos.map((repo) => (
                  <Repo key={repo.id} repo={repo} />
                ))}
              </Tabs.TabPane>
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

Index.getInitialProps = async (ctx) => {
  if (!isServer) {
    if (catchedUserRepos && catchedUserStaredRepos) {
      return {
        userRepos: catchedUserRepos,
        userStaredRepos: catchedUserStaredRepos,
      };
    }
  }

  try {
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
  } catch (error) {
    return {
      isLogin: false,
    };
  }
};

const mapState = (state) => {
  return {
    user: state.user,
  };
};

export default withRouter(connect(mapState, null)(Index));

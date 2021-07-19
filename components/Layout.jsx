import React, { useState, useCallback } from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import Link from "next/link";

import { Layout, Input, Avatar, Tooltip, Dropdown, Menu } from "antd";
import { GithubOutlined } from "@ant-design/icons";

import Container from "./Container";
import { logOut } from "../store/store";

const { Header, Content, Footer } = Layout;

const githubIconStyle = {
  color: "white",
  fontSize: 40,
  display: "block",
  marginRight: 20,
};

const footerStyle = {
  textAlign: "center",
};

// const Comp = ({ color, children, style }) => (
//   <div style={{ color, ...style }}>{children}</div>
// );

function HeaderLayout({ children, user, logOut, router }) {
  const urlQuery = router.query && router.query.query;

  const [search, setSearch] = useState(urlQuery || "");

  const handleSearchChange = useCallback(
    ({ target }) => {
      setSearch(target.value);
    },
    [setSearch]
  );

  const Item = Menu.Item;
  const Search = Input.Search;

  const handleOnSearchChange = useCallback(() => {
    router.push(`/search?query=${search}`);
  }, [search, router]);

  const handleLogOut = useCallback(() => {
    logOut();
  }, [logOut]);

  const userDropdown = (
    <Menu>
      <Item>
        <a href="javascript:void(0)" onClick={handleLogOut}>
          Log Out
        </a>
      </Item>
    </Menu>
  );

  return (
    <Layout>
      <Header>
        <Container renderer={<div className="header-inner" />}>
          <div className="header-left">
            <div className="logo">
              <Link href="/">
                <GithubOutlined style={githubIconStyle} />
              </Link>
            </div>
            <div>
              <Search
                placeholder="Search Repo..."
                value={search}
                onChange={handleSearchChange}
                onSearch={handleOnSearchChange}
                style={{ marginTop: 5 }}
              />
            </div>
          </div>
          <div className="header-right">
            <div className="user">
              {user && user.id ? (
                <Dropdown overlay={userDropdown}>
                  <a href="/">
                    <Avatar size={40} src={user.avatar_url} />
                  </a>
                </Dropdown>
              ) : (
                <Tooltip title="Click to login">
                  <Link href={`/prepare-auth?url=${router.asPath}`}>
                    <Avatar size={40} icon="user" />
                  </Link>
                </Tooltip>
              )}
            </div>
          </div>
        </Container>
      </Header>
      <Content>
        <Container>{children}</Container>
        {/* <Container renderer={<Comp color="red" style={{ fontSize: 40 }} />}>
          {children}
        </Container> */}
        {/* <Container renderer={<div />}>{children}</Container> */}
      </Content>
      <Footer style={footerStyle}>
        Developed By Yiteng @
        <Link href="mailto:yteng.huang@gmail.com">yteng.huang@gmail.com</Link>
      </Footer>

      <style jsx>{`
        .header-inner {
          display: flex;
          justify-content: space-between;
        }
        .header-left {
          display: flex;
          justify-content: flex-start;
          margin-top: 12px;
        }
      `}</style>
      <style jsx global>{`
        #__next {
          height: 100%;
        }
        .ant-layout {
          min-height: 100%;
        }
        .ant-layout-header {
          padding-left: 0;
          padding-right: 0;
        }
        .ant-layout-content {
          background: #fff;
        }
      `}</style>
    </Layout>
  );
}

const mapState = (state) => ({
  user: state.user,
});

const mapDispatch = (dispatch) => ({
  logOut: () => dispatch(logOut()),
});

export default connect(mapState, mapDispatch)(withRouter(HeaderLayout));

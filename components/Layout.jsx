import { useState, useCallback } from "react";
import { Layout, Input, Avatar } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import Container from "./Container";
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

const layout = ({ children }) => {
  const [search, setSearch] = useState("");

  const handerSearchChange = useCallback(
    (event) => {
      setSearch(event.target.value);
    },
    [setSearch]
  );

  const handleOnSearchChange = useCallback(() => {}, []);

  return (
    <Layout>
      <Header>
        <Container renderer={<div className="header-inner" />}>
          <div className="header-left">
            <div className="logo">
              <GithubOutlined style={githubIconStyle} />
            </div>
            <div>
              <Input.Search
                placeholder="Search Repo..."
                value={search}
                onChange={handerSearchChange}
                onSearch={handleOnSearchChange}
                style={{ marginTop: 5 }}
              />
            </div>
          </div>
          <div className="header-right">
            <div className="user">
              <Avatar size={40} icon="user" />
            </div>
          </div>
        </Container>
      </Header>
      <Content>
        {/* <Container renderer={<Comp color="red" style={{ fontSize: 40 }} />}>
          {children}
        </Container> */}
        {/* <Container renderer={<div />}>{children}</Container> */}
        <Container>{children}</Container>
      </Content>
      <Footer style={footerStyle}>
        Develop By Yiteng @
        <a href="mailto:yteng.huang@gmail.com">yteng.huang@gmail.com</a>
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
          height: 100%;
        }
        .ant-layout-header {
          padding-left: 0;
          padding-right: 0;
        }
      `}</style>
    </Layout>
  );
};

export default layout;

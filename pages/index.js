import { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const events = [
  "routeChangeStart",
  "routeChangeComplete",
  "routeChangeError",
  "beforeHistoryChange",
  "hashChangeStart",
  "hashChangeComplete",
];

const Index = ({ count }) => {
  useEffect(() => {
    axios.get("/api/user/info").then((resp) => console.log(resp));
  }, []);

  return (
    <>
      <span>Index {count}</span>
      <a href={publicRuntimeConfig.OAUTH_URL}>Log In</a>
    </>
  );
};

// Home.getInitialProps = async (reduxStore) => {};

const mapStateToProps = (state) => ({
  count: state.count,
});

const mapDispatchToProps = (dispatch) => ({
  // ...
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);

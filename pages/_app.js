import App from "next/app";
import { Provider } from "react-redux";
import testHoc from "../lib/with-redux";
import Layout from "../components/Layout";
import "../styles/globals.css";
import "antd/dist/antd.css";

function MyApp({ Component, pageProps, reduxStore }) {
  return (
    <Layout>
      <Provider store={reduxStore}>
        <Component {...pageProps} />
      </Provider>
    </Layout>
  );
}

MyApp.getInitialProps = async (ctx) => {
  let appProps;
  if (App.getInitialProps) {
    const appProps = await App.getInitialProps(ctx);
    return { ...appProps };
  }
  return appProps;
};

export default testHoc(MyApp);

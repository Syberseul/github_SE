import App from "next/app";
import { Provider } from "react-redux";
import store from "../store/store";
import Layout from "../components/Layout";
import "../styles/globals.css";
import "antd/dist/antd.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Provider store={store}>
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

export default MyApp;

import App from "next/app";
import Layout from "../components/Layout";
import "../styles/globals.css";
import "antd/dist/antd.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

MyApp.getInitialProps = async (appContext) => {
  let appProps;

  if (App.getInitialProps) {
    const appProps = await App.getInitialProps(appContext);

    return { ...appProps };
  }

  return appProps;
};

export default MyApp;

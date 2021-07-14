import { useState, useEffect } from "react";
import App from "next/app";
import { Provider } from "react-redux";
import Hoc from "../lib/with-redux";
import PageLoading from "../components/PageLoading";
import Link from "next/link";
import router from "next/router";
import axios from "axios";
import Layout from "../components/Layout";

import "../styles/globals.css";
import "antd/dist/antd.css";

function MyApp({ Component, pageProps, reduxStore }) {
  const [isLoading, setIsLoading] = useState(false);

  const changeIntoLoading = () => {
    setIsLoading(true);
  };
  const changeNotLoading = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    router.events.on("routeChangeStart", changeIntoLoading);
    router.events.on("routeChangeComplete", changeNotLoading);
    router.events.on("routeChangeError", changeNotLoading);

    return () => {
      router.events.off("routeChangeStart", changeIntoLoading);
      router.events.off("routeChangeComplete", changeNotLoading);
      router.events.off("routeChangeError", changeNotLoading);
    };
  }, [router.events]);

  MyApp.getInitialProps = async (ctx) => {
    let appProps;
    if (App.getInitialProps) {
      const appProps = await App.getInitialProps(ctx);
      return { ...appProps };
    }
    return appProps;
  };

  return (
    <Provider store={reduxStore}>
      {isLoading ? <PageLoading /> : null}
      <Layout>
        <Link href="/">
          <a>Index</a>
        </Link>
        <Link href="/detail">
          <a>Detail</a>
        </Link>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default Hoc(MyApp);

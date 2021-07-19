import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import router from "next/router";

import WithRedux from "../lib/with-redux";

import PageLoading from "../components/PageLoading";
import HeaderLayout from "../components/Layout";

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
  }, []);

  MyApp.getInitialProps = async (ctx) => {
    const { Component } = ctx;
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
      // console.log(ctx);
    }
    return {
      pageProps,
    };
  };

  return (
    <Provider store={reduxStore}>
      {isLoading ? <PageLoading /> : null}
      <HeaderLayout>
        <Component {...pageProps} />
      </HeaderLayout>
    </Provider>
  );
}

export default WithRedux(MyApp);

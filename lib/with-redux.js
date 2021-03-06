import React from "react";
import createStore from "../store/store";

const isServer = typeof window === "undefined";
const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__";

function getOrCreateStore(initialState) {
  if (isServer) {
    return createStore(initialState);
  }
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = createStore(initialState);
  }
  return window[__NEXT_REDUX_STORE__];
}

const WithRedux = (ChildComponents) => {
  class WithReduxApp extends React.Component {
    constructor(props) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }
    render() {
      const { Component, pageProps, ...rest } = this.props;

      return (
        <ChildComponents
          Component={Component}
          pageProps={pageProps}
          {...rest}
          reduxStore={this.reduxStore}
        />
      );
    }
  }

  WithReduxApp.getInitialProps = async (ctx) => {
    let reduxStore;

    if (isServer) {
      const { req } = ctx.ctx;
      const session = req.session;

      if (session && session.userInfo) {
        reduxStore = getOrCreateStore({
          user: session.userInfo,
        });
      } else {
        reduxStore = getOrCreateStore();
      }
    } else {
      reduxStore = getOrCreateStore();
    }

    ctx.reduxStore = reduxStore;

    let appProps = {};
    if (typeof ChildComponents.getInitialProps === "function") {
      appProps = await ChildComponents.getInitialProps(ctx);
    }
    return {
      ...appProps,
      initialReduxState: reduxStore.getState(),
    };
  };
  return WithReduxApp;
};

export default WithRedux;

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import Repo from "./Repo";

import api from "../lib/api";
import { get, cache } from "../lib/repo-basic-cache";

function makeQuery(queryObj) {
  // console.log(queryObj);
  const query = Object.entries(queryObj)
    .reduce((result, entry) => {
      result.push(entry.join("="));
      return result;
    }, [])
    .join("&");
  // console.log(query);
  return `?${query}`;
}

const isServer = typeof window === "undefined";

const WithRepoBasic = (ChildComponent, type = "index") => {
  function WithDetail({ repoBasic, ...rest }) {
    // useRouter to make sure function is accessible to passed in query
    // console.log(repoBasic);
    // console.log(rest);
    const router = useRouter();
    // console.log(router.query);
    const query = makeQuery(router.query);

    useEffect(() => {
      if (!isServer) cache(repoBasic);
    });

    return (
      <div className="root">
        <div className="repo-basic">
          <Repo repo={repoBasic} />
          <div className="tabs">
            {type === "index" ? (
              <span className="tab">Readme</span>
            ) : (
              <Link href={`/detail${query}`}>
                <a className="tab index">Readme</a>
              </Link>
            )}
            {type === "issues" ? (
              <span className="tab">Issues</span>
            ) : (
              <Link href={`/detail/issues${query}`}>
                <a className="tab issues">Issues</a>
              </Link>
            )}
          </div>
        </div>
        <div>
          <ChildComponent {...rest} />
        </div>
        <style jsx>{`
          .root {
            padding-top: 20px;
          }
          .repo-basic {
            padding: 20px;
            margin-bottom: 20px;
            border: 1px solid #eee;
            border-radius: 5px;
          }
          .tab + .tab {
            margin-left: 20px;
          }
        `}</style>
      </div>
    );
  }

  WithDetail.getInitialProps = async (context) => {
    // console.log(ctx.query);
    const { ctx } = context;
    const { owner, name } = ctx.query;

    const full_name = `${owner}/${name}`;

    let pageData = {};
    if (ChildComponent.getInitialProps) {
      pageData = await ChildComponent.getInitialProps(context);
    }

    if (get(full_name)) {
      return {
        repoBasic: get(full_name),
        ...pageData,
      };
    }

    const repoBasic = await api.request(
      {
        url: `/repos/${owner}/${name}`,
      },
      ctx.req,
      ctx.res
    );

    return {
      repoBasic: repoBasic.data,
      ...pageData,
    };
  };

  return WithDetail;
};
export default WithRepoBasic;

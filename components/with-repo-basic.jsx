import Repo from "./Repo";
import Link from "next/link";
import { useRouter } from "next/router";
import api from "../lib/api";

function makeQuery(queryObj) {
  const query = Object.entries(queryObj)
    .reduce((result, entry) => {
      result.push(entry.join("="));
      return result;
    }, [])
    .join("&");
  return `?${query}`;
}

const withRepoBasic = (Comp, type = "index") => {
  function withDetail({ repoBasic, ...rest }) {
    // useRouter to make sure function is accessible to passed in query
    const router = useRouter();
    // console.log(router);
    const query = makeQuery(router.query);

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
          <Comp {...rest} />
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

  withDetail.getInitialProps = async (context) => {
    // console.log(ctx.query);
    const { ctx } = context;

    const { owner, name } = ctx.query;

    const repoBasic = await api.request(
      {
        url: `/repos/${owner}/${name}`,
      },
      ctx.req,
      ctx.res
    );

    let pageData = {};
    if (Comp.getInitialProps) {
      pageData = await Comp.getInitialProps(context);
    }

    return {
      repoBasic: repoBasic.data,
      ...pageData,
    };
  };

  return withDetail;
};

export default withRepoBasic;

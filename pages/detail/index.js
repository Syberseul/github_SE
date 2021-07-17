import Repo from "../../components/Repo";
import Link from "next/link";
import { useRouter } from "next/router";
import api from "../../lib/api";

// based on query format, to store the current query into a formatted variable
function makeQuery(queryObj) {
  const query = Object.entries(queryObj)
    .reduce((result, entry) => {
      result.push(entry.join("="));
      return result;
    }, [])
    .join("&");
  return `?${query}`;
}

function Detail({ repoBasic }) {
  // useRouter to make sure function is accessible to passed in query
  const router = useRouter();
  // console.log(router);
  const query = makeQuery(router.query);
  console.log(query);

  return (
    <div className="root">
      <div className="repo-basic">
        <Repo repo={repoBasic} />
        <div className="tabs">
          <Link href={`/detail${query}`}>
            <a className="tab index">Readme</a>
          </Link>
          <Link href={`/detail/issues${query}`}>
            <a className="tab issues">Issues</a>
          </Link>
        </div>
      </div>
      <div>Readme</div>
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

Detail.getInitialProps = async ({ ctx }) => {
  // console.log(ctx.query);

  const { owner, name } = ctx.query;

  const repoBasic = await api.request(
    {
      url: `/repos/${owner}/${name}`,
    },
    ctx.req,
    ctx.res
  );

  return {
    repoBasic: repoBasic.data,
  };
};

export default Detail;

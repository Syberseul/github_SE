import dynamic from "next/dynamic";
import WithRepoBasic from "../../components/with-repo-basic";
import api from "../../lib/api";

const MarkdownRenderer = dynamic(
  () => import("../../components/MarkdownRenderer"),
  {
    loading: () => <p>Loading.....</p>,
  }
);

const Detail = ({ readme }) => {
  return <MarkdownRenderer content={readme.content} isBase64={true} />;
};

Detail.getInitialProps = async ({ ctx }) => {
  const { owner, name } = ctx.query;

  const readmeResp = await api.request(
    {
      url: `/repos/${owner}/${name}/readme`,
    },
    ctx.req,
    ctx.res
  );

  return {
    readme: readmeResp.data,
  };
};

export default WithRepoBasic(Detail, "index");

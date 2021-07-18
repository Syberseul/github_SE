import withRepoBasic from "../../components/with-repo-basic";
import api from "../../lib/api";

import MarkdownRenderer from "../../components/MarkdownRenderer";

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

export default withRepoBasic(Detail, "index");

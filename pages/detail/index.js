import withRepoBasic from "../../components/with-repo-basic";
import api from "../../lib/api";

const Detail = ({ readme }) => {
  console.log(atob(readme.content));
  return <span>Detail Index</span>;
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

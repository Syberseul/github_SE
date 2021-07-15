const api = require("../lib/api");
const axios = require("axios");

function Index({ data }) {
  console.log(data);
  return <span>Index</span>;
}

Index.getInitialProps = async ({ ctx }) => {
  // const result = await axios
  //   .get("/github/search/repositories?q=react")
  //   .then((resp) => console.log(resp.data));

  const result = await api.request(
    {
      url: "/search/repositories?q=react",
    },
    ctx.req,
    ctx.res
  );

  return {
    data: result.data,
  };
};

export default Index;

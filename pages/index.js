const api = require("../lib/api");
const axios = require("axios");

function Index() {
  return <span>Index</span>;
}

Index.getInitialProps = async ({ req, res }) => {
  // const result = await axios
  //   .get("/github/search/repositories?q=react")
  //   .then((resp) => console.log(resp.data));

  const result = await api.request(
    {
      url: "/search/repositories?q=react",
    },
    req,
    res
  );

  return {
    data: result.data,
  };
};

export default Index;

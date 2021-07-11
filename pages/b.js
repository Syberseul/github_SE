import Comp from "../components/comp";
import { withRouter } from "next/router";

const B = ({ router, name }) => (
  <Comp>
    B {router.query.id} {name}
  </Comp>
);

B.getInitialProps = async ({ req, query }) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: "bua",
      });
    }, 1000);
  });

  return await promise;
};

export default withRouter(B);

import Comp from "../components/comp";
import { withRouter } from "next/router";

const A = ({ router, name }) => (
  <Comp>
    A {router.query.id} {name}
  </Comp>
);

A.getInitialProps = async ({ req, query }) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: "rua",
      });
    }, 1000);
  });

  return await promise;
};

export default withRouter(A);

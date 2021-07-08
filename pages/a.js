import Temp from "../components/temp";
import { withRouter } from "next/router";

const A = ({ router }) => <Temp>A {router.query.id}</Temp>;

A.getInitialProps = async ({ req, query }) => {
  return {
    // postId: query.id,
  };
};

export default withRouter(A);

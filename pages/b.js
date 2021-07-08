import Temp from "../components/temp";
import { withRouter } from "next/router";

const B = ({ router }) => <Temp>B {router.query.id}</Temp>;

B.getInitialProps = async ({ req, query }) => {
  return {
    // postId: query.id,
  };
};

export default withRouter(B);

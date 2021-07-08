import Temp from "../components/temp";
import { withRouter } from "next/router";

const A = ({ router }) => <Temp>A {router.query.id}</Temp>;

export default withRouter(A);

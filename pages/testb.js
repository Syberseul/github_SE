import Temp from "../components/temp";
import { withRouter } from "next/router";

const B = ({ router }) => <Temp>B {router.query.id}</Temp>;

export default withRouter(B);

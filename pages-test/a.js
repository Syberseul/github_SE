import { withRouter } from "next/router";
import styled from "styled-components";
import dynamic from "next/dynamic";

const Comp = dynamic(import("../components/comp"));

const Title = styled.h1`
  color: yellow;
  font-size: 40px;
`;

const A = ({ router, name, time }) => (
  <>
    <Title>This is a Title {time}</Title>
    <Comp />
    <a>
      A {router.query.id} {name}
    </a>
    <style jsx>
      {`
        a {
          color: red;
        }
      `}
    </style>
  </>
);

A.getInitialProps = async ({ req, query }) => {
  const moment = await import("moment");

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: "rua",
        time: moment.default(Date.now() - 60 * 1000).fromNow(),
      });
    }, 1000);
  });

  return await promise;
};

export default withRouter(A);

import Link from "next/link";
import Router from "next/router";
import { Button } from "antd";

const events = [
  "routeChangeStart",
  "routeChangeComplete",
  "routeChangeError",
  "beforeHistoryChange",
  "hashChangeStart",
  "hashChangeComplete",
];

export default function Home() {
  function gotoTestB() {
    // Router.push("/b");
    Router.push(
      {
        pathname: "/b",
        query: {
          id: 2,
        },
      },
      "/b/2"
    );
  }

  return (
    <>
      <Link href="/a/?id=1" as="/a/1">
        <Button>Index</Button>
      </Link>
      <Button onClick={gotoTestB}>Test B</Button>
    </>
  );
}

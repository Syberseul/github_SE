import { Button } from "antd";
import Link from "next/link";
import Router from "next/router";

export default function Home() {
  function gotoTestB() {
    // Router.push("/b");
    Router.push({
      pathname: "/testb",
      query: {
        id: 2,
      },
    });
  }

  return (
    <>
      <Link href="/testa/?id=1">
        <Button>Index</Button>
      </Link>
      <Button onClick={gotoTestB}>Test B</Button>
    </>
  );
}

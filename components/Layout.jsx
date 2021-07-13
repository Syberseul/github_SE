import Link from "next/link";
import { Button } from "antd";

const Layout = ({ children }) => (
  <>
    <header>
      <Link href="/a/?id=1" as="/a/1">
        <Button>A</Button>
      </Link>
      <Link href="/b/?id=1" as="/b/1">
        <Button>B</Button>
      </Link>
    </header>
    {children}
  </>
);

export default Layout;

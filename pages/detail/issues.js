import withRepoBasic from "../../components/with-repo-basic";

const Issues = ({ text }) => {
  return <span>Issues{text}</span>;
};

Issues.getInitialProps = async () => {
  return {
    text: 111,
  };
};

export default withRepoBasic(Issues, "issues");

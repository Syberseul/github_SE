import withRepoBasic from "../../components/with-repo-basic";

const Detail = ({ text }) => {
  return <span>Detail Index{text}</span>;
};

Detail.getInitialProps = async () => {
  return {
    text: 111,
  };
};

export default withRepoBasic(Detail, "index");

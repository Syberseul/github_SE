import { connect } from "react-redux";

const events = [
  "routeChangeStart",
  "routeChangeComplete",
  "routeChangeError",
  "beforeHistoryChange",
  "hashChangeStart",
  "hashChangeComplete",
];

const Home = ({ count }) => {
  return (
    <>
      <span>Index {count}</span>
    </>
  );
};

const mapStateToProps = (state) => ({
  count: state.count,
});

const mapDispatchToProps = (dispatch) => ({
  // ...
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

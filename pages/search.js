import { withRouter } from "next/router";
import { Row, Col, List } from "antd";
import Router from "next/router";
import Link from "next/link";
import { select } from "async";

const api = require("../lib/api");

// sort and order
// main language
// pagination

const LANGUAGES = ["JavaScript", "HTML", "CSS", "TypeScript", "Java", "C"];
const SORT_TYPES = [
  {
    name: "Best Match",
  },
  {
    name: "Most Stars",
    value: "stars",
    order: "desc",
  },
  {
    name: "Least Stars",
    value: "stars",
    order: "asc",
  },
  {
    name: "Most Forks",
    value: "forks",
    order: "desc",
  },
  {
    name: "Least Forks",
    value: "forks",
    order: "asc",
  },
];

const selectedStyle = {
  borderLeft: "4px solid #abcdef",
  fontWeight: 100,
};

function Search({ router, repos }) {
  const { sort, order, lang, query } = router.query;

  const handleLanguageChange = (language) => {
    Router.push({
      pathname: "/search",
      query: {
        query,
        lang: language,
        sort,
        order,
      },
    });
  };

  const handleSortChange = (sort) => {
    Router.push({
      pathname: "/search",
      query: {
        query,
        lang,
        sort: sort.value,
        order: sort.order,
      },
    });
  };

  return (
    <div className="root">
      <Row gutter={20}>
        <Col span={6}>
          <List
            bordered
            header={<span className="list-header">Language</span>}
            style={{ marginTop: 20 }}
            dataSource={LANGUAGES}
            renderItem={(item) => {
              const selected = lang === item;
              return (
                <List.Item style={selected ? selectedStyle : null}>
                  {/* <Link href="/search"> */}
                  <a onClick={() => handleLanguageChange(item)}>{item}</a>
                  {/* </Link> */}
                </List.Item>
              );
            }}
          />
          <List
            bordered
            header={<span className="list-header">Sorting Order</span>}
            style={{ marginTop: 20 }}
            dataSource={SORT_TYPES}
            renderItem={(item) => {
              let selected = false;
              if (item.name === "Best Match" && !sort) {
                selected = true;
              } else if (item.value === sort && item.order === order) {
                selected = true;
              } else {
                selected = false;
              }
              return (
                <List.Item style={selected ? selectedStyle : null}>
                  {/* <Link href="/search"> */}
                  <a onClick={() => handleSortChange(item)}>{item.name}</a>
                  {/* </Link> */}
                </List.Item>
              );
            }}
          />
        </Col>
      </Row>
    </div>
  );
}

Search.getInitialProps = async (ctx) => {
  const { query, sort, lang, order, page } = ctx.query;

  if (!query) {
    return {
      repos: {
        total_count: 0,
      },
    };
  }

  let queryString = `?q=${query}`;
  if (lang) queryString += `+language:${lang}`;
  if (sort) queryString += `&sort=${sort}&order=${order || "desc"}`;
  if (page) queryString += `&page=${page}`;

  const result = await api.request(
    {
      url: `/search/repositories${queryString}`,
    },
    ctx.req,
    ctx.res
  );

  return {
    repos: result.data,
  };
};

export default withRouter(Search);

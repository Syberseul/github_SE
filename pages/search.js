import { memo, isValidElement } from "react";
import { withRouter } from "next/router";
import { Row, Col, List, Pagination } from "antd";
import Link from "next/link";

import Repo from "../components/Repo";

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
  color: "#abcdef",
};

function noop() {}

const per_page = 20;

const FilterLink = memo(({ name, query, lang, sort, order, page }) => {
  let queryString = `?query=${query}`;
  if (lang) queryString += `&lang=${lang}`;
  if (sort) queryString += `&sort=${sort}&order=${order || "desc"}`;
  if (page) queryString += `&page=${page}`;
  queryString += `&per_page=${per_page}`;

  return (
    <Link href={`/search${queryString}`}>
      {isValidElement(name) ? name : <a>{name}</a>}
    </Link>
  );
});
function Search({ router, repos }) {
  const { ...queries } = router.query;
  const { lang, sort, order, page } = router.query;

  return (
    <div className="root">
      <Row gutter={20}>
        <Col span={6}>
          <List
            bordered
            header={<span className="list-header">Language</span>}
            dataSource={LANGUAGES}
            renderItem={(item) => {
              const selected = lang === item;
              return (
                <List.Item style={selected ? selectedStyle : null}>
                  {selected ? (
                    <span>{item}</span>
                  ) : (
                    <FilterLink {...queries} lang={item} name={item} />
                  )}
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
                  {selected ? (
                    <span>{item.name}</span>
                  ) : (
                    <FilterLink
                      {...queries}
                      sort={item.value}
                      order={item.order}
                      name={item.name}
                    />
                  )}
                </List.Item>
              );
            }}
          />
        </Col>
        <Col span={18}>
          <h3 className="repos-title">Total Repos: {repos.total_count}</h3>
          {repos.items.map((repo) => (
            <Repo repo={repo} key={repo.id} />
          ))}
          <div className="pagination">
            <Pagination
              pageSize={per_page}
              current={Number(page) || 1}
              total={repos.total_count > 1000 ? 1000 : repos.total_count}
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} of ${total} items`
              }
              onChange={noop}
              itemRender={(page, type, originalElement) => {
                const p =
                  type === "page"
                    ? page
                    : type === "prev"
                    ? page <= 1
                      ? (page = 1)
                      : page
                    : page;
                const name = type === "page" ? page : originalElement;
                return <FilterLink {...queries} page={p} name={name} />;
              }}
            />
          </div>
        </Col>
      </Row>
      <style jsx>{`
        .root {
          padding: 20px 0;
        }
        .list-header {
          font-weight: 800px;
          font-size: 16px;
        }
        .repos-title {
          border-bottom: 1px solid #eee;
          font-size: 24px;
          line-height: 50px;
        }
        .pagination {
          padding: 20px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

Search.getInitialProps = async ({ ctx }) => {
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
  queryString += `&per_page=${per_page}`;

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

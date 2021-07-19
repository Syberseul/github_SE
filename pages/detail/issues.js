import { useState, useCallback } from "react";
import { Avatar, Button, Select, Spin } from "antd";
import dynamic from "next/dynamic";

import withRepoBasic from "../../components/with-repo-basic";
import SearchUser from "../../components/SearchUser";

import api from "../../lib/api";
import { getLastUpdated } from "../../lib/util";

const MarkdownRenderer = dynamic(() =>
  import("../../components/MarkdownRenderer")
);

function IssueDetail({ issue }) {
  return (
    <div className="root">
      <MarkdownRenderer content={issue.body} />
      <div className="actions">
        <Button href={issue.html_url} target="_blank">
          Open Issue
        </Button>
      </div>
      <style jsx>{`
        .root {
          background: #fefefe;
          padding: 20px;
        }
        .actions {
          text-align: right;
        }
      `}</style>
    </div>
  );
}

function IssueItem({ issue }) {
  const [showDetail, setShowDetail] = useState(false);

  const toggleShowDetail = useCallback(() => {
    setShowDetail((detail) => !detail);
  }, []);

  return (
    <>
      <div className="issue">
        <Button
          type="secondary"
          size="small"
          style={{ position: "absolute", right: 10, top: 10 }}
          onClick={toggleShowDetail}
        >
          {showDetail ? `Hide Detail` : `Show Detail`}
        </Button>
        <div className="avatar">
          <Avatar src={issue.user.avatar_url} shape="square" size={50} />
        </div>
        <div className="main-info">
          <h6>
            <span>{issue.title}</span>
          </h6>
          <p className="sub-info">
            <span>Updated at {getLastUpdated(issue.updated_at)}</span>
          </p>
        </div>
        <style jsx>{`
          .issue {
            display: flex;
            position: relative;
            padding: 10px;
          }
          .issue:hover {
            background: #fafafa;
          }
          .issue + .issue {
            border-top: 1px solid #eee;
          }
          .main-info > h6 {
            max-width: 600px;
            font-size: 16px;
            padding-right: 40px;
          }
          .avatar {
            margin-right: 20px;
          }
          .sub-info {
            margin-bottom: 0;
          }
          .sub-info > span + span {
            display: inline-block;
            margin-left: 20px;
            font-size: 12px;
          }
        `}</style>
      </div>
      {showDetail ? <IssueDetail issue={issue} /> : null}
    </>
  );
}

function makeQuery(creator, state, labels) {
  let creatorStr = creator ? `creator=${creator}` : "";
  let stateStr = state ? `state=${state}` : "";
  let labelStr = "";
  if (labels && labels.length > 0) {
    labelStr = `labels=${labels.join(",")}`;
  }

  const arr = [];
  if (creatorStr) arr.push(creatorStr);
  if (stateStr) arr.push(stateStr);
  if (labelStr) arr.push(labelStr);

  return `?${arr.join("&")}`;
}

const Option = Select.Option;

const Issues = ({ owner, name, initialIssues, labels }) => {
  // console.log(initialIssues);
  // console.log(labels);

  const [creator, setCreator] = useState("");
  const [state, setState] = useState();
  const [label, setLabel] = useState([]);
  const [issues, setIssues] = useState(initialIssues);
  const [fetching, setFetching] = useState(false);

  const handleCreatorChange = useCallback((value) => {
    setCreator(value);
  }, []);
  const handleStateChange = useCallback((value) => {
    setState(value);
  }, []);
  const handleLabelChange = useCallback((value) => {
    setLabel(value);
  }, []);
  const handleSearch = useCallback(() => {
    setFetching(true);
    api
      .request({
        url: `/repos/${owner}/${name}/issues${makeQuery(
          creator,
          state,
          label
        )}`,
      })
      .then((resp) => {
        setIssues(resp.data);
        setFetching(false);
      })
      .catch((err) => {
        console.error(err.message);
        setFetching(false);
      });
  }, [owner, name, creator, state, label]);

  return (
    <div className="root">
      <div className="search">
        {/* Search by user */}
        <SearchUser
          onChange={handleCreatorChange}
          value={creator || undefined}
        />
        {/* Search by issue status */}
        <Select
          placeholder="Status"
          onChange={handleStateChange}
          value={state}
          style={{ width: 150, marginLeft: 50 }}
        >
          <Option value="all">All Status</Option>
          <Option value="open">Open</Option>
          <Option value="closed">Closed</Option>
        </Select>
        {/* Search by issue labels */}
        <Select
          mode="multiple"
          placeholder="Labels"
          onChange={handleLabelChange}
          value={label}
          style={{ width: 150, marginLeft: 50, flexGrow: 1 }}
        >
          {labels.map((label) => (
            <Option value={label.name} key={label.id}>
              {label.name}
            </Option>
          ))}
        </Select>
        <Button
          type="primary"
          onClick={handleSearch}
          style={{ marginLeft: 50 }}
          disabled={fetching}
        >
          Search
        </Button>
      </div>
      {fetching ? (
        <div className="loading">
          <Spin />
        </div>
      ) : (
        <div className="issues">
          {issues.map((issue) => (
            <IssueItem issue={issue} key={issue.id} />
          ))}
        </div>
      )}
      <style jsx>{`
        .issues {
          border: 1px solid #eee;
          border-radius: 5px;
          margin-bottom: 20px;
          margin-top: 20px;
        }
        .search {
          display: flex;
        }
        .loading {
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

Issues.getInitialProps = async ({ ctx }) => {
  const { owner, name } = ctx.query;
  // console.log(owner, name);

  const fetchs = await Promise.all([
    await api.request(
      {
        url: `/repos/${owner}/${name}/issues`,
      },
      ctx.req,
      ctx.res
    ),
    await api.request(
      {
        url: `/repos/${owner}/${name}/labels`,
      },
      ctx.req,
      ctx.res
    ),
  ]);

  return {
    owner,
    name,
    initialIssues: fetchs[0].data,
    labels: fetchs[1].data,
  };
};

export default withRepoBasic(Issues, "issues");

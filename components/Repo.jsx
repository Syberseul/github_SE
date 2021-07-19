import Link from "next/link";

import StarIcon from "@material-ui/icons/Star";
import CallSplitIcon from "@material-ui/icons/CallSplit";

import { getLastUpdated } from "../lib/util";

function getLicense(license) {
  return license ? `${license.spdx_id} license` : "";
}

const Repo = ({ repo }) => {
  return (
    <div className="root">
      <div className="basic-info">
        <h3 className="repo-title">
          <Link href={`/detail?owner=${repo.owner.login}&name=${repo.name}`}>
            <a>{repo.full_name}</a>
          </Link>
        </h3>
        <p className="repo-desc">
          <em>{repo.description}</em>
        </p>
        <p className="other-info">
          <span className="last-updated">
            updated: {getLastUpdated(repo.updated_at)}
          </span>
          <br />
          <span className="open-issues">
            open issues: {repo.open_issues_count}
          </span>
          <br />
          {repo.license ? (
            <span className="license">{getLicense(repo.license)}</span>
          ) : null}
        </p>
      </div>
      <div className="lang-star">
        <span className="lang">{repo.language}</span>
        <div className="star-fork">
          <span className="stars">
            {repo.stargazers_count}
            <StarIcon fontSize="inherit" style={{ marginLeft: 2 }} />
          </span>
          <span className="forks">
            {repo.forks_count}
            <CallSplitIcon fontSize="inherit" style={{ marginLeft: 2 }} />
          </span>
        </div>
      </div>
      <style jsx>{`
        .root {
          display: flex;
          justify-content: space-between;
        }
        .root + .root {
          border-top: 1px solid #eee;
          padding-top: 20px;
        }
        .other-info > span {
          margin-right: 10px;
        }
        .repo-title {
          font-size: 20px;
        }
        .lang-star {
          display: flex;
          justify-content: space-between;
        }
        .lang-star > span {
          width: 120px;
        }
        .repo-desc {
          width: 400px;
        }
        .star-fork {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
      `}</style>
    </div>
  );
};

export default Repo;

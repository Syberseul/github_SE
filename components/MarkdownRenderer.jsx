import { memo, useMemo } from "react";
import MarkDownIt from "markdown-it";
import "github-markdown-css";

const md = new MarkDownIt({
  html: true, // let markdown accepts html tags
  linkify: true, // let markdown accepts pure url links
});

// transfer Chinese into readable x64 format text
function base64_to_utf8(str) {
  return decodeURIComponent(escape(atob(str)));
}

export default memo(function MarkdownRender({ content, isBase64 }) {
  const markdown = isBase64 ? base64_to_utf8(content) : content;

  const html = useMemo(() => md.render(markdown), [markdown]);

  return (
    <div className="markdown-body">
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </div>
  );
});

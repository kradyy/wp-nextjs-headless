import { v4 as uuid } from "uuid";
import ReactHtmlParser from "react-html-parser";

// Add a uniquie ID prop to the passed blocks
export const parseBlocks = (blocks) => {
  // Clean the block since its coming as immutable from GraphQL
  blocks = JSON.parse(JSON.stringify(blocks));

  let copiedBlocks = [...blocks];

  const AssignId = (b) => {
    b.forEach((block) => {
      if (block.innerBlocks?.length) {
        AssignId(block.innerBlocks);
      }

      if (!block.id) {
        block.id = uuid();
      }
    });
  };

  AssignId(copiedBlocks);

  return blocks;
};

export const parseBlockHTML = (htmlString = "") => {
  // TODO: Convert to Link component if needed
  // Strip away the site URL from the content
  let parsedHtml = htmlString
    .split(process.env.NEXT_PUBLIC_WP_SITE_URL)
    .join("");

  // Convert the HTML string to JSX
  parsedHtml = ReactHtmlParser(parsedHtml);

  return parsedHtml;
};

export const parseHTMLAttribute = (
  htmlString = "",
  querySelector = "div",
  attribute = ""
) => {
  if (!attribute) return "";

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const element = doc.querySelector(querySelector);

  return element.getAttribute(attribute);
};

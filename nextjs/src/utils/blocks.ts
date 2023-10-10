import { v4 as uuid } from "uuid";
import ReactHtmlParser from "react-html-parser";
import client from "@/client";
import { gql } from "@apollo/client";
import jsdom from "jsdom";

export async function getBlocks() {
  const { data } = await client.query({
    query: gql`
      query BlockQuery {
        nodeByUri(uri: "/") {
          ... on Page {
            id
            title
            blocks
          }
          ... on Property {
            id
            title
            blocks
          }
        }
      }
    `,
  });

  let blocks = data.nodeByUri.blocks;
  return parseBlocks(blocks);
}

export const parseBlocks = (blocks: GutenbergBlock[]) => {
  blocks = JSON.parse(JSON.stringify(blocks));

  let copiedBlocks = [...blocks];

  const AssignId = (b: any) => {
    b.forEach((block: GutenbergBlock) => {
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

  const { JSDOM } = jsdom;

  const dom = new JSDOM(htmlString);
  const element = dom.window.document.querySelector(querySelector);

  return element ? element.getAttribute(attribute) : null;
};

export const getBlockServerData = async (
  blocks: GutenbergBlock[],
  pageInfo: any
) => {
  const getBlock = async (block: GutenbergBlock, pageInfo: any) => {
    switch (block.name) {
      case "custom/some-block":
      default:
        null;
    }
  };

  {
    blocks.map((block) => {
      getBlock(block, pageInfo);

      if (block.innerBlocks.length > 0) {
        block.innerBlocks.map((innerBlock: any) => {
          getBlock(innerBlock, pageInfo);
        });
      }
    });

    return blocks;
  }
};

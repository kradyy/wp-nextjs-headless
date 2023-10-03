import React from "react";
import { parseBlocks } from "./blocks/helpers";
import { gql } from "@apollo/client";
import client from "@/client";

type PageProps = {
  slug: string[];
};

const fetchPage = async (params: PageProps) => {
  const slug = params.slug.join("/").toString();

  const { data } = await client.query({
    query: gql`
      query PageQuery($slug: String!) {
        pageBy(uri: $slug) {
          id
          title
          blocks
        }
      }
    `,
    variables: {
      slug: `${slug}`, // Prepend with "/" if needed
    },
  });

  // Throw 404 if page is not found
  if (!data.pageBy) {
    throw new TypeError("Ops, CMS didn't return a reasonable response.");
  }

  return {
    title: data.pageBy.title,
    blocks: parseBlocks(data.pageBy.blocks),
  };
};

const getAllPages = async () => {
  const { data } = await client.query({
    query: gql`
      query AllPages {
        pages {
          nodes {
            uri
          }
        }
        properties {
          nodes {
            uri
          }
        }
      }
    `,
  });

  return [...data.pages.nodes, ...data.properties.nodes];
};

export { fetchPage, getAllPages };

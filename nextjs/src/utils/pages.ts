import React from "react";
import { parseBlocks } from "./blocks";
import { gql } from "@apollo/client";
import client from "@/client";

const fetchPage = async (params: PageProps) => {
  const slug = params.slug.join("/").toString();

  const { data } = await client.query({
    query: gql`
      query PageQuery($slug: String!) {
        pageBy(uri: $slug) {
          id
          pageId
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
    ...data.pageBy,
    blocks: parseBlocks(data.pageBy.blocks),
  };
};

export const getAllPages = async () => {
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

export const getCurrentPage = async (slug: string) => {
  const { data } = await client.query({
    query: gql`
      query CurrentPage($slug: String!) {
        pageBy(uri: $slug) {
          id
          title
          blocks
        }
      }
    `,
    variables: {
      slug: `${slug}`,
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

export { fetchPage };

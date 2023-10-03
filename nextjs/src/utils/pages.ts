import React from "react";
import { getBlockServerData, parseBlocks } from "./blocks";
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
          __typename
          contentType {
            node {
              name
            }
          }
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

  // Fetch page ACF data
  const acf = await getAcfPageData(data);

  const pageInfo = {
    id: data.pageBy.id,
    title: data.pageBy.title,
    acfMeta: acf,
    params: { ...params },
  };

  // Fetch blocks
  const parsedBlocks = parseBlocks(data.pageBy.blocks);

  // Fetch blocks server data (if any)
  const blocks = await getBlockServerData(parsedBlocks, pageInfo);

  return {
    pageInfo: pageInfo,
    blocks: blocks,
  };
};

const getAcfPageData = async (page: any) => {
  const pageType = page.pageBy.contentType.node.name;
  const id = page.pageBy.id;

  if (!pageType || !id) return null;

  switch (pageType) {
    case "page":
    // No data
    case "property":
      const { data } = await client.query({
        query: gql`
          query MetaQuery($id: ID!) {
            property(id: $id) {
              propertyFeatures {
                price
                petFriendly
                hasParking
                bedrooms
                bathrooms
              }
            }
          }
        `,
        variables: { id: id },
      });

      const { __typename, ...propertyFeatures } =
        data.property.propertyFeatures;

      return {
        propertyFeatures: propertyFeatures,
      };
      break;
    default:
      return null;
  }
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

const getCurrentPage = async (slug: string) => {
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

export { fetchPage, getAllPages, getCurrentPage };

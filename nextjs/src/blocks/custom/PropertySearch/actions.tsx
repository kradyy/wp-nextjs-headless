"use server";

import client from "@/client";
import { gql } from "@apollo/client";

const formatMetaArray = (metaArray: any[]) => {
  const formattedArray = metaArray
    .map((item) => {
      return `{value: ${JSON.stringify(item.value)}, key: ${JSON.stringify(
        item.key
      )}, compare: ${item.compare}}`;
    })
    .join(", ");

  return `[${formattedArray}]`;
};

export const filterHandler = async (e: any) => {
  "use server";

  const { hasParking, petFriendly, minPrice, maxPrice, size, page } = e;

  let metaArray = [];

  if (hasParking !== undefined) {
    metaArray.push({
      value: hasParking ? "1" : "0",
      key: "has_parking",
      compare: "EQUAL_TO",
    });
  }

  if (petFriendly !== undefined) {
    metaArray.push({
      value: petFriendly ? "1" : "0",
      key: "pet_friendly",
      compare: "EQUAL_TO",
    });
  }

  // if (maxPrice !== undefined) {
  //   metaArray.push({
  //     value: maxPrice || "0",
  //     key: "price",
  //     compare: "LESS_THAN_OR_EQUAL_TO",
  //   });
  // }

  // if (minPrice !== undefined) {
  //   metaArray.push({
  //     value: minPrice || "0",
  //     key: "price",
  //     compare: "GREATER_THAN_OR_EQUAL_TO",
  //   });
  // }

  const offset = size * page;

  const metaText = formatMetaArray(metaArray);

  const { data } = await client.query({
    query: gql`
    query FilterQuery {
        properties (
          where: { 
              offsetPagination: { offset: ${offset}, size: ${size} } 
              metaQuery: {metaArray: ${metaText}, relation: AND}
            }
        ) {
          nodes {
            propertyFeatures {
              bathrooms
              bedrooms
              hasParking
              petFriendly
            }
            title
            uri
            databaseId
            featuredImage {
              node {
                uri
                sourceUrl
              }
            }
          }
          pageInfo {
            offsetPagination {
              total
            }
          }
        }
      }
    `,
  });

  return {
    properties: data.properties.nodes,
    pagination: { total: data.properties.pageInfo.offsetPagination.total },
  };
};

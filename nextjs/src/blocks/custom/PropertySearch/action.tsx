"use server";

import client from "@/client";
import { gql } from "@apollo/client";

export const filterHandler = async (e: any) => {
  "use server";

  // const formData: any = Array.from(e.entries()).reduce(
  //   (acc: any, [key, value]: any) => {
  //     acc[key] = value;
  //     return acc;
  //   },
  //   {}
  // );

  const { hasParking, petFriendly, minPrice, maxPrice, size, page } = e;

  let metaArray = [];

  if (hasParking !== undefined) {
    metaArray.push({
      value: hasParking,
      key: "has_parking",
      compare: "EQUAL_TO",
    });
  }

  if (petFriendly !== undefined) {
    metaArray.push({
      value: petFriendly,
      key: "pet_friendly",
      compare: "EQUAL_TO",
    });
  }

  const offset = size * page;

  const { data } = await client.query({
    query: gql`
      query NewQuery {
        properties(where: { 
          offsetPagination: { offset: ${offset}, size: ${size} },
          }) {
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

  console.log(data.properties.nodes);

  return {
    properties: data.properties.nodes,
    pagination: { total: data.properties.pageInfo.offsetPagination.total },
  };
};

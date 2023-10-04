"user server";

import client from "@/client";
import { gql } from "@apollo/client";

export const getMetaFields = async (propertyId: any) => {
  const { data } = await client.query({
    query: gql`
      query MenuQuery {
        property(id: ${propertyId}) {
          propertyFeatures {
            price
            petFriendly
            hasParking
            fieldGroupName
            bedrooms
            bathrooms
          }
        }
      }
    `,
  });

  console.log(data);

  // return {
  //   properties: data.properties.nodes,
  //   pagination: { total: data.properties.pageInfo.offsetPagination.total },
  // };
};

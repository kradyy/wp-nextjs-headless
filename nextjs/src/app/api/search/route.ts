import client from "@/client";
import { gql } from "@apollo/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // const searchParams = req.nextUrl.searchParams;

  // const offset = searchParams.get("offset") || 0;
  // const size = searchParams.get("size") || 1;

  const rawBody = await req.text();
  const body = JSON.parse(rawBody);

  const page = body.page || 0;
  const size = body.size || 1;
  const minPrice = body.minPrice || 0;
  const maxPrice = body.maxPrice || 999999;
  const hasParking = body.hasParking || false;
  const petFriendly = body.petFriendly || false;

  const offset = page * size;

  try {
    const { data } = await client.query({
      query: gql`
        query AllPagesQuery {
          properties(
            where: { offsetPagination: { offset: ${offset}, size: ${size} } }
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

    return NextResponse.json(
      {
        properties: data.properties.nodes,
        pagination: { total: data.properties.pageInfo.offsetPagination.total },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
}

import client from "@/client";
import { BlockParser } from "@/utils/blocks/helpers";
import { gql } from "@apollo/client";

export async function getBlocks() {
    const { data } = await client.query({
      query: gql`
        query NewQuery {
          nodeByUri(uri: "/") {
            ... on Page {
              id
              title
              blocks
            }
          }
        }
      `,
    });
  
    let blocks = data.nodeByUri.blocks;
    return BlockParser(blocks);
  }
  
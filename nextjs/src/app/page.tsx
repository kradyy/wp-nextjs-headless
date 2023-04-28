import Image from "next/image";
import { useQuery, gql } from "@apollo/client";
import client from "@/client";
import { BlockParser } from "@/utils/Blocks";
import HomePage from "@/pages/HomePage";

export default async function Home() {
  const blocks = await getBlocks();
  return <HomePage blocks={blocks} />;
}

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

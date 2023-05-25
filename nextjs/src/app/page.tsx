import Image from "next/image";
import { useQuery, gql } from "@apollo/client";
import client from "@/client";
import { BlockParser } from "@/utils/blocks/helpers";
import HomePage from "@/pages/HomePage";
import ClientOnly from "@/components/ClientOnly";
import { getBlocks } from "@/query/blocks";

export default async function Home() {
  const blocks = await getBlocks();
  console.log(blocks)
  return <ClientOnly>
       <HomePage blocks={blocks} />
    </ClientOnly>;
}
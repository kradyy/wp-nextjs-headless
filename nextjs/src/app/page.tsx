import Image from "next/image";
import { useQuery, gql } from "@apollo/client";
import client from "@/client";
import HomePage from "@/pages/HomePage";
import ClientOnly from "@/components/ClientOnly";
import { getBlocks } from "@/query/blocks";
import Header from "@/components/Header";

export default async function Home() {
  const blocks = await getBlocks();

  return <ClientOnly>
       <Header />
       <HomePage blocks={blocks} />
    </ClientOnly>;
}
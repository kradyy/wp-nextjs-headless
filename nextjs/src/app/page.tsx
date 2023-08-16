import Image from "next/image";
import { useQuery, gql } from "@apollo/client";
import HomePage from "@/pages/HomePage";
import ClientOnly from "@/components/ClientOnly";
import { getBlocks } from "@/query/blocks";
import Header from "@/components/Header";
import { getSettings } from "@/query/wp";
import { fetchPage } from "@/utils/pages";

export default async function Home() {
  const { title, blocks } = await fetchPage({ slug: ["/"] });
  const { generalSettingsTitle } = await getSettings();

  return (
    <ClientOnly>
      <Header pageTitle={generalSettingsTitle} />
      <HomePage blocks={blocks} />
    </ClientOnly>
  );
}

import { BlockRenderer } from "@/blocks/BlockRenderer";
import ClientPageContext from "@/components/ClientPageContext";
import Header from "@/components/Header";

import { fetchPage, getAllPages } from "@/utils/pages";
import { getSettings } from "@/utils/theme";

export default async function Page({ params }: { params: any }) {
  const { blocks, ...page } = await fetchPage(params);
  const { generalSettingsTitle } = await getSettings();

  return (
    <>
      <Header pageTitle={generalSettingsTitle} />
      <BlockRenderer blocks={blocks} params={params} />
    </>
  );
}

export async function generateStaticParams() {
  const pages = await getAllPages();

  return pages.map((page: any) => ({
    slug: page.uri.split("/").filter((item: any) => item !== ""),
  }));
}

export const dynamicParams = true;

import { BlockRenderer } from "@/blocks/BlockRenderer";
import Header from "@/components/Header";
import Page from "@/components/templates/Page";
import { fetchPage, getAllPages } from "@/utils/pages";

export default Page;

export async function generateStaticParams() {
  const pages = await getAllPages();

  return pages.map((page: any) => ({
    slug: page.uri.split("/").filter((item: any) => item !== ""),
  }));
}

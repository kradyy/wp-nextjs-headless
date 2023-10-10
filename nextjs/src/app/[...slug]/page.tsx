import { BlockRenderer } from "@/blocks/BlockRenderer";
import Header from "@/components/layout/Header";
import { fetchPage, getAllPages } from "@/utils/pages";
import { getSettings } from "@/utils/theme";

export default async function Page({ params }: { params: any }) {
  const { blocks, pageInfo } = await fetchPage(params);
  const { generalSettingsTitle } = await getSettings();

  return (
    <>
      <Header pageTitle={generalSettingsTitle} />
      <BlockRenderer blocks={blocks} pageInfo={pageInfo} />
    </>
  );
}

export async function generateStaticParams() {
  const pages = await getAllPages();

  return pages.map((page: any) => ({
    slug: page.uri.split("/").filter((item: any) => item !== ""),
  }));
}

// TODO: SEO
// Via, next-seo
// export async function generateMetadata({ params }: { params: any }) {
//   return {
//     title: "...",
//   };
// }

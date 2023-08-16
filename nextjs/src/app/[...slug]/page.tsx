export const dynamicParams = true;

import { BlockRenderer } from "@/blocks/BlockRenderer";
import Header from "@/components/Header";
import { getSettings } from "@/query/wp";
import { fetchPage, getAllPages } from "@/utils/pages";

export default async function Page({ params }: { params: any }) {
  const { title, blocks } = await fetchPage(params);
  const settings = await getSettings();

  return (
    <>
      <Header pageTitle={settings.generalSettingsTitle} />
      <BlockRenderer blocks={blocks} />
    </>
  );
}

export async function generateStaticParams() {
  const { paths } = await getAllPages();

  return paths.map((path: any) => ({
    slug: path.params.slug,
  }));
}

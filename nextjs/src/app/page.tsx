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

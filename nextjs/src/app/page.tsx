import { BlockRenderer } from "@/blocks/BlockRenderer";
import ClientPageContext from "@/components/ClientPageContext";
import Header from "@/components/Header";
import { fetchPage } from "@/utils/pages";
import { getSettings } from "@/utils/theme";

export default async function Home({ params }: { params: any }) {
  const { blocks, ...page } = await fetchPage({ slug: ["/"] });
  const { generalSettingsTitle } = await getSettings();

  return (
    <>
      <Header pageTitle={generalSettingsTitle} />
      <BlockRenderer blocks={blocks} params={params} />
    </>
  );
}

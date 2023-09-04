import { BlockRenderer } from "@/blocks/BlockRenderer";
import { getSettings } from "@/query/wp";
import { fetchPage } from "@/utils/pages";
import Header from "../Header";

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

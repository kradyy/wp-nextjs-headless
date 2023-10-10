import { Cover } from "@/blocks/core/Cover";
import { Heading } from "@/blocks/core/Heading";
import { Paragraph } from "@/blocks/core/Paragraph";
import { Columns } from "@/blocks/core/Columns";
import { Column } from "@/blocks/core/Column";
import { Image as ImageBlock } from "@/blocks/core/Image";
import { Group } from "@/blocks/core/Group";
import { Block } from "@/blocks/core/Block";
import { PostTitle } from "@/blocks/core/PostTitle";
import { Gallery } from "@/blocks/core/Gallery";

import { CtaButton } from "@/blocks/custom/CtaButton";

export const RenderBlock = (block: GutenbergBlock, pageInfo: any) => {
  switch (block.name) {
    case "core/cover":
      return <Cover key={block.id} block={block} pageInfo={pageInfo} />;
    case "core/paragraph":
      return <Paragraph key={block.id} block={block} />;
    case "core/heading":
      return <Heading key={block.id} block={block} />;
    case "core/columns":
      return <Columns key={block.id} block={block} />;
    case "core/column":
      return <Column key={block.id} block={block} />;
    case "core/image":
      return <ImageBlock key={block.id} block={block} />;
    case "core/group":
      return <Group key={block.id} block={block} />;
    case "core/block":
      return <Block key={block.id} block={block} />;
    case "core/post-title":
      return <PostTitle key={block.id} block={block} />;
    case "core/gallery":
      return <Gallery key={block.id} block={block} />;

    // Custom blocks
    case "custom/cta-button":
      return <CtaButton key={block.id} block={block} />;
    default:
      null;
  }
};

interface BlockRendererProps {
  blocks: GutenbergBlock[];
  pageInfo?: any;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({
  blocks,
  pageInfo = false,
}) => {
  return <>{blocks.map((block) => RenderBlock(block, pageInfo))}</>;
};

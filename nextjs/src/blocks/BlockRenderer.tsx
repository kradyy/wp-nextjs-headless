"use client";

import { Cover } from "@/blocks/core/Cover";
import { Heading } from "@/blocks/core/Heading";
import { Paragraph } from "@/blocks/core/Paragraph";
import { Columns } from "@/blocks/core/Columns";
import { Column } from "@/blocks/core/Column";
import { Image as ImageBlock } from "@/blocks/core/Image";
import { Group } from "@/blocks/core/Group";
import { Block } from "@/blocks/core/Block";

import { CtaButton } from "@/blocks/custom/CtaButton";

const RenderBlock = (block: GutenbergBlock) => {
  switch (block.name) {
    // Core blocks
    case "core/cover":
      return <Cover key={block.id} block={block} />;
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

    // Custom blocks
    case "custom/cta-button":
      return <CtaButton key={block.id} block={block} />;
    default:
      null;
  }
};

interface BlockRendererProps {
  blocks: GutenbergBlock[];
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ blocks }) => {
  return <>{blocks.map((block) => RenderBlock(block))}</>;
};

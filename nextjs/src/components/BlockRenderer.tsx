"use client";

import { Cover } from "@/blocks/core/Cover";
import { Heading } from "@/blocks/core/Heading";
import { Paragraph } from "@/blocks/core/Paragraph";

const RenderBlock = (block) => {
  switch (block.name) {
    case "core/cover":
      return (
        <Cover key={block.id} block={block} />
      );
      case "core/paragraph":
        return (
          <Paragraph key={block.id} block={block} />
        );
      case "core/heading":
        return (
          <Heading key={block.id} block={block} />
        );
    default:
      null;
  }
};

export const BlockRenderer = ({ blocks }) => {
  return blocks.map((block) => RenderBlock(block));
};

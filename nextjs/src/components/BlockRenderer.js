"use client";

import { Cover } from "@/blocks/Cover";

const RenderBlock = (block) => {
  switch (block.name) {
    case "core/cover":
      return (
        <Cover key={block.id} background={block.attributes.url}>
          test coversdads
        </Cover>
      );
    default:
      null;
  }
};

export const BlockRenderer = ({ blocks }) => {
  return blocks.map((block) => RenderBlock(block));
};

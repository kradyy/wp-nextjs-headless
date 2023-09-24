"use client";

import { BlockRenderer } from "@/blocks/BlockRenderer";

export const Block = ({ block }) => {
  const innerBlocks = block?.innerBlocks;

  return <>{innerBlocks && <BlockRenderer blocks={innerBlocks} />}</>;
};

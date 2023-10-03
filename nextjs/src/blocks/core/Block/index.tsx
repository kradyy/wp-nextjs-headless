"use client";

import { BlockRenderer } from "@/blocks/BlockRenderer";

interface BlockProps {
  block: GutenbergBlock;
  pageInfo?: any;
}

export const Block: React.FC<BlockProps> = ({ block, pageInfo }) => {
  const innerBlocks = block?.innerBlocks;

  return (
    <>
      {innerBlocks && (
        <BlockRenderer blocks={innerBlocks} pageInfo={pageInfo} />
      )}
    </>
  );
};

"use client";

import { BlockRenderer } from "@/blocks/BlockRenderer";
import classNames from "classnames";

interface BlockProps {
  block: GutenbergBlock;
  pageInfo?: any;
}

export const Column: React.FC<BlockProps> = ({ block, pageInfo }) => {
  const innerBlocks = block?.innerBlocks;

  const width = block.attributes?.width;

  const columnClass = classNames({
    "column-block": true,
    "flex-auto basis-0 grow-1": !width,
  });

  return (
    <div className={columnClass} style={{ width: width || false }}>
      {innerBlocks && (
        <BlockRenderer blocks={innerBlocks} pageInfo={pageInfo} />
      )}
    </div>
  );
};

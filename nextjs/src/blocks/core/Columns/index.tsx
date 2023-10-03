"use client";

import { BlockRenderer } from "@/blocks/BlockRenderer";
import { getGridCols } from "@/shared/blocks/elements";
import classNames from "classnames";

interface BlockProps {
  block: GutenbergBlock;
  pageInfo?: any;
}

export const Columns: React.FC<BlockProps> = ({ block, pageInfo }) => {
  const background = block.attributes.url;
  const innerBlocks = block?.innerBlocks;
  const isStackedOnMobile = block.attributes?.isStackedOnMobile;

  const columnsClass = classNames({
    "columns-block max-w-5xl": true,
    "block md:flex flex-wrap": isStackedOnMobile,
    "flex md:flex": !isStackedOnMobile,
  });

  return (
    <div className={columnsClass}>
      <BlockRenderer blocks={innerBlocks} pageInfo={pageInfo} />
    </div>
  );
};

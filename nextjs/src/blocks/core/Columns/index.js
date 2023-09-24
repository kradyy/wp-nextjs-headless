"use client";

import { BlockRenderer } from "@/blocks/BlockRenderer";
import { getGridCols } from "@/shared/blocks/elements";
import classNames from "classnames";

export const Columns = ({ block }) => {
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
      {innerBlocks && <BlockRenderer blocks={innerBlocks} />}
    </div>
  );
};

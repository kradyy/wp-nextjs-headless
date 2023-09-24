"use client";

import { BlockRenderer } from "@/blocks/BlockRenderer";
import classNames from "classnames";

export const Column = ({ block }) => {
  const background = block.attributes.url;
  const innerBlocks = block?.innerBlocks;

  const width = block.attributes?.width;

  const columnClass = classNames({
    "column-block": true,
    "flex-auto basis-0 grow-1": !width,
  });

  return (
    <div className={columnClass} style={{ width: width || false }}>
      {innerBlocks && <BlockRenderer blocks={innerBlocks} />}
    </div>
  );
};

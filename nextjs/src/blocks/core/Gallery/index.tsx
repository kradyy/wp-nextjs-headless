"use client";

import { BlockRenderer, RenderBlock } from "@/blocks/BlockRenderer";
import { getFlexWidth } from "@/shared/blocks/elements";
import { parseHTMLAttribute } from "@/utils/blocks";
import classNames from "classnames";
import NextImage from "next/image";

interface BlockProps {
  block: GutenbergBlock;
  pageInfo?: any;
}

export const Gallery: React.FC<BlockProps> = ({ block, pageInfo }) => {
  const innerBlocks = block?.innerBlocks;

  const { columns, imageCrop, linkTo } = block.attributes;

  console.log(imageCrop, innerBlocks.length);

  return (
    <div className={`gallery-block flex flex-wrap`}>
      {innerBlocks.map((block: GutenbergBlock, index: number) => {
        const imgClass = classNames({
          [getFlexWidth(columns)]: true,
          "flex-grow p-2": true,
          "[&>img]:h-full": imageCrop,
        });

        return (
          <div className={imgClass} key={index}>
            {RenderBlock(block, pageInfo)}
          </div>
        );
      })}
    </div>
  );
};

"use client";

import { parseHTMLAttribute } from "@/utils/blocks";
import NextImage from "next/image";

interface BlockProps {
  block: GutenbergBlock;
  pageInfo?: any;
}

export const Image: React.FC<BlockProps> = ({ block, pageInfo }) => {
  const innerBlocks = block?.innerBlocks;

  const alt = parseHTMLAttribute(block.originalContent, "img", "alt");
  const { url, width, height, id } = block.attributes;

  let imageUrl = url
    ? url
    : parseHTMLAttribute(block.originalContent, "img", "src");

  return (
    <NextImage
      src={imageUrl}
      width={width}
      height={height}
      alt={alt || "image"}
      className={`image-${id}`}
    />
  );
};

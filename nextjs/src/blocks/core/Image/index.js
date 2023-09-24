"use client";

import { parseHTMLAttribute } from "@/utils/blocks/helpers";
import NextImage from "next/image";

export const Image = ({ block }) => {
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
      alt={alt}
      className={`image-${id}`}
    />
  );
};

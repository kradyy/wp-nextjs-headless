"use client";

import { BlockRenderer } from "@/blocks/BlockRenderer";
import Image from "next/image";

interface BlockProps {
  block: GutenbergBlock;
}

export const Cover: React.FC<BlockProps> = ({ block }) => {
  const background = block.attributes.url;
  const innerBlocks = block?.innerBlocks;

  console.log(block);

  return (
    <div className="bg-slate-800 text-white h-100 min-h-[400px] flex justify-center items-center relative">
      <Image
        alt="cover"
        src={background}
        className="mix-blend-soft-light h-full object-cover"
        fill
      />
      <div className="max-w-5xl z-10">
        {innerBlocks && <BlockRenderer blocks={innerBlocks} />}
      </div>
    </div>
  );
};

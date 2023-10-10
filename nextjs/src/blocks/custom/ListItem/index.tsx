import { BlockRenderer } from "@/blocks/BlockRenderer";
import { getContainerAlign } from "@/shared/blocks/elements.js";
import classNames from "classnames";
import Link from "next/link";

interface BlockProps {
  block: GutenbergBlock;
}

export const ListItem: React.FC<BlockProps> = ({ block }) => {
  const background = block.attributes.url;
  const innerBlocks = block?.innerBlocks;

  const containerAlignment = classNames({
    "flex flex-row gap-2 items-center": true,
  });

  return (
    <div className={containerAlignment}>
      <div>✅</div>
      <div>
        <BlockRenderer blocks={innerBlocks} />
      </div>
    </div>
  );
};

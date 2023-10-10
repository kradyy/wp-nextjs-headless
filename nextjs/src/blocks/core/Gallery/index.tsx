import { RenderBlock } from "@/blocks/BlockRenderer";
import { getFlexWidth } from "@/shared/blocks/elements";
import classNames from "classnames";

interface BlockProps {
  block: GutenbergBlock;
  pageInfo?: any;
}

const DEFAULT_COLUMNS = 3;

export const Gallery: React.FC<BlockProps> = ({ block, pageInfo }) => {
  const innerBlocks = block?.innerBlocks;

  const { columns, imageCrop, linkTo } = block.attributes;

  return (
    <div className={`gallery-block flex flex-wrap`}>
      {innerBlocks.map((block: GutenbergBlock, index: number) => {
        const imgClass = classNames({
          [getFlexWidth(columns || DEFAULT_COLUMNS)]: true,
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

import { BlockRenderer } from "@/blocks/BlockRenderer";
import { getGridCols, getFlexAlign } from "@/shared/blocks/elements";
import classNames from "classnames";

interface BlockProps {
  block: GutenbergBlock;
  pageInfo?: any;
}

export const Columns: React.FC<BlockProps> = ({ block, pageInfo }) => {
  const innerBlocks = block?.innerBlocks;
  const isStackedOnMobile = block.attributes?.isStackedOnMobile;

  const { backgroundColor, textColor, verticalAlignment } = block.attributes;

  console.log(block.attributes);

  /*
  verticalAlignment: 'center',
  */

  const columnsClass = classNames({
    "columns-block max-w-5xl": true,
    "block md:flex flex-wrap": isStackedOnMobile,
    "flex md:flex": !isStackedOnMobile,
    [`bg-${backgroundColor}`]: backgroundColor,
    [`text-${textColor}`]: textColor,
    [`${getFlexAlign(verticalAlignment)}`]: verticalAlignment,
  });

  return (
    <div className={columnsClass}>
      <BlockRenderer blocks={innerBlocks} pageInfo={pageInfo} />
    </div>
  );
};

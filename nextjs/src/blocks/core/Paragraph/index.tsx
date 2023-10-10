import React from "react";
import classNames from "classnames";
import { getTextAlign, parseFontSize } from "@/shared/blocks/elements";
import { parseBlockHTML } from "@/utils/blocks";

interface BlockProps {
  block: GutenbergBlock;
  pageInfo?: any;
}

export const Paragraph: React.FC<BlockProps> = ({ block, pageInfo }) => {
  const { content, align, textColor, style, fontSize } = block?.attributes;

  const classes = classNames("paragraph", {
    [`${getTextAlign(align)}`]: align,
    [`${parseFontSize(fontSize)}`]: fontSize,
    [`text-${textColor}`]: textColor,
  });

  const styles = !style
    ? {}
    : {
        color: style?.color?.text || false,
      };

  return (
    <p className={classes} style={styles}>
      {parseBlockHTML(content)}
    </p>
  );
};

"use client";

import React from "react";
import classNames from "classnames";
import { getFontSize } from "@/shared/blocks/elements";

const DEFAULT_HEADING_LEVEL = 2;

interface BlockProps {
  block: GutenbergBlock;
  pageInfo?: any;
}

export const Heading: React.FC<BlockProps> = ({ block, pageInfo }) => {
  const { attributes } = block;

  const HeadingTag = `h${attributes.level || DEFAULT_HEADING_LEVEL}`; // set the heading tag based on level

  const headingClass = classNames({
    [`has-${attributes?.textColor}-color has-text-color`]:
      attributes?.textColor,
    [`${getFontSize(attributes.level)}`]: attributes.level,
    "max-w-5xl mx-auto my-5": true,
  });

  return React.createElement(
    HeadingTag,
    { className: headingClass },
    attributes?.content
  );
};

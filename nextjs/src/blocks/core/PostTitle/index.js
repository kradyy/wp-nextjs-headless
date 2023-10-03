"use client";

import classNames from "classnames";
import { getFontSize, getTextAlign } from "@/shared/blocks/elements.js";

const DEFAULT_HEADING_LEVEL = 2;

export const PostTitle = ({ block }) => {
  const { attributes } = block;

  const HeadingTag = `h${attributes.level || DEFAULT_HEADING_LEVEL}`;

  const headingClass = classNames({
    "max-w-5xl mx-auto my-5": true,
    [`${getTextAlign(attributes.textAlign)}`]: attributes.textAlign,
    [`${getFontSize(attributes.level)}`]: attributes.level,
  });

  return (
    <HeadingTag className={headingClass}>{attributes?.content}</HeadingTag>
  );
};

"use client";

import Image from "next/image";
import classNames from "classnames";
import { getFontSize, getTextAlign } from "@/shared/blocks/elements.js";

const DEFAULT_HEADING_LEVEL = 2;

export const Heading = ({ block }) => {
  const { attributes } = block;

  const HeadingTag = `h${attributes.level || DEFAULT_HEADING_LEVEL}`;

  const headingClass = classNames({
    "max-w-5xl mx-auto my-5": true,
    [`${getTextAlign(attributes.textAlign)}`]: attributes.textAlign,
    [`${getFontSize(attributes.level)}`]: attributes.level,
    [`has-${attributes?.textColor}-color has-text-color`]:
      attributes?.textColor,
  });

  console.log(block);

  return (
    <HeadingTag className={headingClass}>{attributes?.content}</HeadingTag>
  );
};

"use client"

import Image from "next/image";
import classNames from "classnames";
import { getFontSize } from "@/utils/blocks/elements";

const DEFAULT_HEADING_LEVEL = 2;

export const Heading = ({block}) => {
  const { attributes } = block
  
  const HeadingTag = `h${attributes.level || DEFAULT_HEADING_LEVEL}`; // set the heading tag based on level

  const textClass = classNames({
        [`has-${attributes?.textColor}-color has-text-color`]:  attributes?.textColor,
    });
  
  return (
    <HeadingTag className={`${textClass} ${getFontSize(attributes.level)} max-w-5xl mx-auto my-5`}>
      {attributes?.content}
    </HeadingTag>
  );
};

"use client";

import { BlockRenderer } from "@/blocks/BlockRenderer";
import { getContainerAlign } from "@/shared/blocks/elements.js";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";

export const CtaButton = ({ block }) => {
  const background = block.attributes.url;
  const innerBlocks = block?.innerBlocks;

  const {
    buttonText,
    buttonBgColor,
    buttonAlign,
    buttonLink,
    buttonTextColor,
  } = block?.attributes;

  const btnClass = classNames({
    [`bg-${buttonBgColor || "blue"}`]: buttonBgColor,
    [`text-${buttonTextColor | "white"}`]: buttonTextColor,
    "cta-button px-4 py-3 !text-white !no-underline !rounded-sm": true,
  });

  const containerAlignment = classNames({
    [`flex w-full ${getContainerAlign(buttonAlign)}`]: buttonAlign,
  });

  return (
    <div className={containerAlignment}>
      <Link href={buttonLink} role="button" className={btnClass}>
        {buttonText}
      </Link>
    </div>
  );
};

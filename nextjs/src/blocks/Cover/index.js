"use client"

import Image from "next/image";

export const Cover = ({ background, children }) => {
  return (
    <div className="bg-slate-800 h-100 min-h-[400px] flex justify-center items-center relative">
      <Image
        alt="cover"
        src={background}
        className="mix-blend-soft-light h-full object-cover"
        fill
      />
      {children}
    </div>
  );
};

import Link from "next/link";
import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ ...input }) => {
  return <input type="number" className="border border-blue" {...input} />;
};

export default Input;

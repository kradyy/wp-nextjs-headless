import Link from "next/link";
import React from "react";

interface ButtonProps {
  destination: string;
  label: string;
}

const Button: React.FC<ButtonProps> = ({ destination, label }) => {
  return (
    <Link href={destination} className="btn">
      {label}
    </Link>
  );
};

export default Button;

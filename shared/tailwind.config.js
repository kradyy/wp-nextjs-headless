/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Gutenberg - Wordpress
    "./src/blocks/**/*.{js,ts,jsx,tsx,mdx}",

    // NextJS
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/blocks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

    // Shared
    "./../shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // Safelist all colors and exempt them from purging
  purge: {
    safelist: [
      // BG
      "bg-pink",
      "bg-white",
      "bg-blue",
      "bg-current",
      "bg-transparent",
      "bg-blueDarker",
      // Text
      "text-pink",
      "text-white",
      "text-blue",
      "text-current",
      "text-transparent",
      "text-blueDarker",
    ],
  },
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      blue: "#374151",
      blueDarker: "#232c3a",
      pink: "#b250ba",
      white: "#fff",
    },
    extend: {
      fontFamily: {
        display: "var(--display-font)",
        body: "var(--body-font)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("tailwind-children")],
};

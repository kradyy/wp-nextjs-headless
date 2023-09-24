export const getTextAlign = (align = "left") => {
  const directions = {
    left: "text-left",
    right: "text-right",
    center: "text-center",
  };

  return directions[align] || "text-left";
};

// TODO: Currently not used
export const getGridCols = (cols = 1, breakOnMobile = true) => {
  if (cols > 6) cols = 6;

  let mobileCols = [
    "grid-cols-1",
    "grid-cols-2",
    "grid-cols-3",
    "grid-cols-4",
    "grid-cols-5",
    "grid-cols-6",
  ];

  let desktopCols = [
    "md:grid-cols-1",
    "md:grid-cols-2",
    "md:grid-cols-3",
    "md:grid-cols-4",
    "md:grid-cols-5",
    "md:grid-cols-6",
  ];

  const grid = cols
    ? breakOnMobile
      ? `grid-cols-1 ${desktopCols[cols - 1]}`
      : `grid-cols-${mobileCols[cols - 1]} ${desktopCols[cols - 1]}`
    : "grid-cols-auto md:grid-cols-auto";

  return grid;
};

export const getContainerAlign = (align = "center") => {
  const directions = {
    left: "justify-start",
    right: "justify-end",
    center: "justify-center",
  };

  return directions[align] || "justify-center";
};

export const getFontSize = (level = 1) => {
  const sizes = {
    1: "text-5xl",
    2: "text-5xl",
    3: "text-4xl",
    4: "text-3l",
    5: "text-2g",
    6: "text-xl",
  };

  return sizes[level] || sizes[1];
};

export const parseFontSize = (size = "large") => {
  const sizes = {
    base: "text-base",
    small: "text-sm",
    medium: "text-md",
    large: "text-lg",
    "extra-large": "text-xl",
  };

  return sizes[size] || sizes["base"];
};

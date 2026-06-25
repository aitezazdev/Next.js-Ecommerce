export const getSizesByCategory = (category: string) => {
  if (category === "shoes") {
    return ["6", "6.5", "7", "7.5", "8", "9", "10"];
  }

  return ["XS", "S", "M", "L", "XL"];
};

export const getCleanImageUrl = (url: string | undefined): string => {
  if (!url) return "/fallback.jpg";
  return url
    .replace(/\.png$/, ".webp")
    .replace("/shoes/shoes", "/shoes/shoe");
};

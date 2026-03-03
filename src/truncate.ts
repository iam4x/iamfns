export const truncate = (
  text: string,
  options: { length: number; omission?: string },
): string => {
  const { length, omission = "..." } = options;
  if (text.length <= length) return text;

  const truncatedLength = length - omission.length;
  if (truncatedLength < 1) return omission.slice(0, length);

  return text.slice(0, truncatedLength) + omission;
};

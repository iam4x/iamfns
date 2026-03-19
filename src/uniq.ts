export const uniq = <T extends string | number | boolean>(arr: T[]): T[] => {
  return [...new Set(arr)];
};

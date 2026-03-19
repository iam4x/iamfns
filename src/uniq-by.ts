export const uniqBy = <T, K extends keyof T>(
  arr: T[],
  key: K | ((item: T) => unknown),
): T[] => {
  const getKey = typeof key === "function" ? key : (item: T) => item[key];
  return [...new Map(arr.map((item) => [getKey(item), item])).values()] as T[];
};

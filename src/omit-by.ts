export const omitBy = <T extends Record<string, any>>(
  obj: T,
  filter: (key: keyof T, value: T[keyof T]) => boolean,
) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => !filter(key, value)),
  ) as T;
};

export const omit = <T extends Record<string, any>>(
  obj: T,
  keys: (keyof T)[],
): Omit<T, keyof T> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key as keyof T)),
  ) as Omit<T, keyof T>;
};

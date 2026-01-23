type OmitUndefined<T> = {
  [K in keyof T as undefined extends T[K]
    ? T[K] extends undefined
      ? never
      : K
    : K]: Exclude<T[K], undefined>;
};

export const omitUndefined = <T extends Record<string, any>>(
  obj: T,
): OmitUndefined<T> => {
  const result = {} as Record<string, any>;

  for (const key in obj) {
    if (obj[key] !== undefined) {
      result[key] = obj[key];
    }
  }

  return result as OmitUndefined<T>;
};

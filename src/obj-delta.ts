export const objDelta = <T extends Record<string, any>>(
  obj1: T,
  obj2: T,
): Partial<T> => {
  // Early return if obj2 is empty
  const obj2Keys = Object.keys(obj2);
  if (obj2Keys.length === 0) return {} as Partial<T>;

  const result = {} as Partial<T>;
  // Iterate over obj2 keys (typically fewer than obj1 keys)
  // Only include keys that exist in obj1 and have changed
  for (const key of obj2Keys as Array<keyof T>) {
    // Skip if key doesn't exist in obj1
    if (!(key in obj1)) continue;

    const value = obj2[key];
    // Skip undefined values and unchanged values
    if (value !== undefined && obj1[key] !== value) {
      result[key] = value;
    }
  }
  return result;
};

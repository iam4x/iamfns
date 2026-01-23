export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends object
      ? DeepPartial<T[P]>
      : T[P];
};

export const deepMerge = <T, S extends object = Record<never, never>>(
  target: T,
  source?: S,
): T & S => {
  // If source is not a non-null object, return target as is
  if (typeof source !== "object" || source === null) {
    return target as T & S;
  }
  // If target is not a non-null object, return source casted
  if (typeof target !== "object" || target === null) {
    return source as T & S;
  }
  // If both target and source are arrays, always keep source array (do not merge arrays)
  if (Array.isArray(target) && Array.isArray(source)) {
    return source as T & S;
  }

  // Merge objects
  const result = structuredClone(target) as any;

  for (const key of Object.keys(source)) {
    const srcValue = (source as any)[key];
    const tgtValue = (result as any)[key];
    // If target value is an array, always keep target array
    if (Array.isArray(tgtValue) || Array.isArray(srcValue)) {
      result[key] = srcValue;
    }
    // Deep merge objects
    else if (
      typeof srcValue === "object" &&
      srcValue !== null &&
      typeof tgtValue === "object" &&
      tgtValue !== null
    ) {
      result[key] = deepMerge(tgtValue, srcValue);
    } else {
      result[key] = srcValue;
    }
  }

  return result as T & S;
};

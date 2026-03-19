import { describe, test, expect } from "bun:test";

import { omitBy } from "./omit-by";

describe("omitBy", () => {
  test("should omit the entry when the predicate returns true", () => {
    const obj: Record<string, number> = { a: 1, b: 2, c: 3 };
    const result = omitBy(obj, (_key, value) => value === 2);
    expect(result).toEqual({ a: 1, c: 3 });
  });
});

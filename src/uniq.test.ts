import { test, describe, expect } from "bun:test";

import { uniq } from "./uniq";

describe("uniq", () => {
  test("should return an array of unique values", () => {
    expect(uniq([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  test("should return an array of unique strings", () => {
    expect(uniq(["a", "b", "c", "a", "d"])).toEqual(["a", "b", "c", "d"]);
  });

  test("should return an array of unique booleans", () => {
    expect(uniq([true, false, true, false])).toEqual([true, false]);
  });
});

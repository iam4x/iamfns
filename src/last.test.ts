import { describe, test, expect } from "bun:test";

import { last } from "./last";

describe("last", () => {
  test("should return the last element of the array", () => {
    expect(last([1, 2, 3])).toBe(3);
  });
});

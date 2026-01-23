import { describe, test, expect } from "bun:test";

import { take, takeRight } from "./take";

describe("take", () => {
  test("should return the first n elements of the array", () => {
    const array = [1, 2, 3, 4, 5];
    const result = take(array, 3);
    expect(result).toEqual([1, 2, 3]);
  });
});

describe("takeRight", () => {
  test("should return the last n elements of the array", () => {
    const array = [1, 2, 3, 4, 5];
    const result = takeRight(array, 3);
    expect(result).toEqual([3, 4, 5]);
  });
});

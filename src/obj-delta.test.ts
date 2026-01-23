import { describe, test, expect } from "bun:test";

import { objDelta } from "./obj-delta";

describe("objDelta", () => {
  test("should return empty object when no differences", () => {
    const obj1 = { a: 1, b: 2, c: 3 };
    const obj2 = { a: 1, b: 2, c: 3 };
    expect(objDelta(obj1, obj2)).toEqual({});
  });

  test("should return the delta between two objects with a single different value", () => {
    const obj1 = { a: 1, b: 2, c: 3 };
    const obj2 = { a: 1, b: 2, c: 4 };
    expect(objDelta(obj1, obj2)).toEqual({ c: 4 });
  });

  test("should return multiple changed properties", () => {
    const obj1 = { a: 1, b: 2, c: 3, d: 4 };
    const obj2 = { a: 10, b: 2, c: 30, d: 4 };
    expect(objDelta(obj1, obj2)).toEqual({ a: 10, c: 30 });
  });

  test("should handle empty objects", () => {
    const obj1 = {};
    const obj2 = {};
    expect(objDelta(obj1, obj2)).toEqual({});
  });

  test("should compare reference types by reference", () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3];
    const obj1 = { a: arr1, b: { x: 1 } };
    const obj2 = { a: arr1, b: { x: 1 } };

    // Same array reference should not be included in delta
    expect(objDelta(obj1, obj2)).toEqual({ b: obj2.b });

    // Different array with same content should be included in delta
    const obj3 = { a: arr1 };
    const obj4 = { a: arr2 };
    expect(objDelta(obj3, obj4)).toEqual({ a: arr2 });
  });

  test("should only compare keys from first object", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 10, b: 2, c: 30 };
    // Note: c is not in obj1, so it's not compared
    expect(objDelta(obj1, obj2)).toEqual({ a: 10 });
  });

  test("should exclude undefined values from delta", () => {
    const obj1 = { a: 1, b: 2, c: 3 };
    const obj2 = { a: 1, b: undefined, c: 4 };
    // b is undefined in obj2, so it should be excluded even though it changed
    expect(objDelta(obj1, obj2 as any)).toEqual({ c: 4 });
  });
});

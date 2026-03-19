import { describe, test, expect } from "bun:test";

import { omit } from "./omit";

describe("omit", () => {
  test("should omit the specified keys from the object", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit(obj, ["b"]);
    expect(result).toEqual({ a: 1, c: 3 });
  });

  test("should return the same object if no keys are specified", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit(obj, []);
    expect(result).toEqual(obj);
  });

  test("should return an empty object if all keys are specified", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit(obj, ["a", "b", "c"]);
    expect(result).toEqual({});
  });
});

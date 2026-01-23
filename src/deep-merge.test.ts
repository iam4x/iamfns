import { describe, test, expect } from "bun:test";

import { deepMerge } from "./deep-merge";

describe("deepMerge", () => {
  test("should return target when source is undefined", () => {
    const target = { a: 1, b: 2 };
    expect(deepMerge(target, undefined)).toEqual({ a: 1, b: 2 });
  });

  test("should return target when source is null", () => {
    const target = { a: 1, b: 2 };
    expect(deepMerge(target, null as any)).toEqual({ a: 1, b: 2 });
  });

  test("should return source when target is not an object", () => {
    const source = { a: 1 };
    expect(deepMerge(null as any, source)).toEqual({ a: 1 });
    expect(deepMerge(undefined as any, source)).toEqual({ a: 1 });
  });

  test("should merge flat objects", () => {
    const target = { a: 1, b: 2 };
    const source = { b: 3, c: 4 };
    expect(deepMerge(target, source)).toEqual({ a: 1, b: 3, c: 4 });
  });

  test("should merge nested objects", () => {
    const target = { a: 1, nested: { x: 10, y: 20 } };
    const source = { nested: { y: 30, z: 40 } };
    expect(deepMerge(target, source)).toEqual({
      a: 1,
      nested: { x: 10, y: 30, z: 40 },
    });
  });

  test("should merge deeply nested objects", () => {
    const target = {
      level1: {
        level2: {
          level3: { a: 1, b: 2 },
        },
      },
    };
    const source = {
      level1: {
        level2: {
          level3: { b: 3, c: 4 },
        },
      },
    };
    expect(deepMerge(target, source)).toEqual({
      level1: {
        level2: {
          level3: { a: 1, b: 3, c: 4 },
        },
      },
    });
  });

  test("should replace arrays instead of merging them", () => {
    const target = { items: [1, 2, 3] };
    const source = { items: [4, 5] };
    expect(deepMerge(target, source)).toEqual({ items: [4, 5] });
  });

  test("should replace top-level arrays", () => {
    const target = [1, 2, 3];
    const source = [4, 5];
    expect(deepMerge(target, source as any)).toEqual([4, 5]);
  });

  test("should replace nested arrays", () => {
    const target = {
      config: {
        values: [1, 2, 3],
        name: "test",
      },
    };
    const source = {
      config: {
        values: [10, 20],
      },
    };
    expect(deepMerge(target, source)).toEqual({
      config: {
        values: [10, 20],
        name: "test",
      },
    });
  });

  test("should handle empty objects", () => {
    expect(deepMerge({}, { a: 1 })).toEqual({ a: 1 });
    expect(deepMerge({ a: 1 }, {})).toEqual({ a: 1 });
    expect(deepMerge({}, {})).toEqual({});
  });

  test("should not mutate original target", () => {
    const target = { a: 1, nested: { b: 2 } };
    const source = { a: 10, nested: { c: 3 } };
    const result = deepMerge(target, source);

    expect(target).toEqual({ a: 1, nested: { b: 2 } });
    expect(result).toEqual({ a: 10, nested: { b: 2, c: 3 } });
  });

  test("should handle mixed nested structures", () => {
    const target = {
      user: {
        name: "John",
        settings: {
          theme: "dark",
          notifications: true,
        },
        tags: ["admin", "user"],
      },
    };
    const source = {
      user: {
        settings: {
          theme: "light",
          language: "en",
        },
        tags: ["superuser"],
      },
    };
    expect(deepMerge(target, source)).toEqual({
      user: {
        name: "John",
        settings: {
          theme: "light",
          notifications: true,
          language: "en",
        },
        tags: ["superuser"],
      },
    });
  });

  test("should handle null values in source overwriting target", () => {
    const target = { a: 1, b: { c: 2 } };
    const source = { b: null as unknown as { c: number } };
    const result = deepMerge(target, source);
    expect(result.a).toBe(1);
    expect(result.b).toBeNull();
  });

  test("should handle undefined values in source", () => {
    const target = { a: 1, b: 2 };
    const source = { b: undefined as unknown as number };
    const result = deepMerge(target, source);
    expect(result.a).toBe(1);
    expect(result.b).toBeUndefined();
  });

  test("should handle arrays of objects (replace, not merge)", () => {
    const target = {
      users: [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
      ],
    };
    const source = {
      users: [{ id: 3, name: "Charlie" }],
    };
    expect(deepMerge(target, source)).toEqual({
      users: [{ id: 3, name: "Charlie" }],
    });
  });

  test("should replace target object with source array", () => {
    const target = { items: { a: 1 } };
    const source = { items: [1, 2, 3] as unknown as { a: number } };
    const result = deepMerge(target, source) as unknown as { items: number[] };
    expect(Array.isArray(result.items)).toBe(true);
    expect(result.items).toEqual([1, 2, 3]);
  });

  test("should replace target array with source object", () => {
    const target = { items: [1, 2, 3] };
    const source = { items: { a: 1 } as unknown as number[] };
    const result = deepMerge(target, source) as unknown as {
      items: { a: number };
    };
    expect(Array.isArray(result.items)).toBe(false);
    expect(result.items).toEqual({ a: 1 });
  });

  test("should handle primitive source values", () => {
    const target = { a: 1 };
    expect(deepMerge(target, 42 as any)).toEqual({ a: 1 });
    expect(deepMerge(target, "string" as any)).toEqual({ a: 1 });
    expect(deepMerge(target, true as any)).toEqual({ a: 1 });
  });
});

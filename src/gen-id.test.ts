import { test, describe, expect } from "bun:test";

import { genId } from "./gen-id";

describe("genId", () => {
  test("should return a string", () => {
    expect(typeof genId()).toBe("string");
  });

  test("should generate a 16-character string", () => {
    const id = genId();
    expect(id.length).toBe(16);
  });

  test("should only contain alphanumeric characters (base36)", () => {
    const id = genId();
    expect(id).toMatch(/^[a-z0-9]+$/);
  });

  test("should generate unique IDs", () => {
    const ids = new Set<string>();
    for (let i = 0; i < 1000; i++) {
      ids.add(genId());
    }
    expect(ids.size).toBe(1000);
  });

  test("should generate different IDs on each call", () => {
    const id1 = genId();
    const id2 = genId();
    expect(id1).not.toBe(id2);
  });
});

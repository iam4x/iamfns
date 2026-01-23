import { test, describe, expect } from "bun:test";

import { genIntId } from "./gen-int-id";

describe("genIntId", () => {
  test("should generate a random integer", () => {
    expect(genIntId()).toBeGreaterThan(0);
    expect(genIntId()).toBeLessThan(1000000);
  });
});

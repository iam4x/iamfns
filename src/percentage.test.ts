import { describe, test, expect } from "bun:test";

import { calcPercent } from "./percentage";

describe("calcPercent", () => {
  test("should calculate positive percentage change", () => {
    expect(calcPercent({ now: 150, start: 100 })).toBe(50);
  });

  test("should calculate negative percentage change", () => {
    expect(calcPercent({ now: 50, start: 100 })).toBe(-50);
  });

  test("should return 0 when there is no change", () => {
    expect(calcPercent({ now: 100, start: 100 })).toBe(0);
  });

  test("should return 0 when both start and now are 0", () => {
    expect(calcPercent({ now: 0, start: 0 })).toBe(0);
  });

  test("should return Infinity when start is 0 and now is not 0", () => {
    expect(calcPercent({ now: 100, start: 0 })).toBe(Infinity);
  });

  test("should handle decimal values", () => {
    expect(calcPercent({ now: 1.5, start: 1 })).toBe(50);
  });

  test("should handle negative values", () => {
    expect(calcPercent({ now: -50, start: -100 })).toBe(-50);
  });
});

import { describe, test, expect } from "bun:test";

import { calcVolatility } from "./volatility";

describe("calcVolatility", () => {
  test("should return 0 for empty array", () => {
    expect(calcVolatility([])).toBe(0);
  });

  test("should return 0 for single value", () => {
    expect(calcVolatility([100])).toBe(0);
  });

  test("should return 0 for two values (only one percentage change)", () => {
    expect(calcVolatility([100, 110])).toBe(0);
  });

  test("should return 0 for constant values (no volatility)", () => {
    expect(calcVolatility([100, 100, 100, 100])).toBe(0);
  });

  test("should return 0 for consistent percentage changes", () => {
    // Doubling each time: 100 -> 200 -> 400 (100% change each time)
    expect(calcVolatility([100, 200, 400])).toBe(0);
  });

  test("should calculate volatility for varying percentage changes", () => {
    // 100 -> 110 (10%) -> 100 (-9.09%)
    const result = calcVolatility([100, 110, 100]);
    expect(result).toBeGreaterThan(0);
    expect(result).toBeCloseTo(13.49, 1);
  });

  test("should handle larger datasets", () => {
    const values = [100, 105, 102, 108, 106, 110];
    const result = calcVolatility(values);
    expect(result).toBeGreaterThan(0);
  });

  test("should handle decreasing values", () => {
    const values = [100, 90, 95, 85];
    const result = calcVolatility(values);
    expect(result).toBeGreaterThan(0);
  });
});

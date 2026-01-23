import { describe, expect, test } from "bun:test";

import { abbreviateNumber } from "./abbreviate-number";

describe("abbreviateNumber", () => {
  test("should return number as-is when less than 1000", () => {
    expect(abbreviateNumber(0)).toBe(0);
    expect(abbreviateNumber(1)).toBe(1);
    expect(abbreviateNumber(99)).toBe(99);
    expect(abbreviateNumber(100)).toBe(100);
    expect(abbreviateNumber(500)).toBe(500);
    expect(abbreviateNumber(999)).toBe(999);
    expect(abbreviateNumber(-100)).toBe(-100);
  });

  test("should abbreviate thousands (K)", () => {
    expect(abbreviateNumber(1000)).toBe("1K");
    expect(abbreviateNumber(1500)).toBe("1.5K");
    expect(abbreviateNumber(9999)).toBe("10K");
    expect(abbreviateNumber(50000)).toBe("50K");
    expect(abbreviateNumber(999999)).toBe("1000K");
  });

  test("should abbreviate millions (m)", () => {
    expect(abbreviateNumber(1000000)).toBe("1m");
    expect(abbreviateNumber(1500000)).toBe("1.5m");
    expect(abbreviateNumber(9999999)).toBe("10m");
    expect(abbreviateNumber(50000000)).toBe("50m");
    expect(abbreviateNumber(999999999)).toBe("1000m");
  });

  test("should abbreviate billions (b)", () => {
    expect(abbreviateNumber(1000000000)).toBe("1b");
    expect(abbreviateNumber(1500000000)).toBe("1.5b");
    expect(abbreviateNumber(9999999999)).toBe("10b");
    expect(abbreviateNumber(50000000000)).toBe("50b");
    expect(abbreviateNumber(999999999999)).toBe("1000b");
  });

  test("should abbreviate trillions (t)", () => {
    expect(abbreviateNumber(1000000000000)).toBe("1t");
    expect(abbreviateNumber(1500000000000)).toBe("1.5t");
    expect(abbreviateNumber(9999999999999)).toBe("10t");
    expect(abbreviateNumber(50000000000000)).toBe("50t");
  });

  test("should handle edge cases at boundaries", () => {
    expect(abbreviateNumber(999)).toBe(999);
    expect(abbreviateNumber(1000)).toBe("1K");
    expect(abbreviateNumber(999999)).toBe("1000K");
    expect(abbreviateNumber(1000000)).toBe("1m");
    expect(abbreviateNumber(999999999)).toBe("1000m");
    expect(abbreviateNumber(1000000000)).toBe("1b");
    expect(abbreviateNumber(999999999999)).toBe("1000b");
    expect(abbreviateNumber(1000000000000)).toBe("1t");
  });

  test("should handle decimal numbers", () => {
    expect(abbreviateNumber(1000.5)).toBe("1K");
    expect(abbreviateNumber(1500.75)).toBe("1.5K");
    expect(abbreviateNumber(1000000.99)).toBe("1m");
  });

  test("should handle very large numbers", () => {
    expect(abbreviateNumber(1e15)).toBe("1000t");
    expect(abbreviateNumber(1e18)).toBe("1000000t");
  });

  test("should abbreviate negative numbers", () => {
    expect(abbreviateNumber(-1000)).toBe("-1K");
    expect(abbreviateNumber(-1500)).toBe("-1.5K");
    expect(abbreviateNumber(-50000)).toBe("-50K");
    expect(abbreviateNumber(-1000000)).toBe("-1m");
    expect(abbreviateNumber(-1500000)).toBe("-1.5m");
    expect(abbreviateNumber(-1000000000)).toBe("-1b");
    expect(abbreviateNumber(-1500000000)).toBe("-1.5b");
    expect(abbreviateNumber(-1000000000000)).toBe("-1t");
    expect(abbreviateNumber(-1500000000000)).toBe("-1.5t");
  });
});

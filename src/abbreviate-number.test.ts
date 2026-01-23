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

  test("should abbreviate millions (M)", () => {
    expect(abbreviateNumber(1000000)).toBe("1M");
    expect(abbreviateNumber(1500000)).toBe("1.5M");
    expect(abbreviateNumber(9999999)).toBe("10M");
    expect(abbreviateNumber(50000000)).toBe("50M");
    expect(abbreviateNumber(999999999)).toBe("1000M");
  });

  test("should abbreviate billions (B)", () => {
    expect(abbreviateNumber(1000000000)).toBe("1B");
    expect(abbreviateNumber(1500000000)).toBe("1.5B");
    expect(abbreviateNumber(9999999999)).toBe("10B");
    expect(abbreviateNumber(50000000000)).toBe("50B");
    expect(abbreviateNumber(999999999999)).toBe("1000B");
  });

  test("should abbreviate trillions (T)", () => {
    expect(abbreviateNumber(1000000000000)).toBe("1T");
    expect(abbreviateNumber(1500000000000)).toBe("1.5T");
    expect(abbreviateNumber(9999999999999)).toBe("10T");
    expect(abbreviateNumber(50000000000000)).toBe("50T");
  });

  test("should handle edge cases at boundaries", () => {
    expect(abbreviateNumber(999)).toBe(999);
    expect(abbreviateNumber(1000)).toBe("1K");
    expect(abbreviateNumber(999999)).toBe("1000K");
    expect(abbreviateNumber(1000000)).toBe("1M");
    expect(abbreviateNumber(999999999)).toBe("1000M");
    expect(abbreviateNumber(1000000000)).toBe("1B");
    expect(abbreviateNumber(999999999999)).toBe("1000B");
    expect(abbreviateNumber(1000000000000)).toBe("1T");
  });

  test("should handle decimal numbers", () => {
    expect(abbreviateNumber(1000.5)).toBe("1K");
    expect(abbreviateNumber(1500.75)).toBe("1.5K");
    expect(abbreviateNumber(1000000.99)).toBe("1M");
  });

  test("should handle very large numbers", () => {
    expect(abbreviateNumber(1e15)).toBe("1000T");
    expect(abbreviateNumber(1e18)).toBe("1000000T");
  });

  test("should abbreviate negative numbers", () => {
    expect(abbreviateNumber(-1000)).toBe("-1K");
    expect(abbreviateNumber(-1500)).toBe("-1.5K");
    expect(abbreviateNumber(-50000)).toBe("-50K");
    expect(abbreviateNumber(-1000000)).toBe("-1M");
    expect(abbreviateNumber(-1500000)).toBe("-1.5M");
    expect(abbreviateNumber(-1000000000)).toBe("-1B");
    expect(abbreviateNumber(-1000000000000)).toBe("-1T");
  });
});

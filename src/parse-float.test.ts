import { describe, expect, test } from "bun:test";

import { pFloat } from "./parse-float";

describe("pFloat", () => {
  test("should return NaN when value is undefined", () => {
    const result = pFloat(undefined);
    expect(result).toBeNaN();
  });

  test("should return the number as-is when value is a number", () => {
    expect(pFloat(42)).toBe(42);
    expect(pFloat(0)).toBe(0);
    expect(pFloat(-10)).toBe(-10);
    expect(pFloat(3.14)).toBe(3.14);
    expect(pFloat(1e6)).toBe(1000000);
  });

  test("should parse string with dot as decimal separator", () => {
    expect(pFloat("42")).toBe(42);
    expect(pFloat("3.14")).toBe(3.14);
    expect(pFloat("0.5")).toBe(0.5);
    expect(pFloat("-10.5")).toBe(-10.5);
    expect(pFloat("1000.99")).toBe(1000.99);
  });

  test("should replace commas with dots and parse", () => {
    expect(pFloat("3,14")).toBe(3.14);
    expect(pFloat("1,000")).toBe(1);
    expect(pFloat("10,50")).toBe(10.5);
    // When both comma and dot exist, all commas become dots and parseFloat stops at first dot
    expect(pFloat("1,234.56")).toBe(1.234);
  });

  test("should handle multiple commas", () => {
    // Multiple commas all become dots, parseFloat stops at first dot
    expect(pFloat("1,234,567")).toBe(1.234);
    expect(pFloat("10,50,30")).toBe(10.5);
  });

  test("should return NaN for invalid strings", () => {
    expect(pFloat("invalid")).toBeNaN();
    expect(pFloat("abc")).toBeNaN();
    expect(pFloat("")).toBeNaN();
    expect(pFloat("  ")).toBeNaN();
  });

  test("should handle strings with leading/trailing whitespace", () => {
    expect(pFloat(" 42 ")).toBe(42);
    expect(pFloat("  3.14  ")).toBe(3.14);
  });

  test("should parse scientific notation", () => {
    expect(pFloat("1e6")).toBe(1000000);
    expect(pFloat("2.5e3")).toBe(2500);
  });
});

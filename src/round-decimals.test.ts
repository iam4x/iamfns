import { describe, expect, test } from "bun:test";

import { roundDecimals } from "./round-decimals";

describe("roundDecimals", () => {
  test("should round to 0 decimal places", () => {
    expect(roundDecimals(3.14, 0)).toBe(3);
    expect(roundDecimals(3.5, 0)).toBe(4);
    expect(roundDecimals(3.49, 0)).toBe(3);
    expect(roundDecimals(10.9, 0)).toBe(11);
    expect(roundDecimals(10.1, 0)).toBe(10);
  });

  test("should round to 1 decimal place", () => {
    expect(roundDecimals(3.14, 1)).toBe(3.1);
    expect(roundDecimals(3.15, 1)).toBe(3.2);
    expect(roundDecimals(3.149, 1)).toBe(3.1);
    expect(roundDecimals(10.99, 1)).toBe(11);
    expect(roundDecimals(10.91, 1)).toBe(10.9);
  });

  test("should round to 2 decimal places", () => {
    expect(roundDecimals(3.14159, 2)).toBe(3.14);
    expect(roundDecimals(3.145, 2)).toBe(3.15);
    expect(roundDecimals(3.144, 2)).toBe(3.14);
    expect(roundDecimals(10.999, 2)).toBe(11);
    expect(roundDecimals(10.995, 2)).toBe(11);
  });

  test("should round to multiple decimal places", () => {
    expect(roundDecimals(3.14159265359, 3)).toBe(3.142);
    expect(roundDecimals(3.14159265359, 4)).toBe(3.1416);
    expect(roundDecimals(3.14159265359, 5)).toBe(3.14159);
    expect(roundDecimals(1.23456789, 6)).toBe(1.234568);
  });

  test("should handle negative numbers", () => {
    expect(roundDecimals(-3.14, 1)).toBe(-3.1);
    expect(roundDecimals(-3.15, 1)).toBe(-3.1); // Math.round rounds towards positive infinity
    expect(roundDecimals(-3.16, 1)).toBe(-3.2);
    expect(roundDecimals(-3.145, 2)).toBe(-3.14); // Math.round(-314.5) = -314
    expect(roundDecimals(-3.146, 2)).toBe(-3.15);
    expect(roundDecimals(-10.999, 2)).toBe(-11);
  });

  test("should handle zero", () => {
    expect(roundDecimals(0, 0)).toBe(0);
    expect(roundDecimals(0, 2)).toBe(0);
    expect(roundDecimals(0, 5)).toBe(0);
  });

  test("should handle integers", () => {
    expect(roundDecimals(5, 0)).toBe(5);
    expect(roundDecimals(5, 2)).toBe(5);
    expect(roundDecimals(100, 3)).toBe(100);
  });

  test("should handle floating point precision issues", () => {
    // Common floating point issue: 0.1 + 0.2 = 0.30000000000000004
    expect(roundDecimals(0.1 + 0.2, 1)).toBe(0.3);
    expect(roundDecimals(0.1 + 0.2, 2)).toBe(0.3);

    // Note: 1.005 * 100 = 100.49999999999999 due to floating point precision
    // This is a known limitation of the implementation
    expect(roundDecimals(1.005, 2)).toBe(1);
    expect(roundDecimals(1.006, 2)).toBe(1.01);
  });

  test("should handle large numbers", () => {
    expect(roundDecimals(1234567.891234, 2)).toBe(1234567.89);
    expect(roundDecimals(999999.999, 1)).toBe(1000000);
    expect(roundDecimals(1000000.555, 0)).toBe(1000001);
  });

  test("should handle very small numbers", () => {
    expect(roundDecimals(0.00001, 4)).toBe(0);
    expect(roundDecimals(0.00001, 5)).toBe(0.00001);
    expect(roundDecimals(0.001234567, 6)).toBe(0.001235);
  });

  test("should handle numbers with trailing zeros", () => {
    expect(roundDecimals(5.0, 2)).toBe(5);
    expect(roundDecimals(10.5, 2)).toBe(10.5);
    expect(roundDecimals(3.2, 1)).toBe(3.2);
  });
});

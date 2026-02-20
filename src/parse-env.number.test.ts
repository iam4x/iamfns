import { describe, expect, test } from "bun:test";

import { parseEnvNumber } from "./parse-env-number";

describe("parseEnvNumber", () => {
  test("returns the parsed number for a positive integer string", () => {
    expect(parseEnvNumber("42", 10)).toBe(42);
  });

  test("returns fallback when value is undefined", () => {
    expect(parseEnvNumber(undefined, 10)).toBe(10);
  });

  test("returns fallback when value is not a valid number", () => {
    expect(parseEnvNumber("abc", 10)).toBe(10);
  });

  test("returns fallback when parsed value is zero or negative", () => {
    expect(parseEnvNumber("0", 10)).toBe(10);
    expect(parseEnvNumber("-1", 10)).toBe(10);
  });

  test("uses parseInt semantics and returns parsed prefix for mixed values", () => {
    expect(parseEnvNumber("12px", 10)).toBe(12);
  });
});

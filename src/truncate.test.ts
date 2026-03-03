import { describe, test, expect } from "bun:test";

import { truncate } from "./truncate";

describe("truncate", () => {
  test("returns the original text when it fits within the length", () => {
    expect(truncate("hello", { length: 10 })).toBe("hello");
  });

  test("returns the original text when it equals the length exactly", () => {
    expect(truncate("hello", { length: 5 })).toBe("hello");
  });

  test("truncates text and appends the default omission '...'", () => {
    expect(truncate("hello world", { length: 8 })).toBe("hello...");
  });

  test("truncates text and appends a custom omission", () => {
    expect(truncate("hello world", { length: 8, omission: "…" })).toBe(
      "hello w…",
    );
  });

  test("handles omission longer than or equal to the length", () => {
    expect(truncate("hello world", { length: 2 })).toBe("..");
  });

  test("handles empty string", () => {
    expect(truncate("", { length: 5 })).toBe("");
  });

  test("handles empty omission", () => {
    expect(truncate("hello world", { length: 5, omission: "" })).toBe("hello");
  });
});

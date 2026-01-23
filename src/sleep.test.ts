import { describe, test, expect } from "bun:test";

import { sleep } from "./sleep";

describe("sleep", () => {
  test("should return a promise", () => {
    const result = sleep(0);
    expect(result).toBeInstanceOf(Promise);
  });

  test("should resolve after the specified time", async () => {
    const result = await sleep(1);
    expect(result).toBeUndefined();
  });
});

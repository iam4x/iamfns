import { test, describe, expect } from "bun:test";

import { uniqBy } from "./uniq-by";

describe("uniqBy", () => {
  test("should return an array of unique values by key", () => {
    expect(uniqBy([{ id: 1 }, { id: 2 }, { id: 1 }], "id")).toEqual([
      { id: 1 },
      { id: 2 },
    ]);
  });

  test("should return an array of unique values by function", () => {
    expect(
      uniqBy([{ id: 1 }, { id: 2 }, { id: 1 }], (item) => item.id),
    ).toEqual([{ id: 1 }, { id: 2 }]);
  });
});

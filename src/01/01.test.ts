import { describe, expect, it } from "bun:test";
import { partOne } from "./01";

describe("Day 1", () => {
  describe.only("Part One", () => {
    partOne("");
    it("should return 0", () => {
      expect(0).toEqual(0);
    });
  });

  describe("Part Two", () => {});
});

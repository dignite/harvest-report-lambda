import { startOfMonth } from "./date";
import MockDate from "mockdate";

describe("date", () => {
  describe(startOfMonth, () => {
    test("should find October 1st", () => {
      MockDate.set(new Date("2018-10-17"));

      expect(startOfMonth()).toEqual(new Date("2018-10-01T00:00:00.000Z"));
    });
    test("should find November 1st", () => {
      MockDate.set(new Date("2018-11-01"));

      expect(startOfMonth()).toEqual(new Date("2018-11-01T00:00:00.000Z"));
    });
  });

  afterEach(MockDate.reset);
});

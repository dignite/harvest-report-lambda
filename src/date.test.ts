import { startOfLastMonth } from "./date";
import MockDate from "mockdate";

describe("date", () => {
  describe(startOfLastMonth, () => {
    test("should find September 1st", () => {
      MockDate.set(new Date("2018-10-17"));

      expect(startOfLastMonth()).toEqual(new Date("2018-09-01T00:00:00.000Z"));
    });
    test("should find October 1st", () => {
      MockDate.set(new Date("2018-11-01"));

      expect(startOfLastMonth()).toEqual(new Date("2018-10-01T00:00:00.000Z"));
    });

    test("should find December 1st", () => {
      MockDate.set(new Date("2019-01-11"));

      expect(startOfLastMonth()).toEqual(new Date("2018-12-01T00:00:00.000Z"));
    });
  });

  afterEach(MockDate.reset);
});

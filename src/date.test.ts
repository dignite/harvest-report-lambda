import { startOfLastMonth } from "./date";
import MockDate from "mockdate";

describe("date", () => {
  describe("startOfLastMonth function", () => {
    it("should find September 1st", () => {
      expect.assertions(1);
      try {
        MockDate.set(new Date("2018-10-17"));

        expect(startOfLastMonth()).toStrictEqual(
          new Date("2018-09-01T00:00:00.000Z")
        );
      } finally {
        MockDate.reset();
      }
    });
    it("should find October 1st", () => {
      expect.assertions(1);
      try {
        MockDate.set(new Date("2018-11-01"));

        expect(startOfLastMonth()).toStrictEqual(
          new Date("2018-10-01T00:00:00.000Z")
        );
      } finally {
        MockDate.reset();
      }
    });

    it("should find December 1st", () => {
      expect.assertions(1);
      try {
        MockDate.set(new Date("2019-01-11"));

        expect(startOfLastMonth()).toStrictEqual(
          new Date("2018-12-01T00:00:00.000Z")
        );
      } finally {
        MockDate.reset();
      }
    });
  });
});

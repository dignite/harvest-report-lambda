import { startOfMonth, lastDayOfMonth } from "./date";
import MockDate from "mockdate";

describe("date", () => {
  describe("startOfMonth function", () => {
    it("should find September 1st", () => {
      expect.assertions(1);
      try {
        MockDate.set(new Date("2018-09-17"));

        expect(startOfMonth()).toStrictEqual(
          new Date("2018-09-01T00:00:00.000Z")
        );
      } finally {
        MockDate.reset();
      }
    });
    it("should find October 1st", () => {
      expect.assertions(1);
      try {
        MockDate.set(new Date("2018-10-02"));

        expect(startOfMonth()).toStrictEqual(
          new Date("2018-10-01T00:00:00.000Z")
        );
      } finally {
        MockDate.reset();
      }
    });

    it("should find December 1st", () => {
      expect.assertions(1);
      try {
        MockDate.set(new Date("2018-12-11"));

        expect(startOfMonth()).toStrictEqual(
          new Date("2018-12-01T00:00:00.000Z")
        );
      } finally {
        MockDate.reset();
      }
    });
  });

  describe("lastDayOfMonth function", () => {
    it("should find September 30th", () => {
      expect.assertions(1);
      try {
        MockDate.set(new Date("2018-09-17"));

        expect(lastDayOfMonth()).toStrictEqual(
          new Date("2018-09-30T00:00:00.000Z")
        );
      } finally {
        MockDate.reset();
      }
    });
    it("should find October 31st", () => {
      expect.assertions(1);
      try {
        MockDate.set(new Date("2018-10-02"));

        expect(lastDayOfMonth()).toStrictEqual(
          new Date("2018-10-31T00:00:00.000Z")
        );
      } finally {
        MockDate.reset();
      }
    });

    it("should find December 31st", () => {
      expect.assertions(1);
      try {
        MockDate.set(new Date("2018-12-11"));

        expect(lastDayOfMonth()).toStrictEqual(
          new Date("2018-12-31T00:00:00.000Z")
        );
      } finally {
        MockDate.reset();
      }
    });
  });
});

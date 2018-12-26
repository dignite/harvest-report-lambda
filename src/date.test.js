const date = require("./date");
const MockDate = require("mockdate");

describe("date", () => {
  describe(date.startOfMonth, () => {
    test("should find October 1st", () => {
      MockDate.set(new Date("2018-10-17"));

      expect(date.startOfMonth()).toEqual(new Date("2018-10-01T00:00:00.000"));
    });
    test("should find November 1st", () => {
      MockDate.set(new Date("2018-11-01"));

      expect(date.startOfMonth()).toEqual(new Date("2018-11-01T00:00:00.000"));
    });
  });

  describe(date.timestampForFilename, () => {
    test("should print November 1st", () => {
      MockDate.set(new Date("2018-11-01"));

      expect(date.timestampForFilename()).toEqual("2018-11-01");
    });
    test("should print December 22nd", () => {
      MockDate.set(new Date("2018-12-22"));

      expect(date.timestampForFilename()).toEqual("2018-12-22");
    });
  });

  afterEach(MockDate.reset);
});

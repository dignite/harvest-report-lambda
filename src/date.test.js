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

  afterEach(MockDate.reset);
});

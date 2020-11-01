const dateInfo = require("./date-info");
const mockGetISOWeek = require("date-fns/getISOWeek");

jest.mock("date-fns/getISOWeek");

describe(dateInfo.getWeekNumber, () => {
  test("should be alias for date-fns/getISOWeek", () => {
    expect(dateInfo.getWeekNumber).toEqual(mockGetISOWeek);
  });
});

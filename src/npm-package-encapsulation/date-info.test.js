const dateInfo = require("./date-info");
const mockGetISOWeek = require("date-fns/get_iso_week");

jest.mock("date-fns/get_iso_week");

describe(dateInfo.getWeekNumber, () => {
  test("should be alias for date-fns/get_iso_week", () => {
    expect(dateInfo.getWeekNumber).toEqual(mockGetISOWeek);
  });
});

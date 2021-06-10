import { getWeekNumber } from "./date-info";
import mockGetISOWeek from "date-fns/getISOWeek";

jest.mock("date-fns/getISOWeek");

describe(getWeekNumber, () => {
  test("should be alias for date-fns/getISOWeek", () => {
    expect(getWeekNumber).toStrictEqual(mockGetISOWeek);
  });
});

import { getWeekNumber } from "./date-info";
import mockGetISOWeek from "date-fns/getISOWeek";

jest.mock("date-fns/getISOWeek");

describe(getWeekNumber, () => {
  it("should be alias for date-fns/getISOWeek", () => {
    expect.assertions(1);
    expect(getWeekNumber).toStrictEqual(mockGetISOWeek);
  });
});

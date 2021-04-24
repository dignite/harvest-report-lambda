const { hoursMeta } = require("./");
const mockTimeSummary = require("./time-summary");
const mockCostSummary = require("./cost-summary");

jest.mock("./time-summary", () => ({
  totalSum: jest.fn(),
  perWeek: jest.fn(),
}));
jest.mock("./cost-summary", () => ({
  totalSum: jest.fn(),
}));

describe(hoursMeta, () => {
  const relevantTimeEntries = ["fake-time-entry-1", "fake-time-entry-2"];

  const jsonRouteEvent = {
    path: "/my-path",
  };

  test("should return status code and endpoint description", () => {
    const result = hoursMeta(relevantTimeEntries, jsonRouteEvent);

    expect(result).toEqual({
      description:
        "*All* unbilled billable hours, and any non-billable hours logged for the current month.",
    });
  });

  test("should return total unbilled billable hours", () => {
    mockTimeSummary.totalSum.mockImplementation((input) => ({
      "mockTimeSummary.totalSum() of": input,
    }));

    const result = hoursMeta(relevantTimeEntries, jsonRouteEvent);

    expect(result).toEqual(
      expect.objectContaining({
        totalUnbilledHours: mockTimeSummary.totalSum(relevantTimeEntries),
      })
    );
  });

  test("should return total unbilled billable hours per week", () => {
    mockTimeSummary.totalSum.mockImplementation((input) => ({
      "mockTimeSummary.totalSum() of": input,
    }));

    const result = hoursMeta(relevantTimeEntries, jsonRouteEvent);

    expect(result).toEqual(
      expect.objectContaining({
        totalUnbilledHoursPerWeek: mockTimeSummary.perWeek(relevantTimeEntries),
      })
    );
  });

  test("should return total unbilled invoice size", () => {
    mockCostSummary.totalSum.mockImplementation((input) => ({
      "mockCostSummary.totalSum() of": input,
    }));

    const result = hoursMeta(relevantTimeEntries, jsonRouteEvent);

    expect(result).toEqual(
      expect.objectContaining({
        unbilledInvoice: mockCostSummary.totalSum(relevantTimeEntries),
      })
    );
  });
});

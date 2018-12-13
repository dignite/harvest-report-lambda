const functions = require("./");
const mockTimeEntries = require("./time-entries");
const mockTimePerDay = require("./time-per-day");
const mockTimeSummary = require("./time-summary");
const mockSerializer = require("./serializer");

jest.mock("./time-entries", () => ({
  getRelevantUnbilled: jest.fn()
}));
jest.mock("./time-per-day", () => ({
  merge: jest.fn()
}));
jest.mock("./time-summary", () => ({
  totalSum: jest.fn(),
  perWeek: jest.fn()
}));
jest.mock("./serializer");

describe(functions.root, () => {
  test("should return status code not found", async () => {
    const result = await functions.root();

    expect(result).toEqual({
      statusCode: 404,
      body: "Not Found"
    });
  });
});

describe(functions.hours, () => {
  test("should return status code and endpoint description", async () => {
    const result = await functions.hours();

    expect(result).toEqual(
      expect.objectContaining({
        body: mockSerializer.serialize({
          meta: {
            description:
              "*All* unbilled billable hours, and any non-billable hours logged for the current month."
          }
        }),
        statusCode: 200
      })
    );
  });

  test("should return relevant time entries per day", async () => {
    const relevantTimeEntries = ["fakeTimeEntry1", "fakeTimeEntry2"];
    mockTimeEntries.getRelevantUnbilled.mockReturnValue(relevantTimeEntries);
    mockTimePerDay.merge.mockImplementation(input => ({
      "mockTimePerDay.merge() of": input
    }));

    const result = await functions.hours();

    expect(result).toEqual(
      expect.objectContaining({
        body: mockSerializer.serialize(
          expect.objectContaining({
            timeEntriesPerDay: mockTimePerDay.merge(relevantTimeEntries)
          })
        )
      })
    );
  });

  test("should return total unbilled billable hours", async () => {
    const relevantTimeEntries = ["fakeTimeEntry1", "fakeTimeEntry2"];
    mockTimeEntries.getRelevantUnbilled.mockReturnValue(relevantTimeEntries);
    mockTimeSummary.totalSum.mockImplementation(input => ({
      "mockTimeSummary.totalSum() of": input
    }));

    const result = await functions.hours();

    expect(result).toEqual(
      expect.objectContaining({
        body: mockSerializer.serialize(
          expect.objectContaining({
            meta: expect.objectContaining({
              totalUnbilledHours: mockTimeSummary.totalSum(relevantTimeEntries)
            })
          })
        )
      })
    );
  });

  test("should return total unbilled billable hours per week", async () => {
    const relevantTimeEntries = ["fakeTimeEntry1", "fakeTimeEntry2"];
    mockTimeEntries.getRelevantUnbilled.mockReturnValue(relevantTimeEntries);
    mockTimeSummary.totalSum.mockImplementation(input => ({
      "mockTimeSummary.totalSum() of": input
    }));

    const result = await functions.hours();

    expect(result).toEqual(
      expect.objectContaining({
        body: mockSerializer.serialize(
          expect.objectContaining({
            meta: expect.objectContaining({
              totalUnbilledHoursPerWeek: mockTimeSummary.perWeek(
                relevantTimeEntries
              )
            })
          })
        )
      })
    );
  });
});

const functions = require("./");
const mockTimeEntries = require("./time-entries");
const mockTimePerDay = require("./time-per-day");
const mockSerializer = require("./serializer");

jest.mock("./time-entries", () => ({
  getRelevantUnbilled: jest.fn()
}));
jest.mock("./time-per-day", () => ({
  merge: jest.fn()
}));
jest.mock("./serializer");

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
});

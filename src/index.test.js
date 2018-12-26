const functions = require("./");
const mockTimeEntries = require("./time-entries");
const mockTimePerDay = require("./time-per-day");
const mockMeta = require("./meta");
const mockSerializer = require("./serializer");

jest.mock("./time-entries", () => ({
  getRelevantUnbilled: jest.fn()
}));
jest.mock("./time-per-day", () => ({
  merge: jest.fn()
}));
jest.mock("./meta", () => ({
  hoursMeta: jest.fn()
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
  const event = {
    path: "/my-path"
  };

  test("should return meta data for time entries", async () => {
    const relevantTimeEntries = ["fakeTimeEntry1", "fakeTimeEntry2"];
    mockTimeEntries.getRelevantUnbilled.mockReturnValue(relevantTimeEntries);
    mockMeta.hoursMeta.mockImplementation((timeEntries, event) => ({
      "hoursMeta() of": {
        timeEntries,
        event
      }
    }));

    const result = await functions.hours(event);

    expect(result).toEqual(
      expect.objectContaining({
        body: mockSerializer.serialize({
          meta: mockMeta.hoursMeta(relevantTimeEntries, event)
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

    const result = await functions.hours(event);

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

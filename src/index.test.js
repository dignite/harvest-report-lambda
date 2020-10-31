const functions = require("./");
const mockTimeEntries = require("./time-entries");
const mockTimePerDay = require("./time-per-day");
const mockMeta = require("./meta");
const mockSerializer = require("./serializer");
const mockDateModule = require("./date");
const mockCsv = require("./npm-package-encapsulation/csv");

jest.mock("./time-entries", () => ({
  getRelevantUnbilled: jest.fn(),
}));
jest.mock("./time-per-day", () => ({
  merge: jest.fn(),
}));
jest.mock("./meta", () => ({
  hoursMeta: jest.fn(),
}));
jest.mock("./serializer");
jest.mock("./date", () => ({
  timestampForFilename: jest.fn(),
}));
jest.mock("./npm-package-encapsulation/csv", () => ({
  csvFromObjectTransposed: jest.fn(),
  csvFromObjectWithoutBOM: jest.fn(),
}));

describe(functions.root, () => {
  test("should return status code not found", async () => {
    const result = await functions.root();

    expect(result).toEqual({
      statusCode: 404,
      body: "Not Found",
    });
  });
});

describe(functions.hours, () => {
  const event = {
    path: "/my-path",
  };

  test("should return meta data for time entries", async () => {
    const relevantTimeEntries = ["fakeTimeEntry1", "fakeTimeEntry2"];
    mockTimeEntries.getRelevantUnbilled.mockReturnValue(relevantTimeEntries);
    mockMeta.hoursMeta.mockImplementation((timeEntries, event) => ({
      "hoursMeta() of": {
        timeEntries,
        event,
      },
    }));

    const result = await functions.hours(event);

    expect(result).toEqual(
      expect.objectContaining({
        body: mockSerializer.serialize({
          meta: mockMeta.hoursMeta(relevantTimeEntries, event),
        }),
        statusCode: 200,
      })
    );
  });

  test("should return relevant time entries per day", async () => {
    const relevantTimeEntries = ["fakeTimeEntry1", "fakeTimeEntry2"];
    mockTimeEntries.getRelevantUnbilled.mockReturnValue(relevantTimeEntries);
    mockTimePerDay.merge.mockImplementation(input => ({
      "mockTimePerDay.merge() of": input,
    }));

    const result = await functions.hours(event);

    expect(result).toEqual(
      expect.objectContaining({
        body: mockSerializer.serialize(
          expect.objectContaining({
            timeEntriesPerDay: mockTimePerDay.merge(relevantTimeEntries),
          })
        ),
      })
    );
  });
});

describe(functions.hoursCsv, () => {
  const event = {
    path: "/my-path",
  };

  test("should return status code and attachment file name", async () => {
    mockDateModule.timestampForFilename.mockReturnValue("2011-11-22");

    const result = await functions.hoursCsv(event);

    expect(result).toEqual(
      expect.objectContaining({
        headers: {
          "Content-Disposition": `attachment; filename=unbilled-hours-2011-11-22.csv`,
        },
        statusCode: 200,
      })
    );
  });

  test("should return csv containing meta and per-day entries", async () => {
    const relevantTimeEntries = ["fakeTimeEntry1", "fakeTimeEntry2"];
    mockTimeEntries.getRelevantUnbilled.mockReturnValue(relevantTimeEntries);
    mockMeta.hoursMeta.mockImplementation((timeEntries, event) => ({
      "hoursMeta() of": {
        timeEntries,
        event,
      },
    }));
    mockTimePerDay.merge.mockImplementation(input => ({
      "mockTimePerDay.merge() of": input,
    }));
    mockCsv.csvFromObjectTransposed.mockImplementation(input => ({
      "mockCsv.csvFromObjectTransposed() of": input,
    }));
    mockCsv.csvFromObjectWithoutBOM.mockImplementation(input => ({
      "mockCsv.csvFromObjectWithoutBOM() of": input,
    }));

    const result = await functions.hoursCsv(event);

    expect(result).toEqual(
      expect.objectContaining({
        body: `${mockCsv.csvFromObjectTransposed(
          mockMeta.hoursMeta(relevantTimeEntries, event)
        )}\n\n${mockCsv.csvFromObjectWithoutBOM(
          mockTimePerDay.merge(relevantTimeEntries)
        )}`,
      })
    );
  });
});

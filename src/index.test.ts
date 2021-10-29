import { root, hours } from "./";
import { getRelevantUnbilled } from "./time-entries";
import { merge } from "./time-per-day";
import { hoursMeta } from "./meta";
import { serialize } from "./serializer";
import { mocked } from "ts-jest/utils";
import { when } from "jest-when";

jest.mock("./time-entries");
jest.mock("./time-per-day");
jest.mock("./meta");
jest.mock("./serializer");
jest.mock("./date");

describe(root, () => {
  test("should return status code not found", async () => {
    const result = await root();

    expect(result).toEqual({
      statusCode: 404,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
      },
      body: "Not Found",
    });
  });
});

describe(hours, () => {
  test("should return serialized meta data and time entries", async () => {
    const relevantTimeEntries = [
      {
        billableHours: 4.1,
        comment: "",
        cost: 548.17,
        date: "2018-11-04",
        id: 1,
        name: "Programming",
      },
      {
        billableHours: 7.0,
        comment: "",
        cost: 935.9,
        date: "2018-01-01",
        id: 4,
        name: "Programming",
      },
    ];
    mocked(getRelevantUnbilled).mockResolvedValue(relevantTimeEntries);

    const meta: ReturnType<typeof hoursMeta> = {
      description:
        "*All* unbilled billable hours, and any non-billable hours logged for the current month.",
      totalUnbilledHours: 1,
      totalUnbilledHoursPerWeek: {
        w1: 1,
      },
      unbilledInvoice: {
        excludingVAT: "100 SEK",
        includingVAT: "125 SEK",
      },
    };
    when(mocked(hoursMeta))
      .calledWith(relevantTimeEntries)
      .mockReturnValue(meta);

    const timeEntriesPerDay: ReturnType<typeof merge> = [
      {
        date: "2018-01-03",
        name: "Programming",
        billableHours: 1,
        comment: "",
      },
    ];
    when(mocked(merge))
      .calledWith(relevantTimeEntries)
      .mockReturnValue(timeEntriesPerDay);

    const mockSerializedBody = `Serialized meta and time entries per day ${Date.now()}`;
    when(mocked(serialize))
      .calledWith(
        expect.objectContaining({
          meta: meta,
          timeEntriesPerDay: timeEntriesPerDay,
        })
      )
      .mockReturnValue(mockSerializedBody);

    const result = await hours();

    expect(result).toEqual({
      body: mockSerializedBody,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
      },
      statusCode: 200,
    });
  });
});

import { root, hours, unbilledInvoice } from "./";
import { get } from "./time-entries";
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

describe("root function", () => {
  it("should return status code not found", async () => {
    expect.assertions(1);
    const result = await root();

    expect(result).toStrictEqual({
      statusCode: 404,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
      },
      body: "Not Found",
    });
  });
});

describe("hours function", () => {
  it("should return serialized meta data and time entries", async () => {
    expect.assertions(1);
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
    mocked(get).mockResolvedValue(relevantTimeEntries);

    const meta: ReturnType<typeof hoursMeta> = {
      description:
        "All unbilled billable and non-billable hours for the current month.",
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

    expect(result).toStrictEqual({
      body: mockSerializedBody,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
      },
      statusCode: 200,
    });
  });
});

describe("unbilledInvoice function", () => {
  it("should return serialized total unbilled invoice excluding VAT", async () => {
    expect.assertions(1);
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
    mocked(get).mockResolvedValue(relevantTimeEntries);

    const meta: ReturnType<typeof hoursMeta> = {
      description:
        "All unbilled billable and non-billable hours for the current month.",
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

    const mockSerializedBody = `Serialized ${Date.now()}`;
    when(mocked(serialize))
      .calledWith(
        expect.objectContaining({
          totalUnbilledExcludingVAT: meta.unbilledInvoice.excludingVAT,
        })
      )
      .mockReturnValue(mockSerializedBody);

    const result = await unbilledInvoice();

    expect(result).toStrictEqual({
      body: mockSerializedBody,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
      },
      statusCode: 200,
    });
  });
});

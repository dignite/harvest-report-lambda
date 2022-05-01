import { root, hours, hoursPerDay, invoice } from "./";
import { get } from "./time-entries";
import { merge } from "./time-per-day";
import { hoursMeta } from "./meta";
import { serialize } from "./serializer";
import { mocked } from "ts-jest/utils";
import { when } from "jest-when";
import { startOfMonth, lastDayOfMonth } from "./date";

jest.mock("./time-entries");
jest.mock("./time-per-day");
jest.mock("./meta");
jest.mock("./serializer");
jest.mock("./date", () => ({
  startOfMonth: () => new Date(Date.parse("2018-11-01")),
  lastDayOfMonth: () => new Date(Date.parse("2018-11-30")),
}));

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
        date: "2018-11-04",
        id: 4,
        name: "Programming",
      },
    ];
    when(get)
      .calledWith(startOfMonth(), lastDayOfMonth())
      .mockResolvedValue(relevantTimeEntries);

    const meta: ReturnType<typeof hoursMeta> = {
      description: "All hours for the current month.",
      totalBillableHours: 11.1,
      totalBillableHoursPerWeek: {
        w1: 1,
      },
      invoice: {
        excludingVAT: "100 SEK",
        includingVAT: "125 SEK",
      },
    };
    when(mocked(hoursMeta))
      .calledWith(relevantTimeEntries)
      .mockReturnValue(meta);

    const mockSerializedBody = `Serialized meta and time entries per day ${Date.now()}`;
    when(mocked(serialize))
      .calledWith(
        expect.objectContaining({
          meta: meta,
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

describe("hoursPerDay function", () => {
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
        date: "2018-11-04",
        id: 4,
        name: "Programming",
      },
    ];
    when(get)
      .calledWith(startOfMonth(), lastDayOfMonth())
      .mockResolvedValue(relevantTimeEntries);

    const timeEntriesPerDay: ReturnType<typeof merge> = [
      {
        date: "2018-01-04",
        name: "Programming",
        billableHours: 11.1,
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
          timeEntriesPerDay: timeEntriesPerDay,
        })
      )
      .mockReturnValue(mockSerializedBody);

    const result = await hoursPerDay();

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

describe("invoice function", () => {
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
        date: "2018-01-04",
        id: 4,
        name: "Programming",
      },
    ];
    when(get)
      .calledWith(startOfMonth(), lastDayOfMonth())
      .mockResolvedValue(relevantTimeEntries);

    const meta: ReturnType<typeof hoursMeta> = {
      description: "All hours for the current month.",
      totalBillableHours: 11.1,
      totalBillableHoursPerWeek: {
        w1: 1,
      },
      invoice: {
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
          totalExcludingVAT: meta.invoice.excludingVAT,
        })
      )
      .mockReturnValue(mockSerializedBody);

    const result = await invoice();

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

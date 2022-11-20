import { root, hours, invoice } from "./";
import { get } from "./time-entries";
import { getInvoiceSumExcludingVAT, hoursMetaSlim } from "./meta";
import { serialize } from "./serializer";
import { mocked } from "ts-jest/utils";
import { when } from "jest-when";

jest.mock("./time-entries");
jest.mock("./meta");
jest.mock("./serializer");

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
        hours: 4.1,
        comment: "",
        cost: 548.17,
        date: "2018-11-04",
        id: 1,
        name: "Programming",
      },
      {
        billableHours: 7.0,
        hours: 7.0,
        comment: "",
        cost: 935.9,
        date: "2018-11-04",
        id: 4,
        name: "Programming",
      },
    ];
    const startDate = "2018-11-01";
    const endDate = "2018-11-30";
    when(get)
      .calledWith(
        new Date(Date.parse(startDate)),
        new Date(Date.parse(endDate))
      )
      .mockResolvedValue(relevantTimeEntries);

    const metaSlim: ReturnType<typeof hoursMetaSlim> = {
      totalBillableHours: 11.1,
      totalBillableHoursPerWeek: {
        w1: 1,
      },
    };
    when(mocked(hoursMetaSlim))
      .calledWith(relevantTimeEntries)
      .mockReturnValue(metaSlim);

    const mockSerializedBody = `Serialized meta and time entries per day ${Date.now()}`;
    when(mocked(serialize))
      .calledWith(metaSlim)
      .mockReturnValue(mockSerializedBody);

    const result = await hours({
      pathParameters: {
        startDate,
        endDate,
      },
    });

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
        hours: 4.1,
        comment: "",
        cost: 548.17,
        date: "2018-11-04",
        id: 1,
        name: "Programming",
      },
      {
        billableHours: 7.0,
        hours: 7.0,
        comment: "",
        cost: 935.9,
        date: "2018-01-04",
        id: 4,
        name: "Programming",
      },
    ];

    const startDate = "2018-11-01";
    const endDate = "2018-11-30";
    when(get)
      .calledWith(
        new Date(Date.parse(startDate)),
        new Date(Date.parse(endDate))
      )
      .mockResolvedValue(relevantTimeEntries);

    const invoiceSumExcludingVAT: ReturnType<typeof getInvoiceSumExcludingVAT> =
      "100 SEK";
    when(mocked(getInvoiceSumExcludingVAT))
      .calledWith(relevantTimeEntries)
      .mockReturnValue(invoiceSumExcludingVAT);

    const mockSerializedBody = `Serialized ${Date.now()}`;
    when(mocked(serialize))
      .calledWith(
        expect.objectContaining({ totalExcludingVAT: invoiceSumExcludingVAT })
      )
      .mockReturnValue(mockSerializedBody);

    const result = await invoice({
      pathParameters: {
        startDate,
        endDate,
      },
    });

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

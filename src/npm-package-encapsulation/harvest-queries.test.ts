import { getTimeEntriesForMonth } from "./harvest-queries";
import { server } from "../mock-service-worker/server";
import {
  prepareGetTimeEntriesSuccess,
  getTimeEntriesError,
} from "../mock-service-worker/harvest-handlers";

jest.mock("../process-env", () => ({
  get: (key: string) => `Value from process.env.${key}`,
}));

jest.mock("../date", () => ({
  startOfMonth: () => new Date(Date.parse("2022-01-01")),
  lastDayOfMonth: () => new Date(Date.parse("2022-01-31")),
}));

describe("getTimeEntriesForMonth function", () => {
  it("should return all billable but unbilled and non-billable hours for month", async () => {
    expect.assertions(1);
    server.resetHandlers(
      prepareGetTimeEntriesSuccess(
        {
          userAgent:
            "harvest-report-lambda (Value from process.env.USER_AGENT_EMAIL)",
          accessToken: "Value from process.env.HARVEST_ACCESS_TOKEN",
          accountId: "Value from process.env.HARVEST_ACCOUNT_ID",
          isBilledQueryParameter: "false",
          isFromQueryParameter: "2022-01-01",
          isToQueryParameter: "2022-01-31",
        },
        [
          unbilledBillableJanuary,
          unbilledUnbillableJanuary,
          unbilledUnbillableNoTaskJanuary,
          unbilledUnbillableNoTaskNameJanuary,
          unbilledUnbillableNoDate, // <- Not going to happen in the real world
        ]
      )
    );

    const result = await getTimeEntriesForMonth();

    const expected = [
      {
        billable: true,
        billableRate: 133.7,
        comment: "None",
        date: "2018-01-01",
        hours: 7.01,
        id: 4,
        isBilled: false,
        name: "Programming",
      },
      {
        billable: false,
        billableRate: 0,
        comment: "None",
        date: "2018-01-01",
        hours: 6,
        id: 5,
        isBilled: false,
        name: "Vacation",
      },
      {
        billable: false,
        billableRate: 0,
        comment: "None",
        date: "2018-01-02",
        hours: 6,
        id: 6,
        isBilled: false,
        name: "Unnamed",
      },
      {
        billable: false,
        billableRate: 0,
        comment: "None",
        date: "2018-01-03",
        hours: 6,
        id: 7,
        isBilled: false,
        name: "Unnamed",
      },
    ];
    expect(result).toStrictEqual(expect.arrayContaining(expected));
  });

  it("should reject with error from harvest", async () => {
    expect.assertions(1);
    server.resetHandlers(getTimeEntriesError);

    await expect(getTimeEntriesForMonth()).rejects.toThrow(
      'Error getting time entries: 401 Unauthorized, {"message":"Error getting time entries, bad request"}'
    );
  });

  const unbilledBillableJanuary = {
    id: 4,
    spent_date: "2018-01-01",
    task: {
      name: "Programming",
    },
    is_billed: false,
    billable: true,
    billable_rate: 133.7,
    hours: 7.01,
    notes: null,
  };

  const unbilledUnbillableJanuary = {
    id: 5,
    spent_date: "2018-01-01",
    task: {
      name: "Vacation",
    },
    is_billed: false,
    billable: false,
    billable_rate: null,
    hours: 6,
    notes: null,
  };

  const unbilledUnbillableNoTaskJanuary = {
    id: 6,
    spent_date: "2018-01-02",
    task: null,
    is_billed: false,
    billable: false,
    billable_rate: null,
    hours: 6,
    notes: null,
  };

  const unbilledUnbillableNoTaskNameJanuary = {
    id: 7,
    spent_date: "2018-01-03",
    task: {
      name: null,
    },
    is_billed: false,
    billable: false,
    billable_rate: null,
    hours: 6,
    notes: null,
  };

  const unbilledUnbillableNoDate = {
    id: 7,
    spent_date: null,
    task: {
      name: null,
    },
    is_billed: false,
    billable: false,
    billable_rate: null,
    hours: 6,
    notes: null,
  };
});

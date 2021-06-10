import { getUnbilledTimeEntries } from "./harvest-queries";
import { server } from "../__mocks__/mock-service-worker/server";
import {
  prepareGetTimeEntriesSuccess,
  getTimeEntriesError,
} from "../__mocks__/mock-service-worker/harvest-handlers";

jest.mock("../process-env", () => ({
  get: (key: string) => `Value from process.env.${key}`,
}));

describe(getUnbilledTimeEntries, () => {
  test("should return all billable but unbilled and non-billable hours", async () => {
    expect.assertions(1);
    server.resetHandlers(
      prepareGetTimeEntriesSuccess(
        {
          userAgent:
            "harvest-report-lambda (Value from process.env.USER_AGENT_EMAIL)",
          accessToken: "Value from process.env.HARVEST_ACCESS_TOKEN",
          accountId: "Value from process.env.HARVEST_ACCOUNT_ID",
          isBilledQueryParameter: "false",
        },
        [
          unbilledBillableDecember,
          unbilledUnbillableDecember,
          billedBillableFebruary,
          unbilledBillableJanuary,
          unbilledUnbillableJanuary,
          unbilledUnbillableNoTaskJanuary,
          unbilledUnbillableNoTaskNameJanuary,
          unbilledUnbillableNoDate,
        ]
      )
    );

    const result = await getUnbilledTimeEntries();

    const expected = [
      {
        billable: true,
        billableRate: 133.7,
        comment: "None",
        date: "2018-11-04",
        hours: 4.12,
        id: 1,
        isBilled: false,
        name: "Programming",
      },
      {
        billable: false,
        billableRate: 0,
        comment: "Umeå",
        date: "2018-11-03",
        hours: 8,
        id: 2,
        isBilled: false,
        name: "Vacation",
      },
      {
        billable: true,
        billableRate: 133.7,
        comment: "None",
        date: "2018-02-01",
        hours: 7.01,
        id: 3,
        isBilled: true,
        name: "Programming",
      },
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

  test("should return all billable but unbilled and non-billable hours", async () => {
    expect.assertions(1);
    server.resetHandlers(getTimeEntriesError);

    await expect(getUnbilledTimeEntries()).rejects.toThrow(
      'Error getting time entries: 401 Unauthorized, {"message":"Error getting time entries, bad request"}'
    );
  });

  const unbilledBillableDecember = {
    id: 1,
    spent_date: "2018-11-04",
    task: {
      name: "Programming",
    },
    is_billed: false,
    billable: true,
    billable_rate: 133.7,
    hours: 4.12,
    notes: null,
  };

  const unbilledUnbillableDecember = {
    id: 2,
    spent_date: "2018-11-03",
    task: {
      name: "Vacation",
    },
    is_billed: false,
    billable: false,
    billable_rate: null,
    hours: 8,
    notes: "Umeå",
  };

  const billedBillableFebruary = {
    id: 3,
    spent_date: "2018-02-01",
    task: {
      name: "Programming",
    },
    is_billed: true,
    billable: true,
    billable_rate: 133.7,
    hours: 7.01,
    notes: null,
  };

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

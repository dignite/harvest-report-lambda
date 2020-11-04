const { getUnbilledTimeEntries } = require("./harvest-queries");
const { authenticatedHarvest } = require("./authenticated-harvest");
const { when } = require("jest-when");

jest.mock("./authenticated-harvest");

describe(getUnbilledTimeEntries, () => {
  test("should return all billable but unbilled and non-billable hours", async () => {
    setupReturnTimeEntries(
      unbilledBillableDecember,
      unbilledUnbillableDecember,
      billedBillableFebruary,
      unbilledBillableJanuary,
      unbilledUnbillableJanuary
    );

    const result = await getUnbilledTimeEntries();

    const expected = [
      {
        billable: true,
        billableRate: 133.7,
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
        date: "2018-02-01",
        hours: 7.01,
        id: 3,
        isBilled: true,
        name: "Programming",
      },
      {
        billable: true,
        billableRate: 133.7,
        date: "2018-01-01",
        hours: 7.01,
        id: 4,
        isBilled: false,
        name: "Programming",
      },
      {
        billable: false,
        billableRate: 0,
        date: "2018-01-01",
        hours: 6,
        id: 5,
        isBilled: false,
        name: "Vacation",
      },
    ];
    expect(result).toEqual(expect.arrayContaining(expected));
  });

  const setupReturnTimeEntries = (...entries) =>
    when(authenticatedHarvest.timeEntries.list)
      .calledWith({ is_billed: "false" })
      .mockReturnValue({
        time_entries: entries,
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
});

const timeEntries = require("./time-entries");
const mockHarvestApi = require("./npm-package-encapsulation/authenticated-harvest");
const { when } = require("jest-when");

jest.mock("./npm-package-encapsulation/authenticated-harvest", () => ({
  timeEntries: {
    list: jest.fn(),
  },
}));

jest.mock("./date", () => ({
  startOfMonth: () => Date.parse("2018-11-01"),
}));

describe(timeEntries.getRelevantUnbilled, () => {
  test("should return all unbilled billable hours", async () => {
    setupReturnTimeEntries(
      unbilledBillableDecember,
      billedBillableFebruary,
      unbilledBillableJanuary
    );

    const result = await timeEntries.getRelevantUnbilled();

    const expected = [
      {
        id: 1,
        date: "2018-11-04",
        name: "Programming",
        billableHours: 4.1,
        cost: 548.17,
        comment: null,
      },
      {
        id: 4,
        date: "2018-01-01",
        name: "Programming",
        billableHours: 7.0,
        cost: 935.9,
        comment: null,
      },
    ];
    expect(result).toEqual(expect.arrayContaining(expected));
  });

  test("should return non-billable hours from the current month", async () => {
    setupReturnTimeEntries(
      unbilledUnbillableDecember,
      unbilledUnbillableJanuary
    );

    const result = await timeEntries.getRelevantUnbilled();

    const expected = [
      {
        id: 2,
        date: "2018-11-03",
        name: "Vacation",
        billableHours: 0,
        cost: 0,
        comment: null,
      },
    ];
    expect(result).toEqual(expect.arrayContaining(expected));
  });

  test("should not return anything but unbilled billable hours and non-billable hours from the current month", async () => {
    setupReturnTimeEntries(
      unbilledBillableDecember,
      unbilledUnbillableDecember,
      billedBillableFebruary,
      unbilledBillableJanuary,
      unbilledUnbillableJanuary
    );

    const result = await timeEntries.getRelevantUnbilled();
    const actualIds = result.map(timeEntry => timeEntry.id);

    const expectedIds = [1, 2, 4];
    expect(actualIds).toEqual(expectedIds);
  });

  const setupReturnTimeEntries = (...entries) =>
    when(mockHarvestApi.timeEntries.list)
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
    notes: null,
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

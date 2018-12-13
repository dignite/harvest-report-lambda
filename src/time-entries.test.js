const timeEntries = require("./time-entries");
const mockHarvestApi = require("./authenticated-harvest");
const { when } = require("jest-when");

jest.mock("./authenticated-harvest", () => ({
  timeEntries: {
    list: jest.fn()
  }
}));

jest.mock("./date", () => ({
  startOfMonth: () => Date.parse("2018-11-01")
}));

describe(timeEntries.getRelevantUnbilled, () => {
  test("should return all unbilled billable hours", async () => {
    setupReturnTimeEntries(
      unbilledBillableDecember,
      billedBillableFebruary,
      unbilledBillableJanuary
    );

    const actualIds = await getIdsOfMatchingTimeEntries();

    const expectedIds = [1, 4];
    expect(actualIds).toEqual(expect.arrayContaining(expectedIds));
  });

  test("should return non-billable hours from the current month", async () => {
    setupReturnTimeEntries(
      unbilledUnbillableDecember,
      unbilledUnbillableJanuary
    );

    const actualIds = await getIdsOfMatchingTimeEntries();

    const expectedIds = [2];
    expect(actualIds).toEqual(expect.arrayContaining(expectedIds));
  });

  test("should not return anything but unbilled billable hours and non-billable hours from the current month", async () => {
    setupReturnTimeEntries(
      unbilledBillableDecember,
      unbilledUnbillableDecember,
      billedBillableFebruary,
      unbilledBillableJanuary,
      unbilledUnbillableJanuary
    );

    const actualIds = await getIdsOfMatchingTimeEntries();

    const expectedIds = [1, 2, 4];
    expect(actualIds).toEqual(expectedIds);
  });

  const setupReturnTimeEntries = (...entries) =>
    when(mockHarvestApi.timeEntries.list)
      .calledWith({ is_billed: "false" })
      .mockReturnValue({
        time_entries: entries
      });

  const getIdsOfMatchingTimeEntries = async () => {
    const result = await timeEntries.getRelevantUnbilled();
    return result.map(timeEntry => timeEntry.id);
  };

  const unbilledBillableDecember = {
    id: 1,
    spent_date: "2018-11-04",
    task: {
      name: "Programming"
    },
    is_billed: false,
    billable: true,
    billable_rate: 133.7,
    hours: 4.12,
    notes: null
  };

  const unbilledUnbillableDecember = {
    id: 2,
    spent_date: "2018-11-03",
    task: {
      name: "Vacation"
    },
    is_billed: false,
    billable: false,
    billable_rate: null,
    hours: 8,
    notes: null
  };

  const billedBillableFebruary = {
    id: 3,
    spent_date: "2018-02-01",
    task: {
      name: "Programming"
    },
    is_billed: true,
    billable: true,
    billable_rate: 133.7,
    hours: 7.01,
    notes: null
  };

  const unbilledBillableJanuary = {
    id: 4,
    spent_date: "2018-01-01",
    task: {
      name: "Programming"
    },
    is_billed: false,
    billable: true,
    billable_rate: 133.7,
    hours: 7.01,
    notes: null
  };

  const unbilledUnbillableJanuary = {
    id: 5,
    spent_date: "2018-01-01",
    task: {
      name: "Vacation"
    },
    is_billed: false,
    billable: false,
    billable_rate: null,
    hours: 6,
    notes: null
  };
});

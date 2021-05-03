const timeEntries = require("./time-entries");
const {
  getUnbilledTimeEntries,
} = require("./npm-package-encapsulation/harvest-queries");

jest.mock("./npm-package-encapsulation/harvest-queries");

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
        billableHours: 4.1,
        cost: 548.17,
        date: "2018-11-04",
        id: 1,
        name: "Programming",
      },
      {
        billableHours: 7.0,
        cost: 935.9,
        date: "2018-01-01",
        id: 4,
        name: "Programming",
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
        billableHours: 0,
        comment: "Umeå",
        cost: 0,
        date: "2018-11-03",
        id: 2,
        name: "Vacation",
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
    const actualIds = result.map((timeEntry) => timeEntry.id);

    const expectedIds = [1, 2, 4];
    expect(actualIds).toEqual(expectedIds);
  });

  const setupReturnTimeEntries = (...entries) =>
    getUnbilledTimeEntries.mockReturnValue(entries);

  const unbilledBillableDecember = {
    billable: true,
    billableRate: 133.7,
    date: "2018-11-04",
    hours: 4.12,
    id: 1,
    isBilled: false,
    name: "Programming",
  };

  const unbilledUnbillableDecember = {
    billable: false,
    billableRate: null,
    comment: "Umeå",
    date: "2018-11-03",
    hours: 8,
    id: 2,
    isBilled: false,
    name: "Vacation",
  };

  const billedBillableFebruary = {
    billable: true,
    billableRate: 133.7,
    date: "2018-02-01",
    hours: 7.01,
    id: 3,
    isBilled: true,
    name: "Programming",
  };

  const unbilledBillableJanuary = {
    billable: true,
    billableRate: 133.7,
    date: "2018-01-01",
    hours: 7.01,
    id: 4,
    isBilled: false,
    name: "Programming",
  };

  const unbilledUnbillableJanuary = {
    billable: false,
    billableRate: null,
    date: "2018-01-01",
    hours: 6,
    id: 5,
    isBilled: false,
    name: "Vacation",
  };
});

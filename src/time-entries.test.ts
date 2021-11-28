import { getRelevantUnbilled } from "./time-entries";
import {
  getUnbilledTimeEntries,
  SimplifiedUnbilledTimeEntry,
} from "./npm-package-encapsulation/harvest-queries";
import { mocked } from "ts-jest/utils";

jest.mock("./npm-package-encapsulation/harvest-queries");

jest.mock("./date", () => ({
  startOfLastMonth: () => Date.parse("2018-10-01"),
}));

describe(getRelevantUnbilled, () => {
  it("should return all unbilled billable hours", async () => {
    expect.assertions(1);
    setupReturnTimeEntries([
      unbilledBillableDecember,
      billedBillableFebruary,
      unbilledBillableJanuary,
    ]);

    const result = await getRelevantUnbilled();

    const expected = [
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
    expect(result).toStrictEqual(expect.arrayContaining(expected));
  });

  it("should return non-billable hours from the current month and last month", async () => {
    expect.assertions(1);
    setupReturnTimeEntries([
      unbilledUnbillableNovember,
      unbilledUnbillableOctober,
      unbilledUnbillableJanuary,
    ]);

    const result = await getRelevantUnbilled();

    const expected = [
      {
        billableHours: 0,
        comment: "Umeå",
        cost: 0,
        date: "2018-11-03",
        id: 2,
        name: "Vacation",
      },
      {
        billableHours: 0,
        comment: "Uppsala",
        cost: 0,
        date: "2018-10-01",
        id: 6,
        name: "Vacation",
      },
    ];
    expect(result).toStrictEqual(expect.arrayContaining(expected));
  });

  it("should not return anything but unbilled billable hours and non-billable hours from the current month", async () => {
    expect.assertions(1);
    setupReturnTimeEntries([
      unbilledBillableDecember,
      unbilledUnbillableNovember,
      billedBillableFebruary,
      unbilledBillableJanuary,
      unbilledUnbillableJanuary,
    ]);

    const result = await getRelevantUnbilled();
    const actualIds = result.map((timeEntry) => timeEntry.id);

    const expectedIds = [1, 2, 4];
    expect(actualIds).toStrictEqual(expectedIds);
  });

  const setupReturnTimeEntries = (entries: SimplifiedUnbilledTimeEntry[]) =>
    mocked(getUnbilledTimeEntries).mockResolvedValue(entries);
});

const unbilledBillableDecember: SimplifiedUnbilledTimeEntry = {
  billable: true,
  billableRate: 133.7,
  comment: "",
  date: "2018-11-04",
  hours: 4.12,
  id: 1,
  isBilled: false,
  name: "Programming",
};

const unbilledUnbillableNovember: SimplifiedUnbilledTimeEntry = {
  billable: false,
  billableRate: 0,
  comment: "Umeå",
  date: "2018-11-03",
  hours: 8,
  id: 2,
  isBilled: false,
  name: "Vacation",
};

const billedBillableFebruary: SimplifiedUnbilledTimeEntry = {
  billable: true,
  billableRate: 133.7,
  comment: "",
  date: "2018-02-01",
  hours: 7.01,
  id: 3,
  isBilled: true,
  name: "Programming",
};

const unbilledBillableJanuary: SimplifiedUnbilledTimeEntry = {
  billable: true,
  billableRate: 133.7,
  comment: "",
  date: "2018-01-01",
  hours: 7.01,
  id: 4,
  isBilled: false,
  name: "Programming",
};

const unbilledUnbillableJanuary: SimplifiedUnbilledTimeEntry = {
  billable: false,
  billableRate: 0,
  comment: "",
  date: "2018-01-01",
  hours: 6,
  id: 5,
  isBilled: false,
  name: "Vacation",
};

const unbilledUnbillableOctober: SimplifiedUnbilledTimeEntry = {
  billable: false,
  billableRate: 0,
  comment: "Uppsala",
  date: "2018-10-01",
  hours: 8,
  id: 6,
  isBilled: false,
  name: "Vacation",
};

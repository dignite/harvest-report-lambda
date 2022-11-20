import { get } from "./time-entries";
import {
  getTimeEntriesForMonth,
  SimplifiedUnbilledTimeEntry,
} from "./npm-package-encapsulation/harvest-queries";
import { mocked } from "ts-jest/utils";
import { when } from "jest-when";

jest.mock("./npm-package-encapsulation/harvest-queries");

describe("get function", () => {
  it("should return all hours", async () => {
    expect.assertions(1);
    setupReturnTimeEntries([
      unbilledBillableNovember3,
      unbilledUnbillableNovember4,
      billedBillableNovember5,
      unbilledBillableNovember6,
      unbilledUnbillableNovember7,
      unbilledUnbillableNovember8,
    ]);
    const startOfMonth = new Date(Date.parse("2018-11-01"));
    const lastDayOfMonth = new Date(Date.parse("2018-11-30"));

    const result = await get(startOfMonth, lastDayOfMonth);

    const expected = [
      {
        billableHours: 4.1,
        hours: 4.1,
        comment: "",
        cost: 548.17,
        date: "2018-11-03",
        id: 1,
        name: "Programming",
      },
      {
        billableHours: 0,
        hours: 8,
        comment: "Umeå",
        cost: 0,
        date: "2018-11-04",
        id: 2,
        name: "Vacation",
      },
      {
        billableHours: 7,
        hours: 7,
        comment: "",
        cost: 935.9,
        date: "2018-11-05",
        id: 3,
        name: "Programming",
      },
      {
        billableHours: 7,
        hours: 7,
        comment: "",
        cost: 935.9,
        date: "2018-11-06",
        id: 4,
        name: "Programming",
      },
      {
        billableHours: 0,
        hours: 6,
        comment: "",
        cost: 0,
        date: "2018-11-07",
        id: 5,
        name: "Vacation",
      },
      {
        billableHours: 0,
        hours: 0,
        comment: "Uppsala",
        cost: 0,
        date: "2018-11-08",
        id: 6,
        name: "Vacation 0 hours",
      },
    ];
    expect(result).toStrictEqual(expect.arrayContaining(expected));
  });

  const setupReturnTimeEntries = (entries: SimplifiedUnbilledTimeEntry[]) =>
    when(mocked(getTimeEntriesForMonth))
      .calledWith(
        new Date(Date.parse("2018-11-01")),
        new Date(Date.parse("2018-11-30"))
      )
      .mockResolvedValue(entries);
});

const unbilledBillableNovember3: SimplifiedUnbilledTimeEntry = {
  billable: true,
  billableRate: 133.7,
  comment: "",
  date: "2018-11-03",
  hours: 4.12,
  id: 1,
  isBilled: false,
  name: "Programming",
};

const unbilledUnbillableNovember4: SimplifiedUnbilledTimeEntry = {
  billable: false,
  billableRate: 0,
  comment: "Umeå",
  date: "2018-11-04",
  hours: 8,
  id: 2,
  isBilled: false,
  name: "Vacation",
};

const billedBillableNovember5: SimplifiedUnbilledTimeEntry = {
  billable: true,
  billableRate: 133.7,
  comment: "",
  date: "2018-11-05",
  hours: 7.01,
  id: 3,
  isBilled: true,
  name: "Programming",
};

const unbilledBillableNovember6: SimplifiedUnbilledTimeEntry = {
  billable: true,
  billableRate: 133.7,
  comment: "",
  date: "2018-11-06",
  hours: 7.01,
  id: 4,
  isBilled: false,
  name: "Programming",
};

const unbilledUnbillableNovember7: SimplifiedUnbilledTimeEntry = {
  billable: false,
  billableRate: 0,
  comment: "",
  date: "2018-11-07",
  hours: 6,
  id: 5,
  isBilled: false,
  name: "Vacation",
};

const unbilledUnbillableNovember8: SimplifiedUnbilledTimeEntry = {
  billable: false,
  billableRate: 0,
  comment: "Uppsala",
  date: "2018-11-08",
  hours: 0,
  id: 6,
  isBilled: false,
  name: "Vacation 0 hours",
};

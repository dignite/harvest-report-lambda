import { getWeekNumber } from "../npm-package-encapsulation/date-info";
import groupBy from "lodash.groupby";
import mapValues from "lodash.mapvalues";
import { HarvestReportLambdaTimeEntry } from "../time-entries";

type BillableHoursOnTimeEntry = Pick<
  HarvestReportLambdaTimeEntry,
  "billableHours"
>;

export const totalSum = (timeEntries: BillableHoursOnTimeEntry[]): number =>
  timeEntries.reduce(
    (previous, timeEntry) =>
      sumPreservingOneDecimal(previous, timeEntry.billableHours),
    0
  );

type BillableHoursByWeek = Record<string, number>;

export const perWeek = (
  timeEntries: HarvestReportLambdaTimeEntry[]
): BillableHoursByWeek => {
  const hoursWithWeekNumber = timeEntries.map((timeEntry) => ({
    billableHours: timeEntry.billableHours,
    week: `w${getWeekNumber(Date.parse(timeEntry.date))}`,
  }));

  const hoursByWeek = groupBy(hoursWithWeekNumber, "week");

  return mapValues(hoursByWeek, totalSum);
};

const sumPreservingOneDecimal = (value1: number, value2: number) =>
  Math.round(value1 * 10 + value2 * 10) / 10;

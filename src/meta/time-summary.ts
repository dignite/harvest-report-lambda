import { getWeekNumber } from "../npm-package-encapsulation/date-info";
import groupBy from "lodash.groupby";
import mapValues from "lodash.mapvalues";
import { HarvestReportLambdaTimeEntry } from "../harvest-report-lambda-time-entry";

export const totalSum = (timeEntries: HarvestReportLambdaTimeEntry[]) =>
  timeEntries.reduce(
    (previous, timeEntry) =>
      sumPreservingOneDecimal(previous, timeEntry.billableHours),
    0
  );

export const perWeek = (timeEntries: HarvestReportLambdaTimeEntry[]) => {
  const hoursWithWeekNumber = timeEntries.map((timeEntry) => ({
    billableHours: timeEntry.billableHours,
    week: `w${getWeekNumber(Date.parse(timeEntry.date))}`,
  }));

  const hoursByWeek = groupBy(hoursWithWeekNumber, "week");

  return mapValues(hoursByWeek, totalSum);
};

const sumPreservingOneDecimal = (value1: number, value2: number) =>
  Math.round(value1 * 10 + value2 * 10) / 10;

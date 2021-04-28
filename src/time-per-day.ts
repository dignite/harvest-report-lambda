import groupBy from "lodash.groupby";
import { HarvestReportLambdaTimeEntry } from "./time-entries";

type EntireDayTimeEntryWithoutCost = Omit<
  HarvestReportLambdaTimeEntry,
  "id" | "cost"
>;

export const merge = (
  timeEntries: HarvestReportLambdaTimeEntry[]
): EntireDayTimeEntryWithoutCost[] => {
  const timeEntriesPerDay = groupBy(timeEntries, "date");
  const mergedTimeEntriesPerDay = Object.values(timeEntriesPerDay).map(
    mergeSingleDay
  );
  return mergedTimeEntriesPerDay;
};

const mergeSingleDay = (
  timeEntriesInASingleDay: HarvestReportLambdaTimeEntry[]
) =>
  timeEntriesInASingleDay.reduce<
    Omit<HarvestReportLambdaTimeEntry, "id" | "cost">
  >(
    (
      previous: Omit<HarvestReportLambdaTimeEntry, "id" | "cost">,
      timeEntry: HarvestReportLambdaTimeEntry
    ): Omit<HarvestReportLambdaTimeEntry, "id" | "cost"> => ({
      date: timeEntry.date,
      name: mergeStrings(previous.name, timeEntry.name),
      billableHours: sumPreservingOneDecimal(
        previous.billableHours,
        timeEntry.billableHours
      ),
      comment: timeEntry.comment,
    }),
    {
      date: "",
      name: "",
      billableHours: 0,
      comment: "",
    }
  );

const sumPreservingOneDecimal = (value1: number, value2: number) =>
  (value1 * 10 + value2 * 10) / 10;

const mergeStrings = (string1: string, string2: string) =>
  string1 === "" || string1 === string2 ? string2 : `${string1} + ${string2}`;

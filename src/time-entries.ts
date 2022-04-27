import {
  getTimeEntriesForMonth,
  SimplifiedUnbilledTimeEntry,
} from "./npm-package-encapsulation/harvest-queries";
import { startOfMonth, lastDayOfMonth } from "./date";
import { SEK } from "./npm-package-encapsulation/swedish-crowns";

export interface HarvestReportLambdaTimeEntry {
  id: SimplifiedUnbilledTimeEntry["id"];
  date: SimplifiedUnbilledTimeEntry["date"];
  name: SimplifiedUnbilledTimeEntry["name"];
  billableHours: number;
  cost: number;
  comment: SimplifiedUnbilledTimeEntry["comment"];
}

export const get = async (): Promise<HarvestReportLambdaTimeEntry[]> => {
  const timeEntries = await getTimeEntriesForMonth(
    startOfMonth(),
    lastDayOfMonth()
  );
  const timeEntriesWithCost = timeEntries.map((timeEntry) => {
    const billableHours =
      timeEntry.billable && timeEntry.billableRate && timeEntry.hours
        ? roundToNearestSixMinutes(timeEntry.hours)
        : 0;
    return {
      id: timeEntry.id,
      date: timeEntry.date,
      name: timeEntry.name,
      billableHours,
      cost: SEK(billableHours).multiply(timeEntry.billableRate).getAmount(),
      comment: timeEntry.comment,
    };
  });
  return timeEntriesWithCost;
};

const roundToNearestSixMinutes = (hours: number) => Math.round(hours * 10) / 10;

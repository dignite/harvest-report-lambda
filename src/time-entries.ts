import {
  getUnbilledTimeEntries,
  SimplifiedUnbilledTimeEntry,
} from "./npm-package-encapsulation/harvest-queries";
import { startOfMonth } from "./date";
import { SEK } from "./npm-package-encapsulation/swedish-crowns";

interface HarvestReportLambdaTimeEntry {
  id: SimplifiedUnbilledTimeEntry["id"];
  date: SimplifiedUnbilledTimeEntry["date"];
  name: SimplifiedUnbilledTimeEntry["name"];
  billableHours: number;
  cost: number;
  comment: SimplifiedUnbilledTimeEntry["comment"];
}

export const getRelevantUnbilled = async (): Promise<
  HarvestReportLambdaTimeEntry[]
> => {
  const timeEntries = await getUnbilledTimeEntries();
  const unbilledTimeEntries = timeEntries.filter(isNotBilled);
  const relevantUnbilledEntries = unbilledTimeEntries.filter(
    fromThisMonthUnlessBillable
  );
  const timeEntriesWithCost = relevantUnbilledEntries.map((timeEntry) => {
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

const isNotBilled = (timeEntry: SimplifiedUnbilledTimeEntry) =>
  !timeEntry.isBilled;
const fromThisMonthUnlessBillable = (timeEntry: SimplifiedUnbilledTimeEntry) =>
  timeEntry.billable ||
  (timeEntry.date && new Date(Date.parse(timeEntry.date)) >= startOfMonth());
const roundToNearestSixMinutes = (hours: number) => Math.round(hours * 10) / 10;

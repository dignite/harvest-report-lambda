import { SEK } from "../npm-package-encapsulation/swedish-crowns";
import { HarvestReportLambdaTimeEntry } from "../time-entries";

export const totalExcludingVAT = (
  timeEntries: HarvestReportLambdaTimeEntry[]
): string => {
  const cost = timeEntries.reduce(
    (previous, timeEntry) => previous.add(SEK(timeEntry.cost)),
    SEK(0)
  );
  return cost.toString();
};

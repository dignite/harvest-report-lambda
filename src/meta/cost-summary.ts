import { SEK } from "../npm-package-encapsulation/swedish-crowns";
import { HarvestReportLambdaTimeEntry } from "../time-entries";

interface CostSummary {
  excludingVAT: string;
  includingVAT: string;
}

export const totalSum = (
  timeEntries: HarvestReportLambdaTimeEntry[]
): CostSummary => {
  const cost = timeEntries.reduce(
    (previous, timeEntry) => previous.add(SEK(timeEntry.cost)),
    SEK(0)
  );
  return {
    excludingVAT: cost.toString(),
    includingVAT: cost.addVAT(25).toString(),
  };
};

export const totalExcludingVAT = (
  timeEntries: HarvestReportLambdaTimeEntry[]
): string => {
  const cost = timeEntries.reduce(
    (previous, timeEntry) => previous.add(SEK(timeEntry.cost)),
    SEK(0)
  );
  return cost.toString();
};

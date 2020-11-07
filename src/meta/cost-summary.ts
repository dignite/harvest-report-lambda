import { SEK } from "../npm-package-encapsulation/swedish-crowns";
import { HarvestReportLambdaTimeEntry } from "../harvest-report-lambda-time-entry";

export const totalSum = (timeEntries: HarvestReportLambdaTimeEntry[]) => {
  const cost = timeEntries.reduce(
    (previous, timeEntry) => previous.add(SEK(timeEntry.cost)),
    SEK(0)
  );
  return {
    excludingVAT: cost.toString(),
    includingVAT: cost.addVAT(25).toString(),
  };
};

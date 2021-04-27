import { totalSum, perWeek } from "./time-summary";
import { totalSum as totalCostSum } from "./cost-summary";
import { HarvestReportLambdaTimeEntry } from "../harvest-report-lambda-time-entry";

export const hoursMeta = (
  relevantTimeEntries: HarvestReportLambdaTimeEntry[]
) => {
  return {
    description:
      "*All* unbilled billable hours, and any non-billable hours logged for the current month.",
    totalUnbilledHours: totalSum(relevantTimeEntries),
    totalUnbilledHoursPerWeek: perWeek(relevantTimeEntries),
    unbilledInvoice: totalCostSum(relevantTimeEntries),
  };
};

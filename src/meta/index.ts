import { totalSum, perWeek } from "./time-summary";
import { totalSum as totalCostSum } from "./cost-summary";
import { HarvestReportLambdaTimeEntry } from "../time-entries";

interface Meta {
  description: "All hours for the current month.";
  totalUnbilledHours: ReturnType<typeof totalSum>;
  totalUnbilledHoursPerWeek: ReturnType<typeof perWeek>;
  unbilledInvoice: ReturnType<typeof totalCostSum>;
}

export const hoursMeta = (
  relevantTimeEntries: HarvestReportLambdaTimeEntry[]
): Meta => {
  return {
    description: "All hours for the current month.",
    totalUnbilledHours: totalSum(relevantTimeEntries),
    totalUnbilledHoursPerWeek: perWeek(relevantTimeEntries),
    unbilledInvoice: totalCostSum(relevantTimeEntries),
  };
};

import { totalSum, perWeek } from "./time-summary";
import { totalSum as totalCostSum } from "./cost-summary";
import { HarvestReportLambdaTimeEntry } from "../time-entries";

interface Meta {
  description: "All hours for the current month.";
  totalBillableHours: ReturnType<typeof totalSum>;
  totalBillableHoursPerWeek: ReturnType<typeof perWeek>;
  invoice: ReturnType<typeof totalCostSum>;
}

export const hoursMeta = (
  relevantTimeEntries: HarvestReportLambdaTimeEntry[]
): Meta => {
  return {
    description: "All hours for the current month.",
    totalBillableHours: totalSum(relevantTimeEntries),
    totalBillableHoursPerWeek: perWeek(relevantTimeEntries),
    invoice: totalCostSum(relevantTimeEntries),
  };
};

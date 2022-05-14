import { totalSum, perWeek } from "./time-summary";
import { totalSum as totalCostSum } from "./cost-summary";
import { HarvestReportLambdaTimeEntry } from "../time-entries";

interface MetaSlim {
  totalBillableHours: ReturnType<typeof totalSum>;
  totalBillableHoursPerWeek: ReturnType<typeof perWeek>;
}

export const getInvoiceSumExcludingVAT = (
  relevantTimeEntries: HarvestReportLambdaTimeEntry[]
): ReturnType<typeof totalCostSum>["excludingVAT"] => {
  return totalCostSum(relevantTimeEntries).excludingVAT;
};

export const hoursMetaSlim = (
  relevantTimeEntries: HarvestReportLambdaTimeEntry[]
): MetaSlim => {
  return {
    totalBillableHours: totalSum(relevantTimeEntries),
    totalBillableHoursPerWeek: perWeek(relevantTimeEntries),
  };
};

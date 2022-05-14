import { totalSum, perWeek } from "./time-summary";
import { totalSum as totalCostSum } from "./cost-summary";
import { HarvestReportLambdaTimeEntry } from "../time-entries";

interface Meta {
  invoice: ReturnType<typeof totalCostSum>;
}

interface MetaSlim {
  totalBillableHours: ReturnType<typeof totalSum>;
  totalBillableHoursPerWeek: ReturnType<typeof perWeek>;
}

export const hoursMeta = (
  relevantTimeEntries: HarvestReportLambdaTimeEntry[]
): Meta => {
  return {
    invoice: totalCostSum(relevantTimeEntries),
  };
};

export const hoursMetaSlim = (
  relevantTimeEntries: HarvestReportLambdaTimeEntry[]
): MetaSlim => {
  return {
    totalBillableHours: totalSum(relevantTimeEntries),
    totalBillableHoursPerWeek: perWeek(relevantTimeEntries),
  };
};

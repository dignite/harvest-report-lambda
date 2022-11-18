import { totalSum, perWeek } from "./time-summary";
import { totalExcludingVAT } from "./cost-summary";
import { HarvestReportLambdaTimeEntry } from "../time-entries";

interface MetaSlim {
  totalBillableHours: ReturnType<typeof totalSum>;
  totalBillableHoursPerWeek: ReturnType<typeof perWeek>;
}

export const getInvoiceSumExcludingVAT = (
  relevantTimeEntries: HarvestReportLambdaTimeEntry[]
): ReturnType<typeof totalExcludingVAT> => {
  return totalExcludingVAT(relevantTimeEntries);
};

export const hoursMetaSlim = (
  relevantTimeEntries: HarvestReportLambdaTimeEntry[]
): MetaSlim => {
  return {
    totalBillableHours: totalSum(relevantTimeEntries),
    totalBillableHoursPerWeek: perWeek(relevantTimeEntries),
  };
};

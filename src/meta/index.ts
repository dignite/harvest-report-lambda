import { totalSum, perWeek, perMonth } from "./time-summary";
import { totalSum as totalCostSum } from "./cost-summary";
import { HarvestReportLambdaTimeEntry } from "../time-entries";

interface Meta {
  description: "*All* unbilled billable hours, and any non-billable hours logged for the current month.";
  totalUnbilledHours: ReturnType<typeof totalSum>;
  totalUnbilledHoursPerWeek: ReturnType<typeof perWeek>;
  unbilledInvoice: ReturnType<typeof totalCostSum>;
}

export const hoursMeta = (
  relevantTimeEntries: HarvestReportLambdaTimeEntry[]
): Meta => {
  return {
    description:
      "*All* unbilled billable hours, and any non-billable hours logged for the current month.",
    totalUnbilledHours: totalSum(relevantTimeEntries),
    totalUnbilledHoursPerWeek: perWeek(relevantTimeEntries),
    unbilledInvoice: totalCostSum(relevantTimeEntries),
  };
};

interface MonthByMonthMeta {
  timePerWeekPerMonth: {
    [x: string]: ReturnType<typeof perWeek>;
  }[];
}

export const monthByMonthMeta = (
  relevantTimeEntries: HarvestReportLambdaTimeEntry[]
): MonthByMonthMeta => {
  const groupedByMonth = perMonth(relevantTimeEntries);
  return {
    timePerWeekPerMonth: Object.keys(groupedByMonth).map((month) => ({
      [month]: perWeek(groupedByMonth[month]),
    })),
  };
};

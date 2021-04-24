const timeSummary = require("./time-summary");
const costSummary = require("./cost-summary");

const hoursMeta = (relevantTimeEntries) => {
  return {
    description:
      "*All* unbilled billable hours, and any non-billable hours logged for the current month.",
    totalUnbilledHours: timeSummary.totalSum(relevantTimeEntries),
    totalUnbilledHoursPerWeek: timeSummary.perWeek(relevantTimeEntries),
    unbilledInvoice: costSummary.totalSum(relevantTimeEntries),
  };
};

module.exports.hoursMeta = hoursMeta;

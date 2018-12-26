const timeSummary = require("./time-summary");
const costSummary = require("./cost-summary");
const serverlessAbsolutePath = require("./serverless-absolute-path");

const hoursMeta = (relevantTimeEntries, event) => {
  return {
    description:
      "*All* unbilled billable hours, and any non-billable hours logged for the current month.",
    totalUnbilledHours: timeSummary.totalSum(relevantTimeEntries),
    totalUnbilledHoursPerWeek: timeSummary.perWeek(relevantTimeEntries),
    unbilledInvoice: costSummary.totalSum(relevantTimeEntries),
    csvFile: serverlessAbsolutePath.resolve(event, `${event.path}.csv`)
  };
};

module.exports.hoursMeta = hoursMeta;

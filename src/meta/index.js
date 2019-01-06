const timeSummary = require("./time-summary");
const costSummary = require("./cost-summary");
const serverlessAbsolutePath = require("./serverless-absolute-path");

const hoursMeta = (relevantTimeEntries, event) => {
  const meta = {
    description:
      "*All* unbilled billable hours, and any non-billable hours logged for the current month.",
    totalUnbilledHours: timeSummary.totalSum(relevantTimeEntries),
    totalUnbilledHoursPerWeek: timeSummary.perWeek(relevantTimeEntries),
    unbilledInvoice: costSummary.totalSum(relevantTimeEntries)
  };
  return onCsvRoute(event)
    ? Object.assign({}, meta, {
        jsonFile: serverlessAbsolutePath.resolve(
          event,
          jsonRouteFromCsvRouteEvent(event)
        )
      })
    : Object.assign({}, meta, {
        csvFile: serverlessAbsolutePath.resolve(
          event,
          csvRouteFromJsonRouteEvent(event)
        )
      });
};

const onCsvRoute = event => event.path.indexOf(".csv") !== -1;
const jsonRouteFromCsvRouteEvent = event => event.path.replace(".csv", "");
const csvRouteFromJsonRouteEvent = event => `${event.path}.csv`;

module.exports.hoursMeta = hoursMeta;

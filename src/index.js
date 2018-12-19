"use strict";

const timeEntries = require("./time-entries");
const timePerDay = require("./time-per-day");
const timeSummary = require("./time-summary");
const costSummary = require("./cost-summary");
const { serialize } = require("./serializer");
const { timestampForFilename } = require("./date");
const serverlessAbsolutePath = require("./serverless-absolute-path");
const {
  csvFromObjectTransposed,
  csvFromObjectWithoutBOM
} = require("./npm-package-encapsulation/csv");

module.exports.root = async () => {
  return {
    statusCode: 404,
    body: "Not Found"
  };
};

module.exports.hours = async event => {
  const relevantTimeEntries = await timeEntries.getRelevantUnbilled();
  return {
    statusCode: 200,
    body: serialize({
      meta: await hoursMeta(relevantTimeEntries, event),
      timeEntriesPerDay: timePerDay.merge(relevantTimeEntries)
    })
  };
};

module.exports.hoursCsv = async event => {
  const relevantTimeEntries = await timeEntries.getRelevantUnbilled();
  const timeEntriesPerDay = timePerDay.merge(relevantTimeEntries);
  const meta = await hoursMeta(relevantTimeEntries, event);
  return {
    statusCode: 200,
    headers: {
      "Content-Disposition": `attachment; filename=unbilled-hours-${timestampForFilename()}.csv`
    },
    body: [
      csvFromObjectTransposed(meta),
      csvFromObjectWithoutBOM(timeEntriesPerDay)
    ].join("\n\n")
  };
};

const hoursMeta = async (relevantTimeEntries, event) => {
  return {
    description:
      "*All* unbilled billable hours, and any non-billable hours logged for the current month.",
    totalUnbilledHours: timeSummary.totalSum(relevantTimeEntries),
    totalUnbilledHoursPerWeek: timeSummary.perWeek(relevantTimeEntries),
    unbilledInvoice: costSummary.totalSum(relevantTimeEntries),
    csvFile: serverlessAbsolutePath.resolve(event, `${event.path}.csv`)
  };
};

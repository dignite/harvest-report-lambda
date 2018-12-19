"use strict";

const timeEntries = require("./time-entries");
const timePerDay = require("./time-per-day");
const timeSummary = require("./time-summary");
const costSummary = require("./cost-summary");
const { serialize } = require("./serializer");
const { timestampForFilename } = require("./date");
const serverlessAbsolutePath = require("./serverless-absolute-path");
const json2csv = require("json2csv");

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
      meta: await hoursMeta(event),
      timeEntriesPerDay: timePerDay.merge(relevantTimeEntries)
    })
  };
};

module.exports.hoursCsv = async event => {
  const relevantTimeEntries = await timeEntries.getRelevantUnbilled();
  const timeEntriesPerDay = timePerDay.merge(relevantTimeEntries);
  const meta = await hoursMeta(event);
  const transposedMeta = objectToArrayOfArrays(meta);
  return {
    statusCode: 200,
    headers: {
      "Content-Disposition": `attachment; filename=unbilled-hours-${timestampForFilename()}.csv`
    },
    body: [
      json2csv.parse(transposedMeta, {
        withBOM: true,
        delimiter: ";",
        header: false
      }),
      json2csv.parse(timeEntriesPerDay, {
        withBOM: false,
        delimiter: ";",
        fields: ["date", "name", "billableHours", "comment"]
      })
    ].join("\n\n")
  };
};

const objectToArrayOfArrays = obj => {
  if (typeof obj === "object") {
    return Object.keys(obj).map(key => [key, obj[key]]);
  }
  return obj;
};

const hoursMeta = async event => {
  const relevantTimeEntries = await timeEntries.getRelevantUnbilled();
  return {
    description:
      "*All* unbilled billable hours, and any non-billable hours logged for the current month.",
    totalUnbilledHours: timeSummary.totalSum(relevantTimeEntries),
    totalUnbilledHoursPerWeek: timeSummary.perWeek(relevantTimeEntries),
    unbilledInvoice: costSummary.totalSum(relevantTimeEntries),
    csvFile: serverlessAbsolutePath.resolve(event, `${event.path}.csv`)
  };
};

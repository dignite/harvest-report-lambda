"use strict";

const timeEntries = require("./time-entries");
const timePerDay = require("./time-per-day");
const { hoursMeta } = require("./meta");
const { serialize } = require("./serializer");
const { timestampForFilename } = require("./date");
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
      meta: hoursMeta(relevantTimeEntries, event),
      timeEntriesPerDay: timePerDay.merge(relevantTimeEntries)
    })
  };
};

module.exports.hoursCsv = async event => {
  const relevantTimeEntries = await timeEntries.getRelevantUnbilled();
  const timeEntriesPerDay = timePerDay.merge(relevantTimeEntries);
  const meta = hoursMeta(relevantTimeEntries, event);
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

"use strict";

const timeEntries = require("./time-entries");
const timePerDay = require("./time-per-day");
const { hoursMeta } = require("./meta");
const { serialize } = require("./serializer");

module.exports.root = async () => {
  return {
    statusCode: 404,
    body: "Not Found",
  };
};

module.exports.hours = async () => {
  const relevantTimeEntries = await timeEntries.getRelevantUnbilled();
  return {
    statusCode: 200,
    body: serialize({
      meta: hoursMeta(relevantTimeEntries),
      timeEntriesPerDay: timePerDay.merge(relevantTimeEntries),
    }),
  };
};

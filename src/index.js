"use strict";

const timeEntries = require("./time-entries");
const timePerDay = require("./time-per-day");
const timeSummary = require("./time-summary");
const { serialize } = require("./serializer");

module.exports.root = async () => {
  return {
    statusCode: 404,
    body: "Not Found"
  };
};

module.exports.hours = async () => {
  const relevantTimeEntries = await timeEntries.getRelevantUnbilled();
  return {
    statusCode: 200,
    body: serialize({
      meta: {
        description:
          "*All* unbilled billable hours, and any non-billable hours logged for the current month.",
        totalUnbilledHours: timeSummary.totalSum(relevantTimeEntries),
        totalUnbilledHoursPerWeek: timeSummary.perWeek(relevantTimeEntries)
      },
      timeEntriesPerDay: timePerDay.merge(relevantTimeEntries)
    })
  };
};

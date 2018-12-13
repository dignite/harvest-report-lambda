"use strict";

const timeEntries = require("./time-entries");
const timePerDay = require("./time-per-day");
const { serialize } = require("./serializer");

module.exports.hours = async () => {
  const relevantTimeEntries = await timeEntries.getRelevantUnbilled();
  return {
    statusCode: 200,
    body: serialize({
      meta: {
        description:
          "*All* unbilled billable hours, and any non-billable hours logged for the current month."
      },
      timeEntriesPerDay: timePerDay.merge(relevantTimeEntries)
    })
  };
};

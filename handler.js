"use strict";

const timeEntries = require("./src/time-entries");
const timePerDay = require("./src/time-per-day");

module.exports.hours = async () => {
  const relevantTimeEntries = await timeEntries.getRelevantUnbilled();
  return {
    statusCode: 200,
    body: JSON.stringify({
      meta: {
        description:
          "*All* unbilled billable hours, and any non-billable hours logged for the current month."
      },
      timeEntriesPerDay: timePerDay.merge(relevantTimeEntries)
    })
  };
};

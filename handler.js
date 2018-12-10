"use strict";

const timeEntries = require("./src/time-entries");

module.exports.hours = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      meta: {
        description:
          "*All* unbilled billable hours, and any non-billable hours logged for the current month."
      },
      timeEntries: await timeEntries.getUnbilledRelevantTimeEntries()
    })
  };
};

"use strict";

const harvest = require("./src/dignatconsultingab-harvest");

module.exports.hours = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      timeEntries: await harvest.getUnbilledRelevantTimeEntries()
    })
  };
};

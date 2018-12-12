const Harvest = require("harvest").default;
const { HARVEST_ACCESS_TOKEN, HARVEST_ACCOUNT_ID } = require("./process-env");
const harvest = new Harvest({
  userAgent: "dignatconsultingab-harvest-report-lambda (daniel@dignat.se)",
  concurrency: 1,
  auth: {
    accessToken: HARVEST_ACCESS_TOKEN,
    accountId: HARVEST_ACCOUNT_ID
  }
});

module.exports = harvest;

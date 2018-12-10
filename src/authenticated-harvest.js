const Harvest = require("harvest").default;
const harvest = new Harvest({
  userAgent: "dignatconsultingab-harvest-report-lambda (daniel@dignat.se)",
  concurrency: 1,
  auth: {
    accessToken: process.env.HARVEST_ACCESS_TOKEN,
    accountId: process.env.HARVEST_ACCOUNT_ID
  }
});

module.exports = harvest;

const Harvest = require("harvest").default;
const get = require("../process-env");

const harvest = new Harvest({
  userAgent: `harvest-report-lambda (${get("USER_AGENT_EMAIL")})`,
  concurrency: 1,
  auth: {
    accessToken: get("HARVEST_ACCESS_TOKEN"),
    accountId: get("HARVEST_ACCOUNT_ID"),
  },
});

module.exports = harvest;

const Harvest = require("harvest").default;
const {
  HARVEST_ACCESS_TOKEN,
  HARVEST_ACCOUNT_ID,
  USER_AGENT_EMAIL
} = require("../process-env");

const harvest = new Harvest({
  userAgent: `harvest-report-lambda (${USER_AGENT_EMAIL})`,
  concurrency: 1,
  auth: {
    accessToken: HARVEST_ACCESS_TOKEN,
    accountId: HARVEST_ACCOUNT_ID
  }
});

module.exports = harvest;

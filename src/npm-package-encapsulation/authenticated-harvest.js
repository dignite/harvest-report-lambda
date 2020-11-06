const Harvest = require("harvest").default;
const { getMandatoryEnvironmentVariable } = require("../process-env");

const harvest = new Harvest({
  userAgent: `harvest-report-lambda (${getMandatoryEnvironmentVariable(
    "USER_AGENT_EMAIL"
  )})`,
  concurrency: 1,
  auth: {
    accessToken: getMandatoryEnvironmentVariable("HARVEST_ACCESS_TOKEN"),
    accountId: getMandatoryEnvironmentVariable("HARVEST_ACCOUNT_ID"),
  },
});

module.exports = harvest;

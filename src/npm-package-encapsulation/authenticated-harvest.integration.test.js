require("dotenv").config();
const authenticatedHarvest = require("./authenticated-harvest");
const { getMandatoryEnvironmentVariable } = require("../process-env");

jest.unmock("harvest");
+jest.unmock("../process-env");

const testIfAllDefined = (...args) =>
  args.some((arg) => getMandatoryEnvironmentVariable(arg) === arg)
    ? test.skip
    : test;

const testIfEnvSetup = testIfAllDefined(
  "HARVEST_ACCESS_TOKEN",
  "HARVEST_ACCOUNT_ID",
  "USER_AGENT_EMAIL"
);

describe("authenticatedHarvest integration test", () => {
  testIfEnvSetup("should get time entries", async () => {
    const timeEntriesListResult = await authenticatedHarvest.timeEntries.list({
      per_page: 2,
    });
    expect(timeEntriesListResult.time_entries).toHaveLength(2);
  });
});

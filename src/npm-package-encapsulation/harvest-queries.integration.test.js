const dotenv = require("dotenv");
dotenv.config();

const { getUnbilledTimeEntries } = require("./harvest-queries");

const get = require("../process-env");

const testIfAllDefined = (...args) =>
  args.some((key) => get(key) === undefined) ? test.skip : test;

const testIfEnvSetup = testIfAllDefined(
  "HARVEST_ACCESS_TOKEN",
  "HARVEST_ACCOUNT_ID",
  "USER_AGENT_EMAIL"
);

describe(getUnbilledTimeEntries, () => {
  testIfEnvSetup(
    "should return all billable but unbilled and non-billable hours",
    async () => {
      const result = await getUnbilledTimeEntries();

      expect(result.length).toBeGreaterThan(0);
    }
  );
});

import "dotenv/config.js";

import { getUnbilledTimeEntries } from "./harvest-queries";

import { get } from "../process-env";

const areAllDefined = (args: string[]) =>
  args.every((key) => get(key) !== undefined);

const isTestEnvSetup = areAllDefined([
  "HARVEST_ACCESS_TOKEN",
  "HARVEST_ACCOUNT_ID",
  "USER_AGENT_EMAIL",
]);

describe("getUnbilledTimeEntries function", () => {
  isTestEnvSetup
    ? it("should return all billable but unbilled and non-billable hours", async () => {
        expect.assertions(1);

        const result = await getUnbilledTimeEntries();

        expect(result.length).toBeGreaterThan(0);
      })
    : it.todo(
        "should return all billable but unbilled and non-billable hours (not tested due to missing environment variables)"
      );
});

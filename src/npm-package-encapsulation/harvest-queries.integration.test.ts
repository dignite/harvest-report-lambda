import dotenv from "dotenv";
dotenv.config();

import { getUnbilledTimeEntries } from "./harvest-queries";

import { get } from "../process-env";

const testIfAllDefined = (args: string[]) =>
  args.some((key) => get(key) === undefined) ? test.skip : test;

const testIfEnvSetup = testIfAllDefined([
  "HARVEST_ACCESS_TOKEN",
  "HARVEST_ACCOUNT_ID",
  "USER_AGENT_EMAIL",
]);

describe("getUnbilledTimeEntries function", () => {
  testIfEnvSetup(
    "should return all billable but unbilled and non-billable hours",
    async () => {
      const result = await getUnbilledTimeEntries();

      expect(result.length).toBeGreaterThan(0);
    }
  );
});

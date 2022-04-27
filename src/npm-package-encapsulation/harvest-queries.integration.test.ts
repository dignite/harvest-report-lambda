import "dotenv/config.js";

import { getTimeEntriesForMonth } from "./harvest-queries";
import { startOfMonth, lastDayOfMonth } from "../date";

import { get } from "../process-env";

const areAllDefined = (args: string[]) =>
  args.every((key) => get(key) !== undefined);

const isTestEnvSetup = areAllDefined([
  "HARVEST_ACCESS_TOKEN",
  "HARVEST_ACCOUNT_ID",
  "USER_AGENT_EMAIL",
]);

describe("getTimeEntriesForMonth function", () => {
  isTestEnvSetup
    ? it("should return all hours for month", async () => {
        expect.assertions(1);

        const result = await getTimeEntriesForMonth(
          startOfMonth(),
          lastDayOfMonth()
        );

        expect(result.length).toBeGreaterThan(0);
      })
    : it.todo(
        "should return all hours for month (not tested due to missing environment variables)"
      );
});

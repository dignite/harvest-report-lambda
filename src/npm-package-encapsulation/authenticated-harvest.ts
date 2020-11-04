import Harvest from "harvest";
import { getMandatoryEnvironmentVariable } from "../process-env";

export const authenticatedHarvest = new Harvest({
  userAgent: `harvest-report-lambda (${getMandatoryEnvironmentVariable(
    "USER_AGENT_EMAIL"
  )})`,
  concurrency: 1,
  auth: {
    accessToken: getMandatoryEnvironmentVariable("HARVEST_ACCESS_TOKEN"),
    accountId: getMandatoryEnvironmentVariable("HARVEST_ACCOUNT_ID"),
  },
  subdomain: "",
});

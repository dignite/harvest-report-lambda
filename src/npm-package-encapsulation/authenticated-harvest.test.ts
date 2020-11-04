import { authenticatedHarvest } from "./authenticated-harvest";
import { Config } from "harvest";

jest.mock("harvest", () =>
  jest.fn((options: Config) => {
    if (
      options.auth.accessToken !== "Value from process.env.HARVEST_ACCESS_TOKEN"
    ) {
      throw new Error(
        `Got options.auth.accessToken="${options.auth.accessToken}" but expected "Value from process.env.HARVEST_ACCESS_TOKEN"`
      );
    }
    if (
      options.auth.accountId !== "Value from process.env.HARVEST_ACCOUNT_ID"
    ) {
      throw new Error(
        `Got options.auth.accountId="${options.auth.accountId}" but expected "Value from process.env.HARVEST_ACCOUNT_ID"`
      );
    }
    return {
      origin: "instance of harvest wrapper",
      userAgent: options.userAgent,
      concurrency: options.concurrency,
    };
  })
);

jest.mock("../process-env");

describe("authenticatedHarvest", () => {
  test("should authenticate with user agent", () => {
    expect(authenticatedHarvest.userAgent).toEqual(
      "harvest-report-lambda (Value from process.env.USER_AGENT_EMAIL)"
    );
  });
  test("should authenticate with no concurrency", () => {
    expect(authenticatedHarvest.concurrency).toEqual(1);
  });
});

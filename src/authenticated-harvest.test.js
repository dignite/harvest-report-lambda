/* eslint-disable fp/no-nil, fp/no-unused-expression */
const authenticatedHarvest = require("./authenticated-harvest");

jest.mock("harvest", () => ({
  default: jest.fn(options => ({
    origin: "instance of harvest wrapper",
    options
  }))
}));

jest.mock("./process-env");

describe("authenticatedHarvest", () => {
  test("should return instance of harvest api wrapper", () => {
    expect(authenticatedHarvest.origin).toEqual("instance of harvest wrapper");
  });
  test("should authenticate with user agent", () => {
    expect(authenticatedHarvest.options).toEqual(
      expect.objectContaining({
        userAgent: "dignatconsultingab-harvest-report-lambda (daniel@dignat.se)"
      })
    );
  });
  test("should authenticate with no concurrency", () => {
    expect(authenticatedHarvest.options).toEqual(
      expect.objectContaining({
        concurrency: 1
      })
    );
  });
  test("should authenticate with account id and access token", () => {
    expect(authenticatedHarvest.options).toEqual(
      expect.objectContaining({
        auth: {
          accessToken: "Value from process.env.HARVEST_ACCESS_TOKEN",
          accountId: "Value from process.env.HARVEST_ACCOUNT_ID"
        }
      })
    );
  });
});

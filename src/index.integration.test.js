const functions = require("./");
const { server } = require("./__mocks__/mock-service-worker/server");
const {
  prepareGetTimeEntriesSuccess,
} = require("./__mocks__/mock-service-worker/harvest-handlers");

jest.mock("./process-env", () => ({
  get: (key) => `Value from process.env.${key}`,
}));
jest.mock("./serializer", () => ({
  serialize: (input) => ({
    "serialize() of": input,
  }),
}));

describe(`hours integration test mostly real modules`, () => {
  test("should return meta data for time entries and relevant time entries per day", async () => {
    server.resetHandlers(
      prepareGetTimeEntriesSuccess({
        userAgent:
          "harvest-report-lambda (Value from process.env.USER_AGENT_EMAIL)",
        accessToken: "Value from process.env.HARVEST_ACCESS_TOKEN",
        accountId: "Value from process.env.HARVEST_ACCOUNT_ID",
      })
    );

    const result = await functions.hours();

    expect(result).toMatchSnapshot();
  });
});

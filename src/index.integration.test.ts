import { hours } from "./";
import { server } from "./__mocks__/mock-service-worker/server";
import { prepareGetTimeEntriesSuccess } from "./__mocks__/mock-service-worker/harvest-handlers";

jest.mock("./process-env", () => ({
  get: (key: string) => `Value from process.env.${key}`,
}));
jest.mock("./serializer", () => ({
  serialize: (input: unknown) => ({
    "serialize() of": input,
  }),
}));

describe(`hours integration test mostly real modules`, () => {
  it("should return meta data for time entries and relevant time entries per day", async () => {
    expect.assertions(1);
    server.resetHandlers(
      prepareGetTimeEntriesSuccess({
        userAgent:
          "harvest-report-lambda (Value from process.env.USER_AGENT_EMAIL)",
        accessToken: "Value from process.env.HARVEST_ACCESS_TOKEN",
        accountId: "Value from process.env.HARVEST_ACCOUNT_ID",
        isBilledQueryParameter: "false",
      })
    );

    const result = await hours();

    expect(result).toMatchSnapshot();
  });
});

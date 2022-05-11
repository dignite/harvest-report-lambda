import { hoursForCurrentMonth, hoursPerDayForCurrentMonth } from "./";
import { server } from "./mock-service-worker/server";
import { prepareGetTimeEntriesSuccess } from "./mock-service-worker/harvest-handlers";
import { lastDayOfMonth, startOfMonth } from "./date";

jest.mock("./process-env", () => ({
  get: (key: string) => `Value from process.env.${key}`,
}));
jest.mock("./serializer", () => ({
  serialize: (input: unknown) => ({
    "serialize() of": input,
  }),
}));

describe(`hoursForCurrentMonth integration test mostly real modules`, () => {
  it("should return meta data for time entries", async () => {
    expect.assertions(1);
    const from = startOfMonth();
    const formattedFromDate =
      from.getFullYear() +
      "-" +
      ("0" + (from.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + from.getDate()).slice(-2);
    const to = lastDayOfMonth();
    const formattedToDate =
      to.getFullYear() +
      "-" +
      ("0" + (to.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + to.getDate()).slice(-2);
    server.resetHandlers(
      prepareGetTimeEntriesSuccess({
        userAgent:
          "harvest-report-lambda (Value from process.env.USER_AGENT_EMAIL)",
        accessToken: "Value from process.env.HARVEST_ACCESS_TOKEN",
        accountId: "Value from process.env.HARVEST_ACCOUNT_ID",
        isBilledQueryParameter: "false",
        isFromQueryParameter: formattedFromDate,
        isToQueryParameter: formattedToDate,
      })
    );

    const result = await hoursForCurrentMonth();

    expect(result).toMatchSnapshot();
  });
});

describe(`hoursPerDayForCurrentMonth integration test mostly real modules`, () => {
  it("should return relevant time entries per day", async () => {
    expect.assertions(1);
    const from = startOfMonth();
    const formattedFromDate =
      from.getFullYear() +
      "-" +
      ("0" + (from.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + from.getDate()).slice(-2);
    const to = lastDayOfMonth();
    const formattedToDate =
      to.getFullYear() +
      "-" +
      ("0" + (to.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + to.getDate()).slice(-2);
    server.resetHandlers(
      prepareGetTimeEntriesSuccess({
        userAgent:
          "harvest-report-lambda (Value from process.env.USER_AGENT_EMAIL)",
        accessToken: "Value from process.env.HARVEST_ACCESS_TOKEN",
        accountId: "Value from process.env.HARVEST_ACCOUNT_ID",
        isBilledQueryParameter: "false",
        isFromQueryParameter: formattedFromDate,
        isToQueryParameter: formattedToDate,
      })
    );

    const result = await hoursPerDayForCurrentMonth();

    expect(result).toMatchSnapshot();
  });
});

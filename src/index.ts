import { get } from "./time-entries";
import { merge } from "./time-per-day";
import { hoursMeta } from "./meta";
import { serialize } from "./serializer";
import { startOfMonth, lastDayOfMonth } from "./date";

interface ServerlessLambdaResponse {
  statusCode: 404 | 200;
  headers: {
    "Access-Control-Allow-Origin": "*";
    "Access-Control-Allow-Credentials": true;
  };
  body: string;
}

export const root = async (): Promise<ServerlessLambdaResponse> => {
  return {
    statusCode: 404,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: "Not Found",
  };
};

export const hours = async (): Promise<ServerlessLambdaResponse> => {
  const relevantTimeEntries = await get(startOfMonth(), lastDayOfMonth());
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: serialize({
      meta: hoursMeta(relevantTimeEntries),
    }),
  };
};

export const hoursPerDay = async (): Promise<ServerlessLambdaResponse> => {
  const relevantTimeEntries = await get(startOfMonth(), lastDayOfMonth());
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: serialize({
      timeEntriesPerDay: merge(relevantTimeEntries),
    }),
  };
};

export const invoice = async (): Promise<ServerlessLambdaResponse> => {
  const relevantTimeEntries = await get(startOfMonth(), lastDayOfMonth());
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: serialize({
      totalExcludingVAT: hoursMeta(relevantTimeEntries).invoice.excludingVAT,
    }),
  };
};

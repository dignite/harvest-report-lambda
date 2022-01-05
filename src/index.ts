import { getRelevantUnbilled, getYear } from "./time-entries";
import { merge } from "./time-per-day";
import { hoursMeta, monthByMonthMeta } from "./meta";
import { serialize } from "./serializer";

interface ServerlessLambdaResponse {
  statusCode: 404 | 200;
  headers: {
    "Access-Control-Allow-Origin": "*";
    "Access-Control-Allow-Credentials": true;
  };
  body: string;
}

interface ServerlessLambdaEvent {
  pathParameters: Record<string, string>;
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
  const relevantTimeEntries = await getRelevantUnbilled();
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: serialize({
      meta: hoursMeta(relevantTimeEntries),
      timeEntriesPerDay: merge(relevantTimeEntries),
    }),
  };
};

export const hoursPerMonth = async (
  event: ServerlessLambdaEvent
): Promise<ServerlessLambdaResponse> => {
  const relevantTimeEntries = await getYear(
    parseInt(event.pathParameters.year, 10)
  );
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: serialize(monthByMonthMeta(relevantTimeEntries)),
  };
};

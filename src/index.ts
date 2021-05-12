import { getRelevantUnbilled } from "./time-entries";
import { merge } from "./time-per-day";
import { hoursMeta } from "./meta";
import { serialize } from "./serializer";

interface ServerlessLambdaResponse {
  statusCode: 404 | 200;
  body: string;
}

export const root = async (): Promise<ServerlessLambdaResponse> => {
  return {
    statusCode: 404,
    body: "Not Found",
  };
};

export const hours = async (): Promise<ServerlessLambdaResponse> => {
  const relevantTimeEntries = await getRelevantUnbilled();
  return {
    statusCode: 200,
    body: serialize({
      meta: hoursMeta(relevantTimeEntries),
      timeEntriesPerDay: merge(relevantTimeEntries),
    }),
  };
};

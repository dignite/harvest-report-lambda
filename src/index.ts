import { get } from "./time-entries";
import { getInvoiceSumExcludingVAT, hoursMetaSlim } from "./meta";
import { serialize } from "./serializer";

interface ServerlessLambdaEvent {
  pathParameters: Record<string, string>;
}

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

export const hours = async (
  event: ServerlessLambdaEvent
): Promise<ServerlessLambdaResponse> => {
  const startDate = new Date(Date.parse(event.pathParameters.startDate));
  const endDate = new Date(Date.parse(event.pathParameters.endDate));
  const relevantTimeEntries = await get(startDate, endDate);
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: serialize(hoursMetaSlim(relevantTimeEntries)),
  };
};

export const invoice = async (
  event: ServerlessLambdaEvent
): Promise<ServerlessLambdaResponse> => {
  const startDate = new Date(Date.parse(event.pathParameters.startDate));
  const endDate = new Date(Date.parse(event.pathParameters.endDate));
  const relevantTimeEntries = await get(startDate, endDate);
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: serialize({
      totalExcludingVAT: getInvoiceSumExcludingVAT(relevantTimeEntries),
    }),
  };
};

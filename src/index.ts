import { getRelevantUnbilled } from "./time-entries";
import { merge } from "./time-per-day";
import { hoursMeta } from "./meta";
import { serialize } from "./serializer";

interface ServerlessLambdaResponse {
  statusCode: 404 | 200;
  headers?: {
    "Content-Type": "text/html";
  };
  body: string;
}

export const root = async (): Promise<ServerlessLambdaResponse> => {
  return {
    statusCode: 404,
    body: "Not Found",
  };
};

export const frontend = async (): Promise<ServerlessLambdaResponse> => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html",
    },
    body: `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Hours</title>
      </head>
      <body>
        <script>
          const link = document.createElement("a");
          link.href = location.href + "/api/hours";
          link.innerText = "/api/hours";
          document.body.appendChild(link);
        </script>
      </body>
    </html>
    `,
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

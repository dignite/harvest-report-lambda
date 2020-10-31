const serverlessAbsolutePath = require("./serverless-absolute-path");

describe(serverlessAbsolutePath.resolve, () => {
  test("should resolve to localhost when offline", () => {
    const offlineEvent = {
      isOffline: true,
    };

    const url = serverlessAbsolutePath.resolve(
      offlineEvent,
      "/2917be0a-0c26-4dc3-afbb-89a74f294eea"
    );

    expect(url).toEqual(
      "http://localhost:3000/2917be0a-0c26-4dc3-afbb-89a74f294eea"
    );
  });

  test("should resolve to https + dev when deployed", () => {
    const devLambdaEvent = {
      headers: {
        "X-Forwarded-Proto": "https",
        Host: "example.uri",
      },
      requestContext: {
        stage: "dev",
      },
    };

    const url = serverlessAbsolutePath.resolve(
      devLambdaEvent,
      "/02ba2f76-4144-4136-bfc2-ea1a8c0235c9"
    );

    expect(url).toEqual(
      "https://example.uri/dev/02ba2f76-4144-4136-bfc2-ea1a8c0235c9"
    );
  });

  test("should resolve to https + prod when deployed", () => {
    const prodLambdaEvent = {
      headers: {
        "X-Forwarded-Proto": "https",
        Host: "example.uri",
      },
      requestContext: {
        stage: "prod",
      },
    };

    const url = serverlessAbsolutePath.resolve(
      prodLambdaEvent,
      "/fb1d10e9-32bc-4ed5-b6d9-8b9da7897211"
    );

    expect(url).toEqual(
      "https://example.uri/prod/fb1d10e9-32bc-4ed5-b6d9-8b9da7897211"
    );
  });

  test("should resolve to http protocol if deployed to http endpoint", () => {
    const prodLambdaEvent = {
      headers: {
        "X-Forwarded-Proto": "http",
        Host: "example.uri",
      },
      requestContext: {
        stage: "insecure",
      },
    };

    const url = serverlessAbsolutePath.resolve(
      prodLambdaEvent,
      "/28a965eb-4bfd-4c11-bcb2-278cb92a3fc3"
    );

    expect(url).toEqual(
      "http://example.uri/insecure/28a965eb-4bfd-4c11-bcb2-278cb92a3fc3"
    );
  });
});

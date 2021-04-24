const functions = require("./");

describe(`hours integration test with all real modules except those in the folder __mocks__`, () => {
  test("should return meta data for time entries and relevant time entries per day", async () => {
    const event = {
      path: "/my-path",
      headers: {
        "X-Forwarded-Proto": "https",
        Host: "example.uri",
      },
      requestContext: {
        stage: "integration-test",
      },
    };

    const result = await functions.hours(event);

    expect(result).toMatchSnapshot();
  });
});

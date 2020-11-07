const functions = require("./");
const MockDate = require("mockdate");

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

describe(`hoursCsv integration test with all real modules except those in the folder __mocks__`, () => {
  test("should return status code and attachment file name and csv containing meta and per-day entries", async () => {
    MockDate.set(new Date("2011-11-22"));
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

    const result = await functions.hoursCsv(event);

    expect(result).toMatchSnapshot();
  });
});

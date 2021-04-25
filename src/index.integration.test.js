const functions = require("./");

describe(`hours integration test with all real modules except those in the folder __mocks__`, () => {
  test("should return meta data for time entries and relevant time entries per day", async () => {
    const result = await functions.hours();

    expect(result).toMatchSnapshot();
  });
});

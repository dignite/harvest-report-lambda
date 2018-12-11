const authenticatedHarvest = require("./authenticated-harvest");
const mockHarvest = require("harvest");

jest.mock("harvest", () => ({
  default: function FakeHarvest(options) {
    this.options = options;
  }
}));

describe("authenticatedHarvest", () => {
  test("should return instance of harvest api wrapper", () => {
    expect(authenticatedHarvest).toBeInstanceOf(mockHarvest.default);
  });
  xtest("should authenticate with account id and access token", () => {});
});

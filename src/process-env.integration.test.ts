import { get } from "./process-env";

describe("procces-env wrapper", () => {
  it("should return undefined if environment variable not found", () => {
    expect.assertions(1);
    expect(get("WHlksadlkdsadasds")).toBeUndefined();
  });

  it("should return NODE_ENV test", () => {
    expect.assertions(1);
    expect(get("NODE_ENV")).toStrictEqual("test");
  });
});

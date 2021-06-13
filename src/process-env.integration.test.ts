import { get } from "./process-env";

test("should return undefined if environment variable not found", () => {
  expect.assertions(1);
  expect(get("WHlksadlkdsadasds")).toBeUndefined();
});

test("should return NODE_ENV test", () => {
  expect.assertions(1);
  expect(get("NODE_ENV")).toStrictEqual("test");
});

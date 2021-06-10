import { get } from "./process-env";

test("should return undefined if environment variable not found", () => {
  expect(get("WHlksadlkdsadasds")).toStrictEqual(undefined);
});

test("should return NODE_ENV test", () => {
  expect(get("NODE_ENV")).toStrictEqual("test");
});

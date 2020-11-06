import { getMandatoryEnvironmentVariable } from "./process-env";

test("should return key if environment variable not found", () => {
  expect(getMandatoryEnvironmentVariable("WHlksadlkdsadasds")).toEqual(
    "WHlksadlkdsadasds"
  );
});

test("should return NODE_ENV test", () => {
  expect(getMandatoryEnvironmentVariable("NODE_ENV")).toEqual("test");
});

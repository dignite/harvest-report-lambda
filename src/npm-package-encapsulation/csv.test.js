const csv = require("./csv");

const BOM = "\uFEFF";

describe(csv.csvFromObjectWithBOM, () => {
  test("should create semicolor separated csv from object with BOM", () => {
    const input = {
      one: 1,
      two: 2,
      three: 3,
      pi: "between 3 and 4"
    };

    const result = csv.csvFromObjectWithBOM(input);

    expect(result).toEqual(
      `${BOM}"one";"two";"three";"pi"\r\n1;2;3;"between 3 and 4"`
    );
  });
});

describe(csv.csvFromObjectWithoutBOM, () => {
  test("should create semicolor separated csv from object without BOM", () => {
    const input = {
      four: true,
      five: false,
      six: "half a dozen"
    };

    const result = csv.csvFromObjectWithoutBOM(input);

    expect(result).toEqual(`"four";"five";"six"\r\ntrue;false;"half a dozen"`);
  });
});

describe(csv.csvFromObjectTransposed, () => {
  test("should create transposed semicolor separated csv from object with BOM", () => {
    const input = {
      four: true,
      five: false,
      six: "half a dozen"
    };

    const result = csv.csvFromObjectTransposed(input);

    expect(result).toEqual(
      `${BOM}"four";true\r\n"five";false\r\n"six";"half a dozen"`
    );
  });
});

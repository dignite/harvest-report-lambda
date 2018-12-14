const { SEK } = require("./swedish-crowns");

describe(SEK, () => {
  describe("add", () => {
    test("should print 13.37 nicely", () => {
      const thirteenThirtySeven = SEK(13.37);

      const result = `${thirteenThirtySeven}`;

      expect(result).toEqual("SEK 13.37");
    });

    test("should print 3.3333333 nicely", () => {
      const oneThirdOfTen = SEK(3.3333333);

      const result = `${oneThirdOfTen}`;

      expect(result).toEqual("SEK 3.33");
    });

    test("should print 2.03 nicely", () => {
      const twoOhThree = SEK(2.03);

      const result = `${twoOhThree}`;

      expect(result).toEqual("SEK 2.03");
    });
  });
  describe("add", () => {
    test("should add 13.37 + 2.03", () => {
      const sum = SEK(13.37).add(SEK(2.03));

      expect(sum.toString()).toEqual("SEK 15.40");
    });
  });

  describe("addVAT", () => {
    test("should add 6% VAT", () => {
      const result = SEK(100).addVAT(6);

      expect(result.toString()).toEqual("SEK 106.00");
    });

    test("should add 25% VAT", () => {
      const result = SEK(100).addVAT(25);

      expect(result.toString()).toEqual("SEK 125.00");
    });
  });

  describe("multiply", () => {
    test("should multiply by 4.1", () => {
      const result = SEK(3.33).multiply(4.1);

      expect(result.toString()).toEqual("SEK 13.65");
    });
  });
});

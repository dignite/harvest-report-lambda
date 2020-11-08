import { SEK } from "./swedish-crowns";

describe(SEK, () => {
  describe("add", () => {
    test("should print 13.37 nicely", () => {
      const thirteenThirtySeven = SEK(13.37);

      const result = `${thirteenThirtySeven}`;

      expect(result).toEqual("13.37 Swedish kronor");
    });

    test("should print 3.3333333 nicely", () => {
      const oneThirdOfTen = SEK(3.3333333);

      const result = `${oneThirdOfTen}`;

      expect(result).toEqual("3.33 Swedish kronor");
    });

    test("should print 2.03 nicely", () => {
      const twoOhThree = SEK(2.03);

      const result = `${twoOhThree}`;

      expect(result).toEqual("2.03 Swedish kronor");
    });
  });
  describe("add", () => {
    test("should add 13.37 + 2.03", () => {
      const sum = SEK(13.37).add(SEK(2.03));

      expect(sum.toString()).toEqual("15.40 Swedish kronor");
    });
  });

  describe("addVAT", () => {
    test("should add 6% VAT", () => {
      const result = SEK(100).addVAT(6);

      expect(result.toString()).toEqual("106.00 Swedish kronor");
    });

    test("should add 25% VAT", () => {
      const result = SEK(100).addVAT(25);

      expect(result.toString()).toEqual("125.00 Swedish kronor");
    });
  });

  describe("multiply", () => {
    test("should multiply by 4.1", () => {
      const result = SEK(3.33).multiply(4.1);

      expect(result.toString()).toEqual("13.65 Swedish kronor");
    });
  });
});

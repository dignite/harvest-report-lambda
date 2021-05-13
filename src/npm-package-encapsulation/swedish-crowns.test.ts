import { SEK } from "./swedish-crowns";

const nonBreakingSpace = String.fromCharCode(160);

describe(SEK, () => {
  describe("add", () => {
    test("should print 13.37 nicely", () => {
      const thirteenThirtySeven = SEK(13.37);

      const result = `${thirteenThirtySeven}`;

      expect(result).toEqual(`13,37${nonBreakingSpace}kr`);
    });

    test("should print 3.3333333 nicely", () => {
      const oneThirdOfTen = SEK(3.3333333);

      const result = `${oneThirdOfTen}`;

      expect(result).toEqual(`3,33${nonBreakingSpace}kr`);
    });

    test("should print 2.03 nicely", () => {
      const twoOhThree = SEK(2.03);

      const result = `${twoOhThree}`;

      expect(result).toEqual(`2,03${nonBreakingSpace}kr`);
    });

    test("should print 1000202.03 nicely", () => {
      const twoOhThree = SEK(1000202.03);

      const result = `${twoOhThree}`;

      expect(result).toEqual(
        `1${nonBreakingSpace}000${nonBreakingSpace}202,03${nonBreakingSpace}kr`
      );
    });
  });
  describe("add", () => {
    test("should add 13.37 + 2.03", () => {
      const sum = SEK(13.37).add(SEK(2.03));

      expect(sum.toString()).toEqual(`15,40${nonBreakingSpace}kr`);
    });
  });

  describe("addVAT", () => {
    test("should add 6% VAT", () => {
      const result = SEK(100).addVAT(6);

      expect(result.toString()).toEqual(`106,00${nonBreakingSpace}kr`);
    });

    test("should add 25% VAT", () => {
      const result = SEK(100).addVAT(25);

      expect(result.toString()).toEqual(`125,00${nonBreakingSpace}kr`);
    });
  });

  describe("multiply", () => {
    test("should multiply by 4.1", () => {
      const result = SEK(3.33).multiply(4.1);

      expect(result.toString()).toEqual(`13,65${nonBreakingSpace}kr`);
    });
  });
});

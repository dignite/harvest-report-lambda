import { SEK } from "./swedish-crowns";

const nonBreakingSpace = String.fromCharCode(160);

describe("the SEK function", () => {
  describe("toString function", () => {
    it("should print 13.37 nicely", () => {
      expect.assertions(1);
      const thirteenThirtySeven = SEK(13.37);

      const result = `${thirteenThirtySeven}`;

      expect(result).toStrictEqual(`13,37${nonBreakingSpace}kr`);
    });

    it("should print 3.3333333 nicely", () => {
      expect.assertions(1);
      const oneThirdOfTen = SEK(3.3333333);

      const result = `${oneThirdOfTen}`;

      expect(result).toStrictEqual(`3,33${nonBreakingSpace}kr`);
    });

    it("should print 2.03 nicely", () => {
      expect.assertions(1);
      const twoOhThree = SEK(2.03);

      const result = `${twoOhThree}`;

      expect(result).toStrictEqual(`2,03${nonBreakingSpace}kr`);
    });

    it("should print 1000202.03 nicely", () => {
      expect.assertions(1);
      const twoOhThree = SEK(1000202.03);

      const result = `${twoOhThree}`;

      expect(result).toStrictEqual(
        `1${nonBreakingSpace}000${nonBreakingSpace}202,03${nonBreakingSpace}kr`
      );
    });
  });
  describe("add function", () => {
    it("should add 13.37 + 2.03", () => {
      expect.assertions(1);
      const sum = SEK(13.37).add(SEK(2.03));

      expect(sum.toString()).toStrictEqual(`15,40${nonBreakingSpace}kr`);
    });
  });

  describe("addVAT function", () => {
    it("should add 6% VAT", () => {
      expect.assertions(1);
      const result = SEK(100).addVAT(6);

      expect(result.toString()).toStrictEqual(`106,00${nonBreakingSpace}kr`);
    });

    it("should add 25% VAT", () => {
      expect.assertions(1);
      const result = SEK(100).addVAT(25);

      expect(result.toString()).toStrictEqual(`125,00${nonBreakingSpace}kr`);
    });
  });

  describe("multiply function", () => {
    it("should multiply by 4.1", () => {
      expect.assertions(1);
      const result = SEK(3.33).multiply(4.1);

      expect(result.toString()).toStrictEqual(`13,65${nonBreakingSpace}kr`);
    });
  });
});

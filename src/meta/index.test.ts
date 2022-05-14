import { getInvoiceSumExcludingVAT } from "./";

const nonBreakingSpace = String.fromCharCode(160);

describe("getInvoiceSumExcludingVAT function", () => {
  const novemberThird = {
    id: 1,
    date: "2018-11-03",
    name: "Programming",
    billableHours: 3.1,
    cost: 964.1,
    comment: "",
  };
  const novemberFourth = {
    id: 2,
    date: "2018-11-04",
    name: "Programming",
    billableHours: 4.1,
    cost: 1275.1,
    comment: "",
  };
  const novemberSixth = {
    id: 3,
    date: "2018-11-06",
    name: "Programming",
    billableHours: 4.1,
    cost: 1275.1,
    comment: "",
  };
  const relevantTimeEntries = [novemberThird, novemberFourth, novemberSixth];

  it("should return total unbilled invoice size", () => {
    expect.assertions(1);
    const result = getInvoiceSumExcludingVAT(relevantTimeEntries);

    expect(result).toStrictEqual(
      `3${nonBreakingSpace}514,30${nonBreakingSpace}kr`
    );
  });
});

import { hoursMeta } from "./";

const nonBreakingSpace = String.fromCharCode(160);

describe("hoursMeta function", () => {
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

  it("should return status code and endpoint description", () => {
    expect.assertions(1);
    const result = hoursMeta(relevantTimeEntries);

    expect(result.description).toStrictEqual(
      "*All* unbilled billable hours, and any non-billable hours logged for the current month."
    );
  });

  it("should return total unbilled billable hours", () => {
    expect.assertions(1);
    const result = hoursMeta(relevantTimeEntries);

    expect(result.totalUnbilledHours).toStrictEqual(11.3);
  });

  it("should return total unbilled billable hours per week", () => {
    expect.assertions(1);
    const result = hoursMeta(relevantTimeEntries);

    expect(result.totalUnbilledHoursPerWeek).toStrictEqual({
      w44: 7.2,
      w45: 4.1,
    });
  });

  it("should return total unbilled invoice size", () => {
    expect.assertions(1);
    const result = hoursMeta(relevantTimeEntries);

    expect(result.unbilledInvoice).toStrictEqual({
      excludingVAT: `3${nonBreakingSpace}514,30${nonBreakingSpace}kr`,
      includingVAT: `4${nonBreakingSpace}392,88${nonBreakingSpace}kr`,
    });
  });

  it("should not return anything unexpected", () => {
    expect.assertions(1);
    const result = hoursMeta(relevantTimeEntries);

    expect(Object.keys(result)).toStrictEqual([
      "description",
      "totalUnbilledHours",
      "totalUnbilledHoursPerWeek",
      "unbilledInvoice",
    ]);
  });
});

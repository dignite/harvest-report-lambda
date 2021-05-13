import { hoursMeta } from "./";

const nonBreakingSpace = String.fromCharCode(160);

describe(hoursMeta, () => {
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

  test("should return status code and endpoint description", () => {
    const result = hoursMeta(relevantTimeEntries);

    expect(result.description).toEqual(
      "*All* unbilled billable hours, and any non-billable hours logged for the current month."
    );
  });

  test("should return total unbilled billable hours", () => {
    const result = hoursMeta(relevantTimeEntries);

    expect(result.totalUnbilledHours).toEqual(11.3);
  });

  test("should return total unbilled billable hours per week", () => {
    const result = hoursMeta(relevantTimeEntries);

    expect(result.totalUnbilledHoursPerWeek).toEqual({ w44: 7.2, w45: 4.1 });
  });

  test("should return total unbilled invoice size", () => {
    const result = hoursMeta(relevantTimeEntries);

    expect(result.unbilledInvoice).toEqual({
      excludingVAT: `3${nonBreakingSpace}514,30${nonBreakingSpace}kr`,
      includingVAT: `4${nonBreakingSpace}392,88${nonBreakingSpace}kr`,
    });
  });

  test("should not return anything unexpected", () => {
    const result = hoursMeta(relevantTimeEntries);

    expect(Object.keys(result)).toEqual([
      "description",
      "totalUnbilledHours",
      "totalUnbilledHoursPerWeek",
      "unbilledInvoice",
    ]);
  });
});

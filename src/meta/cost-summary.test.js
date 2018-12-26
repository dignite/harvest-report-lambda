const costSummary = require("./cost-summary");

describe(costSummary.totalSum, () => {
  test("should return zero for zero time entries", () => {
    const result = costSummary.totalSum([]);

    expect(result).toEqual({
      excludingVAT: "0.00 Swedish kronor",
      includingVAT: "0.00 Swedish kronor"
    });
  });

  test("should return cost from single time entry", () => {
    const novemberThird = {
      id: 1,
      date: "2018-11-03",
      name: "Programming",
      billableHours: 3.1,
      cost: 1000,
      comment: null
    };

    const result = costSummary.totalSum([novemberThird]);

    expect(result).toEqual({
      excludingVAT: "1000.00 Swedish kronor",
      includingVAT: "1250.00 Swedish kronor"
    });
  });

  test("should return cost from collection of time entries", () => {
    const novemberThird = {
      id: 1,
      date: "2018-11-03",
      name: "Programming",
      billableHours: 3.1,
      cost: 964.1,
      comment: null
    };
    const novemberFourth = {
      id: 2,
      date: "2018-11-04",
      name: "Programming",
      billableHours: 4.1,
      cost: 1275.1,
      comment: null
    };
    const novemberSixth = {
      id: 3,
      date: "2018-11-06",
      name: "Programming",
      billableHours: 4.1,
      cost: 1275.1,
      comment: null
    };

    const result = costSummary.totalSum([
      novemberThird,
      novemberFourth,
      novemberSixth
    ]);

    expect(result).toEqual({
      excludingVAT: "3514.30 Swedish kronor",
      includingVAT: "4392.88 Swedish kronor"
    });
  });
});

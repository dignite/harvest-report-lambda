import { totalSum } from "./cost-summary";

const nonBreakingSpace = String.fromCharCode(160);

describe(totalSum, () => {
  test("should return zero for zero time entries", () => {
    expect.assertions(1);
    const result = totalSum([]);

    expect(result).toStrictEqual({
      excludingVAT: `0,00${nonBreakingSpace}kr`,
      includingVAT: `0,00${nonBreakingSpace}kr`,
    });
  });

  test("should return cost from single time entry", () => {
    expect.assertions(1);
    const novemberThird = {
      id: 1,
      date: "2018-11-03",
      name: "Programming",
      billableHours: 3.1,
      cost: 1000,
      comment: "",
    };

    const result = totalSum([novemberThird]);

    expect(result).toStrictEqual({
      excludingVAT: `1${nonBreakingSpace}000,00${nonBreakingSpace}kr`,
      includingVAT: `1${nonBreakingSpace}250,00${nonBreakingSpace}kr`,
    });
  });

  test("should return cost from collection of time entries", () => {
    expect.assertions(1);
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

    const result = totalSum([novemberThird, novemberFourth, novemberSixth]);

    expect(result).toStrictEqual({
      excludingVAT: `3${nonBreakingSpace}514,30${nonBreakingSpace}kr`,
      includingVAT: `4${nonBreakingSpace}392,88${nonBreakingSpace}kr`,
    });
  });
});

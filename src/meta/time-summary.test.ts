import { totalSum, perWeek } from "./time-summary";

describe(totalSum, () => {
  test("should return zero for zero time entries", () => {
    expect.assertions(1);
    const result = totalSum([]);

    expect(result).toStrictEqual(0);
  });

  test("should return hours from single time entry", () => {
    expect.assertions(1);
    const novemberThird = {
      id: 1,
      date: "2018-11-03",
      name: "Programming",
      billableHours: 3.1,
      cost: 0,
      comment: "",
    };

    const result = totalSum([novemberThird]);

    expect(result).toStrictEqual(3.1);
  });

  test("should return sum from collection of time entries", () => {
    expect.assertions(1);
    const novemberThird = {
      id: 1,
      date: "2018-11-03",
      name: "Programming",
      billableHours: 3.1,
      cost: 0,
      comment: "",
    };
    const novemberFourth = {
      id: 2,
      date: "2018-11-04",
      name: "Programming",
      billableHours: 4.1,
      cost: 0,
      comment: "",
    };
    const novemberSixth = {
      id: 3,
      date: "2018-11-06",
      name: "Programming",
      billableHours: 4.12,
      cost: 0,
      comment: "",
    };

    const result = totalSum([novemberThird, novemberFourth, novemberSixth]);

    expect(result).toStrictEqual(11.3);
  });
});

describe(perWeek, () => {
  test("should return empty object for zero time entries", () => {
    expect.assertions(1);
    const result = perWeek([]);

    expect(result).toStrictEqual({});
  });

  test("should return weekly hours from single time entry", () => {
    expect.assertions(1);
    const novemberThird = {
      id: 1,
      date: "2018-11-03",
      name: "Programming",
      billableHours: 3.1,
      cost: 0,
      comment: "",
    };

    const result = perWeek([novemberThird]);

    expect(result).toStrictEqual({
      w44: 3.1,
    });
  });

  test("should return weekly sum from collection of same-week time entries", () => {
    expect.assertions(1);
    const novemberThird = {
      id: 1,
      date: "2018-11-03",
      name: "Programming",
      billableHours: 3.1,
      cost: 0,
      comment: "",
    };
    const novemberFourth = {
      id: 2,
      date: "2018-11-04",
      name: "Programming",
      billableHours: 4.1,
      cost: 0,
      comment: "",
    };

    const result = perWeek([novemberThird, novemberFourth]);

    expect(result).toStrictEqual({
      w44: 7.2,
    });
  });

  test("should return weekly sum from collection of spread out time entries", () => {
    expect.assertions(1);
    const novemberThird = {
      id: 1,
      date: "2018-11-03",
      name: "Programming",
      billableHours: 3.1,
      cost: 0,
      comment: "",
    };
    const novemberFourth = {
      id: 2,
      date: "2018-11-04",
      name: "Programming",
      billableHours: 4.1,
      cost: 0,
      comment: "",
    };
    const novemberSixth = {
      id: 3,
      date: "2018-11-06",
      name: "Programming",
      billableHours: 4.1,
      cost: 0,
      comment: "",
    };

    const result = perWeek([novemberThird, novemberFourth, novemberSixth]);

    expect(result).toStrictEqual({
      w44: 7.2,
      w45: 4.1,
    });
  });
});

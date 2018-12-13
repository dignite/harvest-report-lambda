/* eslint-disable fp/no-nil, fp/no-unused-expression */
const timeSummary = require("./time-summary");

describe(timeSummary.totalSum, () => {
  test("should return zero for zero time entries", () => {
    const result = timeSummary.totalSum([]);

    expect(result).toEqual(0);
  });

  test("should return hours from single time entry", () => {
    const novemberThird = {
      id: 1,
      date: "2018-11-03",
      name: "Programming",
      billableHours: 3.1,
      comment: null
    };

    const result = timeSummary.totalSum([novemberThird]);

    expect(result).toEqual(3.1);
  });

  test("should return sum from collection of time entries", () => {
    const novemberThird = {
      id: 1,
      date: "2018-11-03",
      name: "Programming",
      billableHours: 3.1,
      comment: null
    };
    const novemberFourth = {
      id: 2,
      date: "2018-11-04",
      name: "Programming",
      billableHours: 4.1,
      comment: null
    };
    const novemberSixth = {
      id: 3,
      date: "2018-11-06",
      name: "Programming",
      billableHours: 4.1,
      comment: null
    };

    const result = timeSummary.totalSum([
      novemberThird,
      novemberFourth,
      novemberSixth
    ]);

    expect(result).toEqual(11.3);
  });
});

describe(timeSummary.perWeek, () => {
  test("should return empty object for zero time entries", () => {
    const result = timeSummary.perWeek([]);

    expect(result).toEqual({});
  });

  test("should return weekly hours from single time entry", () => {
    const novemberThird = {
      id: 1,
      date: "2018-11-03",
      name: "Programming",
      billableHours: 3.1,
      comment: null
    };

    const result = timeSummary.perWeek([novemberThird]);

    expect(result).toEqual({
      w44: 3.1
    });
  });

  test("should return weekly sum from collection of same-week time entries", () => {
    const novemberThird = {
      id: 1,
      date: "2018-11-03",
      name: "Programming",
      billableHours: 3.1,
      comment: null
    };
    const novemberFourth = {
      id: 2,
      date: "2018-11-04",
      name: "Programming",
      billableHours: 4.1,
      comment: null
    };

    const result = timeSummary.perWeek([novemberThird, novemberFourth]);

    expect(result).toEqual({
      w44: 7.2
    });
  });

  test("should return weekly sum from collection of spread out time entries", () => {
    const novemberThird = {
      id: 1,
      date: "2018-11-03",
      name: "Programming",
      billableHours: 3.1,
      comment: null
    };
    const novemberFourth = {
      id: 2,
      date: "2018-11-04",
      name: "Programming",
      billableHours: 4.1,
      comment: null
    };
    const novemberSixth = {
      id: 3,
      date: "2018-11-06",
      name: "Programming",
      billableHours: 4.1,
      comment: null
    };

    const result = timeSummary.perWeek([
      novemberThird,
      novemberFourth,
      novemberSixth
    ]);

    expect(result).toEqual({
      w44: 7.2,
      w45: 4.1
    });
  });
});

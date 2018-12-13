/* eslint-disable fp/no-nil, fp/no-unused-expression */
const timePerDay = require("./time-per-day");

describe(timePerDay.merge, () => {
  test("should throw if not provided time entries", () => {
    expect(() => timePerDay.merge()).toThrowError(
      new Error("First argument timeEntries not provided!")
    );
  });

  test("should return distinct time entries as-is", () => {
    const novemberThird = {
      id: 1,
      date: "2018-11-03",
      name: "Programming",
      billableHours: 3.1,
      comment: null
    };
    const novemberFourth = {
      id: 3,
      date: "2018-11-04",
      name: "Programming",
      billableHours: 4.1,
      comment: null
    };
    const listWithNoDateClashes = [novemberThird, novemberFourth];
    const input = listWithNoDateClashes;

    const result = timePerDay.merge(input);

    expect(result).toEqual(input);
  });

  test("should merge morning and afternoon work time entries", () => {
    const novemberThird = {
      id: 1,
      date: "2018-11-03",
      name: "Programming",
      billableHours: 3.1,
      comment: null
    };
    const novemberThirdAfterLunch = {
      id: 2,
      date: "2018-11-03",
      name: "Programming",
      billableHours: 5,
      comment: null
    };

    const result = timePerDay.merge([novemberThird, novemberThirdAfterLunch]);

    expect(result).toEqual([
      {
        id: 2,
        date: "2018-11-03",
        name: "Programming",
        billableHours: 8.1,
        comment: null
      }
    ]);
  });

  test("should merge morning and afternoon vacation time entries", () => {
    const novemberFifthVacation = {
      id: 4,
      date: "2018-11-05",
      name: "Vacation",
      billableHours: 0,
      comment: null
    };
    const novemberFifthVacationAfterLunch = {
      id: 5,
      date: "2018-11-05",
      name: "Vacation",
      billableHours: 0,
      comment: null
    };

    const result = timePerDay.merge([
      novemberFifthVacation,
      novemberFifthVacationAfterLunch
    ]);

    expect(result).toEqual([
      {
        id: 5,
        date: "2018-11-05",
        name: "Vacation",
        billableHours: 0,
        comment: null
      }
    ]);
  });

  test("should merge half sick day (sick in the afternoon)", () => {
    const novemberSixth = {
      id: 6,
      date: "2018-11-06",
      name: "Programming",
      billableHours: 4.1,
      comment: null
    };
    const novemberSixthSickAfterLunch = {
      id: 7,
      date: "2018-11-06",
      name: "Sick",
      billableHours: 0,
      comment: null
    };

    const result = timePerDay.merge([
      novemberSixth,
      novemberSixthSickAfterLunch
    ]);

    expect(result).toEqual([
      {
        id: 7,
        date: "2018-11-06",
        name: "Programming + Sick",
        billableHours: 4.1,
        comment: null
      }
    ]);
  });

  test("should merge half sick day (sick in the morning)", () => {
    const novemberSeventhSickMorning = {
      id: 8,
      date: "2018-11-07",
      name: "Sick",
      billableHours: 0,
      comment: null
    };
    const novemberSeventhAfterLunch = {
      id: 9,
      date: "2018-11-07",
      name: "Programming",
      billableHours: 5,
      comment: null
    };

    const result = timePerDay.merge([
      novemberSeventhSickMorning,
      novemberSeventhAfterLunch
    ]);

    expect(result).toEqual([
      {
        id: 9,
        date: "2018-11-07",
        name: "Sick + Programming",
        billableHours: 5,
        comment: null
      }
    ]);
  });
});

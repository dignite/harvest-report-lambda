import { merge } from "./time-per-day";
import { HarvestReportLambdaTimeEntry } from "./time-entries";

describe("merge function", () => {
  it("should return distinct time entries as-is without id", () => {
    expect.assertions(1);
    const novemberThird: HarvestReportLambdaTimeEntry = {
      id: 1,
      date: "2018-11-03",
      name: "Programming",
      billableHours: 3.1,
      comment: "",
      cost: 3,
    };
    const novemberFourth: HarvestReportLambdaTimeEntry = {
      id: 3,
      date: "2018-11-04",
      name: "Programming",
      billableHours: 4.1,
      comment: "",
      cost: 3,
    };
    const listWithNoDateClashes = [novemberThird, novemberFourth];
    const input = listWithNoDateClashes;

    const result = merge(input);

    expect(result).toStrictEqual([
      {
        date: "2018-11-03",
        name: "Programming",
        billableHours: 3.1,
        comment: "",
      },
      {
        date: "2018-11-04",
        name: "Programming",
        billableHours: 4.1,
        comment: "",
      },
    ]);
  });

  it("should merge morning and afternoon work time entries", () => {
    expect.assertions(1);
    const novemberThird: HarvestReportLambdaTimeEntry = {
      id: 1,
      date: "2018-11-03",
      name: "Programming",
      billableHours: 3.1,
      comment: "",
      cost: 3,
    };
    const novemberThirdAfterLunch: HarvestReportLambdaTimeEntry = {
      id: 2,
      date: "2018-11-03",
      name: "Programming",
      billableHours: 5,
      comment: "",
      cost: 3,
    };

    const result = merge([novemberThird, novemberThirdAfterLunch]);

    expect(result).toStrictEqual([
      {
        date: "2018-11-03",
        name: "Programming",
        billableHours: 8.1,
        comment: "",
      },
    ]);
  });

  it("should merge morning and afternoon vacation time entries", () => {
    expect.assertions(1);
    const novemberFifthVacation: HarvestReportLambdaTimeEntry = {
      id: 4,
      date: "2018-11-05",
      name: "Vacation",
      billableHours: 0,
      comment: "",
      cost: 0,
    };
    const novemberFifthVacationAfterLunch: HarvestReportLambdaTimeEntry = {
      id: 5,
      date: "2018-11-05",
      name: "Vacation",
      billableHours: 0,
      comment: "",
      cost: 0,
    };

    const result = merge([
      novemberFifthVacation,
      novemberFifthVacationAfterLunch,
    ]);

    expect(result).toStrictEqual([
      {
        date: "2018-11-05",
        name: "Vacation",
        billableHours: 0,
        comment: "",
      },
    ]);
  });

  it("should merge half sick day (sick in the afternoon)", () => {
    expect.assertions(1);
    const novemberSixth: HarvestReportLambdaTimeEntry = {
      id: 6,
      date: "2018-11-06",
      name: "Programming",
      billableHours: 4.1,
      comment: "",
      cost: 3,
    };
    const novemberSixthSickAfterLunch: HarvestReportLambdaTimeEntry = {
      id: 7,
      date: "2018-11-06",
      name: "Sick",
      billableHours: 0,
      comment: "",
      cost: 3,
    };

    const result = merge([novemberSixth, novemberSixthSickAfterLunch]);

    expect(result).toStrictEqual([
      {
        date: "2018-11-06",
        name: "Programming + Sick",
        billableHours: 4.1,
        comment: "",
      },
    ]);
  });

  it("should merge half sick day (sick in the morning)", () => {
    expect.assertions(1);
    const novemberSeventhSickMorning: HarvestReportLambdaTimeEntry = {
      id: 8,
      date: "2018-11-07",
      name: "Sick",
      billableHours: 0,
      comment: "",
      cost: 0,
    };
    const novemberSeventhAfterLunch: HarvestReportLambdaTimeEntry = {
      id: 9,
      date: "2018-11-07",
      name: "Programming",
      billableHours: 5,
      comment: "",
      cost: 3,
    };

    const result = merge([
      novemberSeventhSickMorning,
      novemberSeventhAfterLunch,
    ]);

    expect(result).toStrictEqual([
      {
        date: "2018-11-07",
        name: "Sick + Programming",
        billableHours: 5,
        comment: "",
      },
    ]);
  });
});

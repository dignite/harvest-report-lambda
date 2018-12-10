const harvestClient = require("./dignatconsultingab-harvest");
const MockHarvestConstructor = require("harvest").default;
const { when } = require("jest-when");

jest.mock("harvest", () => {
  const mockListTimeEntries = jest.fn();
  return {
    default: function MockHarvestConstructor() {
      this.timeEntries = {
        list: mockListTimeEntries
      };
    }
  };
});

describe(harvestClient.getUnbilledRelevantTimeEntries, () => {
  const getIdsOfMatchingTimeEntries = async () => {
    when(new MockHarvestConstructor().timeEntries.list)
      .calledWith({ is_billed: "false" })
      .mockReturnValue({
        time_entries: [
          {
            id: 1,
            spent_date: "2018-12-04",
            task: {
              name: "Programming"
            },
            is_billed: false,
            billable: true,
            billable_rate: 133.7,
            hours: 4.12,
            notes: null
          },
          {
            id: 2,
            spent_date: "2018-12-03",
            task: {
              name: "Vacation"
            },
            is_billed: false,
            billable: false,
            billable_rate: null,
            hours: 8,
            notes: null
          },
          {
            id: 3,
            spent_date: "2018-02-01",
            task: {
              name: "Programming"
            },
            is_billed: true,
            billable: true,
            billable_rate: 133.7,
            hours: 7.01,
            notes: null
          },
          {
            id: 4,
            spent_date: "2018-01-01",
            task: {
              name: "Programming"
            },
            is_billed: false,
            billable: true,
            billable_rate: 133.7,
            hours: 7.01,
            notes: null
          }
        ]
      });

    const result = await harvestClient.getUnbilledRelevantTimeEntries();
    return result.map(timeEntry => timeEntry.id);
  };

  test("should return all unbilled billable hours", async () => {
    const actualIds = await getIdsOfMatchingTimeEntries();

    const expectedIds = [1, 4];
    expect(actualIds).toEqual(expect.arrayContaining(expectedIds));
  });

  test("should return non-billable hours from the current month", async () => {
    const actualIds = await getIdsOfMatchingTimeEntries();

    const expectedIds = [2];
    expect(actualIds).toEqual(expect.arrayContaining(expectedIds));
  });

  test("should not return anything but unbilled billable hours and non-billable hours from the current month", async () => {
    const actualIds = await getIdsOfMatchingTimeEntries();

    const expectedIds = [1, 2, 4];
    expect(actualIds).toEqual(expectedIds);
  });
});

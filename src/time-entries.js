const harvest = require("./npm-package-encapsulation/authenticated-harvest");
const { startOfMonth } = require("./date");
const { SEK } = require("./npm-package-encapsulation/swedish-crowns");

const getRelevantUnbilled = async () => {
  const timeEntriesResponse = await harvest.timeEntries.list({
    is_billed: "false",
  });
  const unbilledTimeEntries = timeEntriesResponse.time_entries.filter(
    isNotBilled
  );
  const relevantUnbilledEntries = unbilledTimeEntries.filter(
    fromThisMonthUnlessBillable
  );
  const mappedTimeEntries = relevantUnbilledEntries.map(timeEntry => {
    const billableHours =
      timeEntry.billable && timeEntry.billable_rate
        ? roundToNearestSixMinutes(timeEntry.hours)
        : 0;
    return {
      id: timeEntry.id,
      date: timeEntry.spent_date,
      name: timeEntry.task.name,
      billableHours,
      cost: SEK(billableHours)
        .multiply(timeEntry.billable_rate)
        .getAmount(),
      comment: timeEntry.notes,
    };
  });
  return mappedTimeEntries;
};

const isNotBilled = timeEntry => !timeEntry.is_billed;
const fromThisMonthUnlessBillable = timeEntry =>
  timeEntry.billable || Date.parse(timeEntry.spent_date) >= startOfMonth();
const roundToNearestSixMinutes = hours => Math.round(hours * 10) / 10;

module.exports.getRelevantUnbilled = getRelevantUnbilled;

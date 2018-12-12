const harvest = require("./authenticated-harvest");
const { startOfMonth } = require("./date");

const getRelevantUnbilled = async () => {
  const timeEntriesResponse = await harvest.timeEntries.list({
    is_billed: "false"
  });
  const unbilledTimeEntries = timeEntriesResponse.time_entries.filter(
    isNotBilled
  );
  const relevantUnbilledEntries = unbilledTimeEntries.filter(
    fromThisMonthUnlessBillable
  );
  const mappedTimeEntries = relevantUnbilledEntries.map(timeEntry => ({
    id: timeEntry.id,
    date: timeEntry.spent_date,
    name: timeEntry.task.name,
    billableHours:
      timeEntry.billable && timeEntry.billable_rate
        ? roundToNearestSixMinutes(timeEntry.hours)
        : 0,
    comment: timeEntry.notes
  }));
  return mappedTimeEntries;
};

const isNotBilled = timeEntry => !timeEntry.is_billed;
const fromThisMonthUnlessBillable = timeEntry =>
  timeEntry.billable || Date.parse(timeEntry.spent_date) >= startOfMonth();
const roundToNearestSixMinutes = hours => Math.round(hours * 10) / 10;

module.exports.getRelevantUnbilled = getRelevantUnbilled;

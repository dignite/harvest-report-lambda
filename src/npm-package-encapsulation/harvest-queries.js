const { authenticatedHarvest } = require("./authenticated-harvest");

module.exports.getUnbilledTimeEntries = async () => {
  const timeEntries = await authenticatedHarvest.timeEntries.list({
    is_billed: "false",
  });
  return timeEntries.time_entries.map((timeEntry) =>
    timeEntry.notes
      ? {
          billable: timeEntry.billable,
          billableRate: timeEntry.billable_rate || 0,
          comment: timeEntry.notes,
          date: timeEntry.spent_date,
          hours: timeEntry.hours,
          id: timeEntry.id,
          isBilled: timeEntry.is_billed,
          name: timeEntry.task.name,
        }
      : {
          billable: timeEntry.billable,
          billableRate: timeEntry.billable_rate || 0,
          date: timeEntry.spent_date,
          hours: timeEntry.hours,
          id: timeEntry.id,
          isBilled: timeEntry.is_billed,
          name: timeEntry.task.name,
        }
  );
};

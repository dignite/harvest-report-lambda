const Harvest = require("harvest").default;
const harvest = new Harvest({
  userAgent: "dignatconsultingab-harvest-report-lambda (daniel@dignat.se)",
  concurrency: 1,
  auth: {
    accessToken: process.env.HARVEST_ACCESS_TOKEN,
    accountId: process.env.HARVEST_ACCOUNT_ID
  }
});

const getUnbilledRelevantTimeEntries = async () => {
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
    date: timeEntry.spent_date,
    name: timeEntry.task.name,
    comment: timeEntry.notes,
    hours: roundToNearestSixMinutes(timeEntry.hours)
  }));
  return mappedTimeEntries;
};

const isNotBilled = timeEntry => !timeEntry.is_billed;
const fromThisMonthUnlessBillable = timeEntry =>
  timeEntry.billable || Date.parse(timeEntry.spent_date) >= startOfMonth();
const startOfMonth = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
};
const roundToNearestSixMinutes = hours => Math.round(hours * 10) / 10;

module.exports = {
  getUnbilledRelevantTimeEntries
};

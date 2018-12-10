'use strict';

const Harvest = require('harvest').default;
const harvest = new Harvest({
  userAgent: 'dignatconsultingab-harvest-report-lambda (daniel@dignat.se)',
  concurrency: 1,
  auth: {
    accessToken: process.env.HARVEST_ACCESS_TOKEN,
    accountId: process.env.HARVEST_ACCOUNT_ID
  }
});

const accessToken = process.env.HARVEST_ACCESS_TOKEN;
const accountId = process.env.HARVEST_ACCOUNT_ID;

module.exports.hours = async (event, context) => {
  const timeEntriesResponse = await harvest.timeEntries.list({
    is_billed: "false"
  });
  const unbilledTimeEntries = timeEntriesResponse.time_entries.filter(isNotBilled);
  const relevantUnbilledEntries = unbilledTimeEntries.filter(fromThisMonthUnlessBillable)
  const mappedTimeEntries = relevantUnbilledEntries.map(timeEntry => ({
    date: timeEntry.spent_date,
    name: timeEntry.task.name,
    billed: timeEntry.is_billed,
    comment: timeEntry.notes
  }));
  return {
    statusCode: 200,
    body: JSON.stringify({
      mappedTimeEntries,
      unmappedTimeEntries: relevantUnbilledEntries,
      input: event,
    }),
  };
};

const isNotBilled = (timeEntry) => !timeEntry.is_billed;
const fromThisMonthUnlessBillable = (timeEntry) => timeEntry.billable || Date.parse(timeEntry.spent_date) >= startOfMonth();
const startOfMonth = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
};

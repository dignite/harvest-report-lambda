const { getWeekNumber } = require("../npm-package-encapsulation/date-info");
const groupBy = require("lodash.groupby");
const mapValues = require("lodash.mapvalues");

const totalSum = timeEntries =>
  timeEntries.reduce(
    (previous, timeEntry) =>
      sumPreservingOneDecimal(previous, timeEntry.billableHours),
    0
  );

const perWeek = timeEntries => {
  const hoursWithWeekNumber = timeEntries.map(timeEntry => ({
    billableHours: timeEntry.billableHours,
    week: `w${getWeekNumber(Date.parse(timeEntry.date))}`
  }));

  const hoursByWeek = groupBy(hoursWithWeekNumber, "week");

  return mapValues(hoursByWeek, totalSum);
};

const sumPreservingOneDecimal = (value1, value2) =>
  (value1 * 10 + value2 * 10) / 10;

module.exports.totalSum = totalSum;
module.exports.perWeek = perWeek;

const {
  getUnbilledTimeEntries,
} = require("./npm-package-encapsulation/harvest-queries");
const { startOfMonth } = require("./date");
const { SEK } = require("./npm-package-encapsulation/swedish-crowns");

const getRelevantUnbilled = async () => {
  const timeEntries = await getUnbilledTimeEntries();
  const unbilledTimeEntries = timeEntries.filter(isNotBilled);
  const relevantUnbilledEntries = unbilledTimeEntries.filter(
    fromThisMonthUnlessBillable
  );
  const timeEntriesWithCost = relevantUnbilledEntries.map((timeEntry) => {
    const billableHours =
      timeEntry.billable && timeEntry.billableRate
        ? roundToNearestSixMinutes(timeEntry.hours)
        : 0;
    return {
      id: timeEntry.id,
      date: timeEntry.date,
      name: timeEntry.name,
      billableHours,
      cost: SEK(billableHours).multiply(timeEntry.billableRate).getAmount(),
      comment: timeEntry.comment,
    };
  });
  return timeEntriesWithCost;
};

const isNotBilled = (timeEntry) => !timeEntry.isBilled;
const fromThisMonthUnlessBillable = (timeEntry) =>
  timeEntry.billable || Date.parse(timeEntry.date) >= startOfMonth();
const roundToNearestSixMinutes = (hours) => Math.round(hours * 10) / 10;

module.exports.getRelevantUnbilled = getRelevantUnbilled;

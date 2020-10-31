const groupBy = require("lodash.groupby");

const merge = timeEntries => {
  if (!timeEntries) {
    throw new Error("First argument timeEntries not provided!");
  }

  const timeEntriesPerDay = groupBy(timeEntries, "date");
  const mergedTimeEntriesPerDay = Object.values(timeEntriesPerDay).map(
    mergeSingleDay
  );
  return mergedTimeEntriesPerDay;
};

const mergeSingleDay = timeEntriesInASingleDay =>
  timeEntriesInASingleDay.reduce(
    (previous, timeEntry) => ({
      date: timeEntry.date,
      name: mergeStrings(previous.name, timeEntry.name),
      billableHours: sumPreservingOneDecimal(
        previous.billableHours,
        timeEntry.billableHours
      ),
      comment: timeEntry.comment,
    }),
    {
      billableHours: 0,
    }
  );

const sumPreservingOneDecimal = (value1, value2) =>
  (value1 * 10 + value2 * 10) / 10;

const mergeStrings = (string1, string2) =>
  string1 === undefined || string1 === string2
    ? string2
    : `${string1} + ${string2}`;

module.exports.merge = merge;

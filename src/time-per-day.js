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
      id: timeEntry.id,
      date: timeEntry.date,
      name: mergeStrings(previous.name, timeEntry.name),
      billableHours: previous.billableHours + timeEntry.billableHours,
      comment: timeEntry.comment
    }),
    {
      billableHours: 0
    }
  );

const mergeStrings = (string1, string2) =>
  string1 === undefined || string1 === string2
    ? string2
    : `${string1} + ${string2}`;

module.exports.merge = merge;

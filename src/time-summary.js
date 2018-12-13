const oneDecimalPrecisionGuarantee = 10;

const totalSum = timeEntries =>
  timeEntries.reduce(
    (previous, timeEntry) =>
      previous + timeEntry.billableHours * oneDecimalPrecisionGuarantee,
    0
  ) / oneDecimalPrecisionGuarantee;

module.exports.totalSum = totalSum;

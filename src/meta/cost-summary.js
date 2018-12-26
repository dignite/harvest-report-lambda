const { SEK } = require("../npm-package-encapsulation/swedish-crowns");

const totalSum = timeEntries => {
  const cost = timeEntries.reduce(
    (previous, timeEntry) => previous.add(SEK(timeEntry.cost)),
    SEK(0)
  );
  return {
    excludingVAT: cost.toString(),
    includingVAT: cost.addVAT(25).toString()
  };
};

module.exports.totalSum = totalSum;

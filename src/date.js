const startOfMonth = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
};

const timestampForFilename = () => {
  const now = new Date();
  return now.toJSON().split("T")[0];
};

module.exports.startOfMonth = startOfMonth;
module.exports.timestampForFilename = timestampForFilename;

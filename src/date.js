const startOfMonth = () => {
  const now = new Date();
  return new Date(Date.UTC(now.getFullYear(), now.getMonth(), 1));
};

module.exports.startOfMonth = startOfMonth;

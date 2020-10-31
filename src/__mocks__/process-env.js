module.exports = new Proxy(
  {},
  {
    get: (target, key) => {
      if (key === "__esModule") {
        return false;
      }
      return `Value from process.env.${key}`;
    },
  }
);

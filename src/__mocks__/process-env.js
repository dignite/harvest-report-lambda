/* eslint-disable fp/no-proxy */
/* This is a valid use case of the Proxy, and is also only used in unit testing */
module.exports = new Proxy(
  {},
  {
    get: (target, key) => {
      if (key === "__esModule") {
        return false;
      }
      return `Value from process.env.${key}`;
    }
  }
);

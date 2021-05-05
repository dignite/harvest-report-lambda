const { setupServer } = require("msw/node");

// Setup requests interception using the given handlers.
module.exports.server = setupServer();

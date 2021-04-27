const dotenv = require("dotenv");

module.exports = async () => {
  // Load env vars into Serverless environment
  const envVars = dotenv.config({ path: ".env" }).parsed;
  return Object.assign(
    {},
    envVars, // `dotenv` environment variables
    process.env // system environment variables
  );
};

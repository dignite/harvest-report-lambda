'use strict';

const accessToken = process.env.HARVEST_ACCESS_TOKEN;
const accountId = process.env.HARVEST_ACCOUNT_ID;

module.exports.hello = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `${accessToken}, ${accountId}`,
      input: event,
    }),
  };
};

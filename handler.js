'use strict';

const Harvest = require('harvest').default;
const harvest = new Harvest({
  userAgent: 'dignatconsultingab-harvest-report-lambda (daniel@dignat.se)',
  concurrency: 1,
  auth: {
    accessToken: process.env.HARVEST_ACCESS_TOKEN,
    accountId: process.env.HARVEST_ACCOUNT_ID
  }
});

const accessToken = process.env.HARVEST_ACCESS_TOKEN;
const accountId = process.env.HARVEST_ACCOUNT_ID;

module.exports.hours = async (event, context) => {
  const company = await harvest.company.get();
  return {
    statusCode: 200,
    body: JSON.stringify({
      company,
      message: `${accessToken}, ${accountId}`,
      input: event,
    }),
  };
};

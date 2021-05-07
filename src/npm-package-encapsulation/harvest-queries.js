const fetch = require("node-fetch");
const get = require("../process-env");

module.exports.getUnbilledTimeEntries = async () => {
  const res = await fetch(
    "https://api.harvestapp.com/v2/time_entries?is_billed=false",
    {
      method: "get",
      headers: {
        Authorization: `Bearer ${get("HARVEST_ACCESS_TOKEN")}`,
        "Harvest-Account-Id": get("HARVEST_ACCOUNT_ID"),
        "User-Agent": `harvest-report-lambda (${get("USER_AGENT_EMAIL")})`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(
      `Error getting time entries: ${res.status} ${
        res.statusText
      }, ${await res.text()}`
    );
  }
  const json = await res.json();

  return json.time_entries.map((timeEntry) =>
    timeEntry.notes
      ? {
          billable: timeEntry.billable,
          billableRate: timeEntry.billable_rate || 0,
          comment: timeEntry.notes,
          date: timeEntry.spent_date,
          hours: timeEntry.hours,
          id: timeEntry.id,
          isBilled: timeEntry.is_billed,
          name: timeEntry.task.name,
        }
      : {
          billable: timeEntry.billable,
          billableRate: timeEntry.billable_rate || 0,
          date: timeEntry.spent_date,
          hours: timeEntry.hours,
          id: timeEntry.id,
          isBilled: timeEntry.is_billed,
          name: timeEntry.task.name,
        }
  );
};

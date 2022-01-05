import fetch from "node-fetch";
import { get } from "../process-env";
import { paths, components } from "../harvest-v2-types";

export interface SimplifiedUnbilledTimeEntry {
  billable: components["schemas"]["TimeEntry"]["billable"];
  billableRate: number;
  comment: NonNullable<components["schemas"]["TimeEntry"]["notes"]>;
  date: NonNullable<components["schemas"]["TimeEntry"]["spent_date"]>;
  hours: components["schemas"]["TimeEntry"]["hours"];
  id: components["schemas"]["TimeEntry"]["id"];
  isBilled: components["schemas"]["TimeEntry"]["is_billed"];
  name: string;
}

type NonNullable<T> = Exclude<T, null | undefined>;

export const getUnbilledTimeEntries = async (): Promise<
  SimplifiedUnbilledTimeEntry[]
> => {
  const res = await fetch(
    "https://api.harvestapp.com/v2/time_entries?is_billed=false",
    {
      method: "get",
      headers: {
        Authorization: `Bearer ${get("HARVEST_ACCESS_TOKEN")}`,
        "Harvest-Account-Id": `${get("HARVEST_ACCOUNT_ID")}`,
        "User-Agent": `harvest-report-lambda (${get("USER_AGENT_EMAIL")})`,
      },
    }
  );

  if (!res.ok) {
    return Promise.reject(
      new Error(
        `Error getting time entries: ${res.status} ${
          res.statusText
        }, ${await res.text()}`
      )
    );
  }
  const json: paths["/time_entries"]["get"]["responses"]["200"]["content"]["application/json"] = await res.json();

  return json.time_entries.flatMap((timeEntry) =>
    timeEntry.spent_date
      ? [
          {
            billable: timeEntry.billable,
            billableRate: timeEntry.billable_rate || 0,
            comment: timeEntry.notes || "None",
            date: timeEntry.spent_date,
            hours: timeEntry.hours,
            id: timeEntry.id,
            isBilled: timeEntry.is_billed,
            name: timeEntry.task?.name || "Unnamed",
          },
        ]
      : []
  );
};

export const getTimeEntriesForYear = async (
  year: number
): Promise<SimplifiedUnbilledTimeEntry[]> => {
  return (
    await getTimeEntriesRecursive(
      `https://api.harvestapp.com/v2/time_entries?from=${year}-01-01&to=${year}-12-31`
    )
  ).flatMap((timeEntry) =>
    timeEntry.spent_date
      ? [
          {
            billable: timeEntry.billable,
            billableRate: timeEntry.billable_rate || 0,
            comment: timeEntry.notes || "None",
            date: timeEntry.spent_date,
            hours: timeEntry.hours,
            id: timeEntry.id,
            isBilled: timeEntry.is_billed,
            name: timeEntry.task?.name || "Unnamed",
          },
        ]
      : []
  );
};

const getTimeEntriesRecursive = async (
  url: string
): Promise<
  paths["/time_entries"]["get"]["responses"]["200"]["content"]["application/json"]["time_entries"]
> => {
  const res = await fetch(url, {
    method: "get",
    headers: {
      Authorization: `Bearer ${get("HARVEST_ACCESS_TOKEN")}`,
      "Harvest-Account-Id": `${get("HARVEST_ACCOUNT_ID")}`,
      "User-Agent": `harvest-report-lambda (${get("USER_AGENT_EMAIL")})`,
    },
  });

  if (!res.ok) {
    return Promise.reject(
      new Error(
        `Error getting time entries: ${res.status} ${
          res.statusText
        }, ${await res.text()}`
      )
    );
  }
  const json: paths["/time_entries"]["get"]["responses"]["200"]["content"]["application/json"] = await res.json();

  return json.links.next
    ? json.time_entries.concat(await getTimeEntriesRecursive(json.links.next))
    : json.time_entries;
};

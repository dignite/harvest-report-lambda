/* eslint-disable fp/no-nil */

import { rest } from "msw";
import { components, paths } from "../../harvest-v2-types";

interface PrepareGetTimeEntriesSuccessConfig {
  userAgent: string;
  accessToken: string;
  accountId: string;
  isBilledQueryParameter: string;
}

export const prepareGetTimeEntriesSuccess = (
  config: PrepareGetTimeEntriesSuccessConfig,
  customTimeEntries: components["schemas"]["TimeEntry"][]
): ReturnType<typeof rest.get> =>
  rest.get("https://api.harvestapp.com/v2/time_entries", (req, res, ctx) => {
    const {
      userAgent,
      accessToken,
      accountId,
      isBilledQueryParameter,
    } = config;
    const expected = {
      userAgent,
      authorization: `Bearer ${accessToken}`,
      accountId,
      isBilledQueryParameter,
    };
    const actual = {
      userAgent: req.headers.get("user-agent"),
      authorization: req.headers.get("authorization"),
      accountId: req.headers.get("Harvest-Account-Id"),
      isBilledQueryParameter: req.url.searchParams.get("is_billed"),
    };

    const correctUserAgent =
      !userAgent || expected.userAgent === actual.userAgent;
    const correctAccessToken =
      !accessToken || expected.authorization === actual.authorization;
    const correctAccountId =
      !accountId || expected.accountId === actual.accountId;
    const correctIsBilledQueryParameter =
      isBilledQueryParameter === undefined ||
      expected.isBilledQueryParameter === actual.isBilledQueryParameter;
    const correctConfig =
      correctUserAgent &&
      correctAccessToken &&
      correctAccountId &&
      correctIsBilledQueryParameter;

    return correctConfig
      ? res(
          ctx.json<
            paths["/time_entries"]["get"]["responses"]["200"]["content"]["application/json"]
          >({
            time_entries:
              customTimeEntries !== undefined
                ? customTimeEntries
                : [timeEntry1, timeEntry2, timeEntry3, timeEntry4, timeEntry5],
            per_page: 100,
            total_pages: 1,
            total_entries: 5,
            next_page: null,
            previous_page: null,
            page: 1,
            links: {
              first:
                "https://api.harvestapp.com/v2/time_entries?page=1&per_page=100&ref=first",
              next: null,
              previous: null,
              last:
                "https://api.harvestapp.com/v2/time_entries?page=1&per_page=100&ref=last",
            },
          })
        )
      : res(
          ctx.status(401),
          ctx.json({ error: "Incorrect harvest config", expected, actual, req })
        );
  });

export const getTimeEntriesError = rest.get(
  "https://api.harvestapp.com/v2/time_entries",
  (_req, res, ctx) => {
    return res(
      ctx.status(401),
      ctx.json<
        paths["/time_entries"]["get"]["responses"]["default"]["content"]["application/json"]
      >({
        message: "Error getting time entries, bad request",
      })
    );
  }
);

const timeEntry1 = {
  id: 1,
  spent_date: "2020-11-06",
  hours: 3.48,
  rounded_hours: 3.5,
  notes: null,
  is_locked: false,
  locked_reason: null,
  is_closed: false,
  is_billed: false,
  timer_started_at: null,
  started_time: "13:01",
  ended_time: "16:30",
  is_running: false,
  billable: true,
  budgeted: false,
  billable_rate: 220,
  cost_rate: null,
  created_at: "2020-11-06T12:01:01Z",
  updated_at: "2020-11-06T15:30:31Z",
  user: {
    id: 2016459,
    name: "Daniel Edholm Ignat",
  },
  client: {
    id: 98989898,
    name: "Acme AB",
    currency: "SEK",
  },
  project: {
    id: 98989899,
    name: "Acme Project X",
    code: "",
  },
  task: {
    id: 9323435,
    name: "Programmering",
  },
  user_assignment: {
    id: 192953862,
    is_project_manager: true,
    is_active: true,
    use_default_rates: true,
    budget: null,
    created_at: "2019-03-17T19:58:26Z",
    updated_at: "2019-03-17T19:58:26Z",
    hourly_rate: 220,
  },
  task_assignment: {
    id: 221049853,
    billable: true,
    is_active: true,
    created_at: "2019-03-17T19:58:26Z",
    updated_at: "2019-03-17T19:58:26Z",
    hourly_rate: 220,
    budget: null,
  },
  invoice: null,
  external_reference: null,
};

const timeEntry2 = {
  id: 2,
  spent_date: "2020-11-06",
  hours: 4.53,
  rounded_hours: 4.5,
  notes: null,
  is_locked: false,
  locked_reason: null,
  is_closed: false,
  is_billed: false,
  timer_started_at: null,
  started_time: "7:39",
  ended_time: "12:11",
  is_running: false,
  billable: true,
  budgeted: false,
  billable_rate: 220,
  cost_rate: null,
  created_at: "2020-11-06T06:39:04Z",
  updated_at: "2020-11-06T12:00:56Z",
  user: {
    id: 2016459,
    name: "Daniel Edholm Ignat",
  },
  client: {
    id: 98989898,
    name: "Acme AB",
    currency: "SEK",
  },
  project: {
    id: 98989899,
    name: "Acme Project X",
    code: "",
  },
  task: {
    id: 9323435,
    name: "Programmering",
  },
  user_assignment: {
    id: 192953862,
    is_project_manager: true,
    is_active: true,
    use_default_rates: true,
    budget: null,
    created_at: "2019-03-17T19:58:26Z",
    updated_at: "2019-03-17T19:58:26Z",
    hourly_rate: 220,
  },
  task_assignment: {
    id: 221049853,
    billable: true,
    is_active: true,
    created_at: "2019-03-17T19:58:26Z",
    updated_at: "2019-03-17T19:58:26Z",
    hourly_rate: 220,
    budget: null,
  },
  invoice: null,
  external_reference: null,
};

const timeEntry3 = {
  id: 3,
  spent_date: "2020-11-05",
  hours: 2.7,
  rounded_hours: 2.7,
  notes: null,
  is_locked: false,
  locked_reason: null,
  is_closed: false,
  is_billed: false,
  timer_started_at: null,
  started_time: "12:48",
  ended_time: "15:30",
  is_running: false,
  billable: true,
  budgeted: false,
  billable_rate: 220,
  cost_rate: null,
  created_at: "2020-11-05T11:48:09Z",
  updated_at: "2020-11-05T14:30:41Z",
  user: {
    id: 2016459,
    name: "Daniel Edholm Ignat",
  },
  client: {
    id: 98989898,
    name: "Acme AB",
    currency: "SEK",
  },
  project: {
    id: 98989899,
    name: "Acme Project X",
    code: "",
  },
  task: {
    id: 9323435,
    name: "Programmering",
  },
  user_assignment: {
    id: 192953862,
    is_project_manager: true,
    is_active: true,
    use_default_rates: true,
    budget: null,
    created_at: "2019-03-17T19:58:26Z",
    updated_at: "2019-03-17T19:58:26Z",
    hourly_rate: 220,
  },
  task_assignment: {
    id: 221049853,
    billable: true,
    is_active: true,
    created_at: "2019-03-17T19:58:26Z",
    updated_at: "2019-03-17T19:58:26Z",
    hourly_rate: 220,
    budget: null,
  },
  invoice: null,
  external_reference: null,
};

const timeEntry4 = {
  id: 4,
  spent_date: "2019-07-17",
  hours: 8,
  rounded_hours: 8,
  notes: null,
  is_locked: false,
  locked_reason: null,
  is_closed: false,
  is_billed: false,
  timer_started_at: null,
  started_time: "9:00",
  ended_time: "17:00",
  is_running: false,
  billable: false,
  budgeted: false,
  billable_rate: null,
  cost_rate: null,
  created_at: "2019-07-31T10:52:56Z",
  updated_at: "2019-07-31T10:52:54Z",
  user: {
    id: 2016459,
    name: "Daniel Edholm Ignat",
  },
  client: {
    id: 98989898,
    name: "Acme AB",
    currency: "SEK",
  },
  project: {
    id: 98989899,
    name: "Acme Project X",
    code: "",
  },
  task: {
    id: 9560167,
    name: "Ledig",
  },
  user_assignment: {
    id: 192953862,
    is_project_manager: true,
    is_active: true,
    use_default_rates: true,
    budget: null,
    created_at: "2019-03-17T19:58:26Z",
    updated_at: "2019-03-17T19:58:26Z",
    hourly_rate: 220,
  },
  task_assignment: {
    id: 221049852,
    billable: false,
    is_active: true,
    created_at: "2019-03-17T19:58:26Z",
    updated_at: "2019-03-17T19:58:26Z",
    hourly_rate: 220,
    budget: null,
  },
  invoice: null,
  external_reference: null,
};

const timeEntry5 = {
  id: 5,
  spent_date: "2019-07-16",
  hours: 8,
  rounded_hours: 8,
  notes: null,
  is_locked: false,
  locked_reason: null,
  is_closed: false,
  is_billed: false,
  timer_started_at: null,
  started_time: "9:00",
  ended_time: "17:00",
  is_running: false,
  billable: false,
  budgeted: false,
  billable_rate: null,
  cost_rate: null,
  created_at: "2019-07-31T10:52:48Z",
  updated_at: "2019-07-31T10:52:45Z",
  user: {
    id: 2016459,
    name: "Daniel Edholm Ignat",
  },
  client: {
    id: 98989898,
    name: "Acme AB",
    currency: "SEK",
  },
  project: {
    id: 98989899,
    name: "Acme Project X",
    code: "",
  },
  task: {
    id: 9560167,
    name: "Ledig",
  },
  user_assignment: {
    id: 192953862,
    is_project_manager: true,
    is_active: true,
    use_default_rates: true,
    budget: null,
    created_at: "2019-03-17T19:58:26Z",
    updated_at: "2019-03-17T19:58:26Z",
    hourly_rate: 220,
  },
  task_assignment: {
    id: 221049852,
    billable: false,
    is_active: true,
    created_at: "2019-03-17T19:58:26Z",
    updated_at: "2019-03-17T19:58:26Z",
    hourly_rate: 220,
    budget: null,
  },
  invoice: null,
  external_reference: null,
};

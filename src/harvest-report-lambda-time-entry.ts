import { TimeEntry } from "harvest/dist/models/timeEntries.models";

export interface HarvestReportLambdaTimeEntry {
  id: TimeEntry["id"];
  date: TimeEntry["spent_date"];
  name: string;
  billableHours: number;
  cost: number;
  comment: TimeEntry["notes"] | null;
}

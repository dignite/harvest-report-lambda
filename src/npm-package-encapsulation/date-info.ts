import getISOWeek from "date-fns/getISOWeek";
import format from "date-fns/format";

export const getWeekNumber = getISOWeek;
export const getMonthName = (date: Date): string => format(date, "LLLL");

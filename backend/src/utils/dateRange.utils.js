import dayjs from "dayjs";

export const startCurrentDay = dayjs().startOf("month").toDate();
export const endCurrentDay = dayjs().endOf("month").toDate();
export const startPreviousDay = dayjs()
  .subtract(1, "month")
  .startOf("month")
  .toDate();
export const startPreviousMonths = dayjs()
  .subtract(11, "month")
  .startOf("month")
  .toDate();
export const endPreviousDay = dayjs()
  .subtract(1, "month")
  .endOf("month")
  .toDate();

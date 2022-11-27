import moment from "moment-jalaali";
export const ToMiladi = (date: string): string => {
  return moment(date, "jYYYY-jM-jD").format("YYYY-M-D");
};
export const ToJalali = (date: string): string => {
  return moment(date, "YYYY-M-D").format("jYYYY/jM/jD");
};

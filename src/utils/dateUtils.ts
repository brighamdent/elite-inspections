import { parseISO, format } from "date-fns";

export const getCurrentDate = () => {
  return new Date();
};

export const getCurrentYear = (): number => new Date().getFullYear();

export const getCurrentMonth = (): number => new Date().getMonth() + 1; // getMonth() is zero-based

export const getCurrentDay = (): number => new Date().getDate();

export const formatDate = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};

export const formatDateBackwards = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

export const monthFormatting = (month: number | string) =>
  String(month).padStart(2, "0");

export const dayFormatting = (day: number | string) =>
  String(day).padStart(2, "0");

export const formatBackwardsDate = (dateString: string): string => {
  const date = parseISO(dateString);
  return format(date, "MMMM do, yyyy");
};

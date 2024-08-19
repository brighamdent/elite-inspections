import { format, parse } from "date-fns";

const convertTo12Hour = (time24h: string) => {
  const date = parse(time24h, "HH:mm", new Date());
  return format(date, "h:mm a");
};

export default convertTo12Hour;

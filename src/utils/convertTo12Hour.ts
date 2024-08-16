import { format, parse } from "date-fns";

const convertTo12Hour = (time24h: string) => {
  console.log(time24h);
  const date = parse(time24h, "HH:mm", new Date());
  console.log(date);
  return format(date, "h:mm a");
};

export default convertTo12Hour;

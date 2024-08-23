import { format, parse } from "date-fns";

const convertTo12Hour = (time24h: string) => {
  try {
    const date = parse(time24h, "HH:mm", new Date());
    return format(date, "h:mm a");
  } catch (error) {
    console.log(error);
  }
};

export default convertTo12Hour;

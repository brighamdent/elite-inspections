import { format } from "date-fns";
const monthFormatter = (currentDate: any) => {
  const monthFormatted = format(currentDate, "MMMM");
  return monthFormatted;
};
export default monthFormatter;

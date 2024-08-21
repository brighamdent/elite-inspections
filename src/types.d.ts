// type Date = {
//   month: number;
//   day: number;
//   year: number;
// };
//
// type CalendarProps = {
//   setDate: React.Dispatch<React.SetStateAction<Date>>;
// };

type ChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

type FormEvent = React.FormEvent<HTMLFormElement>;

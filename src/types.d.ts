type ChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

type FormEvent = React.FormEvent<HTMLFormElement>;

interface DateData {
  month: number | null;
  day: number | null;
  year: number | null;
  dayOfWeek: string | null;
  monthName: string | null;
}

interface ContactType {
  contact_id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
}

interface PropertyType {
  property_id: number;
  address: string;
  total_finished_square_feet: string;
  year_built: string;
  foundation_type: string;
  beds: number;
  baths: number;
  notes: string;
}

interface AppointmentType {
  appointment_id: number;
  date: string;
  time: string;
  role: "Homeowner" | "Seller's Agent" | "Homebuyer" | "Buyer's Agent";
  contact_id: number;
  property_id: number;
  contact: ContactType;
  property: PropertyType;
  status: string;
}

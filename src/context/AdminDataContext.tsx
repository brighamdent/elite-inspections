"use client";
import {
  formatDateBackwards,
  getCurrentDate,
  getCurrentMonth,
  getCurrentYear,
} from "@/utils/dateUtils";
import { createContext, useContext, useEffect, useState } from "react";

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
  date: string; // ISO 8601 format (e.g., "2024-08-16")
  time: string; // Time in 24-hour format (e.g., "11:00")
  role: "Homeowner" | "Seller's Agent" | "Homebuyer" | "Buyer's Agent";
  contact_id: number;
  property_id: number;
  contact: ContactType;
  property: PropertyType;
}

interface AdminDataContextType {
  currentMonthAppointments: AppointmentType[];
  todaysAppointments: AppointmentType[];
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(
  undefined,
);

export function useAdminData(): AdminDataContextType {
  const context = useContext(AdminDataContext);
  if (context === undefined) {
    throw new Error("useAdminData must be used within an AdminDataProvider");
  }
  return context;
}

export function AdminDataProvider({ children }: { children: React.ReactNode }) {
  const [currentMonthAppointments, setCurrentMonthAppointments] = useState<
    AppointmentType[]
  >([]);
  const [todaysAppointments, setTodaysAppointments] = useState<any>([]);
  const [firstEffectDone, setFirstEffectDone] = useState(false);
  const [date, setDate] = useState({
    month: getCurrentMonth(),
    day: null,
    year: getCurrentYear(),
    dayOfWeek: null,
    monthName: null,
  });

  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        const response = await fetch(
          `/api/appointmentsAdmin?year=${date.year}&month=${date.month}`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: AppointmentType[] = await response.json();
        console.log(data);
        setCurrentMonthAppointments(data);
        setFirstEffectDone(true);
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
      }
    };
    fetchAppointmentData();
  }, [date.month, date.year]);

  useEffect(() => {
    const fetchTodaysAppointments = () => {
      const newArr = currentMonthAppointments.filter(
        (curr) => curr.date === formatDateBackwards(getCurrentDate()),
      );
      setTodaysAppointments(newArr);
      console.log(newArr);
    };
    fetchTodaysAppointments();
  }, [firstEffectDone]);

  return (
    <AdminDataContext.Provider
      value={{ currentMonthAppointments, todaysAppointments, date, setDate }}
    >
      {children}
    </AdminDataContext.Provider>
  );
}

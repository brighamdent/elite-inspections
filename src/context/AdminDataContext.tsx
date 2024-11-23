"use client";
import {
  formatDateBackwards,
  getCurrentDate,
  getCurrentMonth,
  getCurrentYear,
} from "@/utils/dateUtils";
import { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import { useAuth } from "./AuthContext";

interface AdminDataContextType {
  currentMonthAppointments: AppointmentType[];
  setCurrentMonthAppointments: React.Dispatch<
    React.SetStateAction<AppointmentType[]>
  >;
  todaysAppointments: AppointmentType[];
  date: DateData;
  setDate: React.Dispatch<React.SetStateAction<DateData>>;
  pastAppointments: AppointmentType[];
  setPastAppointments: React.Dispatch<React.SetStateAction<AppointmentType[]>>;
  updatePastAppointments: number;
  setUpdatePastAppointments: React.Dispatch<React.SetStateAction<number>>;
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
  const [todaysAppointments, setTodaysAppointments] = useState<
    AppointmentType[]
  >([]);
  const [pastAppointments, setPastAppointments] = useState<AppointmentType[]>(
    [],
  );
  const [updatePastAppointments, setUpdatePastAppointments] = useState(0);
  const [firstEffectDone, setFirstEffectDone] = useState(false);
  const [date, setDate] = useState<DateData>({
    month: getCurrentMonth(),
    day: null,
    year: getCurrentYear(),
    dayOfWeek: null,
    monthName: null,
  });
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        const user = firebase.auth().currentUser;
        if (user) {
          const token = await user.getIdToken();
          const response = await fetch(
            `/api/appointmentsAdmin?year=${date.year}&month=${date.month}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data: AppointmentType[] = await response.json();
          setCurrentMonthAppointments(data);
          setFirstEffectDone(true);
        } else {
          console.error("No user is currently signed in.");
        }
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
      }
    };
    fetchAppointmentData();
  }, [currentUser, date.month, date.year]);

  useEffect(() => {
    const fetchTodaysAppointments = () => {
      const newArr = currentMonthAppointments.filter(
        (curr) => curr.date === formatDateBackwards(getCurrentDate()),
      );
      setTodaysAppointments(newArr);
    };
    fetchTodaysAppointments();
  }, [firstEffectDone]);

  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        const user = firebase.auth().currentUser;
        if (user) {
          const token = await user.getIdToken();
          const response = await fetch(`/api/pastAppointments`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data: AppointmentType[] = await response.json();
          setPastAppointments(data);
        } else {
          console.error("No user is currently signed in.");
        }
      } catch (error) {
        console.error("Failed to fetch past appointments:", error);
      }
    };
    fetchAppointmentData();
  }, [currentUser, date.month, date.year, updatePastAppointments]);

  return (
    <AdminDataContext.Provider
      value={{
        currentMonthAppointments,
        setCurrentMonthAppointments,
        todaysAppointments,
        date,
        setDate,
        pastAppointments,
        setPastAppointments,
        updatePastAppointments,
        setUpdatePastAppointments,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
}

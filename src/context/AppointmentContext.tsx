"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
interface DateData {
  month: number | null;
  day: number | null;
  year: number | null;
  dayOfWeek: string | null;
  monthName: string | null;
}

interface ContactDetailsData {
  person: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
  address: string;
  finishedSqft: number | undefined;
  yearBuilt: number | undefined;
  foundationType: string;
  bedCount: number | undefined;
  bathCount: number | undefined;
  notes: string;
}

interface ServiceDetailsData {
  inspectionType: string;
  quoteAmount: number | undefined;
}

interface AppointmentContextType {
  date: DateData;
  setDate: React.Dispatch<React.SetStateAction<DateData>>;
  selectedTime: string;
  setSelectedTime: React.Dispatch<React.SetStateAction<string>>;
  currentStage: number;
  setCurrentStage: React.Dispatch<React.SetStateAction<number>>;
  contactDetails: ContactDetailsData;
  setContactDetails: React.Dispatch<React.SetStateAction<ContactDetailsData>>;
  serviceDetails: ServiceDetailsData;
  setServiceDetails: React.Dispatch<React.SetStateAction<ServiceDetailsData>>;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(
  undefined,
);

export function useAppointment(): AppointmentContextType {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error(
      "useAppointment must be used within an AppointmentProvider",
    );
  }
  return context;
}

export function AppointmentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentStage, setCurrentStage] = useState(1);
  const [date, setDate] = useState<DateData>({
    month: null,
    day: null,
    year: null,
    dayOfWeek: null,
    monthName: null,
  });
  const [selectedTime, setSelectedTime] = useState("");
  const [contactDetails, setContactDetails] = useState<ContactDetailsData>({
    person: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
    address: "",
    finishedSqft: undefined,
    yearBuilt: undefined,
    foundationType: "",
    bedCount: undefined,
    bathCount: undefined,
    notes: "",
  });
  const [serviceDetails, setServiceDetails] = useState<ServiceDetailsData>({
    inspectionType: "",
    quoteAmount: undefined,
  });
  return (
    <AppointmentContext.Provider
      value={{
        date,
        setDate,
        selectedTime,
        setSelectedTime,
        currentStage,
        setCurrentStage,
        contactDetails,
        setContactDetails,
        serviceDetails,
        setServiceDetails,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}

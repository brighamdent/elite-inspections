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
  finishedSqft: number | string;
  yearBuilt: number | string;
  foundationType: string;
  bedCount: number | string;
  bathCount: number | string;
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
  makeAppointment: () => void;
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
    finishedSqft: "",
    yearBuilt: "",
    foundationType: "",
    bedCount: "",
    bathCount: "",
    notes: "",
  });
  const [serviceDetails, setServiceDetails] = useState<ServiceDetailsData>({
    inspectionType: "",
    quoteAmount: 600,
  });
  const makeAppointment = async () => {
    const {
      person,
      firstName,
      lastName,
      phoneNumber,
      emailAddress,
      address,
      finishedSqft,
      yearBuilt,
      foundationType,
      bedCount,
      bathCount,
      notes,
    } = contactDetails;
    console.log(person);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date,
          selectedTime,
          person,
          firstName,
          lastName,
          phoneNumber,
          emailAddress,
          address,
          finishedSqft,
          yearBuilt,
          foundationType,
          bedCount,
          bathCount,
          notes,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        // setMessage(result.message);
      } else {
        // setMessage("Error scheduling appointment");
      }
    } catch (error) {
      // setMessage("Error scheduling appointment");
      console.log(error);
    }
  };
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
        makeAppointment,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}

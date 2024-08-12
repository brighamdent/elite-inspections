"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface AppointmentContextType {
  appointmentTime: string;
  setAppointmentTime: React.Dispatch<React.SetStateAction<string>>;
  currentStage: number;
  setCurrentStage: React.Dispatch<React.SetStateAction<number>>;
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
  const [appointmentTime, setAppointmentTime] = useState("");
  const [contactDetailsForm, setContactDetailsFrom] = useState({
    person: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
    finishedSqft: null,
    yearBuilt: null,
    foundationType: "",
    notes: "",
  });
  const [serviceDetails, setServiceDetails] = useState({
    inspectionType: "",
    quote: "",
  });
  return (
    <AppointmentContext.Provider
      value={{
        appointmentTime,
        setAppointmentTime,
        currentStage,
        setCurrentStage,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}
